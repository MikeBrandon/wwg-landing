"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-secondary text-white transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex justify-between items-center p-4">
        <div className="text-2xl font-bold">Watu Wa Gaming</div>
        <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
