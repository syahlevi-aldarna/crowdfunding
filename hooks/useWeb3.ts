import { useAccount, useConfig, useWalletClient } from "wagmi";
import { getChainById } from "@/services/web3/config";
import { CHAIN_IDS } from "@/utils/constants";

export const useWeb3 = () => {
  const { address, isConnected } = useAccount();
  const config = useConfig();
  const { data: walletClient } = useWalletClient();

  // Get current chain from config
  const chainId = config.state.chainId;

  // Map chainId to chain object using our utility function
  const chain = getChainById(chainId);

  return {
    address,
    isConnected,
    chainId,
    chain,
    walletClient,
  };
};
