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
    details: ["Voice or text — your choice", "Clinically validated questions", "100% confidential"],
  },
  {
    step: "02",
    icon: Stethoscope,
    title: "Doctor Review & Rx",
    subtitle: "5 minutes",
    description:
      "A board-certified sleep physician reviews your intake summary and prescribes the right sleep formula for you.",
    details: ["Real licensed physician", "Personalized medication", "Secure video consult option"],
  },
  {
    step: "03",
    icon: Package,
    title: "Rx Delivered to Door",
    subtitle: "24 hours",
    description:
      "Your prescription is sent directly to an FDA-registered pharmacy and delivered to your door the next day.",
    details: ["FDA-registered pharmacy", "Discreet packaging", "Real-time tracking"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-widest mb-4">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Sleep medicine in{" "}
            <span className="text-teal-600">3 simple steps</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
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
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}

                <div className="relative p-8 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-default">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-slate-200">
                      {step.step}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                      {step.subtitle}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-teal-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{step.description}</p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
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
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-lg text-lg shadow-sm transition-colors duration-200">
              Start in 5 Minutes — Free
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
