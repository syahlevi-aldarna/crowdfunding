"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/projects/shared/ProjectCard";
import { ProjectWithProgress } from "@/types/project";

// Convert FEATURED_PROJECTS to match the ProjectWithProgress type
const FEATURED_PROJECTS: ProjectWithProgress[] = [
  {
    id: "1",
    title: "Coal Mining Project",
    description:
      "Sustainable coal mining operation with advanced environmental protection systems.",
    imageUrl: "/images/placeholders/default.jpg",
    progress: 37,
    currentFunding: 18.5,
    fundingGoal: 50,
    goal: 50,
    raised: 18.5,
    slug: "coal-mining-project",
    category: "mining",
    endDate: Date.now() + 86400000 * 24, // 24 days from now
    createdAt: Date.now() - 86400000 * 30,
    isVerified: true,
    backers: 24,
    creator: {
      name: "IndustrialVentures",
      address: "0x1234...5678",
    },
    deadline: Date.now() + 86400000 * 24,
    tokenPrice: 0.01,
    isActive: true,
  },
  {
    id: "2",
    title: "Mineral Extraction",
    description:
      "Modern mineral extraction with innovative techniques and community involvement.",
    imageUrl: "/images/placeholders/default.jpg",
    progress: 65,
    currentFunding: 65,
    fundingGoal: 100,
    goal: 100,
    raised: 65,
    slug: "mineral-extraction",
    category: "mining",
    endDate: Date.now() + 86400000 * 16,
    createdAt: Date.now() - 86400000 * 15,
    isVerified: true,
    backers: 58,
    creator: {
      name: "ResourceLink",
      address: "0x8765...4321",
    },
    deadline: Date.now() + 86400000 * 16,
    tokenPrice: 0.015,
    isActive: true,
  },
  {
    id: "3",
    title: "Crypto Investment Fund",
    description:
      "Diversified crypto investment portfolio managed by industry experts.",
    imageUrl: "/images/placeholders/default.jpg",
    progress: 60,
    currentFunding: 120,
    fundingGoal: 200,
    goal: 200,
    raised: 120,
    slug: "crypto-investment-fund",
    category: "finance",
    endDate: Date.now() + 86400000 * 30,
    createdAt: Date.now() - 86400000 * 10,
    isVerified: true,
    backers: 104,
    creator: {
      name: "CryptoLabs",
      address: "0xabcd...efgh",
    },
    deadline: Date.now() + 86400000 * 30,
    tokenPrice: 0.02,
    isActive: true,
  },
];

export default function FeaturedProjects() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (id: string) => {
    router.push(`/project/${id}`);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-900 dark:via-indigo-950/10 dark:to-gray-900"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20 dark:opacity-10"></div>
      <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/10 via-indigo-300/10 to-purple-300/10 dark:from-blue-500/5 dark:via-indigo-500/5 dark:to-purple-500/5 blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-purple-300/10 via-pink-300/10 to-red-300/10 dark:from-purple-500/5 dark:via-pink-500/5 dark:to-red-500/5 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="mb-8 md:mb-0">
              <span className="inline-block px-4 py-1.5 rounded-full glass-effect text-indigo-600 dark:text-indigo-300 font-medium text-sm mb-4">
                <span className="mr-2 inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                Trending Now
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Explore our hand-picked selection of innovative blockchain
                projects with the highest potential for growth and impact.
              </p>
            </div>

            <button
              onClick={() => router.push("/projects")}
              className="inline-flex items-center px-6 py-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors font-medium self-start md:self-auto"
            >
              View All Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Carousel */}
        <div
          ref={carouselRef}
          className={`hidden md:grid grid-cols-3 gap-8 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.id} className="opacity-100 animate-fadeIn">
              <ProjectCard project={project} featured={true} />
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative overflow-hidden transition-all duration-1000 ease-out">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {FEATURED_PROJECTS.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0 px-2">
                <ProjectCard project={project} featured={true} />
              </div>
            ))}
          </div>

          {/* Mobile Carousel Navigation */}
          <div className="flex justify-center mt-6 gap-2">
            {FEATURED_PROJECTS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-indigo-600 dark:bg-indigo-400 w-6"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Decorative tag line */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 delay-500" : "opacity-0"
          }`}
        >
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
            Projects are updated weekly — check back often!
          </span>
        </div>
      </div>
    </section>
  );
}
