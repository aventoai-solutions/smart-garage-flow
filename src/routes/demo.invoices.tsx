import { createFileRoute } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { aed, fmtDate, invoiceTotal, vehicleLabel } from "@/lib/demo-utils";
import { DataTable, PageHeader, StatCard, StatusPill } from "@/components/demo/ui-bits";
import { Banknote, AlertCircle, Receipt } from "lucide-react";

export const Route = createFileRoute("/demo/invoices")({ component: Invoices });

function Invoices() {
  const { state, recordPayment } = useDemo();
  const customerName = (id: string) => state.customers.find((c) => c.id === id)?.name ?? "—";
  const vehicle = (id: string) => state.vehicles.find((v) => v.id === id);
  const sorted = [...state.invoices].sort((a, b) => b.date.localeCompare(a.date));

  const paidTotal = state.invoices.filter((i) => i.status === "paid").reduce((s, i) => s + invoiceTotal(i), 0);
  const unpaidTotal = state.invoices.filter((i) => i.status === "unpaid").reduce((s, i) => s + invoiceTotal(i), 0);

  return (
    <div className="space-y-5">
      <PageHeader title="Invoices & Payments" subtitle="Every completed job becomes an invoice and payment record" />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Collected (all time)" value={aed(paidTotal)} icon={<Banknote className="h-4 w-4" />} />
        <StatCard label="Outstanding" value={aed(unpaidTotal)} hint="Unpaid invoice reminders are automated" icon={<AlertCircle className="h-4 w-4" />} />
        <StatCard label="Invoices" value={String(state.invoices.length)} icon={<Receipt className="h-4 w-4" />} />
      </div>
      <DataTable head={["Invoice", "Customer", "Vehicle", "Date", "Amount", "Status", "Actions"]}>
        {sorted.map((inv) => {
          const v = vehicle(inv.vehicleId);
          return (
            <tr key={inv.id} className="hover:bg-accent/40">
              <td className="px-4 py-3 font-mono text-xs font-semibold text-foreground">{inv.id.toUpperCase()}</td>
              <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">{customerName(inv.customerId)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{v ? `${vehicleLabel(v)} · ${v.plate}` : "—"}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{fmtDate(inv.date)}</td>
              <td className="px-4 py-3 font-medium whitespace-nowrap text-foreground">{aed(invoiceTotal(inv))}</td>
              <td className="px-4 py-3"><StatusPill status={inv.status} /></td>
              <td className="px-4 py-3">
                {inv.status === "unpaid" ? (
                  <button
                    onClick={() => recordPayment(inv.id)}
                    className="rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-700"
                  >
                    Record payment
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
