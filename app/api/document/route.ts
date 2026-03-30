import { NextRequest, NextResponse } from "next/server"

import { EsignError, getDocumentPreview } from "@/lib/signing/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const noStoreHeaders = {
  "Cache-Control": "no-store",
}

function handleError(error: unknown) {
  if (error instanceof EsignError) {
    return NextResponse.json(
      { error: error.message },
      {
        status: error.status,
        headers: noStoreHeaders,
      },
    )
  }

  console.error("Document route error", error)
  return NextResponse.json(
    { error: "Unable to load the preview PDF." },
    {
      status: 500,
      headers: noStoreHeaders,
    },
  )
}

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token")

    if (!token) {
      throw new EsignError(400, "A token query parameter is required.")
    }

    const { buffer, fileName } = await getDocumentPreview(token)

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        ...noStoreHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Content-Length": buffer.length.toString(),
      },
    })
  } catch (error) {
    return handleError(error)
  }
}
