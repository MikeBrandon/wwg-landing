import AwardsPageClient from "./AwardsPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WWG Creator Awards 2024 - Celebrating Gaming Excellence",
  description: "The 3rd Annual Watu Wa Gaming Creator Awards celebrating the best gaming content creators in Kenya and East Africa. View winners, nominees, and award categories.",
  keywords: [
    "WWG Creator Awards",
    "gaming awards Kenya",
    "content creator awards",
    "Kenya gaming creators",
    "East Africa gaming awards",
    "YouTube gaming Kenya",
    "Twitch streamers Kenya",
    "gaming content awards"
  ],
  openGraph: {
    title: "WWG Creator Awards 2024 - Celebrating Gaming Excellence",
    description: "The 3rd Annual Watu Wa Gaming Creator Awards celebrating the best gaming content creators in Kenya and East Africa.",
    url: "https://watuwagaming.com/awards",
    images: [
      {
        url: "/wwgca.png",
        width: 1200,
        height: 630,
        alt: "WWG Creator Awards 2024",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WWG Creator Awards 2024 - Celebrating Gaming Excellence",
    description: "The 3rd Annual Watu Wa Gaming Creator Awards celebrating the best gaming content creators in Kenya and East Africa.",
    images: ["/wwgca.png"],
  },
};

// Add JSON-LD structured data for the awards
function generateAwardsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "WWG Creator Awards 2024",
    "description": "The 3rd Annual Watu Wa Gaming Creator Awards celebrating the best gaming content creators in Kenya and East Africa",
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": "https://watuwagaming.com/awards"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Watu Wa Gaming",
      "url": "https://watuwagaming.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock"
    }
  };
}

export default function AwardsPage() {
  const schema = generateAwardsSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <AwardsPageClient />
    </>
  );
}
