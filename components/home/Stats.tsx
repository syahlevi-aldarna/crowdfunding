"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stats Component - Displays platform statistics with animations
 *
 * Features:
 * - Animated counting effect for statistics
 * - Intersection observer to trigger animations when visible
 * - Enhanced visual design with gradients and decorative elements
 * - Optimized for both light and dark mode
 */
export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({
    investors: 0,
    projects: 0,
    volume: 0,
    returns: 0,
  });

  // Stats data
  const statsData = [
    {
      label: "Active Investors",
      value: 2500,
      prefix: "",
      suffix: "+",
      gradient: "from-blue-500 to-indigo-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
        </svg>
      ),
    },
    {
      label: "Projects Funded",
      value: 175,
      prefix: "",
      suffix: "",
      gradient: "from-indigo-500 to-purple-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
        </svg>
      ),
    },
    {
      label: "Volume (ETH)",
      value: 520,
      prefix: "",
      suffix: "",
      gradient: "from-purple-500 to-pink-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    {
      label: "Average Return",
      value: 18,
      prefix: "",
      suffix: "%",
      gradient: "from-pink-500 to-rose-600",
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
  ];

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

  // Animate counting when section becomes visible
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // ms
      const interval = 20; // ms
      const steps = duration / interval;

      const incrementValues = {
        investors: Math.ceil(statsData[0].value / steps),
        projects: Math.ceil(statsData[1].value / steps),
        volume: Math.ceil(statsData[2].value / steps),
        returns: Math.ceil(statsData[3].value / steps),
      };

      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep += 1;

        if (currentStep >= steps) {
          setCounts({
            investors: statsData[0].value,
            projects: statsData[1].value,
            volume: statsData[2].value,
            returns: statsData[3].value,
          });
          clearInterval(timer);
        } else {
          setCounts((prevCounts) => ({
            investors: Math.min(
              prevCounts.investors + incrementValues.investors,
              statsData[0].value
            ),
            projects: Math.min(
              prevCounts.projects + incrementValues.projects,
              statsData[1].value
            ),
            volume: Math.min(
              prevCounts.volume + incrementValues.volume,
              statsData[2].value
            ),
            returns: Math.min(
              prevCounts.returns + incrementValues.returns,
              statsData[3].value
            ),
          }));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const countValues = [
    counts.investors,
    counts.projects,
    counts.volume,
    counts.returns,
  ];

  return (
    <div ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30 -z-10"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-10 dark:opacity-5 -z-10"></div>

      {/* Decorative shapes */}
      <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-300/10 to-purple-300/10 dark:from-indigo-500/5 dark:to-purple-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-blue-300/10 to-cyan-300/10 dark:from-blue-500/5 dark:to-cyan-500/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass-effect text-indigo-600 dark:text-indigo-300 font-medium text-sm mb-4">
            Platform Impact
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Our Success in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Discover how our platform is transforming blockchain investments
            with measurable results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className={`card-elegant p-8 rounded-2xl relative overflow-hidden transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 0.1}s` : "0s" }}
            >
              {/* Gradient accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient}`}
              ></div>

              <div className="flex items-center mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white mr-4 shadow-md`}
                >
                  {stat.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                  {stat.label}
                </h3>
              </div>

              <div className="flex items-end">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.prefix}
                    {isVisible ? countValues[index].toLocaleString() : "0"}
                    {stat.suffix}
                  </span>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-white/40 to-white/5 dark:from-white/5 dark:to-white/0 blur-xl"></div>
            </div>
          ))}
        </div>

        {/* Additional context */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0 delay-500"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            <span className="font-medium">Data updated:</span> Last month's
            metrics
          </p>
        </div>
      </div>
    </div>
  );
}
