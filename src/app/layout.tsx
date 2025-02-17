import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { AnimatePresence } from 'framer-motion'

const font = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Watu Wa Gaming",
  description: "Join Kenya's premier gaming community. Connect with fellow gamers, participate in tournaments, and celebrate gaming culture in East Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.variable} antialiased bg-background`}
      >
        <NavBar />
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  );
}
