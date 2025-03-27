"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/shared/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectWithProgress } from "@/types/project";
import { MOCK_PROJECTS_WITH_PROGRESS } from "@/mocks/data";

// Define type for project filtering props
interface ProjectListProps {
  searchQuery?: string;
  category?: string;
}

export default function ProjectList({
  searchQuery = "",
  category = "all",
}: ProjectListProps) {
  const [allProjects] = useState(MOCK_PROJECTS_WITH_PROGRESS);
  const [filteredProjects, setFilteredProjects] = useState(
    MOCK_PROJECTS_WITH_PROGRESS
  );

  // Apply filters when search query or category changes
  useEffect(() => {
    const filtered = allProjects.filter((project) => {
      // Filter by search query (title, description, creator)
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.creator?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        false;

      // Filter by category
      const matchesCategory =
        category === "all" || project.category === category;

      return matchesSearch && matchesCategory;
    });

    setFilteredProjects(filtered);
  }, [searchQuery, category, allProjects]);

  return (
    <div>
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex justify-center items-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-1">
            No projects found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            We couldn't find any projects matching your current filters. Try
            adjusting your search or category selection.
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      <div className="mt-10 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Showing {filteredProjects.length} of {allProjects.length} projects
        </p>

        {filteredProjects.length > 0 &&
          filteredProjects.length < allProjects.length && (
            <button
              className="px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-gray-700 dark:text-gray-300 font-medium"
              onClick={() => {
                /* This would clear filters in a real implementation */
              }}
            >
              Clear Filters
            </button>
          )}
      </div>
    </div>
  );
}
