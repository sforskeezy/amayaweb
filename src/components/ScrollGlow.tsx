"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollGlow() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const ambientOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [0, 0.03, 0.07, 0.12, 0.18, 0.24]
  );

  const leftOrbOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.85, 1],
    [0.02, 0.15, 0.4, 0.55, 0.65, 0.7]
  );
  const leftOrbY = useTransform(scrollYProgress, [0, 1], ["10vh", "70vh"]);
  const leftOrbScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.4]);

  const rightOrbOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 0.6, 0.85, 1],
    [0.02, 0.12, 0.35, 0.5, 0.6, 0.65]
  );
  const rightOrbY = useTransform(scrollYProgress, [0, 1], ["15vh", "65vh"]);
  const rightOrbScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3]);

  const centerOrbOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0.08, 0.25, 0.4, 0.5]
  );
  const centerOrbY = useTransform(scrollYProgress, [0, 1], ["30vh", "50vh"]);
  const centerOrbScale = useTransform(scrollYProgress, [0, 1], [0.6, 1.6]);

  const topEdgeOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 0.1, 0.2, 0.35]
  );

  const mobileAmbient = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0.03, 0.08, 0.14, 0.18]
  );
  const mobileOrbOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.02, 0.1, 0.25, 0.35, 0.4]
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          style={{ opacity: mobileAmbient }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.15)_0%,rgba(184,146,46,0.05)_50%,transparent_80%)]"
        />
        <motion.div
          style={{ opacity: mobileOrbOpacity }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full"
        >
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.3)_0%,rgba(212,168,67,0.08)_50%,transparent_75%)] blur-[60px]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Full-screen ambient warm wash — builds steadily with scroll */}
      <motion.div
        style={{ opacity: ambientOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(212,168,67,0.2)_0%,rgba(184,146,46,0.08)_40%,rgba(139,109,35,0.03)_65%,transparent_90%)]"
      />

      {/* Top-edge horizon glow */}
      <motion.div
        style={{ opacity: topEdgeOpacity }}
        className="absolute -top-[100px] left-0 right-0 h-[400px] bg-[radial-gradient(ellipse_100%_100%_at_50%_0%,rgba(232,200,106,0.18)_0%,rgba(212,168,67,0.06)_50%,transparent_80%)]"
      />

      {/* Left orb — large, warm gold */}
      <motion.div
        style={{ opacity: leftOrbOpacity, top: leftOrbY, scale: leftOrbScale }}
        className="absolute -left-[180px] w-[700px] h-[700px] rounded-full will-change-[opacity,top,transform]"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.3)_0%,rgba(212,168,67,0.1)_35%,rgba(184,146,46,0.03)_60%,transparent_80%)] blur-[100px]" />
      </motion.div>

      {/* Right orb — slightly cooler gold */}
      <motion.div
        style={{ opacity: rightOrbOpacity, top: rightOrbY, scale: rightOrbScale }}
        className="absolute -right-[140px] w-[600px] h-[600px] rounded-full will-change-[opacity,top,transform]"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(232,200,106,0.25)_0%,rgba(212,168,67,0.08)_40%,rgba(184,146,46,0.02)_65%,transparent_80%)] blur-[100px]" />
      </motion.div>

      {/* Center bloom — expands and intensifies as you scroll deeper */}
      <motion.div
        style={{ opacity: centerOrbOpacity, top: centerOrbY, scale: centerOrbScale }}
        className="absolute left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full will-change-[opacity,top,transform]"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.15)_0%,rgba(212,168,67,0.06)_30%,rgba(184,146,46,0.02)_55%,transparent_75%)] blur-[120px]" />
      </motion.div>

      {/* Subtle screen-wide brightness lift at bottom of scroll */}
      <motion.div
        style={{ opacity: ambientOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-[rgba(212,168,67,0.06)] via-transparent to-transparent"
      />
    </div>
  );
}
