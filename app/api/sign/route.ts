import { NextRequest, NextResponse } from "next/server"

import {
  EsignError,
  getEnvelopeStatus,
  signEnvelope,
} from "@/lib/signing/server"
import type { SigningRole } from "@/lib/signing/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const noStoreHeaders = {
  "Cache-Control": "no-store",
}

function getToken(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  if (!token) {
    throw new EsignError(400, "A token query parameter is required.")
  }

  return token
}

function parseRole(value: string | null): SigningRole | undefined {
  if (!value) {
    return undefined
  }

  if (value === "admin" || value === "client") {
    return value
  }

  throw new EsignError(400, "Role must be either admin or client.")
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

  console.error("Sign route error", error)
  return NextResponse.json(
    { error: "Something went wrong while processing the signature." },
    {
      status: 500,
      headers: noStoreHeaders,
    },
  )
}

export async function GET(request: NextRequest) {
  try {
    const token = getToken(request)
    const role = parseRole(request.nextUrl.searchParams.get("role"))
    const status = await getEnvelopeStatus(token, role)

    return NextResponse.json(status, {
      headers: noStoreHeaders,
    })
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getToken(request)
    const role = parseRole(request.nextUrl.searchParams.get("role"))

    if (!role) {
      throw new EsignError(400, "Role is required when submitting a signature.")
    }

    const body = (await request.json()) as {
      signatureDataUrl?: string
    }

    if (!body.signatureDataUrl) {
      throw new EsignError(400, "signatureDataUrl is required.")
    }

    const status = await signEnvelope(token, role, body.signatureDataUrl)

    return NextResponse.json(status, {
      headers: noStoreHeaders,
    })
  } catch (error) {
    return handleError(error)
  }
}
