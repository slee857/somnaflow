"use client";

import Link from "next/link";
import { Moon, ExternalLink, Globe, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

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
              {t.footer.description}
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
          {(["Platform", "Company", "Support"] as const).map((group) => (
            <div key={group}>
              <h4 className="text-[#0A0A0A] font-semibold text-sm mb-4">
                {t.footer.groups[group]}
              </h4>
              <ul className="space-y-3">
                {t.footer.links[group].map((link) => (
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
          {t.footer.complianceBadges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1.5 border border-[#EBEBEB] rounded-full text-xs text-[#A3A3A3] font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Legal disclaimer */}
        <div className="mt-8 space-y-3">
          <p className="text-[#A3A3A3] text-xs leading-relaxed">
            <strong className="text-[#525252]">{t.footer.medicalDisclaimerLabel}</strong>{" "}
            {t.footer.medicalDisclaimerText}
          </p>
          <p className="text-[#A3A3A3] text-xs leading-relaxed">
            <strong className="text-[#525252]">{t.footer.controlledLabel}</strong>{" "}
            {t.footer.controlledText}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
            <p className="text-[#A3A3A3] text-xs">{t.footer.copyright}</p>
            <p className="text-[#A3A3A3] text-xs">{t.footer.availability}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
