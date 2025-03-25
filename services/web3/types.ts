export interface Project {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  creator: string;
  deadline: number;
  tokenPrice: number;
  isActive: boolean;
  imageUrl?: string; // Optional image URL for project
}

export interface Investment {
  projectId: string;
  investor: string;
  amount: number;
  timestamp: number;
}
