import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";
import { headers } from 'next/headers';

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Watu Wa Gaming",
  description: "Join Kenya's premier gaming community. Connect with fellow gamers, participate in tournaments, and celebrate gaming culture in East Africa.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  const showNavbar = ['/', '/awards', '/blog'].includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${font.variable} font-sans antialiased`}
      >
        {showNavbar && <NavBar />}
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
