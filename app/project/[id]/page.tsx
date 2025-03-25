"use client";

import { useParams, notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { useProject } from "@/hooks/useProjects";
import { MOCK_PROJECTS_WITH_PROGRESS } from "@/mocks/data";

export default function ProjectPage() {
  const params = useParams();
  const id = params.id as string;

  // Find project by slug
  const project = MOCK_PROJECTS_WITH_PROGRESS.find((p) => p.slug === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProjectDetail id={project.id} />
    </div>
  );
}
