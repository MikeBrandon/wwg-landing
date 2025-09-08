'use client';

import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
            Privacy Policy
          </h1>
          <p className="text-text-secondary mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div className="space-y-8 text-text-primary">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">1. Introduction</h2>
              <p className="mb-4 leading-relaxed">
                Welcome to Watu Wa Gaming (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name and email address when you create an account</li>
                <li>Gaming profiles and usernames</li>
                <li>Profile pictures and avatars</li>
                <li>Tournament participation data</li>
                <li>Voting and nomination information</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Usage Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Log data including IP addresses, browser type, and device information</li>
                <li>Pages visited and time spent on our platform</li>
                <li>Interaction with awards and voting systems</li>
                <li>Community engagement metrics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To provide and maintain our gaming community platform</li>
                <li>To process tournament registrations and awards nominations</li>
                <li>To enable voting and community participation features</li>
                <li>To send important updates about our services</li>
                <li>To improve our platform based on user feedback and analytics</li>
                <li>To prevent fraud and ensure platform security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">4. Information Sharing</h2>
              <p className="mb-4 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and the safety of our users</li>
                <li>With trusted service providers who assist in operating our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">5. Data Security</h2>
              <p className="mb-4 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">6. Your Rights</h2>
              <p className="mb-4 leading-relaxed">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of marketing communications</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">7. Cookies and Tracking</h2>
              <p className="mb-4 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">8. Third-Party Services</h2>
              <p className="mb-4 leading-relaxed">
                Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">9. Children&apos;s Privacy</h2>
              <p className="mb-4 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">10. Changes to This Policy</h2>
              <p className="mb-4 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">11. Contact Us</h2>
              <p className="mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-surface p-6 rounded-lg border border-border/30">
                <p className="font-semibold mb-2">Watu Wa Gaming</p>
                <p>Email: [TO BE UPDATED BY LAWYER]</p>
                <p>Address: [TO BE UPDATED BY LAWYER]</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
