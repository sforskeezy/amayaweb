"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Facebook } from "lucide-react";

export default function Gallery() {
  const [fbLoaded, setFbLoaded] = useState(false);

  const pageUrl = encodeURIComponent(
    "https://www.facebook.com/people/Amayas-Auto-Detailing/61576045287455/"
  );

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-36">
      <div className="max-w-[900px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-3 sm:mb-4"
            >
              Our Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em]"
            >
              Latest Work
            </motion.h2>
          </div>
          <motion.a
            href="https://www.facebook.com/people/Amayas-Auto-Detailing/61576045287455/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-[10px] sm:text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-[#1877F2]/20 transition-colors self-start"
          >
            <Facebook size={14} />
            Follow on Facebook
          </motion.a>
        </div>

        {/* Facebook Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 flex items-center justify-center">
                  <Facebook size={14} className="text-[#1877F2]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Amaya&apos;s Auto Detailing</p>
                  <p className="text-text-muted text-[10px] sm:text-[11px]">Live feed &middot; auto-updates</p>
                </div>
              </div>
              <a
                href="https://www.facebook.com/people/Amayas-Auto-Detailing/61576045287455/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] text-[10px] sm:text-[11px] tracking-[0.1em] uppercase font-medium hover:text-[#1466CC] transition-colors hidden sm:block"
              >
                View Page
              </a>
            </div>
            <div className="relative" style={{ height: 500 }}>
              {!fbLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
                  <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                </div>
              )}
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=800&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`}
                width="100%"
                height="500"
                style={{
                  border: "none",
                  overflow: "hidden",
                  filter: "invert(0.88) hue-rotate(180deg) contrast(0.9) brightness(1.1)",
                }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
                onLoad={() => setFbLoaded(true)}
                title="Amaya's Auto Detailing Facebook Feed"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
