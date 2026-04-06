"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-28 lg:py-36 bg-white border-t border-[#EBEBEB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#A3A3A3] font-medium text-xs uppercase tracking-widest mb-4">
            {t.testimonials.sectionLabel}
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight mb-6">
            {t.testimonials.title}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <Stars count={5} />
            <span className="text-[#0A0A0A] font-bold text-sm">4.9/5</span>
            <span className="text-[#A3A3A3] text-sm">{t.testimonials.verifiedReviews}</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.testimonials.items.map((testimonial, index) => (
            <motion.div
              key={testimonial.name + index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="bg-white border border-[#EBEBEB] rounded-2xl p-6 flex flex-col"
            >
              {/* Stars */}
              <Stars count={testimonial.rating} />

              {/* Quote */}
              <p className="text-[#525252] text-sm leading-relaxed mt-4 mb-5 flex-1">
                &ldquo;
                {testimonial.text.split(testimonial.highlight).map((part, i) => {
                  if (i === 0) return <span key={i}>{part}</span>;
                  return (
                    <span key={i}>
                      <span className="text-[#0A0A0A] font-semibold">{testimonial.highlight}</span>
                      {part}
                    </span>
                  );
                })}
                &rdquo;
              </p>

              {/* Med badge */}
              <div className="inline-flex items-center gap-1.5 border border-[#EBEBEB] rounded-full px-3 py-1 mb-5 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                <span className="text-[#525252] text-xs font-medium">{testimonial.medication}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#EBEBEB]">
                <div className="w-8 h-8 rounded-full bg-[#F8F8F8] border border-[#EBEBEB] flex items-center justify-center text-xs font-bold text-[#525252]">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-[#0A0A0A] text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-[#A3A3A3] text-xs">{testimonial.title}</p>
                </div>
                <span className="text-[#A3A3A3] text-xs">{testimonial.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
