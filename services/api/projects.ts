import { Project } from "../web3/types";
import { contractFunctions } from "../web3/contracts";
import { MOCK_PROJECTS } from "@/mocks/data";

export const getProjects = async (): Promise<Project[]> => {
  try {
    return await contractFunctions.getProjects();
  } catch (error) {
    console.log("Using mock data because smart contract is not yet available");
    return MOCK_PROJECTS;
  }
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    return await contractFunctions.getProject(id);
  } catch (error) {
    console.log("Using mock data because smart contract is not yet available");
    const project = MOCK_PROJECTS.find((p) => p.id === id);
    return project || null;
  }
};
