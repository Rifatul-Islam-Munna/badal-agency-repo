import AboutSection from "@/component/Home/AboutSection";
import HeroSection from "@/component/Home/HeroSection";
import TeamSection from "@/component/Home/TeamSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" max-w-7xl mx-auto bg-white h-full">
      <HeroSection />
      <AboutSection />
      <TeamSection />
    </main>
  );
}
