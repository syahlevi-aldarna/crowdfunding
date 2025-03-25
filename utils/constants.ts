export const CHAIN_IDS = {
  MAINNET: 1,
  POLYGON: 137,
};

export const PROJECT_STATUS = {
  ACTIVE: "active",
  FUNDED: "funded",
  EXPIRED: "expired",
} as const;

export const API_ENDPOINTS = {
  PROJECTS: "/api/projects",
  TOKENS: "/api/tokens",
} as const;
