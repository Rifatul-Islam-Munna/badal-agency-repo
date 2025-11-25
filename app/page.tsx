import AboutSection from "@/component/Home/AboutSection";
import HeroSection from "@/component/Home/HeroSection";
import TeamSection from "@/component/Home/TeamSection";
import RecentWork from "@/component/Home/RecentWork";
import Image from "next/image";
import ServicesSection from "@/component/Home/ServicesSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className=" max-w-7xl mx-auto bg-white h-full">
      <HeroSection />
      <AboutSection />
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
    </main>
  );
}
