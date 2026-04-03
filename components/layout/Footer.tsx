"use client";

import Link from "next/link";
import { Moon, ExternalLink, Globe, Mail } from "lucide-react";

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
    <footer className="bg-white border-t border-[#EBEBEB]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Moon className="w-5 h-5 text-[#D97706]" strokeWidth={2.5} />
              <span className="text-base font-bold text-[#0A0A0A]">
                SomnaFlow
              </span>
            </Link>
            <p className="text-[#525252] text-sm leading-relaxed max-w-xs mb-6">
              Professional sleep medicine, delivered to your doorstep. Fix your sleep tonight — not in 15 months.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:border-[#0A0A0A] transition-colors"
                aria-label="External link"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#A3A3A3]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:border-[#0A0A0A] transition-colors"
                aria-label="Website"
              >
                <Globe className="w-3.5 h-3.5 text-[#A3A3A3]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#EBEBEB] flex items-center justify-center hover:border-[#0A0A0A] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 text-[#A3A3A3]" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[#0A0A0A] font-semibold text-sm mb-4">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[#525252] hover:text-[#0A0A0A] text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[#EBEBEB]">
          {["256-bit SSL Encryption", "50-State Licensed", "HIPAA Compliant", "SOC 2 Type II"].map(
            (badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 border border-[#EBEBEB] rounded-full text-xs text-[#A3A3A3] font-medium"
              >
                {badge}
              </span>
            )
          )}
        </div>

        {/* Legal disclaimer */}
        <div className="mt-8 space-y-3">
          <p className="text-[#A3A3A3] text-xs leading-relaxed">
            <strong className="text-[#525252]">Medical Disclaimer:</strong> SomnaFlow is a telehealth platform that connects patients with independent, licensed physicians. Physicians exercise independent medical judgment. SomnaFlow does not practice medicine. Not for emergency use — if you are experiencing a medical emergency, call 911.
          </p>
          <p className="text-[#A3A3A3] text-xs leading-relaxed">
            <strong className="text-[#525252]">Controlled Substances:</strong> Controlled substances (Schedule II–V) are not prescribed through SomnaFlow. All medications prescribed are non-controlled. Individual results may vary.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
            <p className="text-[#A3A3A3] text-xs">&copy; 2026 SomnaFlow, Inc. All rights reserved.</p>
            <p className="text-[#A3A3A3] text-xs">Available in all 50 states · Physicians licensed in your state</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
