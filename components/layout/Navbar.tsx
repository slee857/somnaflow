"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/translations";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t.nav.howItWorks, href: "#how-it-works" },
    { label: t.nav.medications, href: "#medications" },
    { label: t.nav.pricing, href: "#pricing" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangSelect = (lang: Language) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "border-b border-[#EBEBEB]" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Moon className="w-5 h-5 text-[#D97706]" strokeWidth={2.5} />
            <span className="text-base font-bold text-[#0A0A0A] tracking-tight">
              SomnaFlow
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Language + Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden lg:block text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors"
            >
              {t.nav.physicianLogin}
            </Link>

            {/* Language switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[#EBEBEB] text-[#525252] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-all text-xs font-medium"
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.nav.langLabel}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-32 bg-white border border-[#EBEBEB] rounded-xl shadow-md overflow-hidden z-50"
                  >
                    {(["en", "es"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => handleLangSelect(lang)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                          language === lang
                            ? "bg-amber-50 text-[#D97706] font-semibold"
                            : "text-[#525252] hover:bg-[#F8F8F8] hover:text-[#0A0A0A]"
                        }`}
                      >
                        <span className="text-base">
                          {lang === "en" ? "🇺🇸" : "🇪🇸"}
                        </span>
                        <span>{lang === "en" ? "English" : "Español"}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/intake">
              <button className="bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors">
                <span className="hidden sm:inline">{t.nav.getStarted}</span>
                <span className="sm:hidden">{t.nav.getStarted}</span>
              </button>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-[#525252] hover:text-[#0A0A0A] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-[#EBEBEB]"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F8F8F8] rounded-xl transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 text-[#525252] hover:text-[#0A0A0A] hover:bg-[#F8F8F8] rounded-xl transition-colors text-sm"
              >
                {t.nav.physicianLogin}
              </Link>

              {/* Mobile language toggle */}
              <div className="flex gap-2 px-4 py-2">
                {(["en", "es"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setMenuOpen(false); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                      language === lang
                        ? "border-[#D97706] bg-amber-50 text-[#D97706]"
                        : "border-[#EBEBEB] text-[#525252] hover:border-[#0A0A0A]"
                    }`}
                  >
                    <span>{lang === "en" ? "🇺🇸" : "🇪🇸"}</span>
                    <span>{lang === "en" ? "English" : "Español"}</span>
                  </button>
                ))}
              </div>

              <div className="pt-3 mt-1 border-t border-[#EBEBEB]">
                <Link href="/intake" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-semibold py-3 rounded-full transition-colors text-sm">
                    {t.nav.getStartedFull}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
