// Blockchain network constants
export const CHAIN_IDS = {
  MAINNET: 1,
  POLYGON: 137,
  SEPOLIA: 11155111, // Test network
};

// Project status constants
export const PROJECT_STATUS = {
  ACTIVE: "active",
  FUNDED: "funded",
  EXPIRED: "expired",
} as const;

// API endpoint constants
export const API_ENDPOINTS = {
  PROJECTS: "/api/projects",
  TOKENS: "/api/tokens",
  INVESTMENTS: "/api/investments",
} as const;

// Application settings
export const APP_SETTINGS = {
  APP_NAME: "Crowdfunding Platform",
  DEFAULT_CHAIN: CHAIN_IDS.SEPOLIA,
  MIN_INVESTMENT: 0.01,
  MAX_PROJECT_DURATION_DAYS: 90,
};

// Local storage keys
export const STORAGE_KEYS = {
  THEME: "theme",
  LAST_CONNECTED_WALLET: "lastConnectedWallet",
};
