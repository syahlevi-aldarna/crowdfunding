"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MdSecurity,
  MdAccountBalanceWallet,
  MdAutoGraph,
} from "react-icons/md";

/**
 * HowItWorks Component - Displays the process of using the platform
 *
 * Features:
 * - Animated steps that appear on scroll into view
 * - Modern card design with hover effects
 * - Interactive icons with visual effects
 * - Responsive layout for all device sizes
 */
export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Step data array
  const steps = [
    {
      id: 1,
      title: "Connect Your Wallet",
      description:
        "Connect your crypto wallet to our platform with a single click. We support MetaMask, WalletConnect, and more.",
      icon: <MdAccountBalanceWallet className="w-7 h-7" />,
      color: "from-blue-500 to-sky-400",
      colorDark: "from-blue-400 to-sky-300",
      delay: 0,
    },
    {
      id: 2,
      title: "Choose Projects",
      description:
        "Browse through vetted blockchain projects, each with transparent funding goals and roadmaps.",
      icon: <MdSecurity className="w-7 h-7" />,
      color: "from-indigo-500 to-purple-500",
      colorDark: "from-indigo-400 to-purple-400",
      delay: 0.2,
    },
    {
      id: 3,
      title: "Track Performance",
      description:
        "Monitor your investments in real-time with detailed analytics and progress updates.",
      icon: <MdAutoGraph className="w-7 h-7" />,
      color: "from-purple-500 to-pink-500",
      colorDark: "from-purple-400 to-pink-400",
      delay: 0.4,
    },
  ];

  return (
    <div
      id="how-it-works"
      ref={sectionRef}
      className="py-20 md:py-32 px-4 relative overflow-hidden enhanced-section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 dark:opacity-10"></div>

      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-300/20 to-blue-300/20 dark:from-indigo-500/10 dark:to-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-300/20 to-pink-300/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-effect text-indigo-600 dark:text-indigo-300 font-medium text-sm mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Investing in blockchain projects has never been easier. Follow these
            simple steps to start your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line between steps */}
          <div className="hidden md:block absolute top-24 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-100 dark:from-blue-900/30 dark:via-indigo-800/30 dark:to-purple-900/30 z-0"></div>

          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`card-elegant rounded-2xl p-8 z-10 transition-all duration-1000 delay-${
                index * 200
              } ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: isVisible ? `${step.delay}s` : "0s",
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} dark:${step.colorDark} text-white shadow-lg mb-6 glow-accent-3`}
                >
                  {/* Animated pulse rings */}
                  <span className="absolute inset-0 rounded-full animate-ping bg-white opacity-20"></span>
                  {step.icon}

                  {/* Step number */}
                  <div className="absolute -right-2 -top-2 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-2 border-indigo-100 dark:border-gray-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm font-bold shadow-md">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 pt-12 border-t border-gray-100 dark:border-gray-800 text-center transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0 delay-500"
              : "opacity-0 translate-y-10"
          }`}
          style={{
            transitionDelay: isVisible ? "0.6s" : "0s",
          }}
        >
          <div className="inline-flex p-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <button
              className="btn btn-sm md:btn-md bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full px-6 py-2 text-gray-900 dark:text-white font-medium"
              onClick={() => (window.location.href = "/projects")}
            >
              Explore Projects
            </button>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            No obligations. Start exploring our curated projects today.
          </p>
        </div>
      </div>
    </div>
  );
}
