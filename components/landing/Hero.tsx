"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, Check, Clock, Banknote, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import HeroDemo from "./HeroDemo";

const beforeIcons = [Clock, Banknote, AlertTriangle, AlertTriangle];

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="bg-white pt-24 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP ROW */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 lg:py-28">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-[#EBEBEB] rounded-full px-3.5 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
              <span className="text-xs text-[#525252] tracking-widest uppercase font-medium">
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0A0A0A] leading-none tracking-tight mb-6"
            >
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
              <br />
              <span className="text-[#D97706]">{t.hero.headline3}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-xl text-[#0A0A0A] leading-relaxed font-semibold mb-6 max-w-lg"
            >
              {t.hero.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-lg text-[#525252] leading-relaxed mb-8 max-w-lg"
            >
              {t.hero.description}
            </motion.p>

            <div className="flex flex-wrap gap-2 mb-10">
              {t.hero.steps.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full border border-[#EBEBEB] text-[#525252] bg-white"
                >
                  {item}
                </span>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
            >
              <Link href="/intake">
                <button className="group flex items-center gap-3 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-base px-8 py-4 rounded-full transition-all duration-200">
                  {t.hero.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center gap-1.5 py-4 text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors"
              >
                {t.hero.seeHow}
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              {t.hero.trustStats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <p className="text-[#0A0A0A] font-bold text-base">{s.value}</p>
                  <p className="text-[#A3A3A3] text-xs">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — interactive mini demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative pb-16"
          >
            <HeroDemo />

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              className="absolute -bottom-4 -left-4 bg-white border border-[#EBEBEB] rounded-2xl px-4 py-3 shadow-sm"
            >
              <p className="text-[#0A0A0A] font-bold text-sm">⭐ 4.9/5</p>
              <p className="text-[#A3A3A3] text-xs">12,400 {t.hero.trustStats[0].label}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* BEFORE / AFTER COMPARISON */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-[#EBEBEB] py-20 lg:py-28"
        >
          <div className="text-center mb-12">
            <p className="text-[#A3A3A3] text-xs uppercase tracking-widest font-medium mb-4">
              {t.hero.whySomnaFlow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
              {t.hero.comparisonTitle}
              <br />
              <span className="text-[#D97706]">{t.hero.comparisonSubtitleHighlight}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-white border border-[#EBEBEB] rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full border border-[#EBEBEB] flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-[#A3A3A3]" />
                </div>
                <p className="text-[#525252] font-semibold text-sm">{t.hero.oldWay}</p>
              </div>
              <ul className="space-y-4">
                {t.hero.before.map((text, i) => {
                  const Icon = beforeIcons[i];
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full border border-[#EBEBEB] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-[#A3A3A3]" />
                      </div>
                      <span className="text-[#525252] text-sm leading-relaxed">{text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* After */}
            <div className="bg-white border border-[#EBEBEB] rounded-2xl p-7 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-white text-xs font-semibold px-4 py-1 rounded-full">
                SomnaFlow
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full bg-[#D97706] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[#0A0A0A] font-semibold text-sm">{t.hero.somnaFlowWay}</p>
              </div>
              <ul className="space-y-4">
                {t.hero.after.map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full border border-[#EBEBEB] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <span className="text-[#0A0A0A] text-sm leading-relaxed font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/intake" className="block mt-7">
                <button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-semibold py-3.5 rounded-full transition-colors text-sm">
                  {t.hero.ctaComparison}
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
