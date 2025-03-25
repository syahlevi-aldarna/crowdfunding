"use client";

import { Hero, Stats, FeaturedProjects, HowItWorks } from "@/components/home";
import { useEffect, useState } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isConnected } = useWallet();
  const { isVerified, verificationStatus } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle "Start a Project" button click
  const handleStartProject = () => {
    if (!isConnected) {
      // If user hasn't connected their wallet, redirect to dashboard
      router.push("/dashboard");
      return;
    }

    if (isVerified) {
      // If already verified, go directly to create project page
      router.push("/dashboard?tab=create");
    } else if (verificationStatus === "pending") {
      // If verification is pending, redirect to dashboard
      router.push("/dashboard?verified=pending");
    } else {
      // If not verified, redirect to verification page
      router.push("/dashboard/become-creator");
    }
  };

  return (
    <div
      className={`transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      {/* Connector - visual connecting element between sections */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/90 z-10"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent dark:via-indigo-600/20"></div>
      </div>

      {/* Stats Section */}
      <section>
        <Stats />
      </section>

      {/* Connector */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent dark:via-indigo-600/20"></div>
      </div>

      {/* Featured Projects Section */}
      <section>
        <FeaturedProjects />
      </section>

      {/* Connector */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent dark:via-indigo-600/20"></div>
      </div>

      {/* How It Works Section */}
      <section>
        <HowItWorks />
      </section>

      {/* Call to Action Banner */}
      <section className="my-16 mx-4 sm:mx-8 relative overflow-hidden rounded-2xl shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/images/placeholders/default.jpg')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="relative z-10 px-6 py-16 sm:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Join the Future of Funding?
          </h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-8 text-lg">
            Start investing in innovative blockchain projects or launch your own
            campaign today and be part of the decentralized revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/projects")}
              className="px-8 py-3 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explore Projects
            </button>
            <button
              onClick={handleStartProject}
              className="px-8 py-3 rounded-full bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition-colors shadow-lg border border-indigo-500"
            >
              {isVerified ? "Start a Project" : "Become a Creator"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
