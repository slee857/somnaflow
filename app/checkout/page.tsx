"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Shield, CheckCircle, Star } from "lucide-react";
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
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-[#4ECDC4]" />
            <span className="text-[#4ECDC4] text-sm font-medium">Secure Checkout</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Choose your plan
          </h1>
          <p className="text-[#94A3B8] text-lg">
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
            <div className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-7">
              <h2 className="text-white font-bold text-xl mb-6">Complete Your Subscription</h2>
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
            <div className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#4ECDC4]/15 border border-[#4ECDC4]/25 flex items-center justify-center">
                  <Moon className="w-3.5 h-3.5 text-[#4ECDC4]" />
                </div>
                <h3 className="text-white font-semibold">What&apos;s included</h3>
              </div>
              <ul className="space-y-3">
                {sidebarPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#4ECDC4] shrink-0 mt-0.5" />
                    <span className="text-[#94A3B8] text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social proof */}
            <div className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
                <span className="text-white font-semibold ml-2">4.9</span>
              </div>
              <blockquote className="text-[#94A3B8] text-sm italic leading-relaxed mb-4">
                &ldquo;The physician called me within 90 minutes of signing up. My prescription arrived the next morning. This is the future of sleep medicine.&rdquo;
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ECDC4]/30 to-[#6B8AFF]/30 flex items-center justify-center text-xs font-bold text-white">
                  TR
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Tyler R.</p>
                  <p className="text-[#64748B] text-xs">Verified Patient</p>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "HIPAA", sub: "Compliant" },
                  { label: "FDA", sub: "Pharmacy" },
                  { label: "256-bit", sub: "Encrypted" },
                ].map((b) => (
                  <div key={b.label} className="text-center">
                    <p className="text-white font-bold text-sm">{b.label}</p>
                    <p className="text-[#64748B] text-[10px]">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-[#475569] text-xs px-4">
              Already a member?{" "}
              <Link href="/tracking" className="text-[#4ECDC4] hover:underline">
                Track your order
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
