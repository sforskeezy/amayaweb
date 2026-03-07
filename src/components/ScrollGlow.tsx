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

  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.12, 0.3, 0.25, 0.15]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["20vh", "75vh"]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      <motion.div
        style={{ opacity: glowOpacity, top: glowY }}
        className="absolute -left-[200px] w-[600px] h-[600px] rounded-full will-change-[opacity,top]"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.2)_0%,rgba(212,168,67,0.06)_40%,transparent_70%)] blur-[80px]" />
      </motion.div>

      <motion.div
        style={{ opacity: glowOpacity, top: glowY }}
        className="absolute -right-[150px] w-[500px] h-[500px] rounded-full will-change-[opacity,top]"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(212,168,67,0.15)_0%,rgba(184,146,46,0.04)_45%,transparent_70%)] blur-[80px]" />
      </motion.div>
    </div>
  );
}
