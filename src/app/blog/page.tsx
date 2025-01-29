"use client"

import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const blogPosts = [
  {
    id: 1,
    title: 'New Tournament Series',
    date: 'October 1, 2023',
    excerpt: 'Join our upcoming tournament series with amazing prizes!',
    content: 'Get ready for an exciting tournament series that will test your skills and teamwork. Compete against the best teams in our community for amazing prizes including gaming gear, exclusive merchandise, and more!'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-primary text-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-background hover:text-background/80 transition-colors mt-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-12">
          Blog
        </h1>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-primary/5 p-8 rounded-lg border border-background/20"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-background/80 text-sm mb-4">{post.date}</p>
              <p className="text-gray-300 mb-6">{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">#{post.id}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}