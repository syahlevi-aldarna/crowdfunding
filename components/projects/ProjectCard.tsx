"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProjectWithProgress } from "@/types/project";
import { IoMdTime, IoMdCheckmarkCircle } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip";

/**
 * ProjectCard Component - Displays project information in a card format
 *
 * Features:
 * - Dynamic progress bar with animation
 * - Enhanced hover effects for better interactivity
 * - Accessibility optimizations
 * - Responsive design for all device sizes
 * - Verified creator badge for trusted projects
 */
interface ProjectCardProps {
  project: ProjectWithProgress;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const {
    title,
    description,
    imageUrl,
    fundingGoal,
    currentFunding,
    createdAt,
    slug,
    creator,
    isVerified,
    backers,
    endDate,
    progress,
    category,
  } = project;

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isVisible && progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }
  }, [isVisible, progress]);

  /**
   * Navigate to project detail page
   */
  const handleClick = () => {
    router.push(`/project/${slug}`);
  };

  const progressColor =
    progress < 30
      ? "bg-blue-500"
      : progress < 60
      ? "bg-indigo-500"
      : progress < 80
      ? "bg-purple-500"
      : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500";

  // Calculate time remaining
  const timeRemaining = endDate ? new Date(endDate) : new Date();
  const timeRemainingText = endDate
    ? formatDistanceToNow(new Date(endDate), { addSuffix: true })
    : "Ongoing";

  return (
    <div
      ref={cardRef}
      className={`card-elegant shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transform transition-all duration-500 
      hover:shadow-xl hover:-translate-y-1 hover:border-opacity-0 dark:hover:shadow-indigo-900/20 
      ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
    >
      <div className="relative h-48 overflow-hidden group">
        {imageUrl && !imageError ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              width={400}
              height={225}
              priority
              onError={() => setImageError(true)}
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
            )}
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl text-indigo-300 dark:text-indigo-600 mb-2 block">
                {title.charAt(0)}
              </span>
              <span className="text-sm text-indigo-400 dark:text-indigo-500">
                {category || "Project"}
              </span>
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Time Indicator */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10 shadow-lg">
          <IoMdTime className="text-indigo-300" />
          <span>{timeRemainingText}</span>
        </div>

        {/* Verification badge */}
        {isVerified && (
          <div className="absolute top-3 left-3 bg-indigo-600/90 text-white p-1.5 rounded-md backdrop-blur-sm shadow-lg flex items-center gap-1">
            <MdVerified className="text-lg" />
            <span className="text-xs font-medium">Verified</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 ring-2 ring-indigo-100 dark:ring-indigo-900">
              {creator?.profileImage ? (
                <Image
                  src={creator.profileImage}
                  alt={creator.name || "Creator"}
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm font-medium text-indigo-600 dark:text-indigo-300">
                  {creator?.name?.charAt(0) || "C"}
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {creator?.name || "Anonymous"}
            </span>
          </div>

          <div className="flex items-center text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 rounded-full">
            <GoPeople className="mr-1.5" />
            <span className="text-xs font-medium">{backers || 0} backers</span>
          </div>
        </div>

        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          {isVerified && (
            <Tooltip content="Verified Creator">
              <div className="flex items-center text-green-500">
                <IoMdCheckmarkCircle className="w-5 h-5" />
              </div>
            </Tooltip>
          )}
        </div>

        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between mb-1.5 text-sm font-medium">
            <span className="text-indigo-600 dark:text-indigo-400">
              {Math.round(progress)}% Funded
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {fundingGoal} ETH Goal
            </span>
          </div>
          <div className="relative h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            <div
              ref={progressRef}
              className={`absolute h-full left-0 rounded-full transition-all duration-1000 ease-out ${progressColor}`}
              style={{ width: isVisible ? `${progress}%` : "0%" }}
            >
              {progress > 85 && (
                <div className="absolute inset-0 shimmer-effect"></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Current funding
            </span>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {currentFunding} ETH
            </div>
          </div>
          <Link
            href={`/projects/${slug}`}
            className="text-sm font-medium px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors duration-200 hover:shadow-md flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
