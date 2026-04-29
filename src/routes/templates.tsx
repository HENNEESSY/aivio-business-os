import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — Aivio" },
      { name: "description", content: "Pre-built pipelines and workflows to launch fast." },
    ],
  }),
  component: TemplatesPage,
});

const templates = [
  { name: "SaaS Sales Pipeline", desc: "5-stage pipeline tuned for B2B SaaS deals.", stages: ["New", "Qualified", "Demo", "Negotiation", "Won"] },
  { name: "Agency Onboarding", desc: "Onboard new clients with milestone tracking.", stages: ["Intake", "Kickoff", "Discovery", "Delivery", "Wrap"] },
  { name: "E-commerce Funnel", desc: "Track customer journey end-to-end.", stages: ["Visitor", "Lead", "Cart", "Customer", "Repeat"] },
  { name: "Recruiting Pipeline", desc: "From applicant to hire in one place.", stages: ["Applied", "Screen", "Interview", "Offer", "Hired"] },
  { name: "Customer Success", desc: "Reduce churn with health scoring.", stages: ["Onboarding", "Adopting", "Healthy", "At-risk", "Churned"] },
  { name: "Investor Pipeline", desc: "Manage fundraising rounds.", stages: ["Sourced", "Meeting", "Diligence", "Term sheet", "Closed"] },
];

function TemplatesPage() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader title="Templates" description="Start from a proven workflow and customize from there." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5 shadow-soft hover:border-ring/40 transition-colors">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.desc}</p>

              <div className="mt-4 rounded-lg bg-surface border border-border p-3">
                <div className="flex items-center gap-1">
                  {t.stages.map((s, i) => (
                    <div key={s} className="flex items-center gap-1 flex-1">
                      <div className={`flex-1 h-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/20"}`} />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                  {t.stages.map((s) => (
                    <span key={s} className="truncate" style={{ maxWidth: `${100 / t.stages.length}%` }}>{s}</span>
                  ))}
                </div>
              </div>

              <button className="mt-4 w-full rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Use template
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
