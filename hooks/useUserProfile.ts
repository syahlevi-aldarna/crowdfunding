"use client";

import { useState, useEffect } from "react";
import { useWallet } from "./useWallet";
import { UserProfile } from "@/types/user";
import { MOCK_USERS } from "@/mocks/data";

export function useUserProfile() {
  const { address, isConnected } = useWallet();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!isConnected || !address) {
        setUserProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if user exists in our mock data
        const user = MOCK_USERS[address] || {
          address,
          isVerified: false,
          createdAt: Date.now(),
        };

        setUserProfile(user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [address, isConnected]);

  const submitVerification = async (
    verificationData: Omit<UserProfile, "address">
  ) => {
    if (!address) return null;

    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the user with pending verification status
      const updatedUser: UserProfile = {
        ...userProfile,
        ...verificationData,
        address,
        verificationStatus: "pending",
        isVerified: false,
      };

      // In a real implementation, this would be saved to a database
      setUserProfile(updatedUser);
      // For demo, we'll add it to our mock data
      MOCK_USERS[address] = updatedUser;

      return updatedUser;
    } catch (error) {
      console.error("Error submitting verification:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    userProfile,
    loading,
    submitVerification,
    isVerified: userProfile?.isVerified || false,
    verificationStatus: userProfile?.verificationStatus || null,
  };
}
