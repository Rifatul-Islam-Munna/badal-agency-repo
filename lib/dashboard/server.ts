import "server-only"

import { randomUUID } from "node:crypto"
import fs from "node:fs"
import path from "node:path"

import Database from "better-sqlite3"
import { createEnvelope } from "@/lib/signing/server"

const STORAGE_ROOT = path.join(process.cwd(), "storage", "esign")
const DATABASE_PATH = path.join(STORAGE_ROOT, "signatures.sqlite")
const UPLOAD_DIR = path.join(STORAGE_ROOT, "uploads")

export type DocumentRecord = {
  id: string
  original_name: string
  file_path: string
  envelope_id: string
  admin_token: string
  client_token: string
  admin_link: string
  client_link: string
  created_at: string
}

export type SessionRecord = {
  id: string
  token: string
  created_at: string
  expires_at: string
}

let database: InstanceType<typeof Database> | null = null

function getDatabase() {
  if (database) {
    return database
  }

  fs.mkdirSync(STORAGE_ROOT, { recursive: true })

  const db = new Database(DATABASE_PATH)
  db.pragma("journal_mode = WAL")

  db.exec(`
    CREATE TABLE IF NOT EXISTS dashboard_documents (
      id TEXT PRIMARY KEY,
      original_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      envelope_id TEXT NOT NULL,
      admin_token TEXT NOT NULL,
      client_token TEXT NOT NULL,
      admin_link TEXT NOT NULL,
      client_link TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS dashboard_sessions (
      id TEXT PRIMARY KEY,
      token TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );
  `)

  database = db
  return db
}

export function validateCredentials(username: string, password: string) {
  const envUser = (process.env.DASHBOARD_USERNAME ?? "admin").trim()
  const envPass = (process.env.DASHBOARD_PASSWORD ?? "admin123").trim()
  return username === envUser && password === envPass
}

export function createSession(): string {
  const db = getDatabase()
  const id = randomUUID()
  const token = randomUUID()
  const now = new Date()
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours

  db.prepare<[string, string, string, string]>(
    `INSERT INTO dashboard_sessions (id, token, created_at, expires_at) VALUES (?, ?, ?, ?)`
  ).run(id, token, now.toISOString(), expires.toISOString())

  return token
}

export function validateSession(token: string | undefined | null): boolean {
  if (!token) return false

  const db = getDatabase()
  const row = db
    .prepare<[string], SessionRecord>(
      `SELECT * FROM dashboard_sessions WHERE token = ? LIMIT 1`
    )
    .get(token)

  if (!row) return false

  const now = new Date()
  if (new Date(row.expires_at) < now) {
    db.prepare<[string]>(`DELETE FROM dashboard_sessions WHERE token = ?`).run(
      token
    )
    return false
  }

  return true
}

export function deleteSession(token: string) {
  const db = getDatabase()
  db.prepare<[string]>(`DELETE FROM dashboard_sessions WHERE token = ?`).run(
    token
  )
}

export async function uploadDocument(
  fileBuffer: Buffer,
  originalName: string,
  origin: string
) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })

  const id = randomUUID()
  const ext = path.extname(originalName) || ".pdf"
  const safeFileName = `${id}${ext}`
  const filePath = path.join(UPLOAD_DIR, safeFileName)

  // Save uploaded file
  fs.writeFileSync(filePath, fileBuffer)

  // Also copy to public/uploads so signing system can use it
  const publicUploadDir = path.join(process.cwd(), "public", "uploads")
  fs.mkdirSync(publicUploadDir, { recursive: true })
  const publicPath = path.join(publicUploadDir, safeFileName)
  fs.copyFileSync(filePath, publicPath)

  // Also set as the contract.pdf for the signing system
  const contractPath = path.join(publicUploadDir, "contract.pdf")
  fs.copyFileSync(filePath, contractPath)

  // Create signing envelope
  const envelope = createEnvelope(origin)

  const db = getDatabase()
  const now = new Date().toISOString()

  db.prepare<[string, string, string, string, string, string, string, string, string]>(
    `INSERT INTO dashboard_documents
      (id, original_name, file_path, envelope_id, admin_token, client_token, admin_link, client_link, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    originalName,
    filePath,
    envelope.envelopeId,
    envelope.adminToken,
    envelope.clientToken,
    envelope.adminLink,
    envelope.clientLink,
    now
  )

  return {
    id,
    originalName,
    envelopeId: envelope.envelopeId,
    adminLink: envelope.adminLink,
    clientLink: envelope.clientLink,
    createdAt: now,
  }
}

export function listDocuments(): DocumentRecord[] {
  const db = getDatabase()
  return db
    .prepare<[], DocumentRecord>(
      `SELECT * FROM dashboard_documents ORDER BY created_at DESC`
    )
    .all()
}

export function deleteDocument(id: string): boolean {
  const db = getDatabase()
  const doc = db
    .prepare<[string], DocumentRecord>(
      `SELECT * FROM dashboard_documents WHERE id = ? LIMIT 1`
    )
    .get(id)

  if (!doc) return false

  // Delete physical file
  if (fs.existsSync(doc.file_path)) {
    fs.unlinkSync(doc.file_path)
  }

  db.prepare<[string]>(`DELETE FROM dashboard_documents WHERE id = ?`).run(id)
  return true
}
