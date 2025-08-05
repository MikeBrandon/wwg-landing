'use client';

import { FaNewspaper, FaDiscord, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: FaDiscord, href: "https://discord.gg/xpjv99H", label: "Discord" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-20 md:py-32 px-4 relative bg-surface border-t border-border/30">
        <div className="absolute inset-0"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
              className="inline-block mb-8"
            >
              <FaNewspaper className="text-secondary text-4xl md:text-5xl mx-auto" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Stay <span className="text-gradient">Connected</span>
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Follow us on our social media platforms for the latest updates, tournaments, and community events!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-20"
          >
            {/* <NewsletterForm /> */}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-6 md:gap-8"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="group relative p-4 glass rounded-2xl border border-border/30 hover:border-secondary/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="text-2xl md:text-3xl text-text-secondary group-hover:text-secondary transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-background/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 bg-surface border-t border-border/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <p className="text-text-secondary text-sm md:text-base">
                © {new Date().getFullYear()} <span className="text-secondary font-semibold">Watu Wa Gaming</span>. All rights reserved.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <p className="text-text-muted text-xs md:text-sm">
                Made with ❤️ for the gaming community
              </p>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
