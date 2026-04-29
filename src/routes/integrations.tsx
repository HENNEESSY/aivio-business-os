import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Aivio" },
      { name: "description", content: "Connect Aivio to the tools your team already uses." },
    ],
  }),
  component: IntegrationsPage,
});

const integrations = [
  { name: "Slack", desc: "Team messaging", color: "#4A154B", initials: "SL", connected: true },
  { name: "Stripe", desc: "Payments & billing", color: "#635BFF", initials: "ST", connected: true },
  { name: "Gmail", desc: "Email sync", color: "#EA4335", initials: "GM", connected: true },
  { name: "HubSpot", desc: "Marketing CRM", color: "#FF7A59", initials: "HS", connected: false },
  { name: "Notion", desc: "Docs & wiki", color: "#000000", initials: "NO", connected: false },
  { name: "Linear", desc: "Issue tracking", color: "#5E6AD2", initials: "LN", connected: true },
  { name: "Zapier", desc: "Workflow automation", color: "#FF4A00", initials: "ZP", connected: false },
  { name: "Salesforce", desc: "Enterprise CRM", color: "#00A1E0", initials: "SF", connected: false },
  { name: "QuickBooks", desc: "Accounting", color: "#2CA01C", initials: "QB", connected: true },
  { name: "Google Drive", desc: "File storage", color: "#1FA463", initials: "GD", connected: false },
  { name: "Calendly", desc: "Scheduling", color: "#006BFF", initials: "CL", connected: true },
  { name: "Zoom", desc: "Video meetings", color: "#2D8CFF", initials: "ZM", connected: false },
];

function IntegrationsPage() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader
          title="Integrations"
          description="Connect your stack and let Aivio do the heavy lifting."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {integrations.map((i) => (
            <div key={i.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: i.color }}
                >
                  {i.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.desc}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs ${i.connected ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${i.connected ? "bg-success" : "bg-muted-foreground"}`} />
                  {i.connected ? "Connected" : "Not connected"}
                </span>
                <button
                  className={`text-xs font-medium rounded-md px-2.5 py-1 ${
                    i.connected
                      ? "border border-border text-foreground hover:bg-accent"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {i.connected ? "Manage" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
