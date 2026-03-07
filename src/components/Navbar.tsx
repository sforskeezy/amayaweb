"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";

const links = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const booking = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-700",
          scrolled
            ? "bg-bg-warm/70 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 sm:px-6 lg:px-10 h-16 sm:h-20">
          <a href="#" className="relative z-10">
            <img
              src="/logo.png"
              alt="Amaya's Mobile Auto Detail"
              className="h-10 sm:h-14 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-text-secondary hover:text-text tracking-[0.08em] uppercase transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+18033371400"
              className="text-sm text-text-secondary hover:text-text transition-colors flex items-center gap-2"
            >
              <Phone size={13} strokeWidth={1.5} />
              (803) 337-1400
            </a>
            <button
              onClick={booking.open}
              className="relative group px-6 py-2.5 text-sm font-medium text-bg-warm rounded-none bg-gold hover:bg-gold-light transition-all duration-300 tracking-wide uppercase text-[12px] cursor-pointer"
            >
              Book Now
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative z-10 p-2 text-text"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-bg-warm flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-[var(--font-display)] text-3xl tracking-wide text-text hover:text-gold transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center gap-4 mt-6"
              >
                <button
                  onClick={() => { setOpen(false); booking.open(); }}
                  className="px-10 py-3.5 bg-gold text-bg-warm font-medium tracking-wide uppercase text-sm cursor-pointer"
                >
                  Book Now
                </button>
                <a href="tel:+18033371400" className="text-text-secondary text-sm flex items-center gap-2">
                  <Phone size={14} />
                  (803) 337-1400
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
