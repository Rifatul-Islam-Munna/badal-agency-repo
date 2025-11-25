import AboutSection from "@/component/Home/AboutSection";
import HeroSection from "@/component/Home/HeroSection";
import TeamSection from "@/component/Home/TeamSection";
import RecentWork from "@/component/Home/RecentWork";
import Image from "next/image";
import ServicesSection from "@/component/Home/ServicesSection";

export default function Home() {
  return (
    <main className=" max-w-7xl mx-auto bg-white h-full">
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <RecentWork />
    </main>
  );
}
