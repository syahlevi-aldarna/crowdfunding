"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonIntent =
  | "primary"
  | "secondary"
  | "outline"
  | "destructive"
  | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  intent?: ButtonIntent;
  size?: ButtonSize;
  className?: string;
}

const getIntentClasses = (intent: ButtonIntent) => {
  switch (intent) {
    case "primary":
      return "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg";
    case "secondary":
      return "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700";
    case "outline":
      return "bg-transparent border border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30";
    case "destructive":
      return "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800";
    case "ghost":
      return "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-none";
    default:
      return "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg";
  }
};

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-6 py-3 text-lg";
    default:
      return "px-4 py-2 text-base";
  }
};

const Button = ({
  children,
  intent = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const intentClasses = getIntentClasses(intent);
  const sizeClasses = getSizeClasses(size);

  return (
    <button
      className={`rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${intentClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
