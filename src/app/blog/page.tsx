"use client"

import blogPosts from '@/utils/blogPosts';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';

export default function Blog() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              className="bg-primary/5 p-4 md:p-8 rounded-lg border border-background/20 flex flex-col md:flex-row gap-6"
            >
              <div 
                className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(post.image)}
              >
                <Image
                  src={post.image || "/blog-placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-background/80 text-xs md:text-sm mb-3 md:mb-4">{post.date}</p>
                <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">{post.content}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs md:text-sm text-gray-400">#{post.id}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={selectedImage}
              alt="Fullscreen view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}