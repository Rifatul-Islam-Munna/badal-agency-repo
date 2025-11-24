import { Card } from "@/components/ui/card";
import React from "react";

const AboutSection = () => {
  return (
    <section className="py-8 md:py-12 mt-4 md:mt-7 rounded-[20px] bg-soft-bg/19 p-4 md:p-7">
      <div className="container mx-auto px-2 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 md:space-y-10 text-center lg:text-left">
            <p className="text-base md:text-lg text-text-blue font-normal">
              About Us
            </p>

            <h2 className="font-normal text-2xl sm:text-3xl lg:text-[32px] text-text-blue leading-snug">
              We're A Small Creative Agency Helping Brands Grow Through
              Strategy, Design, And Innovation.
            </h2>

            <p className="font-normal text-xl sm:text-2xl lg:text-3xl text-text-blue/90">
              We Provide UI/UX design, build websites, Graphic design,
              Development and more...
            </p>
          </div>

          {/* Right Side - 2x2 Grid with Cards */}
          {/* We use max-w-md to prevent it from getting huge on tablets, centered on mobile */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[350px] sm:max-w-md mx-auto lg:mx-0 lg:ml-auto">
            {/* Row 1, Col 1 - Project Complete Card */}
            <Card className="bg-white flex flex-col aspect-square justify-center items-center rounded-[20px] shadow-none p-4">
              <p className="text-sm sm:text-base md:text-lg text-text-blue mb-2 sm:mb-4 font-medium text-center">
                Project Complete
              </p>
              <h3 className="text-3xl sm:text-5xl lg:text-7xl font-normal text-text-blue whitespace-nowrap">
                351 +
              </h3>
            </Card>

            {/* Row 1, Col 2 - Empty Spacer */}
            <div className="aspect-square"></div>

            {/* Row 2, Col 1 - Empty Spacer */}
            <div className="aspect-square"></div>

            {/* Row 2, Col 2 - Satisfied Clients Card */}
            <Card className="bg-white flex flex-col aspect-square justify-center items-center rounded-[20px] shadow-none p-4">
              <p className="text-sm sm:text-base md:text-lg text-text-blue mb-2 sm:mb-4 font-medium text-center">
                Satisfied Clients
              </p>
              <h3 className="text-3xl sm:text-5xl lg:text-7xl font-normal text-text-blue whitespace-nowrap">
                325 +
              </h3>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
