"use client";

import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-bg-warm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-[var(--font-display)] text-2xl tracking-wide">
              <span className="text-gold font-semibold italic">Amaya&apos;s</span>
            </span>
            <p className="text-text-muted text-[13px] leading-relaxed mt-4 max-w-xs">
              Premium mobile auto detailing in Lugoff, South Carolina. Showroom-quality care, delivered to your door.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com/p/Amayas-Auto-Detailing-61576045287455/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-gold transition-colors text-[13px]"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-gold transition-colors text-[13px]"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {["Exterior Detail", "Interior Detail", "Full Detail", "Ceramic Coating", "Paint Correction", "Mobile Detailing"].map(
                (s) => (
                  <li key={s}>
                    <a href="#services" className="text-text-muted hover:text-text text-[13px] transition-colors">
                      {s}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About", href: "#about" },
                { label: "Gallery", href: "#gallery" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-text-muted hover:text-text text-[13px] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[13px] text-text-secondary">Lugoff, SC</p>
                  <p className="text-[12px] text-text-muted">Serving Camden, Columbia & surrounding areas</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold shrink-0" strokeWidth={1.5} />
                <a href="tel:+18033371400" className="text-[13px] text-text-secondary hover:text-text transition-colors">
                  (803) 337-1400
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} className="text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[13px] text-text-secondary">Mon – Sat: 8am – 6pm</p>
                  <p className="text-[12px] text-text-muted">Sunday by appointment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[12px]">
            &copy; 2026 Amaya&apos;s Auto Detailing. All rights reserved.
          </p>
          <p className="text-text-muted text-[12px]">
            Premium Mobile Detailing &bull; Lugoff, SC
          </p>
        </div>
      </div>
    </footer>
  );
}
