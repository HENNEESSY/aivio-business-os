import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { ArrowDownRight, ArrowUpRight, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Финансы — Aivio" },
      { name: "description", content: "Денежный поток, P&L и финансовые уведомления в одном спокойном интерфейсе." },
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
          title="Финансы"
          description="Показатели бизнеса в реальном времени."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Kpi label="Остаток на счетах" value="₽ 21 030 000" change="+4,2%" up />
          <Kpi label="Месячное сжигание" value="₽ 3 575 000" change="+6,1%" up={false} />
          <Kpi label="Чистая прибыль (МТД)" value="₽ 2 725 000" change="+18,5%" up />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium">Денежный поток</p>
                <p className="text-xs text-muted-foreground">Выручка против расходов</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-primary" /> Выручка</span>
                <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-muted-foreground/40" /> Расходы</span>
              </div>
            </div>
            <BarChart series1={cashflow} series2={expenses} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="text-sm font-medium mb-4">Сводка P&L</p>
            <ul className="space-y-3 text-sm">
              <PLRow label="Выручка" value="₽ 21 050 000" />
              <PLRow label="Себестоимость" value="−₽ 4 596 000" muted />
              <PLRow label="Валовая прибыль" value="₽ 16 454 000" strong />
              <PLRow label="Операционные расходы" value="−₽ 10 967 000" muted />
              <div className="pt-3 border-t border-border" />
              <PLRow label="Чистая прибыль" value="₽ 5 487 000" strong tone="success" />
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm font-medium mb-4">Уведомления</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Alert title="Сжигание выше плана" sub="Операционные расходы выросли на 6% в этом месяце." />
            <Alert title="2 счёта просрочены" sub="₽ 252 000 — Acme Co. и Helix Labs." />
            <Alert title="Продление подписки" sub="3 enterprise-продления в ближайшие 14 дней." />
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
