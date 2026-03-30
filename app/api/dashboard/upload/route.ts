import { NextRequest, NextResponse } from "next/server"
import { validateSession, uploadDocument } from "@/lib/dashboard/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost ?? request.headers.get("host")
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const protocol = forwardedProto ?? request.nextUrl.protocol.replace(":", "")
  return host ? `${protocol}://${host}` : request.nextUrl.origin
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("dashboard_session")?.value
    if (!validateSession(token)) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      )
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Only PDF files are allowed." },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const origin = getOrigin(request)

    const result = await uploadDocument(buffer, file.name, origin)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload document." },
      { status: 500 }
    )
  }
}
