"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Hero Component - Main landing page hero section
 *
 * Features:
 * - Eye-catching headline and description
 * - CTA buttons with hover animations
 * - Accessibility-focused design
 * - Smooth scroll functionality to How It Works section
 * - Enhanced light mode with vibrant gradients
 */
export default function Hero() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  /**
   * Navigate to the projects listing page
   */
  const handleGetStarted = () => {
    router.push("/projects");
  };

  /**
   * Smooth scroll to the How It Works section
   */
  const handleLearnMore = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50/70 dark:from-gray-900 dark:via-indigo-950/30 dark:to-purple-950/20 z-0"></div>

      {/* Decorative patterns and design elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 dark:opacity-10 z-0"></div>

      {/* Fancy geometric shape */}
      <div className="absolute right-[10%] top-[15%] w-16 h-16 rotate-45 border-gradient rounded-md opacity-70 z-0 animate-[fadeIn_2s_ease-out]"></div>
      <div className="absolute left-[15%] top-[25%] w-12 h-12 rotate-12 border-gradient rounded-full opacity-60 z-0 animate-[fadeIn_1.5s_ease-out]"></div>

      {/* Decorative blobs */}
      <div className="absolute right-0 top-1/4 w-[30rem] h-[30rem] bg-gradient-to-r from-blue-300/20 via-blue-400/20 to-indigo-300/20 dark:from-blue-500/10 dark:via-blue-600/15 dark:to-indigo-500/10 rounded-full blur-3xl z-0 glow-accent-2"></div>
      <div className="absolute left-0 top-1/2 w-[35rem] h-[35rem] bg-gradient-to-r from-indigo-300/20 via-purple-400/20 to-purple-300/20 dark:from-indigo-500/10 dark:via-purple-600/15 dark:to-purple-500/10 rounded-full blur-3xl z-0 glow-accent-3"></div>
      <div className="absolute left-1/4 bottom-0 w-[25rem] h-[25rem] bg-gradient-to-r from-blue-200/20 via-sky-300/20 to-cyan-200/20 dark:from-blue-400/10 dark:via-sky-500/15 dark:to-cyan-400/10 rounded-full blur-3xl z-0 glow-accent-2"></div>

      {/* Main hero content */}
      <div className="hero min-h-[90vh] relative z-10">
        <div
          className={`hero-content text-center max-w-4xl px-4 py-16 transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="space-y-10">
            <div className="inline-block animate-[fadeIn_0.6s_ease-out]">
              <span className="inline-block px-6 py-2.5 rounded-full glass-effect text-indigo-600 dark:text-indigo-300 font-medium text-sm mb-6 glow-accent-3">
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                Blockchain-Powered Investing
              </span>
            </div>

            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 leading-tight animate-[fadeIn_0.8s_ease-out]">
                Fund the Future
              </h1>
              <div className="absolute -right-8 top-0 w-12 h-12 text-4xl animate-[fadeIn_1.5s_ease-out]">
                ✨
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed animate-[fadeIn_1s_ease-out]">
              Invest in innovative projects with blockchain technology for
              transparency, security, and limitless potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-10 animate-[fadeIn_1.2s_ease-out]">
              <button
                onClick={handleGetStarted}
                className="btn-modern-primary px-10 py-4 rounded-full text-lg font-medium glow-accent-3"
                aria-label="Get started with crowdfunding platform"
              >
                Get Started
              </button>
              <button
                onClick={handleLearnMore}
                className="btn-modern-secondary px-8 py-4 rounded-full text-lg"
                aria-label="Learn more about how the platform works"
              >
                Learn More
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 pt-4 flex flex-wrap justify-center gap-10 text-gray-600 dark:text-gray-300 text-sm animate-[fadeIn_1.4s_ease-out]">
              <div className="flex items-center">
                <div className="p-3 bg-indigo-50/80 dark:bg-indigo-900/30 rounded-full mr-3 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">Secure Blockchain</span>
              </div>
              <div className="flex items-center">
                <div className="p-3 bg-pink-50/80 dark:bg-pink-900/30 rounded-full mr-3 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <span className="font-medium">2,500+ Investors</span>
              </div>
              <div className="flex items-center">
                <div className="p-3 bg-sky-50/80 dark:bg-sky-900/30 rounded-full mr-3 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-sky-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">500+ ETH Invested</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
