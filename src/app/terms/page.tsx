'use client';

import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
            Terms of Service
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
              <h2 className="text-2xl font-bold mb-4 text-secondary">1. Acceptance of Terms</h2>
              <p className="mb-4 leading-relaxed">
                By accessing and using Watu Wa Gaming&apos;s platform and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">2. Description of Service</h2>
              <p className="mb-4 leading-relaxed">
                Watu Wa Gaming is a gaming community platform that provides:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Community forums and discussion spaces</li>
                <li>Tournament organization and participation</li>
                <li>Awards nomination and voting systems</li>
                <li>Gaming news and content</li>
                <li>Social networking features for gamers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">3. User Accounts</h2>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                <li>You must be at least 13 years old to create an account</li>
                <li>One person may not maintain multiple accounts</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Account Responsibilities</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use of your account</li>
                <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">4. Community Guidelines</h2>
              <p className="mb-4 leading-relaxed">Users must adhere to the following community standards:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Be respectful and courteous to other community members</li>
                <li>No harassment, bullying, or discriminatory behavior</li>
                <li>No spam, self-promotion without permission, or off-topic content</li>
                <li>No sharing of illegal, harmful, or inappropriate content</li>
                <li>Respect intellectual property rights</li>
                <li>Follow tournament rules and fair play guidelines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">5. Tournament and Awards System</h2>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Participation</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Tournament participation is subject to specific rules and eligibility requirements</li>
                <li>Awards nominations and voting must be conducted fairly and honestly</li>
                <li>We reserve the right to disqualify participants who violate tournament rules</li>
                <li>Prize distribution is subject to verification and compliance with our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">6. Content and Intellectual Property</h2>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">User Content</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You retain ownership of content you create and share on our platform</li>
                <li>By posting content, you grant us a license to use, display, and distribute it on our platform</li>
                <li>You are responsible for ensuring you have the right to share any content you post</li>
                <li>We reserve the right to remove content that violates our terms</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3 text-text-primary">Our Content</h3>
              <p className="mb-4 leading-relaxed">
                All content on our platform, including text, graphics, logos, and software, is owned by Watu Wa Gaming or our licensors and is protected by copyright and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">7. Privacy</h2>
              <p className="mb-4 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">8. Prohibited Uses</h2>
              <p className="mb-4 leading-relaxed">You may not use our service:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">9. Service Availability</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We strive to maintain service availability but cannot guarantee uninterrupted access</li>
                <li>We may modify, suspend, or discontinue services at any time</li>
                <li>We reserve the right to refuse service to anyone for any reason at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">10. Limitation of Liability</h2>
              <p className="mb-4 leading-relaxed">
                In no case shall Watu Wa Gaming, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">11. Indemnification</h2>
              <p className="mb-4 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Watu Wa Gaming and our subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees from any claim or demand made by any third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">12. Termination</h2>
              <p className="mb-4 leading-relaxed">
                We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever including, without limitation, a breach of the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">13. Governing Law</h2>
              <p className="mb-4 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of [TO BE UPDATED BY LAWYER], without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">14. Changes to Terms</h2>
              <p className="mb-4 leading-relaxed">
                We reserve the right to update these Terms of Service at any time. We will notify users of any changes by posting the new Terms of Service on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-secondary">15. Contact Information</h2>
              <p className="mb-4 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-surface p-6 rounded-lg border border-border/30">
                <p className="font-semibold mb-2">Watu Wa Gaming</p>
                <p>Email: [TO BE UPDATED BY LAWYER]</p>
                <p>Address: [TO BE UPDATED BY LAWYER]</p>
                <p>Phone: [TO BE UPDATED BY LAWYER]</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
