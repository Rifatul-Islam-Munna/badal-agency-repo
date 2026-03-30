export type SigningRole = "admin" | "client"

export type SigningStatus = "pending" | "signed"

export type EnvelopeRecord = {
  _id: string
  admin_token: string
  client_token: string
  admin_status: SigningStatus
  client_status: SigningStatus
  admin_signed_at: string | null
  client_signed_at: string | null
  base_pdf_url: string
  current_pdf_url: string
  final_pdf_url: string | null
  created_at: string
  updated_at: string
}

export type SigningStatusResponse = {
  envelopeId: string
  role: SigningRole
  selfStatus: SigningStatus
  otherRole: SigningRole
  otherStatus: SigningStatus
  adminStatus: SigningStatus
  clientStatus: SigningStatus
  signedAt: string | null
  allSigned: boolean
  currentPdfUrl: string
  downloadUrl: string | null
  updatedAt: string
}

export type SetupResponse = {
  envelopeId: string
  adminToken: string
  clientToken: string
  adminLink: string
  clientLink: string
}
