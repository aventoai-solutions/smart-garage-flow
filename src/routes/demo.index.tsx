import { createFileRoute, Link } from "@tanstack/react-router";
import { Car, FileCheck, Wrench, CalendarDays, Banknote, BellRing } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { aed, invoiceTotal, nextServiceDue, vehicleLabel } from "@/lib/demo-utils";
import { Card, PageHeader, StatCard, StatusPill } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/")({ component: Dashboard });

function Dashboard() {
  const { state } = useDemo();
  const today = "2026-09-02";

  const activeJobs = state.jobs.filter((j) => j.status !== "completed");
  const inWorkshop = activeJobs.filter((j) => j.status !== "waiting-approval");
  const waitingApproval = state.jobs.filter((j) => j.status === "waiting-approval");
  const inProgress = state.jobs.filter((j) => j.status === "in-progress");
  const todaysAppointments = state.appointments.filter((a) => a.date === today);
  const revenue = state.invoices
    .filter((i) => i.status === "paid" && i.date.startsWith("2026-09"))
    .reduce((s, i) => s + invoiceTotal(i), 0);
  const remindersDue = state.vehicles.filter((v) => {
    const d = nextServiceDue(v.id, state.services);
    return d && d.status !== "ok";
  }).length;

  const customerName = (id: string) => state.customers.find((c) => c.id === id)?.name ?? "—";
  const vehicleById = (id: string) => state.vehicles.find((v) => v.id === id);

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" subtitle="Wednesday, 2 September 2026 · ABC Garage, Al Quoz, Dubai" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Vehicles in workshop" value={String(inWorkshop.length)} icon={<Car className="h-4 w-4" />} />
        <StatCard label="Waiting approval" value={String(waitingApproval.length)} hint="Quotations sent" icon={<FileCheck className="h-4 w-4" />} />
        <StatCard label="In progress" value={String(inProgress.length)} icon={<Wrench className="h-4 w-4" />} />
        <StatCard label="Appointments today" value={String(todaysAppointments.length)} icon={<CalendarDays className="h-4 w-4" />} />
        <StatCard label="Revenue (Sep)" value={aed(revenue)} hint="Paid invoices" icon={<Banknote className="h-4 w-4" />} />
        <StatCard label="Service reminders due" value={String(remindersDue)} hint="Automation Center" icon={<BellRing className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2 className="font-display text-sm font-semibold text-foreground">Active job cards</h2>
            <Link to="/demo/jobs" className="text-xs font-medium text-steel hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {activeJobs.slice(0, 7).map((job) => {
              const v = vehicleById(job.vehicleId);
              return (
                <Link
                  key={job.id}
                  to="/demo/jobs/$id"
                  params={{ id: job.id }}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 hover:bg-accent/40"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {job.title} <span className="text-muted-foreground">· {v ? vehicleLabel(v) : ""} ({v?.plate})</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {customerName(job.customerId)} · Technician: {job.technician}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-medium text-foreground">{aed(job.estimatedCost)}</span>
                    <StatusPill status={job.status} />
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <h2 className="font-display text-sm font-semibold text-foreground">Today's appointments</h2>
            <Link to="/demo/appointments" className="text-xs font-medium text-steel hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-border">
            {todaysAppointments.map((a) => {
              const v = vehicleById(a.vehicleId);
              return (
                <div key={a.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="font-display w-12 shrink-0 text-sm font-semibold text-navy">{a.time}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{customerName(a.customerId)}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.service} · {v?.plate}
                    </p>
                  </div>
                  <StatusPill status={a.status} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
