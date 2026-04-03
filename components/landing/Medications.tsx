"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const medications = [
  {
    id: "s1",
    name: "Formula S1",
    dose: "Ramelteon 8mg",
    tag: "Best for: Trouble falling asleep",
    mechanism: "Melatonin receptor agonist — resets your circadian rhythm without sedation.",
    image: "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80",
    benefits: [
      "Non-addictive — no dependency risk",
      "No next-day grogginess",
      "Safe for long-term use",
      "Works with your body's natural clock",
    ],
    accent: "#D97706",
  },
  {
    id: "d1",
    name: "Formula D1",
    dose: "Daridorexant 25mg",
    tag: "Best for: Waking up at night",
    mechanism: "Dual orexin receptor antagonist — blocks the wakefulness signal so you stay asleep.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
    benefits: [
      "Non-addictive — no controlled substance",
      "Zero morning hangover effect",
      "FDA-approved in 2023",
      "Targets root cause, not symptoms",
    ],
    accent: "#D97706",
  },
];

export default function Medications() {
  return (
    <section id="medications" className="py-24 lg:py-32 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#D97706] font-semibold text-xs uppercase tracking-widest mb-4">
            Our Medications
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-5">
            No dependency. No grogginess.
            <br />
            <span className="text-[#D97706]">Just sleep.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            We only prescribe non-addictive, modern sleep medications. No Ambien. No benzodiazepines. Ever.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {medications.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#D97706]/40 hover:shadow-md transition-all duration-300 shadow-sm"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={med.image}
                  alt={med.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                {/* Best for tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-sm bg-amber-50 text-[#D97706] border border-amber-200">
                    {med.tag}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">{med.name}</h3>
                  <p className="font-bold text-sm mt-0.5 text-[#D97706]">
                    {med.dose}
                  </p>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-5">{med.mechanism}</p>

                <ul className="space-y-2.5 mb-6">
                  {med.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0 mt-0.5 bg-amber-50 border border-amber-200">
                        <Check className="w-3 h-3 text-[#D97706]" />
                      </div>
                      <span className="text-gray-500 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] px-2.5 py-1 rounded-sm bg-gray-50 border border-gray-200 text-gray-400 font-semibold uppercase tracking-wide">
                    Non-Addictive
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-sm bg-gray-50 border border-gray-200 text-gray-400 font-semibold uppercase tracking-wide">
                    No Dependency
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-sm bg-gray-50 border border-gray-200 text-gray-400 font-semibold uppercase tracking-wide">
                    Overnight Delivery
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-6">
            Your physician selects the right formula based on your sleep profile. No guessing.
          </p>
          <Link href="/intake">
            <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-8 py-4 rounded text-base transition-colors">
              Get Your Prescription — Start Tonight
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
