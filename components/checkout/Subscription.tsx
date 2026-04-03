"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface SubscriptionProps {
  selectedPlan: string;
  planPrice: number;
}

export default function Subscription({ selectedPlan, planPrice }: SubscriptionProps) {
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: "",
    zip: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2200);
  };

  const formatCard = (val: string) => {
    return val
      .replace(/\D/g, "")
      .substring(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (val: string) => {
    return val
      .replace(/\D/g, "")
      .substring(0, 4)
      .replace(/^(\d{2})(\d)/, "$1/$2");
  };

  if (step === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 flex flex-col items-center gap-5"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/40 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-[#4ECDC4]" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">You&apos;re in! Welcome to SomnaFlow</h3>
          <p className="text-[#94A3B8] max-w-xs mx-auto">
            Your consultation has been scheduled. Check your email for next steps and physician assignment.
          </p>
        </div>
        <div className="bg-[#1A2540] border border-[#2A3550] rounded-xl p-5 w-full max-w-sm text-left space-y-3">
          <p className="text-white font-semibold text-sm">What happens next:</p>
          {[
            "Check your email for consultation link",
            "Physician reviews your intake (< 2hr)",
            "Rx sent to pharmacy same day",
            "Delivery within 24 hours",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/30 flex items-center justify-center text-xs text-[#4ECDC4] font-bold">
                {i + 1}
              </div>
              <span className="text-[#94A3B8] text-sm">{step}</span>
            </div>
          ))}
        </div>
        <a href="/tracking">
          <button className="flex items-center gap-2 bg-[#4ECDC4] text-[#0B1120] font-bold px-6 py-3 rounded-full hover:bg-[#3DBDB4] transition-colors">
            Track My Order
            <ChevronRight className="w-4 h-4" />
          </button>
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order summary */}
      <div className="bg-[#0B1120]/50 border border-[#2A3550] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold">Order Summary</span>
          <Sparkles className="w-4 h-4 text-[#4ECDC4]" />
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-[#94A3B8]">
            <span>SomnaFlow {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan</span>
            <span className="text-white font-medium">${planPrice}/mo</span>
          </div>
          <div className="flex justify-between text-[#94A3B8]">
            <span>Physician consultation</span>
            <span className="text-[#4ECDC4] font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-[#94A3B8]">
            <span>2-day shipping</span>
            <span className="text-[#4ECDC4] font-medium">FREE</span>
          </div>
          <div className="border-t border-[#2A3550] pt-2 flex justify-between">
            <span className="text-white font-semibold">Total today</span>
            <span className="text-white font-bold">${planPrice}</span>
          </div>
        </div>
      </div>

      {/* Personal details */}
      <div>
        <h4 className="text-white font-semibold mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[#64748B] text-xs font-medium block mb-1.5">Full Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Alex Johnson"
              className="w-full bg-[#1A2540] border border-[#2A3550] focus:border-[#4ECDC4]/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#475569] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="text-[#64748B] text-xs font-medium block mb-1.5">Email Address</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="alex@email.com"
              className="w-full bg-[#1A2540] border border-[#2A3550] focus:border-[#4ECDC4]/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#475569] outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-white font-semibold">Payment Information</h4>
          <div className="flex items-center gap-1 text-[#64748B] text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit SSL</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[#64748B] text-xs font-medium block mb-1.5">Card Number</label>
            <div className="relative">
              <input
                required
                type="text"
                value={form.card}
                onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                className="w-full bg-[#1A2540] border border-[#2A3550] focus:border-[#4ECDC4]/50 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-[#475569] outline-none transition-colors font-mono tracking-wider"
              />
              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#475569]" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label className="text-[#64748B] text-xs font-medium block mb-1.5">Expiry</label>
              <input
                required
                type="text"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                className="w-full bg-[#1A2540] border border-[#2A3550] focus:border-[#4ECDC4]/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#475569] outline-none transition-colors font-mono"
              />
            </div>
            <div className="col-span-1">
              <label className="text-[#64748B] text-xs font-medium block mb-1.5">CVV</label>
              <input
                required
                type="text"
                value={form.cvv}
                onChange={(e) => setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").substring(0, 4) })}
                placeholder="123"
                className="w-full bg-[#1A2540] border border-[#2A3550] focus:border-[#4ECDC4]/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#475569] outline-none transition-colors font-mono"
              />
            </div>
            <div className="col-span-1">
              <label className="text-[#64748B] text-xs font-medium block mb-1.5">ZIP</label>
              <input
                required
                type="text"
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, "").substring(0, 5) })}
                placeholder="10001"
                className="w-full bg-[#1A2540] border border-[#2A3550] focus:border-[#4ECDC4]/50 rounded-xl px-4 py-3 text-white text-sm placeholder-[#475569] outline-none transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust */}
      <div className="flex items-center justify-center gap-4 text-xs text-[#475569]">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#4ECDC4]" />
          <span>HIPAA Secure</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#4ECDC4]" />
          <span>256-bit SSL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-[#4ECDC4]" />
          <span>Cancel anytime</span>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        className="w-full bg-[#4ECDC4] hover:bg-[#3DBDB4] disabled:opacity-70 text-[#0B1120] font-bold py-4 rounded-2xl text-lg shadow-xl shadow-[#4ECDC4]/25 transition-all flex items-center justify-center gap-3"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-5 h-5 border-2 border-[#0B1120]/30 border-t-[#0B1120] rounded-full animate-spin" />
              Processing securely...
            </motion.div>
          ) : (
            <motion.div
              key="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Start SomnaFlow — ${planPrice}/mo
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-center text-[#475569] text-xs">
        By subscribing you agree to our Terms of Service and Privacy Policy. Cancel anytime.
      </p>
    </form>
  );
}
