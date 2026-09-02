import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarClock } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { aed, fmtDate, nextServiceDue, vehicleLabel } from "@/lib/demo-utils";
import { Card, PageHeader, StatusPill } from "@/components/demo/ui-bits";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/vehicles/$id")({ component: VehicleDetail });

function VehicleDetail() {
  const { id } = Route.useParams();
  const { state } = useDemo();
  const vehicle = state.vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return <PageHeader title="Vehicle not found" subtitle="Try searching from the bar above." />;
  }

  const owner = state.customers.find((c) => c.id === vehicle.customerId);
  const history = state.services.filter((s) => s.vehicleId === id).sort((a, b) => b.date.localeCompare(a.date));
  const jobs = state.jobs.filter((j) => j.vehicleId === id);
  const due = nextServiceDue(id, state.services);

  return (
    <div className="space-y-6">
      <PageHeader
        title={vehicleLabel(vehicle)}
        subtitle={
          owner ? (
            <>
              Owner:{" "}
              <Link to="/demo/customers/$id" params={{ id: owner.id }} className="font-medium text-steel hover:underline">
                {owner.name}
              </Link>
            </>
          ) : undefined
        }
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Plate</p>
          <p className="mt-1 inline-block rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-sm font-semibold text-foreground">
            {vehicle.plate}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">VIN</p>
          <p className="mt-1 font-mono text-sm text-foreground">{vehicle.vin}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Mileage</p>
          <p className="font-display mt-1 text-xl font-semibold text-foreground">{vehicle.mileage.toLocaleString()} km</p>
        </Card>
        <Card
          className={cn(
            "p-4",
            due?.status === "overdue" && "border-red-200 bg-red-50",
            due?.status === "due-soon" && "border-amber-200 bg-amber-50",
          )}
        >
          <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <CalendarClock className="h-3.5 w-3.5" /> Next oil service
          </p>
          {due ? (
            <>
              <p className="font-display mt-1 text-lg font-semibold text-foreground">{due.daysLabel}</p>
              <p className="text-xs text-muted-foreground">
                Last service {fmtDate(due.lastDate)} · due {due.dueDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </p>
              <div className="mt-2"><StatusPill status={due.status} /></div>
            </>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">No oil service recorded yet.</p>
          )}
        </Card>
      </div>

      {jobs.filter((j) => j.status !== "completed").length > 0 && (
        <Card>
          <h2 className="border-b border-border px-5 py-3.5 font-display text-sm font-semibold text-foreground">Current jobs</h2>
          <div className="divide-y divide-border">
            {jobs
              .filter((j) => j.status !== "completed")
              .map((j) => (
                <Link key={j.id} to="/demo/jobs/$id" params={{ id: j.id }} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-accent/40">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{j.title}</p>
                    <p className="text-xs text-muted-foreground">Technician: {j.technician}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-sm font-medium text-foreground">{aed(j.estimatedCost)}</span>
                    <StatusPill status={j.status} />
                  </div>
                </Link>
              ))}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="border-b border-border px-5 py-3.5 font-display text-sm font-semibold text-foreground">Service history</h2>
        <div className="relative divide-y divide-border">
          {history.length === 0 && <p className="px-5 py-4 text-sm text-muted-foreground">No services recorded yet.</p>}
          {history.map((s) => (
            <div key={s.id} className="flex items-start gap-4 px-5 py-4">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-steel" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{s.description}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {fmtDate(s.date)} · {s.mileage.toLocaleString()} km · Technician: {s.technician}
                </p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-foreground">{aed(s.amount)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
