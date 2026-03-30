import "server-only"

import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"

import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

import { getDatabase } from "@/lib/mongodb"
import { uploadBuffer, downloadBuffer } from "@/lib/cloudinary"

import type {
  EnvelopeRecord,
  SetupResponse,
  SigningRole,
  SigningStatus,
  SigningStatusResponse,
} from "@/lib/signing/types"

const FALLBACK_CONTRACT_PATH = path.join(process.cwd(), "public", "sign.pdf")

const SIGNATURE_MARGIN_X = 72
const SIGNATURE_MARGIN_Y = 78
const MAX_SIGNATURE_WIDTH = 180

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

// ── Helpers ──────────────────────────────────────────────────────────

async function getCollection() {
  const db = await getDatabase()
  return db.collection<EnvelopeRecord>("signing_envelopes")
}

async function resolveEnvelopeByToken(token: string): Promise<EnvelopeLookup> {
  const col = await getCollection()
  const row = await col.findOne({
    $or: [{ admin_token: token }, { client_token: token }],
  })

  if (!row) {
    throw new EsignError(404, "That signing link is invalid or has expired.")
  }

  return {
    row,
    matchedRole: row.admin_token === token ? "admin" : "client",
  }
}

function buildStatusResponse(
  row: EnvelopeRecord,
  token: string,
  matchedRole: SigningRole,
): SigningStatusResponse {
  const allSigned =
    row.admin_status === "signed" && row.client_status === "signed"
  const otherRole: SigningRole = matchedRole === "admin" ? "client" : "admin"
  const selfStatus =
    matchedRole === "admin" ? row.admin_status : row.client_status
  const otherStatus =
    matchedRole === "admin" ? row.client_status : row.admin_status
  const signedAt =
    matchedRole === "admin" ? row.admin_signed_at : row.client_signed_at

  return {
    envelopeId: row._id,
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

/**
 * Ensure the base contract PDF exists on Cloudinary.
 * If `basePdfUrl` is already provided (from dashboard upload), just return it.
 * Otherwise, upload the default public/sign.pdf to Cloudinary.
 */
async function ensureBasePdf(basePdfUrl?: string): Promise<string> {
  if (basePdfUrl) return basePdfUrl

  // Upload the fallback PDF from public/
  if (fs.existsSync(FALLBACK_CONTRACT_PATH)) {
    const buffer = fs.readFileSync(FALLBACK_CONTRACT_PATH)
    const publicId = `default-contract-${Date.now()}`
    return uploadBuffer(buffer, publicId)
  }

  throw new EsignError(
    500,
    "Base contract is missing. Please upload a PDF from the dashboard.",
  )
}

// ── Public API ───────────────────────────────────────────────────────

export async function createEnvelope(
  origin: string,
  basePdfUrl?: string,
): Promise<SetupResponse> {
  const pdfUrl = await ensureBasePdf(basePdfUrl)

  const id = randomUUID()
  const adminToken = randomUUID()
  const clientToken = randomUUID()
  const now = new Date().toISOString()

  const col = await getCollection()
  await col.insertOne({
    _id: id,
    admin_token: adminToken,
    client_token: clientToken,
    admin_status: "pending",
    client_status: "pending",
    admin_signed_at: null,
    client_signed_at: null,
    base_pdf_url: pdfUrl,
    current_pdf_url: pdfUrl,
    final_pdf_url: null,
    created_at: now,
    updated_at: now,
  })

  return {
    envelopeId: id,
    adminToken,
    clientToken,
    adminLink: `${origin}/sign/admin?token=${adminToken}`,
    clientLink: `${origin}/sign/client?token=${clientToken}`,
  }
}

export async function getEnvelopeStatus(
  token: string,
  expectedRole?: SigningRole,
): Promise<SigningStatusResponse> {
  const { row, matchedRole } = await resolveEnvelopeByToken(token)
  assertRoleMatch(expectedRole, matchedRole)
  return buildStatusResponse(row, token, matchedRole)
}

export async function signEnvelope(
  token: string,
  expectedRole: SigningRole,
  signatureDataUrl: string,
) {
  const { row, matchedRole } = await resolveEnvelopeByToken(token)
  assertRoleMatch(expectedRole, matchedRole)

  const selfStatus =
    matchedRole === "admin" ? row.admin_status : row.client_status
  if (selfStatus === "signed") {
    throw new EsignError(409, "This link has already been signed.")
  }

  const signatureBytes = parseSignatureDataUrl(signatureDataUrl)
  const signedAt = new Date().toISOString()

  // Download the current PDF from Cloudinary
  const sourcePdfBytes = await downloadBuffer(row.current_pdf_url)
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

  // Save signed PDF and upload to Cloudinary
  const signedPdfBytes = await pdfDoc.save()
  const newPublicId = `${row._id}-signed-${matchedRole}-${Date.now()}`
  const newPdfUrl = await uploadBuffer(Buffer.from(signedPdfBytes), newPublicId)

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

  const col = await getCollection()
  await col.updateOne(
    { _id: row._id },
    {
      $set: {
        admin_status: nextAdminStatus,
        client_status: nextClientStatus,
        admin_signed_at: nextAdminSignedAt,
        client_signed_at: nextClientSignedAt,
        current_pdf_url: newPdfUrl,
        final_pdf_url: allSigned ? newPdfUrl : null,
        updated_at: updatedAt,
      },
    },
  )

  const updatedRow: EnvelopeRecord = {
    ...row,
    admin_status: nextAdminStatus,
    client_status: nextClientStatus,
    admin_signed_at: nextAdminSignedAt,
    client_signed_at: nextClientSignedAt,
    current_pdf_url: newPdfUrl,
    final_pdf_url: allSigned ? newPdfUrl : null,
    updated_at: updatedAt,
  }

  return buildStatusResponse(updatedRow, token, matchedRole)
}

export async function getDocumentPreview(token: string) {
  const { row } = await resolveEnvelopeByToken(token)

  const buffer = await downloadBuffer(row.current_pdf_url)

  return {
    fileName: `${row._id}-preview.pdf`,
    buffer,
  }
}

export async function getDownloadDocument(token: string) {
  const { row } = await resolveEnvelopeByToken(token)

  if (row.admin_status !== "signed" || row.client_status !== "signed") {
    throw new EsignError(
      409,
      "The final PDF will be available once both people have signed.",
    )
  }

  const url = row.final_pdf_url || row.current_pdf_url
  const buffer = await downloadBuffer(url)

  return {
    fileName: `signed-contract-${row._id}.pdf`,
    buffer,
  }
}
