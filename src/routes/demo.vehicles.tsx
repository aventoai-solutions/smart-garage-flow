import { createFileRoute, Link } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { nextServiceDue, vehicleLabel } from "@/lib/demo-utils";
import { DataTable, PageHeader, StatusPill } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/vehicles")({ component: Vehicles });

function Vehicles() {
  const { state } = useDemo();
  const owner = (id: string) => state.customers.find((c) => c.id === id)?.name ?? "—";

  return (
    <div className="space-y-5">
      <PageHeader title="Vehicles" subtitle={`${state.vehicles.length} vehicles on record — search by plate or VIN above`} />
      <DataTable head={["Vehicle", "Plate", "VIN", "Owner", "Mileage", "Next oil service", ""]}>
        {state.vehicles.map((v) => {
          const due = nextServiceDue(v.id, state.services);
          return (
            <tr key={v.id} className="hover:bg-accent/40">
              <td className="px-4 py-3">
                <Link to="/demo/vehicles/$id" params={{ id: v.id }} className="font-medium whitespace-nowrap text-foreground hover:text-steel hover:underline">
                  {vehicleLabel(v)}
                </Link>
              </td>
              <td className="px-4 py-3">
                <span className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-xs font-semibold text-foreground">
                  {v.plate}
                </span>
              </td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{v.vin}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{owner(v.customerId)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{v.mileage.toLocaleString()} km</td>
              <td className="px-4 py-3">
                {due ? <StatusPill status={due.status} /> : <span className="text-xs text-muted-foreground">—</span>}
              </td>
              <td className="px-4 py-3 text-right">
                <Link to="/demo/vehicles/$id" params={{ id: v.id }} className="text-xs font-medium text-steel hover:underline">
                  Open →
                </Link>
              </td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
