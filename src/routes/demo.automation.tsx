import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Zap, Play } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { aed } from "@/lib/demo-utils";
import { PageHeader, StatCard } from "@/components/demo/ui-bits";
import { SimulateReminderDialog } from "@/components/demo/simulate-reminder";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/automation")({ component: AutomationCenter });

function AutomationCenter() {
  const { state, toggleAutomation } = useDemo();
  const [simulating, setSimulating] = useState(false);

  const totalRecovered = state.automations.reduce((s, a) => s + a.revenueRecovered, 0);
  const totalSent = state.automations.reduce((s, a) => s + a.sentThisMonth, 0);
  const activeCount = state.automations.filter((a) => a.active).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Automation Center"
        subtitle="GarageOS watches your service data and follows up with customers automatically"
        actions={
          <button
            onClick={() => setSimulating(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Play className="h-4 w-4" />
            Simulate reminder
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active automations" value={`${activeCount} / ${state.automations.length}`} icon={<Zap className="h-4 w-4" />} />
        <StatCard label="Messages sent (Sep)" value={String(totalSent)} icon={<Zap className="h-4 w-4" />} />
        <StatCard label="Revenue recovered (Sep)" value={aed(totalRecovered)} hint="Customers who returned after an automated message" icon={<Zap className="h-4 w-4" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {state.automations.map((a) => (
          <div key={a.id} className={cn("rounded-xl border bg-card p-5 shadow-xs transition-opacity", a.active ? "border-border" : "border-border opacity-70")}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-display text-base font-semibold text-foreground">{a.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{a.description}</p>
              </div>
              <button
                role="switch"
                aria-checked={a.active}
                aria-label={`Toggle ${a.name}`}
                onClick={() => toggleAutomation(a.id)}
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                  a.active ? "bg-emerald-600" : "bg-muted-foreground/30",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                    a.active ? "left-[22px]" : "left-0.5",
                  )}
                />
              </button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-3 text-xs">
              <span className="text-muted-foreground">
                Trigger: <span className="font-medium text-foreground">{a.trigger}</span>
              </span>
              <span className="text-muted-foreground">
                Sent this month: <span className="font-medium text-foreground">{a.sentThisMonth}</span>
              </span>
              {a.revenueRecovered > 0 && (
                <span className="text-muted-foreground">
                  Recovered: <span className="font-medium text-emerald-700">{aed(a.revenueRecovered)}</span>
                </span>
              )}
              <span className={cn("ml-auto font-medium", a.active ? "text-emerald-700" : "text-muted-foreground")}>
                {a.active ? "Active" : "Paused"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {simulating && <SimulateReminderDialog onClose={() => setSimulating(false)} />}
    </div>
  );
}
