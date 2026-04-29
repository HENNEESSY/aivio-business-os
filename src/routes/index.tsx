import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  ListTodo,
  MessageSquareReply,
  MoveRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Центр управления — Aivio" },
      {
        name: "description",
        content:
          "Бизнес-cockpit Aivio: метрики, сделки, задачи, события, риски и AI-рекомендации на одном экране.",
      },
    ],
  }),
  component: DashboardPage,
});

const metrics = [
  {
    label: "Выручка месяца",
    value: "₽ 6 420 000",
    change: "+12,8%",
    up: true,
    icon: CircleDollarSign,
  },
  {
    label: "Активные сделки",
    value: "34",
    change: "+6",
    up: true,
    icon: BriefcaseBusiness,
  },
  {
    label: "Новые лиды за 7 дней",
    value: "218",
    change: "+9,1%",
    up: true,
    icon: Users,
  },
  {
    label: "Конверсия в оплату",
    value: "7,4%",
    change: "-0,6%",
    up: false,
    icon: Target,
  },
];

const activeDeals = [
  {
    client: "Lime Beauty",
    segment: "Бьюти",
    stage: "Переговоры",
    owner: "Марина Лаврова",
    value: "₽ 118 000",
  },
  {
    client: "Школа ProSkills",
    segment: "Онлайн-образование",
    stage: "Предложение",
    owner: "Екатерина Новикова",
    value: "₽ 214 000",
  },
  {
    client: "Flora District",
    segment: "Цветочный бизнес",
    stage: "Квалификация",
    owner: "Алексей Морозов",
    value: "₽ 146 000",
  },
  {
    client: "Громова Консалт",
    segment: "Консалтинг",
    stage: "Согласование",
    owner: "Марина Лаврова",
    value: "₽ 340 000",
  },
];

const todayTasks = [
  { title: "Подготовить оффер для Lime Beauty", time: "11:30", owner: "Марина" },
  { title: "Созвон с ProSkills по воронке вебинаров", time: "13:00", owner: "Екатерина" },
  { title: "Проверить оплаты по консалтингу", time: "15:00", owner: "Алексей" },
  { title: "Запустить follow-up по 9 зависшим лидам", time: "17:30", owner: "AI + Марина" },
];

const events = [
  {
    who: "AI-квалификатор",
    what: "разобрал 14 новых обращений из Telegram, WhatsApp и сайта",
    when: "5 мин назад",
  },
  {
    who: "Inbox",
    what: "связал новый диалог из Instagram с клиентом Lime Beauty и карточкой сделки",
    when: "18 мин назад",
  },
  {
    who: "Екатерина Новикова",
    what: "отправила коммерческое предложение для Школы ProSkills",
    when: "42 мин назад",
  },
  {
    who: "Финансовый радар",
    what: "обнаружил риск кассового разрыва в онлайн-образовании через 6 дней",
    when: "1 ч назад",
  },
];

const risks = [
  {
    tone: "warning" as const,
    title: "Кассовый разрыв через 6 дней",
    sub: "Нужно ускорить оплату 3 счетов на ₽ 418 000 в консалтинге и услугах",
  },
  {
    tone: "info" as const,
    title: "Себестоимость растёт у цветочного бизнеса",
    sub: "Перед праздничным пиком закупки уже выше плана на 14%",
  },
  {
    tone: "success" as const,
    title: "Ритейл держит план по валовой марже",
    sub: "76% месячной цели уже подтверждено оплатами и повторными заказами",
  },
];

const recommendations = [
  {
    title: "Вернуть горячий лид в бьюти-сегменте",
    text: "Анна из Lime Beauty запросила запуск на этой неделе, но после последнего ответа менеджера прошло 23 часа.",
    action: "Напомнить клиенту",
    accent: "primary",
  },
  {
    title: "Ускорить зависшую сделку в консалтинге",
    text: "У сделки «Громова Консалт» нет движения 3 дня. AI рекомендует перевести её на этап согласования и отправить новый follow-up.",
    action: "Перевести сделку",
    accent: "info",
  },
  {
    title: "Зафиксировать задачу по оплатам",
    text: "По 3 счетам нет оплаты, а финансовый радар уже подсветил риск. Лучше поставить задачу на прозвон сегодня до 16:00.",
    action: "Создать задачу",
    accent: "warning",
  },
  {
    title: "Подготовить ответ для онлайн-школы",
    text: "Клиент из ProSkills просит показать сценарий догрева после вебинара. AI уже собрал черновик с этапами и выгодой.",
    action: "Сформировать ответ",
    accent: "success",
  },
] as const;

function DashboardPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-[1440px] p-6 md:p-8">
        <PageHeader
          title="Центр управления"
          description="Рабочий cockpit по продажам, клиентам, AI-сотрудникам и денежным сигналам бизнеса."
        />

        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="grid gap-0 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-border p-6 xl:border-b-0 xl:border-r">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Ключевые метрики
                  </p>
                  <p className="mt-3 max-w-xl text-2xl font-semibold tracking-tight">
                    Бизнес под контролем: лиды заходят, сделки движутся, AI подсказывает, где действовать прямо сейчас.
                  </p>
                </div>
                <div className="hidden rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-right md:block">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary">Фокус дня</p>
                  <p className="mt-1 text-sm font-medium text-foreground">Закрыть 2 сделки и снять риск по оплатам</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-muted-foreground">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                          item.up ? "text-success" : "text-destructive"
                        }`}
                      >
                        {item.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {item.change}
                      </span>
                    </div>
                    <p className="mt-4 text-2xl font-semibold tracking-tight">{item.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Темп выручки</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Общая динамика по услугам, бьюти, консалтингу, онлайн-образованию, ритейлу и цветочному бизнесу
              </p>
              <div className="mt-5 rounded-xl border border-border bg-surface p-4">
                <SparkChart />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Активные сделки</p>
            </div>
            <div className="space-y-3">
              {activeDeals.map((deal) => (
                <div key={deal.client} className="grid gap-3 rounded-xl border border-border bg-surface p-4 md:grid-cols-[1.3fr_0.9fr_0.8fr_auto] md:items-center">
                  <div>
                    <p className="text-sm font-medium">{deal.client}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{deal.segment}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Этап</p>
                    <p className="mt-1 text-sm">{deal.stage}</p>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Ответственный</p>
                    <p className="mt-1 text-sm">{deal.owner}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Сумма</p>
                    <p className="mt-1 text-sm font-medium">{deal.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <ListTodo className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Задачи на сегодня</p>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div key={task.title} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{task.owner}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground">
                      <Clock3 className="h-3 w-3" />
                      {task.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[0.9fr_1.1fr_1fr]">
          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">Последние события</p>
            </div>
            <ul className="space-y-3">
              {events.map((event) => (
                <li key={`${event.who}-${event.when}`} className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-sm">
                    <span className="font-medium">{event.who}</span>{" "}
                    <span className="text-muted-foreground">{event.what}</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{event.when}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <p className="text-sm font-semibold">Финансовые риски</p>
            </div>
            <div className="space-y-3">
              {risks.map((risk) => (
                <RiskCard key={risk.title} title={risk.title} sub={risk.sub} tone={risk.tone} />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">AI-рекомендации</p>
            </div>
            <div className="space-y-3">
              {recommendations.map((item) => (
                <RecommendationCard
                  key={item.title}
                  title={item.title}
                  text={item.text}
                  action={item.action}
                  accent={item.accent}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}

function RiskCard({
  title,
  sub,
  tone,
}: {
  title: string;
  sub: string;
  tone: "warning" | "info" | "success";
}) {
  const toneClass =
    tone === "warning"
      ? "bg-warning/10 text-warning"
      : tone === "success"
        ? "bg-success/10 text-success"
        : "bg-info/10 text-info";

  const Icon = tone === "success" ? CheckCircle2 : AlertTriangle;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${toneClass}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{sub}</p>
      </div>
    </div>
  );
}

function RecommendationCard({
  title,
  text,
  action,
  accent,
}: {
  title: string;
  text: string;
  action: string;
  accent: "primary" | "info" | "warning" | "success";
}) {
  const accentClass =
    accent === "primary"
      ? "border-primary/20 bg-primary/10"
      : accent === "info"
        ? "border-info/20 bg-info/10"
        : accent === "success"
          ? "border-success/20 bg-success/10"
          : "border-warning/20 bg-warning/10";

  return (
    <div className={`rounded-xl border p-4 ${accentClass}`}>
      <p className="text-sm font-medium">{title}</p>
      <p className="mt-2 text-xs leading-relaxed text-foreground/80">{text}</p>
      <button className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-accent">
        {action}
        <MoveRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function SparkChart() {
  const points = [22, 26, 29, 34, 33, 39, 42, 47, 45, 51, 56, 60, 59, 64, 68, 73, 71, 78, 82, 87, 85, 91, 95, 101];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const width = 640;
  const height = 180;
  const pad = 8;
  const stepX = (width - pad * 2) / (points.length - 1);
  const normalize = (value: number) => height - pad - ((value - min) / (max - min)) * (height - pad * 2);
  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${pad + index * stepX} ${normalize(point)}`)
    .join(" ");
  const area = `${path} L ${pad + (points.length - 1) * stepX} ${height - pad} L ${pad} ${height - pad} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full">
      <defs>
        <linearGradient id="cockpit-revenue-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.66 0.18 264)" stopOpacity="0.32" />
          <stop offset="100%" stopColor="oklch(0.66 0.18 264)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#cockpit-revenue-fill)" />
      <path d={path} fill="none" stroke="oklch(0.66 0.18 264)" strokeWidth="2.5" />
    </svg>
  );
}
