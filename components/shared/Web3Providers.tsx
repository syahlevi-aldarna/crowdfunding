"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { config } from "@/services/web3/web3";
import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, lightTheme } from "@rainbow-me/rainbowkit";

// Create error handler for console
const silenceWalletConnectErrors = () => {
  const originalError = console.error;
  console.error = (...args) => {
    // Don't log wallet connect errors to the console
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].includes("WalletConnect") ||
        args[0].includes("401") ||
        args[0].includes("projectId") ||
        args[0].includes("TypeError") ||
        args[0].includes("Cannot convert undefined or null") ||
        args[0].includes("reconnectOnMount") ||
        args[0].includes("wagmi"))
    ) {
      return;
    }
    originalError.apply(console, args);
  };
};

// Patch global Object.values to handle null/undefined
const patchObjectValues = () => {
  try {
    const originalValues = Object.values;
    // @ts-ignore - we're patching a global method
    Object.values = function (obj) {
      if (obj === null || obj === undefined) {
        console.debug("Prevented Object.values error with null/undefined");
        return [];
      }
      return originalValues(obj);
    };
  } catch (e) {
    console.debug("Error patching Object.values:", e);
  }
};

export default function Web3Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    setMounted(true);
    // Apply error handling patches
    silenceWalletConnectErrors();
    patchObjectValues();

    // Check if dark mode is enabled
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
    }

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Custom theme for RainbowKit
  const customLightTheme = {
    ...lightTheme(),
    colors: {
      ...lightTheme().colors,
      accentColor: "#4338ca",
      accentColorForeground: "white",
      connectButtonBackground: "white",
      connectButtonText: "#4338ca",
      modalBackground: "white",
      modalBorder: "#e5e7eb",
      profileActionHover: "#f9fafb",
    },
    fonts: {
      body: "system-ui, sans-serif",
    },
    radii: {
      actionButton: "8px",
      connectButton: "12px",
      menuButton: "8px",
      modal: "16px",
      modalMobile: "16px",
    },
    shadows: {
      connectButton: "0 4px 14px rgba(0, 0, 0, 0.05)",
      dialog: "0 10px 30px rgba(0, 0, 0, 0.1)",
      profileDetailsAction: "0 2px 10px rgba(0, 0, 0, 0.08)",
      selectedOption: "0 2px 8px rgba(0, 0, 0, 0.06)",
      selectedWallet: "0 5px 15px rgba(0, 0, 0, 0.07)",
      walletLogo: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
  };

  const customDarkTheme = {
    ...darkTheme(),
    colors: {
      ...darkTheme().colors,
      accentColor: "#6366f1",
      accentColorForeground: "white",
      connectButtonBackground: "#1f2937",
      connectButtonText: "#a5b4fc",
      modalBackground: "#111827",
      modalBorder: "#374151",
      profileActionHover: "#1f2937",
    },
    shadows: {
      connectButton: "0 4px 14px rgba(0, 0, 0, 0.4)",
      dialog: "0 10px 30px rgba(0, 0, 0, 0.5)",
      profileDetailsAction: "0 2px 10px rgba(0, 0, 0, 0.2)",
      selectedOption: "0 2px 8px rgba(0, 0, 0, 0.2)",
      selectedWallet: "0 5px 15px rgba(0, 0, 0, 0.3)",
      walletLogo: "0 4px 12px rgba(0, 0, 0, 0.3)",
    },
  };

  // Prevent hydration errors by not rendering web3 components on the server
  if (!mounted) {
    return <>{children}</>;
  }

  // Only render with web3 providers on client-side
  try {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={isDarkMode ? customDarkTheme : customLightTheme}
            modalSize="compact"
            coolMode
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  } catch (error) {
    console.debug("Error rendering Web3Providers:", error);
    return <>{children}</>;
  }
}
