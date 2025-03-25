import { useConnect, useDisconnect, useAccount, useBalance } from "wagmi";
import { formatAddress, formatAmount } from "@/utils/formatting";

export const useWallet = () => {
  const { connectors, connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  return {
    // Connection
    connect,
    disconnect,
    connectors,
    isConnecting,
    isConnected,

    // Account info
    address,
    formattedAddress: address ? formatAddress(address) : "",

    // Balance
    balance: balance?.value,
    formattedBalance: balance
      ? formatAmount(Number(balance.value), balance.decimals)
      : "0",
    symbol: balance?.symbol || "ETH",
  };
};
