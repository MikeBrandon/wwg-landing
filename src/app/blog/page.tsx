import BlogPageClient from './BlogPageClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaming News & Updates - Watu Wa Gaming Blog",
  description: "Stay updated with the latest gaming news, tournament announcements, community highlights, and creator spotlights from Kenya's premier gaming community.",
  keywords: [
    "gaming news Kenya",
    "gaming blog East Africa",
    "gaming tournaments Kenya",
    "gaming community updates",
    "Kenya gaming events",
    "gaming content creators Kenya",
    "esports news Kenya",
    "WWG updates",
    "gaming culture Kenya"
  ],
  openGraph: {
    title: "Gaming News & Updates - Watu Wa Gaming Blog",
    description: "Stay updated with the latest gaming news, tournament announcements, community highlights, and creator spotlights from Kenya's premier gaming community.",
    url: "https://watuwagaming.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaming News & Updates - Watu Wa Gaming Blog",
    description: "Stay updated with the latest gaming news, tournament announcements, community highlights, and creator spotlights from Kenya's premier gaming community.",
  },
};

// Add JSON-LD structured data for the blog
function generateBlogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Watu Wa Gaming Blog",
    "description": "Gaming news, updates, and community highlights from Kenya's premier gaming community",
    "url": "https://watuwagaming.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Watu Wa Gaming",
      "url": "https://watuwagaming.com"
    },
    "inLanguage": "en-KE"
  };
}

export default function BlogPage() {
  const schema = generateBlogSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      <BlogPageClient />
    </>
  );
}