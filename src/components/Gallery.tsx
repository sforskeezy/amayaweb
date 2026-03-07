"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Facebook, X, ChevronLeft, ChevronRight, Expand } from "lucide-react";

const staticImages = [
  { src: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800", alt: "Mercedes detail", type: "image" as const },
  { src: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800", alt: "Classic car detail", type: "image" as const },
  { src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800", alt: "Sports car", type: "image" as const },
  { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800", alt: "Luxury vehicle", type: "image" as const },
  { src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800", alt: "Red sports car", type: "image" as const },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800", alt: "BMW detail", type: "image" as const },
];

type GalleryItem = {
  src: string;
  alt: string;
  type: "image" | "video";
  thumbnail?: string;
};

function VideoCard({ item, onClick }: { item: GalleryItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative w-full h-full overflow-hidden group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => videoRef.current?.play()?.catch(() => {})}
      onMouseLeave={() => { videoRef.current?.pause(); if (videoRef.current) videoRef.current.currentTime = 0; }}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.thumbnail}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
          <Play size={20} className="text-white ml-0.5" fill="white" />
        </div>
      </div>
      <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-[10px] tracking-[0.15em] uppercase text-white/80 font-medium">
        Video
      </div>
    </div>
  );
}

function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10 cursor-pointer"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10 cursor-pointer"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors z-10 cursor-pointer"
      >
        <ChevronRight size={32} />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-[90vw] h-[80vh] max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "video" ? (
          <video
            src={item.src}
            className="w-full h-full object-contain"
            controls
            autoPlay
            loop
            playsInline
          />
        ) : (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain"
            sizes="90vw"
            unoptimized
          />
        )}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[12px] tracking-[0.15em] uppercase">
        {index + 1} / {items.length}
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(staticImages);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [fbLoaded, setFbLoaded] = useState(false);

  const pageUrl = encodeURIComponent(
    "https://www.facebook.com/people/Amayas-Auto-Detailing/61576045287455/"
  );

  useEffect(() => {
    async function loadMedia() {
      const results: GalleryItem[] = [];
      try {
        const fbRes = await fetch("/api/facebook/media");
        const fbData = await fbRes.json();
        if (Array.isArray(fbData) && fbData.length > 0) {
          results.push(...fbData.map((m: { url: string; alt: string; type: string; thumbnail?: string }) => ({
            src: m.url, alt: m.alt, type: m.type as "image" | "video", thumbnail: m.thumbnail,
          })));
        }
      } catch { /* empty */ }
      try {
        const galleryRes = await fetch("/api/gallery");
        const galleryData = await galleryRes.json();
        if (Array.isArray(galleryData) && galleryData.length > 0) {
          results.push(...galleryData.map((img: { url: string; alt: string }) => ({
            src: img.url, alt: img.alt, type: "image" as const,
          })));
        }
      } catch { /* empty */ }
      if (results.length > 0) setItems(results);
    }
    loadMedia();
    const interval = setInterval(loadMedia, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : null));
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % items.length : null));

  const gridPattern = (index: number) => {
    const patterns = [
      "col-span-1 row-span-1",
      "col-span-1 row-span-2",
      "col-span-1 row-span-1",
      "col-span-2 row-span-1",
      "col-span-1 row-span-1",
      "col-span-1 row-span-1",
    ];
    return patterns[index % patterns.length];
  };

  return (
    <>
      <section id="gallery" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20 gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gold text-[11px] tracking-[0.3em] uppercase mb-4"
              >
                Our Work
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-[var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em]"
              >
                Gallery
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <a
                href="https://www.facebook.com/people/Amayas-Auto-Detailing/61576045287455/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-[#1877F2]/20 transition-colors"
              >
                <Facebook size={14} />
                Follow on Facebook
              </a>
            </motion.div>
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] lg:auto-rows-[280px] gap-3 md:gap-4">
            {items.map((item, i) => (
              <motion.div
                key={`${item.src}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.4) }}
                className={`${gridPattern(i)} relative overflow-hidden group cursor-pointer`}
                onClick={() => openLightbox(i)}
              >
                {item.type === "video" ? (
                  <VideoCard item={item} onClick={() => openLightbox(i)} />
                ) : (
                  <>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <Expand size={16} className="text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white/80 text-[11px] tracking-wide">{item.alt}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Facebook Feed — Compact inline widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 md:mt-20"
          >
            <div className="border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 flex items-center justify-center">
                    <Facebook size={14} className="text-[#1877F2]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amaya&apos;s Auto Detailing</p>
                    <p className="text-text-muted text-[11px]">Live feed &middot; auto-updates</p>
                  </div>
                </div>
                <a
                  href="https://www.facebook.com/people/Amayas-Auto-Detailing/61576045287455/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1877F2] text-[11px] tracking-[0.1em] uppercase font-medium hover:text-[#1466CC] transition-colors"
                >
                  View Page
                </a>
              </div>
              <div className="relative" style={{ height: 340 }}>
                {!fbLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
                    <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=800&height=340&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`}
                  width="100%"
                  height="340"
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={items}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
