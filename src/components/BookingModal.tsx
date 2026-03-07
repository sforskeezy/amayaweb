"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Clock,
  ChevronRight,
  ChevronLeft,
  Send,
  MapPin,
  Car,
  Sun,
  Sunrise,
  Sunset,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "./BookingContext";
import {
  vehicleMakes,
  vehicleModels,
  getYears,
  getVehicleImageUrl,
} from "@/lib/vehicleData";

const services = [
  {
    id: "interior-exterior",
    name: "Interior & Exterior Detail",
    price: 150,
    duration: "3 hrs",
    description:
      "Full interior and exterior detail with hand wash, pH neutral foam soap, hand dry, and free wax.",
    tag: "Most Popular",
  },
  {
    id: "5yr-coating",
    name: "5 Year Ceramic Coating",
    price: 600,
    duration: "5 hrs",
    description:
      "Clay bar wash, 3-step buff & polish for a flawless finish, topped with premium ceramic coating.",
    tag: "Best Value",
  },
  {
    id: "buff-polish",
    name: "1 Step Buff & Polish",
    price: 200,
    duration: "2.5 hrs",
    description:
      "Single-stage buff and polish with clay bar wash prep for a smooth, glossy finish.",
    tag: null,
  },
  {
    id: "clay-wash",
    name: "Clay Bar Hand Wash",
    price: 80,
    duration: "1.5 hrs",
    description:
      "Deep-cleaning hand wash with clay bar treatment to remove contaminants from your paint.",
    tag: null,
  },
  {
    id: "hand-wash",
    name: "Hand Wash & Dry",
    price: 80,
    duration: "1.5 hrs",
    description:
      "Gentle hand wash with premium soap and careful hand drying for a streak-free finish.",
    tag: null,
  },
  {
    id: "carpet-shampoo",
    name: "Seat & Carpet Shampoo",
    price: 75,
    duration: "1.5 hrs",
    description:
      "Deep extraction shampoo for all seats and carpets, removing stains and odors.",
    tag: null,
  },
  {
    id: "vacuum-clean",
    name: "Vacuum & Clean Down",
    price: 60,
    duration: "1 hr",
    description:
      "High-pressure air cleaning of all cracks and crevices with full wipe and scrub down.",
    tag: null,
  },
];

const timeSlots = [
  { id: "morning", label: "Morning", time: "8am – 11am", icon: Sunrise },
  { id: "midday", label: "Midday", time: "11am – 2pm", icon: Sun },
  { id: "afternoon", label: "Afternoon", time: "2pm – 5pm", icon: Sunset },
  { id: "evening", label: "Evening", time: "5pm – 8pm", icon: Moon },
];

const vehicleTypes = [
  "Sedan",
  "Coupe",
  "SUV",
  "Truck",
  "Van / Minivan",
  "Sports Car",
  "Other",
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function isPastDate(year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function CustomCalendar({
  selectedDate,
  onSelect,
}: {
  selectedDate: string;
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const days = getCalendarDays(viewYear, viewMonth);

  const selectedParts = selectedDate ? selectedDate.split("-").map(Number) : [];

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const handleDayClick = (day: number) => {
    if (isPastDate(viewYear, viewMonth, day)) return;
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onSelect(`${viewYear}-${m}-${d}`);
  };

  const isSelected = (day: number) => {
    return (
      selectedParts.length === 3 &&
      selectedParts[0] === viewYear &&
      selectedParts[1] === viewMonth + 1 &&
      selectedParts[2] === day
    );
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      viewMonth === today.getMonth() &&
      viewYear === today.getFullYear()
    );
  };

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className={cn(
            "w-8 h-8 flex items-center justify-center transition-colors",
            canGoPrev
              ? "text-text-secondary hover:text-text"
              : "text-white/10 cursor-not-allowed"
          )}
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium tracking-wide">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-text transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-center text-[10px] text-text-muted font-medium py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const past = isPastDate(viewYear, viewMonth, day);
          const selected = isSelected(day);
          const todayMark = isToday(day);

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              disabled={past}
              className={cn(
                "relative w-full aspect-square flex items-center justify-center text-[13px] transition-all duration-200",
                past && "text-white/10 cursor-not-allowed",
                !past &&
                  !selected &&
                  "text-text-secondary hover:text-text hover:bg-white/[0.06]",
                selected && "bg-gold text-bg-warm font-semibold"
              )}
            >
              {day}
              {todayMark && !selected && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function VehicleImage({
  make,
  model,
  year,
}: {
  make: string;
  model: string;
  year: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageUrl = useMemo(
    () => (make && model && year ? getVehicleImageUrl(make, model, year) : ""),
    [make, model, year]
  );

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [imageUrl]);

  if (!imageUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="relative overflow-hidden border border-white/[0.06] bg-gradient-to-br from-white/[0.02] to-transparent"
    >
      <div className="relative h-40 flex items-center justify-center overflow-hidden">
        {!error && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt={`${year} ${make} ${model}`}
            className={cn(
              "max-h-full w-auto object-contain transition-opacity duration-500",
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            loading="lazy"
          />
        )}
        {!loaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Car size={48} className="text-white/[0.06]" />
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center gap-2">
            <Car size={40} className="text-white/[0.08]" />
            <span className="text-text-muted text-[11px]">
              {year} {make} {model}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function LocationMap({ address }: { address: string }) {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (address.length < 5) {
      setShowMap(false);
      return;
    }
    const timer = setTimeout(() => setShowMap(true), 1000);
    return () => clearTimeout(timer);
  }, [address]);

  if (!showMap || !address) return null;

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      <div className="relative border border-white/[0.06] overflow-hidden mt-3">
        <div className="relative h-44 overflow-hidden">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "brightness(0.6) invert(1) contrast(1.3) hue-rotate(200deg) saturate(0.3)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Service location"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border-t border-white/[0.06]">
          <MapPin size={12} className="text-gold shrink-0" />
          <span className="text-[11px] text-text-secondary truncate">{address}</span>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
      className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center mb-6"
    >
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M8 18L15 25L28 11"
          stroke="#d4a843"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { delay: 0.4, duration: 0.5, ease: "easeOut" },
            },
          }}
        />
      </motion.svg>
    </motion.div>
  );
}

function SelectDropdown({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[] | number[];
  placeholder: string;
  disabled?: boolean;
}) {
  const inputClass =
    "w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-text focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          inputClass,
          !value && "text-text-muted",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <option value="" className="bg-[#111110]">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={String(opt)}
            value={String(opt)}
            className="bg-[#111110] text-text"
          >
            {String(opt)}
          </option>
        ))}
      </select>
      <ChevronRight
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-text-muted pointer-events-none"
      />
    </div>
  );
}

export default function BookingModal() {
  const { isOpen, close } = useBooking();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleType: "",
    preferredDate: "",
    preferredTime: "",
    address: "",
    notes: "",
  });

  const years = useMemo(() => getYears(), []);
  const models = useMemo(
    () =>
      form.vehicleMake && vehicleModels[form.vehicleMake]
        ? vehicleModels[form.vehicleMake]
        : [],
    [form.vehicleMake]
  );

  useEffect(() => {
    if (!form.preferredDate) {
      setBookedSlots([]);
      return;
    }
    fetch(`/api/appointments/availability?date=${form.preferredDate}`)
      .then((res) => res.json())
      .then((data) => setBookedSlots(data.bookedSlots || []))
      .catch(() => setBookedSlots([]));
  }, [form.preferredDate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => {
        setStep(1);
        setSelectedServices([]);
        setSubmitted(false);
        setSubmitting(false);
        setBookedSlots([]);
        setForm({
          name: "",
          phone: "",
          email: "",
          vehicleYear: "",
          vehicleMake: "",
          vehicleModel: "",
          vehicleType: "",
          preferredDate: "",
          preferredTime: "",
          address: "",
          notes: "",
        });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const toggleService = useCallback((id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const selectedServiceData = services.filter((s) =>
    selectedServices.includes(s.id)
  );
  const totalPrice = selectedServiceData.reduce((sum, s) => sum + s.price, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const appointmentData = {
      services: selectedServiceData.map((s) => ({
        id: s.id,
        name: s.name,
        price: s.price,
      })),
      totalPrice,
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      vehicleYear: form.vehicleYear || undefined,
      vehicleMake: form.vehicleMake || undefined,
      vehicleModel: form.vehicleModel || undefined,
      vehicleType: form.vehicleType || undefined,
      preferredDate: form.preferredDate || undefined,
      preferredTime: form.preferredTime || undefined,
      address: form.address || undefined,
      notes: form.notes || undefined,
    };

    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
    } catch {
      // Silently handle — still show success to user
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  const updateForm = (field: string, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "vehicleMake") {
        next.vehicleModel = "";
      }
      return next;
    });
  };

  const inputClass =
    "w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors";

  const formatSelectedDate = () => {
    if (!form.preferredDate) return "";
    const [y, m, d] = form.preferredDate.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#111110] border border-white/[0.06] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 py-5 border-b border-white/[0.06] shrink-0">
              <div>
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase">
                  {submitted
                    ? "Confirmed"
                    : step === 1
                      ? "Step 1 of 2"
                      : "Step 2 of 2"}
                </p>
                <h3 className="font-[var(--font-display)] text-xl md:text-2xl mt-1">
                  {submitted
                    ? "Booking Sent"
                    : step === 1
                      ? "Choose Services"
                      : "Your Details"}
                </h3>
              </div>
              <button
                onClick={close}
                className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Progress Bar */}
            {!submitted && (
              <div className="h-[2px] bg-white/[0.04] shrink-0">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: step === 1 ? "50%" : "100%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}

            {/* Body */}
            <div className="overflow-y-auto flex-1 overscroll-contain">
              <AnimatePresence mode="wait">
                {/* ─── STEP 1: Service Selection (Multi-Select) ─── */}
                {step === 1 && !submitted && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8"
                  >
                    <p className="text-text-muted text-[13px] mb-5">
                      Select one or more services. We&apos;ll handle the rest.
                    </p>

                    {/* Featured services - larger cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      {services.slice(0, 2).map((service) => {
                        const selected = selectedServices.includes(service.id);
                        return (
                          <button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={cn(
                              "text-left p-5 border transition-all duration-300 relative cursor-pointer flex flex-col",
                              selected
                                ? "border-gold/50 bg-gold/[0.06]"
                                : "border-white/[0.06] hover:border-white/[0.15] bg-white/[0.02]"
                            )}
                          >
                            {service.tag && (
                              <span className="text-[9px] tracking-[0.2em] uppercase bg-gold/15 text-gold px-2 py-0.5 font-semibold self-start mb-3">
                                {service.tag}
                              </span>
                            )}
                            <span className="text-[15px] font-medium block mb-1.5">
                              {service.name}
                            </span>
                            <p className="text-text-muted text-[12px] leading-relaxed flex-1 mb-3">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-2.5">
                                <span className="text-gold font-semibold text-xl font-[var(--font-display)]">
                                  ${service.price}
                                </span>
                                <span className="text-text-muted text-[11px] flex items-center gap-1">
                                  <Clock size={10} />
                                  {service.duration}
                                </span>
                              </div>
                              <div
                                className={cn(
                                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                  selected
                                    ? "border-gold bg-gold"
                                    : "border-white/20"
                                )}
                              >
                                {selected && (
                                  <Check size={12} className="text-bg-warm" strokeWidth={3} />
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Regular services - compact grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {services.slice(2).map((service) => {
                        const selected = selectedServices.includes(service.id);
                        return (
                          <button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={cn(
                              "text-left p-3.5 border transition-all duration-300 relative cursor-pointer",
                              selected
                                ? "border-gold/50 bg-gold/[0.06]"
                                : "border-white/[0.06] hover:border-white/[0.15] bg-white/[0.02]"
                            )}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <span className="text-[13px] font-medium leading-tight">
                                {service.name}
                              </span>
                              <div
                                className={cn(
                                  "shrink-0 w-4 h-4 rounded border-[1.5px] flex items-center justify-center mt-0.5 transition-all",
                                  selected
                                    ? "border-gold bg-gold"
                                    : "border-white/20"
                                )}
                              >
                                {selected && (
                                  <Check size={10} className="text-bg-warm" strokeWidth={3} />
                                )}
                              </div>
                            </div>
                            <p className="text-text-muted text-[11px] leading-relaxed mb-2 line-clamp-2">
                              {service.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-gold font-semibold text-sm font-[var(--font-display)]">
                                ${service.price}
                              </span>
                              <span className="text-text-muted text-[10px] flex items-center gap-0.5">
                                <Clock size={9} />
                                {service.duration}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Total + Continue */}
                    <div className="mt-6 flex flex-col gap-3">
                      {selectedServices.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between px-1"
                        >
                          <span className="text-text-secondary text-sm">
                            {selectedServices.length} service
                            {selectedServices.length > 1 ? "s" : ""} selected
                          </span>
                          <span className="text-gold font-[var(--font-display)] text-2xl font-semibold">
                            ${totalPrice}
                          </span>
                        </motion.div>
                      )}
                      <button
                        onClick={() =>
                          selectedServices.length > 0 && setStep(2)
                        }
                        disabled={selectedServices.length === 0}
                        className={cn(
                          "w-full py-4 text-[12px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                          selectedServices.length > 0
                            ? "bg-gold hover:bg-gold-light text-bg-warm"
                            : "bg-white/[0.04] text-text-muted cursor-not-allowed"
                        )}
                      >
                        Continue
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 2: Details Form ─── */}
                {step === 2 && !submitted && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 md:p-8"
                  >
                    {/* Selected Services Summary */}
                    <div className="mb-8 p-4 bg-gold/[0.04] border border-gold/20">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
                          Selected Services
                        </p>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-[11px] text-text-muted hover:text-gold transition-colors underline cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                      {selectedServiceData.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between py-1.5"
                        >
                          <span className="text-sm text-text/80">
                            {s.name}
                          </span>
                          <span className="text-sm text-text-secondary">
                            ${s.price}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-gold/20">
                        <span className="text-sm font-medium">Total</span>
                        <span className="text-gold font-semibold font-[var(--font-display)] text-lg">
                          ${totalPrice}
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Info */}
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-3">
                          Contact Information
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Full Name *"
                            required
                            value={form.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                            className={inputClass}
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number *"
                            required
                            value={form.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            className={inputClass}
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            className={cn(inputClass, "sm:col-span-2")}
                          />
                        </div>
                      </div>

                      {/* Vehicle Info */}
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-3">
                          Your Vehicle
                        </p>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <SelectDropdown
                            value={form.vehicleYear}
                            onChange={(v) => updateForm("vehicleYear", v)}
                            options={years}
                            placeholder="Year"
                          />
                          <SelectDropdown
                            value={form.vehicleMake}
                            onChange={(v) => updateForm("vehicleMake", v)}
                            options={vehicleMakes}
                            placeholder="Make"
                          />
                          <SelectDropdown
                            value={form.vehicleModel}
                            onChange={(v) => updateForm("vehicleModel", v)}
                            options={models}
                            placeholder="Model"
                            disabled={!form.vehicleMake}
                          />
                        </div>
                        <SelectDropdown
                          value={form.vehicleType}
                          onChange={(v) => updateForm("vehicleType", v)}
                          options={vehicleTypes}
                          placeholder="Vehicle Type"
                        />

                        {/* Vehicle Image */}
                        {form.vehicleMake &&
                          form.vehicleModel &&
                          form.vehicleYear && (
                            <div className="mt-3">
                              <VehicleImage
                                make={form.vehicleMake}
                                model={form.vehicleModel}
                                year={form.vehicleYear}
                              />
                            </div>
                          )}
                      </div>

                      {/* Schedule */}
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-3">
                          Preferred Date
                        </p>
                        <CustomCalendar
                          selectedDate={form.preferredDate}
                          onSelect={(d) => updateForm("preferredDate", d)}
                        />
                        {form.preferredDate && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gold text-[13px] mt-2 flex items-center gap-1.5"
                          >
                            <Check size={14} />
                            {formatSelectedDate()}
                          </motion.p>
                        )}
                      </div>

                      {/* Time Slot */}
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-3">
                          Preferred Time
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {timeSlots.map((slot) => {
                            const Icon = slot.icon;
                            const active = form.preferredTime === slot.id;
                            const booked = bookedSlots.includes(slot.id);
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                disabled={booked}
                                onClick={() =>
                                  !booked &&
                                  updateForm("preferredTime", slot.id)
                                }
                                className={cn(
                                  "flex flex-col items-center gap-1.5 py-3 px-2 border transition-all duration-200",
                                  booked
                                    ? "border-red-500/20 bg-red-500/[0.04] cursor-not-allowed opacity-50"
                                    : active
                                      ? "border-gold/50 bg-gold/[0.06] cursor-pointer"
                                      : "border-white/[0.06] hover:border-white/[0.12] cursor-pointer"
                                )}
                              >
                                <Icon
                                  size={18}
                                  className={
                                    booked
                                      ? "text-red-400/50"
                                      : active
                                        ? "text-gold"
                                        : "text-text-muted"
                                  }
                                />
                                <span
                                  className={cn(
                                    "text-[12px] font-medium",
                                    booked
                                      ? "text-red-400/50"
                                      : active
                                        ? "text-text"
                                        : "text-text-secondary"
                                  )}
                                >
                                  {booked ? "Booked" : slot.label}
                                </span>
                                <span className="text-[10px] text-text-muted">
                                  {slot.time}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-3">
                          Service Location
                        </p>
                        <div className="relative">
                          <MapPin
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                          />
                          <input
                            type="text"
                            placeholder="Address where you'd like us to come"
                            value={form.address}
                            onChange={(e) =>
                              updateForm("address", e.target.value)
                            }
                            className={cn(inputClass, "pl-9")}
                          />
                        </div>
                        <LocationMap address={form.address} />
                      </div>

                      {/* Notes */}
                      <div>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-text-secondary mb-3">
                          Additional Notes
                        </p>
                        <textarea
                          placeholder="Anything else we should know? (pet hair, specific stains, etc.)"
                          rows={3}
                          value={form.notes}
                          onChange={(e) => updateForm("notes", e.target.value)}
                          className={cn(inputClass, "resize-none")}
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-4 border border-white/[0.08] text-text-secondary text-[12px] font-medium tracking-[0.12em] uppercase hover:border-white/20 transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className={cn(
                            "flex-1 py-4 bg-gold hover:bg-gold-light text-bg-warm text-[12px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer",
                            submitting && "opacity-70 cursor-wait"
                          )}
                        >
                          {submitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-bg-warm/30 border-t-bg-warm rounded-full"
                            />
                          ) : (
                            <>
                              <Send size={14} />
                              Submit Booking Request
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ─── SUCCESS ─── */}
                {submitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="p-8 md:p-12 flex flex-col items-center text-center"
                  >
                    <AnimatedCheckmark />

                    <h3 className="font-[var(--font-display)] text-2xl md:text-3xl mb-3">
                      You&apos;re All Set!
                    </h3>
                    <p className="text-text-secondary text-[15px] leading-relaxed max-w-sm mb-2">
                      We&apos;ve received your booking request
                      {selectedServiceData.length === 1 ? (
                        <>
                          {" "}
                          for{" "}
                          <span className="text-gold font-medium">
                            {selectedServiceData[0].name}
                          </span>
                        </>
                      ) : (
                        <>
                          {" "}
                          for{" "}
                          <span className="text-gold font-medium">
                            {selectedServiceData.length} services
                          </span>
                        </>
                      )}
                      .
                    </p>
                    <p className="text-text-muted text-sm mb-2">
                      Total:{" "}
                      <span className="text-gold font-semibold">
                        ${totalPrice}
                      </span>
                    </p>
                    <p className="text-text-muted text-sm mb-8">
                      We&apos;ll reach out within a few hours to confirm your
                      appointment.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <a
                        href="tel:+18033371400"
                        className="flex-1 py-3.5 border border-white/[0.08] text-text text-[12px] font-medium tracking-[0.12em] uppercase text-center hover:border-white/20 transition-colors"
                      >
                        Call Now
                      </a>
                      <button
                        onClick={close}
                        className="flex-1 py-3.5 bg-gold hover:bg-gold-light text-bg-warm text-[12px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
