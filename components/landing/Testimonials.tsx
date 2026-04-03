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
    <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-200 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Patient Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Real people, real results
          </h2>
          <div className="flex items-center justify-center gap-3">
            <Stars count={5} />
            <span className="text-slate-900 font-semibold">4.9/5</span>
            <span className="text-slate-500 text-sm">from 2,847 verified reviews</span>
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
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-teal-200 transition-all duration-300"
            >
              {/* Stars */}
              <Stars count={t.rating} />

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-5">
                &ldquo;
                {t.text.split(t.highlight).map((part, i) => {
                  if (i === 0) return <span key={i}>{part}</span>;
                  return (
                    <span key={i}>
                      <span className="text-slate-900 font-semibold">{t.highlight}</span>
                      {part}
                    </span>
                  );
                })}
                &rdquo;
              </p>

              {/* Med badge */}
              <div className="inline-flex items-center gap-1.5 bg-teal-50 border border-teal-100 rounded-full px-3 py-1 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span className="text-teal-700 text-xs font-medium">{t.medication}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-xs font-bold text-teal-700">
                  {t.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.title}</p>
                </div>
                <span className="text-slate-400 text-xs">{t.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
