export type JobStatus =
  | "waiting-approval"
  | "approved"
  | "in-progress"
  | "quality-check"
  | "completed";

export type QuotationStatus = "draft" | "sent" | "approved" | "declined";
export type InvoiceStatus = "paid" | "unpaid";
export type AppointmentStatus = "confirmed" | "pending" | "no-show";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  since: string; // ISO date
}

export interface Vehicle {
  id: string;
  customerId: string;
  make: string;
  model: string;
  year: number;
  plate: string; // e.g. "A 48291"
  vin: string;
  mileage: number; // km
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  date: string; // ISO date
  description: string;
  amount: number; // AED
  mileage: number;
  technician: string;
}

export interface JobPart {
  name: string;
  qty: number;
  price: number; // AED
}

export interface Job {
  id: string;
  customerId: string;
  vehicleId: string;
  title: string;
  status: JobStatus;
  technician: string;
  receivedAt: string; // ISO datetime
  estimatedCost: number;
  parts: JobPart[];
  notes?: string;
}

export interface Appointment {
  id: string;
  customerId: string;
  vehicleId: string;
  date: string; // ISO date
  time: string; // "10:30"
  service: string;
  status: AppointmentStatus;
}

export interface Quotation {
  id: string;
  customerId: string;
  vehicleId: string;
  title: string;
  date: string;
  status: QuotationStatus;
  items: JobPart[];
}

export interface Invoice {
  id: string;
  customerId: string;
  vehicleId: string;
  jobId?: string;
  date: string;
  status: InvoiceStatus;
  items: JobPart[];
}

export interface Part {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  unitPrice: number;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  active: boolean;
  sentThisMonth: number;
  revenueRecovered: number; // AED
}

export interface DemoState {
  customers: Customer[];
  vehicles: Vehicle[];
  services: ServiceRecord[];
  jobs: Job[];
  appointments: Appointment[];
  quotations: Quotation[];
  invoices: Invoice[];
  parts: Part[];
  automations: Automation[];
}
