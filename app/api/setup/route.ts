import { NextRequest, NextResponse } from "next/server"

import { EsignError, createEnvelope } from "@/lib/signing/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const noStoreHeaders = {
  "Cache-Control": "no-store",
}

function getOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost ?? request.headers.get("host")
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const protocol =
    forwardedProto ?? request.nextUrl.protocol.replace(":", "")

  return host ? `${protocol}://${host}` : request.nextUrl.origin
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

  console.error("Setup route error", error)
  return NextResponse.json(
    { error: "Unable to create signing links right now." },
    {
      status: 500,
      headers: noStoreHeaders,
    },
  )
}

async function createResponse(request: NextRequest) {
  try {
    const envelope = await createEnvelope(getOrigin(request))
    return NextResponse.json(envelope, {
      headers: noStoreHeaders,
    })
  } catch (error) {
    return handleError(error)
  }
}

export async function GET(request: NextRequest) {
  return createResponse(request)
}

export async function POST(request: NextRequest) {
  return createResponse(request)
}
