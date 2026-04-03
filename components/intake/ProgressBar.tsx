"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function ProgressBar({ currentStep, totalSteps, labels }: ProgressBarProps) {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Step dots */}
      <div className="flex items-center justify-between mb-3 relative">
        {/* Track line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-200">
          <motion.div
            className="h-full bg-[#D97706] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#D97706] border-[#D97706] text-white"
                    : isActive
                    ? "bg-white border-[#D97706] text-[#D97706]"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : stepNum}
              </div>
              {labels && (
                <span
                  className={`absolute -bottom-5 text-xs whitespace-nowrap ${
                    isActive ? "text-[#D97706]" : isCompleted ? "text-amber-500/70" : "text-gray-400"
                  }`}
                  style={{ transform: "translateX(-50%)", left: "50%" }}
                >
                  {labels[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress percentage */}
      <div className="flex items-center justify-between mt-8">
        <span className="text-xs text-gray-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs text-[#D97706] font-medium">
          {Math.round(percentage)}% complete
        </span>
      </div>
    </div>
  );
}
