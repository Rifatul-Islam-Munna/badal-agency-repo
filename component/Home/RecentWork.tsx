"use client";
import Image from "next/image";
import { useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import ImageModal from "./ImageModal";

export default function RecentWork() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const longImages = [
    { src: "/longimage/Group 39532.png", width: 3953, height: 1129 },
    { src: "/longimage/Rectangle 8830.png", width: 974, height: 1128 },
    { src: "/longimage/Rectangle 8832.png", width: 1968, height: 1128 },
    { src: "/longimage/Rectangle 8834.png", width: 974, height: 1128 },
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
  ].map((src) => ({ src, width: 976, height: 794 }));

  const shortImagesRowTwo = [
    "/shortimage/Rectangle 8876.png",
    "/shortimage/Rectangle 8877.png",
    "/shortimage/Rectangle 8878.png",
    "/shortimage/Rectangle 8879.png",
    "/shortimage/Rectangle 8880.png",
    "/shortimage/Rectangle 8881.png",
    "/shortimage/Rectangle 8882.png",
    "/shortimage/Rectangle 8883.png",
  ].map((src) => ({ src, width: 976, height: 794 }));

  const rows = [
    {
      images: longImages,
      className: "[--duration:32s] [--gap:0.85rem]",
      itemClass: "h-28 md:h-40 lg:h-44",
      sizes: "(min-width: 1024px) 620px, (min-width: 768px) 560px, 390px",
    },
    {
      images: shortImagesRowOne,
      className: "[--duration:42s] [--gap:0.85rem]",
      itemClass: "h-36 md:h-52 lg:h-56",
      sizes: "(min-width: 1024px) 275px, (min-width: 768px) 255px, 180px",
      reverse: true,
    },
    {
      images: shortImagesRowTwo,
      className: "[--duration:42s] [--gap:0.85rem]",
      itemClass: "h-36 md:h-52 lg:h-56",
      sizes: "(min-width: 1024px) 275px, (min-width: 768px) 255px, 180px",
    },
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsOpen(true);
  };

  const renderImage = (
    image: { src: string; width: number; height: number },
    sizeClass: string,
    sizes: string
  ) => (
    <button
      key={image.src}
      type="button"
      onClick={() => handleImageClick(image.src)}
      className={`relative shrink-0 overflow-hidden rounded-[14px] bg-white shadow-sm ring-1 ring-black/5 ${sizeClass}`}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
      aria-label="Open recent work image"
    >
      <Image
        src={image.src}
        alt="Badal Agency recent work preview"
        fill
        loading="lazy"
        className="object-contain"
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

      <div className="space-y-2 pt-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:space-y-3">
        {rows.map((row, index) => (
          <Marquee
            key={index}
            className={row.className}
            reverse={row.reverse}
            pauseOnHover
          >
            {row.images.map((image) =>
              renderImage(image, row.itemClass, row.sizes)
            )}
          </Marquee>
        ))}
      </div>
      <ImageModal
        imageUrl={selectedImage}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </section>
  );
}
