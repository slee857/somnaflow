"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, X, Check, Clock, Banknote, AlertTriangle, ShieldCheck } from "lucide-react";

const trustStats = [
  { value: "12,400+", label: "patients" },
  { value: "4.9/5", label: "rating" },
  { value: "< 24hr", label: "delivery" },
  { value: "Non-addictive", label: "only" },
];

const before = [
  { icon: Clock, text: "Sleep clinic: 3–6 month waitlist" },
  { icon: Banknote, text: "Sleep study: $2,000–$4,000 out-of-pocket" },
  { icon: AlertTriangle, text: "Generic Ambien: next-day grogginess & dependency" },
  { icon: AlertTriangle, text: "Melatonin: no clinical evidence for chronic insomnia" },
];

const after = [
  { text: "Licensed physician consult in 5 minutes — from home" },
  { text: "Custom Rx reviewed & approved in under 2 hours" },
  { text: "Non-addictive DORA/Ramelteon — no grogginess, no dependency" },
  { text: "Delivered to your door by tomorrow. $79/mo all-in." },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-0">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-amber-50 rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP ROW */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pb-16 lg:pb-24">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 border border-amber-200 bg-amber-50 rounded-sm px-3 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              <span className="text-xs text-[#D97706] font-semibold tracking-widest uppercase">
                Prescription Sleep Medicine
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl sm:text-6xl lg:text-[68px] font-black text-gray-900 leading-[1.02] tracking-tighter mb-6"
            >
              Your melatonin
              <br />
              isn&apos;t working.
              <br />
              <span className="text-[#D97706]">This will.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg"
            >
              Chronic insomnia affects 30 million Americans. Most never see a specialist.
              SomnaFlow connects you with a licensed physician in 5 minutes — who prescribes
              real, non-addictive sleep medication delivered to your door by tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-10"
            >
              <Link href="/intake">
                <button className="group flex items-center gap-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-base px-7 py-4 rounded transition-all duration-200">
                  Get Your Prescription — Free Consult
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center gap-2 px-4 py-4 text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                See how it works ↓
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {trustStats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <p className="text-gray-900 font-bold text-base">{s.value}</p>
                  <p className="text-gray-400 text-xs">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Medication visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 relative overflow-hidden shadow-sm">
              {/* Subtle glow top-right */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-50 rounded-full blur-2xl" />

              {/* Approved badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#D97706] text-white text-xs font-bold px-3 py-1.5 rounded-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Approved
              </motion.div>

              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-5">
                Our Medications
              </p>

              <div className="space-y-4">
                {/* Formula S1 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1550572017-edd951b55104?w=200&q=80"
                      alt="Formula S1 Ramelteon"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-bold text-sm">Formula S1</p>
                    <p className="text-[#D97706] text-xs font-semibold mb-2">Ramelteon 8mg</p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-white border border-gray-200 text-gray-500 font-medium">Non-addictive</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-white border border-gray-200 text-gray-500 font-medium">No grogginess</span>
                    </div>
                  </div>
                </div>

                {/* Formula D1 */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&q=80"
                      alt="Formula D1 Daridorexant"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-bold text-sm">Formula D1</p>
                    <p className="text-[#D97706] text-xs font-semibold mb-2">Daridorexant 25mg</p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-white border border-gray-200 text-gray-500 font-medium">Non-addictive</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-sm bg-white border border-gray-200 text-gray-500 font-medium">Delivered overnight</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom delivery note */}
              <div className="mt-5 pt-5 border-t border-gray-200 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse shrink-0" />
                <p className="text-gray-500 text-xs">
                  <span className="text-gray-900 font-semibold">Prescription approved</span>
                  {" · "}Delivered by 8 PM tomorrow
                </p>
              </div>
            </div>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-lg"
            >
              <p className="text-gray-900 font-bold text-sm">⭐ 4.9/5</p>
              <p className="text-gray-400 text-xs">12,400 patients</p>
            </motion.div>
          </motion.div>
        </div>

        {/* BEFORE / AFTER COMPARISON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-200 py-16 lg:py-20"
        >
          <div className="text-center mb-12">
            <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-3">
              Why SomnaFlow
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              You&apos;ve tried the slow way.
              <br />
              <span className="text-[#D97706]">Here&apos;s the fast way.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-7">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-sm bg-red-50 border border-red-200 flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="text-gray-500 font-semibold text-sm">The old way</p>
              </div>
              <ul className="space-y-4">
                {before.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-red-50 border border-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-red-400" />
                      </div>
                      <span className="text-gray-500 text-sm leading-relaxed">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* After */}
            <div className="bg-white border-2 border-[#D97706] rounded-lg p-7 relative shadow-sm">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D97706] text-white text-xs font-bold px-4 py-1 rounded-sm">
                SomnaFlow
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-6 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-[#D97706]" />
                </div>
                <p className="text-gray-900 font-semibold text-sm">The SomnaFlow way</p>
              </div>
              <ul className="space-y-4">
                {after.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#D97706]" />
                    </div>
                    <span className="text-gray-900 text-sm leading-relaxed font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/intake" className="block mt-7">
                <button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 rounded transition-colors text-sm">
                  Get Started — Free Consultation
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
