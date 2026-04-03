"use client";

import { motion } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import Link from "next/link";

const options = [
  {
    name: "Typical Sleep Clinic",
    price: "$3,000+",
    period: "per course",
    description: "Traditional in-person sleep medicine",
    highlighted: false,
    features: [
      { text: "3–6 month wait for appointment", included: false },
      { text: "In-person only", included: false },
      { text: "Insurance nightmare", included: false },
      { text: "Generic one-size treatment", included: false },
      { text: "No ongoing support", included: false },
      { text: "Expensive out-of-pocket", included: false },
    ],
    cta: null,
    color: "#EF4444",
    bgColor: "rgba(239, 68, 68, 0.05)",
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  {
    name: "Generic Supplements",
    price: "$30",
    period: "per month",
    description: "Melatonin gummies, OTC sleep aids",
    highlighted: false,
    features: [
      { text: "No clinical evidence", included: false },
      { text: "Builds tolerance quickly", included: false },
      { text: "Doesn't fix root cause", included: false },
      { text: "Morning grogginess", included: false },
      { text: "No physician oversight", included: false },
      { text: "Hit-or-miss results", included: false },
    ],
    cta: null,
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.05)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    tag: "Doesn't Work",
  },
  {
    name: "SomnaFlow",
    price: "$79",
    period: "per month",
    description: "Everything included — start tonight",
    highlighted: true,
    features: [
      { text: "AI consultation in 5 minutes", included: true },
      { text: "Licensed physician review", included: true },
      { text: "Custom prescription Rx", included: true },
      { text: "Delivered to your door", included: true },
      { text: "Ongoing physician access", included: true },
      { text: "No dependency formulas", included: true },
    ],
    cta: "Start for $79/mo",
    color: "#4ECDC4",
    bgColor: "rgba(78, 205, 196, 0.08)",
    borderColor: "rgba(78, 205, 196, 0.4)",
    tag: "Best Value",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B1120]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4ECDC4]/4 rounded-full blur-3xl pointer-events-none" />

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
            Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The smart choice is{" "}
            <span className="text-[#4ECDC4]">obvious</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-xl mx-auto">
            Compare your options. The math speaks for itself.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-2xl p-7 border transition-all duration-300 ${
                option.highlighted ? "scale-[1.04] lg:scale-[1.06] shadow-2xl shadow-[#4ECDC4]/15" : ""
              }`}
              style={{
                background: option.bgColor,
                borderColor: option.borderColor,
              }}
            >
              {/* Tag */}
              {option.tag && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: option.color,
                    color: option.highlighted ? "#0B1120" : "white",
                  }}
                >
                  {option.tag}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <p className="text-[#94A3B8] text-sm mb-1">{option.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{option.price}</span>
                  <span className="text-[#64748B] text-sm">/{option.period.split(" ")[1] || option.period}</span>
                </div>
                <p className="text-xs text-[#64748B] mt-1">{option.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-7">
                {option.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        feature.included
                          ? "bg-[#4ECDC4]/20"
                          : "bg-[#EF4444]/10"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-3 h-3 text-[#4ECDC4]" />
                      ) : (
                        <X className="w-3 h-3 text-[#EF4444]" />
                      )}
                    </span>
                    <span
                      className={`text-sm leading-tight ${
                        feature.included ? "text-[#CBD5E1]" : "text-[#64748B]"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {option.cta && (
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-bold py-3.5 rounded-full transition-colors shadow-lg shadow-[#4ECDC4]/25"
                  >
                    <Zap className="w-4 h-4" />
                    {option.cta}
                  </motion.button>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#475569] text-sm mt-8"
        >
          Cancel anytime. No contracts. First consultation is free.
        </motion.p>
      </div>
    </section>
  );
}
