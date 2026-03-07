import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readFile<T>(filename: string, defaultValue: T): T {
  ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) return defaultValue;
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch {
    return defaultValue;
  }
}

function writeFile<T>(filename: string, data: T): void {
  ensureDir();
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// ─── Appointments ────────────────────────────────────

type AppointmentRecord = Record<string, unknown> & { _id: string; status: string; createdAt: number };

export function getAppointments(): AppointmentRecord[] {
  return readFile<AppointmentRecord[]>("appointments.json", []);
}

export function addAppointment(data: Record<string, unknown>): string {
  const appointments = getAppointments();
  const id = `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const appt = { ...data, _id: id, status: "pending", createdAt: Date.now() } as AppointmentRecord;
  appointments.unshift(appt);
  writeFile("appointments.json", appointments);
  return id;
}

export function updateAppointmentStatus(id: string, status: string) {
  const appointments = getAppointments();
  const idx = appointments.findIndex((a) => a._id === id);
  if (idx !== -1) {
    appointments[idx].status = status;
    writeFile("appointments.json", appointments);
  }
}

export function deleteAppointment(id: string) {
  const appointments = getAppointments();
  writeFile(
    "appointments.json",
    appointments.filter((a) => a._id !== id)
  );
}

export function getBookedSlots(date: string): string[] {
  const appointments = getAppointments();
  return appointments
    .filter(
      (a) =>
        (a as Record<string, unknown>).preferredDate === date &&
        (a.status === "pending" || a.status === "confirmed") &&
        (a as Record<string, unknown>).preferredTime
    )
    .map((a) => (a as Record<string, unknown>).preferredTime as string);
}

// ─── Gallery ─────────────────────────────────────────

type GalleryRecord = { _id: string; url: string; alt: string; order: number; createdAt: number };

export function getGalleryImages(): GalleryRecord[] {
  return readFile<GalleryRecord[]>("gallery.json", []).sort(
    (a, b) => a.order - b.order
  );
}

export function addGalleryImage(url: string, alt: string): string {
  const images = getGalleryImages();
  const maxOrder = images.length > 0 ? Math.max(...images.map((i) => i.order)) : -1;
  const id = `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  images.push({ _id: id, url, alt, order: maxOrder + 1, createdAt: Date.now() });
  writeFile("gallery.json", images);
  return id;
}

export function deleteGalleryImage(id: string) {
  const images = getGalleryImages();
  writeFile(
    "gallery.json",
    images.filter((i) => i._id !== id)
  );
}

// ─── Admin Auth ─────────────────────────────────────

type AdminConfig = { passcode: string };

const DEFAULT_PASSCODE = "edgaramaya1003";

export function getAdminPasscode(): string {
  const config = readFile<AdminConfig>("admin.json", { passcode: DEFAULT_PASSCODE });
  if (!config.passcode) {
    config.passcode = DEFAULT_PASSCODE;
    writeFile("admin.json", config);
  }
  return config.passcode;
}

export function setAdminPasscode(newPasscode: string) {
  writeFile("admin.json", { passcode: newPasscode });
}

export function verifyAdminPasscode(input: string): boolean {
  return input === getAdminPasscode();
}

// ─── Customers ──────────────────────────────────────

export type CustomerRecord = {
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

export function getCustomers(): CustomerRecord[] {
  return readFile<CustomerRecord[]>("customers.json", []).sort(
    (a, b) => b.updatedAt - a.updatedAt
  );
}

export function addOrUpdateCustomer(data: {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleType?: string;
  notes?: string;
  totalPrice: number;
  services: string[];
  serviceDate?: string;
}): string {
  const customers = getCustomers();
  const existing = customers.find(
    (c) => c.phone === data.phone || (data.email && c.email === data.email)
  );

  if (existing) {
    existing.name = data.name;
    existing.phone = data.phone;
    if (data.email) existing.email = data.email;
    if (data.address) existing.address = data.address;
    if (data.vehicleYear) existing.vehicleYear = data.vehicleYear;
    if (data.vehicleMake) existing.vehicleMake = data.vehicleMake;
    if (data.vehicleModel) existing.vehicleModel = data.vehicleModel;
    if (data.vehicleType) existing.vehicleType = data.vehicleType;
    existing.totalSpent += data.totalPrice;
    existing.jobCount += 1;
    existing.lastServiceDate = data.serviceDate;
    existing.lastServices = data.services;
    existing.updatedAt = Date.now();
    writeFile("customers.json", customers);
    return existing._id;
  }

  const id = `cust_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const customer: CustomerRecord = {
    _id: id,
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    vehicleYear: data.vehicleYear,
    vehicleMake: data.vehicleMake,
    vehicleModel: data.vehicleModel,
    vehicleType: data.vehicleType,
    notes: data.notes,
    totalSpent: data.totalPrice,
    jobCount: 1,
    lastServiceDate: data.serviceDate,
    lastServices: data.services,
    emailsSent: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  customers.unshift(customer);
  writeFile("customers.json", customers);
  return id;
}

export function updateCustomer(id: string, updates: Partial<Omit<CustomerRecord, "_id" | "createdAt">>) {
  const customers = getCustomers();
  const idx = customers.findIndex((c) => c._id === id);
  if (idx !== -1) {
    Object.assign(customers[idx], updates, { updatedAt: Date.now() });
    writeFile("customers.json", customers);
  }
}

export function deleteCustomer(id: string) {
  const customers = getCustomers();
  writeFile(
    "customers.json",
    customers.filter((c) => c._id !== id)
  );
}

export function incrementEmailsSent(id: string) {
  const customers = getCustomers();
  const idx = customers.findIndex((c) => c._id === id);
  if (idx !== -1) {
    customers[idx].emailsSent = (customers[idx].emailsSent || 0) + 1;
    customers[idx].updatedAt = Date.now();
    writeFile("customers.json", customers);
  }
}
