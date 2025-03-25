import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { mainnet, polygon } from "viem/chains";

export const getWeb3Config = () => {
  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

  return getDefaultConfig({
    appName: "Crowdfunding Platform",
    projectId: projectId || "",
    chains: [mainnet, polygon],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
    },
  });
};
