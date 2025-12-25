import React, { useEffect, useState } from 'react';

const ProgressRing = ({ count, targetCount = 108 }) => {
    console.log(count, targetCount)
    const size = 200; // Overall SVG size
    const strokeWidth = 12;
    const radius = (size / 2) - (strokeWidth / 2);
    const circumference = 2 * Math.PI * radius;

    // Calculate percentage and corresponding stroke offset
    const percentage = Math.min((count / targetCount) * 100, 100);
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative ">
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle (The "Empty" Ring) */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-700"
                />
                {/* Progress Circle (The "Filling" Ring) */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset: offset,
                        transition: 'stroke-dashoffset 0.5s ease-out'
                    }}
                    strokeLinecap="round"
                    className="text-red-600 dark:text-white"
                />
            </svg>

            {/* Central Count Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center ">
                <span className="text-4xl font-bold text-light">{count}</span>
                <span className="text-sm text-secondary-light">/ {targetCount}</span>
            </div>
        </div>
    );
};

export default ProgressRing;
