"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus T.",
    title: "Software Engineer",
    avatar: "MT",
    rating: 5,
    text: "After 4 years of terrible sleep and $800 in OTC supplements, SomnaFlow had me sleeping through the night in the first week. The doctor call took 10 minutes and the prescription arrived next morning.",
    medication: "Formula D1 — Day-Fresh",
    time: "3 months ago",
    highlight: "sleeping through the night in the first week",
  },
  {
    name: "Jennifer K.",
    title: "Healthcare Administrator",
    avatar: "JK",
    rating: 5,
    text: "I was skeptical about online sleep medicine. But the doctor was thorough, asked the right questions, and prescribed something that actually targets the root cause. No more 3am wake-ups.",
    medication: "Formula S1 — Rapid-Melt",
    time: "6 weeks ago",
    highlight: "No more 3am wake-ups",
  },
  {
    name: "David R.",
    title: "Executive, Finance",
    avatar: "DR",
    rating: 5,
    text: "My sleep clinic appointment was 6 months away. SomnaFlow had me consulting with a physician the same day I signed up. Performance at work has never been better since fixing my sleep.",
    medication: "Formula D1 — Day-Fresh",
    time: "2 months ago",
    highlight: "consulting with a physician the same day",
  },
  {
    name: "Priya M.",
    title: "Nurse Practitioner",
    avatar: "PM",
    rating: 5,
    text: "As a healthcare professional, I was initially skeptical. But the clinical rigor here is impressive — real physicians, real medications, real protocols. And actually more convenient than what I prescribe at work.",
    medication: "Formula S1 — Rapid-Melt",
    time: "1 month ago",
    highlight: "clinical rigor here is impressive",
  },
  {
    name: "Carlos E.",
    title: "College Professor",
    avatar: "CE",
    rating: 5,
    text: "What I love most is zero morning grogginess. I tried everything — Ambien left me like a zombie, melatonin did nothing. Formula D1 is genuinely different. I wake up refreshed and sharp.",
    medication: "Formula D1 — Day-Fresh",
    time: "5 weeks ago",
    highlight: "zero morning grogginess",
  },
  {
    name: "Sarah L.",
    title: "Entrepreneur",
    avatar: "SL",
    rating: 5,
    text: "The AI intake questionnaire surfaced patterns I never noticed myself. The doctor explained that I had delayed sleep phase disorder, not just insomnia. Finally a diagnosis after years of confusion.",
    medication: "Formula S1 — Rapid-Melt",
    time: "8 weeks ago",
    highlight: "Finally a diagnosis after years",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#D97706] font-semibold text-xs uppercase tracking-widest mb-4">
            Patient Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-6">
            Real people, real results
          </h2>
          <div className="flex items-center justify-center gap-3">
            <Stars count={5} />
            <span className="text-gray-900 font-bold">4.9/5</span>
            <span className="text-gray-400 text-sm">from 2,847 verified reviews</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:border-[#D97706]/30 hover:shadow-md transition-all duration-300 shadow-sm"
            >
              {/* Stars */}
              <Stars count={t.rating} />

              {/* Quote */}
              <p className="text-gray-500 text-sm leading-relaxed mt-4 mb-5">
                &ldquo;
                {t.text.split(t.highlight).map((part, i) => {
                  if (i === 0) return <span key={i}>{part}</span>;
                  return (
                    <span key={i}>
                      <span className="text-gray-900 font-semibold">{t.highlight}</span>
                      {part}
                    </span>
                  );
                })}
                &rdquo;
              </p>

              {/* Med badge */}
              <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-sm px-3 py-1 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                <span className="text-[#D97706] text-xs font-medium">{t.medication}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.title}</p>
                </div>
                <span className="text-gray-400 text-xs">{t.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
