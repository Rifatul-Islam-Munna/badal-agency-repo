// AboutSection.tsx
import { Card } from "@/components/ui/card";
import React from "react";

const AboutSection = () => {
  return (
    <section className="py-12 mt-7 rounded-[20px] bg-soft-bg/19 p-7">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Text Content */}
          <div className="space-y-10">
            <p className="text-lg text-text-blue font-normal">About Us</p>

            <h2 className="font-normal text-3xl text-text-blue leading-snug">
              We're A Small Creative Agency Helping Brands Grow Through
              Strategy, Design, And Innovation.
            </h2>

            <p className="font-normal text-3xl text-text-blue">
              We Provide UI/UX design, build websites, Graphic design,
              Development and more...
            </p>
          </div>

          {/* Right Side - 2x2 Grid with Cards */}
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {/* Row 1, Col 1 - Project Complete Card */}
            <Card className=" bg-white flex flex-col w-3xs aspect-square justify-center items-center  rounded-[20px] shadow-none">
              <p className="text-lg text-text-blue mb-4 font-medium">
                Project Complete
              </p>
              <h3 className="text-7xl font-normal text-text-blue">351 +</h3>
            </Card>

            {/* Row 1, Col 2 - Empty */}
            <div></div>

            {/* Row 2, Col 1 - Empty */}
            <div></div>

            {/* Row 2, Col 2 - Satisfied Clients Card */}
            <Card className="bg-white flex flex-col w-3xs aspect-square justify-center items-center  rounded-[20px] shadow-none">
              <p className="text-lg text-text-blue mb-4 font-medium">
                Satisfied Clients
              </p>
              <h3 className="text-7xl font-normal text-text-blue">325 +</h3>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
