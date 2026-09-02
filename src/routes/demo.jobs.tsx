import { createFileRoute, Link } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { aed, vehicleLabel } from "@/lib/demo-utils";
import { PageHeader, StatusPill } from "@/components/demo/ui-bits";
import type { JobStatus } from "@/lib/demo-types";

export const Route = createFileRoute("/demo/jobs")({ component: Jobs });

const COLUMNS: { status: JobStatus; label: string }[] = [
  { status: "waiting-approval", label: "Waiting Approval" },
  { status: "approved", label: "Approved" },
  { status: "in-progress", label: "In Progress" },
  { status: "quality-check", label: "Quality Check" },
  { status: "completed", label: "Completed" },
];

function Jobs() {
  const { state } = useDemo();
  const customerName = (id: string) => state.customers.find((c) => c.id === id)?.name ?? "—";
  const vehicleById = (id: string) => state.vehicles.find((v) => v.id === id);

  return (
    <div className="space-y-5">
      <PageHeader title="Job Cards" subtitle={`${state.jobs.filter((j) => j.status !== "completed").length} active jobs across the workshop`} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {COLUMNS.map((col) => {
          const jobs = state.jobs.filter((j) => j.status === col.status);
          return (
            <div key={col.status} className="rounded-xl border border-border bg-secondary/40 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <StatusPill status={col.status} />
                <span className="text-xs font-semibold text-muted-foreground">{jobs.length}</span>
              </div>
              <div className="space-y-2">
                {jobs.map((job) => {
                  const v = vehicleById(job.vehicleId);
                  return (
                    <Link
                      key={job.id}
                      to="/demo/jobs/$id"
                      params={{ id: job.id }}
                      className="block rounded-lg border border-border bg-card p-3 shadow-xs transition-shadow hover:shadow-sm"
                    >
                      <p className="text-sm font-medium text-foreground">{job.title}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {v ? `${vehicleLabel(v)} · ${v.plate}` : ""}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{customerName(job.customerId)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{job.technician}</span>
                        <span className="text-xs font-semibold text-foreground">{aed(job.estimatedCost)}</span>
                      </div>
                    </Link>
                  );
                })}
                {jobs.length === 0 && <p className="px-1 py-4 text-center text-xs text-muted-foreground">No jobs</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
