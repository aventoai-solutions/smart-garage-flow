# Avento GarageOS — Marketing Site + Interactive Live Demo

## Goal
Professional product website for Avento GarageOS plus a fully clickable, realistic demo of the garage management software. No backend — the demo runs on rich, pre-seeded demo data with client-side state. Visitors explore everything and simulate automations. Focused first version: no complex accounting, no real messaging, no database.

## Design direction (locked)
- **Palette — Navy Trust**: deep navy `#0f1b3d` / `#1e3a5f`, steel blue `#3b6fa0` accent, pale `#e8edf3` surfaces. Professional, credible, enterprise — not futuristic, not generic-AI.
- **Typography**: Space Grotesk (headings) + DM Sans (body), loaded via `<link>` in `__root.tsx`.
- **Marketing site layout**: bento-grid feature sections after the hero.
- **Demo app**: fixed left-sidebar software shell, dense readable tables, restrained motion (subtle hover, stat count-ups, message-bubble reveal). Dark-navy sidebar, light content area for readability of data.

## Part 1 — Marketing website (`/`)
- Hero: "Run Your Entire Garage From One Smart System" + **Try Live Demo** CTA → `/demo`.
- Problem section (paper job cards, lost follow-ups, no customer history).
- Lifecycle strip: Customer → Vehicle → Appointment → Job → Invoice → Payment → Follow-Up → Customer Returns.
- Bento feature grid: Customers, Vehicles & service history, Job cards, Appointments, Quotations, Invoices & payments, Inventory, Automation Center.
- Automation section: reminder flow visual + phone mock showing personalized message to Ahmed Khan (BMW 320i, plate A 48291, last oil service 12 March).
- Pricing hint (setup + subscription + automation add-on) and Book-a-demo CTA (WhatsApp/email link, no form backend).
- Unique SEO head metadata.

## Part 2 — Live demo app (`/demo/*`, client-side state)
Shell: sidebar nav, top bar with **global search** (matches customer name, phone, plate, VIN with grouped results dropdown), **Reset Demo** button (restores seed data), demo banner ("You're exploring a live demo — Book a call").

Pages:
- **Dashboard** (`/demo`): stats — 12 vehicles in workshop, 4 waiting approval, 6 in progress, 7 appointments today, AED 18,450 revenue, 5 service reminders due — plus today's jobs.
- **Customers**: list with search; detail page with vehicles, **lifetime spend**, visit count, service history.
- **Vehicles**: search by plate/VIN; detail (Ahmed's BMW 320i, A 48291) with service-history timeline (Jan oil change AED 450, Mar brake pads AED 1,250, Jun AC repair AED 700) and **Next service due** chip (derived from last service date + interval rule).
- **Jobs**: board/table with workflow statuses — Waiting Approval / Approved / In Progress / Quality Check / Completed; job detail with technician, parts, estimated cost.
- **Appointments**: today/upcoming list with status (confirmed, pending, no-show).
- **Quotations**: list + detail with **approval statuses** (Draft / Sent / Approved / Declined); approving one is simulated client-side.
- **Invoices**: paid/unpaid, AED amounts, payment recording simulated.
- **Inventory**: parts with stock levels and low-stock flags.
- **Automation Center**: 5 toggleable automations (Oil Service Reminder, Appointment Reminder, Review Request, Unpaid Invoice Reminder, Customer Reactivation) with trigger rules, stats, and **estimated revenue recovered**; **Simulate Reminder** reveals the personalized WhatsApp-style message (real name/car/date filled from demo data) with a "Book Appointment" action that adds an appointment into the demo state.

## Demo data & logic
- Typed seed module `src/lib/demo-data.ts`: ~15 customers, ~20 vehicles (UAE plates, VINs, km mileage), jobs in every status, quotations in every approval state, invoices (paid + unpaid), appointments, inventory, service histories — internally consistent so Ahmed's story checks out across all pages.
- Client-side store (React context + useReducer or zustand) so interactions (approve quotation, complete job, book appointment, reset demo) mutate state live; Reset Demo restores the seed.
- Reminders/next-service-due derived from service dates + interval rules so the demo is logically consistent.

## Technical notes
- TanStack Start routes: `src/routes/index.tsx` (site), `src/routes/demo.tsx` layout + `demo.*.tsx` leaf routes; every route file created in the same batch as its links.
- Design tokens in `src/styles.css` (oklch conversions of Navy Trust); fonts via `<link>` in `__root.tsx`.
- No Lovable Cloud, no backend. Book-a-demo CTA is a WhatsApp/email link.
- Verify with build log + Playwright walkthrough of the demo flows.
