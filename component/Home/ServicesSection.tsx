"use client";
import { useState } from "react";
import tick from "@/app/assets/service/tick.png";
import Image from "next/image";
import image1 from "@/app/assets/service/s-image1.png";
import image2 from "@/app/assets/service/s-image2.png";
import image3 from "@/app/assets/service/s-image3.png";
import image4 from "@/app/assets/service/s-image4.png";
import { LazyMotion, domAnimation, m } from "framer-motion";

const services = [
  {
    title: "UI UX Design",
    subtitle: "Creating user-friendly UI/UX designs",
    features: [
      "User Research & Analysis",
      "Visual Interface Design",
      "Wireframing & Prototyping",
    ],
    image: image1.src,
  },
  {
    title: "Website Design",
    subtitle: "Designing responsive, user-friendly websites",
    features: [
      "Web design",
      "UI/UX design /responsive design",
      "Landing page design",
    ],
    image: image2.src,
  },
  {
    title: "Web Development",
    subtitle: "Designing responsive, user-friendly websites",
    features: [
      "HTML5, CSS3, & JavaScript",
      "Frontend (React, Vue, Angular)",
      "Backend (Node.js, Nest.js)",
      "WordPress, Shopify",
      "Optimization & Performance",
    ],
    image: image3.src,
  },
  {
    title: "Graphic Design",
    subtitle: "Designing all kind of graphic design content",
    features: [
      "Brand Identity",
      "Logo",
      "Van Wrap design",
      "T-shirt design",
      "Advertisement design",
    ],
    image: image4.src,
  },
];

export default function ServicesSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <section className="bg-[#07364a] pt-10 pb-14 px-4 md:px-8 rounded-3xl max-w-7xl mt-11 mx-auto">
        <m.h2
          className="text-lg text-white font-normal mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Services
        </m.h2>
        {/* Card container with transitions */}
        <div className="flex h-full flex-col gap-6">
          {(showAll ? services : [services[0]]).map((service, idx) => {
            const hasMoreThanThree = service.features.length > 3;
            const midPoint = Math.ceil(service.features.length / 2);
            const leftFeatures = hasMoreThanThree
              ? service.features.slice(0, midPoint)
              : service.features;
            const rightFeatures = hasMoreThanThree
              ? service.features.slice(midPoint)
              : [];

            return (
              <m.div
                key={service.title}
                className="grid grid-cols-1 md:grid-cols-2 justify-between bg-white rounded-2xl pl-6 min-h-[250px] overflow-hidden"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Text Side */}
                <div className="flex-1 py-8 pr-4">
                  <m.h3
                    className="text-[32px] text-text-blue font-normal mb-1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.1 + 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {service.title}
                  </m.h3>
                  <m.p
                    className="text-[20px] font-light text-text-blue mb-4"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.1 + 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {service.subtitle}
                  </m.p>
                  {/* Feature List - Two Columns if more than 3 */}
                  <div
                    className={`${
                      hasMoreThanThree
                        ? "grid grid-cols-2 gap-x-6 gap-y-2"
                        : "space-y-2"
                    }`}
                  >
                    {/* Left Column */}
                    <ul className="space-y-2">
                      {leftFeatures.map((feature, featureIdx) => (
                        <m.li
                          key={feature}
                          className="flex items-center font-light text-lg text-text-blue"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: idx * 0.1 + 0.4 + featureIdx * 0.05,
                            ease: "easeOut",
                          }}
                        >
                          <span className="inline-block text-[#98c73d] mr-2 flex-shrink-0">
                            <Image
                              src={tick.src}
                              width={20}
                              height={20}
                              alt="tick"
                            />
                          </span>
                          {feature}
                        </m.li>
                      ))}
                    </ul>
                    {/* Right Column (only if more than 3) */}
                    {hasMoreThanThree && (
                      <ul className="space-y-2">
                        {rightFeatures.map((feature, featureIdx) => (
                          <m.li
                            key={feature}
                            className="flex items-center font-light text-lg text-text-blue"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.3,
                              delay:
                                idx * 0.1 +
                                0.4 +
                                (leftFeatures.length + featureIdx) * 0.05,
                              ease: "easeOut",
                            }}
                          >
                            <span className="inline-block text-[#98c73d] mr-2 flex-shrink-0">
                              <Image
                                src={tick.src}
                                width={20}
                                height={20}
                                alt="tick"
                              />
                            </span>
                            {feature}
                          </m.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {/* Image Side (only on desktop) */}
                <m.div
                  className="hidden md:flex w-full h-full md:max-h-[300px] aspect-video rounded-xl overflow-hidden bg-green-100 items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1 + 0.3,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    src={service.image}
                    alt={`${service.title} illustration`}
                    width={1400}
                    height={1400}
                    className=" aspect-video w-full h-full transition"
                    loading="lazy"
                    sizes="800px"
                  />
                </m.div>
              </m.div>
            );
          })}
        </div>
        {/* See More Button */}
        <div className="flex justify-center mt-6">
          {!showAll && (
            <m.button
              className="text-xl px-6 py-2 rounded-lg text-white font-medium"
              onClick={() => setShowAll(true)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              See More
            </m.button>
          )}
        </div>
      </section>
    </LazyMotion>
  );
}
