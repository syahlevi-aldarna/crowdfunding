import {
  Address,
  createPublicClient,
  http,
  getContract,
  type GetContractReturnType,
  PublicClient,
  WalletClient,
} from "viem";
import { useWalletClient } from "wagmi";
import type { Project, Investment } from "./types";
import crowdfundingABI from "../../contracts/abis/CrowdfundingContract.json";

// ATTENTION: These values must be updated with actual contract addresses
// During development mode, these placeholder values are used with mock data
export const CONTRACT_ADDRESSES: { [key: string]: Address } = {
  // TODO: Replace with actual contract addresses after deployment to testnet/mainnet
  CROWDFUNDING: "0x0000000000000000000000000000000000000000" as Address, // Placeholder address
  TOKEN: "0x0000000000000000000000000000000000000000" as Address, // Placeholder address
};

export const getContractAddress = (
  name: keyof typeof CONTRACT_ADDRESSES
): Address => {
  return CONTRACT_ADDRESSES[name];
};

// Helper functions for contract interactions
export const getCrowdfundingContract = () => {
  const transport = http();
  const client = createPublicClient({ transport });

  return getContract({
    address: CONTRACT_ADDRESSES.CROWDFUNDING,
    abi: crowdfundingABI.abi,
    client,
  });
};

/**
 * DEVELOPMENT NOTICE:
 * The following functions use mock data because smart contracts are not yet available.
 * When smart contracts are ready, implement these functions with contract calls.
 */
export const contractFunctions = {
  getProjects: async (): Promise<Project[]> => {
    // TODO: Implement with contract.getProjects() when contract is ready
    console.warn(
      "Using mock data for projects. Smart contract not yet integrated."
    );
    throw new Error("Smart contract not yet integrated");
  },

  getProject: async (id: string): Promise<Project | null> => {
    // TODO: Implement with contract.getProject(id) when contract is ready
    console.warn(
      "Using mock data for project. Smart contract not yet integrated."
    );
    throw new Error("Smart contract not yet integrated");
  },

  invest: async (projectId: string, amount: number): Promise<boolean> => {
    // TODO: Implement with contract.invest(projectId, amount) when contract is ready
    console.warn(
      "Using mock data for invest. Smart contract not yet integrated."
    );
    throw new Error("Smart contract not yet integrated");
  },

  createProject: async (project: Omit<Project, "id">): Promise<string> => {
    // TODO: Implement with contract.createProject(...) when contract is ready
    console.warn(
      "Using mock data for createProject. Smart contract not yet integrated."
    );
    throw new Error("Smart contract not yet integrated");
  },
};
