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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#0B1120]">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4ECDC4]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#6B8AFF]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4ECDC4]/4 rounded-full blur-3xl" />
      </div>

      {/* Star field effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
            animate={{ opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.7 + 0.3, Math.random() * 0.3 + 0.1] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#4ECDC4]/10 border border-[#4ECDC4]/30 rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse" />
          <span className="text-sm text-[#4ECDC4] font-medium">
            Now accepting patients in all 50 states
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          Professional Sleep Care,{" "}
          <span className="block">
            <span className="shimmer-text">Delivered to Your</span>
          </span>
          <span className="text-[#4ECDC4]">Doorstep.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl sm:text-2xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Don&apos;t just track bad sleep.{" "}
          <span className="text-white font-semibold">Fix it in 15 minutes.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/intake">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-bold text-lg px-8 py-4 rounded-full shadow-2xl shadow-[#4ECDC4]/30 hover:shadow-[#4ECDC4]/50 transition-all duration-300"
            >
              Start Your 5-Min AI Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <button className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors font-medium px-6 py-4">
            <span className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-sm">
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
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-16"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1A2540] border border-[#2A3550] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#4ECDC4]" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-[#64748B] text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Visual: Sleep wave animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 border border-[#2A3550]">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 bg-[#1A2540] rounded-lg h-7 flex items-center px-3">
                <span className="text-[#475569] text-xs">somnaflow.com/intake</span>
              </div>
            </div>

            {/* Simulated Sleep Waveform */}
            <div className="relative h-24 flex items-center">
              <div className="absolute left-0 top-2 text-xs text-[#64748B]">Deep Sleep</div>
              <svg
                className="w-full h-full"
                viewBox="0 0 800 96"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Bad sleep - red */}
                <motion.path
                  d="M0,48 Q20,48 40,48 Q60,48 80,48 Q100,10 120,48 Q130,80 150,48 Q160,20 180,48 Q200,48 220,48 Q240,60 260,48 Q280,10 300,48"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
                {/* Good sleep after SomnaFlow */}
                <motion.path
                  d="M310,48 Q330,48 350,20 Q360,5 370,48 Q380,80 390,60 Q400,20 410,10 Q420,5 430,48 Q440,80 450,60 Q460,20 470,10 Q480,5 490,48 Q510,80 530,48 Q550,20 570,5 Q590,48 610,48 Q630,48 650,48 Q670,48 700,48 Q730,48 760,48 Q780,48 800,48"
                  stroke="#4ECDC4"
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
                  stroke="#4ECDC4"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1.4 }}
                />
              </svg>
              {/* Labels */}
              <div className="absolute left-4 bottom-0 text-xs text-red-400">Before</div>
              <div className="absolute right-4 bottom-0 text-xs text-[#4ECDC4]">After SomnaFlow</div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A3550]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ECDC4] animate-pulse" />
                <span className="text-[#4ECDC4] text-sm font-medium">AI Analysis Active</span>
              </div>
              <span className="text-[#64748B] text-xs">Sleep Quality: <span className="text-[#4ECDC4] font-semibold">Improving</span></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
