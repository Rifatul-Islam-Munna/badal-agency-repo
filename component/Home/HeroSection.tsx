import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const HeroSection = () => {
  return (
    <Card className="relative overflow-hidden shadow-none mt-4 p-0 bg-gradient-to-br from-[#0a2540] via-[#0d3d5c] to-[#1a5570] rounded-2xl">
      <CardContent className="p-6 sm:p-10 md:p-12 lg:p-16 relative">
        {/* Decorative background elements - Adjusted for mobile visibility */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-20 h-20 sm:w-32 sm:h-32 border border-cyan-400/30 rotate-12" />
          <div className="absolute bottom-10 right-4 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 border border-cyan-400/20 -rotate-6" />
          <div className="absolute top-1/2 right-4 sm:right-10 w-2 h-2 bg-cyan-400 rounded-full" />
          <div className="absolute top-1/3 left-8 sm:left-1/4 w-1 h-1 bg-cyan-300 rounded-full" />
        </div>

        {/* Header with availability badge */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0 mb-10 md:mb-16 relative z-10">
          <div>
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-3">
                We Turn Your Ideas
                <br className="hidden sm:block" /> Into Reality
              </h1>
            </div>
          </div>

          {/* Badge - Left aligned on mobile, right on desktop */}
          <div className="self-start md:self-auto flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white text-sm sm:text-base md:text-lg">
              Available for projects
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-lg sm:text-xl mb-12 md:mb-32 max-w-md relative z-10 leading-relaxed">
          Badal helps you turn your work
          <br className="hidden sm:block" /> into something people remember.
        </p>

        {/* Bottom section with services and CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-0 relative z-10">
          {/* Services Grid - Stacked on mobile, side-by-side on desktop */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 sm:gap-12 md:gap-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between sm:justify-start gap-3 text-white group cursor-default">
                <span>UI UX Design</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-start gap-3 text-white group cursor-default">
                <span>Website Design</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
            </div>

            <div className="space-y-4 sm:ml-0 md:ml-12">
              <div className="flex items-center justify-between sm:justify-start gap-3 text-white group cursor-default">
                <span>Web Development</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
              <div className="flex items-center justify-between sm:justify-start gap-3 text-white group cursor-default">
                <span>Graphic Design</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ⟶
                </span>
              </div>
            </div>
          </div>

          {/* Get Started button - Full width on mobile, auto on desktop */}
          <button className="w-full md:w-auto border-2 border-white text-white px-8 sm:px-12 py-3 sm:py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 font-medium text-base sm:text-lg">
            Get Started
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
