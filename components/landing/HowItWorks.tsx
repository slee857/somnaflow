"use client";

import { motion } from "framer-motion";
import { Mic, Stethoscope, Package } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: Mic,
    title: "1-minute intake",
    subtitle: "1 min",
    description: "Answer by voice or text. We generate a clinical summary instantly.",
    details: ["Voice or text", "HIPAA-encrypted"],
  },
  {
    step: "02",
    icon: Stethoscope,
    title: "Licensed doctor review",
    subtitle: "Under 2 hrs",
    description: "A licensed physician in your state reviews and prescribes the right medication.",
    details: ["State-licensed physician", "Digitally signed Rx"],
  },
  {
    step: "03",
    icon: Package,
    title: "24-hour delivery",
    subtitle: "By tomorrow",
    description: "Prescription ships fast in discreet packaging from a licensed pharmacy.",
    details: ["FedEx Priority Overnight", "Live tracking"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 lg:py-36 bg-white border-t border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#A3A3A3] font-medium text-xs uppercase tracking-widest mb-4">
            How It Works
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight mb-5">
            From consultation to bedside —{" "}
            <span className="text-[#D97706]">in 24 hours</span>
          </h2>
          <p className="text-[#525252] text-lg max-w-xl mx-auto">
            1 minute intake. Licensed doctor review. Delivery by tomorrow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#EBEBEB] rounded-2xl p-8 hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-6xl font-black text-[#EBEBEB] leading-none select-none">{step.step}</span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full border border-[#EBEBEB] text-[#525252]">
                    {step.subtitle}
                  </span>
                </div>
                <Icon className="w-6 h-6 text-[#D97706] mb-5" />
                <h3 className="text-base font-bold text-[#0A0A0A] mb-3">{step.title}</h3>
                <p className="text-[#525252] text-sm leading-relaxed mb-5">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-[#A3A3A3]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link href="/intake">
            <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold px-8 py-4 rounded-full text-base transition-colors">
              Start Free Consultation
            </button>
          </Link>
          <p className="text-[#A3A3A3] text-sm mt-3">No credit card required · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}
