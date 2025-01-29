"use client";

import Image from "next/image";
import { FaDiscord, FaTrophy, FaNewspaper } from "react-icons/fa";
import NewsletterForm from "../components/NewsletterForm";
import Link from "next/link";
import AwardsCarousel from "@/components/AwardsCarousel";

export default function Home() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="/6384643495f59d92f0a83b1d481b1f5f.jpg"
            alt="Gaming Community Hero"
            fill
            className="object-cover opacity-[3%]"
            priority
            quality={100}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-secondary">Watu Wa Gaming</span>
          </h1>
          <p className="text-xl mb-8 text-primary">
            Join our vibrant community of Kenyan and East African gamers, where English
            and Swahili bring us together. Our members play great games
            including Helldivers 2, Fortnite, and Call of
            Duty. We regularly host tournaments and gaming events to celebrate our
            shared passion for gaming.
          </p>
          <a
            href="https://discord.gg/xpjv99H"
            className="inline-flex items-center bg-secondary text-background px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            <FaDiscord className="mr-2 text-2xl" />
            Join the Community
          </a>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary">
            <span className="text-secondary">Community</span> Awards
          </h2>
          <div className="">
            <AwardsCarousel />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Latest <span className="text-background">Updates</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
              {
                title: "New Tournament Series",
                date: "October 1, 2023",
                excerpt:
                  "Join our upcoming tournament series with amazing prizes!",
              },
              {
                title: "Community Game Night",
                date: "September 28, 2023",
                excerpt:
                  "Weekly community game nights are back with new exciting games!",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="bg-primary p-6 rounded-lg border border-background/20"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-background/80 text-sm mb-4">{post.date}</p>
                <p className="text-gray-300">{post.excerpt}</p>
                <Link
                  href="/blog"
                  className="inline-block text-background mt-4 hover:text-primary/80"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FaNewspaper className="text-primary text-4xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Stay <span className="text-primary">Updated</span>
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Subscribe to our newsletter for the latest gaming updates and
            events!
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/20">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© 2023 Gaming Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
