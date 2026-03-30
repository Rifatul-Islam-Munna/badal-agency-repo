import { NextRequest, NextResponse } from "next/server"
import {
  validateCredentials,
  createSession,
  deleteSession,
  validateSession,
} from "@/lib/dashboard/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      username?: string
      password?: string
    }

    if (!body.username || !body.password) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      )
    }

    if (!validateCredentials(body.username, body.password)) {
      return NextResponse.json(
        { error: "Invalid username or password." },
        { status: 401 }
      )
    }

    const token = createSession()

    const response = NextResponse.json({ success: true })
    response.cookies.set("dashboard_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("dashboard_session")?.value
  if (token) {
    deleteSession(token)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.delete("dashboard_session")
  return response
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("dashboard_session")?.value
  const valid = validateSession(token)
  return NextResponse.json({ authenticated: valid })
}
