"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Mock data
const FEATURED_PROJECTS = [
  {
    id: "1",
    title: "Coal Mining Project",
    description:
      "Sustainable coal mining operation with advanced environmental protection systems.",
    image: "/images/placeholders/default.jpg",
    progress: 37,
    raised: "18.5 ETH",
    goal: "50 ETH",
    creator: {
      name: "IndustrialVentures",
      image: null,
    },
    daysLeft: 24,
  },
  {
    id: "2",
    title: "Mineral Extraction",
    description:
      "Modern mineral extraction with innovative techniques and community involvement.",
    image: "/images/placeholders/default.jpg",
    progress: 65,
    raised: "65 ETH",
    goal: "100 ETH",
    creator: {
      name: "ResourceLink",
      image: null,
    },
    daysLeft: 16,
  },
  {
    id: "3",
    title: "Crypto Investment Fund",
    description:
      "Diversified crypto investment portfolio managed by industry experts.",
    image: "/images/placeholders/default.jpg",
    progress: 60,
    raised: "120 ETH",
    goal: "200 ETH",
    creator: {
      name: "CryptoLabs",
      image: null,
    },
    daysLeft: 30,
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
          {FEATURED_PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="card-elegant overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl"
              onClick={() => handleViewDetails(project.id)}
            >
              <div className="relative h-56 overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Time Indicator */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{project.daysLeft} days left</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 ring-2 ring-indigo-100 dark:ring-indigo-900">
                      <div className="flex items-center justify-center w-full h-full text-sm font-medium text-indigo-600 dark:text-indigo-300">
                        {project.creator.name.charAt(0)}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {project.creator.name}
                    </span>
                  </div>
                </div>

                <h3 className="mb-2 text-xl font-bold line-clamp-1 text-gray-800 dark:text-gray-100">
                  {project.title}
                </h3>

                <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm font-medium mb-1.5">
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {project.progress}% Funded
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {project.goal} Goal
                    </span>
                  </div>
                  <div className="relative h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`absolute h-full left-0 rounded-full transition-all duration-1000 ease-out ${
                        project.progress < 30
                          ? "bg-blue-500"
                          : project.progress < 60
                          ? "bg-indigo-500"
                          : project.progress < 80
                          ? "bg-purple-500"
                          : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                      }`}
                      style={{ width: `${isVisible ? project.progress : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {project.raised}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(project.id);
                    }}
                    className="text-sm font-medium px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
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
                <div
                  className="card-elegant overflow-hidden rounded-2xl shadow-lg"
                  onClick={() => handleViewDetails(project.id)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />

                    {/* Time Indicator */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-indigo-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{project.daysLeft} days left</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="mb-2 text-xl font-bold line-clamp-1 text-gray-800 dark:text-gray-100">
                      {project.title}
                    </h3>

                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`absolute h-full left-0 rounded-full transition-all duration-1000 ease-out ${
                            project.progress < 30
                              ? "bg-blue-500"
                              : project.progress < 60
                              ? "bg-indigo-500"
                              : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                          }`}
                          style={{
                            width: `${isVisible ? project.progress : 0}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs font-medium mt-1">
                        <span className="text-indigo-600 dark:text-indigo-400">
                          {project.raised}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {project.goal}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(project.id);
                      }}
                      className="w-full text-center text-sm font-medium px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
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
