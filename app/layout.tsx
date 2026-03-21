import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Home/Footer";
import { Toaster } from "sonner";
import { Suspense } from "react";
import {
  defaultDescription,
  getBaseUrl,
  getSiteStructuredData,
  keywords,
  siteName,
} from "@/lib/seo";

export const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"], // optional
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  keywords,
  applicationName: siteName,
  authors: [{ name: siteName, url: getBaseUrl() }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${siteName} | Web Development Agency for USA, UK & Europe`,
    description: defaultDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Web Development Agency for USA, UK & Europe`,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense>
        <Toaster />
      </Suspense>
      <body className={` ${kanit.variable}  antialiased bg-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteStructuredData()),
          }}
        />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
