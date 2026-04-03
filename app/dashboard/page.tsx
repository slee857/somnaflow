"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Clock,
  CheckCircle,
  Bell,
  Settings,
  Moon,
  Search,
  Filter,
  LayoutDashboard,
  FileText,
  Video,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import DoctorDashboard from "@/components/telehealth/DoctorDashboard";
import VideoConsult from "@/components/telehealth/VideoConsult";

const stats = [
  { label: "Pending Review", value: "7", icon: Clock, color: "#F59E0B", change: "+2 new" },
  { label: "Approved Today", value: "14", icon: CheckCircle, color: "#4ECDC4", change: "↑ 12% vs avg" },
  { label: "Active Patients", value: "342", icon: Users, color: "#6B8AFF", change: "+18 this week" },
];

const patients = [
  {
    id: "P001",
    name: "Alex Johnson",
    issue: "Sleep Onset + Maintenance",
    severity: "Moderate",
    submitted: "Today, 2:14 PM",
    status: "pending",
  },
  {
    id: "P002",
    name: "Maya Rodriguez",
    issue: "Chronic Insomnia",
    severity: "Severe",
    submitted: "Today, 1:47 PM",
    status: "pending",
  },
  {
    id: "P003",
    name: "James Liu",
    issue: "Sleep Maintenance",
    severity: "Mild",
    submitted: "Today, 11:22 AM",
    status: "approved",
  },
  {
    id: "P004",
    name: "Sofia Patel",
    issue: "Early Awakening",
    severity: "Moderate",
    submitted: "Yesterday, 4:58 PM",
    status: "approved",
  },
];

const tabs = ["Patient Review", "Video Consult", "Records"] as const;
type Tab = (typeof tabs)[number];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Patient Review");
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);

  return (
    <div className="min-h-screen bg-[#0B1120] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#070E1A] border-r border-[#1A2540] fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-[#1A2540]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4ECDC4] flex items-center justify-center">
              <Moon className="w-4 h-4 text-[#0B1120]" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-white">
              Somna<span className="text-[#4ECDC4]">Flow</span>
            </span>
          </Link>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-[#64748B]">Physician Portal</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Users, label: "Patients", active: false },
            { icon: FileText, label: "Prescriptions", active: false },
            { icon: Video, label: "Consultations", active: false },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  item.active
                    ? "bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20"
                    : "text-[#64748B] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Doctor info */}
        <div className="p-4 border-t border-[#1A2540]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4ECDC4]/30 to-[#6B8AFF]/30 border border-[#4ECDC4]/30 flex items-center justify-center font-bold text-sm text-white">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">Dr. Sarah Chen</p>
              <p className="text-[#64748B] text-xs">Sleep Medicine, MD</p>
            </div>
            <button className="text-[#475569] hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0B1120]/95 backdrop-blur-sm border-b border-[#1A2540] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-bold text-xl">Physician Dashboard</h1>
              <p className="text-[#64748B] text-sm">Thursday, April 3, 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg bg-[#1A2540] border border-[#2A3550] hover:border-[#4ECDC4]/30 transition-colors">
                <Bell className="w-5 h-5 text-[#64748B]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF4444]" />
              </button>
              <Link href="/" className="text-sm text-[#64748B] hover:text-white transition-colors">
                Back to Site
              </Link>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#64748B] text-sm">{stat.label}</span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${stat.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-white text-3xl font-black">{stat.value}</p>
                  <p className="text-[#64748B] text-xs mt-1" style={{ color: stat.color }}>
                    {stat.change}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Two-panel layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Patient queue */}
            <div className="xl:col-span-1">
              <div className="bg-[#1A2540] border border-[#2A3550] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-[#2A3550]">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">Patient Queue</h3>
                    <button className="p-1.5 rounded-lg hover:bg-white/5 text-[#64748B] hover:text-white transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569]" />
                    <input
                      className="w-full bg-[#0B1120]/50 border border-[#2A3550] rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-[#475569] outline-none focus:border-[#4ECDC4]/40"
                      placeholder="Search patients..."
                    />
                  </div>
                </div>
                <div className="divide-y divide-[#2A3550]">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`w-full text-left p-4 hover:bg-white/3 transition-colors ${
                        selectedPatient.id === patient.id ? "bg-[#4ECDC4]/5 border-l-2 border-[#4ECDC4]" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white text-sm font-semibold">{patient.name}</p>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            patient.status === "pending"
                              ? "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
                              : "bg-[#4ECDC4]/10 text-[#4ECDC4] border border-[#4ECDC4]/20"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </div>
                      <p className="text-[#64748B] text-xs">{patient.issue}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span
                          className={`text-[10px] font-medium ${
                            patient.severity === "Severe"
                              ? "text-red-400"
                              : patient.severity === "Moderate"
                              ? "text-[#F59E0B]"
                              : "text-[#4ECDC4]"
                          }`}
                        >
                          {patient.severity}
                        </span>
                        <span className="text-[#475569] text-[10px]">{patient.submitted}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-[#2A3550]">
                  <button className="text-[#4ECDC4] text-xs hover:underline flex items-center gap-1 mx-auto">
                    View all patients
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Detail panel */}
            <div className="xl:col-span-2">
              {/* Tabs */}
              <div className="flex gap-1 bg-[#1A2540] border border-[#2A3550] rounded-2xl p-1.5 mb-5">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
                      activeTab === tab
                        ? "bg-[#4ECDC4]/15 text-[#4ECDC4] border border-[#4ECDC4]/25"
                        : "text-[#64748B] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "Patient Review" && <DoctorDashboard />}
              {activeTab === "Video Consult" && (
                <div className="space-y-5">
                  <VideoConsult doctorName="Dr. Sarah Chen, MD" />
                </div>
              )}
              {activeTab === "Records" && (
                <div className="bg-[#1A2540] border border-[#2A3550] rounded-2xl p-8 text-center">
                  <FileText className="w-12 h-12 text-[#2A3550] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">Patient Records</h3>
                  <p className="text-[#64748B] text-sm">Complete medical history and prescription records</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
