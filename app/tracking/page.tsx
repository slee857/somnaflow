"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, MapPin, Phone, RefreshCw, Moon, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import RxTracker from "@/components/tracking/RxTracker";

interface StoredAddress {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

export default function TrackingPage() {
  const [address, setAddress] = useState<StoredAddress | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("somnaflow_address");
      if (raw) setAddress(JSON.parse(raw));
    } catch {
      // sessionStorage not available
    }
  }, []);

  const displayName = address?.name || "Alex Johnson";
  const displayLine1 = address?.address1
    ? `${address.address1}${address.address2 ? `, ${address.address2}` : ""}`
    : "123 Main Street, Apt 4B";
  const displayLine2 = address?.city
    ? `${address.city}, ${address.state} ${address.zip}`
    : "New York, NY 10001";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Track Your Rx</h1>
              <p className="text-slate-400 text-sm">Order #SF-2026-04891</p>
            </div>
          </div>
        </motion.div>

        {/* Prescription card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-1">Prescription</p>
              <p className="text-slate-900 font-bold text-lg">Formula D1 — Day-Fresh</p>
              <p className="text-slate-500 text-sm mt-0.5">Daridorexant 25mg · 30-day supply</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-blue-700 text-xs font-semibold">In Transit</span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-slate-100">
            <div>
              <p className="text-slate-400 text-xs mb-1">Physician</p>
              <p className="text-slate-900 text-sm font-medium">Dr. Sarah Chen, MD</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">Pharmacy</p>
              <p className="text-slate-900 text-sm font-medium">MedFlow Rx</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-1">Est. Arrival</p>
              <p className="text-[#D97706] text-sm font-semibold">Tomorrow by 8 PM</p>
            </div>
          </div>
        </motion.div>

        {/* Fulfillment timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-slate-900 font-semibold">Fulfillment Timeline</h2>
            <button className="flex items-center gap-1.5 text-slate-400 hover:text-[#D97706] text-xs transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>
          <RxTracker />
        </motion.div>

        {/* Delivery address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm"
        >
          <h3 className="text-slate-900 font-semibold mb-4">Delivery Details</h3>
          <div className="space-y-5">
            {/* Shipping to — shows real address if entered */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-[#D97706]" />
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-1">
                  Shipping To
                </p>
                <p className="text-slate-900 text-sm font-medium">{displayName}</p>
                <p className="text-slate-500 text-sm">{displayLine1}</p>
                <p className="text-slate-500 text-sm">{displayLine2}</p>
                {address && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D97706]" />
                    <span className="text-[#D97706] text-xs font-medium">Address confirmed</span>
                  </div>
                )}
              </div>
            </div>

            {/* Carrier */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                <Package className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide font-semibold mb-1">
                  Carrier
                </p>
                <p className="text-slate-900 text-sm font-medium">FedEx Priority Overnight</p>
                <p className="text-[#D97706] text-sm font-mono tracking-wide">794644790911</p>
              </div>
            </div>

            {/* Packaging note */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-500">
              📦 Shipped in discreet, unmarked packaging — no SomnaFlow branding on the outside.
            </div>
          </div>
        </motion.div>

        {/* Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#D97706]" />
            </div>
            <div>
              <p className="text-slate-900 text-sm font-medium">Need help with your order?</p>
              <p className="text-slate-400 text-xs">Contact us 24/7 — response in under 5 minutes</p>
            </div>
            <button className="ml-auto text-[#D97706] text-sm font-medium hover:underline shrink-0">
              Chat
            </button>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard" className="flex-1">
              <button className="w-full py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-xl text-sm font-medium transition-colors shadow-sm">
                View Physician Notes
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 bg-amber-50 border border-amber-200 hover:bg-[#D97706] text-amber-700 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Moon className="w-4 h-4" />
                My Dashboard
              </button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
