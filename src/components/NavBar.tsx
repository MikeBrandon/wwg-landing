"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/awards", label: "Awards" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-border/50 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="relative group"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Image
              src="/wwg.png"
              alt="Watu Wa Gaming Logo"
              className="w-[80px] md:w-[100px] transition-all duration-300 group-hover:brightness-110"
              width={3126}
              height={656}
              quality={25}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-background/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </motion.div>
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden relative z-50 p-2 rounded-lg glass border border-border/30 hover:border-secondary/50 transition-all duration-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <FaTimes className="text-text-primary text-xl" />
            ) : (
              <FaBars className="text-text-primary text-xl" />
            )}
          </motion.div>
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <Link
                href={item.href}
                className="relative px-4 py-2 rounded-lg text-text-primary font-medium transition-all duration-300 hover:text-secondary group"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-background/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
                <div className="absolute bottom-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-background group-hover:w-[100%] group-hover:left-1/8 transition-all duration-300"></div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 md:hidden glass border-b border-border/30 backdrop-blur-xl"
            >
              <div className="flex flex-col items-center py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="relative px-6 py-3 rounded-lg text-text-primary font-medium transition-all duration-300 hover:text-secondary group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10">{item.label}</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-background/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar;
