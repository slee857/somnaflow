"use client";

import { motion } from "framer-motion";
import { Compass, Stethoscope, Package, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Compass,
    title: "AI Voice Intake",
    subtitle: "2 minutes",
    description:
      "Answer a few questions about your sleep patterns via our AI voice system. No forms, no waiting rooms.",
    color: "#4ECDC4",
    bgColor: "rgba(78, 205, 196, 0.1)",
    borderColor: "rgba(78, 205, 196, 0.2)",
    details: ["Voice or text — your choice", "Clinically validated questions", "100% confidential"],
  },
  {
    step: "02",
    icon: Stethoscope,
    title: "Doctor Review & Rx",
    subtitle: "5 minutes",
    description:
      "A board-certified sleep physician reviews your intake summary and prescribes the right sleep formula for you.",
    color: "#6B8AFF",
    bgColor: "rgba(107, 138, 255, 0.1)",
    borderColor: "rgba(107, 138, 255, 0.2)",
    details: ["Real licensed physician", "Personalized medication", "Secure video consult option"],
  },
  {
    step: "03",
    icon: Package,
    title: "Rx Delivered to Door",
    subtitle: "24 hours",
    description:
      "Your prescription is sent directly to an FDA-registered pharmacy and delivered to your door the next day.",
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    details: ["FDA-registered pharmacy", "Discreet packaging", "Real-time tracking"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-[#0D1525] to-[#0B1120]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-[#4ECDC4] font-semibold text-sm uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Sleep medicine in{" "}
            <span className="text-[#4ECDC4]">3 simple steps</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            From first consultation to prescription delivery — all from your couch.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-12 -right-4 z-20 items-center">
                    <ArrowRight className="w-6 h-6 text-[#2A3550]" />
                  </div>
                )}

                <div
                  className="relative p-8 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-default"
                  style={{
                    background: step.bgColor,
                    borderColor: step.borderColor,
                  }}
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black opacity-20" style={{ color: step.color }}>
                      {step.step}
                    </span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: `${step.color}20`, color: step.color }}
                    >
                      {step.subtitle}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: step.bgColor, border: `1px solid ${step.borderColor}` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: step.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed mb-5">{step.description}</p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-[#64748B]">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: step.color }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a href="/intake">
            <button className="bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-bold px-8 py-4 rounded-full text-lg shadow-lg shadow-[#4ECDC4]/20 hover:shadow-[#4ECDC4]/40 transition-all duration-300">
              Start in 5 Minutes — Free
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
