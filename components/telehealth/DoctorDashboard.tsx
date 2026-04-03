"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Brain,
  Pill,
  CheckCircle,
  Video,
  ChevronDown,
  Clock,
  AlertTriangle,
  FileText,
  Send,
} from "lucide-react";
import { medications } from "@/lib/medications";

const mockPatient = {
  name: "Alex Johnson",
  age: 34,
  avatar: "AJ",
  sleepIssue: "Sleep Onset + Maintenance",
  severity: "Moderate",
  duration: "3+ years",
  tried: ["Melatonin", "Benadryl", "Ashwagandha"],
  concerns: ["Dependency risk", "Morning grogginess"],
  aiSummary:
    "Patient presents with 3+ years of sleep onset difficulty (avg 45–60 min to fall asleep) and frequent nighttime wakings (2–3x). Reports trying melatonin without sustained benefit. High concern about dependency. Lifestyle: shift work in tech industry, high-stress environment. No contraindications identified. Recommendation: DORA-class agent (Daridorexant) for maintenance with rapid-melt option for onset.",
  recommendedMed: "D1",
};

export default function DoctorDashboard() {
  const [selectedMed, setSelectedMed] = useState("D1");
  const [approved, setApproved] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [note, setNote] = useState("");

  const recommendedMed = medications.find((m) => m.id === selectedMed);

  return (
    <div className="space-y-5">
      {/* Patient Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4ECDC4]/30 to-[#6B8AFF]/30 border border-[#4ECDC4]/30 flex items-center justify-center text-xl font-bold text-white">
              {mockPatient.avatar}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{mockPatient.name}</h3>
              <p className="text-[#94A3B8] text-sm">Age {mockPatient.age} · {mockPatient.sleepIssue}</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-medium">
                  {mockPatient.severity}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#6B8AFF]/10 border border-[#6B8AFF]/30 text-[#6B8AFF] text-xs font-medium">
                  {mockPatient.duration}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#6B8AFF]/10 border border-[#6B8AFF]/30 text-[#6B8AFF] hover:bg-[#6B8AFF]/20 rounded-lg text-sm font-medium transition-colors">
              <Video className="w-4 h-4" />
              Video Consult
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2540] border border-[#2A3550] hover:border-[#4ECDC4]/30 text-[#94A3B8] hover:text-[#4ECDC4] rounded-lg text-sm font-medium transition-colors">
              <FileText className="w-4 h-4" />
              Full Records
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#2A3550]">
          {[
            { label: "Intake Completed", value: "Today, 2:14 PM", icon: Clock },
            { label: "Sleep Onset", value: "45–60 min avg", icon: Clock },
            { label: "Tried Before", value: mockPatient.tried.join(", "), icon: AlertTriangle },
            { label: "Concerns", value: mockPatient.concerns.join(", "), icon: User },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-[#0B1120]/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3 h-3 text-[#475569]" />
                  <span className="text-[#475569] text-xs">{stat.label}</span>
                </div>
                <p className="text-white text-sm font-medium">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* AI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#6B8AFF]/15 border border-[#6B8AFF]/25 flex items-center justify-center">
            <Brain className="w-4 h-4 text-[#6B8AFF]" />
          </div>
          <h4 className="text-white font-semibold">AI Clinical Summary</h4>
          <span className="ml-auto text-xs text-[#475569] bg-[#0B1120]/50 px-2 py-1 rounded-full">Auto-generated</span>
        </div>
        <p className="text-[#94A3B8] text-sm leading-relaxed">{mockPatient.aiSummary}</p>
      </motion.div>

      {/* Medication Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-[#4ECDC4]/15 border border-[#4ECDC4]/25 flex items-center justify-center">
            <Pill className="w-4 h-4 text-[#4ECDC4]" />
          </div>
          <h4 className="text-white font-semibold">Medication Selection</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {medications.map((med) => (
            <button
              key={med.id}
              onClick={() => setSelectedMed(med.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedMed === med.id
                  ? "border-[#4ECDC4]/50 bg-[#4ECDC4]/8"
                  : "border-[#2A3550] hover:border-[#2A3550]/80 bg-[#0B1120]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${med.color}20`, color: med.color }}
                >
                  {med.id}
                </span>
                {selectedMed === med.id && (
                  <CheckCircle className="w-4 h-4 text-[#4ECDC4]" />
                )}
                {med.id === mockPatient.recommendedMed && (
                  <span className="text-[10px] bg-[#4ECDC4]/10 text-[#4ECDC4] px-2 py-0.5 rounded-full border border-[#4ECDC4]/20">
                    AI Pick
                  </span>
                )}
              </div>
              <p className="text-white text-sm font-semibold">{med.name}</p>
              <p className="text-[#64748B] text-xs mt-0.5">{med.mechanism}</p>
              <p className="text-[#94A3B8] text-xs mt-2 italic">{med.tagline}</p>
            </button>
          ))}
        </div>

        {/* Selected med detail */}
        {recommendedMed && (
          <div className="bg-[#0B1120]/50 rounded-xl p-4 border border-[#2A3550]">
            <p className="text-[#4ECDC4] text-xs font-semibold uppercase tracking-wide mb-3">
              Benefits — {recommendedMed.name}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {recommendedMed.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#4ECDC4] shrink-0" />
                  {b}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#1A2540] border border-[#2A3550] rounded-2xl overflow-hidden"
      >
        <button
          onClick={() => setNotesOpen(!notesOpen)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-white/2 transition-colors"
        >
          <span className="text-white font-semibold">Add Physician Notes</span>
          <ChevronDown
            className={`w-5 h-5 text-[#64748B] transition-transform ${notesOpen ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {notesOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-6"
            >
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add clinical notes, dosage instructions, follow-up recommendations..."
                className="w-full bg-[#0B1120]/50 border border-[#2A3550] rounded-xl p-4 text-sm text-[#CBD5E1] placeholder-[#475569] resize-none h-28 focus:outline-none focus:border-[#4ECDC4]/50 transition-colors"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Approve Button */}
      <AnimatePresence>
        {!approved ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setApproved(true)}
            className="w-full flex items-center justify-center gap-3 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-bold py-4 rounded-2xl text-lg shadow-2xl shadow-[#4ECDC4]/25 transition-all"
          >
            <Send className="w-5 h-5" />
            Approve & Send Rx to Pharmacy
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400 font-semibold py-4 rounded-2xl"
          >
            <CheckCircle className="w-6 h-6" />
            Prescription Approved & Sent to Pharmacy
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
