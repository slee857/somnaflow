"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  ChevronRight,
  MapPin,
  Package,
} from "lucide-react";
import Link from "next/link";

interface SubscriptionProps {
  selectedPlan: string;
  planPrice: number;
}

export default function Subscription({ selectedPlan, planPrice }: SubscriptionProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    card: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Save address to sessionStorage so tracking page can read it
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "somnaflow_address",
        JSON.stringify({
          name: form.name,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          state: form.state,
          zip: form.zip,
        })
      );
    }
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2200);
  };

  const formatCard = (val: string) =>
    val.replace(/\D/g, "").substring(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val: string) =>
    val.replace(/\D/g, "").substring(0, 4).replace(/^(\d{2})(\d)/, "$1/$2");

  if (success) {
    const addr = form.address1
      ? `${form.address1}${form.address2 ? ` ${form.address2}` : ""}, ${form.city}, ${form.state} ${form.zip}`
      : "your address";

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-10 flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-[#D97706]" />
        </motion.div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            You&apos;re in! Welcome to SomnaFlow
          </h3>
          <p className="text-slate-500 max-w-xs mx-auto text-sm">
            Your prescription has been sent to the compounding pharmacy.
          </p>
        </div>

        {/* Delivery address confirmation */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 w-full max-w-sm text-left">
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-4 h-4 text-[#D97706]" />
            <p className="text-[#D97706] font-semibold text-sm">Delivering to</p>
          </div>
          <p className="text-slate-900 font-medium text-sm">{form.name}</p>
          <p className="text-slate-600 text-sm mt-0.5">{form.address1}{form.address2 ? `, ${form.address2}` : ""}</p>
          <p className="text-slate-600 text-sm">{form.city}, {form.state} {form.zip}</p>
          <div className="mt-3 pt-3 border-t border-amber-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-amber-700 text-xs font-medium">
              Estimated arrival: Tomorrow by 8 PM
            </p>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 w-full max-w-sm text-left space-y-3 shadow-sm">
          <p className="text-slate-900 font-semibold text-sm">What happens next:</p>
          {[
            "Prescription sent to MedFlow Rx pharmacy",
            "Pharmacist quality review (1–2 hrs)",
            `Shipped via FedEx Priority to ${addr}`,
            "You receive a tracking number by email",
          ].map((stepText, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs text-[#D97706] font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span className="text-slate-600 text-sm leading-relaxed">{stepText}</span>
            </div>
          ))}
        </div>

        <Link href="/tracking">
          <button className="flex items-center gap-2 bg-[#D97706] hover:bg-[#D97706] text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
            Track My Order
            <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </motion.div>
    );
  }

  const inputClass =
    "w-full bg-white border border-slate-200 focus:border-amber-200 focus:ring-2 focus:ring-amber-50 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Order summary */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-slate-900 font-semibold mb-3">Order Summary</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>
              SomnaFlow {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
            </span>
            <span className="text-slate-900 font-medium">${planPrice}/mo</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Physician consultation</span>
            <span className="text-[#D97706] font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Priority overnight shipping</span>
            <span className="text-[#D97706] font-medium">FREE</span>
          </div>
          <div className="border-t border-slate-200 pt-2 flex justify-between">
            <span className="text-slate-900 font-semibold">Total today</span>
            <span className="text-slate-900 font-bold">${planPrice}</span>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div>
        <h4 className="text-slate-900 font-semibold mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-500 text-xs font-medium block mb-1.5">Full Name</label>
            <input
              required
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Alex Johnson"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-slate-500 text-xs font-medium block mb-1.5">Email Address</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="alex@email.com"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Shipping address */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#D97706]" />
          <h4 className="text-slate-900 font-semibold">Shipping Address</h4>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-slate-500 text-xs font-medium block mb-1.5">
              Street Address
            </label>
            <input
              required
              type="text"
              value={form.address1}
              onChange={(e) => setForm({ ...form, address1: e.target.value })}
              placeholder="123 Main Street"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-slate-500 text-xs font-medium block mb-1.5">
              Apt / Suite / Unit{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.address2}
              onChange={(e) => setForm({ ...form, address2: e.target.value })}
              placeholder="Apt 4B"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-3">
              <label className="text-slate-500 text-xs font-medium block mb-1.5">City</label>
              <input
                required
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="New York"
                className={inputClass}
              />
            </div>
            <div className="col-span-1">
              <label className="text-slate-500 text-xs font-medium block mb-1.5">State</label>
              <input
                required
                type="text"
                value={form.state}
                onChange={(e) =>
                  setForm({ ...form, state: e.target.value.toUpperCase().substring(0, 2) })
                }
                placeholder="NY"
                className={inputClass}
              />
            </div>
            <div className="col-span-2">
              <label className="text-slate-500 text-xs font-medium block mb-1.5">ZIP</label>
              <input
                required
                type="text"
                value={form.zip}
                onChange={(e) =>
                  setForm({ ...form, zip: e.target.value.replace(/\D/g, "").substring(0, 5) })
                }
                placeholder="10001"
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>
        </div>
        <p className="text-slate-400 text-xs mt-2 flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5" />
          Delivered via FedEx Priority Overnight in discreet, unmarked packaging
        </p>
      </div>

      {/* Payment */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h4 className="text-slate-900 font-semibold">Payment Information</h4>
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit SSL</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-slate-500 text-xs font-medium block mb-1.5">Card Number</label>
            <div className="relative">
              <input
                required
                type="text"
                value={form.card}
                onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
                placeholder="1234 5678 9012 3456"
                className={`${inputClass} pr-12 font-mono tracking-wider`}
              />
              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-slate-500 text-xs font-medium block mb-1.5">Expiry</label>
              <input
                required
                type="text"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                className={`${inputClass} font-mono`}
              />
            </div>
            <div>
              <label className="text-slate-500 text-xs font-medium block mb-1.5">CVV</label>
              <input
                required
                type="text"
                value={form.cvv}
                onChange={(e) =>
                  setForm({ ...form, cvv: e.target.value.replace(/\D/g, "").substring(0, 4) })
                }
                placeholder="123"
                className={`${inputClass} font-mono`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trust row */}
      <div className="flex items-center justify-center gap-5 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#D97706]" />
          HIPAA Secure
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#D97706]" />
          256-bit SSL
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-[#D97706]" />
          Cancel anytime
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D97706] hover:bg-[#D97706] disabled:opacity-70 text-white font-semibold py-4 rounded-xl text-lg shadow-sm transition-colors flex items-center justify-center gap-3"
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
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing securely…
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
              Complete Order — ${planPrice}/mo
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <p className="text-center text-slate-400 text-xs">
        By subscribing you agree to our Terms of Service and Privacy Policy. Cancel anytime.
      </p>
    </form>
  );
}
