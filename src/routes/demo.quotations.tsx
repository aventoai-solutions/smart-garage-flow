import { createFileRoute, Link } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { aed, fmtDate, invoiceTotal, vehicleLabel } from "@/lib/demo-utils";
import { DataTable, PageHeader, StatusPill } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/quotations")({ component: Quotations });

function Quotations() {
  const { state, setQuotationStatus } = useDemo();
  const customerName = (id: string) => state.customers.find((c) => c.id === id)?.name ?? "—";
  const vehicle = (id: string) => state.vehicles.find((v) => v.id === id);
  const sorted = [...state.quotations].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-5">
      <PageHeader title="Quotations" subtitle="Send estimates and track customer approval" />
      <DataTable head={["Quotation", "Customer", "Vehicle", "Date", "Amount", "Status", "Actions"]}>
        {sorted.map((q) => {
          const v = vehicle(q.vehicleId);
          return (
            <tr key={q.id} className="hover:bg-accent/40">
              <td className="px-4 py-3 font-medium text-foreground">{q.title}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{customerName(q.customerId)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{v ? `${vehicleLabel(v)} · ${v.plate}` : "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{fmtDate(q.date)}</td>
              <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">{aed(invoiceTotal(q))}</td>
              <td className="px-4 py-3"><StatusPill status={q.status} /></td>
              <td className="px-4 py-3">
                {q.status === "sent" || q.status === "draft" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuotationStatus(q.id, "approved")}
                      className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setQuotationStatus(q.id, "declined")}
                      className="rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-accent"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          );
        })}
      </DataTable>
      <p className="text-xs text-muted-foreground">
        Tip: approving a quotation here simulates the customer accepting it from their phone.{" "}
        <Link to="/demo/jobs" className="text-steel hover:underline">See the job board →</Link>
      </p>
    </div>
  );
}
