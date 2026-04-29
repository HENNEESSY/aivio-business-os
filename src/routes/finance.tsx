import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { ArrowDownRight, ArrowUpRight, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance — Aivio" },
      { name: "description", content: "Cash flow, P&L, and financial alerts in one calm view." },
    ],
  }),
  component: FinancePage,
});

const cashflow = [40, 45, 42, 50, 48, 55, 52, 60, 58, 64, 61, 68, 65, 72, 70, 78];
const expenses = [30, 32, 31, 35, 34, 38, 36, 41, 40, 44, 42, 47, 45, 50, 48, 54];

function FinancePage() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader
          title="Finance"
          description="Real-time view of your business performance."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Kpi label="Cash on hand" value="$284,120" change="+4.2%" up />
          <Kpi label="Monthly burn" value="$48,300" change="+6.1%" up={false} />
          <Kpi label="Net profit (MTD)" value="$36,820" change="+18.5%" up />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium">Cash flow</p>
                <p className="text-xs text-muted-foreground">Revenue vs expenses</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-primary" /> Revenue</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-muted-foreground/40" /> Expenses</span>
              </div>
            </div>
            <BarChart series1={cashflow} series2={expenses} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm font-medium mb-4">P&L Summary</p>
            <ul className="space-y-3 text-sm">
              <PLRow label="Revenue" value="$284,500" />
              <PLRow label="COGS" value="−$62,100" muted />
              <PLRow label="Gross profit" value="$222,400" strong />
              <PLRow label="Operating exp." value="−$148,200" muted />
              <div className="pt-3 border-t border-border" />
              <PLRow label="Net profit" value="$74,200" strong tone="success" />
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm font-medium mb-4">Alerts</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Alert title="Burn rate above target" sub="Operating expenses up 6% this month." />
            <Alert title="2 invoices overdue" sub="$3,400 — Acme Co. & Helix Labs." />
            <Alert title="Subscription renewal" sub="3 enterprise renewals in next 14 days." />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Kpi({ label, value, change, up }: { label: string; value: string; change: string; up: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <span className={`mt-2 inline-flex items-center gap-0.5 text-xs font-medium ${up ? "text-success" : "text-warning"}`}>
        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {change}
      </span>
    </div>
  );
}

function PLRow({ label, value, muted, strong, tone }: { label: string; value: string; muted?: boolean; strong?: boolean; tone?: "success" }) {
  return (
    <li className="flex justify-between">
      <span className={muted ? "text-muted-foreground" : "text-foreground"}>{label}</span>
      <span className={`${strong ? "font-semibold" : ""} ${tone === "success" ? "text-success" : ""}`}>{value}</span>
    </li>
  );
}

function Alert({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
      <div className="h-8 w-8 rounded-md bg-warning/10 text-warning flex items-center justify-center">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

function BarChart({ series1, series2 }: { series1: number[]; series2: number[] }) {
  const max = Math.max(...series1, ...series2);
  return (
    <div className="h-56 flex items-end gap-2">
      {series1.map((v, i) => (
        <div key={i} className="flex-1 flex items-end gap-1 h-full">
          <div className="flex-1 bg-primary/80 rounded-t" style={{ height: `${(v / max) * 100}%` }} />
          <div className="flex-1 bg-muted-foreground/30 rounded-t" style={{ height: `${(series2[i] / max) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}
