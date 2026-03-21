import type { Metadata } from "next";
import dynamic from "next/dynamic";

import HeroSection from "@/component/Home/HeroSection";
import { Suspense } from "react";
import {
  getHomeStructuredData,
  homeDescription,
  homeTitle,
  keywords,
  siteName,
} from "@/lib/seo";

const TeamSection = dynamic(() => import("@/component/Home/TeamSection"));
const ServicesSection = dynamic(
  () => import("@/component/Home/ServicesSection")
);
const RecentWork = dynamic(() => import("@/component/Home/RecentWork"));
const AboutSection = dynamic(() => import("@/component/Home/AboutSection"));
const ProjectForm = dynamic(() => import("@/component/Home/ContactUs"));

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
    locale: "en_BD",
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
    </>
  );
}
