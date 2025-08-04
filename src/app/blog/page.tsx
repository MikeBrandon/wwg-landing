"use client"

import blogPosts from '@/utils/blogPosts';
import Link from 'next/link';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Blog() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface to-surface-2"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-background/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-text-primary hover:text-secondary transition-colors text-sm md:text-base group"
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center"
              >
                <FaArrowLeft className="mr-2 group-hover:text-secondary" />
                Back to Home
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-8 md:mb-12"
          >
            Latest <span className="text-gradient">Updates</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 relative"
          >
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface/50 backdrop-blur-xl rounded-xl border border-border/30 focus:border-secondary/50 focus:outline-none text-text-primary placeholder-text-secondary transition-all duration-300"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-8"
          >
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group glass p-4 md:p-6 rounded-2xl border border-border/30 hover:border-secondary/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6 h-full">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative w-full md:w-72 h-48 md:h-full flex-shrink-0 rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(post.image)}
                    >
                      <Image
                        src={post.image || "/blog-placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                    
                    <div className="flex flex-col flex-grow">
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-gradient transition-colors duration-300">
                        {post.title}
                      </h2>
                      <p className="text-text-secondary text-sm mb-4">{post.date}</p>
                      <p className="text-text-secondary leading-relaxed">{post.content}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-text-muted">#{post.id}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl h-[80vh]"
              >
                <Image
                  src={selectedImage}
                  alt="Fullscreen view"
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}