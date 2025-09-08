import ResultsPageClient from './ResultsPageClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WWG Creator Awards 2024 Results - Final Rankings",
  description: "View the final results and winners of the 3rd Annual WWG Creator Awards 2024. See how community votes and judge scores determined the best gaming content creators in Kenya and East Africa.",
  keywords: [
    "WWG Creator Awards results",
    "gaming awards winners Kenya",
    "Kenya gaming creators winners",
    "East Africa gaming awards results",
    "content creator awards 2024",
    "gaming community awards Kenya",
    "YouTube gaming winners Kenya",
    "Twitch streamers awards Kenya"
  ],
  openGraph: {
    title: "WWG Creator Awards 2024 Results - Final Rankings",
    description: "View the final results and winners of the 3rd Annual WWG Creator Awards 2024. See how community votes and judge scores determined the best gaming content creators.",
    url: "https://watuwagaming.com/results",
    type: "website",
    images: [
      {
        url: "/wwgca.png",
        width: 1200,
        height: 630,
        alt: "WWG Creator Awards 2024 Results",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WWG Creator Awards 2024 Results - Final Rankings",
    description: "View the final results and winners of the 3rd Annual WWG Creator Awards 2024.",
    images: ["/wwgca.png"],
  },
};

// Add JSON-LD structured data for the results
function generateResultsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "WWG Creator Awards 2024 Results",
    "description": "Final results and rankings of the 3rd Annual WWG Creator Awards celebrating Kenya's best gaming content creators",
    "url": "https://watuwagaming.com/results",
    "about": {
      "@type": "Event",
      "name": "WWG Creator Awards 2024",
      "organizer": {
        "@type": "Organization",
        "name": "Watu Wa Gaming"
      }
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
          "name": "Awards",
          "item": "https://watuwagaming.com/awards"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Results",
          "item": "https://watuwagaming.com/results"
        }
      ]
    }
  };
}

export default function ResultsPage() {
  const schema = generateResultsSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <ResultsPageClient />
    </>
  );
}