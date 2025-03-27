/**
 * PHAROS CONFIGURATION
 *
 * This file contains configuration for connecting to Pharos networks.
 * The values are loaded from environment variables.
 *
 * In development, default values are provided, but in production
 * these should be set to the actual network endpoints.
 */

import { PharosProvider, SPNRegistry } from "./pharos-mock";
import { PharosNetworkConfig } from "@/types";

export const PHAROS_CONFIG: PharosNetworkConfig = {
  l1Base: {
    rpcUrl: process.env.NEXT_PUBLIC_PHAROS_L1_BASE_RPC || "",
    chainId: 1337, // Development default, should be updated for production
  },
  l1Core: {
    rpcUrl: process.env.NEXT_PUBLIC_PHAROS_L1_CORE_RPC || "",
    chainId: 1338, // Development default, should be updated for production
  },
  l1Extension: {
    rpcUrl: process.env.NEXT_PUBLIC_PHAROS_L1_EXTENSION_RPC || "",
    chainId: 1339, // Development default, should be updated for production
  },
};
