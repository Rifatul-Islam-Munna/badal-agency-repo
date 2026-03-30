"use client"

type PdfPreviewProps = {
  file: string
  width: number
  updatedAt: string
  onError: (message: string | null) => void
}

export default function PdfPreview({
  file,
  width,
  updatedAt,
  onError,
}: PdfPreviewProps) {
  const src = `${file}${file.includes("?") ? "&" : "?"}v=${encodeURIComponent(updatedAt)}`

  return (
    <div className="space-y-4">
      <object
        key={`${file}-${updatedAt}`}
        data={src}
        type="application/pdf"
        width={width}
        style={{ minHeight: "calc(100vh - 200px)", height: "800px" }}
        className="w-full overflow-hidden rounded-2xl shadow-lg shadow-slate-300/50"
        onLoad={() => onError(null)}
      >
        {/* Fallback if browser doesn't support inline PDF */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-600">
            Your browser cannot display this PDF inline.
          </p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500 transition-colors"
          >
            Open PDF in New Tab
          </a>
        </div>
      </object>
    </div>
  )
}
