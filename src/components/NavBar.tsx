"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-secondary text-white transition-opacity duration-300 ${
        isScrolled ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold hover:scale-110 transition-transform duration-300"
        >
          <Image
            src="/wwg.png"
            alt="Logo"
            className="w-[80px] md:w-[100px]"
            width={3126}
            height={656}
            quality={10}
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="hover:text-background transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/awards"
            className="hover:text-background transition-colors duration-300"
          >
            Awards
          </Link>
          <Link
            href="/blog"
            className="hover:text-background transition-colors duration-300"
          >
            Blog
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-secondary md:hidden">
            <div className="flex flex-col items-center py-4 space-y-4">
              <Link
                href="/"
                className="hover:text-background transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/awards"
                className="hover:text-background transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Awards
              </Link>
              <Link
                href="/blog"
                className="hover:text-background transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
