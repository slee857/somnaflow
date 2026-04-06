"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Check,
  FileText,
  Stethoscope,
  Package,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const STAGE_DURATION = 4200;
const TICK = 50;
const TOTAL = 5;

const WAVE = [0.35, 0.7, 0.5, 1.0, 0.6, 0.85, 0.4, 0.9, 0.55, 0.3, 0.75, 0.5];

/* ─── Stage 1: Voice ──────────────────────────────────────────────────────── */
function S1Voice() {
  return (
    <div className="flex flex-col items-center gap-5 h-full pt-2">
      {/* Recording indicator */}
      <div className="flex items-center gap-2">
        <motion.span
          className="w-2 h-2 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#525252]">
          Recording
        </span>
      </div>

      {/* Mic with pulse rings */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-100"
            animate={{
              width: ["48px", `${64 + i * 14}px`],
              height: ["48px", `${64 + i * 14}px`],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.45,
              ease: "easeOut",
            }}
          />
        ))}
        <div className="relative w-12 h-12 rounded-full bg-[#D97706] shadow-lg shadow-amber-200 flex items-center justify-center z-10">
          <Mic className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Waveform */}
      <div className="flex items-center gap-1 h-12 w-full justify-center">
        {WAVE.map((h, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-[#D97706]"
            animate={{
              height: [`${h * 36 + 4}px`, `${(1 - h) * 28 + 4}px`, `${h * 36 + 4}px`],
              opacity: [0.9, 0.5, 0.9],
            }}
            transition={{
              duration: 0.6 + (i % 4) * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.07,
            }}
          />
        ))}
      </div>

      {/* Transcript bubble */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="w-full bg-[#F8F8F8] border border-[#EBEBEB] rounded-xl p-3"
      >
        <p className="text-[9px] uppercase tracking-widest text-[#A3A3A3] font-bold mb-1.5">
          Live Transcript
        </p>
        <p className="text-xs text-[#525252] leading-relaxed">
          &ldquo;I&apos;ve been waking up at 3am every night for months
          — nothing I try seems to work anymore...&rdquo;
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Stage 2: AI Analysis ────────────────────────────────────────────────── */
const DATA_POINTS = [
  "Sleep onset delay: >30 min detected",
  "Supplement tolerance: melatonin ineffective",
  "Grogginess pattern: every morning",
  "Dependency concern: flagged",
];

function S2Analysis() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const timers = DATA_POINTS.map((_, i) =>
      setTimeout(() => setRevealed(i + 1), 300 + i * 620)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const pct = Math.round((revealed / DATA_POINTS.length) * 100);

  return (
    <div className="flex flex-col gap-4 h-full pt-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-5 h-5 rounded-full border-2 border-[#D97706] border-t-transparent"
            animate={{ rotate: revealed < DATA_POINTS.length ? 360 : 0 }}
            transition={{
              duration: 0.7,
              repeat: revealed < DATA_POINTS.length ? Infinity : 0,
              ease: "linear",
            }}
          />
          <span className="text-xs font-bold text-[#0A0A0A]">
            Analyzing intake
          </span>
        </div>
        <span className="text-[10px] text-[#D97706] font-bold">
          {pct}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#EBEBEB] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#D97706] rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Data points */}
      <div className="flex-1 space-y-2.5">
        {DATA_POINTS.map((item, i) => (
          <AnimatePresence key={i}>
            {revealed > i && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5"
              >
                <span className="w-4 h-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#D97706]" />
                </span>
                <span className="text-xs text-[#525252]">{item}</span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Done state */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: revealed >= DATA_POINTS.length ? 1 : 0,
          y: revealed >= DATA_POINTS.length ? 0 : 6,
        }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-2.5"
      >
        <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
        <span className="text-xs text-[#525252] font-medium">
          47 data points analyzed — sending to physician
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Stage 3: Clinical Brief ─────────────────────────────────────────────── */
function S3Brief() {
  const [barPct, setBarPct] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setBarPct(94), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full pt-1">
      {/* Ready badge */}
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
        >
          <Check className="w-3 h-3 text-white" />
        </motion.div>
        <span className="text-xs font-bold text-[#0A0A0A]">
          Clinical Brief Ready
        </span>
      </div>

      {/* Recommendation card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-amber-50 border border-amber-200 rounded-xl p-3"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] uppercase tracking-widest text-amber-600 font-bold">
            AI Recommendation
          </span>
          <span className="text-[10px] font-bold text-amber-700 bg-white px-2 py-0.5 rounded-full border border-amber-200">
            {barPct}% match
          </span>
        </div>
        <p className="text-sm font-black text-[#0A0A0A] leading-tight">
          Formula D1 — Day-Fresh
        </p>
        <p className="text-xs text-[#D97706] font-semibold mt-0.5">
          Daridorexant 25mg
        </p>
      </motion.div>

      {/* Confidence bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex justify-between mb-1.5">
          <span className="text-[10px] text-[#A3A3A3] font-medium">
            Confidence score
          </span>
          <span className="text-[10px] text-[#D97706] font-bold">{barPct}%</span>
        </div>
        <div className="h-2 bg-[#EBEBEB] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#D97706] rounded-full"
            animate={{ width: `${barPct}%` }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.6 }}
          />
        </div>
      </motion.div>

      {/* Sleep profile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="border border-[#EBEBEB] rounded-xl p-3 flex items-start gap-2.5"
      >
        <FileText className="w-4 h-4 text-[#A3A3A3] mt-0.5 shrink-0" />
        <div>
          <p className="text-[9px] uppercase tracking-widest text-[#A3A3A3] font-bold mb-0.5">
            Sleep Profile
          </p>
          <p className="text-xs text-[#525252] leading-snug">
            Sleep Onset + Maintenance with Performance Needs
          </p>
        </div>
      </motion.div>

      {/* Sending indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="flex items-center justify-between text-xs text-[#D97706] font-semibold"
      >
        <span>Routing to Dr. Sarah Chen, MD</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          →
        </motion.span>
      </motion.div>
    </div>
  );
}

/* ─── Stage 4: Doctor Rx ──────────────────────────────────────────────────── */
function S4Doctor() {
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSigned(true), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full pt-1">
      {/* Doctor profile */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-3 bg-[#F8F8F8] border border-[#EBEBEB] rounded-xl"
      >
        <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xs font-bold shrink-0">
          SC
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#0A0A0A] leading-tight">
            Dr. Sarah Chen, MD
          </p>
          <p className="text-[10px] text-[#A3A3A3]">
            Sleep Medicine · Board Certified
          </p>
        </div>
        <span className="text-[9px] text-green-600 font-bold bg-green-50 border border-green-200 px-2 py-0.5 rounded-full shrink-0">
          Online
        </span>
      </motion.div>

      {/* Prescription form */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border border-[#EBEBEB] rounded-xl overflow-hidden flex-1"
      >
        <div className="bg-[#0A0A0A] px-3 py-2 flex items-center gap-1.5">
          <Stethoscope className="w-3.5 h-3.5 text-[#D97706]" />
          <span className="text-[10px] text-white font-bold uppercase tracking-wider">
            Prescription
          </span>
        </div>
        <div className="p-3 space-y-2">
          {[
            ["Rx", "Daridorexant 25mg"],
            ["Sig", "1 tablet 30 min before bed"],
            ["Qty", "30-day supply · 3 refills"],
          ].map(([label, value], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.25 }}
              className="flex gap-2.5 text-xs"
            >
              <span className="text-[#A3A3A3] font-bold w-6 shrink-0">
                {label}
              </span>
              <span className="text-[#525252]">{value}</span>
            </motion.div>
          ))}

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: signed ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="pt-2 border-t border-[#EBEBEB]"
          >
            <p
              className="text-[11px] text-[#A3A3A3] italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Sarah Chen, MD &nbsp;·&nbsp; NPI #1234567890
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Approved */}
      <AnimatePresence>
        {signed && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-xl p-2.5"
          >
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-green-700 font-semibold">
              Approved & sent to pharmacy
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Stage 5: Delivery ───────────────────────────────────────────────────── */
const DELIVERY_STEPS = [
  { label: "Prescription received", done: true, active: false, delay: 0.2 },
  { label: "Pharmacy packed & sealed", done: true, active: false, delay: 0.6 },
  { label: "FedEx Priority — in transit", done: false, active: true, delay: 1.0 },
  { label: "Delivered to your door", done: false, active: false, delay: 0 },
];

function S5Delivery() {
  return (
    <div className="flex flex-col gap-3 h-full pt-1">
      {/* Package header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl"
      >
        <div className="w-10 h-10 rounded-xl bg-[#D97706] flex items-center justify-center shrink-0">
          <Package className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#0A0A0A]">
            Formula D1 · Daridorexant 25mg
          </p>
          <p className="text-[10px] text-[#A3A3A3]">
            Discreet packaging · No labels
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="flex-1 relative pl-5 space-y-3.5 py-1">
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-[#EBEBEB]" />

        {DELIVERY_STEPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: s.delay || 0, duration: 0.3 }}
            className="flex items-center gap-3 relative"
          >
            {/* Dot */}
            <div
              className={`absolute -left-[13px] w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center ${
                s.done
                  ? "bg-[#D97706] border-[#D97706]"
                  : s.active
                  ? "bg-white border-[#D97706]"
                  : "bg-white border-[#EBEBEB]"
              }`}
            >
              {s.done && <Check className="w-2.5 h-2.5 text-white" />}
              {s.active && (
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#D97706]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>

            <span
              className={`text-xs leading-snug ${
                s.done
                  ? "text-[#0A0A0A] font-medium"
                  : s.active
                  ? "text-[#D97706] font-semibold"
                  : "text-[#A3A3A3]"
              }`}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ETA block */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="flex items-center justify-between bg-[#0A0A0A] text-white rounded-xl px-4 py-3"
      >
        <div>
          <p className="text-[9px] text-[#A3A3A3] uppercase tracking-widest mb-0.5">
            Estimated Arrival
          </p>
          <p className="text-sm font-black">Tomorrow by 8 PM</p>
        </div>
        <span className="text-2xl">📦</span>
      </motion.div>
    </div>
  );
}

/* ─── Orchestrator ────────────────────────────────────────────────────────── */
const STAGE_COMPONENTS = [S1Voice, S2Analysis, S3Brief, S4Doctor, S5Delivery];
const STAGE_LABELS = [
  "Voice Intake",
  "AI Analysis",
  "Clinical Brief",
  "Doctor Rx",
  "Dispatched",
];

export default function HeroDemo() {
  const { t } = useLanguage();
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + TICK / STAGE_DURATION;
        if (next >= 1) {
          setStage((s) => (s + 1) % TOTAL);
          return 0;
        }
        return next;
      });
    }, TICK);
    return () => clearInterval(id);
  }, []);

  const StageComp = STAGE_COMPONENTS[stage];

  return (
    <div className="bg-[#F8F8F8] border border-[#EBEBEB] rounded-3xl p-5 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-[#D97706]/8 blur-3xl pointer-events-none" />

      {/* Header: stage dots + label */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-1.5">
          {STAGE_LABELS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setStage(i); setProgress(0); }}
              className="group"
              aria-label={STAGE_LABELS[i]}
            >
              <motion.div
                className={`rounded-full transition-all duration-300 ${
                  i === stage
                    ? "bg-[#D97706] w-5 h-2"
                    : i < stage
                    ? "bg-amber-300 w-2 h-2"
                    : "bg-[#EBEBEB] w-2 h-2"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-semibold text-[#D97706] uppercase tracking-wide">
            {STAGE_LABELS[stage]}
          </span>
          <span className="text-[10px] text-[#A3A3A3]">
            {stage + 1}/{TOTAL}
          </span>
        </div>
      </div>

      {/* Stage content — fixed height to prevent layout shifts */}
      <div className="bg-white border border-[#EBEBEB] rounded-2xl p-4 min-h-[280px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="h-full"
          >
            <StageComp />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-3 relative z-10">
        <div className="h-1 bg-[#EBEBEB] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#D97706] rounded-full"
            style={{ width: `${((stage + progress) / TOTAL) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-[#A3A3A3] font-medium">
            {t.hero.autoDemo}
          </span>
          <span className="text-[10px] text-[#D97706] font-semibold">
            {Math.round(((stage + progress) / TOTAL) * 100)}% complete
          </span>
        </div>
      </div>
    </div>
  );
}
