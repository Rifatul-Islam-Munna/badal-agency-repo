"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Upload,
  LogOut,
  FileText,
  Copy,
  Check,
  Trash2,
  Loader2,
  Lock,
  ExternalLink,
  FolderOpen,
} from "lucide-react"

type DocumentItem = {
  id: string
  original_name: string
  envelope_id: string
  admin_link: string
  client_link: string
  created_at: string
}

export default function DashboardPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)

  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth")
      const data = await res.json()
      setAuthenticated(data.authenticated === true)
    } catch {
      setAuthenticated(false)
    } finally {
      setChecking(false)
    }
  }, [])

  const loadDocuments = useCallback(async () => {
    setLoadingDocs(true)
    try {
      const res = await fetch("/api/dashboard/documents")
      if (!res.ok) throw new Error()
      const data = await res.json()
      setDocuments(data.documents ?? [])
    } catch {
      setDocuments([])
    } finally {
      setLoadingDocs(false)
    }
  }, [])

  useEffect(() => {
    void checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (authenticated) {
      void loadDocuments()
    }
  }, [authenticated, loadDocuments])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError("")

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setLoginError(data.error ?? "Login failed.")
        return
      }

      setAuthenticated(true)
      setUsername("")
      setPassword("")
    } catch {
      setLoginError("Network error. Please try again.")
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" })
    setAuthenticated(false)
    setDocuments([])
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/dashboard/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        alert(data.error ?? "Upload failed.")
        return
      }

      await loadDocuments()
    } catch {
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this document and its signing links?")) return

    try {
      const res = await fetch("/api/dashboard/documents", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id))
      }
    } catch {
      alert("Failed to delete.")
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  function formatDate(iso: string) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso))
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-sky-400" />
      </div>
    )
  }

  // ── Login Screen ──
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-4">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-sm"
        >
          {/* Glass card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/40 p-8">
            {/* Icon */}
            <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/30">
              <Lock className="size-6 text-white" />
            </div>

            <h1 className="text-center text-2xl font-bold text-white mb-1">
              Dashboard Login
            </h1>
            <p className="text-center text-sm text-slate-400 mb-8">
              Enter your credentials to continue
            </p>

            {loginError && (
              <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  Username
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  placeholder="Enter username"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-white placeholder:text-slate-500 outline-none focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loginLoading}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/8 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0f1a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600">
              <FileText className="size-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-white">
              Signing Dashboard
            </h1>
          </div>

          <button
            id="logout-button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all"
          >
            <LogOut className="size-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* Upload Card */}
        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                Upload Document
              </h2>
              <p className="text-sm text-slate-400">
                Upload a PDF to generate signing links for admin &amp; client. No account needed to sign.
              </p>
            </div>

            <label
              id="upload-button"
              className={`
                flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium cursor-pointer transition-all shrink-0
                ${uploading
                  ? "bg-white/[0.06] text-slate-400 cursor-wait"
                  : "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:brightness-110"
                }
              `}
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {uploading ? "Uploading..." : "Choose PDF"}
              <input
                type="file"
                accept=".pdf"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Documents List */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <div className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <FolderOpen className="size-5 text-sky-400" />
              Documents
              <span className="ml-2 text-xs font-normal text-slate-500 bg-white/[0.06] px-2 py-0.5 rounded-full">
                {documents.length}
              </span>
            </h2>
            <button
              onClick={() => void loadDocuments()}
              disabled={loadingDocs}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              {loadingDocs ? "Loading..." : "Refresh"}
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <FileText className="mx-auto size-12 text-slate-600 mb-4" />
              <p className="text-slate-400 text-sm">
                No documents yet. Upload a PDF to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.04]">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="px-6 py-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* File info */}
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                        <FileText className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {doc.original_name}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {formatDate(doc.created_at)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Signing links */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Admin Link */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-400 mb-2">
                        Admin Sign Link
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          readOnly
                          value={doc.admin_link}
                          className="flex-1 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 text-xs text-slate-300 outline-none truncate"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(doc.admin_link, `admin-${doc.id}`)
                          }
                          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
                          title="Copy admin link"
                        >
                          {copiedId === `admin-${doc.id}` ? (
                            <Check className="size-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                        <a
                          href={doc.admin_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
                          title="Open admin link"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Client Link */}
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-sky-400 mb-2">
                        Client Sign Link
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          readOnly
                          value={doc.client_link}
                          className="flex-1 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 text-xs text-slate-300 outline-none truncate"
                        />
                        <button
                          onClick={() =>
                            copyToClipboard(doc.client_link, `client-${doc.id}`)
                          }
                          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
                          title="Copy client link"
                        >
                          {copiedId === `client-${doc.id}` ? (
                            <Check className="size-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </button>
                        <a
                          href={doc.client_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1] transition-all"
                          title="Open client link"
                        >
                          <ExternalLink className="size-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-8">
          Upload a PDF → share the signing link → they sign directly, no account needed.
        </p>
      </main>
    </div>
  )
}
