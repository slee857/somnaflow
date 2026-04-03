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
    { label: "Medications", href: "#pricing" },
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
    <footer className="bg-slate-50 border-t border-slate-200">
      {/* Trust Badges */}
      <div className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{badge.title}</p>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Sub-badges */}
          <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-slate-200">
            {["256-bit SSL Encryption", "50-State Licensed", "HIPAA Compliant", "SOC 2 Type II"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-500 font-medium"
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
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <Moon className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-slate-900">
                Somna<span className="text-teal-600">Flow</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Professional sleep medicine, delivered to your doorstep. Fix your sleep in 15 minutes — not 15 months.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-200 transition-colors"
              >
                <Globe className="w-4 h-4 text-slate-400" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-slate-900 font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-500 hover:text-teal-600 text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-400 text-xs">
            &copy; 2026 SomnaFlow, Inc. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs text-center sm:text-right max-w-md">
            SomnaFlow is not a substitute for emergency medical care. Always consult with a physician for serious medical conditions.
          </p>
        </div>
      </div>
    </footer>
  );
}
