import { useAccount, useConfig, useWalletClient } from "wagmi";
import { mainnet, polygon } from "viem/chains";
import { CHAIN_IDS } from "@/utils/constants";

export const useWeb3 = () => {
  const { address, isConnected } = useAccount();
  const config = useConfig();
  const { data: walletClient } = useWalletClient();

  // Get current chain from config
  const chainId = config.state.chainId;

  // Map chainId to chain object
  const getChainById = (id?: number) => {
    if (!id) return undefined;

    switch (id) {
      case CHAIN_IDS.MAINNET:
        return mainnet;
      case CHAIN_IDS.POLYGON:
        return polygon;
      default:
        return undefined;
    }
  };

  const chain = getChainById(chainId);

  return {
    address,
    isConnected,
    chainId,
    chain,
    walletClient,
  };
};
