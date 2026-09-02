import { createFileRoute, Link } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { fmtDate, vehicleLabel } from "@/lib/demo-utils";
import { DataTable, PageHeader, StatusPill } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/appointments")({ component: Appointments });

function Appointments() {
  const { state } = useDemo();
  const customer = (id: string) => state.customers.find((c) => c.id === id);
  const vehicle = (id: string) => state.vehicles.find((v) => v.id === id);
  const sorted = [...state.appointments].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));

  return (
    <div className="space-y-5">
      <PageHeader title="Appointments" subtitle="Bookings come in from reminders, the phone, or the front desk" />
      <DataTable head={["Date", "Time", "Customer", "Vehicle", "Service", "Status"]}>
        {sorted.map((a) => {
          const c = customer(a.customerId);
          const v = vehicle(a.vehicleId);
          return (
            <tr key={a.id} className="hover:bg-accent/40">
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{fmtDate(a.date)}</td>
              <td className="px-4 py-3 font-display font-semibold whitespace-nowrap text-foreground">{a.time}</td>
              <td className="px-4 py-3">
                {c && (
                  <Link to="/demo/customers/$id" params={{ id: c.id }} className="font-medium whitespace-nowrap text-foreground hover:text-steel hover:underline">
                    {c.name}
                  </Link>
                )}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{v ? `${vehicleLabel(v)} · ${v.plate}` : "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">{a.service}</td>
              <td className="px-4 py-3"><StatusPill status={a.status} /></td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
