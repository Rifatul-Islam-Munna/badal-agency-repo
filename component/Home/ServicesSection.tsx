"use client";
import { useState } from "react";
import tick from "@/app/assets/service/tick.png";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const services = [
  {
    title: "Software Products & App Development",
    subtitle: "We design and build scalable SaaS platforms",
    features: [
      "Build scalable SaaS platforms",
      "Mobile appsw",
      "Custom software that solve real business problems",
    ],
  },
  {
    title: "UI UX Design",
    subtitle: "Creating user-friendly UI/UX designs",
    features: [
      "User Research & Analysis",
      "Visual Interface Design",
      "Wireframing & Prototyping",
    ],
  },
  {
    title: "Website Design",
    subtitle: "Designing responsive, user-friendly websites",
    features: [
      "Web design",
      "UI/UX design /responsive design",
      "Landing page design",
    ],
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
  },
];

export default function ServicesSection() {
  const [openCards, setOpenCards] = useState<Record<string, boolean>>(
    () =>
      services.reduce<Record<string, boolean>>((acc, service) => {
        acc[service.title] = true;
        return acc;
      }, {})
  );

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="service"
        aria-labelledby="services-heading"
        className="bg-[#07364a] pt-10 pb-14 px-4 md:px-8 rounded-3xl max-w-7xl mt-11 mx-auto"
      >
        <m.h2
          id="services-heading"
          className="text-lg text-white font-normal mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Services
        </m.h2>
        <div className="flex h-full flex-col gap-6">
          {services.map((service, idx) => {
            const hasMoreThanThree = service.features.length > 3;
            const midPoint = Math.ceil(service.features.length / 2);
            const leftFeatures = hasMoreThanThree
              ? service.features.slice(0, midPoint)
              : service.features;
            const rightFeatures = hasMoreThanThree
              ? service.features.slice(midPoint)
              : [];
            const isOpen = openCards[service.title] ?? false;

            return (
              <m.div
                key={service.title}
                className="bg-white px-6 py-7 text-text-blue sm:px-8 lg:px-10"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`service-card-${idx}`}
                  onClick={() =>
                    setOpenCards((current) => ({
                      ...current,
                      [service.title]: !current[service.title],
                    }))
                  }
                >
                  <m.h3
                    className="text-2xl font-normal leading-tight sm:text-[32px]"
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
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center text-text-blue sm:h-11 sm:w-11">
                    {isOpen ? (
                      <ChevronUp
                        className="h-8 w-8 sm:h-10 sm:w-10"
                        strokeWidth={3}
                      />
                    ) : (
                      <ChevronDown
                        className="h-8 w-8 sm:h-10 sm:w-10"
                        strokeWidth={3}
                      />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div id={`service-card-${idx}`} className="pt-2">
                    <m.p
                      className="mb-5 text-lg font-light text-text-blue sm:text-[20px]"
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
                    <div
                      className={`${
                        hasMoreThanThree
                          ? "grid gap-x-6 gap-y-2 sm:grid-cols-2"
                          : "space-y-2"
                      }`}
                    >
                      <ul className="space-y-2">
                        {leftFeatures.map((feature, featureIdx) => (
                          <m.li
                            key={feature}
                            className="flex items-center text-base font-light text-text-blue sm:text-lg"
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
                                alt=""
                              />
                            </span>
                            {feature}
                          </m.li>
                        ))}
                      </ul>
                      {hasMoreThanThree && (
                        <ul className="space-y-2">
                          {rightFeatures.map((feature, featureIdx) => (
                            <m.li
                              key={feature}
                              className="flex items-center text-base font-light text-text-blue sm:text-lg"
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
                                  alt=""
                                />
                              </span>
                              {feature}
                            </m.li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </m.div>
            );
          })}
        </div>
      </section>
    </LazyMotion>
  );
}
