import { useState } from "react";
import { X, Check, CheckCheck } from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { fmtDate, nextServiceDue } from "@/lib/demo-utils";

export function SimulateReminderDialog({ onClose }: { onClose: () => void }) {
  const { state, bookAppointment } = useDemo();
  const [booked, setBooked] = useState(false);

  // The star of the demo: Ahmed Khan's BMW 320i
  const customer = state.customers.find((c) => c.id === "c1")!;
  const vehicle = state.vehicles.find((v) => v.id === "v1")!;
  const due = nextServiceDue(vehicle.id, state.services);

  const message = `Hi ${customer.name.split(" ")[0]}, your ${vehicle.make} ${vehicle.model} may be due for its next oil service. Your last oil service with ABC Garage was on ${due ? fmtDate(due.lastDate) : "—"}. Would you like to book your next appointment?`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md animate-enter rounded-2xl border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">Simulated: Oil Service Reminder</h2>
            <p className="text-xs text-muted-foreground">What the customer receives — filled in from real garage data</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-muted-foreground hover:bg-accent">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5">
          {/* Phone frame */}
          <div className="mx-auto max-w-xs rounded-3xl border-4 border-navy bg-[#e5ddd2] p-3">
            <div className="mb-2 flex items-center gap-2 border-b border-black/10 pb-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-bold text-pale">AG</div>
              <div>
                <p className="text-xs font-semibold text-slate-800">ABC Garage</p>
                <p className="text-[10px] text-emerald-700">online</p>
              </div>
            </div>
            <div className="animate-enter rounded-lg rounded-tl-none bg-white p-3 text-[13px] leading-relaxed text-slate-800 shadow-xs">
              {message}
              <span className="mt-2 block rounded-md bg-navy px-3 py-1.5 text-center text-xs font-semibold text-white">
                Book Appointment
              </span>
            </div>
            <div className="mt-1 flex items-center justify-end gap-1 pr-1 text-[10px] text-slate-500">
              {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
              <CheckCheck className="h-3 w-3 text-sky-600" />
            </div>
          </div>

          {booked ? (
            <div className="mt-4 animate-enter rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              <p className="flex items-center gap-2 font-semibold">
                <Check className="h-4 w-4" /> Appointment booked
              </p>
              <p className="mt-1 text-xs">
                {customer.name} · {vehicle.make} {vehicle.model} · tomorrow 10:00 — it now appears in the
                Appointments page of the garage software.
              </p>
            </div>
          ) : (
            <button
              onClick={() => {
                const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
                bookAppointment({
                  customerId: customer.id,
                  vehicleId: vehicle.id,
                  date: tomorrow,
                  time: "10:00",
                  service: "Oil & filter change (from reminder)",
                });
                setBooked(true);
              }}
              className="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Customer taps “Book Appointment” →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
