"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
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
    tag: null,
    variant: "neutral" as const,
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
    tag: "Doesn't Work",
    variant: "warning" as const,
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
    tag: "Best Value",
    variant: "featured" as const,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-gray-50 border-t border-gray-200">
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
            Pricing
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-6">
            The smart choice is{" "}
            <span className="text-[#D97706]">obvious</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
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
              className={`relative rounded-lg p-7 border transition-all duration-300 ${
                option.highlighted
                  ? "border-2 border-[#D97706] bg-white shadow-lg shadow-amber-100 scale-[1.02] lg:scale-[1.04]"
                  : "border border-gray-200 bg-white shadow-sm"
              }`}
            >
              {/* Tag */}
              {option.tag && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-sm text-xs font-bold ${
                    option.highlighted
                      ? "bg-[#D97706] text-white"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {option.tag}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">{option.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-black ${option.highlighted ? "text-gray-900" : "text-gray-400"}`}>
                    {option.price}
                  </span>
                  <span className="text-gray-400 text-sm">/{option.period.split(" ")[1] || option.period}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{option.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-7">
                {option.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    <span
                      className={`w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 ${
                        feature.included
                          ? "bg-amber-50 border border-amber-200"
                          : "bg-red-50 border border-red-100"
                      }`}
                    >
                      {feature.included ? (
                        <Check className="w-3 h-3 text-[#D97706]" />
                      ) : (
                        <X className="w-3 h-3 text-red-400" />
                      )}
                    </span>
                    <span
                      className={`text-sm leading-tight ${
                        feature.included ? "text-gray-900" : "text-gray-400"
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
                  <button className="w-full flex items-center justify-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold py-3.5 rounded transition-colors">
                    {option.cta}
                  </button>
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
          className="text-center text-gray-400 text-sm mt-8"
        >
          Cancel anytime. No contracts. First consultation is free.
        </motion.p>
      </div>
    </section>
  );
}
