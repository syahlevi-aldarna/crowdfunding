"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { useWallet } from "@/hooks/useWallet";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useInvestmentsQuery } from "@/services/queries/useInvestmentsQuery";
import WalletConnect from "@/components/shared/WalletConnect";
import VerificationBadge from "@/components/shared/VerificationBadge";
import Button from "@/components/ui/Button";

/**
 * Dashboard Page Component
 *
 * Main user dashboard displaying:
 * - Investment portfolio
 * - User's projects
 * - Project creation form
 *
 * Features:
 * - Tabbed navigation for different sections
 * - Responsive layout
 * - Loading and empty states
 * - Interactive forms with validation
 */
export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const verifiedParam = searchParams.get("verified");
  const [activeTab, setActiveTab] = useState(tabParam || "dashboard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { isConnected, address, formattedAddress } = useWallet();
  const {
    userProfile,
    isVerified,
    verificationStatus,
    loading: loadingProfile,
  } = useUserProfile();
  const { data: investments, isLoading: isLoadingInvestments } =
    useInvestmentsQuery(address);

  // Show verification success message if redirected from verification
  const [showVerificationMessage, setShowVerificationMessage] = useState(
    verifiedParam === "pending"
  );

  // Form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    duration: "30",
    category: "mining",
    image: null as File | null,
  });

  // Form validation errors
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    goal: "",
  });

  // Update active tab when URL parameter changes
  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Reset form and success message when tab changes
  useEffect(() => {
    setShowSuccessMessage(false);

    // Only reset form if moving away from create tab
    if (activeTab !== "create") {
      setFormData({
        title: "",
        description: "",
        goal: "",
        duration: "30",
        category: "mining",
        image: null,
      });
      setErrors({
        title: "",
        description: "",
        goal: "",
      });
    }
  }, [activeTab]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  // Validate form before submission
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { title: "", description: "", goal: "" };

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
      isValid = false;
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters";
      isValid = false;
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
      isValid = false;
    } else if (formData.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
      isValid = false;
    }

    // Validate funding goal
    if (!formData.goal) {
      newErrors.goal = "Funding goal is required";
      isValid = false;
    } else {
      const goalAmount = parseFloat(formData.goal);
      if (isNaN(goalAmount) || goalAmount <= 0) {
        newErrors.goal = "Funding goal must be a positive number";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to create project
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessMessage(true);

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        goal: "",
        duration: "30",
        category: "mining",
        image: null,
      });

      // Show success message for 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }, 1500);
  };

  // Content to display if wallet is not connected
  const renderWalletPrompt = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-orange-100 dark:bg-orange-900/30 rounded-full p-6 mb-6">
        <svg
          className="w-16 h-16 text-orange-500 dark:text-orange-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          ></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Connect Your Wallet
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-8">
        You need to connect your wallet to access your dashboard, investments,
        and project management features.
      </p>
      <WalletConnect size="lg" />
    </div>
  );

  // Render appropriate content based on active tab
  const renderTabContent = () => {
    if (!isConnected) {
      return renderWalletPrompt();
    }

    // Show verification success message banner if redirected from verification
    if (showVerificationMessage) {
      return (
        <div className="mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-800/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Verification Application Submitted
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thanks for applying to become a verified creator! Your application
              is being processed, which usually takes 1-2 business days. You'll
              be notified once your application has been reviewed.
            </p>
            <Button
              intent="secondary"
              onClick={() => setShowVerificationMessage(false)}
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    // Show alert if user tries to create project but is not verified
    if (activeTab === "create" && !isVerified) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Create New Project
          </h2>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-800/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Verification Required
            </h3>

            {verificationStatus === "pending" ? (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your creator verification is currently in process. You'll be
                  able to create projects once your application is approved.
                </p>
                <Button
                  intent="secondary"
                  onClick={() => setActiveTab("dashboard")}
                >
                  Return to Dashboard
                </Button>
              </>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  To create projects on our platform, you need to become a
                  verified creator. This helps us maintain a trustworthy
                  ecosystem for all users.
                </p>
                <Button
                  intent="primary"
                  onClick={() => router.push("/dashboard/become-creator")}
                >
                  Apply to Become a Creator
                </Button>
              </>
            )}
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "dashboard":
      default:
        return (
          <>
            {/* User Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-bold text-xl">
                    {formattedAddress?.substring(0, 2) || "?"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {userProfile?.name || "Wallet User"}
                      </h3>
                      <VerificationBadge userProfile={userProfile} showLabel />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                      {formattedAddress || "Not connected"}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Member since{" "}
                      {userProfile
                        ? new Date(
                            userProfile.createdAt || Date.now()
                          ).toLocaleDateString()
                        : "Today"}
                    </p>
                  </div>
                </div>

                {!isVerified && !loadingProfile && (
                  <div>
                    {verificationStatus === "pending" ? (
                      <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-lg">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>Verification in progress</span>
                      </div>
                    ) : (
                      <Button
                        intent="outline"
                        onClick={() => router.push("/dashboard/become-creator")}
                      >
                        Become a Creator
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <DashboardOverview />
          </>
        );

      case "investments":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              My Investments
            </h2>

            {isLoadingInvestments ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"
                  ></div>
                ))}
              </div>
            ) : !investments || investments.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
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
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No Investments Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                  You haven't made any investments yet. Explore projects and
                  start your investment journey.
                </p>
                <button
                  onClick={() => (window.location.href = "/projects")}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Explore Projects
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                        Project
                      </th>
                      <th className="py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                        Amount (ETH)
                      </th>
                      <th className="py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                        Date
                      </th>
                      <th className="py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                        Status
                      </th>
                      <th className="py-3 px-4 text-gray-600 dark:text-gray-400 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {investments.map((investment, index) => (
                      <tr
                        key={`${investment.projectId}-${index}`}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
                      >
                        <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                          Project #{investment.projectId}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {investment.amount}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {new Date(investment.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                            Active
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium text-sm transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "projects":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Contribution
            </h2>

            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                No Projects Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                You haven't created any projects yet. Start your first
                crowdfunding campaign now.
              </p>
              <button
                onClick={() => setActiveTab("create")}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Create New Project
              </button>
            </div>
          </div>
        );

      case "create":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Create New Project
            </h2>

            {showSuccessMessage ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg mb-6"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>
                    Project created successfully! It will be reviewed before
                    being listed.
                  </span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.title
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-200 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                    placeholder="Enter a clear, descriptive title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.description
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-200 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                    placeholder="Describe your project, its goals, and how funds will be used"
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="goal"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Funding Goal (ETH) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.goal
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-200 dark:border-gray-700"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                      placeholder="e.g., 10"
                    />
                    {errors.goal && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">
                        {errors.goal}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Duration (Days)
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange as any}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange as any}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="mining">Mining</option>
                    <option value="energy">Energy</option>
                    <option value="crypto">Cryptocurrency</option>
                    <option value="defi">DeFi</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Project Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full h-32 px-4 transition bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none"
                    >
                      <span className="flex flex-col items-center space-y-2">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          {formData.image
                            ? formData.image.name
                            : "Upload project image (optional)"}
                        </span>
                      </span>
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Recommended: 1200 x 600px, JPEG or PNG
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className="px-6 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating Project...
                      </>
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your investments and projects in one place
        </p>
      </div>

      {renderTabContent()}
    </div>
  );
}
