"use client";

import AwardsCarousel from "@/components/AwardsCarousel";
import Image from "next/image";
import { motion } from "framer-motion";

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

const AwardsPage = () => {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen text-text-primary pt-20 md:pt-24"
    >
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-background"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            variants={itemVariants}
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
                className="w-[70%] md:w-[50%] max-w-2xl mx-auto drop-shadow-2xl"
                width={5112}
                height={2051}
                quality={30}
                priority
              />
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="text-gradient">
                Creator Awards 2024
              </span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl lg:text-2xl text-primary max-w-4xl mx-auto leading-relaxed"
            >
              A prestigious celebration dedicated to recognizing and promoting Kenya&apos;s talented gaming content creators
            </motion.p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-24"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="glass rounded-2xl p-2 border border-border/30">
                <iframe
                  src="https://www.youtube.com/embed/Nu0OsbCxvqE"
                  title="Watu Wa Gaming Creator Awards 2024"
                  className="w-full aspect-video rounded-xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-background/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                  Celebrating <span className="text-secondary">Excellence</span> in Gaming
                </h2>
                <p className="text-lg md:text-xl text-primary leading-relaxed">
                  Welcome to the 3rd Annual Watu Wa Gaming Creator Awards - showcasing and uplifting local gaming creators who are shaping the future of gaming content in Kenya and East Africa.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "3rd", label: "Annual Event" },
                  { number: "50+", label: "Nominees" },
                  { number: "10", label: "Categories" },
                  { number: "2024", label: "Current Year" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="text-center glass rounded-xl p-4 border border-border/30 bg-surface/50 backdrop-blur-sm"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">
                      {stat.number}
                    </div>
                    <div className="text-text-secondary/80 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Awards Showcase */}
      <section className="py-20 md:py-32 px-4 bg-surface relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-2 to-surface"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient">
                2024 Winners
              </span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
              Honoring the outstanding content creators who have made a significant impact in the gaming community
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AwardsCarousel showAll={true} />
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
};

export default AwardsPage;
