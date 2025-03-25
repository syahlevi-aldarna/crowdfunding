export interface UserProfile {
  address: string;
  isVerified: boolean;
  verificationStatus?: "pending" | "verified" | "rejected";
  name?: string;
  profileImage?: string;
  createdAt?: number;
  stake?: number; // Amount of ETH staked for verification
  fundingNeeded?: number; // Amount of funding needed for the project
  projects?: string[]; // Project IDs created by the user
  investments?: string[]; // Investment IDs made by the user
}

export interface VerificationSubmission {
  address: string;
  fullName: string;
  email: string;
  businessName?: string;
  businessDocument?: string; // URL of uploaded business document
  identityDocument?: string; // URL of identity document
  selfieWithID?: string; // URL of selfie with ID
  stakeAmount: number; // Amount of ETH staked
  fundingNeeded: number; // Amount of funding needed
  submissionDate: number;
}
