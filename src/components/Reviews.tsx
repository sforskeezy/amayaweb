"use client";

import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const reviews = [
  {
    name: "Marcus T.",
    car: "BMW M4",
    text: "Absolutely incredible work. My car looks better than the day I drove it off the lot. The attention to every single detail is unmatched. I've tried three other detailers and nobody comes close.",
    rating: 5,
    initials: "MT",
    color: "from-amber-500/20 to-orange-500/20",
    featured: true,
  },
  {
    name: "Sarah J.",
    car: "Tesla Model 3",
    text: "They came right to my driveway and the results were stunning. Best mobile detailing service I've ever used.",
    rating: 5,
    initials: "SJ",
    color: "from-blue-500/20 to-cyan-500/20",
    featured: false,
  },
  {
    name: "David L.",
    car: "Ford F-150",
    text: "My truck was destroyed after a camping trip. Amaya's made it look showroom-new. The interior smells amazing and every surface sparkles.",
    rating: 5,
    initials: "DL",
    color: "from-green-500/20 to-emerald-500/20",
    featured: false,
  },
  {
    name: "Jessica M.",
    car: "Mercedes C-Class",
    text: "The ceramic coating is phenomenal. Water beads right off and the paint has this depth I didn't know was possible. Worth every penny.",
    rating: 5,
    initials: "JM",
    color: "from-purple-500/20 to-pink-500/20",
    featured: false,
  },
  {
    name: "Chris R.",
    car: "Chevrolet Tahoe",
    text: "Three kids and a dog — my SUV needed a miracle. They delivered. Exceptional service and so convenient having them come to our house.",
    rating: 5,
    initials: "CR",
    color: "from-rose-500/20 to-red-500/20",
    featured: false,
  },
  {
    name: "Amanda K.",
    car: "Audi Q5",
    text: "I'm extremely particular about my car. Amaya's exceeded every expectation. The professionalism and quality is on another level entirely.",
    rating: 5,
    initials: "AK",
    color: "from-gold/20 to-yellow-500/20",
    featured: false,
  },
];

function TypewriterText({
  text,
  speed = 18,
  delay = 0,
  className = "",
}: {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, text, speed, delay]);

  return (
    <p ref={ref} className={className}>
      {isInView ? displayed : "\u00A0"}
      {isInView && !done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[1em] bg-gold ml-0.5 align-text-bottom"
        />
      )}
    </p>
  );
}

function ReviewCard({
  review,
  index,
  className = "",
}: {
  review: (typeof reviews)[0];
  index: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative p-5 sm:p-6 md:p-8 border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 bg-gradient-to-br from-white/[0.02] to-transparent ${className}`}
    >
      <Quote
        size={32}
        className="text-gold/20 mb-4 rotate-180"
        strokeWidth={1}
        fill="currentColor"
      />

      <TypewriterText
        text={review.text}
        speed={review.featured ? 15 : 22}
        delay={300 + index * 200}
        className={`text-text/90 leading-[1.7] sm:leading-[1.8] mb-5 sm:mb-6 min-h-[3em] sm:min-h-[4em] ${review.featured ? "text-[15px] sm:text-[17px]" : "text-[13px] sm:text-[14px]"}`}
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.15 }}
      >
        <div className="flex gap-1 mb-5">
          {[...Array(review.rating)].map((_, j) => (
            <Star key={j} size={12} className="text-gold fill-gold" />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-[12px] font-semibold tracking-wide`}
          >
            {review.initials}
          </div>
          <div>
            <p className="text-sm font-medium">{review.name}</p>
            <p className="text-text-muted text-[12px]">{review.car}</p>
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/10 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Reviews() {
  const featured = reviews[0];
  const rest = reviews.slice(1);

  return (
    <section id="reviews" className="py-16 sm:py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 md:mb-20 gap-4 sm:gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase mb-3 sm:mb-4"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-[var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em]"
            >
              What Our Clients Say
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="flex flex-col items-start sm:items-end">
              <div className="flex gap-0.5 sm:gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold sm:w-[18px] sm:h-[18px]" />
                ))}
              </div>
              <span className="text-text-secondary text-[12px] sm:text-[13px]">
                5.0 on Google & Facebook
              </span>
            </div>
            <div className="w-px h-8 sm:h-10 bg-white/10" />
            <div className="sm:text-right">
              <p className="text-2xl sm:text-3xl font-[var(--font-display)] font-bold text-gold">
                50+
              </p>
              <p className="text-text-muted text-[11px] sm:text-[12px]">Happy Clients</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div className="lg:col-span-5">
            <ReviewCard review={featured} index={0} className="h-full" />
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {rest.map((review, i) => (
              <ReviewCard key={review.name} review={review} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
