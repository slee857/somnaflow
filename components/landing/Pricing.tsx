"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-28 lg:py-36 bg-[#F8F8F8] border-t border-[#EBEBEB]">
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
            {t.pricing.sectionLabel}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight mb-5">
            {t.pricing.title}{" "}
            <span className="text-[#D97706]">{t.pricing.titleHighlight}</span>
          </h2>
          <p className="text-[#525252] text-lg max-w-xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {t.pricing.options.map((option, index) => {
            const highlighted = index === 2;
            return (
            <motion.div
              key={option.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-7 bg-white transition-all duration-300 ${
                highlighted
                  ? "border-2 border-[#0A0A0A] shadow-sm lg:scale-[1.03]"
                  : "border border-[#EBEBEB]"
              }`}
            >
              {/* Tag */}
              {option.tag && (
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold ${
                    highlighted
                      ? "bg-[#0A0A0A] text-white"
                      : "bg-[#F8F8F8] text-[#525252] border border-[#EBEBEB]"
                  }`}
                >
                  {option.tag}
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <p className="text-[#A3A3A3] text-sm mb-1">{option.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-black ${highlighted ? "text-[#0A0A0A]" : "text-[#A3A3A3]"}`}>
                    {option.price}
                  </span>
                  <span className="text-[#A3A3A3] text-sm">/{option.period.split(" ")[1] || option.period}</span>
                </div>
                <p className="text-xs text-[#A3A3A3] mt-1">{option.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-7">
                {option.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border border-[#EBEBEB]">
                      {feature.included ? (
                        <Check className="w-3 h-3 text-[#D97706]" />
                      ) : (
                        <X className="w-3 h-3 text-[#A3A3A3]" />
                      )}
                    </span>
                    <span
                      className={`text-sm leading-tight ${
                        feature.included ? "text-[#0A0A0A]" : "text-[#A3A3A3]"
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
                  <button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-semibold py-3.5 rounded-full transition-colors text-sm">
                    {option.cta}
                  </button>
                </Link>
              )}
            </motion.div>
            );
          })}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#A3A3A3] text-sm mt-8"
        >
          {t.pricing.finePrint}
        </motion.p>
      </div>
    </section>
  );
}
