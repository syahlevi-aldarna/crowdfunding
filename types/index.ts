/**
 * Centralized Types Index
 *
 * This file exports all types from individual type files for easier imports.
 * Instead of importing from each individual type file, you can import from '@/types'.
 */

// Re-export types from individual files
export * from "./project";
export * from "./user";

// Pharos-specific types
export interface PharosChainConfig {
  rpcUrl: string;
  chainId: number;
}

export interface PharosNetworkConfig {
  l1Base: PharosChainConfig;
  l1Core: PharosChainConfig;
  l1Extension: PharosChainConfig;
}

// Web3 types
export interface Web3TransactionResult {
  hash: string;
  status: "pending" | "confirmed" | "failed";
  blockNumber?: number;
}

export interface TokenAmount {
  amount: number;
  tokenAddress: string;
  symbol: string;
  decimals: number;
}
