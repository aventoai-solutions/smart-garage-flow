# Avento GarageOS — Marketing Site + Interactive Live Demo

## Goal
Build a professional product website for Avento GarageOS with a fully clickable, realistic demo of the garage management software. No real backend — the demo runs on rich, pre-seeded demo data in the browser. Visitors can explore everything and simulate automations.

## Part 1 — Marketing website (at `/`)

- Hero: "Run Your Entire Garage From One Smart System" + big **Try Live Demo** CTA linking to `/demo`.
- Problem section: lost customers, paper job cards, no follow-up.
- How it works: the lifecycle — Customer → Vehicle → Appointment → Job → Invoice → Payment → Follow-Up → Customer Returns.
- Features grid: Customers, Vehicles & service history, Job cards, Appointments, Quotations, Invoices & payments, Inventory, Automation Center.
- Automation section: visual of the reminder flow (service completed → interval detected → personalized reminder → customer books → appointment appears in GarageOS), with a sample WhatsApp-style message bubble for Ahmed's BMW.
- Pricing hint (setup + subscription + automation package) and a "Book a demo call" contact section.
- Per-route SEO head metadata (title, description, og tags).

## Part 2 — Live demo app (at `/demo/*`)

A realistic garage-software shell (sidebar layout) with seeded data, all client-side state:

- **Dashboard** (`/demo`): stat cards — 12 vehicles in workshop, 4 waiting approval, 6 in progress, 7 appointments today, AED 18,450 revenue, 5 reminders due — plus today's job list.
- **Customers** (`/demo/customers`): searchable list; customer detail page with their vehicles and full service/invoice history.
- **Vehicles**: search by plate; vehicle detail (e.g. Ahmed Khan's BMW 320i, plate A 48291) showing service history timeline (oil change, brake pads, AC repair) with dates and amounts.
- **Jobs**: job-card board by status (Waiting Approval / In Progress / Completed); job detail with technician, estimated cost, parts.
- **Appointments**: today/upcoming list.
- **Quotations & Invoices**: list + detail, paid/unpaid status, AED amounts.
- **Inventory**: parts list with stock levels.
- **Automation Center** (`/demo/automation`): the 5 automations (Oil Service Reminder, Appointment Reminder, Review Request, Unpaid Invoice Reminder, Customer Reactivation) as toggleable cards showing trigger rules and stats; a **Simulate Reminder** button that shows the personalized WhatsApp-style message to Ahmed (name, car, last service date filled in), and "Book Appointment" flow that adds an appointment back into the demo.
- Demo banner on every demo page: "You're exploring a live demo — Book a call."

## Demo data
Realistic Dubai garage dataset: ~15 customers, ~20 vehicles (UAE plates, mileage), job cards in every status, invoices (paid + unpaid), appointments across the week, inventory items, and a service history per vehicle — consistent enough that Ahmed's story (BMW 320i, Jan oil change AED 450, Mar brake pads AED 1,250, Jun AC repair AED 700) checks out across customers, vehicles, jobs, invoices, and automation.

## Design
Distinctive dark "control room" aesthetic for the demo app (garage operations feel), lighter polished marketing site; generated screenshots/illustrations of the dashboard for the marketing page. Design directions will be proposed first.

## Technical notes
- TanStack Start routes: `src/routes/index.tsx` (site), `src/routes/demo/*` (demo app with layout route).
- Demo data as typed seed module under `src/lib/demo-data.ts`; automation simulation as pure client logic (derive "reminders due" from service dates/mileage so the demo is internally consistent).
- No Lovable Cloud needed for this stage; contact/booking CTA links out (WhatsApp or email) unless you want a lead form with a database.
