"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";
import { pharosService } from "@/services/web3/contracts";
import { useRestaking } from "@/hooks/useRestaking";

/**
 * ProjectDetail Component
 *
 * Displays comprehensive information about a single project and provides
 * interaction functions for investors.
 *
 * Features:
 * - Responsive project information display
 * - Investment interface with validation
 * - Progress tracking visualization
 * - Project metadata and statistics
 * - Loading and error states
 */
export default function ProjectDetail({ id }: { id: string }) {
  // Project data state
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Investment form state
  const [investAmount, setInvestAmount] = useState("");
  const [investError, setInvestError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isInvesting, setIsInvesting] = useState(false);

  // Get user wallet information
  const { isConnected } = useWallet();

  // Get restaking information
  const { stake } = useRestaking();

  // Mock data for specific project details
  const MOCK_PROJECTS = {
    "1": {
      id: "1",
      title: "Coal Mining Project",
      description:
        "This sustainable coal mining operation implements advanced environmental protection systems and employs local communities. The project focuses on responsible extraction methods with minimal environmental impact while providing essential resources for energy production.",
      raised: 18.5,
      goal: 50,
      endDate: "2024-06-30",
      owner: "0x1234...5678",
      tokenPrice: 0.01,
      tokenSymbol: "COAL",
      investors: 42,
      image: "/images/placeholders/batu bara.jpeg",
    },
    "2": {
      id: "2",
      title: "Mineral Extraction Venture",
      description:
        "Modern mineral extraction with innovative techniques and community involvement. This project utilizes cutting-edge technology to extract valuable minerals while ensuring environmental compliance and supporting local economic development.",
      raised: 65,
      goal: 100,
      endDate: "2024-07-15",
      owner: "0x8765...4321",
      tokenPrice: 0.015,
      tokenSymbol: "MINX",
      investors: 78,
      image: "/images/placeholders/tambang.jpg",
    },
    "3": {
      id: "3",
      title: "Cryptocurrency Investment Fund",
      description:
        "Diversified crypto investment portfolio managed by industry experts. Our team of experts analyzes market trends and selects promising projects to include in our diversified portfolio, minimizing risk while maximizing potential returns.",
      raised: 120,
      goal: 200,
      endDate: "2024-08-30",
      owner: "0x5678...1234",
      tokenPrice: 0.02,
      tokenSymbol: "CRYP",
      investors: 156,
      image: "/images/placeholders/BJI-pexels-davidmcbee-1546168.jpg",
    },
  };

  // Load project data on mount
  useEffect(() => {
    const loadProject = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Get project from mock data
        const projectData = MOCK_PROJECTS[id as keyof typeof MOCK_PROJECTS];

        if (!projectData) {
          setError("Project not found");
        } else {
          setProject(projectData);
        }
      } catch (err) {
        setError("Failed to load project data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  /**
   * Validates the investment amount
   */
  const validateInvestment = (): boolean => {
    setInvestError("");

    if (!investAmount) {
      setInvestError("Please enter an investment amount");
      return false;
    }

    const amount = Number(investAmount);

    if (isNaN(amount)) {
      setInvestError("Please enter a valid number");
      return false;
    }

    if (amount <= 0) {
      setInvestError("Amount must be greater than 0");
      return false;
    }

    if (amount < 0.01) {
      setInvestError("Minimum investment is 0.01 ETH");
      return false;
    }

    return true;
  };

  /**
   * Initiates the investment process after validation
   */
  const handleInvest = async () => {
    if (!isConnected) {
      setInvestError("Please connect your wallet first");
      return;
    }

    if (validateInvestment()) {
      try {
        // Stake tokens terlebih dahulu
        const stakeResult = await stake(Number(investAmount));
        if (!stakeResult) return false;

        // Lakukan investasi dengan parallel execution
        const result = await pharosService.invest(id, Number(investAmount));
        if (result) {
          setShowConfirm(true);
        } else {
          setInvestError("Investment failed. Please try again.");
        }
      } catch (error) {
        console.error("Investment error:", error);
        setInvestError("Investment failed. Please try again.");
      }
    }
  };

  /**
   * Process the confirmed investment
   */
  const confirmInvestment = async () => {
    setIsInvesting(true);

    try {
      // Simulate blockchain transaction delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real implementation, this would call a contract method
      alert(`Investment of ${investAmount} ETH processed successfully!`);

      // Reset form
      setInvestAmount("");
    } catch (err) {
      console.error(err);
      alert("Investment failed. Please try again.");
    } finally {
      setShowConfirm(false);
      setIsInvesting(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-900"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg mx-auto border border-gray-100 dark:border-gray-700">
        <div className="bg-red-50 dark:bg-red-900/20 w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400">
          {error || "Project not found"}
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 px-6">
          The project you are looking for does not exist or could not be loaded.
        </p>
        <Link href="/projects" className="btn btn-primary mt-8 px-8">
          Browse Projects
        </Link>
      </div>
    );
  }

  // Calculate project metrics
  const progress = Math.min(
    Math.round((project.raised / project.goal) * 100),
    100
  );
  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(project.endDate).getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
  const tokenAmount = investAmount
    ? Number(investAmount) / project.tokenPrice
    : 0;

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:underline transition-colors"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            <Link
              href="/projects"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:underline transition-colors"
            >
              Projects
            </Link>
          </li>
          <li className="flex items-center">
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              {project.title}
            </span>
          </li>
        </ol>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project details - Left column */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            {project.title}
          </h1>

          <div className="relative w-full h-80 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg group">
            <Image
              src={project.image || "/images/placeholders/default.jpg"}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

            {/* Status badge */}
            <div className="absolute top-6 right-6">
              <div className="px-4 py-2 rounded-full bg-indigo-500 text-white font-medium shadow-lg flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
                Active Project
              </div>
            </div>

            {/* Quick stats overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80 mb-1">Funding Goal</p>
                  <p className="text-2xl font-bold">{project.goal} ETH</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">Time Remaining</p>
                  <p className="text-2xl font-bold">{daysLeft} Days</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">Backers</p>
                  <p className="text-2xl font-bold">{project.investors}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Project stats cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Raised Amount
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {project.raised} ETH
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                of {project.goal} ETH goal
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Total Investors
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {project.investors}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Contributors
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Time Remaining
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {daysLeft}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Days left
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between text-sm mb-3">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Funding Progress
              </span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {progress}% funded
              </span>
            </div>
            <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {progress > 15 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {progress}% Complete
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
              <span>0 ETH</span>
              <span>{project.goal / 2} ETH</span>
              <span>{project.goal} ETH</span>
            </div>
          </div>

          {/* Project details card */}
          <div className="card bg-white dark:bg-gray-800 shadow-xl mb-8 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="card-body p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mr-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  About this project
                </h2>
              </div>

              <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <svg
                      className="w-5 h-5 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Project Creator
                    </span>
                  </div>
                  <span className="bg-white dark:bg-gray-800 rounded-md px-3 py-1.5 text-sm font-mono block mt-1 border border-gray-200 dark:border-gray-700">
                    {project.owner}
                  </span>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <svg
                      className="w-5 h-5 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      ></path>
                    </svg>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Token Information
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full w-8 h-8 flex items-center justify-center mr-2 font-bold">
                        {project.tokenSymbol[0]}
                      </span>
                      <span className="font-medium">{project.tokenSymbol}</span>
                    </div>
                    <span className="bg-white dark:bg-gray-800 rounded-md px-3 py-1 text-sm border border-gray-200 dark:border-gray-700">
                      {project.tokenPrice} ETH
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg
                    className="w-5 h-5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Important Dates
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="bg-white dark:bg-gray-800 rounded-md px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 flex-1">
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      End Date
                    </div>
                    <div className="font-medium">
                      {new Date(project.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-md px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 flex-1">
                    <div className="text-gray-500 dark:text-gray-400 mb-1">
                      Token Distribution
                    </div>
                    <div className="font-medium">After funding completion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment card - Right column */}
        <div className="lg:col-span-1">
          <div className="card bg-white dark:bg-gray-800 shadow-xl sticky top-4 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3"></div>
            <div className="card-body p-6">
              <h2 className="card-title text-xl font-bold border-b pb-4 mb-5 dark:border-gray-700 text-gray-900 dark:text-white">
                Invest in this project
              </h2>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-6 border border-indigo-100 dark:border-indigo-800/30">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <svg
                      className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    <span className="font-medium">
                      Join {project.investors} others
                    </span>{" "}
                    who have already invested in this project!
                  </p>
                </div>
              </div>

              <div className="form-control mb-5">
                <label className="label pb-1">
                  <span className="label-text font-medium text-gray-700 dark:text-gray-300">
                    Investment Amount (ETH)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="number"
                    placeholder="0.0"
                    className={`pl-10 pr-16 py-3 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ${
                      investError
                        ? "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200"
                        : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                    value={investAmount}
                    onChange={(e) => {
                      setInvestAmount(e.target.value);
                      if (investError) setInvestError("");
                    }}
                    min="0.01"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <span className="px-3 text-gray-500 dark:text-gray-400 text-sm font-medium border-l border-gray-300 dark:border-gray-600 h-full flex items-center bg-gray-50 dark:bg-gray-600 rounded-r-lg">
                      ETH
                    </span>
                  </div>
                </div>

                {investError && (
                  <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {investError}
                  </div>
                )}

                <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Minimum: 0.01 ETH</span>
                  {investAmount && !isNaN(Number(investAmount)) && (
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">
                      ≈{" "}
                      {tokenAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{" "}
                      {project.tokenSymbol}
                    </span>
                  )}
                </div>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  !isConnected
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg active:shadow-sm"
                }`}
                onClick={handleInvest}
                disabled={!isConnected}
              >
                {isConnected ? "Invest Now" : "Connect Wallet to Invest"}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2">
                    or
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      ></path>
                    </svg>
                    Share
                  </div>
                </button>
                <Link
                  href="/projects"
                  className="py-2.5 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      ></path>
                    </svg>
                    Browse More
                  </div>
                </Link>
              </div>

              {/* Project trust indicators */}
              <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-3 text-sm">
                  Secure Investment
                </p>
                <div className="space-y-3">
                  <div className="flex items-center bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Verified project with secure smart contract
                    </span>
                  </div>
                  <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-sm text-blue-700 dark:text-blue-300">
                      Blockchain secured investment with full transparency
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden relative animate-fadeIn">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                  Confirm Investment
                </h3>
                <button
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  onClick={() => setShowConfirm(false)}
                  disabled={isInvesting}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <p className="py-3 border-b border-gray-200 dark:border-gray-700 mb-4 text-gray-700 dark:text-gray-300">
                You are about to invest
                <span className="font-bold text-indigo-600 dark:text-indigo-400 mx-1">
                  {investAmount} ETH
                </span>
                in
                <span className="font-bold text-gray-900 dark:text-white mx-1">
                  {project.title}
                </span>
              </p>

              <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    Amount:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {investAmount} ETH
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">
                    You will receive:
                  </span>
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {tokenAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                    {project.tokenSymbol}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    Token price:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {project.tokenPrice} ETH
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setShowConfirm(false)}
                  disabled={isInvesting}
                >
                  Cancel
                </button>
                <button
                  className={`px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all ${
                    isInvesting ? "opacity-90" : ""
                  }`}
                  onClick={confirmInvestment}
                  disabled={isInvesting}
                >
                  {isInvesting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    "Confirm Investment"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
