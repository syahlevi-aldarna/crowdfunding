"use client";

import Link from "next/link";

/**
 * Footer Component
 *
 * Main footer for the application with:
 * - Company branding and description
 * - Navigation sections
 * - Contact information
 * - Copyright notice
 */
const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/95">
        {/* Decorative elements */}
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-600 to-transparent opacity-30"></div>

        <div className="container mx-auto px-6 py-16 relative overflow-hidden">
          {/* Background decorative pattern */}
          <div className="absolute inset-0 bg-dot-pattern opacity-20 dark:opacity-10"></div>

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 dark:from-indigo-500/5 dark:to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-indigo-300/10 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-full blur-3xl"></div>

          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
            {/* Brand and description */}
            <div className="space-y-5">
              <Link href="/" className="flex items-center gap-2 group w-fit">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all duration-300 group-hover:shadow-indigo-500/40">
                  CF
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                  CrowdFunding
                </h3>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Empowering innovation through decentralized funding on the
                blockchain. Secure, transparent, and community-driven.
              </p>

              {/* Social media links */}
              <div className="flex space-x-4 mt-6">
                <SocialLink href="#" label="Twitter">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </SocialLink>
                <SocialLink href="#" label="LinkedIn">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </SocialLink>
                <SocialLink href="#" label="GitHub">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </SocialLink>
                <SocialLink href="#" label="Discord">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                  </svg>
                </SocialLink>
              </div>
            </div>

            {/* Platform links */}
            <div>
              <h4 className="font-semibold mb-6 text-gray-900 dark:text-white text-lg relative inline-block">
                Platform
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent dark:from-indigo-400"></span>
              </h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <FooterLink href="/#how-it-works">How it Works</FooterLink>
                <FooterLink href="/projects">Browse Projects</FooterLink>
                <FooterLink href="/dashboard?tab=create">
                  Start a Project
                </FooterLink>
                <FooterLink href="#">Tokenomics</FooterLink>
                <FooterLink href="#">Roadmap</FooterLink>
              </ul>
            </div>

            {/* Support links */}
            <div>
              <h4 className="font-semibold mb-6 text-gray-900 dark:text-white text-lg relative inline-block">
                Support
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent dark:from-indigo-400"></span>
              </h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <FooterLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("FAQ section coming soon");
                  }}
                >
                  FAQ
                </FooterLink>
                <FooterLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Documentation coming soon");
                  }}
                >
                  Documentation
                </FooterLink>
                <FooterLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Contact form coming soon");
                  }}
                >
                  Contact Us
                </FooterLink>
                <FooterLink href="#">Community</FooterLink>
                <FooterLink href="#">Help Center</FooterLink>
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h4 className="font-semibold mb-6 text-gray-900 dark:text-white text-lg relative inline-block">
                Legal
                <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-indigo-600 to-transparent dark:from-indigo-400"></span>
              </h4>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <FooterLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Terms of Service coming soon");
                  }}
                >
                  Terms of Service
                </FooterLink>
                <FooterLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Privacy Policy coming soon");
                  }}
                >
                  Privacy Policy
                </FooterLink>
                <FooterLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Cookie Policy coming soon");
                  }}
                >
                  Cookie Policy
                </FooterLink>
                <FooterLink href="#">Compliance</FooterLink>
                <FooterLink href="#">Security</FooterLink>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-xl">
              <h5 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Stay updated
              </h5>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Subscribe to our newsletter for the latest project updates and
                blockchain insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-center md:text-left text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} CrowdFunding Platform. All rights
              reserved.
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors"
              >
                Sitemap
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors"
              >
                Accessibility
              </a>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 dark:text-gray-500 mt-4">
            Designed with <span className="text-red-500">❤️</span> for
            decentralized innovation. Powered by Ethereum.
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Footer link component
 */
const FooterLink = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <Link
        href={href}
        className="inline-block text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 group"
        onClick={onClick}
      >
        <span className="group-hover:underline underline-offset-4">
          {children}
        </span>
        <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">
          →
        </span>
      </Link>
    </li>
  );
};

/**
 * Social media link component
 */
const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="text-gray-500 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={label}
    >
      {children}
    </a>
  );
};

export default Footer;
