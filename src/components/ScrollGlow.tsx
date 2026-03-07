"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollGlow() {
  const { scrollYProgress } = useScroll();

  const glow1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.6, 0.8, 1], [0, 0.15, 0.35, 0.5, 0.4, 0.25]);
  const glow2Opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7, 1], [0, 0.1, 0.3, 0.45, 0.2]);
  const glow3Opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85, 1], [0, 0.05, 0.2, 0.4, 0.3]);

  const glow1Y = useTransform(scrollYProgress, [0, 1], ["10vh", "70vh"]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], ["30vh", "85vh"]);
  const glow3Y = useTransform(scrollYProgress, [0, 1], ["50vh", "95vh"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Primary gold glow — left side */}
      <motion.div
        style={{ opacity: glow1Opacity, top: glow1Y }}
        className="absolute -left-[200px] w-[600px] h-[600px] rounded-full"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.25)_0%,rgba(212,168,67,0.08)_40%,transparent_70%)] blur-[80px]" />
      </motion.div>

      {/* Secondary warm glow — right side */}
      <motion.div
        style={{ opacity: glow2Opacity, top: glow2Y }}
        className="absolute -right-[150px] w-[500px] h-[500px] rounded-full"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.2)_0%,rgba(184,146,46,0.06)_45%,transparent_70%)] blur-[100px]" />
      </motion.div>

      {/* Tertiary subtle glow — center bottom */}
      <motion.div
        style={{ opacity: glow3Opacity, top: glow3Y }}
        className="absolute left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse,rgba(212,168,67,0.15)_0%,rgba(232,200,106,0.05)_50%,transparent_70%)] blur-[120px]" />
      </motion.div>
    </div>
  );
}
