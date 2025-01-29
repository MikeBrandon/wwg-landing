"use client"

import Image from 'next/image';
import { FaDiscord, FaTrophy, FaNewspaper } from 'react-icons/fa';
import NewsletterForm from '../components/NewsletterForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80"
            alt="Gaming Community Hero"
            fill
            className="object-cover opacity-40"
            priority
            quality={100}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>  
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-primary">Gaming</span> Community
          </h1>
          <p className="text-xl mb-8">Join our amazing community of gamers!</p>
          <a
            href="https://discord.gg/your-invite-link"
            className="inline-flex items-center bg-primary text-background px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            <FaDiscord className="mr-2 text-2xl" />
            Join the Community
          </a>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="text-primary">Community</span> Awards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Tournament Champions', description: 'Best performing team of 2023' },
              { title: 'Community Choice', description: 'Most helpful community member' },
              { title: 'Content Creator', description: 'Best gaming content creator' }
            ].map((award, index) => (
              <div key={index} className="bg-secondary/10 p-6 rounded-lg border border-secondary">
                <FaTrophy className="text-primary text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                <p className="text-gray-300">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-4 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Latest <span className="text-primary">Updates</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'New Tournament Series',
                date: 'October 1, 2023',
                excerpt: 'Join our upcoming tournament series with amazing prizes!'
              },
              {
                title: 'Community Game Night',
                date: 'September 28, 2023',
                excerpt: 'Weekly community game nights are back with new exciting games!'
              }
            ].map((post, index) => (
              <div key={index} className="bg-background p-6 rounded-lg border border-primary/20">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-primary/80 text-sm mb-4">{post.date}</p>
                <p className="text-gray-300">{post.excerpt}</p>
                <Link 
                  href="/blog" 
                  className="inline-block text-primary mt-4 hover:text-primary/80"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FaNewspaper className="text-primary text-4xl mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Stay <span className="text-primary">Updated</span>
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Subscribe to our newsletter for the latest gaming updates and events!
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/20">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>© 2023 Gaming Community. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}