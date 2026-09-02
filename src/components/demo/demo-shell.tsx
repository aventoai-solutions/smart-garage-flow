import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  Car,
  Wrench,
  CalendarDays,
  FileText,
  Receipt,
  Boxes,
  Zap,
  Search,
  RotateCcw,
  Phone,
} from "lucide-react";
import { useDemo } from "@/lib/demo-store";
import { globalSearch } from "@/lib/demo-utils";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

const NAV: NavItem[] = [
  { to: "/demo", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/demo/customers", label: "Customers", icon: Users },
  { to: "/demo/vehicles", label: "Vehicles", icon: Car },
  { to: "/demo/jobs", label: "Jobs", icon: Wrench },
  { to: "/demo/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/demo/quotations", label: "Quotations", icon: FileText },
  { to: "/demo/invoices", label: "Invoices", icon: Receipt },
  { to: "/demo/inventory", label: "Inventory", icon: Boxes },
  { to: "/demo/automation", label: "Automation Center", icon: Zap },
];

function GlobalSearch() {
  const { state } = useDemo();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const results = globalSearch(query, state);
  const hasResults = results.customers.length > 0 || results.vehicles.length > 0;

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (to: string, params: Record<string, string>) => {
    setOpen(false);
    setQuery("");
    navigate({ to, params });
  };

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search customer, phone, plate or VIN…"
        aria-label="Global search"
        className="h-10 w-full rounded-lg border border-input bg-background pr-3 pl-9 text-sm text-foreground outline-hidden placeholder:text-muted-foreground focus:ring-3 focus:ring-ring/40"
      />
      {open && query.trim().length >= 2 && (
        <div className="absolute top-11 left-0 z-50 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          {!hasResults && <p className="px-4 py-3 text-sm text-muted-foreground">No matches found.</p>}
          {results.customers.length > 0 && (
            <div>
              <p className="bg-secondary/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Customers</p>
              {results.customers.map((c) => (
                <button
                  key={c.id}
                  onClick={() => go("/demo/customers/$id", { id: c.id })}
                  className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left hover:bg-accent/50"
                >
                  <span className="min-w-0 truncate text-sm font-medium text-foreground">{c.label}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{c.sub}</span>
                </button>
              ))}
            </div>
          )}
          {results.vehicles.length > 0 && (
            <div>
              <p className="bg-secondary/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">Vehicles</p>
              {results.vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => go("/demo/vehicles/$id", { id: v.id })}
                  className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left hover:bg-accent/50"
                >
                  <span className="min-w-0 truncate text-sm font-medium text-foreground">{v.label}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{v.sub}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DemoShell() {
  const { resetDemo } = useDemo();
  const [resetDone, setResetDone] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sidebar-primary font-display text-sm font-bold text-sidebar-primary-foreground">
            AG
          </div>
          <div className="min-w-0">
            <p className="font-display truncate text-sm font-semibold">Avento GarageOS</p>
            <p className="truncate text-xs text-sidebar-foreground/60">ABC Garage · Dubai</p>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              {...(item.exact ? { activeOptions: { exact: true } } : {})}
              activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground" }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border px-5 py-4">
          <Link to="/" className="text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground">
            ← Back to website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-border bg-card px-6 py-3">
          <GlobalSearch />
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <button
              onClick={() => {
                resetDemo();
                setResetDone(true);
                setTimeout(() => setResetDone(false), 2000);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <RotateCcw className={cn("h-3.5 w-3.5", resetDone && "animate-spin")} />
              {resetDone ? "Demo reset!" : "Reset demo"}
            </button>
            <a
              href="mailto:hello@avento.ai?subject=GarageOS%20demo%20call"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Phone className="h-3.5 w-3.5" />
              Book a call
            </a>
          </div>
        </header>
        <div className="border-b border-steel/20 bg-navy px-6 py-2 text-center text-xs text-pale/90">
          You're exploring a live interactive demo — all data is sample data. Actions are simulated in your browser.
        </div>
        <main className="flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
