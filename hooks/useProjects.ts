import { useQuery } from "@tanstack/react-query";
import { getProjects, getProjectById } from "@/services/api/projects";
import { useProjectsQuery } from "@/services/queries/useProjectsQuery";

export const useProjects = () => {
  const { data: projects, isLoading, isError } = useProjectsQuery();

  return {
    projects: projects || [],
    isLoading,
    isError,
  };
};

export const useProject = (id: string) => {
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });

  return {
    project,
    isLoading,
    isError,
  };
};
