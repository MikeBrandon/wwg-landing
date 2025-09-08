import PrivacyPageClient from './PrivacyPageClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Watu Wa Gaming",
  description: "Learn how Watu Wa Gaming collects, uses, and protects your personal information. Our comprehensive privacy policy explains our data practices and your rights.",
  keywords: [
    "privacy policy",
    "data protection",
    "user privacy",
    "data collection",
    "gaming community privacy",
    "Kenya data protection"
  ],
  openGraph: {
    title: "Privacy Policy - Watu Wa Gaming",
    description: "Learn how Watu Wa Gaming protects your personal information and respects your privacy.",
    url: "https://watuwagaming.com/privacy",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicy() {
  return <PrivacyPageClient />;
}
