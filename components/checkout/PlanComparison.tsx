"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    price: 79,
    period: "month",
    description: "Full access, cancel anytime",
    features: [
      "Physician consultation",
      "Custom prescription",
      "Free 2-day delivery",
      "Ongoing physician access",
      "Sleep progress tracking",
    ],
    popular: false,
  },
  {
    id: "quarterly",
    name: "3-Month Plan",
    price: 59,
    period: "month",
    originalPrice: 79,
    description: "Billed as $177 every 3 months",
    features: [
      "Everything in Monthly",
      "Priority physician access",
      "Free overnight shipping",
      "Monthly check-in calls",
      "25% savings vs monthly",
    ],
    popular: true,
  },
  {
    id: "annual",
    name: "Annual Plan",
    price: 49,
    period: "month",
    originalPrice: 79,
    description: "Billed as $588/year",
    features: [
      "Everything in 3-Month",
      "VIP physician access",
      "Free same-day shipping",
      "Quarterly lab panel included",
      "38% savings vs monthly",
    ],
    popular: false,
  },
];

interface PlanComparisonProps {
  selectedPlan: string;
  onSelect: (planId: string) => void;
}

export default function PlanComparison({ selectedPlan, onSelect }: PlanComparisonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {plans.map((plan, index) => (
        <motion.button
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(plan.id)}
          className={`relative text-left p-5 rounded-2xl border transition-all duration-200 ${
            selectedPlan === plan.id
              ? "border-2 border-[#D97706] bg-amber-50/20 shadow-md"
              : "border border-slate-200 bg-white hover:border-slate-300 shadow-sm"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold bg-[#D97706] text-white">
              Most Popular
            </div>
          )}

          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-slate-900 font-bold">{plan.name}</p>
              <p className="text-slate-400 text-xs mt-0.5">{plan.description}</p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                selectedPlan === plan.id
                  ? "bg-[#D97706] border-amber-200"
                  : "border-slate-300"
              }`}
            >
              {selectedPlan === plan.id && <Check className="w-3 h-3 text-white" />}
            </div>
          </div>

          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-black text-slate-900">${plan.price}</span>
            <span className="text-slate-400 text-sm">/{plan.period}</span>
            {"originalPrice" in plan && plan.originalPrice && (
              <span className="text-slate-300 text-sm line-through ml-1">${plan.originalPrice}</span>
            )}
          </div>

          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-xs text-slate-500">
                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D97706]" />
                {feature}
              </li>
            ))}
          </ul>
        </motion.button>
      ))}
    </div>
  );
}
