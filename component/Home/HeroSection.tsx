import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const HeroSection = () => {
  return (
    <Card className="relative overflow-hidden shadow-none mt-4 p-0 bg-gradient-to-br from-[#0a2540] via-[#0d3d5c] to-[#1a5570] rounded-2xl">
      <CardContent className="p-12 md:p-16 relative">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-cyan-400/30 rotate-12" />
          <div className="absolute bottom-10 right-20 w-24 h-24 border border-cyan-400/20 -rotate-6" />
          <div className="absolute top-1/2 right-10 w-2 h-2 bg-cyan-400 rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full" />
        </div>

        {/* Header with availability badge */}
        <div className="flex justify-between items-start mb-16 relative z-10">
          <div>
            <div className="relative inline-block">
              <h1 className="text-5xl font-semibold text-white leading-tight mb-3">
                We Turn Your Ideas
                <br />
                Into Reality
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-white text-lg">Available for projects</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-xl mb-32 max-w-md relative z-10">
          Badal helps you turn your work
          <br />
          into something people remember.
        </p>

        {/* Bottom section with services and CTA */}
        <div className="flex justify-between text-lg items-end relative z-10">
          <div className="space-y-4">
            {/* Services list */}
            <div className="flex items-center gap-3 text-white">
              <span>UI UX Design</span>
              <span className="">⟶</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span>Website Design</span>
              <span className="">⟶</span>
            </div>
          </div>

          <div className="space-y-4 ml-12">
            <div className="flex items-center gap-3 text-white">
              <span>Web Development</span>
              <span className="">⟶</span>
            </div>
            <div className="flex items-center gap-3 text-white">
              <span>Graphic Design</span>
              <span className="">⟶</span>
            </div>
          </div>

          {/* Get Started button */}
          <button className="border-2 border-white text-white px-12 py-2 rounded-full hover:bg-white hover:text-slate-900 transition-all duration-300 font-medium">
            Get Started
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
