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

// IMPORTANT: This is a mock implementation for development
// When @pharos/sdk is available, replace with:
// import { PharosProvider, SPNRegistry } from "@pharos/sdk";
import { PharosProvider, SPNRegistry } from "./pharos-mock";
import { PHAROS_CONFIG } from "./pharos-config";

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

export class PharosCrowdfundingService {
  private provider: PharosProvider;
  private spnRegistry: SPNRegistry;

  constructor() {
    this.provider = new PharosProvider({
      l1Base: PHAROS_CONFIG.l1Base,
      l1Core: PHAROS_CONFIG.l1Core,
      l1Extension: PHAROS_CONFIG.l1Extension,
    });
    this.spnRegistry = new SPNRegistry(this.provider);
  }

  public getSPNRegistry() {
    return this.spnRegistry;
  }

  async createProject(project: Omit<Project, "id">): Promise<string> {
    const spn = await this.spnRegistry.getSPN("crowdfunding");
    const result = await spn.executeParallel("createProject", [project]);
    if (typeof result !== "string") {
      throw new Error("Invalid response from createProject");
    }
    return result;
  }

  async invest(projectId: string, amount: number): Promise<boolean> {
    const spn = await this.spnRegistry.getSPN("crowdfunding");
    const result = await spn.executeParallel("invest", [projectId, amount]);
    return result === true;
  }

  async getProjects(): Promise<Project[]> {
    const spn = await this.spnRegistry.getSPN("crowdfunding");
    const result = await spn.call("getProjects");
    if (!Array.isArray(result)) {
      throw new Error("Invalid response from getProjects");
    }
    return result as Project[];
  }

  async getProject(id: string): Promise<Project | null> {
    const spn = await this.spnRegistry.getSPN("crowdfunding");
    const result = await spn.call("getProject", [id]);
    if (result && !Array.isArray(result)) {
      return result as Project;
    }
    return null;
  }
}

export const pharosService = new PharosCrowdfundingService();
