"use client";

import { motion } from "framer-motion";
import { Mic, Stethoscope, Package, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "01",
    icon: Mic,
    title: "Tell us about your sleep",
    subtitle: "5 min",
    description:
      "Answer a few clinical questions via voice or text. Our AI prepares a full intake summary — so your doctor is ready before you even click 'connect.'",
    details: ["Voice or text — your choice", "Covers sleep history, past medications, allergies", "100% private and HIPAA-encrypted"],
  },
  {
    step: "02",
    icon: Stethoscope,
    title: "Real doctor, real prescription",
    subtitle: "Under 2 hrs",
    description:
      "A board-certified sleep physician reviews your case and asks any follow-up questions. They prescribe the right modern medication — not a one-size-fits-all sedative.",
    details: ["Licensed in your state", "Non-addictive DORA or Ramelteon — not Ambien", "Digitally signed prescription"],
  },
  {
    step: "03",
    icon: Package,
    title: "Delivered to your door",
    subtitle: "By tomorrow",
    description:
      "Your prescription ships from an FDA-registered compounding pharmacy via FedEx Priority Overnight. Discreet packaging. No pharmacy lines. Take it tonight.",
    details: ["FDA-registered compounding pharmacy", "Discreet, unmarked packaging", "Real-time tracking link by email"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#D97706] font-semibold text-xs uppercase tracking-widest mb-4">
            How It Works
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-5">
            From consultation to bedside —{" "}
            <span className="text-[#D97706]">in 24 hours</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Real sleep medicine. No waiting rooms. No insurance battles. Just a doctor, a prescription, and your doorstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="relative group"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-11 -right-4 z-20 items-center">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
                <div className="p-8 rounded-lg border border-gray-200 bg-white hover:border-[#D97706]/40 hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-5xl font-black text-gray-100">{step.step}</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-sm bg-amber-50 text-[#D97706] border border-amber-200">
                      {step.subtitle}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-[#D97706]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-center mt-14"
        >
          <Link href="/intake">
            <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-8 py-4 rounded text-base transition-colors">
              Start Free Consultation
            </button>
          </Link>
          <p className="text-gray-400 text-sm mt-3">No credit card required · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  );
}
