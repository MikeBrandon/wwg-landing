"use client";

import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";
import AwardsCarousel from "@/components/AwardsCarousel";
import blogPosts from "@/utils/blogPosts";
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0
  }
};

export default function Home() {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-text-primary"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Subtle Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/6384643495f59d92f0a83b1d481b1f5f.jpg"
              alt="Gaming Community Background"
              fill
              className="object-cover opacity-[5%] z-50"
              priority
              quality={60}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-surface/98 to-surface-2/95"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-background/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-secondary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Hero Content */}
        <motion.div 
          variants={itemVariants}
          className="relative z-10 max-w-6xl mx-auto px-4"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-8 md:mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative inline-block"
            >
              <Image 
                src="/wwg_2.png" 
                alt="Watu Wa Gaming Logo" 
                className="w-full max-w-[400px] lg:max-w-[600px] mx-auto drop-shadow-2xl" 
                width={3126} 
                height={656} 
                quality={75}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-background/20 rounded-2xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight"
          >
            <span className="text-gradient">
              Watu Wa Gaming
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-text-secondary max-w-4xl mx-auto leading-relaxed font-light"
          >
            Join our vibrant community of{" "}
            <span className="text-background font-medium">Kenyan and East African gamers</span>, where English
            and Swahili bring us together. Experience{" "}
            <span className="text-secondary font-medium">tournaments, events</span>, and celebrate our
            shared passion for gaming.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="https://discord.gg/xpjv99H"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(153, 1, 52, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary/80 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-semibold transition-all duration-300 btn-glow shadow-glow"
            >
              <FaDiscord className="mr-3 text-2xl md:text-3xl group-hover:animate-bounce" />
              Join the Community
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-background rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-text-secondary font-medium"
            >
              <span className="text-background">1000+</span> Active Members
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20"
          >
            {[
              { number: "3", label: "Years Strong", suffix: "" },
              { number: "50", label: "Tournaments", suffix: "+" },
              { number: "1K", label: "Members", suffix: "+" },
              { number: "24", label: "Online", suffix: "/7" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-text-secondary/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-secondary-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Awards Section */}
      <section className="py-20 md:py-32 px-4 relative bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="mb-8 md:mb-12"
            >
              <Image 
                src="/wwgca.png" 
                alt="Watu Wa Gaming Creator Awards" 
                className="w-[60%] md:w-[40%] max-w-md mx-auto drop-shadow-2xl" 
                width={5112} 
                height={2051} 
                quality={25}
              />
            </motion.div>
            <motion.h2 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-gradient">
                Creator Awards
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-primary max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Celebrating the best gaming content creators in Kenya and East Africa
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AwardsCarousel />
          </motion.div>

          {/* Awards CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16 md:mt-20"
          >
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/nominate"
                  className="group relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary/80 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 btn-glow shadow-glow"
                >
                  <span className="mr-2">🏆</span>
                  Nominate a Creator
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary to-background rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/vote"
                  className="group relative inline-flex items-center bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 btn-glow shadow-glow"
                >
                  <span className="mr-2">🗳️</span>
                  Vote for Nominees
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/results"
                  className="group relative inline-flex items-center bg-gradient-to-r from-background to-background/80 text-text-primary border-2 border-primary px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  <span className="mr-2">📊</span>
                  View Results
                </Link>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              viewport={{ once: true }}
              className="text-text-secondary mt-6 max-w-2xl mx-auto"
            >
              Join the celebration! Nominate your favorite creators, vote for the best, and see who takes home the awards.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 md:py-32 px-4 relative bg-surface">
        {/* <div className="absolute inset-0 bg-gradient-to-b from-background via-surface to-surface-2"></div> */}
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Latest <span className="text-gradient">Updates</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
              Stay updated with the latest news, tournaments, and community highlights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group card-hover"
              >
                <div className="glass rounded-2xl p-6 md:p-8 border border-border/30 hover:border-secondary-500/30 transition-all duration-300 flex flex-col">
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-6">
                    <Image
                      src={post.image || "/blog-placeholder.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm md:text-base font-medium bg-secondary/20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                        {post.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-text-primary group-hover:text-secondary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    <Link
                      href="/blog"
                      className="inline-flex items-center text-secondary font-semibold hover:text-secondary/80 transition-colors duration-300 group-hover:translate-x-2 transform"
                    >
                      Read More 
                      <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary/80 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-lg md:text-xl font-semibold hover:shadow-glow transition-all duration-300 btn-glow"
              >
                View All Posts
                <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
