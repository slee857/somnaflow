"use client";

import { motion } from "framer-motion";
import { CheckCircle, Clock, Truck, FlaskConical, Loader2 } from "lucide-react";

const steps = [
  {
    id: 1,
    status: "completed" as const,
    icon: CheckCircle,
    title: "Prescription Approved",
    detail: "Dr. Sarah Chen, MD",
    timestamp: "Today, 2:31 PM",
    color: "#4ECDC4",
  },
  {
    id: 2,
    status: "completed" as const,
    icon: FlaskConical,
    title: "Sent to Compounding Pharmacy",
    detail: "MedFlow Rx — Dallas, TX",
    timestamp: "Today, 2:34 PM",
    color: "#4ECDC4",
  },
  {
    id: 3,
    status: "active" as const,
    icon: Loader2,
    title: "Pharmacist Quality Review",
    detail: "In progress — Final quality check",
    timestamp: "Est. completion: Today, 4:00 PM",
    color: "#6B8AFF",
  },
  {
    id: 4,
    status: "pending" as const,
    icon: Truck,
    title: "Shipped to Your Door",
    detail: "FedEx Priority Overnight",
    timestamp: "ETA: Tomorrow by 8 PM",
    color: "#475569",
  },
];

export default function RxTracker() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-[#2A3550]">
        <motion.div
          className="w-full bg-gradient-to-b from-[#4ECDC4] to-[#6B8AFF] rounded-full"
          initial={{ height: 0 }}
          animate={{ height: "55%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.status === "active";
          const isCompleted = step.status === "completed";

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex items-start gap-5 relative"
            >
              {/* Icon node */}
              <div
                className={`relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isCompleted
                    ? "bg-[#4ECDC4]/20 border-[#4ECDC4]"
                    : isActive
                    ? "bg-[#6B8AFF]/20 border-[#6B8AFF]"
                    : "bg-[#1A2540] border-[#2A3550]"
                }`}
              >
                {isActive ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </motion.div>
                ) : (
                  <Icon className="w-5 h-5" style={{ color: step.color }} />
                )}

                {/* Pulse for active */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#6B8AFF]"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 pb-6 ${
                  isActive
                    ? "bg-[#6B8AFF]/6 border border-[#6B8AFF]/20 rounded-xl p-4 -mt-1"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-semibold text-sm ${
                          isCompleted ? "text-white" : isActive ? "text-white" : "text-[#475569]"
                        }`}
                      >
                        {step.title}
                      </p>
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full bg-[#6B8AFF]/20 text-[#6B8AFF] text-[10px] font-bold border border-[#6B8AFF]/30">
                          IN PROGRESS
                        </span>
                      )}
                      {isCompleted && (
                        <CheckCircle className="w-4 h-4 text-[#4ECDC4]" />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 ${
                        isCompleted
                          ? "text-[#64748B]"
                          : isActive
                          ? "text-[#94A3B8]"
                          : "text-[#374151]"
                      }`}
                    >
                      {step.detail}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#475569]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{step.timestamp}</span>
                  </div>
                </div>

                {/* Active step progress bar */}
                {isActive && (
                  <div className="mt-3">
                    <div className="h-1.5 bg-[#1A2540] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6B8AFF] to-[#4ECDC4] rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
                      />
                    </div>
                    <p className="text-[#6B8AFF] text-[10px] mt-1 font-medium">65% complete</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
