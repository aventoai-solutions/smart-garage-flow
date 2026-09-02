import type { DemoState, ServiceRecord, Vehicle } from "./demo-types";

export function aed(n: number): string {
  return `AED ${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function fmtDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export type ServiceDue = {
  lastDate: string;
  dueDate: Date;
  status: "overdue" | "due-soon" | "ok";
  daysLabel: string;
};

const DAY = 24 * 60 * 60 * 1000;
export const OIL_INTERVAL_MONTHS = 6;

export function nextServiceDue(vehicleId: string, services: ServiceRecord[]): ServiceDue | null {
  const oil = services
    .filter((s) => s.vehicleId === vehicleId && /oil/i.test(s.description))
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  if (!oil) return null;
  const last = new Date(oil.date + "T00:00:00");
  const due = new Date(last);
  due.setMonth(due.getMonth() + OIL_INTERVAL_MONTHS);
  const diffDays = Math.round((due.getTime() - Date.now()) / DAY);
  const status = diffDays < 0 ? "overdue" : diffDays <= 30 ? "due-soon" : "ok";
  const daysLabel =
    diffDays < 0
      ? `Overdue by ${Math.abs(diffDays)} days`
      : diffDays === 0
        ? "Due today"
        : `Due in ${diffDays} days`;
  return { lastDate: oil.date, dueDate: due, status, daysLabel };
}

export function customerLifetimeSpend(customerId: string, state: DemoState): number {
  return state.invoices
    .filter((i) => i.customerId === customerId && i.status === "paid")
    .reduce((sum, i) => sum + i.items.reduce((s, it) => s + it.price * it.qty, 0), 0);
}

export function invoiceTotal(inv: { items: { qty: number; price: number }[] }): number {
  return inv.items.reduce((s, it) => s + it.price * it.qty, 0);
}

export interface SearchResults {
  customers: { id: string; label: string; sub: string }[];
  vehicles: { id: string; label: string; sub: string }[];
}

export function globalSearch(query: string, state: DemoState): SearchResults {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return { customers: [], vehicles: [] };
  const norm = (s: string) => s.toLowerCase().replace(/[\s-]/g, "");
  const nq = norm(q);
  const customers = state.customers
    .filter((c) => c.name.toLowerCase().includes(q) || norm(c.phone).includes(nq))
    .slice(0, 5)
    .map((c) => ({ id: c.id, label: c.name, sub: c.phone }));
  const vehicles = state.vehicles
    .filter(
      (v) =>
        norm(v.plate).includes(nq) ||
        norm(v.vin).includes(nq) ||
        `${v.make} ${v.model}`.toLowerCase().includes(q),
    )
    .slice(0, 5)
    .map((v) => ({
      id: v.id,
      label: `${v.make} ${v.model} · ${v.plate}`,
      sub: `VIN ${v.vin}`,
    }));
  return { customers, vehicles };
}

export function vehicleLabel(v: Vehicle): string {
  return `${v.year} ${v.make} ${v.model}`;
}
