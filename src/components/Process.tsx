"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Book",
    text: "Call, text, or book online. Pick a time that works for you — we'll handle the rest.",
  },
  {
    num: "02",
    title: "We Arrive",
    text: "Our fully-equipped mobile unit comes to your location — home, office, wherever you need us.",
  },
  {
    num: "03",
    title: "We Transform",
    text: "Your vehicle gets the full treatment with professional-grade products and obsessive attention to detail.",
  },
  {
    num: "04",
    title: "You Enjoy",
    text: "Walk out to a car that looks and feels brand new. Every single time.",
  },
];

function ProcessStep({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const activateAt = 0.15 + index * 0.2;

  const stepOpacity = useTransform(
    scrollYProgress,
    [activateAt - 0.08, activateAt, 1],
    [0.2, 1, 1]
  );

  const numColor = useTransform(
    scrollYProgress,
    [activateAt - 0.08, activateAt],
    ["rgba(255,255,255,0.04)", "rgba(212,168,67,0.3)"]
  );

  const titleColor = useTransform(
    scrollYProgress,
    [activateAt - 0.08, activateAt],
    ["#78716c", "#fafaf9"]
  );

  const barWidth = useTransform(
    scrollYProgress,
    [activateAt - 0.08, activateAt + 0.05],
    ["0%", "100%"]
  );

  const dotScale = useTransform(
    scrollYProgress,
    [activateAt - 0.05, activateAt],
    [0, 1]
  );

  return (
    <motion.div
      style={{ opacity: stepOpacity }}
      className="relative py-8 sm:py-10 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 md:border-r last:border-0 border-white/[0.06]"
    >
      <motion.div
        style={{ width: barWidth }}
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light"
      />

      <motion.div
        style={{ scale: dotScale }}
        className="absolute -top-[5px] right-0 md:right-auto md:left-0 w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-full bg-gold shadow-[0_0_12px_rgba(212,168,67,0.6)]"
      />

      <motion.span
        style={{ color: numColor }}
        className="font-[var(--font-display)] text-5xl sm:text-6xl md:text-7xl font-bold block mb-4 sm:mb-6 transition-colors duration-700"
      >
        {step.num}
      </motion.span>
      <motion.h3
        style={{ color: titleColor }}
        className="text-base sm:text-lg font-medium mb-2 sm:mb-3 tracking-wide"
      >
        {step.title}
      </motion.h3>
      <p className="text-text-muted text-[13px] sm:text-[14px] leading-relaxed">{step.text}</p>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], [40, 0]);

  return (
    <section ref={containerRef} className="relative" style={{ minHeight: "250vh" }}>
      <div className="sticky top-0 min-h-screen flex items-center py-16 sm:py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 w-full">
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16 md:mb-24 gap-4 sm:gap-6"
          >
            <div>
              <p className="text-gold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-3 sm:mb-4">
                The Process
              </p>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em]">
                How It Works
              </h2>
            </div>
            <p className="text-text-muted text-[13px] sm:text-sm max-w-xs">
              From booking to that brand-new feeling — we make it effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.num}
                step={step}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
