import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { AppointmentStatus, InvoiceStatus, JobStatus, QuotationStatus } from "@/lib/demo-types";

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-4">
      <div className="min-w-0">
        <h1 className="font-display truncate text-xl font-semibold text-foreground sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

const statusStyles: Record<string, string> = {
  "waiting-approval": "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-sky-100 text-sky-800 border-sky-200",
  "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
  "quality-check": "bg-violet-100 text-violet-800 border-violet-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  draft: "bg-slate-100 text-slate-700 border-slate-200",
  sent: "bg-amber-100 text-amber-800 border-amber-200",
  declined: "bg-red-100 text-red-700 border-red-200",
  paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  unpaid: "bg-red-100 text-red-700 border-red-200",
  confirmed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  "no-show": "bg-red-100 text-red-700 border-red-200",
  overdue: "bg-red-100 text-red-700 border-red-200",
  "due-soon": "bg-amber-100 text-amber-800 border-amber-200",
  ok: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const statusLabels: Record<string, string> = {
  "waiting-approval": "Waiting Approval",
  approved: "Approved",
  "in-progress": "In Progress",
  "quality-check": "Quality Check",
  completed: "Completed",
  draft: "Draft",
  sent: "Sent",
  declined: "Declined",
  paid: "Paid",
  unpaid: "Unpaid",
  confirmed: "Confirmed",
  pending: "Pending",
  "no-show": "No-Show",
  overdue: "Overdue",
  "due-soon": "Due Soon",
  ok: "On Track",
};

export function StatusPill({
  status,
  className,
}: {
  status: JobStatus | QuotationStatus | InvoiceStatus | AppointmentStatus | "overdue" | "due-soon" | "ok";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        statusStyles[status],
        className,
      )}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}

export function StatCard({ label, value, hint, icon }: { label: string; value: string; hint?: string; icon: ReactNode }) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-card p-3.5 shadow-xs sm:p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 text-[11px] leading-tight font-medium tracking-wide text-muted-foreground uppercase sm:text-xs">{label}</p>
        <span className="shrink-0 text-steel">{icon}</span>
      </div>
      <p className="font-display mt-2 truncate text-xl font-semibold text-foreground sm:text-2xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-border bg-card shadow-xs", className)}>{children}</div>;
}

export function DataTable({
  head,
  children,
}: {
  head: string[];
  children: ReactNode;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-xs">
      <table className="w-full min-w-max text-sm sm:min-w-0">
        <thead>
          <tr className="border-b border-border bg-secondary/60">
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold tracking-wide text-muted-foreground uppercase whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">{children}</tbody>
      </table>
    </div>
  );
}
