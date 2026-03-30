import "server-only"

import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
  api_key: process.env.CLOUDINARY_API_KEY ,
  api_secret:
    process.env.CLOUDINARY_API_SECRET ,
})

export { cloudinary }

/**
 * Upload a Buffer (e.g. a PDF) to Cloudinary as a raw file.
 * Returns the secure URL of the uploaded resource.
 */
export async function uploadBuffer(
  buffer: Buffer,
  publicId: string,
  folder = "badal-agency/pdfs",
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: publicId,
        folder,
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result!.secure_url)
      },
    )
    stream.end(buffer)
  })
}

/**
 * Download a file from a URL and return it as a Buffer.
 */
export async function downloadBuffer(url: string): Promise<Buffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download from Cloudinary: ${res.statusText}`)
  return Buffer.from(await res.arrayBuffer())
}

/**
 * Delete a resource from Cloudinary by public ID.
 */
export async function deleteResource(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" })
  } catch {
    // Ignore — resource may not exist
  }
}
