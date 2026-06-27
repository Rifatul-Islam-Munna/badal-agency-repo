"use client";
import Image from "next/image";
import { useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import ImageModal from "./ImageModal";

export default function RecentWork() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const longImages = [
    "/longimage/Group 39532.png",
    "/longimage/Rectangle 8830.png",
    "/longimage/Rectangle 8832.png",
    "/longimage/Rectangle 8834.png",
  ];

  const shortImagesRowOne = [
    "/shortimage/Rectangle 8868.png",
    "/shortimage/Rectangle 8869.png",
    "/shortimage/Rectangle 8870.png",
    "/shortimage/Rectangle 8871.png",
    "/shortimage/Rectangle 8872.png",
    "/shortimage/Rectangle 8873.png",
    "/shortimage/Rectangle 8874.png",
    "/shortimage/Rectangle 8875.png",
  ];

  const shortImagesRowTwo = [
    "/shortimage/Rectangle 8876.png",
    "/shortimage/Rectangle 8877.png",
    "/shortimage/Rectangle 8878.png",
    "/shortimage/Rectangle 8879.png",
    "/shortimage/Rectangle 8880.png",
    "/shortimage/Rectangle 8881.png",
    "/shortimage/Rectangle 8882.png",
    "/shortimage/Rectangle 8883.png",
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const renderImage = (
    src: string,
    sizeClass: string,
    sizes: string
  ) => (
    <button
      key={src}
      type="button"
      onClick={() => handleImageClick(src)}
      className={`relative shrink-0 overflow-hidden rounded-[20px] bg-soft-bg ${sizeClass}`}
      aria-label="Open recent work image"
    >
      <Image
        src={src}
        alt="Badal Agency recent work preview"
        fill
        loading="lazy"
        className="object-cover"
        sizes={sizes}
      />
    </button>
  );

  return (
    <section
      id="work"
      aria-labelledby="recent-work-heading"
      className="w-full overflow-hidden pt-11"
    >
      <h2
        id="recent-work-heading"
        className="mx-auto text-center text-3xl font-normal text-text-blue py-3"
      >
        Our Recent Work
      </h2>

      <div className="pt-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <Marquee className="[--duration:34s] [--gap:1rem]" pauseOnHover>
          {longImages.map((src) =>
            renderImage(
              src,
              "h-48 w-[320px] md:h-72 md:w-[560px]",
              "(min-width: 768px) 560px, 320px"
            )
          )}
        </Marquee>
        <Marquee className="[--duration:42s] [--gap:1rem]" reverse pauseOnHover>
          {shortImagesRowOne.map((src) =>
            renderImage(
              src,
              "h-72 w-[220px] md:h-[420px] md:w-[320px]",
              "(min-width: 768px) 320px, 220px"
            )
          )}
        </Marquee>
        <Marquee className="[--duration:42s] [--gap:1rem]" pauseOnHover>
          {shortImagesRowTwo.map((src) =>
            renderImage(
              src,
              "h-72 w-[220px] md:h-[420px] md:w-[320px]",
              "(min-width: 768px) 320px, 220px"
            )
          )}
        </Marquee>
      </div>
      <ImageModal
        imageUrl={selectedImage}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </section>
  );
}
