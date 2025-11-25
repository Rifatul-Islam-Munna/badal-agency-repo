"use client";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import React, { Suspense } from "react";

/* import Threads from "@/components/Threads"; */
const Threads = dynamic(() => import("@/components/Threads"), { ssr: false });
const HeroSection = () => {
  return (
    <Card className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a2540] via-[#0d3d5c] to-[#1a5570] p-0 shadow-none">
      <CardContent className="relative flex flex-col justify-between p-6 sm:p-10 md:min-h-[675px] md:p-12 lg:p-16">
        {/* Decorative background elements - Adjusted for mobile visibility */}
        {/*  <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute left-4 top-10 h-20 w-20 rotate-12 border border-cyan-400/30 sm:left-10 sm:top-20 sm:h-32 sm:w-32" />
          <div className="absolute bottom-10 right-4 h-16 w-16 -rotate-6 border border-cyan-400/20 sm:right-20 sm:h-24 sm:w-24" />
          <div className="absolute right-4 top-1/2 h-2 w-2 rounded-full bg-cyan-400 sm:right-10" />
          <div className="absolute left-8 top-1/3 h-1 w-1 rounded-full bg-cyan-300 sm:left-1/4" />
        </div> */}

        {/* Header with availability badge */}
        <div className="relative z-10 mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-start md:justify-between md:gap-0">
          <div>
            <div className="relative inline-block">
              <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                We Turn Your Ideas
                <br className="hidden sm:block" /> Into Reality
              </h1>
            </div>
          </div>

          {/* Badge - Left aligned on mobile, right on desktop - Fixed width */}
          <div className="flex w-full items-center justify-center gap-2 self-start rounded-full bg-slate-800/50 px-4 py-2 backdrop-blur-sm md:w-[220px] md:self-auto">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm text-white sm:text-base md:text-lg">
              Available for projects
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="relative z-10 mb-12  flex flex-col justify-center flex-1 max-w-md text-lg leading-relaxed text-slate-300 sm:text-xl md:mb-32">
          Badal helps you turn your work
          <br className="hidden sm:block" /> into something people remember.
        </p>
        <div className=" absolute w-full -translate-x-6 md:-translate-x-16 h-full">
          <Suspense fallback={null}>
            <Threads
              amplitude={2.3}
              distance={0.8}
              enableMouseInteraction={false}
              color={[255, 255, 255]}
            />
          </Suspense>
        </div>

        {/* Bottom section with services and CTA */}
        <div className="relative z-10 mt-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-0">
          {/* Services Grid - Stacked on mobile, side-by-side on desktop */}
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-12 md:w-auto md:gap-0">
            <div className="space-y-4">
              <div className="group flex cursor-default items-center gap-1 text-white">
                <span className=" w-44 md:w-40 text-left">UI UX Design</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
              <div className="group flex cursor-default items-center gap-1 text-white">
                <span className=" w-44 md:w-40 text-left">Website Design</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
            </div>

            <div className="space-y-4 sm:ml-0 md:ml-12">
              <div className="group flex cursor-default items-center gap-1 text-white">
                <span className="w-44 text-left">Web Development</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
              <div className="group flex cursor-default items-center gap-1 text-white">
                <span className="w-44 text-left">Graphic Design</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
            </div>
          </div>

          {/* Get Started button - Full width on mobile, fixed width on desktop */}
          <button className="w-full rounded-full border-2 border-white px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-slate-900 sm:py-2 sm:text-lg md:w-[220px]">
            Get Started
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
