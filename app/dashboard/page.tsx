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
  { label: "Pending Review", value: "7", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 border-amber-100", change: "+2 new" },
  { label: "Approved Today", value: "14", icon: CheckCircle, color: "text-teal-600", bg: "bg-teal-50 border-teal-100", change: "↑ 12% vs avg" },
  { label: "Active Patients", value: "342", icon: Users, color: "text-blue-600", bg: "bg-blue-50 border-blue-100", change: "+18 this week" },
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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 fixed left-0 top-0 bottom-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <Moon className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Somna<span className="text-teal-600">Flow</span>
            </span>
          </Link>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-slate-400">Physician Portal</span>
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
                    ? "bg-teal-50 text-teal-700 border border-teal-100 font-medium"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Doctor info */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center font-bold text-sm text-teal-700">
              SC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-900 text-sm font-semibold truncate">Dr. Sarah Chen</p>
              <p className="text-slate-400 text-xs">Sleep Medicine, MD</p>
            </div>
            <button className="text-slate-400 hover:text-slate-700 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900 font-bold text-xl">Physician Dashboard</h1>
              <p className="text-slate-400 text-sm">Thursday, April 3, 2026</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                <Bell className="w-5 h-5 text-slate-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <Link href="/" className="text-sm text-slate-400 hover:text-slate-700 transition-colors">
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
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-500 text-sm">{stat.label}</span>
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stat.bg}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-slate-900 text-3xl font-black">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Two-panel layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Patient queue */}
            <div className="xl:col-span-1">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-slate-900 font-semibold">Patient Queue</h3>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
                      placeholder="Search patients..."
                    />
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => setSelectedPatient(patient)}
                      className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${
                        selectedPatient.id === patient.id
                          ? "bg-teal-50/60 border-l-2 border-teal-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-slate-900 text-sm font-semibold">{patient.name}</p>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            patient.status === "pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-teal-50 text-teal-700 border border-teal-200"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">{patient.issue}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span
                          className={`text-[10px] font-medium ${
                            patient.severity === "Severe"
                              ? "text-red-500"
                              : patient.severity === "Moderate"
                              ? "text-amber-600"
                              : "text-teal-600"
                          }`}
                        >
                          {patient.severity}
                        </span>
                        <span className="text-slate-400 text-[10px]">{patient.submitted}</span>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-slate-200">
                  <button className="text-teal-600 text-xs hover:underline flex items-center gap-1 mx-auto">
                    View all patients
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Detail panel */}
            <div className="xl:col-span-2">
              {/* Tabs */}
              <div className="flex gap-1 bg-white border border-slate-200 rounded-2xl p-1.5 mb-5 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
                      activeTab === tab
                        ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
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
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
                  <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <h3 className="text-slate-900 font-semibold mb-2">Patient Records</h3>
                  <p className="text-slate-400 text-sm">Complete medical history and prescription records</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
