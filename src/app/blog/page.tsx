"use client"

import blogPosts from '@/utils/blogPosts';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function Blog() {
  return (
    <div className="min-h-screen bg-primary text-background py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-background hover:text-background/80 transition-colors mt-8 text-sm md:text-base"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-12">
          Blog
        </h1>

        <div className="grid gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-primary/5 p-4 md:p-8 rounded-lg border border-background/20"
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-background/80 text-xs md:text-sm mb-3 md:mb-4">{post.date}</p>
              <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs md:text-sm text-gray-400">#{post.id}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}