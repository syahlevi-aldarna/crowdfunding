export interface Token {
  address: string;
  symbol: string;
  decimals: number;
}

import { MOCK_TOKENS } from "@/mocks/data";

export const getSupportedTokens = async (): Promise<Token[]> => {
  try {
    // TODO: Implement fetch from blockchain when smart contract is available
    // Example: return await contractFunctions.getSupportedTokens();
    throw new Error("Contract not available");
  } catch (error) {
    console.log(
      "Using mock data for tokens because smart contract is not available yet"
    );
    return MOCK_TOKENS;
  }
};
