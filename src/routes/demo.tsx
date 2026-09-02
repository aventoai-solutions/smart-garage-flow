import { createFileRoute } from "@tanstack/react-router";
import { DemoProvider } from "@/lib/demo-store";
import { DemoShell } from "@/components/demo/demo-shell";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Live Demo — Avento GarageOS" },
      { name: "description", content: "Explore a live interactive demo of Avento GarageOS garage management software." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DemoLayout,
});

function DemoLayout() {
  return (
    <DemoProvider>
      <DemoShell />
    </DemoProvider>
  );
}
