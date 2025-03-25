"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BsArrowRightShort,
  BsWallet2,
  BsFileEarmarkText,
  BsGraphUp,
} from "react-icons/bs";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";
import {
  RiExchangeFundsFill,
  RiProjector2Fill,
  RiUserStarFill,
  RiBarChartGroupedFill,
} from "react-icons/ri";

// Mock data - will be replaced with real data later
const MOCK_STATS = [
  {
    id: "invested",
    label: "Total Invested",
    value: "7.5 ETH",
    change: "+2.5 ETH",
    isUp: true,
    icon: <BsWallet2 size={20} />,
    iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: "projects",
    label: "Active Projects",
    value: "3",
    change: "+1",
    isUp: true,
    icon: <BsFileEarmarkText size={20} />,
    iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
  {
    id: "returns",
    label: "Estimated Returns",
    value: "0.5 ETH",
    change: "+0.1 ETH",
    isUp: true,
    icon: <BsGraphUp size={20} />,
    iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
];

const MOCK_RECENT_INVESTMENTS = [
  {
    id: "1",
    title: "Coal Mining Project",
    date: new Date(Date.now() - 3 * 86400000).toLocaleDateString(),
    amount: "5 ETH",
    status: "Active",
    image: "/images/placeholders/batu bara.jpeg",
  },
  {
    id: "2",
    title: "Mineral Extraction",
    date: new Date(Date.now() - 5 * 86400000).toLocaleDateString(),
    amount: "2.5 ETH",
    status: "Active",
    image: "/images/placeholders/tambang.jpg",
  },
];

const MOCK_RECENT_PROJECTS = [
  {
    id: "3",
    title: "Gold Mining Venture",
    date: new Date(Date.now() - 7 * 86400000).toLocaleDateString(),
    raised: "75 ETH",
    goal: "100 ETH",
    progress: 75,
    image: "/images/placeholders/default.jpg",
  },
];

// Dashboard Stats Card Component
const StatCard = ({ icon, title, value, trend, loading }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      {loading ? (
        <>
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <div className="w-24 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="w-16 h-7 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </>
      ) : (
        <>
          <div className="text-indigo-500 dark:text-indigo-400 mb-4">
            {icon}
          </div>
          <h3 className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {value}
            </p>
            {trend && (
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center ${
                  trend.direction === "up"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                }`}
              >
                {trend.direction === "up" ? (
                  <IoTrendingUp className="mr-1" />
                ) : (
                  <IoTrendingDown className="mr-1" />
                )}
                {trend.value}
              </span>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 w-1/3 bg-gray-200 dark:bg-gray-800 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl"
            ></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
      >
        Dashboard Overview
      </motion.h1>
      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-gray-600 dark:text-gray-300 mb-8"
      >
        Welcome to your crowdfunding dashboard. Here's a summary of your
        activity.
      </motion.p>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {MOCK_STATS.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.label}
            value={stat.value}
            trend={
              stat.change
                ? { direction: stat.isUp ? "up" : "down", value: stat.change }
                : null
            }
            loading={isLoading}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investments */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card-elegant rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Investments
            </h2>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {MOCK_RECENT_INVESTMENTS.length > 0 ? (
              MOCK_RECENT_INVESTMENTS.map((investment) => (
                <div
                  key={investment.id}
                  className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden mr-4">
                      <Image
                        src={investment.image}
                        alt={investment.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {investment.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                        <span>{investment.date}</span>
                        <span className="mx-2">•</span>
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                          {investment.amount}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300`}
                      >
                        {investment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-300 mb-4">
                  You haven't made any investments yet
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-300 font-medium"
                >
                  Explore Projects <BsArrowRightShort size={20} />
                </Link>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/dashboard?tab=investments"
              className="flex justify-center items-center text-indigo-600 dark:text-indigo-300 font-medium"
            >
              View All Investments <BsArrowRightShort size={20} />
            </Link>
          </div>
        </motion.div>

        {/* My Projects */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-elegant rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Contribution
            </h2>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {MOCK_RECENT_PROJECTS.length > 0 ? (
              MOCK_RECENT_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="p-5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center mb-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden mr-4">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {project.title}
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        Created on {project.date}
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-indigo-600 dark:text-indigo-300">
                        {project.progress}% Funded
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {project.raised} / {project.goal}
                      </span>
                    </div>
                    <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full left-0 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href={`/project/${project.id}`}
                      className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-200 font-medium"
                    >
                      Project Details <BsArrowRightShort size={20} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-300 mb-4">
                  You haven't created any projects yet
                </p>
                <Link
                  href="/dashboard?tab=create"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-300 font-medium"
                >
                  Create a Project <BsArrowRightShort size={20} />
                </Link>
              </div>
            )}
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-700">
            <Link
              href="/dashboard?tab=projects"
              className="flex justify-center items-center text-indigo-600 dark:text-indigo-300 font-medium"
            >
              View All Projects <BsArrowRightShort size={20} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Market Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Market Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
            <div className="text-indigo-600 dark:text-indigo-300 mb-2">
              <RiExchangeFundsFill size={24} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Total Platform Volume
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              $12.4M
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
              <IoTrendingUp className="mr-1" /> +12.5% from last month
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
            <div className="text-green-600 dark:text-green-300 mb-2">
              <RiProjector2Fill size={24} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Active Projects
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              87
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
              <IoTrendingUp className="mr-1" /> +7.3% from last month
            </div>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
            <div className="text-purple-600 dark:text-purple-300 mb-2">
              <RiUserStarFill size={24} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Total Investors
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              3,254
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center">
              <IoTrendingUp className="mr-1" /> +18.2% from last month
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <div className="text-blue-600 dark:text-blue-300 mb-2">
              <RiBarChartGroupedFill size={24} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              Avg. ROI
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              14.2%
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 mt-1 flex items-center">
              <IoTrendingDown className="mr-1" /> -2.1% from last month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
