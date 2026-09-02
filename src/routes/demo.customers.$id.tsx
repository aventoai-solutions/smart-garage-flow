import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone, Mail, Car } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { aed, customerLifetimeSpend, fmtDate, invoiceTotal, vehicleLabel } from "@/lib/demo-utils";
import { Card, PageHeader, StatusPill } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/customers/$id")({ component: CustomerDetail });

function CustomerDetail() {
  const { id } = Route.useParams();
  const { state } = useDemo();
  const customer = state.customers.find((c) => c.id === id);

  if (!customer) {
    return <PageHeader title="Customer not found" subtitle="Try searching from the bar above." />;
  }

  const vehicles = state.vehicles.filter((v) => v.customerId === id);
  const vehicleIds = new Set(vehicles.map((v) => v.id));
  const history = state.services
    .filter((s) => vehicleIds.has(s.vehicleId))
    .sort((a, b) => b.date.localeCompare(a.date));
  const invoices = state.invoices.filter((i) => i.customerId === id).sort((a, b) => b.date.localeCompare(a.date));
  const lifetime = customerLifetimeSpend(id, state);

  return (
    <div className="space-y-6">
      <PageHeader title={customer.name} subtitle={`Customer since ${fmtDate(customer.since)}`} />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Lifetime spend</p>
          <p className="font-display mt-1 text-2xl font-semibold text-foreground">{aed(lifetime)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Vehicles</p>
          <p className="font-display mt-1 text-2xl font-semibold text-foreground">{vehicles.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Contact</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground"><Phone className="h-3.5 w-3.5 text-muted-foreground" />{customer.phone}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Mail className="h-3.5 w-3.5" />{customer.email}</p>
        </Card>
      </div>

      <Card>
        <h2 className="border-b border-border px-5 py-3.5 font-display text-sm font-semibold text-foreground">Vehicles</h2>
        <div className="divide-y divide-border">
          {vehicles.map((v) => (
            <Link
              key={v.id}
              to="/demo/vehicles/$id"
              params={{ id: v.id }}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-accent/40"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-steel">
                <Car className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{vehicleLabel(v)}</p>
                <p className="text-xs text-muted-foreground">
                  Plate {v.plate} · {v.mileage.toLocaleString()} km
                </p>
              </div>
              <span className="text-xs font-medium text-steel">Open →</span>
            </Link>
          ))}
        </div>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <h2 className="border-b border-border px-5 py-3.5 font-display text-sm font-semibold text-foreground">Service history</h2>
          <div className="divide-y divide-border">
            {history.length === 0 && <p className="px-5 py-4 text-sm text-muted-foreground">No services recorded yet.</p>}
            {history.map((s) => {
              const v = vehicles.find((x) => x.id === s.vehicleId);
              return (
                <div key={s.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{s.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {fmtDate(s.date)} · {v ? `${v.make} ${v.model}` : ""} · {s.mileage.toLocaleString()} km
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-medium text-foreground">{aed(s.amount)}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="border-b border-border px-5 py-3.5 font-display text-sm font-semibold text-foreground">Invoices</h2>
          <div className="divide-y divide-border">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Invoice {inv.id.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground">{fmtDate(inv.date)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{aed(invoiceTotal(inv))}</span>
                  <StatusPill status={inv.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
