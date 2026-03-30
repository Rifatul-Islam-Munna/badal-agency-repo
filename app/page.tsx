import type { Metadata } from "next";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Home/Footer";
import HeroSection from "@/component/Home/HeroSection";
import AboutSection from "@/component/Home/AboutSection";
import TeamSection from "@/component/Home/TeamSection";
import ServicesSection from "@/component/Home/ServicesSection";
import RecentWork from "@/component/Home/RecentWork";
import ProjectForm from "@/component/Home/ContactUs";
import {
  getHomeStructuredData,
  homeDescription,
  homeTitle,
  keywords,
  siteName,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: homeTitle,
  description: homeDescription,
  keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${homeTitle} | ${siteName}`,
    description: homeDescription,
    url: "/",
    type: "website",
    locale: "en_US",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${homeTitle} | ${siteName}`,
    description: homeDescription,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomeStructuredData()),
        }}
      />
      <NavBar />
      <main className="  mx-auto bg-white h-full">
        <HeroSection />
        <AboutSection />
        <TeamSection />
        <ServicesSection />
        <RecentWork />
        <ProjectForm />
      </main>
      <Footer />
    </>
  );
}
