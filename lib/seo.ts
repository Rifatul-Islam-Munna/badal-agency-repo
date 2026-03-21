import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const FALLBACK_SITE_URL = "https://www.badal.agency";

const keywordList = [
  "Badal Agency",
  "custom web development agency",
  "best web development companies",
  "web development company chicago",
  "web development and seo company",
  "web development services near me",
  "web app development",
  "web design development",
  "best agency for web development",
  "mobile web development agency",
  "digital agency web development",
  "web development agency usa",
  "web development agency uk",
  "web development agency london",
  "custom website development usa",
  "web app development company usa",
  "website design agency london",
  "web design and development agency",
  "seo and web development agency",
  "ui ux design agency usa",
  "digital agency europe",
  "web development company europe",
  "remote web development agency",
  "custom software and web app development",
  "startup web development agency",
];

export const siteName = "Badal Agency";
export const contactEmail = "badaldotagency@gmail.com";
export const contactPhones = [
  "+8801907565617",
  "+8801793956816",
] as const;

export const defaultDescription =
  "Badal Agency is a custom web development and SEO company delivering web apps, web design and development, UI/UX, and branding for the USA, UK, and Europe.";

export const homeTitle =
  "Custom Web Development Agency for USA, UK & Europe";
export const homeDescription =
  "Web app development, web design and development, UI/UX, and SEO services for businesses in Chicago, London, the UK, and across Europe.";

export const serviceTypes = [
  "Custom Web Development",
  "Web App Development",
  "Website Design and Development",
  "Mobile Web Development",
  "UI/UX Design",
  "SEO Services",
  "Digital Marketing",
  "Graphic Design",
  "Brand Identity Design",
  "Digital Branding",
];

export const keywords = Array.from(new Set(keywordList));

export const sitemapImagePaths = [
  "/logo.png",
  "/logo-white.png",
  "/image1.png",
  "/image2.png",
];

const seoSourceFiles = [
  "app/layout.tsx",
  "app/page.tsx",
  "component/Home/AboutSection.tsx",
  "component/Home/ContactUs.tsx",
  "component/Home/HeroSection.tsx",
  "component/Home/RecentWork.tsx",
  "component/Home/ServicesSection.tsx",
];

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

export function getBaseUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();

  if (!configuredUrl) {
    return FALLBACK_SITE_URL;
  }

  try {
    return stripTrailingSlash(new URL(configuredUrl).toString());
  } catch {
    return FALLBACK_SITE_URL;
  }
}

export function buildAbsoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${getBaseUrl()}/`).toString();
}

export function getSeoLastModified(paths = seoSourceFiles) {
  const timestamps = paths
    .map((filePath) => join(process.cwd(), filePath))
    .filter((filePath) => existsSync(filePath))
    .map((filePath) => statSync(filePath).mtime.getTime());

  return timestamps.length
    ? new Date(Math.max(...timestamps))
    : new Date("2026-03-21T00:00:00.000Z");
}

export function getSiteStructuredData() {
  const baseUrl = getBaseUrl();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: siteName,
        url: baseUrl,
        logo: buildAbsoluteUrl("/logo.png"),
        image: buildAbsoluteUrl("/logo.png"),
        email: contactEmail,
        telephone: contactPhones[0],
        description: defaultDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        areaServed: [
          "United States",
          "Chicago",
          "United Kingdom",
          "London",
          "Europe",
          "Remote",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: contactEmail,
            telephone: contactPhones[0],
            areaServed: ["United States", "United Kingdom", "Europe"],
            availableLanguage: ["English", "Bengali"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: contactEmail,
            telephone: contactPhones[1],
            areaServed: ["United States", "United Kingdom", "Europe"],
            availableLanguage: ["English", "Bengali"],
          },
        ],
        knowsAbout: serviceTypes,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Services",
          itemListElement: serviceTypes.map((serviceName) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: serviceName,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: siteName,
        description: defaultDescription,
        inLanguage: "en",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };
}

export function getHomeStructuredData() {
  const baseUrl = getBaseUrl();
  const fullTitle = `${homeTitle} | ${siteName}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: fullTitle,
        description: homeDescription,
        inLanguage: "en",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        about: {
          "@id": `${baseUrl}/#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: buildAbsoluteUrl("/logo.png"),
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#professional-service`,
        name: siteName,
        url: baseUrl,
        image: buildAbsoluteUrl("/logo.png"),
        description: homeDescription,
        areaServed: [
          "United States",
          "Chicago",
          "United Kingdom",
          "London",
          "Europe",
          "Remote",
        ],
        availableLanguage: ["English", "Bengali"],
        serviceType: serviceTypes,
        provider: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };
}
