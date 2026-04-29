import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Финансовый радар — Aivio" },
      {
        name: "description",
        content:
          "Выручка, расходы, прибыль и кассовые риски по направлениям бизнеса в одном радаре.",
      },
    ],
  }),
  component: FinancePage,
});

const income = [36, 40, 42, 48, 46, 53, 51, 59, 57, 64, 63, 69, 68, 76, 74, 82];
const expenses = [22, 24, 25, 27, 28, 30, 31, 33, 35, 37, 38, 41, 42, 44, 46, 49];

function FinancePage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-[1400px] p-6 md:p-8">
        <PageHeader
          title="Финансовый радар"
          description="Деньги бизнеса в реальном времени: выручка, расходы, прибыль и риски по оплатам."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Kpi label="Остаток на счетах" value="₽ 5 240 000" change="+7,1%" up />
          <Kpi label="Расходы месяца" value="₽ 2 180 000" change="+4,3%" up={false} />
          <Kpi label="Чистая прибыль" value="₽ 1 460 000" change="+12,8%" up />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5 shadow-soft lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Выручка против расходов</p>
                <p className="text-xs text-muted-foreground">
                  Суммарно по услугам, бьюти, онлайн-школе, ритейлу и цветочному бизнесу
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-primary" />
                  Выручка
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm bg-muted-foreground/40" />
                  Расходы
                </span>
              </div>
            </div>
            <BarChart series1={income} series2={expenses} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <p className="mb-4 text-sm font-medium">Сводка P&L</p>
            <ul className="space-y-3 text-sm">
              <PLRow label="Выручка" value="₽ 6 820 000" />
              <PLRow label="Себестоимость" value="−₽ 1 970 000" muted />
              <PLRow label="Валовая прибыль" value="₽ 4 850 000" strong />
              <PLRow label="Операционные расходы" value="−₽ 3 390 000" muted />
              <div className="border-t border-border pt-3" />
              <PLRow label="Чистая прибыль" value="₽ 1 460 000" strong tone="success" />
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="mb-4 text-sm font-medium">Сигналы радара</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Alert
              title="Счета без оплаты"
              sub="Консалтинг и услуги: 4 счёта на ₽ 418 000 ждут оплаты больше 3 дней."
            />
            <Alert
              title="Пик закупок у цветочного бизнеса"
              sub="Перед праздниками расходы вырастут на 19%, нужен запас по кассе."
            />
            <Alert
              title="Ритейл ускоряет прибыль"
              sub="Повторные продажи выше плана на 11% после серии возвратных кампаний."
            />
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

function PLRow({
  label,
  value,
  muted,
  strong,
  tone,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
  tone?: "success";
}) {
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
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-warning/10 text-warning">
        <AlertTriangle className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function BarChart({ series1, series2 }: { series1: number[]; series2: number[] }) {
  const max = Math.max(...series1, ...series2);

  return (
    <div className="flex h-56 items-end gap-2">
      {series1.map((value, index) => (
        <div key={index} className="flex h-full flex-1 items-end gap-1">
          <div className="flex-1 rounded-t bg-primary/80" style={{ height: `${(value / max) * 100}%` }} />
          <div className="flex-1 rounded-t bg-muted-foreground/30" style={{ height: `${(series2[index] / max) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}
