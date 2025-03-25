import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

// Use environment variable or a placeholder ID (doesn't need to be valid in development)
// In production, get your own project ID from https://cloud.walletconnect.com
const PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "development-placeholder-id";

// Create a simpler config that will work without WalletConnect API
export const config = getDefaultConfig({
  appName: "Crowdfunding Platform",
  projectId: PROJECT_ID,
  chains: [sepolia, mainnet],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
  },
  // Additional options to make it more robust in dev environment
  ssr: false,
});
