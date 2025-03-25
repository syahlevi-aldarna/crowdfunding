import { Project as BaseProject } from "@/services/web3/types";

export interface Creator {
  name?: string;
  profileImage?: string;
  address: string;
}

export interface ProjectWithProgress extends Omit<BaseProject, "creator"> {
  progress: number;
  currentFunding: number;
  fundingGoal: number;
  imageUrl?: string;
  slug: string;
  category?: string;
  isVerified?: boolean;
  backers?: number;
  endDate?: number | Date;
  createdAt?: number | Date;
  creator: Creator;
}
