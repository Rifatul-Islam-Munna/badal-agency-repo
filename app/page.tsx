import dynamic from "next/dynamic";

import HeroSection from "@/component/Home/HeroSection";

import Image from "next/image";

import { Suspense } from "react";

const TeamSection = dynamic(() => import("@/component/Home/TeamSection"));
const ServicesSection = dynamic(
  () => import("@/component/Home/ServicesSection")
);
const RecentWork = dynamic(() => import("@/component/Home/RecentWork"));
const AboutSection = dynamic(() => import("@/component/Home/AboutSection"));
const ProjectForm = dynamic(() => import("@/component/Home/ContactUs"));
export default function Home() {
  return (
    <main className="  mx-auto bg-white h-full">
      <HeroSection />
      <Suspense
        fallback={<div className=" max-w-7xl min-h-[40dvh] bg-soft-bg"></div>}
      >
        <AboutSection />
      </Suspense>
      <Suspense
        fallback={<div className=" max-w-7xl min-h-[30dvh] bg-soft-bg"></div>}
      >
        <TeamSection />
      </Suspense>
      <Suspense
        fallback={<div className=" max-w-7xl min-h-[30dvh] bg-soft-bg"></div>}
      >
        <ServicesSection />
      </Suspense>
      <Suspense
        fallback={<div className=" max-w-7xl min-h-[30dvh] bg-soft-bg"></div>}
      >
        <RecentWork />
      </Suspense>
      <Suspense>
        <ProjectForm />
      </Suspense>
    </main>
  );
}
