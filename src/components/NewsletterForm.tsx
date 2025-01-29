import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-lg bg-background border border-primary/20 focus:border-primary outline-none"
        required
      />
      <button
        type="submit"
        className="bg-primary text-background px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
      >
        Subscribe
      </button>
    </form>
  );
}