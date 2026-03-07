"use client";

import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-bg-warm">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {/* Brand + Social */}
          <div>
            <span className="font-[var(--font-display)] text-xl sm:text-2xl tracking-wide">
              <span className="text-gold font-semibold italic">Amaya&apos;s</span>
            </span>
            <p className="text-text-muted text-[12px] sm:text-[13px] leading-relaxed mt-3 max-w-xs">
              Premium mobile auto detailing in Lugoff, SC. Showroom-quality care, delivered to your door.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/p/Amayas-Auto-Detailing-61576045287455/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-gold transition-colors text-[12px] sm:text-[13px]"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-gold transition-colors text-[12px] sm:text-[13px]"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {[
                { label: "Services", href: "#services" },
                { label: "About", href: "#about" },
                { label: "Gallery", href: "#gallery" },
                { label: "Reviews", href: "#reviews" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-text-muted hover:text-text text-[12px] sm:text-[13px] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <MapPin size={13} className="text-gold shrink-0" strokeWidth={1.5} />
                <span className="text-[12px] sm:text-[13px] text-text-secondary">Lugoff, SC &middot; Camden &middot; Columbia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-gold shrink-0" strokeWidth={1.5} />
                <a href="tel:+18033371400" className="text-[12px] sm:text-[13px] text-text-secondary hover:text-text transition-colors">
                  (803) 337-1400
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={13} className="text-gold shrink-0" strokeWidth={1.5} />
                <span className="text-[12px] sm:text-[13px] text-text-secondary">Mon – Sat: 8am – 6pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-[11px] sm:text-[12px]">
            &copy; 2026 Amaya&apos;s Auto Detailing. All rights reserved.
          </p>
          <p className="text-text-muted/50 text-[10px] sm:text-[11px] tracking-[0.1em] uppercase">
            Managed by <span className="text-text-muted/70 font-medium">MOTRA LLC</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
