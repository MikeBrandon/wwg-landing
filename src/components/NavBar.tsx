"use client";

import Image from "next/image";
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
        <Link href="/" className="text-2xl font-bold hover:scale-110 transition-transform duration-300">
            <Image src="/wwg.png" alt="Logo" className="w-[100px]" width={3126} height={656} quality={10}/>
        </Link>
        <div className="flex space-x-6">
          <Link href="/" className="hover:text-background transition-colors duration-300">Home</Link>
          <Link href="/awards" className="hover:text-background transition-colors duration-300">Awards</Link>
          <Link href="/blog" className="hover:text-background transition-colors duration-300">Blog</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
