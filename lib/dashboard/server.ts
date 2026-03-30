import "server-only"

import { randomUUID, createHmac, timingSafeEqual } from "node:crypto"

import { getDatabase } from "@/lib/mongodb"
import { uploadBuffer, deleteResource } from "@/lib/cloudinary"
import { createEnvelope } from "@/lib/signing/server"

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.DASHBOARD_PASSWORD ||
  "badal-agency-fallback-key"

export type DocumentRecord = {
  _id: string
  original_name: string
  cloudinary_url: string
  cloudinary_public_id: string
  envelope_id: string
  admin_token: string
  client_token: string
  admin_link: string
  client_link: string
  created_at: string
}

// ── HMAC-signed session tokens (stateless, no database needed) ───────

export function validateCredentials(username: string, password: string) {
  const envUser = (process.env.DASHBOARD_USERNAME ?? "admin").trim()
  const envPass = (process.env.DASHBOARD_PASSWORD ?? "admin123").trim()
  return username === envUser && password === envPass
}

export function createSession(): string {
  const payload = {
    sub: "dashboard",
    iat: Date.now(),
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = createHmac("sha256", SESSION_SECRET)
    .update(payloadStr)
    .digest("base64url")
  return `${payloadStr}.${signature}`
}

export function validateSession(token: string | undefined | null): boolean {
  if (!token) return false

  const parts = token.split(".")
  if (parts.length !== 2) return false

  const [payloadStr, signature] = parts
  if (!payloadStr || !signature) return false

  const expectedSignature = createHmac("sha256", SESSION_SECRET)
    .update(payloadStr)
    .digest("base64url")

  try {
    const sigBuffer = Buffer.from(signature, "base64url")
    const expectedBuffer = Buffer.from(expectedSignature, "base64url")
    if (sigBuffer.length !== expectedBuffer.length) return false
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false
  } catch {
    return false
  }

  try {
    const payload = JSON.parse(
      Buffer.from(payloadStr, "base64url").toString("utf-8"),
    )
    if (typeof payload.exp !== "number") return false
    if (Date.now() > payload.exp) return false
  } catch {
    return false
  }

  return true
}

export function deleteSession(_token: string) {
  // Stateless tokens — logout is handled by clearing the cookie client-side
}

// ── Document management (MongoDB + Cloudinary) ──────────────────────

export async function uploadDocument(
  fileBuffer: Buffer,
  originalName: string,
  origin: string,
) {
  const id = randomUUID()
  const publicId = `doc-${id}`
  const cloudinaryPublicId = `badal-agency/pdfs/${publicId}`

  // Upload PDF to Cloudinary
  const cloudinaryUrl = await uploadBuffer(fileBuffer, publicId)

  // Create signing envelope (pass the Cloudinary URL as the base PDF)
  const envelope = await createEnvelope(origin, cloudinaryUrl)

  // Save metadata to MongoDB
  const db = await getDatabase()
  const now = new Date().toISOString()

  await db.collection("dashboard_documents").insertOne({
    _id: id,
    original_name: originalName,
    cloudinary_url: cloudinaryUrl,
    cloudinary_public_id: cloudinaryPublicId,
    envelope_id: envelope.envelopeId,
    admin_token: envelope.adminToken,
    client_token: envelope.clientToken,
    admin_link: envelope.adminLink,
    client_link: envelope.clientLink,
    created_at: now,
  })

  return {
    id,
    originalName,
    envelopeId: envelope.envelopeId,
    adminLink: envelope.adminLink,
    clientLink: envelope.clientLink,
    createdAt: now,
  }
}

export async function listDocuments() {
  const db = await getDatabase()
  const docs = await db
    .collection<DocumentRecord>("dashboard_documents")
    .find()
    .sort({ created_at: -1 })
    .toArray()

  // Map _id → id for frontend compatibility
  return docs.map((doc) => ({
    id: doc._id,
    original_name: doc.original_name,
    envelope_id: doc.envelope_id,
    admin_link: doc.admin_link,
    client_link: doc.client_link,
    created_at: doc.created_at,
  }))
}

export async function deleteDocument(id: string): Promise<boolean> {
  const db = await getDatabase()
  const doc = await db
    .collection<DocumentRecord>("dashboard_documents")
    .findOne({ _id: id as any })

  if (!doc) return false

  // Delete from Cloudinary
  if (doc.cloudinary_public_id) {
    await deleteResource(doc.cloudinary_public_id)
  }

  await db
    .collection("dashboard_documents")
    .deleteOne({ _id: id as any })
  return true
}
