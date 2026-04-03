"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Users, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "12,400+", label: "Patients Helped" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Clock, value: "< 24hr", label: "Rx Delivery" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(to right, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500" />
          <span className="text-sm text-teal-700 font-medium">
            Now accepting patients in all 50 states
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight mb-6"
        >
          Professional Sleep Care,{" "}
          <span className="block text-teal-600">Delivered to Your Doorstep.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Don&apos;t just track bad sleep.{" "}
          <span className="text-slate-900 font-semibold">Fix it in 15 minutes.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/intake">
            <button className="group flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-md transition-all duration-200">
              Start Your 5-Min AI Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <button className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors font-medium px-6 py-4">
            <span className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-sm text-slate-600">
              ▶
            </span>
            Watch 90-sec demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-16"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-3"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-left">
                  <p className="text-slate-900 font-bold text-base leading-none">{stat.value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Visual: Sleep wave card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-8 shadow-md">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 bg-slate-100 rounded-md h-7 flex items-center px-3">
                <span className="text-slate-400 text-xs">somnaflow.com/intake</span>
              </div>
            </div>

            {/* Simulated Sleep Waveform */}
            <div className="relative h-24 flex items-center">
              <div className="absolute left-0 top-2 text-xs text-slate-400">Deep Sleep</div>
              <svg
                className="w-full h-full"
                viewBox="0 0 800 96"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Bad sleep — muted red */}
                <motion.path
                  d="M0,48 Q20,48 40,48 Q60,48 80,48 Q100,10 120,48 Q130,80 150,48 Q160,20 180,48 Q200,48 220,48 Q240,60 260,48 Q280,10 300,48"
                  stroke="#f87171"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
                {/* Good sleep — teal */}
                <motion.path
                  d="M310,48 Q330,48 350,20 Q360,5 370,48 Q380,80 390,60 Q400,20 410,10 Q420,5 430,48 Q440,80 450,60 Q460,20 470,10 Q480,5 490,48 Q510,80 530,48 Q550,20 570,5 Q590,48 610,48 Q630,48 650,48 Q670,48 700,48 Q730,48 760,48 Q780,48 800,48"
                  stroke="#0d9488"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, delay: 1.5 }}
                />
                {/* Transition marker */}
                <motion.line
                  x1="310"
                  y1="0"
                  x2="310"
                  y2="96"
                  stroke="#0d9488"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1.4 }}
                />
              </svg>
              <div className="absolute left-4 bottom-0 text-xs text-red-400">Before</div>
              <div className="absolute right-4 bottom-0 text-xs text-teal-600">After SomnaFlow</div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-teal-700 text-sm font-medium">AI Analysis Active</span>
              </div>
              <span className="text-slate-500 text-xs">
                Sleep Quality: <span className="text-teal-600 font-semibold">Improving</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
