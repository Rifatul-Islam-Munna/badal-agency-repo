"use client";

import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import image1 from "@/public/image1.png";
import image2 from "@/public/image2.png";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  expandDirection: "left" | "right";
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Badal Hossain",
    role: "CEO & Founder",
    description:
      "Graphic Designer | UI/UX Designer | User Researcher | Website Developer",
    image: image2.src,
    expandDirection: "right",
  },
  {
    id: 2,
    name: "Rifatul Islam",
    role: "Full-Stack Developer",
    description:
      "Full-Stack Developer | Next.js, NestJS, Flutter, React-native | Building scalable applications.",
    image: image1.src,
    expandDirection: "left",
  },
];

const TeamSection = () => {
  const [expandedId, setExpandedId] = useState<number>(1);

  const toggleExpand = (id: number) => {
    setExpandedId(id);
  };

  const getOtherMemberId = (currentId: number) => {
    return teamMembers.find((m) => m.id !== currentId)?.id || 1;
  };

  return (
    <LazyMotion features={domAnimation}>
      <section className="py-10">
        <div className="max-w-7xl mx-auto ">
          <div className="flex flex-col md:flex-row items-start gap-4">
            {teamMembers.map((member) => (
              <m.div
                key={member.id}
                onClick={() => toggleExpand(member.id)}
                className="cursor-pointer w-full md:w-auto"
                animate={{
                  flexGrow: expandedId === member.id ? 1 : 0,
                  flexShrink: expandedId === member.id ? 1 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <div className="overflow-hidden bg-white rounded-[20px] h-[340px]">
                  <div
                    className={`flex h-full ${
                      member.expandDirection === "right"
                        ? "flex-row"
                        : "flex-row-reverse"
                    }`}
                  >
                    {/* Image Container */}
                    <div className="relative w-full md:w-[300px] h-full flex-shrink-0 bg-gray-200">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />

                      {/* Name overlay when closed */}
                      {expandedId !== member.id && (
                        <div className="absolute bottom-0 flex justify-center py-3 flex-col items-center rounded-3xl w-full bg-[#05364a]/50">
                          <h3 className="text-2xl md:text-3xl font-medium text-white mb-1">
                            {member.name}
                          </h3>
                          <p className="text-white/90 font-light text-base md:text-lg">
                            {member.role}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Details Section */}
                    <AnimatePresence initial={false} mode="popLayout">
                      {expandedId === member.id && (
                        <m.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1,
                          }}
                          className="flex-1 flex flex-col relative justify-center bg-soft-bg/19 px-6 md:px-10 py-8 min-w-0"
                        >
                          <p
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(getOtherMemberId(member.id));
                            }}
                            className={cn(
                              "text-text-blue absolute top-0 right-0 p-4 md:p-7 text-sm mb-3 hover:underline capitalize tracking-wide font-medium",
                              {
                                "left-0": member.expandDirection === "left",
                              }
                            )}
                          >
                            <span
                              className={cn("text-soft-green", {
                                hidden: member.expandDirection === "right",
                              })}
                            >
                              ⟵
                            </span>
                            Team member{" "}
                            <span
                              className={cn("text-soft-green", {
                                hidden: member.expandDirection === "left",
                              })}
                            >
                              ⟶
                            </span>
                          </p>
                          <h3 className="font-medium text-text-blue text-2xl md:text-3xl mb-2">
                            {member.name}
                          </h3>
                          <p className="text-text-blue font-light text-base md:text-lg mb-4">
                            {member.role}
                          </p>
                          <hr className="py-2 text-text-blue" />
                          <p className="text-text-blue text-base md:text-lg leading-relaxed">
                            {member.description}
                          </p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default TeamSection;
