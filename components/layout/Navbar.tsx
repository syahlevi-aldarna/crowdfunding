"use client";

// components/layout/Navbar.tsx
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FaHome, FaSearch } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import WalletConnect from "@/components/shared/WalletConnect";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";

/**
 * Navbar Component
 *
 * Main navigation for the application with:
 * - Brand and logo
 * - Primary navigation links
 * - Theme toggle
 * - Wallet connection
 * - Responsive mobile menu
 */
const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { connect, disconnect, isConnected, address, formattedAddress } =
    useWallet();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWalletConnection = (
    connected: boolean,
    walletAddress: string = ""
  ) => {
    setIsWalletConnected(connected);
  };

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-gray-800 shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text drop-shadow-sm">
              Pharos
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`nav-link font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
              pathname === "/"
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className={`nav-link font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
              pathname === "/explore"
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : ""
            }`}
          >
            Explore
          </Link>
          <Link
            href="/dashboard"
            className={`nav-link font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
              pathname === "/dashboard"
                ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                : ""
            }`}
          >
            Dashboard
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <BsSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <BsMoon className="w-5 h-5 text-indigo-600" />
            )}
          </button>

          <div className="hidden sm:block">
            <WalletConnect onConnectionChange={handleWalletConnection} />
          </div>

          <div className="block md:hidden">
            <Button
              intent="primary"
              size="sm"
              className="flex items-center space-x-1"
            >
              <FaSearch className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
