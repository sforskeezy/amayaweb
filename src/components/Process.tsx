"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Book",
    text: "Call, text, or book online. Pick a time that works for you.",
  },
  {
    num: "02",
    title: "We Arrive",
    text: "Our mobile unit comes to your location — home, office, anywhere.",
  },
  {
    num: "03",
    title: "We Transform",
    text: "Professional-grade products and obsessive attention to detail.",
  },
  {
    num: "04",
    title: "You Enjoy",
    text: "Walk out to a car that looks and feels brand new.",
  },
];

function ProcessStep({
  step,
  index,
  scrollYProgress,
  isMobile,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
}) {
  const activateAt = 0.15 + index * 0.2;

  const stepOpacity = useTransform(
    scrollYProgress,
    [activateAt - 0.08, activateAt, 1],
    [0.25, 1, 1]
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

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="flex gap-4 items-start"
      >
        <span className="font-[var(--font-display)] text-3xl font-bold text-gold/30 shrink-0 w-12">
          {step.num}
        </span>
        <div className="pt-1">
          <h3 className="text-[15px] font-medium mb-1 tracking-wide">{step.title}</h3>
          <p className="text-text-muted text-[13px] leading-relaxed">{step.text}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ opacity: stepOpacity }}
      className="relative py-0 px-8 first:pl-0 last:pr-0 border-r last:border-0 border-white/[0.06]"
    >
      <motion.div
        style={{ width: barWidth }}
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-gold to-gold-light"
      />
      <motion.span
        style={{ color: numColor }}
        className="font-[var(--font-display)] text-7xl font-bold block mb-6"
      >
        {step.num}
      </motion.span>
      <motion.h3
        style={{ color: titleColor }}
        className="text-lg font-medium mb-3 tracking-wide"
      >
        {step.title}
      </motion.h3>
      <p className="text-text-muted text-[14px] leading-relaxed">{step.text}</p>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  if (isMobile) {
    return (
      <section className="py-14 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6">
          <div className="mb-8">
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3">
              The Process
            </p>
            <h2 className="font-[var(--font-display)] text-3xl tracking-[-0.02em]">
              How It Works
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.num}
                step={step}
                index={i}
                scrollYProgress={scrollYProgress}
                isMobile
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative" style={{ minHeight: "250vh" }}>
      <div className="sticky top-0 min-h-screen flex items-center py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
          <motion.div className="flex flex-row items-end justify-between mb-24 gap-6">
            <div>
              <p className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4">
                The Process
              </p>
              <h2 className="font-[var(--font-display)] text-5xl lg:text-6xl tracking-[-0.02em]">
                How It Works
              </h2>
            </div>
            <p className="text-text-muted text-sm max-w-xs">
              From booking to that brand-new feeling — we make it effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.num}
                step={step}
                index={i}
                scrollYProgress={scrollYProgress}
                isMobile={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
