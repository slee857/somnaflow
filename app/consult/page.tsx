"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Stethoscope,
  FileText,
  Send,
  Clock,
  ShieldCheck,
  Pill,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

type Stage =
  | "matching"
  | "review"
  | "chat"
  | "writing"
  | "prescription"
  | "complete";

type ChatMsg = {
  from: "doctor" | "patient";
  text: string;
  time: string;
};

const DOCTOR = {
  name: "Dr. Sarah Chen, MD",
  specialty: "Sleep Medicine · Board Certified",
  avatar: "SC",
  license: "CA-MD-92847",
  years: "12 years experience",
};

const RX = {
  drug: "Daridorexant",
  brand: "Formula D1 — Day-Fresh",
  dose: "25mg",
  sig: "Take 1 tablet by mouth 30 minutes before bedtime",
  supply: "30 tablets (30-day supply)",
  refills: "3 refills authorized",
  dea: "Non-controlled substance",
  ndc: "NDC 0078-1234-30",
  date: "April 3, 2026",
};

function now() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ConsultPage() {
  const [stage, setStage] = useState<Stage>("matching");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [patientAnswered, setPatientAnswered] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-advance through stages
  useEffect(() => {
    if (stage === "matching") {
      const t = setTimeout(() => setStage("review"), 2500);
      return () => clearTimeout(t);
    }
    if (stage === "review") {
      const t = setTimeout(() => setStage("chat"), 2800);
      return () => clearTimeout(t);
    }
    if (stage === "chat" && messages.length === 0) {
      // Doctor sends first message
      setIsTyping(true);
      const t1 = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            from: "doctor",
            text: "Hello! I've reviewed your AI consultation summary. You've had trouble falling asleep for over 3 years, tried melatonin without lasting results, and you're concerned about dependency. I have just a couple of quick follow-up questions before I finalize your prescription.",
            time: now(),
          },
        ]);
      }, 1800);

      const t2 = setTimeout(() => {
        setIsTyping(true);
      }, 3000);

      const t3 = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            from: "doctor",
            text: "Are you currently taking any medications (prescription or OTC)? And do you have any known drug allergies?",
            time: now(),
          },
        ]);
      }, 4800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [stage, messages.length]);

  // After patient answers, doctor replies then writes Rx
  useEffect(() => {
    if (!patientAnswered) return;

    setIsTyping(true);
    const t1 = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "doctor",
          text: "Thank you. Based on your profile — chronic sleep onset difficulty, melatonin resistance, and your concern about dependency — I'm recommending Daridorexant (Formula D1).",
          time: now(),
        },
      ]);
    }, 1800);

    const t2 = setTimeout(() => setIsTyping(true), 3800);

    const t3 = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "doctor",
          text: "This is the latest DORA-class medication. It works by gently blocking the brain's wake-promoting orexin signals — rather than sedating you — so you fall asleep naturally and wake up feeling sharp. No dependency risk. No grogginess.",
          time: now(),
        },
      ]);
    }, 5600);

    const t4 = setTimeout(() => setIsTyping(true), 8000);

    const t5 = setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: "doctor",
          text: "I'm writing your prescription now. You'll see it appear below. If you have any questions after you start, you can message me directly through the portal.",
          time: now(),
        },
      ]);
      setStage("writing");
    }, 9800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [patientAnswered]);

  useEffect(() => {
    if (stage === "writing") {
      const t = setTimeout(() => setStage("prescription"), 3000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || patientAnswered) return;
    setMessages((prev) => [
      ...prev,
      { from: "patient", text: inputValue.trim(), time: now() },
    ]);
    setInputValue("");
    setPatientAnswered(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-24">
        {/* ── MATCHING ── */}
        <AnimatePresence mode="wait">
          {stage === "matching" && (
            <motion.div
              key="matching"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 pt-12 text-center"
            >
              <div className="relative">
                <motion.div
                  className="w-24 h-24 rounded-full border-4 border-teal-100 border-t-teal-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Matching you with a physician
                </h2>
                <p className="text-slate-500 text-sm">
                  Finding a board-certified sleep specialist available now…
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                {["Reviewing your intake summary", "Checking physician availability", "Connecting…"].map(
                  (step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.4 }}
                      className="flex items-center gap-3 text-sm text-slate-500"
                    >
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"
                      />
                      {step}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}

          {/* ── REVIEW ── */}
          {stage === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 pt-8 text-center"
            >
              {/* Doctor card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm w-full">
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-xl font-bold text-teal-700">
                      {DOCTOR.avatar}
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-slate-900 font-bold text-lg">{DOCTOR.name}</h3>
                    <p className="text-slate-500 text-sm">{DOCTOR.specialty}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{DOCTOR.years}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-3">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-teal-500 shrink-0"
                  />
                  <span className="text-teal-700 text-sm font-medium">
                    Reviewing your clinical summary…
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Your physician will message you in a moment.
              </p>
            </motion.div>
          )}

          {/* ── CHAT ── */}
          {(stage === "chat" || stage === "writing" || stage === "prescription") && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              {/* Doctor header */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center font-bold text-sm text-teal-700">
                    SC
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-semibold text-sm">{DOCTOR.name}</p>
                  <p className="text-slate-400 text-xs">{DOCTOR.specialty}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                  HIPAA Secure
                </div>
              </div>

              {/* Chat messages */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 min-h-72 flex flex-col gap-4">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`flex ${msg.from === "patient" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.from === "doctor" && (
                        <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-700 mr-2.5 mt-1 shrink-0">
                          SC
                        </div>
                      )}
                      <div className="max-w-sm">
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.from === "doctor"
                              ? "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                              : "bg-teal-600 text-white rounded-tr-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <p className="text-slate-400 text-[10px] mt-1 px-1">{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-700 shrink-0">
                      SC
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="flex gap-1.5 items-center h-4">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-teal-400"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Writing Rx indicator */}
                {stage === "writing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-white border border-teal-100 rounded-xl px-4 py-3 shadow-sm"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <FileText className="w-4 h-4 text-teal-500" />
                    </motion.div>
                    <span className="text-slate-600 text-sm">Dr. Chen is writing your prescription…</span>
                    <div className="ml-auto flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1 h-1 rounded-full bg-teal-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input — only while chat stage and not yet answered */}
              {stage === "chat" && (
                <form onSubmit={handleSend} className="flex gap-3">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={patientAnswered}
                    placeholder={
                      patientAnswered
                        ? "Waiting for Dr. Chen…"
                        : "Type your reply…"
                    }
                    className="flex-1 bg-white border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={patientAnswered || !inputValue.trim()}
                    className="w-11 h-11 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4 text-white disabled:text-slate-400" />
                  </button>
                </form>
              )}

              {/* Prescription card */}
              {stage === "prescription" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 mt-2"
                >
                  {/* Approved badge */}
                  <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-full px-5 py-2.5 w-fit mx-auto">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-semibold text-sm">
                      Prescription Approved
                    </span>
                  </div>

                  {/* Rx card */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Pill className="w-5 h-5 text-teal-600" />
                        <span className="font-bold text-slate-900">Official Prescription</span>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">{RX.ndc}</span>
                    </div>

                    {/* Body */}
                    <div className="px-6 py-5 space-y-5">
                      {/* Drug */}
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">
                          Medication
                        </p>
                        <p className="text-slate-900 text-xl font-bold">
                          {RX.drug} {RX.dose}
                        </p>
                        <p className="text-teal-600 text-sm font-medium">{RX.brand}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        {[
                          { label: "Directions", value: RX.sig },
                          { label: "Supply", value: RX.supply },
                          { label: "Refills", value: RX.refills },
                          { label: "Schedule", value: RX.dea },
                        ].map((item) => (
                          <div key={item.label}>
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">
                              {item.label}
                            </p>
                            <p className="text-slate-700 text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Physician signature */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-slate-400 text-xs mb-0.5">Prescribing Physician</p>
                          <p className="text-slate-900 font-semibold text-sm">{DOCTOR.name}</p>
                          <p className="text-slate-400 text-xs">License #{DOCTOR.license}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-xs mb-0.5">Date Issued</p>
                          <p className="text-slate-900 text-sm font-medium">{RX.date}</p>
                          <div className="flex items-center gap-1 mt-1 justify-end">
                            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                            <span className="text-teal-600 text-xs">Digitally Signed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery note */}
                  <div className="flex items-center gap-3 bg-teal-50 border border-teal-100 rounded-xl px-5 py-4">
                    <Clock className="w-5 h-5 text-teal-600 shrink-0" />
                    <div>
                      <p className="text-teal-800 text-sm font-semibold">
                        Ready to ship — enter your address to start delivery
                      </p>
                      <p className="text-teal-600 text-xs mt-0.5">
                        Estimated arrival: tomorrow by 8 PM
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href="/checkout?rx=D1">
                    <button className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl text-lg shadow-sm transition-colors">
                      Enter Delivery Address & Complete Order
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <p className="text-center text-slate-400 text-xs">
                    Compounded at an FDA-registered pharmacy · Discreet packaging
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
