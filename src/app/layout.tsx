import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import ConditionalFooter from "@/components/ConditionalFooter";
import ClientWrapper from "@/components/ClientWrapper";

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://watuwagaming.com'),
  title: {
    default: "Watu Wa Gaming - Kenya's Premier Gaming Community",
    template: "%s | Watu Wa Gaming"
  },
  description: "Join Kenya's premier gaming community. Connect with fellow gamers, participate in tournaments, and celebrate gaming culture in East Africa. Home to the WWG Creator Awards.",
  keywords: [
    "gaming community Kenya",
    "East Africa gaming",
    "gaming tournaments Kenya",
    "Kenyan gamers",
    "gaming content creators Kenya",
    "esports Kenya",
    "WWG Creator Awards",
    "Watu Wa Gaming",
    "gaming events Kenya",
    "Swahili gaming community"
  ],
  authors: [{ name: "Watu Wa Gaming" }],
  creator: "Watu Wa Gaming",
  publisher: "Watu Wa Gaming",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://watuwagaming.com',
    title: "Watu Wa Gaming - Kenya's Premier Gaming Community",
    description: "Join Kenya's premier gaming community. Connect with fellow gamers, participate in tournaments, and celebrate gaming culture in East Africa.",
    siteName: 'Watu Wa Gaming',
    images: [
      {
        url: '/wwg_2.png',
        width: 1200,
        height: 630,
        alt: 'Watu Wa Gaming Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Watu Wa Gaming - Kenya's Premier Gaming Community",
    description: "Join Kenya's premier gaming community. Connect with fellow gamers, participate in tournaments, and celebrate gaming culture in East Africa.",
    images: ['/wwg_2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Watu Wa Gaming",
    "alternateName": "WWG",
    "url": "https://watuwagaming.com",
    "logo": "https://watuwagaming.com/wwg_2.png",
    "description": "Kenya's premier gaming community connecting gamers across East Africa",
    "foundingDate": "2021",
    "location": {
      "@type": "Place",
      "addressCountry": "KE",
      "addressRegion": "Kenya"
    },
    "sameAs": [
      "https://discord.gg/xpjv99H"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Community Support",
      "availableLanguage": ["English", "Swahili"]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <link rel="canonical" href="https://watuwagaming.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#991034" />
        <link rel="apple-touch-icon" href="/wwg.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${font.variable} font-sans antialiased`}
      >
        <NavBar />
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <ConditionalFooter />
      </body>
    </html>
  );
}

