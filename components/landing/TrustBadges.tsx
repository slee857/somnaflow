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
    <section id="trust" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] to-[#070E1A]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#4ECDC4] font-semibold text-sm uppercase tracking-widest mb-4">
            Trust & Safety
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Medical-grade care,{" "}
            <span className="text-[#4ECDC4]">zero compromise</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
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
                className="group p-8 rounded-2xl bg-[#1A2540] border border-[#2A3550] hover:border-[#4ECDC4]/30 transition-all duration-300 hover:bg-[#1E2D4A] text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#4ECDC4]/10 border border-[#4ECDC4]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#4ECDC4]/20 transition-colors">
                  <Icon className="w-8 h-8 text-[#4ECDC4]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{badge.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{badge.desc}</p>
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
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          {smallBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1A2540] border border-[#2A3550] rounded-full"
              >
                <Icon className="w-4 h-4 text-[#4ECDC4]" />
                <span className="text-[#94A3B8] text-sm font-medium">{badge.label}</span>
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
          className="gradient-border rounded-3xl bg-[#1A2540] p-10 lg:p-14 text-center"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Your best night&apos;s sleep
            <br />
            <span className="text-[#4ECDC4]">starts tonight.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg mb-8 max-w-xl mx-auto">
            Join 12,400+ patients who stopped settling for bad sleep. No waiting rooms. No insurance hassle. Just results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/intake">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-bold text-lg px-10 py-4 rounded-full shadow-2xl shadow-[#4ECDC4]/30 transition-all"
              >
                Start Your Free Consultation
              </motion.button>
            </Link>
            <p className="text-[#64748B] text-sm">No credit card required to start</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
