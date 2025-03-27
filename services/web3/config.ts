/**
 * Consolidated Web3 Configuration
 *
 * This file combines the functionality from web3.ts and provider.ts
 * to provide a central configuration point for all Web3 related settings.
 */

import { http } from "viem";
import { mainnet, sepolia, polygon } from "viem/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { CHAIN_IDS } from "@/config/constants";

// Use environment variable or a placeholder ID (doesn't need to be valid in development)
// In production, get your own project ID from https://cloud.walletconnect.com
const PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "development-placeholder-id";

// Create a simpler config that will work without WalletConnect API
export const web3Config = getDefaultConfig({
  appName: "Crowdfunding Platform",
  projectId: PROJECT_ID,
  chains: [sepolia, mainnet, polygon],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  // Additional options to make it more robust in dev environment
  ssr: false,
});

// Get chain information by ID
export const getChainById = (id?: number) => {
  if (!id) return undefined;

  switch (id) {
    case CHAIN_IDS.MAINNET:
      return mainnet;
    case CHAIN_IDS.POLYGON:
      return polygon;
    case CHAIN_IDS.SEPOLIA:
      return sepolia;
    default:
      return undefined;
  }
};
