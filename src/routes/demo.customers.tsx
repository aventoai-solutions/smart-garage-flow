import { createFileRoute, Link } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { aed, customerLifetimeSpend } from "@/lib/demo-utils";
import { DataTable, PageHeader } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/customers")({ component: Customers });

function Customers() {
  const { state } = useDemo();

  return (
    <div className="space-y-5">
      <PageHeader title="Customers" subtitle={`${state.customers.length} customers on record`} />
      <DataTable head={["Customer", "Phone", "Vehicles", "Visits", "Lifetime spend", ""]}>
        {state.customers.map((c) => {
          const vehicles = state.vehicles.filter((v) => v.customerId === c.id);
          const visits = state.services.filter((s) => vehicles.some((v) => v.id === s.vehicleId)).length;
          return (
            <tr key={c.id} className="hover:bg-accent/40">
              <td className="px-4 py-3">
                <Link to="/demo/customers/$id" params={{ id: c.id }} className="font-medium text-foreground hover:text-steel hover:underline">
                  {c.name}
                </Link>
                <p className="text-xs text-muted-foreground">{c.email}</p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{c.phone}</td>
              <td className="px-4 py-3 text-muted-foreground">{vehicles.length}</td>
              <td className="px-4 py-3 text-muted-foreground">{visits}</td>
              <td className="px-4 py-3 font-medium text-foreground">{aed(customerLifetimeSpend(c.id, state))}</td>
              <td className="px-4 py-3 text-right">
                <Link to="/demo/customers/$id" params={{ id: c.id }} className="text-xs font-medium text-steel hover:underline">
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
