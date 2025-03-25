"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";
import {
  BsGrid1X2Fill,
  BsWallet2,
  BsFileEarmarkText,
  BsPlusCircle,
} from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";

interface SidebarLinkProps {
  href: string;
  active: boolean;
  icon: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({
  href,
  active,
  icon,
  children,
  onClick,
}: SidebarLinkProps) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active
        ? "bg-gradient-to-r from-indigo-500/10 to-indigo-500/5 text-indigo-600 dark:text-indigo-300 font-medium"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`}
    onClick={onClick}
  >
    <span
      className={`${
        active
          ? "text-indigo-600 dark:text-indigo-300"
          : "text-gray-500 dark:text-gray-400"
      }`}
    >
      {icon}
    </span>
    {children}
  </Link>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter();
  const {
    isConnected,
    address,
    formattedAddress,
    balance,
    formattedBalance,
    symbol,
  } = useWallet();

  // Determine active tab either from URL or pathname
  const activeTab = tabParam || "dashboard";

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle sidebar on mobile
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Close sidebar when changing routes on mobile
  const closeSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  // Navigate to tab
  const navigateToTab = (tab: string) => {
    router.push(`/dashboard?tab=${tab}`);
    closeSidebar();
  };

  if (!mounted) return null;

  return (
    <div className="dashboard-layout min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/90">
      {/* Mobile Header - visible on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="rounded-lg p-2 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {sidebarOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <div className="w-10" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="flex">
        <AnimatePresence>
          {(sidebarOpen ||
            (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 fixed inset-y-0 left-0 z-50 lg:static lg:z-auto overflow-y-auto pt-6 pb-10 flex flex-col ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              {/* Sidebar Header */}
              <div className="px-6 mb-8">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    CF
                  </div>
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300">
                    CrowdFunding
                  </h3>
                </div>

                {/* User Section - Show wallet or connect prompt */}
                <div className="mb-6">
                  {isConnected ? (
                    <div className="p-6">
                      <div className="rounded-xl p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 dark:from-indigo-600/30 dark:to-purple-600/30">
                        <h2 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                          Wallet Connected
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {formattedAddress}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Balance: {formattedBalance} {symbol}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-orange-100/50 dark:bg-orange-900/40">
                      <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
                        Wallet Not Connected
                      </h3>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                        Connect your wallet to access all features
                      </p>
                      <button
                        onClick={() => {
                          /* Implement connect wallet */
                        }}
                        className="w-full py-2 px-3 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="px-4 space-y-1 mb-8">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider px-4 mb-2">
                  Main
                </h4>
                <SidebarLink
                  href="/dashboard"
                  active={activeTab === "dashboard"}
                  icon={<BsGrid1X2Fill size={18} />}
                  onClick={() => navigateToTab("dashboard")}
                >
                  Overview
                </SidebarLink>
                <SidebarLink
                  href="/dashboard?tab=investments"
                  active={activeTab === "investments"}
                  icon={<BsWallet2 size={18} />}
                  onClick={() => navigateToTab("investments")}
                >
                  My Investments
                </SidebarLink>
                <SidebarLink
                  href="/dashboard?tab=projects"
                  active={activeTab === "projects"}
                  icon={<BsFileEarmarkText size={18} />}
                  onClick={() => navigateToTab("projects")}
                >
                  Contribution
                </SidebarLink>
                <SidebarLink
                  href="/dashboard?tab=create"
                  active={activeTab === "create"}
                  icon={<BsPlusCircle size={18} />}
                  onClick={() => navigateToTab("create")}
                >
                  Create Project
                </SidebarLink>
              </div>

              {/* Sidebar Footer */}
              <div className="mt-auto px-6">
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-600/20 dark:to-purple-600/20 dark:bg-gray-700">
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                    Need Help?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-200 mb-3">
                    Check our documentation for guides and troubleshooting.
                  </p>
                  <Link
                    href="/support"
                    className="text-indigo-600 dark:text-indigo-300 text-sm font-medium hover:underline"
                  >
                    View Documentation →
                  </Link>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden lg:ml-72">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
