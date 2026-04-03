"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ArrowRight, CheckCircle, Sparkles, FileText } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ProgressBar from "@/components/intake/ProgressBar";
import VoiceIntake from "@/components/intake/VoiceIntake";
import SleepQuestions from "@/components/intake/SleepQuestions";

type Message = { from: "ai" | "user"; text: string };

const qaFlow = [
  {
    question: "How long does it typically take you to fall asleep after getting into bed?",
    options: ["Less than 15 min", "15–30 min", "30–60 min", "More than 1 hour"],
  },
  {
    question: "Have you tried melatonin or other sleep supplements before?",
    options: ["Never tried", "Tried, didn't work", "Tried, helped a little", "Still using them"],
  },
  {
    question: "Do you experience grogginess or \"brain fog\" the morning after?",
    options: ["Never", "Occasionally", "Most mornings", "Every single morning"],
  },
  {
    question: "Are you concerned about dependency or addiction to sleep medication?",
    options: ["Not at all", "Somewhat concerned", "Very concerned", "That's my #1 concern"],
  },
];

const stepLabels = ["Welcome", "Sleep Onset", "Supplements", "Mornings", "Dependency", "Results"];

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const summaryData = {
  recommendation: "Formula D1 — Day-Fresh",
  mechanism: "Daridorexant (DORA)",
  confidence: 94,
  insights: [
    "Significant sleep onset delay (>30 min) detected",
    "Previous melatonin tolerance likely based on responses",
    "Zero next-day grogginess is a primary treatment requirement",
    "Low dependency-risk formulation strongly indicated",
  ],
  profile: "Sleep Onset + Maintenance with Performance Needs",
};

export default function IntakePage() {
  const [step, setStep] = useState<Step>(1);
  const [voiceActive, setVoiceActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [qaIndex, setQaIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generatingDone, setGeneratingDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const startIntake = () => {
    setVoiceActive(true);
    setStep(2);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([{ from: "ai", text: qaFlow[0].question }]);
    }, 1200);
  };

  const handleAnswer = (answer: string) => {
    const newMessages: Message[] = [...messages, { from: "user", text: answer }];
    setMessages(newMessages);
    const nextIndex = qaIndex + 1;

    if (nextIndex < qaFlow.length) {
      setQaIndex(nextIndex);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { from: "ai", text: qaFlow[nextIndex].question }]);
        setStep((prev) => (prev < 5 ? ((prev + 1) as Step) : prev));
      }, 1000);
    } else {
      // Done — go to summary
      setStep(5);
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        setGeneratingDone(true);
        setStep(6);
      }, 3000);
    }
  };

  const currentOptions =
    qaIndex < qaFlow.length && step >= 2 && step <= 5 && !isTyping && messages.length > 0
      ? qaFlow[qaIndex].options
      : [];

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Progress */}
        {step > 1 && step < 6 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <ProgressBar currentStep={step} totalSteps={6} labels={stepLabels} />
          </motion.div>
        )}

        {/* Step 1: Welcome */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="text-center flex flex-col items-center gap-8 pt-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#4ECDC4]/15 border border-[#4ECDC4]/30 flex items-center justify-center">
                <Moon className="w-10 h-10 text-[#4ECDC4]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Your Sleep Consultation
                </h1>
                <p className="text-[#94A3B8] text-lg max-w-md mx-auto leading-relaxed">
                  Answer 4 quick questions. Our AI analyzes your sleep profile and generates a clinical summary for your physician.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {[
                  { value: "2 min", label: "To complete" },
                  { value: "100%", label: "Confidential" },
                  { value: "Free", label: "No obligation" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-[#1A2540] border border-[#2A3550] rounded-xl p-4 text-center"
                  >
                    <p className="text-[#4ECDC4] font-bold text-xl">{stat.value}</p>
                    <p className="text-[#64748B] text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <VoiceIntake onActivate={startIntake} isActive={false} />

              <p className="text-[#475569] text-xs">
                Prefer text?{" "}
                <button
                  onClick={startIntake}
                  className="text-[#4ECDC4] hover:underline"
                >
                  Use text questions instead
                </button>
              </p>
            </motion.div>
          )}

          {/* Steps 2–5: Chat flow */}
          {step >= 2 && step <= 5 && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Voice control */}
              <div className="flex justify-center mb-2">
                <VoiceIntake onActivate={() => {}} isActive={voiceActive} />
              </div>

              {/* Chat bubbles */}
              <div className="bg-[#1A2540]/50 border border-[#2A3550] rounded-2xl p-5 min-h-60">
                <SleepQuestions
                  messages={messages}
                  options={currentOptions}
                  onAnswer={handleAnswer}
                  isTyping={isTyping}
                />
                <div ref={bottomRef} />
              </div>
            </motion.div>
          )}

          {/* Generating state */}
          {step === 5 && generating && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-8 pt-10"
            >
              <div className="relative w-24 h-24">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#4ECDC4]/30"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#4ECDC4] border-r-[#6B8AFF]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#4ECDC4]" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">Generating your clinical summary...</h3>
                <p className="text-[#64748B] text-sm">AI analyzing 47 data points</p>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-1.5 bg-[#1A2540] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#4ECDC4] to-[#6B8AFF] rounded-full"
                    initial={{ width: "10%" }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 2.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Results */}
          {step === 6 && generatingDone && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              <div className="text-center mb-2">
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Clinical Summary Ready</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Sleep Profile</h2>
              </div>

              {/* Summary card */}
              <div className="bg-[#1A2540] border border-[#2A3550] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#4ECDC4]/10 to-[#6B8AFF]/10 border-b border-[#2A3550] p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#4ECDC4] text-xs font-bold uppercase tracking-wide">
                      AI Recommendation
                    </span>
                    <span className="px-3 py-1 bg-[#4ECDC4]/15 border border-[#4ECDC4]/30 rounded-full text-[#4ECDC4] text-xs font-bold">
                      {summaryData.confidence}% match
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-xl">{summaryData.recommendation}</h3>
                  <p className="text-[#94A3B8] text-sm mt-1">{summaryData.mechanism}</p>
                </div>

                {/* Insights */}
                <div className="p-5">
                  <p className="text-[#64748B] text-xs uppercase tracking-wide font-semibold mb-3">
                    Key Insights
                  </p>
                  <ul className="space-y-3">
                    {summaryData.insights.map((insight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#4ECDC4]/20 border border-[#4ECDC4]/30 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4ECDC4]" />
                        </span>
                        <span className="text-[#94A3B8] text-sm leading-relaxed">{insight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Profile */}
                  <div className="mt-5 pt-5 border-t border-[#2A3550]">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#64748B]" />
                      <p className="text-[#64748B] text-sm">
                        Sleep Profile:{" "}
                        <span className="text-white font-medium">{summaryData.profile}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-bold py-4 rounded-2xl text-lg shadow-xl shadow-[#4ECDC4]/25 transition-all"
                  >
                    Connect with a Licensed Physician
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link href="/dashboard">
                  <button className="w-full text-[#64748B] hover:text-[#94A3B8] text-sm py-2 transition-colors">
                    View Physician Dashboard →
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
