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
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#2A3550]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4ECDC4] to-[#6B8AFF] rounded-full"
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
              <motion.div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#4ECDC4] border-[#4ECDC4] text-[#0B1120]"
                    : isActive
                    ? "bg-[#1A2540] border-[#4ECDC4] text-[#4ECDC4]"
                    : "bg-[#1A2540] border-[#2A3550] text-[#475569]"
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
              >
                {isCompleted ? "✓" : stepNum}
              </motion.div>
              {labels && (
                <span
                  className={`absolute -bottom-5 text-xs whitespace-nowrap ${
                    isActive ? "text-[#4ECDC4]" : isCompleted ? "text-[#4ECDC4]/70" : "text-[#475569]"
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
        <span className="text-xs text-[#64748B]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs text-[#4ECDC4] font-medium">
          {Math.round(percentage)}% complete
        </span>
      </div>
    </div>
  );
}
