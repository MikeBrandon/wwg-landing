"use client";

import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";
import AwardsCarousel from "@/components/AwardsCarousel";
import blogPosts from "@/utils/blogPosts";
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen text-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center px-4 bg-white">
          <div className="absolute inset-0 z-0">
            <Image
              src="/6384643495f59d92f0a83b1d481b1f5f.jpg"
              alt="Gaming Community Hero"
              fill
              className="object-cover opacity-[11%]"
              priority
              quality={100}
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="image-container">
              <Image src="/wwg_2.png" alt="Logo" className="w-full max-w-[300px] lg:max-w-[500px] mx-auto mb-8 md:mb-12" width={3126} height={656} quality={50}/>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">
              <span className="text-secondary">Watu Wa Gaming</span>
            </h1>
            <p className="text-base md:text-xl mb-6 md:mb-8 text-primary">
              Join our vibrant community of Kenyan and East African gamers, where English
              and Swahili bring us together. Our members play great games
              including Helldivers 2, Fortnite, and Call of
              Duty. We regularly host tournaments and gaming events to celebrate our
              shared passion for gaming.
            </p>
            <a
              href="https://discord.gg/xpjv99H"
              className="inline-flex items-center bg-secondary text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              <FaDiscord className="mr-2 text-xl md:text-2xl text-white" />
              Join the Community
            </a>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="image-container">
              <Image src="/wwgca.png" alt="Awards" className="w-[50%] md:w-[30%] mx-auto mb-8 md:mb-12" width={5112} height={2051} quality={10}/>
            </h2>
            <div className="">
              <AwardsCarousel />
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-12 md:py-20 px-4 bg-primary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center">
              Latest <span className="text-background">Updates</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-primary p-4 md:p-6 rounded-lg border border-background/20 flex gap-4 h-full"
                >
                  <div className="relative w-48 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={post.image || "/blog-placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-background/80 text-xs md:text-sm mb-3 md:mb-4">{post.date}</p>
                    <p className="text-gray-300 text-sm md:text-base">{post.excerpt}</p>
                    <Link
                      href="/blog"
                      className="inline-block text-background mt-auto hover:text-secondary/80 text-sm md:text-base"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 md:mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center bg-secondary text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-opacity-90 transition-all"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </motion.main>
  );
}
