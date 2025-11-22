"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import image1 from "@/public/image1.png";
import image2 from "@/public/image2.png";

const TeamSection = () => {
  const [hoveredCard, setHoveredCard] = useState<"left" | "right" | null>(
    "left"
  );
  const [expandedCard, setExpandedCard] = useState<"left" | "right" | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size - only true mobile (< 640px) gets mobile layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // Changed from 768 to 640
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1,
  };

  const mobileTransition = {
    type: "spring",
    stiffness: 150,
    damping: 20,
  };

  const handleMobileClick = (card: "left" | "right") => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-6 sm:py-10 min-h-[600px] sm:h-[500px] flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:h-[400px]">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 sm:h-full">
            {/* ================== LEFT CARD ================== */}
            <m.div
              className="relative overflow-hidden bg-white rounded-[16px] sm:rounded-[20px] cursor-pointer"
              onClick={() => isMobile && handleMobileClick("left")}
              onMouseEnter={() => !isMobile && setHoveredCard("left")}
              animate={{
                flex: isMobile ? 1 : hoveredCard === "left" ? 3 : 1,
                height: isMobile
                  ? expandedCard === "left"
                    ? "auto"
                    : "280px"
                  : "100%",
              }}
              transition={isMobile ? mobileTransition : transition}
            >
              {/* Mobile Layout (< 640px only) */}
              {isMobile ? (
                <div className="flex flex-col">
                  {/* Image Section */}
                  <div className="relative w-full h-[280px] overflow-hidden">
                    <Image
                      src={image2}
                      alt="Badal Hossain"
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />

                    {/* Mobile Overlay */}
                    <m.div
                      className="absolute bottom-0 w-full bg-[#05364a]/60 py-4 text-center backdrop-blur-sm"
                      animate={{ opacity: expandedCard === "left" ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg text-white font-medium">
                        Badal Hossain
                      </h3>
                      <p className="text-white/80 text-sm">CEO & Founder</p>
                    </m.div>
                  </div>

                  {/* Expandable Content */}
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedCard === "left" ? "auto" : 0,
                      opacity: expandedCard === "left" ? 1 : 0,
                    }}
                    transition={mobileTransition}
                    className="overflow-hidden bg-soft-bg/19"
                  >
                    <div className="px-6 py-6">
                      <h3 className="font-medium text-text-blue text-2xl mb-2">
                        Badal Hossain
                      </h3>
                      <p className="text-text-blue font-light text-base mb-4">
                        CEO & Founder
                      </p>
                      <hr className="border-text-blue/20 mb-4" />
                      <p className="text-text-blue text-base leading-relaxed">
                        Graphic Designer | UI/UX Designer | User Researcher |
                        Website Developer
                      </p>
                    </div>
                  </m.div>
                </div>
              ) : (
                /* Horizontal Layout - For sm (640px+), md (768px+), and larger */
                <div className="flex h-full w-full flex-row">
                  <m.div
                    className="relative h-full overflow-hidden z-10"
                    animate={{ width: hoveredCard === "left" ? "40%" : "100%" }}
                    transition={transition}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={image2}
                        alt="Badal Hossain"
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority
                      />
                    </div>

                    <m.div
                      className="absolute bottom-0 w-full bg-[#05364a]/60 py-4 text-center backdrop-blur-sm"
                      animate={{ opacity: hoveredCard === "left" ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl text-white font-medium">
                        Badal Hossain
                      </h3>
                      <p className="text-white/80 text-sm">CEO & Founder</p>
                    </m.div>
                  </m.div>

                  <m.div
                    className="bg-soft-bg/19 h-full flex flex-col justify-center overflow-hidden"
                    animate={{
                      width: hoveredCard === "left" ? "60%" : "0%",
                      opacity: hoveredCard === "left" ? 1 : 0,
                    }}
                    transition={transition}
                  >
                    <div className="w-[400px] px-8 py-6">
                      <h3 className="font-medium text-text-blue text-3xl mb-2">
                        Badal Hossain
                      </h3>
                      <p className="text-text-blue font-light text-lg mb-6">
                        CEO & Founder
                      </p>
                      <hr className="border-text-blue/20 mb-6" />
                      <p className="text-text-blue text-lg leading-relaxed">
                        Graphic Designer | UI/UX Designer | User Researcher |
                        Website Developer
                      </p>
                    </div>
                  </m.div>
                </div>
              )}
            </m.div>

            {/* ================== RIGHT CARD ================== */}
            <m.div
              className="relative overflow-hidden bg-white rounded-[16px] sm:rounded-[20px] cursor-pointer"
              onClick={() => isMobile && handleMobileClick("right")}
              onMouseEnter={() => !isMobile && setHoveredCard("right")}
              animate={{
                flex: isMobile ? 1 : hoveredCard === "right" ? 3 : 1,
                height: isMobile
                  ? expandedCard === "right"
                    ? "auto"
                    : "280px"
                  : "100%",
              }}
              transition={isMobile ? mobileTransition : transition}
            >
              {/* Mobile Layout (< 640px only) */}
              {isMobile ? (
                <div className="flex flex-col">
                  {/* Image Section */}
                  <div className="relative w-full h-[280px] overflow-hidden">
                    <Image
                      src={image1}
                      alt="Rifatul Islam"
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />

                    {/* Mobile Overlay */}
                    <m.div
                      className="absolute bottom-0 w-full bg-[#05364a]/60 py-4 text-center backdrop-blur-sm"
                      animate={{ opacity: expandedCard === "right" ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-lg text-white font-medium">
                        Rifatul Islam
                      </h3>
                      <p className="text-white/80 text-sm">
                        Full-Stack Developer
                      </p>
                    </m.div>
                  </div>

                  {/* Expandable Content */}
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedCard === "right" ? "auto" : 0,
                      opacity: expandedCard === "right" ? 1 : 0,
                    }}
                    transition={mobileTransition}
                    className="overflow-hidden bg-soft-bg/19"
                  >
                    <div className="px-6 py-6">
                      <h3 className="font-medium text-text-blue text-2xl mb-2">
                        Rifatul Islam
                      </h3>
                      <p className="text-text-blue font-light text-base mb-4">
                        Full-Stack Developer
                      </p>
                      <hr className="border-text-blue/20 mb-4" />
                      <p className="text-text-blue text-base leading-relaxed">
                        Full-Stack Developer | Next.js, NestJS, Flutter,
                        React-native | Building scalable applications.
                      </p>
                    </div>
                  </m.div>
                </div>
              ) : (
                /* Horizontal Layout - For sm (640px+), md (768px+), and larger */
                <div className="flex h-full w-full flex-row-reverse">
                  <m.div
                    className="relative h-full overflow-hidden z-10"
                    animate={{
                      width: hoveredCard === "right" ? "40%" : "100%",
                    }}
                    transition={transition}
                  >
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={image1}
                        alt="Rifatul Islam"
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority
                      />
                    </div>

                    <m.div
                      className="absolute bottom-0 w-full bg-[#05364a]/60 py-4 text-center backdrop-blur-sm"
                      animate={{ opacity: hoveredCard === "right" ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h3 className="text-xl text-white font-medium">
                        Rifatul Islam
                      </h3>
                      <p className="text-white/80 text-sm">
                        Full-Stack Developer
                      </p>
                    </m.div>
                  </m.div>

                  <m.div
                    className="bg-soft-bg/19 h-full flex flex-col justify-center overflow-hidden"
                    animate={{
                      width: hoveredCard === "right" ? "60%" : "0%",
                      opacity: hoveredCard === "right" ? 1 : 0,
                    }}
                    transition={transition}
                  >
                    <div className="w-[400px] px-8 py-6">
                      <h3 className="font-medium text-text-blue text-3xl mb-2">
                        Rifatul Islam
                      </h3>
                      <p className="text-text-blue font-light text-lg mb-6">
                        Full-Stack Developer
                      </p>
                      <hr className="border-text-blue/20 mb-6" />
                      <p className="text-text-blue text-lg leading-relaxed">
                        Full-Stack Developer | Next.js, NestJS, Flutter,
                        React-native | Building scalable applications.
                      </p>
                    </div>
                  </m.div>
                </div>
              )}
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default TeamSection;
