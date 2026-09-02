import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { aed, fmtDate, vehicleLabel } from "@/lib/demo-utils";
import { Card, PageHeader, StatusPill } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/jobs/$id")({ component: JobDetail });

function JobDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { state, approveJob, completeJob } = useDemo();
  const job = state.jobs.find((j) => j.id === id);

  if (!job) {
    return <PageHeader title="Job not found" subtitle="It may have been reset — head back to Jobs." />;
  }

  const customer = state.customers.find((c) => c.id === job.customerId);
  const vehicle = state.vehicles.find((v) => v.id === job.vehicleId);
  const partsTotal = job.parts.reduce((s, p) => s + p.price * p.qty, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={job.title}
        subtitle={`Job ${job.id.toUpperCase()} · Received ${fmtDate(job.receivedAt.slice(0, 10))} at ${job.receivedAt.slice(11)}`}
        actions={<StatusPill status={job.status} />}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <h2 className="font-display text-sm font-semibold text-foreground">Customer</h2>
          {customer && (
            <Link to="/demo/customers/$id" params={{ id: customer.id }} className="mt-2 block text-sm font-medium text-steel hover:underline">
              {customer.name}
            </Link>
          )}
          <p className="text-xs text-muted-foreground">{customer?.phone}</p>
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-sm font-semibold text-foreground">Vehicle</h2>
          {vehicle && (
            <Link to="/demo/vehicles/$id" params={{ id: vehicle.id }} className="mt-2 block text-sm font-medium text-steel hover:underline">
              {vehicleLabel(vehicle)}
            </Link>
          )}
          <p className="text-xs text-muted-foreground">Plate {vehicle?.plate}</p>
        </Card>
        <Card className="p-5">
          <h2 className="font-display text-sm font-semibold text-foreground">Technician</h2>
          <p className="mt-2 text-sm font-medium text-foreground">{job.technician}</p>
          {job.notes && <p className="mt-1 text-xs text-muted-foreground">{job.notes}</p>}
        </Card>
      </div>

      <Card>
        <h2 className="border-b border-border px-5 py-3.5 font-display text-sm font-semibold text-foreground">Parts & labour</h2>
        <div className="divide-y divide-border">
          {job.parts.map((p, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 text-sm">
              <span className="text-foreground">
                {p.name} {p.qty > 1 && <span className="text-muted-foreground">× {p.qty}</span>}
              </span>
              <span className="font-medium text-foreground">{aed(p.price * p.qty)}</span>
            </div>
          ))}
          <div className="flex items-center justify-between bg-secondary/50 px-5 py-3 text-sm">
            <span className="font-semibold text-foreground">Estimated total</span>
            <span className="font-display font-semibold text-foreground">{aed(partsTotal)}</span>
          </div>
        </div>
      </Card>

      {job.status === "waiting-approval" && (
        <button
          onClick={() => approveJob(job.id)}
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Customer approved — start job
        </button>
      )}
      {(job.status === "in-progress" || job.status === "quality-check") && (
        <button
          onClick={() => {
            completeJob(job.id);
            navigate({ to: "/demo/jobs" });
          }}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
        >
          Mark as completed (adds to service history)
        </button>
      )}
    </div>
  );
}
