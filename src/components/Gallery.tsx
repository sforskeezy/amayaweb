"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Facebook, Heart, MessageCircle, Share2, Play, Volume2, VolumeX, ExternalLink } from "lucide-react";

interface FBPost {
  id: string;
  message?: string;
  created_time: string;
  reactions: number;
  comments: number;
  shares: number;
  media?: {
    type: "video" | "photo" | "album";
    thumbnail: string;
    videoUrl?: string;
    url: string;
    title?: string;
  };
}

function timeAgo(dateStr: string) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function VideoCard({ post, index }: { post: FBPost; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setPlaying(true);
    } else {
      vid.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  }, [muted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.12] transition-all duration-500"
    >
      {/* Media */}
      <div
        className="relative aspect-[9/16] max-h-[400px] sm:max-h-[480px] overflow-hidden cursor-pointer bg-black"
        onClick={togglePlay}
      >
        {post.media?.videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={post.media.videoUrl}
              poster={post.media.thumbnail}
              loop
              muted={muted}
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Play size={22} className="text-white ml-1" fill="white" />
                </div>
              </div>
            )}
            {playing && (
              <button
                onClick={toggleMute}
                className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            )}
          </>
        ) : (
          <img
            src={post.media?.thumbnail}
            alt={post.media?.title || "Post"}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {post.message && (
          <p className="text-[13px] sm:text-[14px] leading-[1.6] text-text/80 mb-4 line-clamp-3">
            {post.message}
          </p>
        )}

        {/* Stats + Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-text-muted">
            {post.reactions > 0 && (
              <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px]">
                <Heart size={13} className="text-red-400" fill="currentColor" />
                {post.reactions}
              </span>
            )}
            {post.comments > 0 && (
              <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px]">
                <MessageCircle size={13} />
                {post.comments}
              </span>
            )}
            {post.shares > 0 && (
              <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px]">
                <Share2 size={13} />
                {post.shares}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-text-muted text-[10px] sm:text-[11px]">
              {timeAgo(post.created_time)}
            </span>
            {post.media?.url && (
              <a
                href={post.media.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-text-muted hover:text-[#1877F2] transition-colors"
              >
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [posts, setPosts] = useState<FBPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/facebook/feed")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="gallery" className="py-12 sm:py-24 md:py-36">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-14 gap-4">
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

        {/* Feed Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-text-muted text-sm">
            Unable to load feed. Visit our{" "}
            <a
              href="https://www.facebook.com/people/Amayas-Auto-Detailing/61576045287455/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] hover:underline"
            >
              Facebook page
            </a>{" "}
            to see our latest work.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {posts.map((post, i) => (
              <VideoCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
