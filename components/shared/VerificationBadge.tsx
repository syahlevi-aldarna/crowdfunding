"use client";

import { UserProfile } from "@/types/user";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdPending } from "react-icons/md";
import { Tooltip } from "@/components/ui/Tooltip";

interface VerificationBadgeProps {
  userProfile?: UserProfile | null;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function VerificationBadge({
  userProfile,
  size = "md",
  showLabel = false,
}: VerificationBadgeProps) {
  if (!userProfile) return null;
  
  if (!userProfile.isVerified && userProfile.verificationStatus !== 'pending') {
    return null;
  }
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  
  if (userProfile.isVerified) {
    return (
      <Tooltip content="Verified Creator">
        <div className="flex items-center gap-1">
          <IoMdCheckmarkCircle className={`${sizeClasses[size]} text-green-500`} />
          {showLabel && (
            <span className={`${labelSizeClasses[size]} font-medium text-green-600 dark:text-green-400`}>
              Verified
            </span>
          )}
        </div>
      </Tooltip>
    );
  }
  
  if (userProfile.verificationStatus === 'pending') {
    return (
      <Tooltip content="Verification Pending">
        <div className="flex items-center gap-1">
          <MdPending className={`${sizeClasses[size]} text-yellow-500`} />
          {showLabel && (
            <span className={`${labelSizeClasses[size]} font-medium text-yellow-600 dark:text-yellow-400`}>
              Pending
            </span>
          )}
        </div>
      </Tooltip>
    );
  }
  
  return null;
} 