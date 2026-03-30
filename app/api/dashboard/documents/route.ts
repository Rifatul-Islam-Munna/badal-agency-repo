import { NextRequest, NextResponse } from "next/server"
import {
  validateSession,
  listDocuments,
  deleteDocument,
} from "@/lib/dashboard/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("dashboard_session")?.value
    if (!validateSession(token)) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    const documents = listDocuments()
    return NextResponse.json({ documents })
  } catch (error) {
    console.error("Documents list error:", error)
    return NextResponse.json(
      { error: "Failed to load documents." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("dashboard_session")?.value
    if (!validateSession(token)) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    const { id } = (await request.json()) as { id?: string }
    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required." },
        { status: 400 }
      )
    }

    const deleted = deleteDocument(id)
    if (!deleted) {
      return NextResponse.json(
        { error: "Document not found." },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Document delete error:", error)
    return NextResponse.json(
      { error: "Failed to delete document." },
      { status: 500 }
    )
  }
}
