import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../api/projects";

export const useProjectsQuery = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};
