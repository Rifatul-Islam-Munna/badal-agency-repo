import "server-only"

import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"

import Database from "better-sqlite3"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

import type {
  EnvelopeRecord,
  SetupResponse,
  SigningRole,
  SigningStatus,
  SigningStatusResponse,
} from "@/lib/signing/types"

const STORAGE_ROOT = path.join(process.cwd(), "storage", "esign")
const PDF_STORAGE_ROOT = path.join(STORAGE_ROOT, "pdfs")
const DATABASE_PATH = path.join(STORAGE_ROOT, "signatures.sqlite")
const CONTRACT_PUBLIC_URL = "/uploads/contract.pdf"
const CONTRACT_FILE_PATH = path.join(
  process.cwd(),
  "public",
  "uploads",
  "contract.pdf",
)
const FALLBACK_CONTRACT_PATH = path.join(process.cwd(), "public", "sign.pdf")

const SIGNATURE_MARGIN_X = 72
const SIGNATURE_MARGIN_Y = 78
const MAX_SIGNATURE_WIDTH = 180

let database: Database | null = null

type EnvelopeLookup = {
  row: EnvelopeRecord
  matchedRole: SigningRole
}

export class EsignError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

function getDatabase() {
  if (database) {
    return database
  }

  fs.mkdirSync(STORAGE_ROOT, { recursive: true })

  const db = new Database(DATABASE_PATH)
  db.pragma("journal_mode = WAL")
  db.exec(`
    CREATE TABLE IF NOT EXISTS signing_envelopes (
      id TEXT PRIMARY KEY,
      admin_token TEXT NOT NULL UNIQUE,
      client_token TEXT NOT NULL UNIQUE,
      admin_status TEXT NOT NULL DEFAULT 'pending',
      client_status TEXT NOT NULL DEFAULT 'pending',
      admin_signed_at TEXT,
      client_signed_at TEXT,
      base_pdf_path TEXT NOT NULL,
      current_pdf_path TEXT NOT NULL,
      final_pdf_path TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `)

  database = db
  return db
}

function ensureStorage() {
  fs.mkdirSync(PDF_STORAGE_ROOT, { recursive: true })
  fs.mkdirSync(path.dirname(CONTRACT_FILE_PATH), { recursive: true })
}

function ensureContractFile() {
  ensureStorage()

  if (fs.existsSync(CONTRACT_FILE_PATH)) {
    return CONTRACT_FILE_PATH
  }

  if (fs.existsSync(FALLBACK_CONTRACT_PATH)) {
    fs.copyFileSync(FALLBACK_CONTRACT_PATH, CONTRACT_FILE_PATH)
    return CONTRACT_FILE_PATH
  }

  throw new EsignError(
    500,
    `Base contract is missing. Expected ${CONTRACT_PUBLIC_URL} in the public folder.`,
  )
}

function resolveEnvelopeByToken(token: string) {
  const row =
    getDatabase()
      .prepare<[string, string], EnvelopeRecord>(
        `
          SELECT *
          FROM signing_envelopes
          WHERE admin_token = ? OR client_token = ?
          LIMIT 1
        `,
      )
      .get(token, token) ?? null

  if (!row) {
    throw new EsignError(404, "That signing link is invalid or has expired.")
  }

  return {
    row,
    matchedRole: row.admin_token === token ? "admin" : "client",
  } satisfies EnvelopeLookup
}

function getCurrentPdfPath(row: EnvelopeRecord) {
  const fallbackPath = ensureContractFile()

  if (row.current_pdf_path && fs.existsSync(row.current_pdf_path)) {
    return row.current_pdf_path
  }

  if (row.base_pdf_path && fs.existsSync(row.base_pdf_path)) {
    return row.base_pdf_path
  }

  return fallbackPath
}

function buildStatusResponse(
  row: EnvelopeRecord,
  token: string,
  matchedRole: SigningRole,
): SigningStatusResponse {
  const allSigned =
    row.admin_status === "signed" && row.client_status === "signed"
  const otherRole: SigningRole = matchedRole === "admin" ? "client" : "admin"
  const selfStatus = matchedRole === "admin" ? row.admin_status : row.client_status
  const otherStatus =
    matchedRole === "admin" ? row.client_status : row.admin_status
  const signedAt =
    matchedRole === "admin" ? row.admin_signed_at : row.client_signed_at

  return {
    envelopeId: row.id,
    role: matchedRole,
    selfStatus,
    otherRole,
    otherStatus,
    adminStatus: row.admin_status,
    clientStatus: row.client_status,
    signedAt,
    allSigned,
    currentPdfUrl: `/api/document?token=${encodeURIComponent(token)}&v=${encodeURIComponent(row.updated_at)}`,
    downloadUrl: allSigned
      ? `/api/download?token=${encodeURIComponent(token)}`
      : null,
    updatedAt: row.updated_at,
  }
}

function assertRoleMatch(
  expectedRole: SigningRole | undefined,
  matchedRole: SigningRole,
) {
  if (expectedRole && expectedRole !== matchedRole) {
    throw new EsignError(
      400,
      `This signing link belongs to the ${matchedRole} flow, not ${expectedRole}.`,
    )
  }
}

function parseSignatureDataUrl(signatureDataUrl: string) {
  const [meta, base64] = signatureDataUrl.split(",", 2)

  if (!meta || !base64 || !meta.startsWith("data:image/png;base64")) {
    throw new EsignError(400, "Signature must be submitted as a PNG data URL.")
  }

  try {
    return Buffer.from(base64, "base64")
  } catch {
    throw new EsignError(400, "Signature data could not be decoded.")
  }
}

function formatSignedAt(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp))
}

export function createEnvelope(origin: string): SetupResponse {
  const basePdfPath = ensureContractFile()
  const id = randomUUID()
  const adminToken = randomUUID()
  const clientToken = randomUUID()
  const now = new Date().toISOString()

  getDatabase()
    .prepare<[string, string, string, string, string, string, string]>(
      `
        INSERT INTO signing_envelopes (
          id,
          admin_token,
          client_token,
          base_pdf_path,
          current_pdf_path,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
    )
    .run(id, adminToken, clientToken, basePdfPath, basePdfPath, now, now)

  return {
    envelopeId: id,
    adminToken,
    clientToken,
    adminLink: `${origin}/sign/admin?token=${adminToken}`,
    clientLink: `${origin}/sign/client?token=${clientToken}`,
  }
}

export function getEnvelopeStatus(
  token: string,
  expectedRole?: SigningRole,
): SigningStatusResponse {
  const { row, matchedRole } = resolveEnvelopeByToken(token)
  assertRoleMatch(expectedRole, matchedRole)
  return buildStatusResponse(row, token, matchedRole)
}

export async function signEnvelope(
  token: string,
  expectedRole: SigningRole,
  signatureDataUrl: string,
) {
  const { row, matchedRole } = resolveEnvelopeByToken(token)
  assertRoleMatch(expectedRole, matchedRole)

  const selfStatus = matchedRole === "admin" ? row.admin_status : row.client_status
  if (selfStatus === "signed") {
    throw new EsignError(409, "This link has already been signed.")
  }

  const signatureBytes = parseSignatureDataUrl(signatureDataUrl)
  const sourcePdfPath = getCurrentPdfPath(row)
  const targetPdfPath = path.join(PDF_STORAGE_ROOT, `${row.id}-current.pdf`)
  const signedAt = new Date().toISOString()

  const sourcePdfBytes = fs.readFileSync(sourcePdfPath)
  const pdfDoc = await PDFDocument.load(sourcePdfBytes)
  const pngSignature = await pdfDoc.embedPng(signatureBytes)
  const labelFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const page = pages[pages.length - 1]

  if (!page) {
    throw new EsignError(500, "The contract PDF does not contain any pages.")
  }

  const { width: pageWidth } = page.getSize()
  const signatureWidth = Math.min(pageWidth * 0.28, MAX_SIGNATURE_WIDTH)
  const signatureHeight =
    signatureWidth * (pngSignature.height / pngSignature.width)
  const x =
    matchedRole === "admin"
      ? SIGNATURE_MARGIN_X
      : Math.max(
          SIGNATURE_MARGIN_X,
          pageWidth - signatureWidth - SIGNATURE_MARGIN_X,
        )
  const y = SIGNATURE_MARGIN_Y
  const roleLabel =
    matchedRole === "admin"
      ? "Company representative signature"
      : "Counterparty representative signature"

  page.drawText(roleLabel, {
    x,
    y: y + signatureHeight + 18,
    size: 11,
    font: labelFont,
    color: rgb(0.16, 0.23, 0.31),
  })

  page.drawLine({
    start: { x, y: y + signatureHeight + 12 },
    end: { x: x + signatureWidth, y: y + signatureHeight + 12 },
    thickness: 0.9,
    color: rgb(0.55, 0.62, 0.7),
  })

  page.drawImage(pngSignature, {
    x,
    y,
    width: signatureWidth,
    height: signatureHeight,
  })

  page.drawText(formatSignedAt(signedAt), {
    x,
    y: y - 14,
    size: 9,
    font: labelFont,
    color: rgb(0.36, 0.43, 0.51),
  })

  const signedPdfBytes = await pdfDoc.save()
  fs.writeFileSync(targetPdfPath, Buffer.from(signedPdfBytes))

  const nextAdminStatus: SigningStatus =
    matchedRole === "admin" ? "signed" : row.admin_status
  const nextClientStatus: SigningStatus =
    matchedRole === "client" ? "signed" : row.client_status
  const nextAdminSignedAt =
    matchedRole === "admin" ? signedAt : row.admin_signed_at
  const nextClientSignedAt =
    matchedRole === "client" ? signedAt : row.client_signed_at
  const allSigned =
    nextAdminStatus === "signed" && nextClientStatus === "signed"
  const updatedAt = new Date().toISOString()

  getDatabase()
    .prepare<
      [
        SigningStatus,
        SigningStatus,
        string | null,
        string | null,
        string,
        string | null,
        string,
        string,
      ]
    >(
      `
        UPDATE signing_envelopes
        SET
          admin_status = ?,
          client_status = ?,
          admin_signed_at = ?,
          client_signed_at = ?,
          current_pdf_path = ?,
          final_pdf_path = ?,
          updated_at = ?
        WHERE id = ?
      `,
    )
    .run(
      nextAdminStatus,
      nextClientStatus,
      nextAdminSignedAt,
      nextClientSignedAt,
      targetPdfPath,
      allSigned ? targetPdfPath : null,
      updatedAt,
      row.id,
    )

  const updatedRow: EnvelopeRecord = {
    ...row,
    admin_status: nextAdminStatus,
    client_status: nextClientStatus,
    admin_signed_at: nextAdminSignedAt,
    client_signed_at: nextClientSignedAt,
    current_pdf_path: targetPdfPath,
    final_pdf_path: allSigned ? targetPdfPath : null,
    updated_at: updatedAt,
  }

  return buildStatusResponse(updatedRow, token, matchedRole)
}

export function getDocumentPreview(token: string) {
  const { row } = resolveEnvelopeByToken(token)
  const filePath = getCurrentPdfPath(row)

  return {
    fileName: `${row.id}-preview.pdf`,
    buffer: fs.readFileSync(filePath),
  }
}

export function getDownloadDocument(token: string) {
  const { row } = resolveEnvelopeByToken(token)

  if (row.admin_status !== "signed" || row.client_status !== "signed") {
    throw new EsignError(
      409,
      "The final PDF will be available once both people have signed.",
    )
  }

  const filePath =
    row.final_pdf_path && fs.existsSync(row.final_pdf_path)
      ? row.final_pdf_path
      : getCurrentPdfPath(row)

  return {
    fileName: `signed-contract-${row.id}.pdf`,
    buffer: fs.readFileSync(filePath),
  }
}
