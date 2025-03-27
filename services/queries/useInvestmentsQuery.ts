import { useQuery } from "@tanstack/react-query";
import { Investment } from "../web3/types";
import { pharosService } from "../web3/contracts";
import { getMockInvestments } from "@/mocks/data";

// Function to fetch investment data
// IMPORTANT: This is using mock implementation for development
// When actual smart contracts are deployed, this will use real blockchain data
const fetchInvestments = async (address?: string): Promise<Investment[]> => {
  if (!address) return [];

  try {
    // Attempt to fetch from SPN
    const spn = await pharosService.getSPNRegistry().getSPN("crowdfunding");
    const result = await spn.call("getInvestmentsByAddress", [address]);
    if (Array.isArray(result)) {
      return result as Investment[];
    }
    // Fallback to mock data
    return getMockInvestments(address);
  } catch (error) {
    console.error("Error fetching investments:", error);
    // Return mock data for development
    return getMockInvestments(address);
  }
};

export const useInvestmentsQuery = (address?: string) => {
  return useQuery({
    queryKey: ["investments", address],
    queryFn: () => fetchInvestments(address),
    enabled: !!address,
  });
};
