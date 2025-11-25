import { Card } from "@/components/ui/card";

import { NumberTicker } from "@/components/ui/number-ticker";
import React, { Suspense } from "react";

const AboutSection = () => {
  return (
    <section className=" mt-11 rounded-[20px] bg-soft-bg/19 p-6 sm:p-10 md:min-h-[675px] ">
      <div className="flex h-full items-center px-2">
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Text Content */}
          <div className="space-y-6 text-center h-full flex flex-col justify-between  lg:text-left">
            <p className="text-base font-normal text-text-blue md:text-lg">
              About Us
            </p>

            <h2 className="text-2xl font-normal leading-snug text-text-blue sm:text-3xl lg:text-[32px]">
              We're A Small Creative Agency Helping Brands Grow Through
              Strategy, Design, And Innovation.
            </h2>

            <p className="text-xl font-normal text-text-blue/90 sm:text-2xl lg:text-3xl">
              We Provide UI/UX design, build websites, Graphic design,
              Development and more...
            </p>
          </div>

          {/* Right Side - 2x2 Grid with Cards */}
          {/* We use max-w-md to prevent it from getting huge on tablets, centered on mobile */}
          <div className="mx-auto grid w-full max-w-[350px] grid-cols-2 gap-4 sm:max-w-md sm:gap-6 lg:mx-0 lg:ml-auto">
            {/* Row 1, Col 1 - Project Complete Card */}
            <Card className="flex aspect-square flex-col items-center justify-center rounded-[20px] bg-white p-4 shadow-none">
              <p className="mb-2 text-center text-sm font-medium text-text-blue sm:mb-4 sm:text-base md:text-lg">
                Project Complete
              </p>
              <Suspense fallback={null}>
                <NumberTicker
                  value={351}
                  className="whitespace-nowrap text-3xl font-normal text-text-blue sm:text-5xl lg:text-7xl"
                />
              </Suspense>
            </Card>

            {/* Row 1, Col 2 - Empty Spacer */}
            <div className="aspect-square"></div>

            {/* Row 2, Col 1 - Empty Spacer */}
            <div className="aspect-square"></div>

            {/* Row 2, Col 2 - Satisfied Clients Card */}
            <Card className="flex aspect-square flex-col items-center justify-center rounded-[20px] bg-white p-4 shadow-none">
              <p className="mb-2 text-center text-sm font-medium text-text-blue sm:mb-4 sm:text-base md:text-lg">
                Satisfied Clients
              </p>
              <Suspense fallback={null}>
                <NumberTicker
                  value={325}
                  className="whitespace-nowrap text-3xl font-normal text-text-blue sm:text-5xl lg:text-7xl"
                />
              </Suspense>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
