import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Plus, X, Mail, Phone, Building2 } from "lucide-react";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM — Aivio" },
      { name: "description", content: "Visual pipeline with kanban board to manage leads and deals." },
    ],
  }),
  component: CRMPage,
});

type Lead = {
  id: string;
  name: string;
  company: string;
  value: string;
  email: string;
  owner: string;
};

const columns: { id: string; title: string; tone: string; leads: Lead[] }[] = [
  {
    id: "new",
    title: "New",
    tone: "bg-info",
    leads: [
      { id: "1", name: "Emily Carter", company: "Northwind", value: "$4,200", email: "emily@northwind.io", owner: "AM" },
      { id: "2", name: "James Park", company: "Lumen", value: "$1,800", email: "james@lumen.co", owner: "SC" },
    ],
  },
  {
    id: "qualified",
    title: "Qualified",
    tone: "bg-secondary",
    leads: [
      { id: "3", name: "Priya Shah", company: "Helix Labs", value: "$8,400", email: "priya@helix.com", owner: "ML" },
      { id: "4", name: "David Kim", company: "Forge", value: "$3,100", email: "david@forge.io", owner: "AM" },
    ],
  },
  {
    id: "demo",
    title: "Demo",
    tone: "bg-primary",
    leads: [
      { id: "5", name: "Anna Riedel", company: "Atlas Group", value: "$12,500", email: "anna@atlas.com", owner: "SC" },
    ],
  },
  {
    id: "negotiation",
    title: "Negotiation",
    tone: "bg-warning",
    leads: [
      { id: "6", name: "Tomás Vega", company: "Cobalt", value: "$22,000", email: "tomas@cobalt.io", owner: "ML" },
      { id: "7", name: "Lila Brooks", company: "Pine & Oak", value: "$6,750", email: "lila@pine.co", owner: "AM" },
    ],
  },
  {
    id: "won",
    title: "Won",
    tone: "bg-success",
    leads: [
      { id: "8", name: "Owen Patel", company: "Vega", value: "$9,800", email: "owen@vega.io", owner: "SC" },
    ],
  },
];

function CRMPage() {
  const [active, setActive] = useState<Lead | null>(null);
  return (
    <AppLayout>
      <div className="p-6 md:p-8">
        <PageHeader
          title="CRM"
          description="Track every deal across your pipeline."
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> New lead
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {columns.map((col) => (
            <div key={col.id} className="rounded-xl border border-border bg-card/40 p-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${col.tone}`} />
                  <p className="text-sm font-medium">{col.title}</p>
                  <span className="text-xs text-muted-foreground">{col.leads.length}</span>
                </div>
              </div>
              <div className="space-y-2">
                {col.leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setActive(lead)}
                    className="w-full text-left rounded-lg border border-border bg-card p-3 hover:border-ring/40 transition-colors"
                  >
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{lead.company}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-medium text-foreground">{lead.value}</span>
                      <span className="h-5 w-5 rounded-full bg-surface-elevated flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                        {lead.owner}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl border border-border bg-popover shadow-elevated"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.company}</p>
              </div>
              <button onClick={() => setActive(null)} className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InfoTile icon={Mail} label="Email" value={active.email} />
                <InfoTile icon={Phone} label="Phone" value="+1 (555) 010-2233" />
                <InfoTile icon={Building2} label="Company" value={active.company} />
                <InfoTile icon={Mail} label="Deal value" value={active.value} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Notes</p>
                <textarea
                  rows={4}
                  defaultValue="Interested in Pro plan, scheduled a demo next week."
                  className="w-full rounded-md bg-surface border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
              <button onClick={() => setActive(null)} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
                Close
              </button>
              <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function InfoTile({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[11px] uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 text-sm truncate">{value}</p>
    </div>
  );
}
