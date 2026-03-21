import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const FALLBACK_SITE_URL = "https://www.badal.agency";

const keywordList = [
  "Badal Agency",
  "digital agency Bangladesh",
  "digital agency Dhaka",
  "web development company Dhaka",
  "IT services agency Bangladesh",
  "full service digital agency Dhaka",
  "custom web application development Bangladesh",
  "web app development company Dhaka",
  "SaaS web application development Bangladesh",
  "hire web app developer Bangladesh",
  "enterprise web application Bangladesh",
  "professional website design Bangladesh",
  "business website development Dhaka",
  "affordable website design company Bangladesh",
  "responsive website design Dhaka",
  "small business website design Bangladesh",
  "UI UX design agency Bangladesh",
  "user interface design service Dhaka",
  "mobile app UI design company Bangladesh",
  "product design agency Dhaka",
  "hire UI UX designer Bangladesh",
  "SEO service provider Bangladesh",
  "local SEO agency Dhaka",
  "Google ranking service Bangladesh",
  "affordable SEO packages Bangladesh",
  "SEO expert for small business Dhaka",
  "digital marketing agency Dhaka",
  "social media marketing Bangladesh",
  "online marketing company Dhaka",
  "digital branding agency Bangladesh",
  "content marketing service Bangladesh",
  "web design agency in Dhaka Bangladesh",
  "best digital agency in Bangladesh for startups",
  "affordable web development Dhaka Bangladesh",
  "top UI UX design studio Dhaka",
  "SEO company for small business Bangladesh",
  "how to get a professional website in Bangladesh",
  "best web development agency for startup Bangladesh",
  "affordable SEO services for small business Dhaka",
  "custom web application for business Bangladesh",
  "UI UX design for mobile app Bangladesh",
  "website redesign service Dhaka Bangladesh",
  "hire web developer Bangladesh",
  "get SEO services Bangladesh",
  "web design agency pricing Bangladesh",
  "web application development cost Bangladesh",
  "digital agency for ecommerce Bangladesh",
  "website maintenance Bangladesh",
  "branding agency Bangladesh",
  "app design agency Bangladesh",
];

export const siteName = "Badal Agency";
export const contactEmail = "badaldotagency@gmail.com";
export const contactPhones = [
  "+8801907565617",
  "+8801793956816",
] as const;

export const defaultDescription =
  "Badal Agency is a digital agency in Dhaka, Bangladesh focused on web development, custom web applications, UI/UX design, website design, branding, SEO, and digital growth services for startups and businesses.";

export const homeTitle = "Digital Agency Bangladesh for Web, App & UI/UX";
export const homeDescription =
  "Dhaka-based digital agency for custom websites, web applications, UI/UX design, branding, SEO, and digital services for startups, small businesses, and growing companies in Bangladesh.";

export const serviceTypes = [
  "Custom Web Application Development",
  "Website Design and Development",
  "SaaS Product Design and Development",
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
        areaServed: ["Dhaka, Bangladesh", "Bangladesh"],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: contactEmail,
            telephone: contactPhones[0],
            areaServed: "BD",
            availableLanguage: ["English", "Bengali"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: contactEmail,
            telephone: contactPhones[1],
            areaServed: "BD",
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
        inLanguage: "en-BD",
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
        inLanguage: "en-BD",
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
        areaServed: ["Dhaka, Bangladesh", "Bangladesh", "Remote"],
        availableLanguage: ["English", "Bengali"],
        serviceType: serviceTypes,
        provider: {
          "@id": `${baseUrl}/#organization`,
        },
      },
    ],
  };
}
