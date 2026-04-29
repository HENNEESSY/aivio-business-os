import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Aivio" },
      { name: "description", content: "Revenue, leads, conversion, AI insights and financial alerts at a glance." },
    ],
  }),
  component: DashboardPage,
});

const stats = [
  { label: "Revenue (MTD)", value: "$84,210", change: "+12.4%", up: true, icon: DollarSign },
  { label: "New Leads", value: "1,284", change: "+8.1%", up: true, icon: Users },
  { label: "Conversion", value: "4.7%", change: "+0.6%", up: true, icon: Target },
  { label: "Avg. Deal Size", value: "$2,140", change: "−2.3%", up: false, icon: TrendingUp },
];

const activity = [
  { who: "Sofia Chen", what: "closed deal with Northwind", when: "2m ago" },
  { who: "AI Agent · Outreach", what: "sent 124 personalized emails", when: "18m ago" },
  { who: "Marcus Lee", what: "moved 3 leads to Negotiation", when: "1h ago" },
  { who: "Stripe", what: "received payment of $4,200", when: "2h ago" },
  { who: "AI Agent · Support", what: "resolved 9 tickets", when: "3h ago" },
];

function DashboardPage() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader
          title="Good morning, Alex"
          description="Here's what's happening across your business today."
        />

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="h-8 w-8 rounded-md bg-surface-elevated flex items-center justify-center text-muted-foreground">
                  <s.icon className="h-4 w-4" />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium">Revenue overview</p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <div className="flex gap-1 rounded-md border border-border p-0.5 text-xs">
                {["7D", "30D", "90D"].map((p, i) => (
                  <button
                    key={p}
                    className={`px-2.5 py-1 rounded ${i === 1 ? "bg-surface-elevated text-foreground" : "text-muted-foreground"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <SparkChart />
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">AI Insights</p>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Generated 5 minutes ago</p>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-foreground/90">Pipeline velocity is up 18% — push more leads to Demo stage.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />
                <span className="text-foreground/90">3 enterprise leads are stalled — recommend re-engagement sequence.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-info shrink-0" />
                <span className="text-foreground/90">Best send time today: 2:30 PM based on open rates.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm font-medium mb-4">Activity feed</p>
            <ul className="divide-y divide-border">
              {activity.map((a, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <div className="h-8 w-8 rounded-full bg-surface-elevated flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {a.who.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{a.who}</span>{" "}
                      <span className="text-muted-foreground">{a.what}</span>
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.when}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm font-medium mb-4">Financial alerts</p>
            <div className="space-y-3">
              <AlertRow icon={AlertTriangle} tone="warning" title="Cash runway: 8 months" sub="Burn increased 6% MoM" />
              <AlertRow icon={CheckCircle2} tone="success" title="MRR target on track" sub="92% of monthly goal" />
              <AlertRow icon={AlertTriangle} tone="info" title="2 invoices overdue" sub="$3,400 total" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function AlertRow({
  icon: Icon,
  tone,
  title,
  sub,
}: {
  icon: typeof AlertTriangle;
  tone: "warning" | "success" | "info";
  title: string;
  sub: string;
}) {
  const toneCls =
    tone === "warning"
      ? "text-warning bg-warning/10"
      : tone === "success"
      ? "text-success bg-success/10"
      : "text-info bg-info/10";
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border p-3">
      <div className={`h-8 w-8 rounded-md flex items-center justify-center ${toneCls}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function SparkChart() {
  // Smooth area chart, calm colors
  const points = [12, 18, 14, 22, 20, 28, 24, 32, 30, 38, 34, 42, 40, 48, 46, 54, 52, 60, 58, 66, 62, 70, 68, 76, 74, 82, 78, 86, 84, 92];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 800, h = 200, pad = 8;
  const stepX = (w - pad * 2) / (points.length - 1);
  const norm = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${pad + i * stepX} ${norm(p)}`).join(" ");
  const area = `${path} L ${pad + (points.length - 1) * stepX} ${h - pad} L ${pad} ${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48">
      <defs>
        <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.66 0.18 264)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.66 0.18 264)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#rev)" />
      <path d={path} fill="none" stroke="oklch(0.66 0.18 264)" strokeWidth="2" />
    </svg>
  );
}
