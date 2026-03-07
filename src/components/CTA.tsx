"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { useBooking } from "./BookingContext";

export default function CTA() {
  const booking = useBooking();
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-36 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920"
          alt="Luxury car background"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-warm via-bg-warm/80 to-bg-warm" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[2px] bg-gold mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-[11px] tracking-[0.3em] uppercase mb-6"
          >
            Ready?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-[-0.02em] leading-[1.05] mb-5 sm:mb-6"
          >
            Let&apos;s make your car{" "}
            <span className="italic text-gold">unforgettable.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-text-secondary text-sm sm:text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8 sm:mb-12"
          >
            Serving Lugoff, Camden, Columbia, and surrounding areas. Free estimates, no obligations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={booking.open}
              className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gold hover:bg-gold-light text-bg-warm text-[11px] sm:text-[12px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer"
            >
              Book a Detail
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="https://www.facebook.com/p/Amayas-Auto-Detailing-61576045287455/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 border border-white/15 hover:border-white/30 text-text text-[11px] sm:text-[12px] font-medium tracking-[0.15em] uppercase transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <MessageCircle size={15} />
              Message on Facebook
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
