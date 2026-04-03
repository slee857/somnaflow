"use client";

import { motion } from "framer-motion";
import { Shield, Stethoscope, Lock, Award, HeartPulse, Users, Check } from "lucide-react";
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
    <section id="trust" className="py-28 lg:py-36 bg-white border-t border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#A3A3A3] font-medium text-xs uppercase tracking-widest mb-4">
            Trust & Safety
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight mb-5">
            Medical-grade care,{" "}
            <span className="text-[#D97706]">zero compromise</span>
          </h2>
          <p className="text-[#525252] text-lg max-w-xl mx-auto">
            We hold ourselves to the highest clinical standards because your health depends on it.
          </p>
        </motion.div>

        {/* Big 3 badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {bigBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white border border-[#EBEBEB] hover:-translate-y-0.5 transition-transform duration-300"
              >
                <Icon className="w-6 h-6 text-[#D97706] mb-5" />
                <h3 className="text-base font-bold text-[#0A0A0A] mb-2">{badge.title}</h3>
                <p className="text-[#525252] text-sm leading-relaxed">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Small badges row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {smallBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2 border border-[#EBEBEB] rounded-full"
              >
                <Check className="w-3.5 h-3.5 text-[#D97706]" />
                <span className="text-[#525252] text-sm">{badge.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Final CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-3xl bg-[#0A0A0A] px-10 py-16 lg:px-16 lg:py-20 text-center"
        >
          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Your best night&apos;s sleep
            <br />
            starts tonight.
          </h2>
          <p className="text-[#A3A3A3] text-lg mb-8 max-w-xl mx-auto">
            Join 12,400+ patients who stopped settling for bad sleep. No waiting rooms. No insurance hassle. Just results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/intake">
              <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-base px-10 py-4 rounded-full transition-colors">
                Start Your Free Consultation
              </button>
            </Link>
            <p className="text-[#525252] text-sm">No credit card required to start</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
