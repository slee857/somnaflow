"use client";

import { motion } from "framer-motion";
import { Package, MapPin, Phone, RefreshCw, Moon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import RxTracker from "@/components/tracking/RxTracker";

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#64748B] hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#4ECDC4]/15 border border-[#4ECDC4]/25 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#4ECDC4]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Track Your Rx</h1>
              <p className="text-[#64748B] text-sm">Order #SF-2026-04891</p>
            </div>
          </div>
        </motion.div>

        {/* Order summary card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6 mb-6"
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-[#64748B] text-xs uppercase tracking-wide font-semibold mb-2">Prescription</p>
              <p className="text-white font-bold text-lg">Formula D1 — Day-Fresh</p>
              <p className="text-[#94A3B8] text-sm mt-0.5">Daridorexant 25mg · 30-day supply</p>
            </div>
            <div className="flex items-center gap-2 bg-[#6B8AFF]/10 border border-[#6B8AFF]/30 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6B8AFF] animate-pulse" />
              <span className="text-[#6B8AFF] text-xs font-semibold">In Transit</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 pt-5 border-t border-[#2A3550]">
            <div>
              <p className="text-[#64748B] text-xs mb-1">Physician</p>
              <p className="text-white text-sm font-medium">Dr. Sarah Chen, MD</p>
            </div>
            <div>
              <p className="text-[#64748B] text-xs mb-1">Pharmacy</p>
              <p className="text-white text-sm font-medium">MedFlow Rx</p>
            </div>
            <div>
              <p className="text-[#64748B] text-xs mb-1">Est. Arrival</p>
              <p className="text-[#4ECDC4] text-sm font-semibold">Tomorrow by 8 PM</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-semibold">Fulfillment Timeline</h2>
            <button className="flex items-center gap-1.5 text-[#64748B] hover:text-[#4ECDC4] text-xs transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>
          <RxTracker />
        </motion.div>

        {/* Delivery info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6 mb-6"
        >
          <h3 className="text-white font-semibold mb-4">Delivery Details</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#2A3550] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#64748B]" />
              </div>
              <div>
                <p className="text-[#64748B] text-xs uppercase tracking-wide font-semibold mb-0.5">
                  Shipping To
                </p>
                <p className="text-white text-sm">Alex Johnson</p>
                <p className="text-[#94A3B8] text-sm">123 Main Street, Apt 4B</p>
                <p className="text-[#94A3B8] text-sm">New York, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1A2540] border border-[#2A3550] flex items-center justify-center shrink-0">
                <Package className="w-4 h-4 text-[#64748B]" />
              </div>
              <div>
                <p className="text-[#64748B] text-xs uppercase tracking-wide font-semibold mb-0.5">
                  Carrier
                </p>
                <p className="text-white text-sm">FedEx Priority Overnight</p>
                <p className="text-[#4ECDC4] text-sm font-mono">794644790911</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Help + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 bg-[#1A2540]/50 border border-[#2A3550] rounded-xl p-4">
            <div className="w-9 h-9 rounded-full bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#4ECDC4]" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Need help with your order?</p>
              <p className="text-[#64748B] text-xs">Contact us 24/7 — response in under 5 minutes</p>
            </div>
            <button className="ml-auto text-[#4ECDC4] text-sm font-medium hover:underline shrink-0">
              Chat
            </button>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard" className="flex-1">
              <button className="w-full py-3 bg-[#1A2540] border border-[#2A3550] hover:border-[#4ECDC4]/30 text-[#94A3B8] hover:text-white rounded-xl text-sm font-medium transition-colors">
                View Physician Notes
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full py-3 bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 hover:bg-[#4ECDC4]/20 text-[#4ECDC4] rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2">
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
