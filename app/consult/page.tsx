"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Send, CheckCircle, ArrowRight,
  ShieldCheck, Pill, FileText, Volume2, VolumeX,
  Clock, Stethoscope,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

type Stage = "matching" | "review" | "chat" | "writing" | "prescription";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

const DOCTOR = {
  name: "Dr. Sarah Chen, MD",
  specialty: "Sleep Medicine · Board Certified",
  license: "CA-MD-92847",
  photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80",
};

const RX_TEMPLATES = {
  onset: {
    drug: "Ramelteon",
    brand: "Formula S1 — Rapid-Melt",
    dose: "8mg",
    sig: "Take 1 tablet by mouth 30 minutes before bedtime",
    supply: "30 tablets (30-day supply)",
    refills: "3 refills authorized",
    schedule: "Non-controlled substance",
    rationale: "Melatonin receptor agonist — clinically superior onset with zero dependency risk",
  },
  maintenance: {
    drug: "Daridorexant",
    brand: "Formula D1 — Day-Fresh",
    dose: "25mg",
    sig: "Take 1 tablet by mouth 30 minutes before bedtime",
    supply: "30 tablets (30-day supply)",
    refills: "3 refills authorized",
    schedule: "Non-controlled substance",
    rationale: "DORA-class agent — targets orexin pathway for maintenance with zero grogginess",
  },
};

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function detectRxType(messages: ChatMsg[]): "onset" | "maintenance" {
  const fullText = messages.map((m) => m.content).join(" ").toLowerCase();
  if (
    fullText.includes("stay asleep") ||
    fullText.includes("wake up") ||
    fullText.includes("maintenance") ||
    fullText.includes("through the night")
  ) return "maintenance";
  return "onset";
}

export default function ConsultPage() {
  const [stage, setStage] = useState<Stage>("matching");
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [displayMsgs, setDisplayMsgs] = useState<Array<ChatMsg & { time: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rxType, setRxType] = useState<"onset" | "maintenance">("onset");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muteAudio, setMuteAudio] = useState(false);
  const [intakeSeed, setIntakeSeed] = useState<string | null>(null);

  // Voice recording
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMsgs, isTyping]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("somnaflow.intakeSummary");
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        answers?: string[];
        recommendation?: string;
        mechanism?: string;
        confidence?: number;
        profile?: string;
      };
      const answers = parsed.answers ?? [];
      const answersText = Array.isArray(answers) ? answers.join("\n") : String(answers);
      const summaryText = `AI summary: ${parsed.recommendation ?? ""} | ${parsed.mechanism ?? ""} (${parsed.confidence ?? ""}% confidence) | Profile: ${parsed.profile ?? ""}`.trim();
      const seed = `Intake answers (voice transcription + user responses):\n${answersText}\n\n${summaryText}`.trim();
      setIntakeSeed(seed);
    } catch {
      // Ignore localStorage failures
    }
  }, []);

  // Stage auto-advance
  useEffect(() => {
    if (stage === "matching") {
      const t = setTimeout(() => setStage("review"), 2800);
      return () => clearTimeout(t);
    }
    if (stage === "review") {
      const t = setTimeout(() => {
        setStage("chat");
        sendDoctorOpener();
      }, 2500);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const speakText = useCallback(async (text: string) => {
    if (muteAudio) return;
    try {
      setIsSpeaking(true);
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setIsSpeaking(false); URL.revokeObjectURL(url); };
      audio.onerror = () => setIsSpeaking(false);
      audio.play();
    } catch {
      setIsSpeaking(false);
    }
  }, [muteAudio]);

  const addDoctorMessage = useCallback((content: string) => {
    const msg: ChatMsg = { role: "assistant", content };
    setMessages((prev) => [...prev, msg]);
    setDisplayMsgs((prev) => [...prev, { ...msg, time: now() }]);
    speakText(content);
    return msg;
  }, [speakText]);

  const sendDoctorOpener = useCallback(async () => {
    if (intakeSeed) {
      const seedUser: ChatMsg = { role: "user", content: intakeSeed };
      // Small pause to feel like a connection.
      setIsTyping(true);
      await new Promise((r) => setTimeout(r, 900));
      setIsTyping(false);
      setMessages([seedUser]);
      await callDoctorAPI([seedUser]);
      return;
    }

    const opener =
      "Hello! I'm Dr. Chen. I've reviewed your intake summary. Before I finalize your prescription, I'd like to ask you a few clinical questions. First — how long have you been having trouble sleeping? Is this something that's been going on for weeks, months, or longer?";
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsTyping(false);
    addDoctorMessage(opener);
    setMessages([{ role: "assistant", content: opener }]);
  }, [addDoctorMessage, intakeSeed]);

  const callDoctorAPI = useCallback(async (updatedMessages: ChatMsg[]) => {
    setIsLoading(true);
    setIsTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      const content: string = data.content ?? "Let me think about that for a moment...";
      setIsTyping(false);

      // Detect prescription in response
      const isPrescription =
        content.toLowerCase().includes("prescribe") &&
        content.toLowerCase().includes("pharmacy");

      addDoctorMessage(content);

      if (isPrescription) {
        setRxType(detectRxType(updatedMessages));
        setStage("writing");
        setTimeout(() => setStage("prescription"), 3500);
      }

      return { role: "assistant" as const, content };
    } catch {
      setIsTyping(false);
      const fallback = "I apologize — I had a brief connection issue. Could you repeat that?";
      addDoctorMessage(fallback);
      return { role: "assistant" as const, content: fallback };
    } finally {
      setIsLoading(false);
    }
  }, [addDoctorMessage]);

  const handleSendText = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;
    setInputValue("");

    const userMsg: ChatMsg = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setDisplayMsgs((prev) => [...prev, { ...userMsg, time: now() }]);

    await callDoctorAPI(updated);
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordingBlob(blob);
        stream.getTracks().forEach((t) => t.stop());
        await handleVoiceSubmit(blob);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      alert("Microphone access required for voice chat.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleVoiceSubmit = async (blob: Blob) => {
    setIsLoading(true);
    try {
      const form = new FormData();
      form.append("audio", blob, "recording.webm");
      const res = await fetch("/api/transcribe", { method: "POST", body: form });
      const data = await res.json();
      const text: string = data.text?.trim() ?? "";
      if (!text) return;

      const userMsg: ChatMsg = { role: "user", content: text };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setDisplayMsgs((prev) => [...prev, { ...userMsg, time: now() }]);
      await callDoctorAPI(updated);
    } catch {
      setIsLoading(false);
    }
  };

  const rx = RX_TEMPLATES[rxType];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-24">

        {/* MATCHING */}
        <AnimatePresence mode="wait">
          {stage === "matching" && (
            <motion.div key="matching" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-8 pt-12 text-center">
              <div className="relative">
                <motion.div className="w-24 h-24 rounded-full border-4 border-amber-200 border-t-[#D97706]"
                  animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-[#D97706]" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Connecting you to a physician</h2>
                <p className="text-slate-500 text-sm">Matching with a board-certified sleep specialist…</p>
              </div>
              <div className="flex flex-col gap-2.5 w-full max-w-xs text-left">
                {["Analyzing your intake summary", "Checking physician availability", "Connecting securely…"].map((s, i) => (
                  <motion.div key={s} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.4 }} className="flex items-center gap-3 text-sm text-slate-500">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* REVIEW */}
          {stage === "review" && (
            <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 pt-8 text-center">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm w-full">
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-200">
                      <Image src={DOCTOR.photo} alt={DOCTOR.name} width={64} height={64}
                        className="object-cover w-full h-full" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-slate-900 font-bold text-lg">{DOCTOR.name}</h3>
                    <p className="text-slate-500 text-sm">{DOCTOR.specialty}</p>
                    <p className="text-slate-400 text-xs mt-0.5">License #{DOCTOR.license}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-amber-700 text-sm font-medium">Reviewing your clinical intake…</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">Dr. Chen will begin the consultation momentarily.</p>
            </motion.div>
          )}

          {/* CHAT */}
          {(stage === "chat" || stage === "writing" || stage === "prescription") && (
            <motion.div key="chat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4">

              {/* Doctor header */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-200">
                    <Image src={DOCTOR.photo} alt={DOCTOR.name} width={40} height={40}
                      className="object-cover w-full h-full" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 font-semibold text-sm truncate">{DOCTOR.name}</p>
                  <p className="text-slate-400 text-xs">{DOCTOR.specialty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    if (isSpeaking && audioRef.current) { audioRef.current.pause(); setIsSpeaking(false); }
                    setMuteAudio((m) => !m);
                  }} className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    title={muteAudio ? "Unmute" : "Mute"}>
                    {muteAudio ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#D97706]" />}
                  </button>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
                    HIPAA Secure
                  </div>
                </div>
              </div>

              {/* Chat window */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 min-h-80 flex flex-col gap-4 overflow-y-auto max-h-[460px]">
                <AnimatePresence initial={false}>
                  {displayMsgs.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-200 mr-2.5 mt-1 shrink-0">
                          <Image src={DOCTOR.photo} alt="Dr" width={28} height={28} className="object-cover" />
                        </div>
                      )}
                      <div className="max-w-sm">
                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "assistant"
                            ? "bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm"
                            : "bg-[#D97706] text-white rounded-tr-none"
                        }`}>
                          {msg.content}
                        </div>
                        <p className="text-slate-400 text-[10px] mt-1 px-1">{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing */}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2.5">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-200 shrink-0">
                      <Image src={DOCTOR.photo} alt="Dr" width={28} height={28} className="object-cover" />
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="flex gap-1.5 items-center h-4">
                        {[0, 1, 2].map((j) => (
                          <motion.span key={j} className="w-1.5 h-1.5 rounded-full bg-[#D97706]"
                            animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: j * 0.15 }} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Writing Rx */}
                {stage === "writing" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-3 bg-white border border-amber-200 rounded-xl px-4 py-3 shadow-sm">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                      <FileText className="w-4 h-4 text-[#D97706]" />
                    </motion.div>
                    <span className="text-slate-600 text-sm">Dr. Chen is writing your prescription…</span>
                    <div className="ml-auto flex gap-1">
                      {[0, 1, 2].map((j) => (
                        <motion.span key={j} className="w-1 h-1 rounded-full bg-[#D97706]"
                          animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Speaker indicator */}
                {isSpeaking && !muteAudio && (
                  <div className="flex items-center gap-2 text-xs text-[#D97706]">
                    <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                      <Volume2 className="w-3.5 h-3.5" />
                    </motion.div>
                    Dr. Chen is speaking…
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input area */}
              {(stage === "chat" || stage === "writing") && (
                <div className="space-y-3">
                  {/* Text input */}
                  <form onSubmit={(e) => { e.preventDefault(); handleSendText(); }}
                    className="flex gap-3">
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                      disabled={isLoading || isRecording || stage === "writing"}
                      placeholder={isRecording ? "Recording… tap stop when done" : isLoading ? "Dr. Chen is responding…" : "Type your answer or use voice below"}
                      className="flex-1 bg-white border border-slate-200 focus:border-amber-200 focus:ring-2 focus:ring-amber-50 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-400" />
                    <button type="submit" disabled={isLoading || isRecording || !inputValue.trim() || stage === "writing"}
                      className="w-11 h-11 rounded-xl bg-[#D97706] hover:bg-[#D97706] disabled:bg-slate-200 flex items-center justify-center transition-colors shrink-0">
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </form>

                  {/* Voice button */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px bg-slate-200 flex-1" />
                    <span className="text-slate-400 text-xs">or speak</span>
                    <div className="h-px bg-slate-200 flex-1" />
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isLoading || stage === "writing"}
                      className={`relative flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all shadow-sm ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-white border border-slate-200 hover:border-amber-200 text-slate-700 hover:text-amber-700 disabled:opacity-50"
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-white" />
                          <MicOff className="w-4 h-4" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4" />
                          Hold to Speak
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* PRESCRIPTION */}
              {stage === "prescription" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 mt-2">

                  <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-full px-5 py-2.5 w-fit mx-auto">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-semibold text-sm">Prescription Approved & Signed</span>
                  </div>

                  {/* Prescription card */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Pill className="w-5 h-5 text-[#D97706]" />
                        <span className="font-bold text-slate-900">Official Prescription</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-white border border-slate-200 px-2 py-1 rounded-lg">
                        NDC 0078-1234-30
                      </span>
                    </div>

                    <div className="px-6 py-5 space-y-5">
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mb-1">Medication</p>
                        <p className="text-slate-900 text-2xl font-bold">{rx.drug} {rx.dose}</p>
                        <p className="text-[#D97706] text-sm font-medium mt-0.5">{rx.brand}</p>
                        <p className="text-slate-500 text-xs mt-1 italic">{rx.rationale}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        {[
                          { label: "Directions", value: rx.sig },
                          { label: "Supply", value: rx.supply },
                          { label: "Refills", value: rx.refills },
                          { label: "Schedule", value: rx.schedule },
                        ].map((item) => (
                          <div key={item.label}>
                            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide mb-0.5">{item.label}</p>
                            <p className="text-slate-700 text-sm">{item.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Doctor signature */}
                      <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-200 shrink-0">
                          <Image src={DOCTOR.photo} alt={DOCTOR.name} width={48} height={48} className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-900 font-semibold text-sm">{DOCTOR.name}</p>
                          <p className="text-slate-400 text-xs">License #{DOCTOR.license}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <ShieldCheck className="w-3 h-3 text-[#D97706]" />
                            <span className="text-[#D97706] text-xs">Digitally signed &amp; verified</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-slate-400 text-xs">Issued</p>
                          <p className="text-slate-900 text-sm font-medium">April 3, 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
                    <Clock className="w-5 h-5 text-[#D97706] shrink-0" />
                    <div>
                      <p className="text-[#D97706] text-sm font-semibold">Ready to ship — enter your address</p>
                      <p className="text-[#D97706] text-xs mt-0.5">Estimated arrival: tomorrow by 8 PM · Discreet packaging</p>
                    </div>
                  </div>

                  <Link href="/checkout?rx=auto">
                    <button className="w-full flex items-center justify-center gap-3 bg-[#D97706] hover:bg-[#D97706] text-white font-bold py-4 rounded-xl text-lg shadow-sm transition-colors">
                      Enter Delivery Address &amp; Complete Order
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <p className="text-center text-slate-400 text-xs">
                    FDA-registered compounding pharmacy · Non-controlled substance · No dependency risk
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
