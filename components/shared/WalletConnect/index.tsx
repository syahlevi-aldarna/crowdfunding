"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface WalletConnectProps {
  size?: "sm" | "md" | "lg";
  onConnectionChange?: (connected: boolean, address?: string) => void;
}

const WalletConnect = ({
  size = "md",
  onConnectionChange,
}: WalletConnectProps) => {
  const [isClient, setIsClient] = useState(false);
  const [errorState, setErrorState] = useState("");

  // Handle global WalletConnect errors
  useEffect(() => {
    setIsClient(true);

    const handleError = (error: ErrorEvent) => {
      if (
        error.message?.includes("WalletConnect") ||
        error.message?.includes("RUNTIME ERROR in useAccount") ||
        error.message?.includes("wagmi")
      ) {
        setErrorState("Wallet connection error");
        // If error, notify parent of disconnected state
        onConnectionChange?.(false);
      }
    };

    // Listen for global errors related to wallet connection
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, [onConnectionChange]);

  if (!isClient) {
    return (
      <Button intent="primary" size={size} className="animate-pulse" disabled>
        Loading...
      </Button>
    );
  }

  if (errorState) {
    return (
      <Button
        intent="secondary"
        size={size}
        className="text-red-500 border-red-300 dark:border-red-800"
        onClick={() => window.location.reload()}
      >
        {errorState}
      </Button>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        // Call the onConnectionChange callback when connection status changes
        useEffect(() => {
          if (onConnectionChange) {
            onConnectionChange(!!connected, account?.address);
          }
        }, [connected, account?.address]);

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    intent="primary"
                    size={size}
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    intent="destructive"
                    size={size}
                    onClick={openChainModal}
                  >
                    Wrong Network
                  </Button>
                );
              }

              return (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    intent="outline"
                    size={size}
                    onClick={openChainModal}
                    className="hidden sm:flex items-center space-x-1 px-2 lg:px-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-sm font-medium">{chain.name}</span>
                  </Button>

                  <Button
                    intent="secondary"
                    size={size}
                    onClick={openAccountModal}
                    className="gap-2 hover:bg-opacity-80"
                  >
                    <span className="font-medium">{account.displayName}</span>
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-indigo-100 dark:bg-indigo-800">
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                    </div>
                  </Button>
                </motion.div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default WalletConnect;
