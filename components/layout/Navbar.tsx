"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sparkles } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#trust" },
  { label: "Dashboard", href: "/dashboard" },
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
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1120]/95 backdrop-blur-lg border-b border-[#2A3550]/60 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#4ECDC4] flex items-center justify-center shadow-lg shadow-[#4ECDC4]/30 group-hover:shadow-[#4ECDC4]/50 transition-shadow">
              <Moon className="w-4 h-4 text-[#0B1120]" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Somna<span className="text-[#4ECDC4]">Flow</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden lg:block text-sm text-[#94A3B8] hover:text-white transition-colors font-medium"
            >
              Physician Login
            </Link>
            <Link href="/intake">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-[#4ECDC4] hover:bg-[#3DBDB4] text-[#0B1120] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shadow-lg shadow-[#4ECDC4]/20"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Start Free Consultation</span>
                <span className="sm:hidden">Start</span>
              </motion.button>
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors"
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
            className="lg:hidden bg-[#0B1120]/98 backdrop-blur-lg border-t border-[#2A3550]/50"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-[#2A3550]/50 mt-2">
                <Link href="/intake" onClick={() => setMenuOpen(false)}>
                  <button className="w-full bg-[#4ECDC4] text-[#0B1120] font-semibold py-3 rounded-full">
                    Start Free Consultation
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
