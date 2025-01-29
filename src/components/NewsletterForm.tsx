import { FaDiscord, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";
export default function Socials() {
  return (
    <div className="flex flex-wrap gap-4 md:gap-8 items-center justify-center mb-6">
      <Link href="https://discord.gg/xpjv99H" target="_blank" rel="noopener noreferrer">
        <FaDiscord className="text-primary text-2xl md:text-4xl hover:text-secondary transition-all duration-300 hover:scale-110 hover:cursor-pointer" />
      </Link>
      <Link href="https://instagram.com/watuwagaming" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-primary text-2xl md:text-4xl hover:text-secondary transition-all duration-300 hover:scale-110 hover:cursor-pointer" />
      </Link>
      <Link href="https://tiktok.com/@watuwagaming" target="_blank" rel="noopener noreferrer">
        <FaTiktok className="text-primary text-2xl md:text-4xl hover:text-secondary transition-all duration-300 hover:scale-110 hover:cursor-pointer" />
      </Link>
      <Link href="https://youtube.com/@watuwagaming" target="_blank" rel="noopener noreferrer">
        <FaYoutube className="text-primary text-2xl md:text-4xl hover:text-secondary transition-all duration-300 hover:scale-110 hover:cursor-pointer" />
      </Link>
      <Link href="mailto:watuwagaming@gmail.com">
        <FaMessage className="text-primary text-2xl md:text-4xl hover:text-secondary transition-all duration-300 hover:scale-110 hover:cursor-pointer" />
      </Link>
    </div>
  );
}