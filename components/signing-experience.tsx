"use client"

import { useEffect, useEffectEvent, useRef, useState } from "react"

import SignatureCanvas from "react-signature-canvas"
import { FileCheck2, Loader2, PenLine, RefreshCcw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { SigningRole, SigningStatusResponse } from "@/lib/signing/types"
import PdfPreview from "@/components/signing/pdf-preview"

type SigningExperienceProps = {
  role: SigningRole
  token?: string
}

function formatRole(role: SigningRole) {
  return role === "admin"
    ? "Company Representative"
    : "Counterparty Representative"
}

function formatStatus(status: "pending" | "signed") {
  return status === "signed" ? "Signed" : "Pending"
}

function formatSignedAt(timestamp: string | null) {
  if (!timestamp) {
    return "Not signed yet"
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp))
}

function StatusPill({
  label,
  value,
}: {
  label: string
  value: "pending" | "signed"
}) {
  const isSigned = value === "signed"

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/90 px-4 py-3">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span
        className={[
          "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
          isSigned
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700",
        ].join(" ")}
      >
        {formatStatus(value)}
      </span>
    </div>
  )
}

export default function SigningExperience({
  role,
  token,
}: SigningExperienceProps) {
  const signatureRef = useRef<SignatureCanvas | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const [status, setStatus] = useState<SigningStatusResponse | null>(null)
  const [previewWidth, setPreviewWidth] = useState(320)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pdfError, setPdfError] = useState<string | null>(null)

  const title = `${formatRole(role)} Signature`
  const isAlreadySigned = status?.selfStatus === "signed"

  useEffect(() => {
    if (!previewRef.current) {
      return
    }

    const element = previewRef.current
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }

      setPreviewWidth(Math.max(280, Math.floor(entry.contentRect.width) - 32))
    })

    observer.observe(element)
    setPreviewWidth(Math.max(280, element.clientWidth - 32))

    return () => observer.disconnect()
  }, [])

  async function loadStatus(silent = false) {
    if (!token) {
      setLoading(false)
      setError("This signing link is incomplete. A token is required.")
      return
    }

    if (silent) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    try {
      const response = await fetch(
        `/api/sign?token=${encodeURIComponent(token)}&role=${role}`,
        {
          cache: "no-store",
        },
      )
      const payload = (await response.json()) as
        | SigningStatusResponse
        | { error?: string }

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to load signing status.")
      }

      setStatus(payload as SigningStatusResponse)
      setError(null)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load signing status.",
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const syncStatus = useEffectEvent(async (silent = false) => {
    await loadStatus(silent)
  })

  useEffect(() => {
    void syncStatus()
  }, [role, token])

  useEffect(() => {
    if (!token || status?.allSigned) {
      return
    }

    const timer = window.setInterval(() => {
      void syncStatus(true)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [role, status?.allSigned, token])

  async function handleSign() {
    if (!token) {
      toast.error("Missing signing token.")
      return
    }

    const pad = signatureRef.current
    if (!pad || pad.isEmpty()) {
      toast.error("Please add your signature before submitting.")
      return
    }

    const signatureDataUrl = pad.getCanvas().toDataURL("image/png")

    setSubmitting(true)

    try {
      const response = await fetch(
        `/api/sign?token=${encodeURIComponent(token)}&role=${role}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ signatureDataUrl }),
        },
      )

      const payload = (await response.json()) as
        | SigningStatusResponse
        | { error?: string }

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save the signature.")
      }

      setStatus(payload as SigningStatusResponse)
      setPdfError(null)
      pad.clear()
      toast.success("Signature saved.")
    } catch (requestError) {
      toast.error(
        requestError instanceof Error
          ? requestError.message
          : "Unable to save the signature.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  const waitingMessage = status?.allSigned
    ? "Both signatures are complete. The final PDF is ready to download."
    : status?.otherStatus === "signed"
      ? `${formatRole(status.otherRole)} has already signed.`
      : `Waiting for the ${formatRole(
          status?.otherRole ?? (role === "admin" ? "client" : "admin"),
        ).toLowerCase()} signature.`

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_40%),linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 xl:grid xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="flex flex-col gap-6 xl:sticky xl:top-6 xl:self-start">
          <Card className="border-slate-200 bg-white/90 shadow-lg shadow-slate-200/60 backdrop-blur">
            <CardHeader className="gap-3">
              <div className="flex items-center gap-3 text-sky-700">
                <div className="rounded-2xl bg-sky-100 p-2">
                  <PenLine className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-slate-900">{title}</CardTitle>
                  <CardDescription className="mt-1 text-sm text-slate-600">
                    Review the agreement, add your signature, and submit from this private link.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatusPill
                label={`${formatRole(role)} status`}
                value={status?.selfStatus ?? "pending"}
              />
              <StatusPill
                label={`${formatRole(role === "admin" ? "client" : "admin")} status`}
                value={status?.otherStatus ?? "pending"}
              />
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <p className="font-medium text-slate-900">{waitingMessage}</p>
                <p className="mt-1">
                  Recorded at: {formatSignedAt(status?.signedAt ?? null)}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-slate-300 bg-white"
                  onClick={() => void loadStatus(true)}
                  disabled={refreshing || loading}
                >
                  {refreshing ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <RefreshCcw className="size-4" />
                  )}
                  Refresh Status
                </Button>
                {status?.downloadUrl ? (
                  <Button asChild className="flex-1 bg-slate-900 text-white hover:bg-slate-800">
                    <a href={status.downloadUrl}>Download Final PDF</a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white/90 shadow-lg shadow-slate-200/60 backdrop-blur">
            <CardHeader className="gap-2">
              <CardTitle className="text-xl text-slate-900">Signature Panel</CardTitle>
              <CardDescription className="text-sm text-slate-600">
                Sign inside the canvas below. Your signature is placed on the final page of the agreement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-white shadow-inner shadow-slate-100">
                <SignatureCanvas
                  ref={signatureRef}
                  clearOnResize={false}
                  penColor="#0f172a"
                  canvasProps={{
                    width: 600,
                    height: 220,
                    className: "h-44 w-full bg-white",
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-300 bg-white"
                  onClick={() => signatureRef.current?.clear()}
                  disabled={submitting}
                >
                  Clear Canvas
                </Button>
                <Button
                  type="button"
                  className="bg-sky-600 text-white hover:bg-sky-500"
                  onClick={() => void handleSign()}
                  disabled={submitting || isAlreadySigned || loading || Boolean(error)}
                >
                  {submitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <FileCheck2 className="size-4" />
                  )}
                  {isAlreadySigned ? "Signature Applied" : "Apply Signature"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="overflow-hidden border-slate-200 bg-white/90 shadow-lg shadow-slate-200/60 backdrop-blur">
          <CardHeader className="border-b border-slate-200 bg-white/80">
            <CardTitle className="text-xl text-slate-900">Agreement Preview</CardTitle>
            <CardDescription className="text-sm text-slate-600">
              The preview refreshes automatically after each signature.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {!token ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                This signing link is incomplete. A token is required to access the agreement.
              </div>
            ) : loading ? (
              <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-500">
                <Loader2 className="mr-3 size-5 animate-spin" />
                Loading agreement...
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                {error}
              </div>
            ) : (
              <div
                ref={previewRef}
                className="rounded-3xl border border-slate-200 bg-slate-100 p-4 shadow-inner shadow-slate-200/70"
              >
                {pdfError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">
                    {pdfError}
                  </div>
                ) : null}

                {status?.currentPdfUrl ? (
                  <PdfPreview
                    file={status.currentPdfUrl}
                    width={previewWidth}
                    updatedAt={status.updatedAt}
                    onError={setPdfError}
                  />
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
