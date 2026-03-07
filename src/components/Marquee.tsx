"use client";

import { motion } from "framer-motion";

const items = [
  "Exterior Detail",
  "Interior Detail",
  "Ceramic Coating",
  "Paint Correction",
  "Full Detail",
  "Mobile Service",
  "Engine Bay",
  "Headlight Restoration",
];

export default function Marquee() {
  return (
    <section className="py-4 sm:py-6 border-y border-white/[0.04] bg-bg-warm overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex"
      >
        <div
          className="flex shrink-0 items-center gap-8 animate-[marquee_30s_linear_infinite]"
        >
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="text-[11px] sm:text-[13px] text-text-muted tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="text-gold/40 text-sm sm:text-lg">&#9670;</span>
            </div>
          ))}
        </div>
        <div
          className="flex shrink-0 items-center gap-8 animate-[marquee_30s_linear_infinite]"
          aria-hidden
        >
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="text-[11px] sm:text-[13px] text-text-muted tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="text-gold/40 text-sm sm:text-lg">&#9670;</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
