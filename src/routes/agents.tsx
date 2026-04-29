import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Bot, Mail, MessageSquare, Headphones, FileText, BarChart3, Plus } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "AI Agents — Aivio" },
      { name: "description", content: "Deploy AI employees for outreach, support, sales operations and more." },
    ],
  }),
  component: AgentsPage,
});

const initialAgents = [
  { id: 1, name: "Outreach Agent", desc: "Personalized cold email sequences at scale.", usage: "1,284 / 5,000 actions", on: true, icon: Mail },
  { id: 2, name: "Support Agent", desc: "Auto-resolves tier-1 customer tickets.", usage: "412 / 1,000 conversations", on: true, icon: Headphones },
  { id: 3, name: "Sales Assistant", desc: "Drafts proposals and follow-ups for your reps.", usage: "98 / 500 tasks", on: false, icon: MessageSquare },
  { id: 4, name: "Analyst", desc: "Generates weekly business performance reports.", usage: "12 / 50 reports", on: true, icon: BarChart3 },
  { id: 5, name: "Content Agent", desc: "Writes blog posts and social content from briefs.", usage: "24 / 100 drafts", on: false, icon: FileText },
  { id: 6, name: "Research Agent", desc: "Researches accounts and enriches lead profiles.", usage: "640 / 2,000 lookups", on: true, icon: Bot },
];

function AgentsPage() {
  const [agents, setAgents] = useState(initialAgents);
  const toggle = (id: number) =>
    setAgents((xs) => xs.map((a) => (a.id === id ? { ...a, on: !a.on } : a)));
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader
          title="AI Agents"
          description="Your always-on team of AI employees."
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> New agent
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((a) => (
            <div key={a.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <a.icon className="h-5 w-5" />
                </div>
                <button
                  onClick={() => toggle(a.id)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${a.on ? "bg-primary" : "bg-surface-elevated"}`}
                  aria-label="Toggle agent"
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      a.on ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="mt-4 text-sm font-semibold">{a.name}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs ${a.on ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${a.on ? "bg-success" : "bg-muted-foreground"}`} />
                  {a.on ? "Active" : "Paused"}
                </span>
                <span className="text-xs text-muted-foreground">{a.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
