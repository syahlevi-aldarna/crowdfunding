import { useQuery } from "@tanstack/react-query";
import { Investment } from "../web3/types";
import { contractFunctions } from "../web3/contracts";
import { getMockInvestments } from "@/mocks/data";

// Function to fetch investment data
const fetchInvestments = async (address?: string): Promise<Investment[]> => {
  if (!address) {
    return [];
  }

  try {
    // Try to fetch from smart contract
    // TODO: Implement with contract.getInvestmentsByAddress(address)
    throw new Error("Smart contract not available");
  } catch (error) {
    console.log(
      "Using mock data for investments because smart contract is not yet available"
    );
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
