"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import PlanComparison from "@/components/checkout/PlanComparison";
import Subscription from "@/components/checkout/Subscription";

const planPrices: Record<string, number> = {
  monthly: 79,
  quarterly: 59,
  annual: 49,
};

const sidebarPoints = [
  "5-min AI consultation included",
  "Physician review within 2 hours",
  "Custom prescription created",
  "Delivered to your door in 24hr",
  "Cancel anytime, no contracts",
];

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState("quarterly");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-[#D97706]" />
            <span className="text-amber-700 text-sm font-medium">Secure Checkout</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Choose your plan
          </h1>
          <p className="text-slate-500 text-lg">
            Start sleeping better tonight. No waiting rooms, no insurance hassle.
          </p>
        </motion.div>

        {/* Plan selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <PlanComparison selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
        </motion.div>

        {/* Two-column checkout layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
              <h2 className="text-slate-900 font-bold text-xl mb-6">Complete Your Subscription</h2>
              <Subscription
                selectedPlan={selectedPlan}
                planPrice={planPrices[selectedPlan] ?? 79}
              />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* What's included */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-slate-900 font-semibold mb-4">What&apos;s included</h3>
              <ul className="space-y-3">
                {sidebarPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social proof */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-slate-900 font-semibold ml-2">4.9</span>
              </div>
              <blockquote className="text-slate-500 text-sm italic leading-relaxed mb-4">
                &ldquo;The physician called me within 90 minutes of signing up. My prescription arrived the next morning. This is the future of sleep medicine.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-700">
                  TR
                </div>
                <div>
                  <p className="text-slate-900 text-xs font-semibold">Tyler R.</p>
                  <p className="text-slate-400 text-xs">Verified Patient</p>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "HIPAA", sub: "Compliant" },
                  { label: "FDA", sub: "Pharmacy" },
                  { label: "256-bit", sub: "Encrypted" },
                ].map((b) => (
                  <div key={b.label} className="text-center">
                    <p className="text-slate-900 font-bold text-sm">{b.label}</p>
                    <p className="text-slate-400 text-[10px]">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-slate-400 text-xs px-4">
              Already a member?{" "}
              <Link href="/tracking" className="text-[#D97706] hover:underline">
                Track your order
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
