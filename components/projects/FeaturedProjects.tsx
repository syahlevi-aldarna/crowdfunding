"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ProjectCard from "./ProjectCard";
import { ProjectWithProgress } from "@/types/project";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/**
 * FeaturedProjects Component - Displays a carousel of featured projects
 *
 * Features:
 * - Animated entrance when component comes into view
 * - Interactive carousel with autoplay and navigation
 * - Responsive design that adapts to all screen sizes
 * - Enhanced visual styling with decorative elements
 */
interface FeaturedProjectsProps {
  projects: ProjectWithProgress[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
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

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden enhanced-section"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50/30 to-white dark:from-gray-900 dark:via-indigo-950/10 dark:to-gray-900 -z-10"></div>
      <div className="absolute inset-0 bg-dot-pattern opacity-20 dark:opacity-10 -z-10"></div>

      {/* Decorative shapes */}
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-gradient-to-r from-blue-300/10 via-blue-400/10 to-indigo-300/10 dark:from-blue-500/5 dark:via-blue-600/5 dark:to-indigo-500/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-300/10 via-purple-400/10 to-pink-300/10 dark:from-indigo-500/5 dark:via-purple-600/5 dark:to-pink-500/5 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="mb-6 md:mb-0">
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

            <Link
              href="/projects"
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
            </Link>
          </div>
        </div>

        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0 delay-300"
              : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: isVisible ? "0.2s" : "0s" }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="featured-projects-swiper !pb-14"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Decorative tag line */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 delay-500" : "opacity-0"
          }`}
          style={{ transitionDelay: isVisible ? "0.4s" : "0s" }}
        >
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-600 dark:text-indigo-300 rounded-full text-sm">
            Projects are updated weekly — check back often!
          </span>
        </div>
      </div>
    </div>
  );
}
