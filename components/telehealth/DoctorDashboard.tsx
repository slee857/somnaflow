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
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-xl font-bold text-teal-700">
              {mockPatient.avatar}
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-xl">{mockPatient.name}</h3>
              <p className="text-slate-500 text-sm">Age {mockPatient.age} · {mockPatient.sleepIssue}</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
                  {mockPatient.severity}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium">
                  {mockPatient.duration}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition-colors">
              <Video className="w-4 h-4" />
              Video Consult
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 rounded-lg text-sm font-medium transition-colors">
              <FileText className="w-4 h-4" />
              Full Records
            </button>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-100">
          {[
            { label: "Intake Completed", value: "Today, 2:14 PM", icon: Clock },
            { label: "Sleep Onset", value: "45–60 min avg", icon: Clock },
            { label: "Tried Before", value: mockPatient.tried.join(", "), icon: AlertTriangle },
            { label: "Concerns", value: mockPatient.concerns.join(", "), icon: User },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Icon className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-400 text-xs">{stat.label}</span>
                </div>
                <p className="text-slate-900 text-sm font-medium">{stat.value}</p>
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
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <h4 className="text-slate-900 font-semibold">AI Clinical Summary</h4>
          <span className="ml-auto text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded-full">Auto-generated</span>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{mockPatient.aiSummary}</p>
      </motion.div>

      {/* Medication Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
            <Pill className="w-4 h-4 text-teal-600" />
          </div>
          <h4 className="text-slate-900 font-semibold">Medication Selection</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {medications.map((med) => (
            <button
              key={med.id}
              onClick={() => setSelectedMed(med.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedMed === med.id
                  ? "border-teal-400 bg-teal-50/50 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700">
                  {med.id}
                </span>
                {selectedMed === med.id && (
                  <CheckCircle className="w-4 h-4 text-teal-600" />
                )}
                {med.id === mockPatient.recommendedMed && selectedMed !== med.id && (
                  <span className="text-[10px] bg-teal-50 border border-teal-100 text-teal-600 px-2 py-0.5 rounded-full">
                    AI Pick
                  </span>
                )}
              </div>
              <p className="text-slate-900 text-sm font-semibold">{med.name}</p>
              <p className="text-slate-400 text-xs mt-0.5">{med.mechanism}</p>
              <p className="text-slate-500 text-xs mt-2 italic">{med.tagline}</p>
            </button>
          ))}
        </div>

        {/* Selected med detail */}
        {recommendedMed && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-teal-700 text-xs font-semibold uppercase tracking-wide mb-3">
              Benefits — {recommendedMed.name}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {recommendedMed.benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-500 shrink-0" />
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
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
      >
        <button
          onClick={() => setNotesOpen(!notesOpen)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
        >
          <span className="text-slate-900 font-semibold">Add Physician Notes</span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform ${notesOpen ? "rotate-180" : ""}`}
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
                className="w-full bg-white border border-slate-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-50 rounded-xl p-4 text-sm text-slate-700 placeholder-slate-400 resize-none h-28 outline-none transition-all"
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
            exit={{ opacity: 0 }}
            onClick={() => setApproved(true)}
            className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-2xl text-lg shadow-sm transition-colors"
          >
            <Send className="w-5 h-5" />
            Approve & Send Rx to Pharmacy
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex items-center justify-center gap-3 bg-green-50 border border-green-200 text-green-700 font-semibold py-4 rounded-2xl"
          >
            <CheckCircle className="w-6 h-6" />
            Prescription Approved & Sent to Pharmacy
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
