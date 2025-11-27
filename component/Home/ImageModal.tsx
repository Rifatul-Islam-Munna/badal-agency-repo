"use client";

import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
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
        className="max-w-[90vw] sm:max-w-[600px] p-0 overflow-hidden bg-transparent border-none outline-none shadow-none"
      >
        {/* Close Button */}

        {/* Image Container - 1:1 Ratio */}
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={alt}
            width={2000}
            height={2000}
            className=" w-full h-full"
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
