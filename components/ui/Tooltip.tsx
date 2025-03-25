"use client";

import React, { useState, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ children, content, position = "top" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-2",
  };

  const arrowClasses = {
    top: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45",
    bottom:
      "top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45",
    left: "right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45",
    right:
      "left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 whitespace-nowrap px-3 py-1.5 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-md shadow-md ${positionClasses[position]}`}
        >
          {content}
          <span
            className={`absolute w-2 h-2 bg-gray-800 dark:bg-gray-700 ${arrowClasses[position]}`}
          ></span>
        </div>
      )}
    </div>
  );
}
