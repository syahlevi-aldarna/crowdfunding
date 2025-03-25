import { Project, Investment } from "@/services/web3/types";
import { Token } from "@/services/api/tokens";
import { ProjectWithProgress } from "@/types/project";
import { UserProfile } from "@/types/user";

// Mock Projects
export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Coal Mining Project",
    description:
      "Sustainable coal mining operation with advanced environmental protection systems",
    goal: 50,
    raised: 18.5,
    creator: "0x1234...5678",
    deadline: Date.now() + 86400000 * 30,
    tokenPrice: 0.01,
    isActive: true,
    imageUrl: "/images/placeholders/default.jpg",
  },
  {
    id: "2",
    title: "Mineral Extraction Venture",
    description:
      "Modern mineral extraction with innovative techniques and community involvement",
    goal: 100,
    raised: 65,
    creator: "0x8765...4321",
    deadline: Date.now() + 86400000 * 45,
    tokenPrice: 0.015,
    isActive: true,
    imageUrl: "/images/placeholders/default.jpg",
  },
];

// Mock Projects with Progress
export const MOCK_PROJECTS_WITH_PROGRESS: ProjectWithProgress[] = [
  {
    ...MOCK_PROJECTS[0],
    progress: 37,
    currentFunding: 18.5,
    fundingGoal: 50,
    slug: "coal-mining-project",
    category: "mining",
    endDate: Date.now() + 86400000 * 30,
    createdAt: Date.now() - 86400000 * 30,
    isVerified: true,
    backers: 24,
    creator: {
      name: "EnergyMiners Co.",
      address: "0x1234...5678",
    },
  },
  {
    ...MOCK_PROJECTS[1],
    progress: 65,
    currentFunding: 65,
    fundingGoal: 100,
    slug: "mineral-extraction-venture",
    category: "mining",
    endDate: Date.now() + 86400000 * 45,
    createdAt: Date.now() - 86400000 * 15,
    isVerified: true,
    backers: 58,
    creator: {
      name: "MineralTech Ltd.",
      address: "0x8765...4321",
    },
  },
];

// Mock Tokens
export const MOCK_TOKENS: Token[] = [
  {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    symbol: "ETH",
    decimals: 18,
  },
  {
    address: "0x1111111111111111111111111111111111111111",
    symbol: "USDT",
    decimals: 6,
  },
  {
    address: "0x2222222222222222222222222222222222222222",
    symbol: "USDC",
    decimals: 6,
  },
];

// Mock Users
export const MOCK_USERS: Record<string, UserProfile> = {
  "0x1234567890123456789012345678901234567890": {
    address: "0x1234567890123456789012345678901234567890",
    isVerified: true,
    verificationStatus: "verified",
    name: "Verified Creator",
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    stake: 0.5,
  },
};

// Mock Investments
export const getMockInvestments = (address: string): Investment[] => [
  {
    projectId: "1",
    investor: address,
    amount: 5,
    timestamp: Date.now() - 86400000 * 3,
  },
  {
    projectId: "2",
    investor: address,
    amount: 2.5,
    timestamp: Date.now() - 86400000 * 5,
  },
];
