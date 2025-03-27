/**
 * Shared ProjectCard Component
 *
 * This component is used across the application to display project cards
 * in a consistent format, both in featured sections and in project listings.
 */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProjectWithProgress } from "@/types/project";
import { Tooltip } from "@/components/ui/Tooltip";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface ProjectCardProps {
  project: ProjectWithProgress;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  const router = useRouter();

  // Calculate remaining days
  const endDate = project.endDate ? new Date(project.endDate) : null;
  const now = new Date();
  const daysLeft = endDate
    ? Math.max(
        0,
        Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      )
    : 0;

  const handleClick = () => {
    router.push(`/project/${project.slug}`);
  };

  return (
    <div
      className="card-elegant overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative h-56 overflow-hidden group">
        <Image
          src={project.imageUrl || "/images/placeholders/default.jpg"}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Time Indicator */}
        {daysLeft > 0 ? (
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
            <span>{daysLeft} days left</span>
          </div>
        ) : (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-red-500/90 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
            Ended
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-3 overflow-hidden rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 ring-2 ring-indigo-100 dark:ring-indigo-900">
              <div className="flex items-center justify-center w-full h-full text-sm font-medium text-indigo-600 dark:text-indigo-300">
                {project.creator?.name?.charAt(0) || "A"}
              </div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {project.creator?.name || "Anonymous"}
            </span>
          </div>

          {project.isVerified && (
            <Tooltip content="Verified Project">
              <div className="text-green-500">
                <IoMdCheckmarkCircle className="w-5 h-5" />
              </div>
            </Tooltip>
          )}
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
              {project.fundingGoal} ETH Goal
            </span>
          </div>
          <div className="relative h-2.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`absolute h-full left-0 rounded-full ${
                project.progress < 30
                  ? "bg-blue-500"
                  : project.progress < 60
                  ? "bg-indigo-500"
                  : project.progress < 80
                  ? "bg-purple-500"
                  : "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
              }`}
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {project.currentFunding} ETH
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="text-sm font-medium px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
