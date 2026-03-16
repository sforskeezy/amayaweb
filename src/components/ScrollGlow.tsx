"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollGlow() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const leftOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.18, 0.35, 0.55, 0.7]);
  const rightOpacity = useTransform(smoothProgress, [0, 0.3, 0.6, 1], [0.14, 0.3, 0.5, 0.65]);
  const topOpacity = useTransform(smoothProgress, [0, 0.15, 0.5, 1], [0.12, 0.2, 0.35, 0.5]);

  const leftY = useTransform(smoothProgress, [0, 1], ["10vh", "55vh"]);
  const rightY = useTransform(smoothProgress, [0, 1], ["15vh", "60vh"]);

  const leftScale = useTransform(smoothProgress, [0, 1], [0.85, 1.3]);
  const rightScale = useTransform(smoothProgress, [0, 1], [0.9, 1.25]);

  const edgeLeftOpacity = useTransform(smoothProgress, [0, 0.2, 0.6, 1], [0.06, 0.12, 0.22, 0.3]);
  const edgeRightOpacity = useTransform(smoothProgress, [0, 0.2, 0.6, 1], [0.05, 0.1, 0.18, 0.25]);

  if (isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          style={{ opacity: topOpacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[350px]"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.18)_0%,rgba(212,168,67,0.06)_50%,transparent_80%)] blur-[60px]" />
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.08, 0.2, 0.35]) }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[250px]"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.15)_0%,rgba(184,146,46,0.05)_50%,transparent_80%)] blur-[50px]" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Left edge light strip */}
      <motion.div
        style={{ opacity: edgeLeftOpacity }}
        className="absolute left-0 top-0 w-[3px] h-full"
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
      </motion.div>

      {/* Right edge light strip */}
      <motion.div
        style={{ opacity: edgeRightOpacity }}
        className="absolute right-0 top-0 w-[3px] h-full"
      >
        <div className="w-full h-full bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      </motion.div>

      {/* Primary left glow */}
      <motion.div
        style={{ opacity: leftOpacity, top: leftY, scale: leftScale }}
        className="absolute -left-[180px] w-[650px] h-[650px] rounded-full will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.25)_0%,rgba(212,168,67,0.1)_30%,rgba(212,168,67,0.03)_55%,transparent_75%)] blur-[90px]" />
      </motion.div>

      {/* Primary right glow */}
      <motion.div
        style={{ opacity: rightOpacity, top: rightY, scale: rightScale }}
        className="absolute -right-[140px] w-[550px] h-[550px] rounded-full will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.2)_0%,rgba(184,146,46,0.08)_35%,rgba(184,146,46,0.02)_55%,transparent_75%)] blur-[90px]" />
      </motion.div>

      {/* Top ambient wash */}
      <motion.div
        style={{ opacity: topOpacity }}
        className="absolute -top-[80px] left-1/2 -translate-x-1/2 w-[110vw] h-[400px]"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.12)_0%,rgba(232,200,106,0.04)_40%,transparent_75%)] blur-[80px]" />
      </motion.div>

      {/* Secondary left accent – sits lower, subtler */}
      <motion.div
        style={{
          opacity: useTransform(smoothProgress, [0, 0.4, 1], [0.06, 0.15, 0.3]),
          top: useTransform(smoothProgress, [0, 1], ["50vh", "80vh"]),
        }}
        className="absolute -left-[100px] w-[400px] h-[400px] rounded-full will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(232,200,106,0.15)_0%,rgba(212,168,67,0.04)_50%,transparent_75%)] blur-[100px]" />
      </motion.div>

      {/* Secondary right accent */}
      <motion.div
        style={{
          opacity: useTransform(smoothProgress, [0, 0.4, 1], [0.05, 0.12, 0.25]),
          top: useTransform(smoothProgress, [0, 1], ["45vh", "75vh"]),
        }}
        className="absolute -right-[80px] w-[350px] h-[350px] rounded-full will-change-transform"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(232,200,106,0.12)_0%,rgba(184,146,46,0.03)_50%,transparent_75%)] blur-[100px]" />
      </motion.div>

      {/* Bottom horizon glow – appears as you scroll deeper */}
      <motion.div
        style={{
          opacity: useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 0.08, 0.2, 0.35]),
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[300px]"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,rgba(212,168,67,0.18)_0%,rgba(212,168,67,0.05)_50%,transparent_80%)] blur-[70px]" />
      </motion.div>
    </div>
  );
}
