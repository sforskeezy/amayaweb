"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { MapPin, Shield, Sparkles, Clock } from "lucide-react";
import { useRef, useEffect } from "react";

const features = [
  {
    icon: MapPin,
    title: "We Come to You",
    text: "Fully equipped mobile service — home, office, or anywhere in the Lugoff area.",
  },
  {
    icon: Shield,
    title: "Premium Products",
    text: "Professional-grade coatings, polishes, and cleaners trusted by specialists.",
  },
  {
    icon: Sparkles,
    title: "Obsessive Precision",
    text: "Every seam and surface treated with the same meticulous standard.",
  },
  {
    icon: Clock,
    title: "Your Schedule",
    text: "Flexible booking around your life. Evenings and weekends available.",
  },
];

const stats = [
  { value: 100, suffix: "+", label: "Vehicles" },
  { value: 5, suffix: ".0", label: "Rating" },
  { value: 100, suffix: "%", label: "Satisfaction" },
  { value: 3, suffix: "+", label: "Years" },
];

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <div className="text-center">
      <span ref={ref} className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl font-bold text-gold block">
        0{suffix}
      </span>
      <span className="text-text-muted text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mt-1 block">{label}</span>
    </div>
  );
}

function TireTread() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute -left-[10%] top-[10%] w-[120%] h-[120%] opacity-[0.035]"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Left tire track */}
        <g transform="rotate(-12 600 400)">
          {/* Outer track lines */}
          <rect x="240" y="-100" width="4" height="1100" rx="2" fill="white" />
          <rect x="320" y="-100" width="4" height="1100" rx="2" fill="white" />
          {/* Tread blocks — chevron pattern */}
          {Array.from({ length: 28 }).map((_, i) => (
            <g key={`l-${i}`} transform={`translate(0, ${i * 38 - 80})`}>
              <rect x="248" y="0" width="68" height="6" rx="1" fill="white" transform="skewY(-15)" />
              <rect x="248" y="14" width="68" height="6" rx="1" fill="white" transform="skewY(15)" />
            </g>
          ))}
        </g>
        {/* Right tire track */}
        <g transform="rotate(-12 600 400)">
          <rect x="820" y="-100" width="4" height="1100" rx="2" fill="white" />
          <rect x="900" y="-100" width="4" height="1100" rx="2" fill="white" />
          {Array.from({ length: 28 }).map((_, i) => (
            <g key={`r-${i}`} transform={`translate(0, ${i * 38 - 80})`}>
              <rect x="828" y="0" width="68" height="6" rx="1" fill="white" transform="skewY(-15)" />
              <rect x="828" y="14" width="68" height="6" rx="1" fill="white" transform="skewY(15)" />
            </g>
          ))}
        </g>
      </svg>
      {/* Fade edges so tracks feel like they drive through */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-warm to-transparent z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-warm to-transparent z-[1]" />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28 overflow-hidden">
      <TireTread />
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-10 relative z-10">
        {/* Header — compact */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-3"
            >
              Why Amaya&apos;s
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] text-2xl sm:text-3xl md:text-4xl tracking-[-0.02em] leading-[1.1]"
            >
              Not just clean. <span className="italic text-gold">Showroom.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-[13px] sm:text-[14px] leading-relaxed max-w-sm"
          >
            Detailing isn&apos;t a side hustle — it&apos;s a craft. Every vehicle is treated like our own.
          </motion.p>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="grid grid-cols-4 border border-white/[0.06] bg-white/[0.02] divide-x divide-white/[0.06]">
            {stats.map((stat, i) => (
              <div key={stat.label} className="py-5 sm:py-7 md:py-8 px-2 sm:px-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features — 4-column on desktop, 2-column on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group p-4 sm:p-5 border border-white/[0.05] bg-white/[0.01] hover:border-gold/20 hover:bg-gold/[0.02] transition-all duration-400"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-3 sm:mb-4 group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300">
                <f.icon size={15} className="text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="text-[13px] sm:text-[14px] font-semibold tracking-wide mb-1.5 group-hover:text-gold transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-text-muted text-[11px] sm:text-[12px] leading-[1.6]">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
