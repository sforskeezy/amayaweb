"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Exterior Detail",
    description: "Hand wash, clay bar decontamination, machine polish, and premium sealant protection. Your paint, restored to a mirror finish.",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200",
    span: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    title: "Interior Detail",
    description: "Deep extraction, leather conditioning, surface sanitization, and odor elimination.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    span: "",
    featured: false,
  },
  {
    title: "Ceramic Coating",
    description: "Multi-year hydrophobic protection with professional-grade ceramic technology.",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=800",
    span: "",
    featured: false,
  },
  {
    title: "Full Detail",
    description: "The complete transformation — interior and exterior brought to showroom condition.",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800",
    span: "md:col-span-2",
    featured: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 sm:mb-16 md:mb-20 gap-4 sm:gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-3 sm:mb-4"
            >
              What We Offer
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[1.05]"
            >
              Our Services
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary max-w-sm text-[13px] sm:text-[15px] leading-relaxed"
          >
            Every vehicle receives a tailored approach. We don&apos;t do shortcuts — only precision work with premium products.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {services.map((service, i) => (
            <motion.a
              href="#contact"
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden cursor-pointer ${service.span} ${service.featured ? "min-h-[300px] sm:min-h-[400px] md:min-h-[600px]" : "min-h-[220px] sm:min-h-[260px] md:min-h-[290px]"}`}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={service.featured ? "(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

              <div className="absolute inset-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={`font-[var(--font-display)] tracking-[-0.01em] mb-1.5 sm:mb-2 ${service.featured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl md:text-2xl"}`}>
                      {service.title}
                    </h3>
                    <p className={`text-white/60 leading-relaxed ${service.featured ? "text-[13px] sm:text-[15px] max-w-md" : "text-[12px] sm:text-[13px] max-w-xs"}`}>
                      {service.description}
                    </p>
                  </div>
                  <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <ArrowUpRight size={14} className="text-white group-hover:text-bg-warm transition-colors sm:hidden" />
                    <ArrowUpRight size={16} className="text-white group-hover:text-bg-warm transition-colors hidden sm:block" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
