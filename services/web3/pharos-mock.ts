/**
 * PHAROS SDK MOCK IMPLEMENTATION
 *
 * This file contains mock implementations of the Pharos SDK classes and interfaces.
 * It is designed to be replaced with the actual @pharos/sdk package when it becomes available.
 *
 * See README-integration.md for detailed instructions on how to integrate with the real SDK.
 */

import { Project, Investment } from "./types";
import {
  MOCK_PROJECTS,
  MOCK_PROJECTS_WITH_PROGRESS,
  getMockInvestments,
} from "@/mocks/data";
import { PharosNetworkConfig } from "@/types";

/**
 * Mock implementation of PharosProvider
 * This class simulates the behavior of the real Pharos SDK PharosProvider
 */
export class PharosProvider {
  private config: PharosNetworkConfig;

  constructor(config: PharosNetworkConfig) {
    this.config = config;
    console.log("Mock PharosProvider initialized", config);
  }

  // Mock implementation of restaking functionality
  async restake(params: {
    amount: number;
    address: string;
    validator: string;
  }) {
    console.log("Mock restake:", params);
    return Promise.resolve();
  }
}

/**
 * Mock implementation of SPN (Special Processing Network)
 * In the real SDK, this would interact with the actual blockchain SPNs
 */
export class SPN {
  // Simulates parallel execution of transactions
  async executeParallel(
    method: string,
    args: any[]
  ): Promise<string | boolean> {
    console.log("Mock executeParallel:", method, args);
    switch (method) {
      case "invest":
        return Promise.resolve(true);
      case "createProject":
        return Promise.resolve("mock-tx-hash");
      default:
        return Promise.resolve("mock-tx-hash");
    }
  }

  // Simulates read-only calls to smart contracts
  async call(
    method: string,
    args: any[] = []
  ): Promise<Project[] | Project | Investment[] | null> {
    console.log("Mock call:", method, args);
    switch (method) {
      case "getProjects":
        return Promise.resolve(MOCK_PROJECTS);
      case "getProject":
        const [id] = args;
        return Promise.resolve(MOCK_PROJECTS.find((p) => p.id === id) || null);
      case "getInvestmentsByAddress":
        const [address] = args;
        return Promise.resolve(getMockInvestments(address));
      default:
        return Promise.resolve([]);
    }
  }
}

/**
 * Mock implementation of SPNRegistry
 * In the real SDK, this would manage access to different SPNs
 */
export class SPNRegistry {
  private provider: PharosProvider;

  constructor(provider: PharosProvider) {
    this.provider = provider;
  }

  async getSPN(name: string): Promise<SPN> {
    console.log("Mock getSPN:", name);
    return new SPN();
  }
}

/**
 * Mock implementation of ParallelMerklization
 * In the real SDK, this would handle batching and merklization of transactions
 */
export class ParallelMerklization {
  constructor(provider: PharosProvider) {
    console.log("Initializing mock parallel merklization");
  }

  async processBatch(transactions: any[], options: any) {
    console.log("Mock batch processing", transactions, options);
    return Promise.resolve({ hash: "mock-hash" });
  }
}
