import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import NavBar from "@/component/NavBar";
import Script from "next/script";
import Footer from "@/component/Home/Footer";
import { Toaster } from "sonner";
import { Suspense } from "react";

export const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"], // optional
});

export const metadata: Metadata = {
  title: "Badal Agency | Graphic Design & Web Development",
  description:
    "Badal Agency is a top creative agency specializing in modern graphic design, web development, UI/UX design, and digital branding. Elevate your business with our professional services.",
  keywords: [
    "Badal Agency",
    "Graphic Design",
    "Web Development",
    "UI/UX Design",
    "Digital Branding",
    "Creative Agency",
    "Website Design",
    "Professional Web Design",
    "Brand Design",
    "logo Design",
    "ui/ux design",
    "web development",
    "digital branding",
    "graphic design",
    "website design",
    "logo design",
    "brand design",
    "creative agency",
    "professional web design",
    "ui/ux design",
    "web development",
    "digital branding",
    "graphic design",
    "website design",
    "logo design",
    "brand design",
    "creative agency",
    "professional web design",
    "ui/ux design",
    "web development",
    "digital branding",
    "graphic design",
    "website design",
    "logo design",
    "brand design",
    "creative agency",
    "professional web design",
    "ui/ux design",
    "web development",
    "digital branding",
    "graphic design",
    "website design",
  ],
  authors: [{ name: "Badal Agency" }],
  openGraph: {
    title: "Badal Agency | Graphic Design & Web Development",
    description:
      "Top creative agency specializing in modern graphic design, web development, UI/UX design, and digital branding.",
    url: "https://www.badal.agency",
    siteName: "Badal Agency",
    images: [
      {
        url: "https://files.catbox.moe/narqwu.png",
        width: 1200,
        height: 630,
        alt: "Badal Agency - Graphic Design & Web Development",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Badal Agency | Graphic Design & Web Development",
    description:
      "Professional creative agency for graphic design, web development, and digital branding.",
    images: ["https://files.catbox.moe/narqwu.png"],
    site: "@badalagency",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Badal Agency",
    url: "https://www.badal.agency",
    logo: "https://files.catbox.moe/narqwu.png",
    sameAs: [
      "https://www.facebook.com/badalagency",
      "https://www.linkedin.com/company/badalagency",
      "https://twitter.com/badalagency",
      "https://www.instagram.com/badalagency",
    ],
    description:
      "Badal Agency is a top creative agency specializing in modern graphic design, web development, UI/UX design, and digital branding.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+8801907565617",
      contactType: "customer service",
      areaServed: "BD",
      availableLanguage: ["English", "Bengali"],
    },
  };
  return (
    <html lang="en">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense>
        <Toaster />
      </Suspense>
      <body className={` ${kanit.variable}  antialiased bg-white`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
