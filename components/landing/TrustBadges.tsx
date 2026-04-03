"use client";

import { motion } from "framer-motion";
import { Shield, Stethoscope, Lock, Award, HeartPulse, Users } from "lucide-react";
import Link from "next/link";

const bigBadges = [
  {
    icon: Shield,
    title: "FDA-Regulated Pharmacy",
    desc: "All compounds sourced from FDA-registered pharmacies with strict quality controls and third-party testing.",
  },
  {
    icon: Stethoscope,
    title: "Licensed US Physicians",
    desc: "Board-certified sleep medicine specialists. Real doctors, real licenses — verified in all 50 states.",
  },
  {
    icon: Lock,
    title: "HIPAA Secure",
    desc: "Military-grade 256-bit encryption on all data. Your medical information stays 100% private.",
  },
];

const smallBadges = [
  { icon: Award, label: "BBB Accredited" },
  { icon: HeartPulse, label: "HIPAA Compliant" },
  { icon: Users, label: "50-State Licensed" },
  { icon: Shield, label: "SOC 2 Type II" },
];

export default function TrustBadges() {
  return (
    <section id="trust" className="py-24 lg:py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D97706] font-semibold text-xs uppercase tracking-widest mb-4">
            Trust & Safety
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Medical-grade care,{" "}
            <span className="text-[#D97706]">zero compromise</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We hold ourselves to the highest clinical standards because your health depends on it.
          </p>
        </motion.div>

        {/* Big 3 badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {bigBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group p-8 rounded-lg bg-white border border-gray-200 hover:border-[#D97706]/30 hover:shadow-md transition-all duration-300 text-center shadow-sm"
              >
                <div className="w-14 h-14 rounded bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-100 transition-colors">
                  <Icon className="w-7 h-7 text-[#D97706]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{badge.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Small badges row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {smallBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-sm shadow-sm"
              >
                <Icon className="w-4 h-4 text-[#D97706]" />
                <span className="text-gray-500 text-sm font-medium">{badge.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Final CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-lg bg-white border border-gray-200 p-10 lg:p-14 text-center relative overflow-hidden shadow-sm"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 via-transparent to-amber-50/30 pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Your best night&apos;s sleep
              <br />
              <span className="text-[#D97706]">starts tonight.</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              Join 12,400+ patients who stopped settling for bad sleep. No waiting rooms. No insurance hassle. Just results.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/intake">
                <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-lg px-10 py-4 rounded transition-colors">
                  Start Your Free Consultation
                </button>
              </Link>
              <p className="text-gray-400 text-sm">No credit card required to start</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
