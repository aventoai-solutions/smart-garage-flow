import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Users,
  Car,
  Wrench,
  CalendarDays,
  FileText,
  Receipt,
  Boxes,
  Zap,
  BellRing,
  Star,
  MessageSquareWarning,
  Banknote,
  UserPlus,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avento GarageOS — Garage Management Software + Smart Automation" },
      {
        name: "description",
        content:
          "Run your entire garage from one smart system: customers, vehicles, job cards, appointments, quotations, invoices — with AI automation that brings customers back.",
      },
      { property: "og:title", content: "Avento GarageOS — Run Your Entire Garage From One Smart System" },
      {
        property: "og:description",
        content:
          "Garage management software with automation built in: service reminders, review requests, payment follow-ups and customer reactivation — all driven by your garage's own data.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://smart-garage-flow.vercel.app/" },
      { property: "og:image", content: "https://smart-garage-flow.vercel.app/og-image-v2.jpg" },
      { property: "og:image:secure_url", content: "https://smart-garage-flow.vercel.app/og-image-v2.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Avento GarageOS — Run Your Entire Garage From One Smart System" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://smart-garage-flow.vercel.app/og-image-v2.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://smart-garage-flow.vercel.app/" }],
  }),
  component: Marketing,
});

const LIFECYCLE = ["Customer", "Vehicle", "Appointment", "Job", "Invoice", "Payment", "Follow-Up", "Customer Returns"];

const FEATURES = [
  { icon: Users, title: "Customers", text: "Full customer profiles with contact details, visit counts and lifetime spend." },
  { icon: Car, title: "Vehicles & service history", text: "Plates, VINs, mileage and a complete service timeline for every vehicle.", big: true },
  { icon: Wrench, title: "Job cards", text: "Track every repair from Waiting Approval to Quality Check to Completed." },
  { icon: CalendarDays, title: "Appointments", text: "Today's bookings at a glance — including the ones automation booked for you." },
  { icon: FileText, title: "Quotations", text: "Send estimates and see exactly which are approved, pending or declined." },
  { icon: Receipt, title: "Invoices & payments", text: "Invoice every completed job and never lose track of an unpaid bill." },
  { icon: Boxes, title: "Inventory", text: "Parts stock levels with low-stock warnings before you run out." },
  { icon: Zap, title: "Automation Center", text: "Reminders and follow-ups that run themselves on your own garage data.", big: true },
];

const AUTOMATIONS = [
  { icon: BellRing, name: "Oil Service Reminder", text: "Detects vehicles approaching their next service interval and invites the customer to book." },
  { icon: CalendarDays, name: "Appointment Reminder", text: "Reduces no-shows with a reminder the day before each booking." },
  { icon: Star, name: "Google Review Request", text: "Asks for a review a few hours after a completed job." },
  { icon: Banknote, name: "Unpaid Invoice Reminder", text: "Politely follows up on outstanding invoices." },
  { icon: UserPlus, name: "Customer Reactivation", text: "Wins back customers who haven't visited in months." },
];

function Marketing() {
  return (
    <div className="min-h-screen bg-pale font-sans text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-navy/10 bg-pale/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-navy font-display text-sm font-bold text-pale">AG</div>
            <span className="font-display text-lg font-semibold text-navy">Avento GarageOS</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#automation" className="hidden text-sm font-medium text-navy/70 hover:text-navy sm:block">
              Automation
            </a>
            <a href="#pricing" className="hidden text-sm font-medium text-navy/70 hover:text-navy sm:block">
              Pricing
            </a>
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-pale transition-colors hover:bg-navy-light"
            >
              Try live demo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-navy/10 bg-navy text-pale">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-pale/20 bg-pale/5 px-4 py-1.5 text-xs font-medium text-pale/80">
            <Zap className="h-3.5 w-3.5" /> Garage Management System + Smart Automation
          </p>
          <h1 className="font-display mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Run Your Entire Garage From One Smart System
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-pale/70">
            Customers, vehicles, job cards, appointments, quotations, invoices and complete service history — with
            automation that follows up and brings your customers back.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-pale px-6 py-3.5 font-display text-base font-semibold text-navy transition-colors hover:bg-white"
            >
              Try live demo <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="mailto:hello@avento.ai?subject=GarageOS%20demo%20call"
              className="inline-flex items-center gap-2 rounded-lg border border-pale/30 px-6 py-3.5 text-base font-medium text-pale transition-colors hover:bg-pale/10"
            >
              Book a demo call
            </a>
          </div>
          <p className="mt-4 text-xs text-pale/50">No signup needed — the demo is a full working copy of the software.</p>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display max-w-2xl text-3xl font-bold text-navy">
          Most garages lose customers they already earned
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: FileText, title: "Paper job cards & memory", text: "Customer history lives in notebooks and WhatsApp chats — impossible to search, easy to lose." },
            { icon: MessageSquareWarning, title: "No follow-up", text: "Six months after an oil change, nobody reminds the customer. They end up at another garage." },
            { icon: Banknote, title: "Money left on the table", text: "Unpaid invoices, unconfirmed appointments and lapsed customers silently drain revenue." },
          ].map((p) => (
            <div key={p.title} className="rounded-xl border border-navy/10 bg-white p-6 shadow-xs">
              <p.icon className="h-6 w-6 text-steel" />
              <h3 className="font-display mt-4 text-lg font-semibold text-navy">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lifecycle */}
      <section className="border-y border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold text-navy">One connected workflow</h2>
          <p className="mt-3 max-w-2xl text-navy/60">
            Every step feeds the next. The service you complete today becomes the reminder that brings the customer back.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-2">
            {LIFECYCLE.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={
                    i === LIFECYCLE.length - 1
                      ? "rounded-lg bg-steel px-4 py-2 font-display text-sm font-semibold text-white"
                      : "rounded-lg border border-navy/15 bg-pale px-4 py-2 text-sm font-medium text-navy"
                  }
                >
                  {step}
                </span>
                {i < LIFECYCLE.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-navy/30" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold text-navy">Everything a garage runs on</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={
                f.big
                  ? "rounded-xl border border-navy/10 bg-navy p-6 shadow-xs sm:col-span-2"
                  : "rounded-xl border border-navy/10 bg-white p-6 shadow-xs"
              }
            >
              <f.icon className={f.big ? "h-6 w-6 text-pale" : "h-6 w-6 text-steel"} />
              <h3 className={f.big ? "font-display mt-4 text-lg font-semibold text-pale" : "font-display mt-4 text-lg font-semibold text-navy"}>
                {f.title}
              </h3>
              <p className={f.big ? "mt-2 max-w-md text-sm leading-relaxed text-pale/70" : "mt-2 text-sm leading-relaxed text-navy/60"}>
                {f.text}
              </p>
              {f.title === "Vehicles & service history" && (
                <div className="mt-4 space-y-1.5 text-sm">
                  {[
                    ["January", "Oil & Filter Change", "AED 450"],
                    ["March", "Brake Pads (Front)", "AED 1,250"],
                    ["June", "AC Repair", "AED 700"],
                  ].map(([m, s, a]) => (
                    <div key={s} className="flex items-center justify-between rounded-md bg-pale/10 px-3 py-1.5 text-pale/80">
                      <span>{m} — {s}</span>
                      <span className="font-medium text-pale">{a}</span>
                    </div>
                  ))}
                </div>
              )}
              {f.title === "Automation Center" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Oil Service Reminder", "Appointment Reminder", "Review Request", "Payment Reminder", "Reactivation"].map((a) => (
                    <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-pale/10 px-3 py-1 text-xs font-medium text-pale/80">
                      <Check className="h-3 w-3 text-emerald-300" /> {a}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Automation */}
      <section id="automation" className="border-y border-navy/10 bg-navy text-pale">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-pale/50 uppercase">The difference</p>
            <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
              Software that uses your data — not just stores it
            </h2>
            <p className="mt-4 text-pale/70">
              GarageOS knows who the customer is, what car they drive, and when they were last serviced. Automation
              turns that into returning customers:
            </p>
            <ol className="mt-8 space-y-3">
              {[
                "Service completed — type, date and mileage stored",
                "System detects the upcoming service window",
                "Personalized reminder sent automatically",
                "Customer taps Book Appointment",
                "Appointment appears inside GarageOS",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-pale/10 font-display text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-pale/85">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          {/* Phone mock */}
          <div className="mx-auto w-full max-w-xs rounded-[2rem] border-4 border-pale/20 bg-[#e5ddd2] p-4 shadow-xl">
            <div className="mb-3 flex items-center gap-2 border-b border-black/10 pb-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-navy text-xs font-bold text-pale">AG</div>
              <div>
                <p className="text-xs font-semibold text-slate-800">ABC Garage</p>
                <p className="text-[10px] text-emerald-700">online</p>
              </div>
            </div>
            <div className="rounded-lg rounded-tl-none bg-white p-3 text-[13px] leading-relaxed text-slate-800 shadow-xs">
              Hi Ahmed, your BMW 320i may be due for its next oil service. Your last oil service with ABC Garage was
              on 12 January. Would you like to book your next appointment?
              <span className="mt-2 block rounded-md bg-navy px-3 py-1.5 text-center text-xs font-semibold text-white">
                Book Appointment
              </span>
            </div>
            <div className="mt-2 pr-1 text-right text-[10px] text-slate-500">10:04 ✓✓</div>
            <div className="mt-4 ml-auto w-fit rounded-lg rounded-tr-none bg-[#d9fdd3] p-3 text-[13px] text-slate-800 shadow-xs">
              Yes please, tomorrow morning?
            </div>
          </div>
        </div>
      </section>

      {/* Automation list */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold text-navy">Five automations, zero effort</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUTOMATIONS.map((a) => (
            <div key={a.name} className="rounded-xl border border-navy/10 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <a.icon className="h-6 w-6 text-steel" />
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">Active</span>
              </div>
              <h3 className="font-display mt-4 text-lg font-semibold text-navy">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/60">{a.text}</p>
            </div>
          ))}
          <div className="flex flex-col items-start justify-center rounded-xl border border-dashed border-navy/20 bg-pale p-6">
            <p className="font-display text-lg font-semibold text-navy">See them working</p>
            <p className="mt-2 text-sm text-navy/60">Open the Automation Center in the demo and simulate a reminder.</p>
            <Link to="/demo/automation" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-pale hover:bg-navy-light">
              Open Automation Center <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-navy/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold text-navy">Simple pricing for garages</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { name: "Setup", price: "One-time", text: "We configure GarageOS for your garage and migrate your existing customer records." },
              { name: "Software", price: "Monthly", text: "The full management system: customers, vehicles, jobs, appointments, quotations, invoices and inventory." },
              { name: "Automation package", price: "Optional add-on", text: "Service reminders, review requests, payment follow-ups and reactivation campaigns.", highlight: true },
            ].map((p) => (
              <div
                key={p.name}
                className={
                  p.highlight
                    ? "rounded-xl border-2 border-steel bg-navy p-6 text-pale shadow-xs"
                    : "rounded-xl border border-navy/10 bg-pale p-6 shadow-xs"
                }
              >
                <h3 className={p.highlight ? "font-display text-lg font-semibold" : "font-display text-lg font-semibold text-navy"}>{p.name}</h3>
                <p className={p.highlight ? "font-display mt-1 text-sm font-medium text-pale/70" : "font-display mt-1 text-sm font-medium text-steel"}>
                  {p.price}
                </p>
                <p className={p.highlight ? "mt-3 text-sm leading-relaxed text-pale/70" : "mt-3 text-sm leading-relaxed text-navy/60"}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-navy/10 bg-navy text-pale">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Try the software yourself</h2>
          <p className="mx-auto mt-4 max-w-xl text-pale/70">
            Open the live demo: browse customers and vehicles, check service history, approve a quotation and simulate
            a service reminder.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/demo"
              className="inline-flex items-center gap-2 rounded-lg bg-pale px-6 py-3.5 font-display text-base font-semibold text-navy hover:bg-white"
            >
              Try live demo <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="mailto:hello@avento.ai?subject=GarageOS%20demo%20call"
              className="inline-flex items-center gap-2 rounded-lg border border-pale/30 px-6 py-3.5 text-base font-medium text-pale hover:bg-pale/10"
            >
              Book a demo call
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-navy px-6 py-6 text-center text-xs text-pale/40">
        © 2026 Avento AI · Avento GarageOS — garage management software with smart automation
      </footer>
    </div>
  );
}
