"use client";

import { BookingProvider } from "@/components/BookingContext";
import BookingModal from "@/components/BookingModal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollGlow from "@/components/ScrollGlow";

export default function Home() {
  return (
    <BookingProvider>
      <main className="relative">
        <ScrollGlow />
        <Navbar />
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Gallery />
        <Process />
        <Reviews />
        <CTA />
        <Footer />
        <BookingModal />
      </main>
    </BookingProvider>
  );
}
