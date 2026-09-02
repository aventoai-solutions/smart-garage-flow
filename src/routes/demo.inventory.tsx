import { createFileRoute } from "@tanstack/react-router";
import { useDemo } from "@/lib/demo-store";
import { aed } from "@/lib/demo-utils";
import { DataTable, PageHeader } from "@/components/demo/ui-bits";

export const Route = createFileRoute("/demo/inventory")({ component: Inventory });

function Inventory() {
  const { state } = useDemo();
  const lowStock = state.parts.filter((p) => p.stock < p.minStock).length;

  return (
    <div className="space-y-5">
      <PageHeader title="Inventory" subtitle={`${state.parts.length} parts in stock · ${lowStock} below minimum level`} />
      <DataTable head={["Part", "SKU", "In stock", "Min. level", "Unit price", "Stock value", "Status"]}>
        {state.parts.map((p) => {
          const low = p.stock < p.minStock;
          return (
            <tr key={p.id} className="hover:bg-accent/40">
              <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.sku}</td>
              <td className="px-4 py-3 text-foreground">{p.stock}</td>
              <td className="px-4 py-3 text-muted-foreground">{p.minStock}</td>
              <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{aed(p.unitPrice)}</td>
              <td className="px-4 py-3 whitespace-nowrap text-foreground">{aed(p.unitPrice * p.stock)}</td>
              <td className="px-4 py-3">
                {low ? (
                  <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                    Low stock
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                    In stock
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
