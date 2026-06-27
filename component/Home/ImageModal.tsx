"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

export default function ImageModal({
  open,
  onClose,
  imageUrl,
  alt = "Image",
}: ImageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="h-dvh w-screen max-w-none rounded-none border-none bg-black/95 p-0 shadow-none outline-none sm:max-w-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
          aria-label="Close image preview"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="relative h-full w-full p-4 md:p-8">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
