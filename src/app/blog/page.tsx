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
  },
  {
    id: 2,
    title: 'Community Game Night',
    date: 'September 28, 2023',
    excerpt: 'Weekly community game nights are back with new exciting games!',
    content: 'Our popular weekly game nights are returning with an exciting lineup of new games. Join us every Friday for fun, competition, and a chance to meet fellow gamers in our community.'
  },
  {
    id: 3,
    title: 'Discord Server Update',
    date: 'September 25, 2023',
    excerpt: 'Check out the new features and channels in our Discord server!',
    content: 'We\'ve added new channels, roles, and features to enhance your experience in our Discord community. Explore new ways to connect with fellow gamers and stay updated with the latest gaming news.'
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold mb-12">
          Latest <span className="text-primary">Updates</span>
        </h1>

        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-secondary/5 p-8 rounded-lg border border-primary/20"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-primary/80 text-sm mb-4">{post.date}</p>
              <p className="text-gray-300 mb-6">{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">#{post.id}</span>
                <button className="text-primary hover:text-primary/80 transition-colors">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}