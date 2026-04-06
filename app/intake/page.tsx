"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, ArrowRight, CheckCircle, FileText } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import ProgressBar from "@/components/intake/ProgressBar";
import VoiceIntake from "@/components/intake/VoiceIntake";
import SleepQuestions from "@/components/intake/SleepQuestions";
import { useLanguage } from "@/lib/i18n";

type Message = { from: "ai" | "user"; text: string };

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

const summaryDataEs = {
  recommendation: "Fórmula D1 — Día Fresco",
  mechanism: "Daridorexant (DORA)",
  confidence: 94,
  insights: [
    "Retraso significativo del inicio del sueño (>30 min) detectado",
    "Tolerancia previa a melatonina probable según respuestas",
    "Cero somnolencia al día siguiente es requisito principal",
    "Formulación de bajo riesgo de dependencia fuertemente indicada",
  ],
  profile: "Inicio + Mantenimiento del Sueño con Necesidades de Rendimiento",
};

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function IntakePage() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState<Step>(1);
  const [voiceActive, setVoiceActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [qaIndex, setQaIndex] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [generatingDone, setGeneratingDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([]);
  const qaIndexRef = useRef<number>(qaIndex);

  const qaFlow = t.intake.qaFlow;
  const stepLabels = [...t.intake.stepLabels];
  const summary = language === "es" ? summaryDataEs : summaryData;

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    qaIndexRef.current = qaIndex;
  }, [qaIndex]);

  useEffect(() => {
    if (step !== 6 || !generatingDone) return;
    try {
      const userAnswers = messages.filter((m) => m.from === "user").map((m) => m.text);
      const payload = {
        answers: userAnswers,
        recommendation: summary.recommendation,
        mechanism: summary.mechanism,
        confidence: summary.confidence,
        profile: summary.profile,
      };
      localStorage.setItem("somnaflow.intakeSummary", JSON.stringify(payload));
    } catch {
      // Ignore localStorage failures (private mode, etc.)
    }
  }, [generatingDone, messages, step, summary]);

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
    const trimmed = answer.trim();
    if (!trimmed) return;

    const newMessages: Message[] = [
      ...messagesRef.current,
      { from: "user", text: trimmed },
    ];
    messagesRef.current = newMessages;
    setMessages(newMessages);

    const nextIndex = qaIndexRef.current + 1;

    if (nextIndex < qaFlow.length) {
      setQaIndex(nextIndex);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev: Message[]) => {
          const updated: Message[] = [
            ...prev,
            { from: "ai", text: qaFlow[nextIndex].question },
          ];
          messagesRef.current = updated;
          return updated;
        });
        setStep((prev) => (prev < 5 ? ((prev + 1) as Step) : prev));
      }, 1000);
    } else {
      setStep(5);
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        setGeneratingDone(true);
        setStep(6);
      }, 3000);
    }
  };

  const currentOptions: string[] =
    qaIndex < qaFlow.length && step >= 2 && step <= 5 && !isTyping && messages.length > 0
      ? [...qaFlow[qaIndex].options]
      : [];

  return (
    <div className="min-h-screen bg-white">
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
              <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Moon className="w-10 h-10 text-[#D97706]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                  {t.intake.title}
                </h1>
                <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
                  {t.intake.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {t.intake.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm"
                  >
                    <p className="text-[#D97706] font-bold text-xl">{stat.value}</p>
                    <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <VoiceIntake onActivate={startIntake} isActive={false} />

              <p className="text-gray-400 text-xs">
                {t.intake.preferText}{" "}
                <button
                  onClick={startIntake}
                  className="text-[#D97706] hover:underline"
                >
                  {t.intake.preferTextLink}
                </button>
              </p>
            </motion.div>
          )}

          {/* Steps 2–5: Chat flow */}
          {step >= 2 && step <= 5 && !generating && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Voice control */}
              <div className="flex justify-center mb-2">
                <VoiceIntake
                  onActivate={() => {}}
                  isActive={voiceActive}
                  disabled={isTyping}
                  onTranscript={(text) => handleAnswer(text)}
                />
              </div>

              {/* Chat bubbles */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 min-h-60">
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
                  className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#D97706] border-r-amber-300"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t.intake.generating}</h3>
                <p className="text-gray-400 text-sm">{t.intake.analyzingPoints}</p>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#D97706] rounded-full"
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
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 text-sm font-medium">{t.intake.clinicalSummaryReady}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.intake.yourSleepProfile}</h2>
              </div>

              {/* Summary card */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-amber-50 border-b border-amber-100 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-amber-700 text-xs font-bold uppercase tracking-wide">
                      {t.intake.aiRecommendation}
                    </span>
                    <span className="px-3 py-1 bg-amber-100 border border-amber-200 rounded-full text-amber-700 text-xs font-bold">
                      {summary.confidence}% {t.intake.match}
                    </span>
                  </div>
                  <h3 className="text-gray-900 font-bold text-xl">{summary.recommendation}</h3>
                  <p className="text-gray-500 text-sm mt-1">{summary.mechanism}</p>
                </div>

                {/* Insights */}
                <div className="p-5">
                  <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold mb-3">
                    {t.intake.keyInsights}
                  </p>
                  <ul className="space-y-3">
                    {summary.insights.map((insight, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                        </span>
                        <span className="text-gray-600 text-sm leading-relaxed">{insight}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Profile */}
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-500 text-sm">
                        {t.intake.sleepProfile}{" "}
                        <span className="text-gray-900 font-medium">{summary.profile}</span>
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
                <Link href="/consult">
                  <button className="w-full flex items-center justify-center gap-3 bg-[#D97706] hover:bg-[#B45309] text-white font-semibold py-4 rounded-xl text-lg shadow-sm transition-colors">
                    {t.intake.connectPhysician}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/dashboard">
                  <button className="w-full text-gray-400 hover:text-gray-600 text-sm py-2 transition-colors">
                    {t.intake.viewDashboard}
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
