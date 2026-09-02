import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { createSeed } from "./demo-data";
import type { Appointment, DemoState } from "./demo-types";

interface DemoStore {
  state: DemoState;
  resetDemo: () => void;
  toggleAutomation: (id: string) => void;
  setQuotationStatus: (id: string, status: "approved" | "declined" | "sent") => void;
  recordPayment: (invoiceId: string) => void;
  completeJob: (jobId: string) => void;
  approveJob: (jobId: string) => void;
  bookAppointment: (input: Omit<Appointment, "id" | "status">) => void;
}

const DemoContext = createContext<DemoStore | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(() => createSeed());

  const resetDemo = useCallback(() => setState(createSeed()), []);

  const toggleAutomation = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      automations: s.automations.map((a) => (a.id === id ? { ...a, active: !a.active } : a)),
    }));
  }, []);

  const setQuotationStatus = useCallback((id: string, status: "approved" | "declined" | "sent") => {
    setState((s) => ({
      ...s,
      quotations: s.quotations.map((q) => (q.id === id ? { ...q, status } : q)),
    }));
  }, []);

  const recordPayment = useCallback((invoiceId: string) => {
    setState((s) => ({
      ...s,
      invoices: s.invoices.map((i) => (i.id === invoiceId ? { ...i, status: "paid" } : i)),
    }));
  }, []);

  const completeJob = useCallback((jobId: string) => {
    setState((s) => {
      const job = s.jobs.find((j) => j.id === jobId);
      if (!job) return s;
      const newService = {
        id: `s${Date.now()}`,
        vehicleId: job.vehicleId,
        date: new Date().toISOString().slice(0, 10),
        description: job.title,
        amount: job.estimatedCost,
        mileage: s.vehicles.find((v) => v.id === job.vehicleId)?.mileage ?? 0,
        technician: job.technician,
      };
      return {
        ...s,
        jobs: s.jobs.map((j) => (j.id === jobId ? { ...j, status: "completed" as const } : j)),
        services: [...s.services, newService],
      };
    });
  }, []);

  const approveJob = useCallback((jobId: string) => {
    setState((s) => ({
      ...s,
      jobs: s.jobs.map((j) =>
        j.id === jobId && j.status === "waiting-approval" ? { ...j, status: "approved" as const } : j,
      ),
    }));
  }, []);

  const bookAppointment = useCallback((input: Omit<Appointment, "id" | "status">) => {
    setState((s) => ({
      ...s,
      appointments: [
        ...s.appointments,
        { ...input, id: `a${Date.now()}`, status: "confirmed" as const },
      ],
    }));
  }, []);

  const store = useMemo(
    () => ({
      state,
      resetDemo,
      toggleAutomation,
      setQuotationStatus,
      recordPayment,
      completeJob,
      approveJob,
      bookAppointment,
    }),
    [state, resetDemo, toggleAutomation, setQuotationStatus, recordPayment, completeJob, approveJob, bookAppointment],
  );

  return <DemoContext.Provider value={store}>{children}</DemoContext.Provider>;
}

export function useDemo(): DemoStore {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
