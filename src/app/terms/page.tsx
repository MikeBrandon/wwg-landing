import TermsPageClient from './TermsPageClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Watu Wa Gaming",
  description: "Read Watu Wa Gaming's Terms of Service. Understand the rules, guidelines, and legal terms for using Kenya's premier gaming community platform.",
  keywords: [
    "terms of service",
    "user agreement",
    "community guidelines",
    "gaming platform terms",
    "Kenya gaming community rules",
    "tournament rules",
    "user responsibilities"
  ],
  openGraph: {
    title: "Terms of Service - Watu Wa Gaming",
    description: "Read Watu Wa Gaming's Terms of Service and community guidelines for Kenya's premier gaming platform.",
    url: "https://watuwagaming.com/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service - Watu Wa Gaming",
    description: "Read Watu Wa Gaming's Terms of Service and community guidelines.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Add JSON-LD structured data for terms page
function generateTermsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - Watu Wa Gaming",
    "description": "Terms of Service and community guidelines for Watu Wa Gaming platform",
    "url": "https://watuwagaming.com/terms",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Watu Wa Gaming",
      "url": "https://watuwagaming.com"
    },
    "about": {
      "@type": "Organization",
      "name": "Watu Wa Gaming"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://watuwagaming.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Terms of Service",
          "item": "https://watuwagaming.com/terms"
        }
      ]
    }
  };
}

export default function TermsOfService() {
  const schema = generateTermsSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <TermsPageClient />
    </>
  );
}
