"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { MapPin, Shield, Sparkles, Clock, ArrowUpRight, Droplets, Award } from "lucide-react";
import { useRef, useEffect } from "react";

const features = [
  {
    icon: MapPin,
    title: "We Come to You",
    text: "Fully equipped mobile service at your home, office, or anywhere in the Lugoff, Camden, and Columbia area.",
    accent: "from-gold/20 to-transparent",
  },
  {
    icon: Shield,
    title: "Premium Products",
    text: "Only professional-grade coatings, polishes, and cleaners trusted by detailing specialists worldwide.",
    accent: "from-emerald-400/20 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Obsessive Precision",
    text: "Every seam, crevice, and surface is treated with the same meticulous standard — no shortcuts.",
    accent: "from-blue-400/20 to-transparent",
  },
  {
    icon: Clock,
    title: "Your Schedule",
    text: "Flexible booking that works around your life. Evenings and weekends available.",
    accent: "from-purple-400/20 to-transparent",
  },
];

const stats = [
  { value: 100, suffix: "+", label: "Vehicles Detailed" },
  { value: 5, suffix: "★", label: "Average Rating" },
  { value: 100, suffix: "%", label: "Satisfaction" },
  { value: 3, suffix: "+", label: "Years Experience" },
];

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [spring, suffix]);

  return (
    <div className="text-center">
      <span
        ref={ref}
        className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-gold block"
      >
        0{suffix}
      </span>
      <span className="text-text-muted text-[11px] tracking-[0.2em] uppercase mt-2 block">{label}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.95, 1, 1]);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-gold/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header — Full Width, Dramatic */}
        <div className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6"
          >
            Why Amaya&apos;s
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] text-5xl md:text-6xl lg:text-[5.5rem] tracking-[-0.03em] leading-[1.05] max-w-4xl"
          >
            Not just clean.{" "}
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="italic text-gold inline-block"
            >
              Showroom.
            </motion.span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-gold to-transparent mt-8"
          />
        </div>

        {/* Main Content: Image + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-32 md:mb-40">
          {/* Image Column */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=900"
                alt="Detailing in progress"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-warm/40 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-8 -right-4 lg:-right-12 bg-[#1a1a19]/95 backdrop-blur-xl border border-white/[0.08] p-6 lg:p-8 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center">
                  <Award size={24} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-3xl lg:text-4xl text-gold font-bold leading-none">5.0</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold text-[10px]">★</span>
                    ))}
                  </div>
                  <p className="text-text-muted text-[10px] tracking-[0.15em] uppercase mt-1">Google Rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text + Features Column */}
          <div className="lg:col-span-7 lg:pl-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg md:text-xl leading-[1.8] mb-6 max-w-xl"
            >
              At Amaya&apos;s, detailing isn&apos;t a side hustle — it&apos;s a craft. Every vehicle is treated like our own.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-muted text-[15px] leading-[1.8] mb-14 max-w-xl"
            >
              We use only professional-grade equipment and products, because your car deserves more than a bucket wash. From ceramic coatings to deep interior restoration, we bring the full detailing studio to your driveway.
            </motion.p>

            {/* Features — Stacked, Premium Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative"
                >
                  <div className={`absolute -inset-3 bg-gradient-to-br ${f.accent} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-gold/30 group-hover:bg-gold/5 transition-all duration-300">
                        <f.icon size={18} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[15px] font-semibold tracking-wide group-hover:text-gold transition-colors duration-300">{f.title}</h3>
                    </div>
                    <p className="text-text-muted text-[13px] leading-[1.8] pl-[52px]">{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {/* Decorative gradient line on top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="py-10 md:py-14 px-6"
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
                </motion.div>
              ))}
            </div>

            {/* Decorative gradient line on bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
