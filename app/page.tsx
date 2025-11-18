import AboutSection from "@/component/Home/AboutSection";
import HeroSection from "@/component/Home/HeroSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" max-w-7xl mx-auto bg-white h-full">
      <HeroSection />
      <AboutSection />
    </main>
  );
}
