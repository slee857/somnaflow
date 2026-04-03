"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Medications", href: "#medications" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                key={link.label}
                href={link.href}
                className="text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden lg:block text-sm text-[#525252] hover:text-[#0A0A0A] transition-colors"
            >
              Physician Login
            </Link>
            <Link href="/intake">
              <button className="bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors">
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
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
                  key={link.label}
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
                Physician Login
              </Link>
              <div className="pt-3 mt-1 border-t border-[#EBEBEB]">
                <Link href="/intake" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-[#0A0A0A] hover:bg-[#1a1a1a] text-white font-semibold py-3 rounded-full transition-colors text-sm">
                    Get Started — Free Consultation
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
