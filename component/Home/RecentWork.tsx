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

  return (
    <section className=" max-w-7xl mx-auto py-11 ">
      <h1 className=" mx-auto text-center text-3xl font-normal text-text-blue py-3">
        Our Recent Work
      </h1>
      <div className="border-b-3 border-text-blue/20 flex justify-center items-center">
        <nav className="flex space-x-8 overflow-x-auto scrollbar-hide snap-x  text-text-blue snap-mandatory scroll-smooth -webkit-overflow-scrolling-touch">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1  border-b-2 font-normal text-lg capitalize transition-colors duration-500 whitespace-nowrap snap-start flex-shrink-0 ${
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

      <div className=" w-full  py-6 flex flex-col  gap-3 min-h-dvh ">
        <div className="grid grid-cols-6 grid-rows-6 gap-4 ">
          <div className="col-span-2 overflow-hidden  group  row-span-3 relative  bg-soft-bg h-80 rounded-[20px] ">
            <Image
              src={image1.src}
              width={1000}
              height={1000}
              className=" w-full h-full"
              alt="rect-wrok"
            />
          </div>
          <div className="col-span-2 h-80 row-span-3 col-start-5 row-start-1 bg-soft-bg  rounded-[20px]">
            <Image
              src={image4.src}
              width={1000}
              height={1000}
              className=" w-full h-full"
              alt="rect-wrok"
            />
          </div>
          <div className="col-span-2 h-80 row-span-3 col-start-1 row-start-4 bg-soft-bg  rounded-[20px]">
            <Image
              src={image2.src}
              width={1000}
              height={1000}
              className=" w-full h-full"
              alt="rect-wrok"
            />
          </div>
          <div className="col-span-2 h-80 row-span-3 col-start-5 row-start-4 bg-soft-bg  rounded-[20px]">
            <Image
              src={image5.src}
              width={1000}
              height={1000}
              className=" w-full h-full"
              alt="rect-wrok"
            />
          </div>
          <div className="col-span-2 row-span-6   col-start-3 row-start-1 bg-soft-bg  rounded-[20px]">
            <Image
              src={image3.src}
              width={1000}
              height={1000}
              className=" w-full h-full"
              alt="rect-wrok"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 grid-rows-4 gap-4">
          <div className="col-span-2 row-span-3 bg-soft-bg h-64  rounded-[20px]">
            <Image
              src={image6.src}
              width={1000}
              height={1000}
              className=" w-full h-full"
              alt="rect-wrok"
            />
          </div>
          <div className="col-span-2 row-span-3 col-start-3 bg-soft-bg  rounded-[20px]">
            <Image
              src={image7.src}
              width={1000}
              height={1000}
              className=" w-full h-full"
              alt="rect-wrok"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
