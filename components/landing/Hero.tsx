"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  X,
  Check,
  Clock,
  Banknote,
  AlertTriangle,
  ShieldCheck,
  Mic,
  FileText,
  Stethoscope,
  Package,
} from "lucide-react";

const trustStats = [
  { value: "12,400+", label: "patients" },
  { value: "4.9/5", label: "rating" },
  { value: "< 24hr", label: "delivery" },
  { value: "Non-addictive", label: "only" },
];

const before = [
  { icon: Clock, text: "Sleep clinic waitlists (months)" },
  { icon: Banknote, text: "Sleep studies: $2k–$4k out-of-pocket" },
  { icon: AlertTriangle, text: "Grogginess + dependency risk" },
  { icon: AlertTriangle, text: "Supplements that miss the root cause" },
];

const after = [
  { text: "Board-certified consult from home (5 min)" },
  { text: "Clinical brief from your transcription" },
  { text: "Non-addictive sleep care — no dependency risk" },
  { text: "Discreet delivery to your doorstep (tomorrow)" },
];

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const systemSteps = useMemo(
    () => [
      {
        icon: Mic,
        kicker: "1 MIN",
        title: "Answer",
        desc: "Speak once. We transcribe instantly.",
      },
      {
        icon: FileText,
        kicker: "CLINICAL BRIEF",
        title: "Clinical brief",
        desc: "Your doctor gets summary-ready notes.",
      },
      {
        icon: Stethoscope,
        kicker: "IN 5 MIN",
        title: "Physician consult",
        desc: "Board-certified next steps in minutes.",
      },
      {
        icon: Package,
        kicker: "DISCREET DELIVERY",
        title: "Medication arrives",
        desc: "Discreetly shipped to your door.",
      },
    ],
    [],
  );

  useEffect(() => {
    const totalSteps = systemSteps.length;
    const stepDurationMs = 1800;
    const tickMs = 60;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + tickMs / stepDurationMs;
        if (next >= 1) {
          setActiveStep((s) => (s + 1) % totalSteps);
          return 0;
        }
        return next;
      });
    }, tickMs);

    return () => clearInterval(interval);
  }, [systemSteps.length]);

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
                Prescription Sleep Medicine
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-[#0A0A0A] leading-none tracking-tight mb-6"
            >
              Sleep Medicine,
              <br />
              Delivered to
              <br />
              <span className="text-[#D97706]">Your Door.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-xl text-[#0A0A0A] leading-relaxed font-semibold mb-6 max-w-lg"
            >
              Stop trying to sleep. Start treating it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-lg text-[#525252] leading-relaxed mb-8 max-w-lg"
            >
              Tap start. Answer in 1 minute. A licensed doctor reviews and prescribes. Medication
              arrives in 24 hours.
            </motion.p>

            <div className="flex flex-wrap gap-2 mb-10">
              {["1) Start intake", "2) Answer by voice", "3) Licensed doctor Rx", "4) 24h delivery"].map((item) => (
                <span key={item} className="text-xs px-3 py-1.5 rounded-full border border-[#EBEBEB] text-[#525252] bg-white">
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
                  Get Your Prescription — Free Consult
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center gap-1.5 py-4 text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors"
              >
                See how it works ↓
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-x-8 gap-y-3"
            >
              {trustStats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <p className="text-[#0A0A0A] font-bold text-base">{s.value}</p>
                  <p className="text-[#A3A3A3] text-xs">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D system visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="bg-[#F8F8F8] border border-[#EBEBEB] rounded-3xl p-6 relative overflow-hidden">
              {/* Premium amber glow */}
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#D97706]/10 blur-3xl" />

              {/* Physician-led badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="absolute top-4 right-4 flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Physician-led
              </motion.div>

              <p className="text-[#A3A3A3] text-xs font-semibold uppercase tracking-widest mb-5">
                From your voice to care
              </p>

              <div className="relative mx-auto w-full max-w-md">
                <div
                  className="relative h-[420px] w-full"
                  style={{ perspective: "900px" }}
                >
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      transform: "rotateX(4deg) rotateY(-6deg)",
                      transformStyle: "preserve-3d",
                      transition: "transform 200ms ease-out",
                    }}
                  >
                    {systemSteps.map((step, i) => {
                      const Icon = step.icon;
                      const relative = (i - activeStep + systemSteps.length) % systemSteps.length;
                      const z = 120 - relative * 46;
                      const y = relative * 13 - 16;
                      const isPrimary = i === 2;

                      return (
                        <div
                          key={step.title}
                          className={[
                            "absolute left-1/2 top-1/2 w-full rounded-2xl border p-4 shadow-sm bg-white",
                            activeStep === i
                              ? "ring-2 ring-amber-300/60 border-amber-300 shadow-[0_18px_45px_rgba(217,119,6,0.22)]"
                              : isPrimary
                              ? "border-amber-200 shadow-[0_14px_40px_rgba(217,119,6,0.18)]"
                              : "border-[#EBEBEB]",
                          ].join(" ")}
                          style={{
                            transform: `translate(-50%, -50%) translateY(${y}px) translateZ(${z}px) scale(${1 - relative * 0.03})`,
                          }}
                        >
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={[
                                  "inline-flex items-center justify-center rounded-xl w-9 h-9 border",
                                  isPrimary ? "border-amber-200 bg-amber-50" : "border-[#EBEBEB]",
                                ].join(" ")}
                              >
                                <Icon
                                  className={
                                    isPrimary ? "w-4 h-4 text-[#D97706]" : "w-4 h-4 text-[#525252]"
                                  }
                                />
                              </span>
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#D97706]">
                                {step.kicker}
                              </span>
                            </div>
                          </div>

                          <p className="text-[#0A0A0A] font-black leading-tight">{step.title}</p>
                          <p className="text-[#525252] text-sm leading-relaxed mt-2">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-[#EBEBEB] text-xs text-[#525252]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                      Auto demo running
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white border border-[#EBEBEB] rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] uppercase tracking-wide text-[#A3A3A3] font-semibold">Live flow</p>
                  <p className="text-xs text-[#D97706] font-semibold">
                    Step {activeStep + 1}/{systemSteps.length}
                  </p>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D97706] rounded-full transition-all duration-75"
                    style={{
                      width: `${((activeStep + progress) / systemSteps.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-[#525252] mt-2">
                  <span className="font-semibold text-[#0A0A0A]">{systemSteps[activeStep].title}:</span>{" "}
                  {systemSteps[activeStep].desc}
                </p>
              </div>
            </div>

            {/* Rating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
              className="absolute -bottom-4 -left-4 bg-white border border-[#EBEBEB] rounded-2xl px-4 py-3 shadow-sm"
            >
              <p className="text-[#0A0A0A] font-bold text-sm">⭐ 4.9/5</p>
              <p className="text-[#A3A3A3] text-xs">12,400 patients</p>
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
              Why SomnaFlow
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] tracking-tight">
                  Stop settling for another sleepless night.
                  <br />
                  <span className="text-[#D97706]">Doctor + prescription care, fast.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {/* Before */}
            <div className="bg-white border border-[#EBEBEB] rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-full border border-[#EBEBEB] flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-[#A3A3A3]" />
                </div>
                <p className="text-[#525252] font-semibold text-sm">The old way</p>
              </div>
              <ul className="space-y-4">
                {before.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full border border-[#EBEBEB] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-[#A3A3A3]" />
                      </div>
                      <span className="text-[#525252] text-sm leading-relaxed">{item.text}</span>
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
                <p className="text-[#0A0A0A] font-semibold text-sm">The SomnaFlow way</p>
              </div>
              <ul className="space-y-4">
                {after.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full border border-[#EBEBEB] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-[#D97706]" />
                    </div>
                    <span className="text-[#0A0A0A] text-sm leading-relaxed font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
              <Link href="/intake" className="block mt-7">
                <button className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-semibold py-3.5 rounded-full transition-colors text-sm">
                  Get Started — Free Consultation
                </button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
