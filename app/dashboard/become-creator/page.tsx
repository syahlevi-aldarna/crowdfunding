"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useWallet } from "@/hooks/useWallet";
import Button from "@/components/ui/Button";

export default function BecomeCreatorPage() {
  const router = useRouter();
  const { isConnected, address } = useWallet();
  const { userProfile, submitVerification, verificationStatus } =
    useUserProfile();

  const MIN_GAP = 5000; // Minimal gap 5000 USD antara funding dan stake

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    businessName: "",
    fundingNeeded: 100000, // default $100,000 USD
    stakeAmount: 105000, // default funding + $5,000 USD gap
  });

  const [files, setFiles] = useState<Record<string, File | null>>({
    businessDocument: null,
    identityDocument: null,
    selfieWithID: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update stake amount automatically when funding needed changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      stakeAmount: prev.fundingNeeded + MIN_GAP,
    }));
  }, [formData.fundingNeeded]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "fundingNeeded") {
      const fundingValue = Math.max(1000, parseFloat(value) || 0);
      setFormData((prev) => ({
        ...prev,
        fundingNeeded: fundingValue,
        stakeAmount: fundingValue + MIN_GAP, // Automatically update stake
      }));
    } else if (name !== "stakeAmount") {
      // Ignore manual changes to stakeAmount
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFiles((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const validateForm = (): boolean => {
    if (!isConnected) {
      setErrorMessage("Please connect your wallet first");
      return false;
    }

    if (!formData.fullName || !formData.businessName) {
      setErrorMessage("Please fill all required fields");
      return false;
    }

    // Validate stake amount is greater than funding needed + MIN_GAP
    if (formData.stakeAmount < formData.fundingNeeded + MIN_GAP) {
      setErrorMessage(
        `Stake amount must be at least $${MIN_GAP} greater than funding needed`
      );
      return false;
    }

    // Validate file uploads
    if (
      !files.businessDocument ||
      !files.identityDocument ||
      !files.selfieWithID
    ) {
      setErrorMessage("Please upload all required documents");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // Normally here we would upload files to IPFS or similar
      // For this demo, we'll just simulate a successful upload
      console.log("Uploading files...", files);

      // Submit verification data
      const result = await submitVerification({
        name: formData.fullName,
        stake: formData.stakeAmount,
        fundingNeeded: formData.fundingNeeded,
        verificationStatus: "pending",
        isVerified: false,
        // In a real implementation, these would be IPFS hashes or URLs
        // businessDocument: "ipfs://...",
        // identityDocument: "ipfs://...",
        // selfieWithID: "ipfs://..."
      });

      if (result) {
        // Redirect to dashboard with success message
        router.push("/dashboard?verified=pending");
      } else {
        setErrorMessage("Failed to submit verification. Please try again.");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If already verified or verification is pending, show appropriate message
  if (userProfile?.isVerified) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-800/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            You're already verified!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You can now create and manage projects on our platform.
          </p>
          <Button
            intent="primary"
            onClick={() => router.push("/dashboard?tab=create")}
          >
            Create a Project
          </Button>
        </div>
      </div>
    );
  }

  if (verificationStatus === "pending") {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
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
            Verification in Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your verification is being processed. This usually takes 1-2
            business days. You'll be notified once your application has been
            reviewed.
          </p>
          <Button intent="secondary" onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
          Become a Verified Creator
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Complete the verification process to start creating projects and
          raising funds on our platform. Verification helps us maintain a
          trustworthy ecosystem for all users.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your legal name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Business Information
              </h2>
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Business Name (if applicable)
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your business or project name"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Document Verification
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="identityDocument"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Identity Document (Passport/ID) *
                  </label>
                  <input
                    type="file"
                    id="identityDocument"
                    name="identityDocument"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    accept="image/*, application/pdf"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Upload a scan or photo of your government-issued ID or
                    passport.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="selfieWithID"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Selfie with ID *
                  </label>
                  <input
                    type="file"
                    id="selfieWithID"
                    name="selfieWithID"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    accept="image/*"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Upload a photo of yourself holding your ID.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="businessDocument"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Business Document (if applicable)
                </label>
                <input
                  type="file"
                  id="businessDocument"
                  name="businessDocument"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  accept="image/*, application/pdf"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Business registration, license, or other relevant
                  documentation.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Stake ETH
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 dark:text-yellow-200">
                  <strong>Important:</strong> Our platform requires a minimum
                  stake of ${MIN_GAP} over your requested funding. This is like
                  a security deposit that proves your commitment and protects
                  investors. Think of it as similar to how a down payment works
                  when purchasing property.
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                As part of our verification process, your stake will be
                automatically set to ${MIN_GAP} more than your requested
                funding. This helps ensure your commitment and reduces scam
                risks. Your stake will be returned if your projects comply with
                our terms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label
                    htmlFor="fundingNeeded"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Funding Requested (USD) *
                  </label>
                  <input
                    type="number"
                    id="fundingNeeded"
                    name="fundingNeeded"
                    value={formData.fundingNeeded}
                    onChange={handleInputChange}
                    min="1000"
                    step="1000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    How much funding do you need for your project?
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="stakeAmount"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Required Stake Amount (USD) *
                  </label>
                  <input
                    type="number"
                    id="stakeAmount"
                    name="stakeAmount"
                    value={formData.stakeAmount}
                    readOnly
                    disabled
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Automatically set to your funding request + ${MIN_GAP}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                intent="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Verification"}
              </Button>

              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                By submitting, you agree to our verification process and terms
                of service.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
