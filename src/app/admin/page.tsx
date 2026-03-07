"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Car,
  Check,
  Clock,
  Edit3,
  Eye,
  EyeOff,
  ImageIcon,
  KeyRound,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Trash2,
  User,
  Users,
  X,
  ClipboardList,
  DollarSign,
  FileText,
  ChevronDown,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Appointment = {
  _id: string;
  services: { id: string; name: string; price: number }[];
  totalPrice: number;
  name: string;
  phone: string;
  email?: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleType?: string;
  preferredDate?: string;
  preferredTime?: string;
  address?: string;
  notes?: string;
  status: string;
  createdAt: number;
};

type GalleryImage = {
  _id: string;
  url: string;
  alt: string;
  order: number;
};

type Customer = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleType?: string;
  notes?: string;
  totalSpent: number;
  jobCount: number;
  lastServiceDate?: string;
  lastServices?: string[];
  emailsSent: number;
  createdAt: number;
  updatedAt: number;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  confirmed: { label: "Confirmed", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  completed: { label: "Completed", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20" },
};

const TIME_LABELS: Record<string, string> = {
  morning: "Morning (8am–11am)",
  midday: "Midday (11am–2pm)",
  afternoon: "Afternoon (2pm–5pm)",
  evening: "Evening (5pm–8pm)",
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "Not specified";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatCard({ label, value, color }: { label: string; value: number | string; color: string }) {
  return (
    <div className="p-5 border border-white/[0.06] bg-white/[0.02]">
      <p className="text-text-muted text-[11px] tracking-[0.2em] uppercase mb-2">{label}</p>
      <p className={cn("text-3xl font-[var(--font-display)] font-bold", color)}>{value}</p>
    </div>
  );
}

function AppointmentCard({
  appt,
  onUpdateStatus,
  onDelete,
}: {
  appt: Appointment;
  onUpdateStatus: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}) {
  const status = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending;
  const vehicle = [appt.vehicleYear, appt.vehicleMake, appt.vehicleModel].filter(Boolean).join(" ");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border border-white/[0.06] bg-white/[0.02] overflow-hidden"
    >
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-lg font-medium">{appt.name}</h3>
              <span className={cn("text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border font-medium", status.bg, status.color)}>
                {status.label}
              </span>
            </div>
            <p className="text-gold font-[var(--font-display)] text-lg mt-1">${appt.totalPrice}</p>
          </div>
          <p className="text-text-muted text-[11px] shrink-0">{new Date(appt.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px] mb-4">
          <div className="flex items-center gap-2 text-text-secondary">
            <Phone size={13} className="text-text-muted shrink-0" />
            <a href={`tel:${appt.phone}`} className="hover:text-gold transition-colors">{appt.phone}</a>
          </div>
          {appt.email && (
            <div className="flex items-center gap-2 text-text-secondary">
              <Mail size={13} className="text-text-muted shrink-0" />
              <span className="truncate">{appt.email}</span>
            </div>
          )}
          {vehicle && (
            <div className="flex items-center gap-2 text-text-secondary">
              <Car size={13} className="text-text-muted shrink-0" />
              <span>{vehicle}</span>
            </div>
          )}
          {appt.preferredDate && (
            <div className="flex items-center gap-2 text-text-secondary">
              <Calendar size={13} className="text-text-muted shrink-0" />
              <span>{formatDate(appt.preferredDate)}{appt.preferredTime && ` • ${TIME_LABELS[appt.preferredTime] || appt.preferredTime}`}</span>
            </div>
          )}
          {appt.address && (
            <div className="flex items-center gap-2 text-text-secondary sm:col-span-2">
              <MapPin size={13} className="text-text-muted shrink-0" />
              <span className="truncate">{appt.address}</span>
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="text-text-muted text-[11px] tracking-[0.15em] uppercase mb-2">Services</p>
          <div className="flex flex-wrap gap-2">
            {appt.services.map((s) => (
              <span key={s.id} className="text-[12px] px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-text-secondary">
                {s.name} — ${s.price}
              </span>
            ))}
          </div>
        </div>

        {appt.notes && (
          <p className="text-text-muted text-[13px] italic mb-4 border-l-2 border-white/[0.06] pl-3">&ldquo;{appt.notes}&rdquo;</p>
        )}

        <div className="flex gap-2 flex-wrap">
          {appt.status === "pending" && (
            <>
              <button onClick={() => onUpdateStatus(appt._id, "confirmed")} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-emerald-500/20 transition-colors cursor-pointer">
                <Check size={13} /> Confirm
              </button>
              <button onClick={() => onUpdateStatus(appt._id, "cancelled")} className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-red-500/20 transition-colors cursor-pointer">
                <X size={13} /> Cancel
              </button>
            </>
          )}
          {appt.status === "confirmed" && (
            <>
              <button onClick={() => onUpdateStatus(appt._id, "completed")} className="flex items-center gap-1.5 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-blue-500/20 transition-colors cursor-pointer">
                <Check size={13} /> Complete
              </button>
              <button onClick={() => onUpdateStatus(appt._id, "cancelled")} className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-red-500/20 transition-colors cursor-pointer">
                <X size={13} /> Cancel
              </button>
            </>
          )}
          <button onClick={() => onDelete(appt._id)} className="flex items-center gap-1.5 px-4 py-2 border border-white/[0.06] text-text-muted text-[11px] tracking-[0.12em] uppercase font-medium hover:border-red-500/30 hover:text-red-400 transition-colors ml-auto cursor-pointer">
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Customer Edit Modal ─── */
function CustomerEditModal({
  customer,
  onClose,
  onSave,
}: {
  customer: Customer;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Customer>) => void;
}) {
  const [form, setForm] = useState({
    name: customer.name,
    phone: customer.phone,
    email: customer.email || "",
    address: customer.address || "",
    vehicleYear: customer.vehicleYear || "",
    vehicleMake: customer.vehicleMake || "",
    vehicleModel: customer.vehicleModel || "",
    notes: customer.notes || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(customer._id, form);
    setSaving(false);
  };

  const Field = ({ label, field, type = "text", placeholder = "" }: { label: string; field: keyof typeof form; type?: string; placeholder?: string }) => (
    <div>
      <label className="text-text-muted text-[11px] tracking-[0.15em] uppercase block mb-1.5">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-[#1a1a19] border border-white/[0.08] overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h3 className="font-[var(--font-display)] text-lg flex items-center gap-2">
            <Edit3 size={16} className="text-gold" /> Edit Customer
          </h3>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name" field="name" placeholder="John Doe" />
            <Field label="Phone" field="phone" type="tel" placeholder="(555) 123-4567" />
          </div>
          <Field label="Email" field="email" type="email" placeholder="john@example.com" />
          <Field label="Address" field="address" placeholder="123 Main St, City, ST" />
          <div className="grid grid-cols-3 gap-4">
            <Field label="Vehicle Year" field="vehicleYear" placeholder="2024" />
            <Field label="Make" field="vehicleMake" placeholder="Toyota" />
            <Field label="Model" field="vehicleModel" placeholder="Camry" />
          </div>
          <div>
            <label className="text-text-muted text-[11px] tracking-[0.15em] uppercase block mb-1.5">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              placeholder="Internal notes about this customer..."
              className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-white/[0.06]">
          <button onClick={onClose} className="px-5 py-2 border border-white/[0.08] text-text-muted text-[11px] tracking-[0.12em] uppercase font-medium hover:text-text transition-colors cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.name.trim() || !form.phone.trim()}
            className={cn(
              "flex items-center gap-2 px-6 py-2 text-[11px] tracking-[0.12em] uppercase font-semibold transition-all cursor-pointer",
              form.name.trim() && form.phone.trim() && !saving ? "bg-gold hover:bg-gold-light text-bg-warm" : "bg-white/[0.04] text-text-muted cursor-not-allowed"
            )}
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Email Modal ─── */
function EmailModal({
  customer,
  onClose,
  onSent,
}: {
  customer: Customer;
  onClose: () => void;
  onSent: () => void;
}) {
  const [emailType, setEmailType] = useState("thankyou");
  const [customSubject, setCustomSubject] = useState("");
  const [customBody, setCustomBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const emailTypes = [
    { id: "thankyou", label: "Thank You", desc: "Thank them for their business and ask for a review" },
    { id: "followup", label: "Follow Up", desc: "Remind them to schedule their next detail" },
    { id: "promo", label: "Promotion", desc: "Send a special offer for returning customers" },
    { id: "custom", label: "Custom", desc: "Write a custom email message" },
  ];

  const handleSend = async () => {
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/customers/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId: customer._id, emailType, customSubject, customBody }),
      });
      const data = await res.json();
      setResult({ success: data.success, message: data.message || data.error || "Unknown error" });
      if (data.success) onSent();
    } catch {
      setResult({ success: false, message: "Network error" });
    }
    setSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-[#1a1a19] border border-white/[0.08] overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <h3 className="font-[var(--font-display)] text-lg flex items-center gap-2">
            <Send size={16} className="text-gold" /> Send Email
          </h3>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-5 p-3 bg-white/[0.02] border border-white/[0.06]">
            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center shrink-0">
              <User size={18} className="text-gold" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{customer.name}</p>
              <p className="text-text-muted text-[12px] truncate">{customer.email || "No email on file"}</p>
            </div>
          </div>

          {!customer.email ? (
            <div className="p-4 border border-amber-400/20 bg-amber-400/5 text-amber-400 text-sm">
              This customer has no email address on file. Edit their profile to add one before sending emails.
            </div>
          ) : (
            <>
              <p className="text-text-muted text-[11px] tracking-[0.15em] uppercase mb-3">Email Type</p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {emailTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setEmailType(t.id)}
                    className={cn(
                      "p-3 border text-left transition-all cursor-pointer",
                      emailType === t.id
                        ? "border-gold/40 bg-gold/5"
                        : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                    )}
                  >
                    <p className={cn("text-sm font-medium", emailType === t.id ? "text-gold" : "text-text")}>{t.label}</p>
                    <p className="text-text-muted text-[11px] mt-0.5 line-clamp-2">{t.desc}</p>
                  </button>
                ))}
              </div>

              {emailType === "custom" && (
                <div className="space-y-3 mb-5">
                  <div>
                    <label className="text-text-muted text-[11px] tracking-[0.15em] uppercase block mb-1.5">Subject</label>
                    <input
                      type="text"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      placeholder="Email subject line..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-text-muted text-[11px] tracking-[0.15em] uppercase block mb-1.5">Message</label>
                    <textarea
                      value={customBody}
                      onChange={(e) => setCustomBody(e.target.value)}
                      rows={5}
                      placeholder="Write your custom message..."
                      className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors resize-none"
                    />
                  </div>
                </div>
              )}

              {result && (
                <div className={cn("p-3 border text-sm mb-4", result.success ? "border-emerald-400/20 bg-emerald-400/5 text-emerald-400" : "border-red-400/20 bg-red-400/5 text-red-400")}>
                  {result.message}
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-white/[0.06]">
          <button onClick={onClose} className="px-5 py-2 border border-white/[0.08] text-text-muted text-[11px] tracking-[0.12em] uppercase font-medium hover:text-text transition-colors cursor-pointer">
            {result?.success ? "Done" : "Cancel"}
          </button>
          {customer.email && !result?.success && (
            <button
              onClick={handleSend}
              disabled={sending || (emailType === "custom" && !customBody.trim())}
              className={cn(
                "flex items-center gap-2 px-6 py-2 text-[11px] tracking-[0.12em] uppercase font-semibold transition-all cursor-pointer",
                !sending ? "bg-gold hover:bg-gold-light text-bg-warm" : "bg-white/[0.04] text-text-muted cursor-not-allowed"
              )}
            >
              {sending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
              Send Email
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Customer Card ─── */
function CustomerCard({
  customer,
  onEdit,
  onEmail,
  onDelete,
}: {
  customer: Customer;
  onEdit: (c: Customer) => void;
  onEmail: (c: Customer) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const vehicle = [customer.vehicleYear, customer.vehicleMake, customer.vehicleModel].filter(Boolean).join(" ");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="border border-white/[0.06] bg-white/[0.02] overflow-hidden"
    >
      <div
        className="p-5 md:p-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 min-w-0 flex-1">
            <div className="w-11 h-11 bg-gold/10 flex items-center justify-center shrink-0">
              <User size={20} className="text-gold" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-medium">{customer.name}</h3>
                <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border bg-blue-400/10 border-blue-400/20 text-blue-400 font-medium">
                  {customer.jobCount} {customer.jobCount === 1 ? "job" : "jobs"}
                </span>
                {customer.emailsSent > 0 && (
                  <span className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 border bg-purple-400/10 border-purple-400/20 text-purple-400 font-medium">
                    {customer.emailsSent} {customer.emailsSent === 1 ? "email" : "emails"} sent
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                <span className="text-text-secondary text-[13px] flex items-center gap-1.5">
                  <Phone size={12} className="text-text-muted" />
                  {customer.phone}
                </span>
                {customer.email && (
                  <span className="text-text-secondary text-[13px] flex items-center gap-1.5 truncate">
                    <Mail size={12} className="text-text-muted" />
                    {customer.email}
                  </span>
                )}
                {vehicle && (
                  <span className="text-text-secondary text-[13px] flex items-center gap-1.5">
                    <Car size={12} className="text-text-muted" />
                    {vehicle}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <p className="text-gold font-[var(--font-display)] text-lg font-bold">${customer.totalSpent.toLocaleString()}</p>
            <ChevronDown size={16} className={cn("text-text-muted transition-transform", expanded && "rotate-180")} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-white/[0.06] pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-[13px] mb-5">
                {customer.address && (
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin size={13} className="text-text-muted shrink-0" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-text-secondary">
                  <DollarSign size={13} className="text-text-muted shrink-0" />
                  <span>Total spent: <span className="text-gold">${customer.totalSpent.toLocaleString()}</span></span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Hash size={13} className="text-text-muted shrink-0" />
                  <span>{customer.jobCount} completed {customer.jobCount === 1 ? "job" : "jobs"}</span>
                </div>
                {customer.lastServiceDate && (
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Calendar size={13} className="text-text-muted shrink-0" />
                    <span>Last service: {formatDate(customer.lastServiceDate)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-text-secondary">
                  <Clock size={13} className="text-text-muted shrink-0" />
                  <span>Customer since {new Date(customer.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {customer.lastServices && customer.lastServices.length > 0 && (
                <div className="mb-5">
                  <p className="text-text-muted text-[11px] tracking-[0.15em] uppercase mb-2">Last Services</p>
                  <div className="flex flex-wrap gap-2">
                    {customer.lastServices.map((s, i) => (
                      <span key={i} className="text-[12px] px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] text-text-secondary">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {customer.notes && (
                <p className="text-text-muted text-[13px] italic mb-5 border-l-2 border-white/[0.06] pl-3">
                  &ldquo;{customer.notes}&rdquo;
                </p>
              )}

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={(e) => { e.stopPropagation(); onEmail(customer); }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gold/10 border border-gold/20 text-gold text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-gold/20 transition-colors cursor-pointer"
                >
                  <Send size={13} /> Send Email
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(customer); }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white/[0.04] border border-white/[0.06] text-text-secondary text-[11px] tracking-[0.12em] uppercase font-medium hover:border-white/[0.12] transition-colors cursor-pointer"
                >
                  <Edit3 size={13} /> Edit
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(customer._id); }}
                  className="flex items-center gap-1.5 px-4 py-2 border border-white/[0.06] text-text-muted text-[11px] tracking-[0.12em] uppercase font-medium hover:border-red-500/30 hover:text-red-400 transition-colors ml-auto cursor-pointer"
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════ ADMIN PAGE ═══════════════════════ */

/* ─── Login Gate ─── */
function LoginGate({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("admin_auth", "true");
        onAuthenticated();
      } else {
        setError(data.error || "Incorrect passcode");
        setPasscode("");
      }
    } catch {
      setError("Connection error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-warm flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-gold/10 border border-gold/20 flex items-center justify-center">
            <Lock size={28} className="text-gold" />
          </div>
          <h1 className="font-[var(--font-display)] text-2xl mb-2">Admin Access</h1>
          <p className="text-text-muted text-sm">Enter your passcode to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <KeyRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type={showPasscode ? "text" : "password"}
              value={passcode}
              onChange={(e) => { setPasscode(e.target.value); setError(""); }}
              placeholder="Enter passcode"
              autoFocus
              className="w-full bg-white/[0.04] border border-white/[0.08] pl-11 pr-12 py-3.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPasscode(!showPasscode)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              {showPasscode ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 text-[13px] mb-4 px-1"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading || !passcode.trim()}
            className={cn(
              "w-full py-3.5 text-[11px] tracking-[0.15em] uppercase font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer",
              passcode.trim() && !loading
                ? "bg-gold hover:bg-gold-light text-bg-warm"
                : "bg-white/[0.04] text-text-muted cursor-not-allowed"
            )}
          >
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
            Unlock Dashboard
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-text-muted text-[12px] hover:text-text transition-colors flex items-center justify-center gap-1.5">
            <ArrowLeft size={12} /> Back to site
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_auth");
    if (stored === "true") setAuthenticated(true);
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-bg-warm flex items-center justify-center">
        <Loader2 size={32} className="text-gold animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginGate onAuthenticated={() => setAuthenticated(true)} />;
  }

  return <AdminDashboard onLogout={() => { sessionStorage.removeItem("admin_auth"); setAuthenticated(false); }} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"appointments" | "customers" | "gallery">("appointments");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customerSearch, setCustomerSearch] = useState("");

  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [addingImage, setAddingImage] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [emailingCustomer, setEmailingCustomer] = useState<Customer | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch { /* empty */ }
  }, []);

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await fetch("/api/customers");
      const data = await res.json();
      setCustomers(data);
    } catch { /* empty */ }
  }, []);

  const fetchGallery = useCallback(async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryImages(data);
    } catch { /* empty */ }
  }, []);

  useEffect(() => {
    Promise.all([fetchAppointments(), fetchCustomers(), fetchGallery()]).then(() => setLoading(false));
    const interval = setInterval(() => {
      fetchAppointments();
      fetchCustomers();
    }, 8000);
    return () => clearInterval(interval);
  }, [fetchAppointments, fetchCustomers, fetchGallery]);

  const updateStatus = async (id: string, status: string) => {
    const appt = appointments.find((a) => a._id === id);
    setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
    await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status,
        ...(status === "completed" && appt ? { appointmentData: appt } : {}),
      }),
    });
    if (status === "completed") {
      setTimeout(fetchCustomers, 500);
    }
  };

  const deleteAppointment = async (id: string) => {
    setAppointments((prev) => prev.filter((a) => a._id !== id));
    await fetch("/api/appointments", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
  };

  const saveCustomer = async (id: string, updates: Partial<Customer>) => {
    await fetch("/api/customers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    await fetchCustomers();
    setEditingCustomer(null);
  };

  const deleteCustomer = async (id: string) => {
    setCustomers((prev) => prev.filter((c) => c._id !== id));
    await fetch("/api/customers", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
  };

  const addGalleryImage = async () => {
    if (!newImageUrl.trim()) return;
    setAddingImage(true);
    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: newImageUrl.trim(), alt: newImageAlt.trim() || "Gallery image" }),
    });
    setNewImageUrl("");
    setNewImageAlt("");
    await fetchGallery();
    setAddingImage(false);
  };

  const deleteGalleryImage = async (id: string) => {
    setGalleryImages((prev) => prev.filter((i) => i._id !== id));
    await fetch("/api/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
  };

  const filtered = appointments.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.phone.includes(q) || a.services.some((s) => s.name.toLowerCase().includes(q)) || (a.vehicleMake && a.vehicleMake.toLowerCase().includes(q));
    }
    return true;
  });

  const filteredCustomers = customers.filter((c) => {
    if (!customerSearch) return true;
    const q = customerSearch.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.email && c.email.toLowerCase().includes(q)) || (c.vehicleMake && c.vehicleMake.toLowerCase().includes(q));
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-warm flex items-center justify-center">
        <Loader2 size={32} className="text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-warm">
      <header className="border-b border-white/[0.06] bg-bg-warm/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-text-muted hover:text-text transition-colors flex items-center gap-2 text-sm">
              <ArrowLeft size={16} /> Back to site
            </Link>
            <div className="w-px h-6 bg-white/[0.08]" />
            <h1 className="font-[var(--font-display)] text-lg md:text-xl">Admin Dashboard</h1>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-4 py-2 border border-white/[0.06] text-text-muted text-[11px] tracking-[0.12em] uppercase font-medium hover:border-red-500/30 hover:text-red-400 transition-colors cursor-pointer"
          >
            <Lock size={13} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/[0.06] overflow-x-auto">
          <button
            onClick={() => setActiveTab("appointments")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer whitespace-nowrap",
              activeTab === "appointments" ? "border-gold text-gold" : "border-transparent text-text-muted hover:text-text"
            )}
          >
            <ClipboardList size={16} />
            Appointments
            {stats.pending > 0 && (
              <span className="text-[10px] px-2 py-0.5 bg-amber-400/10 text-amber-400 font-semibold rounded-full">{stats.pending}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer whitespace-nowrap",
              activeTab === "customers" ? "border-gold text-gold" : "border-transparent text-text-muted hover:text-text"
            )}
          >
            <Users size={16} />
            Customers
            {customers.length > 0 && (
              <span className="text-[10px] px-2 py-0.5 bg-blue-400/10 text-blue-400 font-semibold rounded-full">{customers.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={cn(
              "flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px cursor-pointer whitespace-nowrap",
              activeTab === "gallery" ? "border-gold text-gold" : "border-transparent text-text-muted hover:text-text"
            )}
          >
            <ImageIcon size={16} />
            Gallery
          </button>
        </div>

        {/* ─── APPOINTMENTS TAB ─── */}
        {activeTab === "appointments" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total" value={stats.total} color="text-text" />
              <StatCard label="Pending" value={stats.pending} color="text-amber-400" />
              <StatCard label="Confirmed" value={stats.confirmed} color="text-emerald-400" />
              <StatCard label="Completed" value={stats.completed} color="text-blue-400" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] pl-9 pr-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-text focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="all" className="bg-[#111110]">All Status</option>
                <option value="pending" className="bg-[#111110]">Pending</option>
                <option value="confirmed" className="bg-[#111110]">Confirmed</option>
                <option value="completed" className="bg-[#111110]">Completed</option>
                <option value="cancelled" className="bg-[#111110]">Cancelled</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 border border-white/[0.04]">
                <User size={40} className="mx-auto text-white/[0.08] mb-4" />
                <p className="text-text-muted text-sm">
                  {appointments.length === 0 ? "No appointments yet. They'll appear here when customers book." : "No appointments match your filters."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filtered.map((appt) => (
                    <AppointmentCard key={appt._id} appt={appt} onUpdateStatus={updateStatus} onDelete={deleteAppointment} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* ─── CUSTOMERS TAB ─── */}
        {activeTab === "customers" && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Customers" value={customers.length} color="text-text" />
              <StatCard
                label="Total Revenue"
                value={`$${customers.reduce((s, c) => s + c.totalSpent, 0).toLocaleString()}`}
                color="text-gold"
              />
              <StatCard
                label="Total Jobs"
                value={customers.reduce((s, c) => s + c.jobCount, 0)}
                color="text-blue-400"
              />
              <StatCard
                label="Emails Sent"
                value={customers.reduce((s, c) => s + (c.emailsSent || 0), 0)}
                color="text-purple-400"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search customers by name, phone, email, or vehicle..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] pl-9 pr-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
            </div>

            {filteredCustomers.length === 0 ? (
              <div className="text-center py-20 border border-white/[0.04]">
                <Users size={40} className="mx-auto text-white/[0.08] mb-4" />
                <p className="text-text-muted text-sm mb-2">
                  {customers.length === 0 ? "No customers yet." : "No customers match your search."}
                </p>
                {customers.length === 0 && (
                  <p className="text-text-muted text-[12px]">
                    Customers are automatically added here when you mark an appointment as <span className="text-blue-400">Complete</span>.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredCustomers.map((customer) => (
                    <CustomerCard
                      key={customer._id}
                      customer={customer}
                      onEdit={setEditingCustomer}
                      onEmail={setEmailingCustomer}
                      onDelete={deleteCustomer}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}

        {/* ─── GALLERY TAB ─── */}
        {activeTab === "gallery" && (
          <div>
            <div className="border border-white/[0.06] bg-white/[0.02] p-6 mb-8">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Plus size={16} className="text-gold" /> Add Gallery Image
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  placeholder="Image URL (paste a link to any image)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  className="sm:w-48 bg-white/[0.04] border border-white/[0.08] px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-gold/40 transition-colors"
                />
                <button
                  onClick={addGalleryImage}
                  disabled={!newImageUrl.trim() || addingImage}
                  className={cn(
                    "px-6 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all flex items-center gap-2 justify-center cursor-pointer",
                    newImageUrl.trim() && !addingImage ? "bg-gold hover:bg-gold-light text-bg-warm" : "bg-white/[0.04] text-text-muted cursor-not-allowed"
                  )}
                >
                  {addingImage ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add
                </button>
              </div>
            </div>

            {galleryImages.length === 0 ? (
              <div className="text-center py-20 border border-white/[0.04]">
                <ImageIcon size={40} className="mx-auto text-white/[0.08] mb-4" />
                <p className="text-text-muted text-sm mb-2">No gallery images yet.</p>
                <p className="text-text-muted text-[12px]">Add images above and they&apos;ll appear on the main site gallery.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                  {galleryImages.map((img) => (
                    <motion.div
                      key={img._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="group relative aspect-[4/3] overflow-hidden border border-white/[0.06]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => deleteGalleryImage(img._id)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/80 text-white text-[11px] tracking-[0.12em] uppercase font-medium hover:bg-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 size={13} /> Remove
                          </button>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                        <p className="text-[11px] text-white/80 truncate">{img.alt}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            <div className="mt-8 p-4 border border-white/[0.04] bg-white/[0.01]">
              <p className="text-text-muted text-[12px]">
                <span className="text-gold font-medium">Tip:</span> Use high-quality images from{" "}
                <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-gold underline">Unsplash</a>{" "}
                or your own photos. Right-click an image → Copy image address → Paste above.
                Gallery images will appear on the main site automatically.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Revenue Footer */}
      {activeTab === "appointments" && appointments.length > 0 && (
        <div className="border-t border-white/[0.06] bg-white/[0.02] mt-12">
          <div className="max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <DollarSign size={16} /> Total Revenue (completed)
            </div>
            <p className="text-gold font-[var(--font-display)] text-2xl font-bold">
              ${appointments.filter((a) => a.status === "completed").reduce((sum, a) => sum + a.totalPrice, 0).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {editingCustomer && (
          <CustomerEditModal
            key="edit"
            customer={editingCustomer}
            onClose={() => setEditingCustomer(null)}
            onSave={saveCustomer}
          />
        )}
        {emailingCustomer && (
          <EmailModal
            key="email"
            customer={emailingCustomer}
            onClose={() => setEmailingCustomer(null)}
            onSent={fetchCustomers}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
