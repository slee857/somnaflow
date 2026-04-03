"use client";

import Link from "next/link";
import { Moon, Shield, Stethoscope, Lock, ExternalLink, Globe, Mail } from "lucide-react";

const trustBadges = [
  {
    icon: Shield,
    title: "FDA-Regulated Pharmacy",
    desc: "All medications sourced from FDA-registered compounding pharmacies",
  },
  {
    icon: Stethoscope,
    title: "Licensed US Physicians",
    desc: "Board-certified sleep medicine specialists in all 50 states",
  },
  {
    icon: Lock,
    title: "HIPAA Secure",
    desc: "256-bit encryption protects all your medical data",
  },
];

const footerLinks = {
  Platform: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Medications", href: "#medications" },
    { label: "Pricing", href: "#pricing" },
    { label: "Track Your Rx", href: "/tracking" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Our Physicians", href: "#" },
    { label: "Science & Research", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Trust Badges */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#D97706]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{badge.title}</p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Sub-badges */}
          <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-gray-200">
            {["256-bit SSL Encryption", "50-State Licensed", "HIPAA Compliant", "SOC 2 Type II"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-sm text-xs text-gray-500 font-medium"
                >
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded bg-[#D97706] flex items-center justify-center">
                <Moon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Somna<span className="text-[#D97706]">Flow</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Professional sleep medicine, delivered to your doorstep. Fix your sleep tonight — not in 15 months.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded bg-white border border-gray-200 flex items-center justify-center hover:border-[#D97706]/40 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded bg-white border border-gray-200 flex items-center justify-center hover:border-[#D97706]/40 transition-colors"
              >
                <Globe className="w-4 h-4 text-gray-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded bg-white border border-gray-200 flex items-center justify-center hover:border-[#D97706]/40 transition-colors"
              >
                <Mail className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-gray-900 font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal disclaimer */}
        <div className="mt-12 pt-8 border-t border-gray-200 space-y-3">
          <p className="text-gray-400 text-xs leading-relaxed">
            <strong className="text-gray-600">Medical Disclaimer:</strong> SomnaFlow is a telehealth platform that connects patients with independent, licensed physicians. Physicians exercise independent medical judgment. SomnaFlow does not practice medicine. Not for emergency use — if you are experiencing a medical emergency, call 911.
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            <strong className="text-gray-600">Controlled Substances:</strong> Controlled substances (Schedule II–V) are not prescribed through SomnaFlow. All medications prescribed are non-controlled. Individual results may vary.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
            <p className="text-gray-400 text-xs">&copy; 2026 SomnaFlow, Inc. All rights reserved.</p>
            <p className="text-gray-400 text-xs">Available in all 50 states · Physicians licensed in your state</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
