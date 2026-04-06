"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const medImages = [
  "https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&q=80",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80",
];

export default function Medications() {
  const { t } = useLanguage();

  return (
    <section id="medications" className="py-28 lg:py-36 bg-white border-t border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#A3A3A3] font-medium text-xs uppercase tracking-widest mb-4">
            {t.medications.sectionLabel}
          </p>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight mb-5">
            {t.medications.title}
            <br />
            <span className="text-[#D97706]">{t.medications.titleHighlight}</span>
          </h2>
          <p className="text-[#525252] text-lg max-w-xl mx-auto">
            {t.medications.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {t.medications.items.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white border border-[#EBEBEB] rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-transform duration-300 hover:border-amber-200/70 hover:shadow-sm"
            >
              {/* Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-amber-50/30">
                <Image
                  src={medImages[index]}
                  alt={med.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/50 to-transparent" />
                {/* Best for tag */}
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-[#D97706] border border-amber-200 shadow-sm">
                    {med.tag}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0A] tracking-tight">{med.name}</h3>
                  <p className="font-semibold text-sm mt-0.5 text-[#D97706]">
                    {med.dose}
                  </p>
                </div>

                <p className="text-[#525252] text-sm leading-relaxed mb-5">{med.mechanism}</p>

                <ul className="space-y-2.5 mb-6">
                  {med.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-[#D97706]" />
                      </span>
                      <span className="text-[#525252] text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 flex-wrap">
                  {med.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#D97706] font-semibold uppercase tracking-wide"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-center mt-12"
        >
          <p className="text-[#A3A3A3] text-sm mb-6">
            {t.medications.physicianNote}
          </p>
          <Link href="/intake">
            <button className="bg-[#D97706] hover:bg-[#B45309] text-white font-semibold px-8 py-4 rounded-full text-base transition-colors">
              {t.medications.cta}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
