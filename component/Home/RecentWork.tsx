"use client";
import Image from "next/image";
import { useState } from "react";
import image1 from "@/app/assets/RecentWork/all-banner-1.png";
import image2 from "@/app/assets/RecentWork/all-banner-2.png";
import image3 from "@/app/assets/RecentWork/all-banner-3.png";
import image4 from "@/app/assets/RecentWork/all-banner-4.png";
import image5 from "@/app/assets/RecentWork/all-banner-5.png";
import image6 from "@/app/assets/RecentWork/all-banner-6.png";
import image7 from "@/app/assets/RecentWork/all-banner-7.png";

export default function RecentWork() {
  const [activeTab, setActiveTab] = useState("all");

  const categories = ["all", "ui ux", "website", "graphic", "logo"];

  // All images (update for filtering later if you want tab filtering)
  const images = [image1, image4, image2, image5, image3, image6, image7];
  const gridImagesDesktop = [
    {
      src: image1.src,
      grid: "col-span-2 row-span-3 row-start-1 col-start-1 h-80",
    },
    {
      src: image4.src,
      grid: "col-span-2 row-span-3 row-start-1 col-start-5 h-80",
    },
    {
      src: image2.src,
      grid: "col-span-2 row-span-3 row-start-4 col-start-1 h-80",
    },
    {
      src: image5.src,
      grid: "col-span-2 row-span-3 row-start-4 col-start-5 h-80",
    },
    { src: image3.src, grid: "col-span-2 row-span-6 row-start-1 col-start-3" },
  ];
  const gridImagesDesktop2 = [
    { src: image6.src, grid: "col-span-2 row-span-3 h-64" },
    { src: image7.src, grid: "col-span-2 row-span-3 col-start-3 h-64" },
  ];

  return (
    <section className="max-w-7xl mx-auto pt-11">
      <h1 className="mx-auto text-center text-3xl font-normal text-text-blue py-3">
        Our Recent Work
      </h1>
      <div className="border-b-3 border-text-blue/20 flex justify-center items-center">
        <nav className="flex space-x-8 overflow-x-auto scrollbar-hide snap-x text-text-blue snap-mandatory scroll-smooth -webkit-overflow-scrolling-touch">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-normal text-lg capitalize transition-colors duration-500 whitespace-nowrap snap-start flex-shrink-0 ${
                activeTab === tab
                  ? "border-soft-green text-text-blue"
                  : "border-transparent text-gray-500 hover:text-soft-green"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop Grid */}
      <div className="hidden md:block w-full pt-6 flex flex-col gap-3 min-h-dvh">
        <div className="grid grid-cols-6 grid-rows-6 gap-4">
          {gridImagesDesktop.map((img) => (
            <div
              key={img.src}
              className={`overflow-hidden group relative bg-soft-bg rounded-[20px] ${img.grid}`}
            >
              <Image
                src={img.src}
                alt="recent-work"
                width={1000}
                height={1000}
                loading="lazy"
                className="w-full object-cover h-full transition"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-6">
          {gridImagesDesktop2.map((img) => (
            <div
              key={img.src}
              className={`overflow-hidden group relative bg-soft-bg rounded-[20px] ${img.grid}`}
            >
              <Image
                src={img.src}
                alt="recent-work"
                width={1000}
                height={1000}
                loading="lazy"
                className="w-full h-full  object-cover transition"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Mobile: Stacked Images */}
      <div className="md:hidden w-full flex flex-col gap-5 pt-6">
        {images.map((img, i) => (
          <div key={i} className="rounded-[20px] overflow-hidden bg-soft-bg">
            <Image
              src={img.src}
              alt="recent-work"
              width={700}
              height={700}
              quality={60}
              loading="lazy"
              className="w-full h-auto object-cover transition"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
