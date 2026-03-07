"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { useBooking } from "./BookingContext";

export default function Hero() {
  const booking = useBooking();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const tryPlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    const p = vid.play();
    if (p) p.catch(() => {});
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;

    const onReady = () => {
      setVideoReady(true);
      tryPlay();
    };

    vid.addEventListener("loadeddata", onReady);
    vid.addEventListener("canplay", onReady);

    if (vid.readyState >= 2) {
      onReady();
    } else {
      vid.load();
    }

    const forcePlay = setTimeout(tryPlay, 800);

    return () => {
      vid.removeEventListener("loadeddata", onReady);
      vid.removeEventListener("canplay", onReady);
      clearTimeout(forcePlay);
    };
  }, [tryPlay]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[600px] sm:min-h-[700px] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <img
          src="/video/hero-poster-landscape.jpg"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />

        <video
          ref={videoRef}
          src="/video/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: "center 30%" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-bg-warm" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end pb-20 sm:pb-24 md:pb-28 lg:pb-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 w-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-[2px] bg-gold mb-5 sm:mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gold text-[10px] sm:text-[11px] md:text-[13px] tracking-[0.25em] sm:tracking-[0.3em] uppercase font-medium mb-3 sm:mb-5"
          >
            Premium Mobile Detailing &mdash; Lugoff, SC
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] text-[clamp(2.4rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.02em] font-medium max-w-[900px]"
            >
              The{" "}
              <span className="font-[var(--font-accent)] text-gold italic tracking-normal">Art</span>{" "}
              of
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] text-[clamp(2.4rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.02em] font-medium"
            >
              Detailing
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-5 sm:mt-8 md:mt-10"
          >
            <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-md leading-relaxed mb-5 sm:mb-0 sm:float-left sm:mr-6">
              Meticulous care for your vehicle, delivered to your door. Where precision meets passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:inline-flex sm:mt-1">
              <button
                onClick={booking.open}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gold hover:bg-gold-light text-bg-warm text-[11px] sm:text-[12px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer w-full sm:w-auto text-center"
              >
                Book a Detail
              </button>
              <a
                href="#services"
                className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/20 hover:border-white/40 text-text text-[11px] sm:text-[12px] font-medium tracking-[0.15em] uppercase transition-all duration-300 backdrop-blur-sm w-full sm:w-auto text-center"
              >
                Our Services
              </a>
            </div>
            <div className="clear-both" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-text-secondary" strokeWidth={1} />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-bg-warm to-transparent z-[5]" />
    </section>
  );
}
