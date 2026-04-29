import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Filter,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/automations")({
  head: () => ({
    meta: [
      { title: "Автоматизации — Aivio" },
      {
        name: "description",
        content:
          "Конструктор автоматизаций Aivio для лидов, менеджеров, сделок и финансового радара.",
      },
    ],
  }),
  component: AutomationsPage,
});

type BuilderOption = {
  title: string;
  description: string;
};

type Automation = {
  id: number;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  status: "Активна" | "Черновик" | "Тест";
  lastRun: string;
  enabled: boolean;
};

const triggerOptions: BuilderOption[] = [
  { title: "Новый лид", description: "Новый контакт из Inbox, сайта или интеграции" },
  { title: "Нет ответа 24 часа", description: "Клиент не ответил на последнее касание" },
  { title: "Горячий клиент", description: "AI оценил намерение к покупке как высокое" },
];

const conditionOptions: BuilderOption[] = [
  { title: "Источник определён", description: "Есть канал и ответственный менеджер" },
  { title: "Сделка без движения", description: "Не было обновлений в карточке 3 дня" },
  { title: "Оплата подтверждена", description: "Платёж успешно получен из системы учёта" },
];

const actionOptions: BuilderOption[] = [
  { title: "Создать сделку", description: "Открыть сделку и привязать контакт" },
  { title: "Уведомить менеджера", description: "Отправить сигнал в рабочий контур" },
  { title: "Обновить финансовый радар", description: "Пересчитать выручку и сигналы" },
];

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: "Новый лид → создать сделку",
    trigger: "Новый лид из Telegram, WhatsApp, Instagram, VK или формы сайта",
    condition: "Контакт ещё не существует и определён источник обращения",
    action: "Создать сделку, назначить ответственного и связать диалог с карточкой клиента",
    status: "Активна",
    lastRun: "Сегодня, 14:12",
    enabled: true,
  },
  {
    id: 2,
    name: "Нет ответа 24 часа → напомнить менеджеру",
    trigger: "После последнего исходящего сообщения прошло 24 часа",
    condition: "Клиент не ответил и сделка всё ещё активна",
    action: "Отправить напоминание менеджеру и показать рекомендованный follow-up от AI",
    status: "Активна",
    lastRun: "Сегодня, 12:40",
    enabled: true,
  },
  {
    id: 3,
    name: "Горячий клиент → уведомить менеджера",
    trigger: "AI зафиксировал высокий интерес по переписке или звонку",
    condition: "Есть бюджет, срочность или запрос на счёт",
    action: "Уведомить менеджера в Inbox и поднять сделку в приоритет",
    status: "Тест",
    lastRun: "Сегодня, 10:18",
    enabled: true,
  },
  {
    id: 4,
    name: "Сделка зависла → предложить следующее действие",
    trigger: "В сделке нет активности более 3 дней",
    condition: "Стадия не менялась и нет запланированного следующего шага",
    action: "Сформировать следующее действие, текст сообщения и задачу менеджеру",
    status: "Активна",
    lastRun: "Вчера, 18:05",
    enabled: true,
  },
  {
    id: 5,
    name: "Получена оплата → обновить финансовый радар",
    trigger: "Подтверждена входящая оплата по счёту",
    condition: "Платёж привязан к клиенту и сделке",
    action: "Обновить финансовый радар, статус сделки и денежные сигналы",
    status: "Черновик",
    lastRun: "Не запускалась",
    enabled: false,
  },
];

const aiHints = [
  "Добавьте автоэскалацию, если горячий клиент не получил ответ за 15 минут.",
  "Для зависших сделок включите AI-подсказку с текстом следующего касания.",
  "После оплаты можно автоматически запускать сценарий допродажи или онбординга.",
];

function AutomationsPage() {
  const [selectedTrigger, setSelectedTrigger] = useState(triggerOptions[0].title);
  const [selectedCondition, setSelectedCondition] = useState(conditionOptions[0].title);
  const [selectedAction, setSelectedAction] = useState(actionOptions[0].title);
  const [automations, setAutomations] = useState(initialAutomations);

  const toggleAutomation = (id: number) => {
    setAutomations((items) =>
      items.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-[1400px] p-6 md:p-8">
        <PageHeader
          title="Автоматизации"
          description="Собирайте сценарии из триггера, условия и действия, а затем запускайте их без ручной рутины."
        />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="border-b border-border px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Конструктор сценария</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Соберите логику по схеме: триггер → условие → действие
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI подсказывает оптимальный сценарий
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <BuilderColumn
                icon={Zap}
                title="Триггер"
                options={triggerOptions}
                selected={selectedTrigger}
                onSelect={setSelectedTrigger}
                accent="from-primary/20 to-primary/5"
              />
              <FlowArrow />
              <BuilderColumn
                icon={Filter}
                title="Условие"
                options={conditionOptions}
                selected={selectedCondition}
                onSelect={setSelectedCondition}
                accent="from-secondary/20 to-secondary/5"
              />
              <FlowArrow />
              <BuilderColumn
                icon={Play}
                title="Действие"
                options={actionOptions}
                selected={selectedAction}
                onSelect={setSelectedAction}
                accent="from-info/20 to-info/5"
              />
            </div>

            <div className="border-t border-border bg-surface/60 px-5 py-4">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Предпросмотр сценария</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <BuilderPreview label={selectedTrigger} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <BuilderPreview label={selectedCondition} />
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <BuilderPreview label={selectedAction} />
                  </div>
                </div>
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Сохранить сценарий
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Подсказки от AI</p>
              </div>
              <ul className="space-y-3 text-sm">
                {aiHints.map((hint) => (
                  <li key={hint} className="flex gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-foreground/90">{hint}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <p className="text-sm font-semibold">Что будет связно автоматически</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5">
                  <span>Inbox</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5">
                  <span>Клиенты и сделки</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5">
                  <span>Финансовый радар</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Примеры автоматизаций</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Готовые сценарии для продаж, контроля отклика и финансовых событий
              </p>
            </div>
            <button className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-accent">
              Создать новую автоматизацию
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {automations.map((automation) => (
              <AutomationCard
                key={automation.id}
                automation={automation}
                onToggle={() => toggleAutomation(automation.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function BuilderColumn({
  icon: Icon,
  title,
  options,
  selected,
  onSelect,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  options: BuilderOption[];
  selected: string;
  onSelect: (value: string) => void;
  accent: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-gradient-to-b ${accent} p-[1px]`}>
      <div className="h-full rounded-[11px] bg-card p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">{title}</p>
            <p className="text-[11px] text-muted-foreground">Выберите логику блока</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {options.map((option) => {
            const active = selected === option.title;
            return (
              <button
                key={option.title}
                onClick={() => onSelect(option.title)}
                className={`w-full rounded-lg border p-3 text-left transition-all ${
                  active
                    ? "border-primary/40 bg-primary/10 shadow-[0_0_0_1px_rgba(79,124,255,0.12)]"
                    : "border-border bg-surface hover:border-ring/40"
                }`}
              >
                <p className="text-sm font-medium">{option.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{option.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center lg:flex">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground">
        <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );
}

function BuilderPreview({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground">
      {label}
    </span>
  );
}

function AutomationCard({
  automation,
  onToggle,
}: {
  automation: Automation;
  onToggle: () => void;
}) {
  const statusClass =
    automation.status === "Активна"
      ? "bg-success/10 text-success"
      : automation.status === "Тест"
        ? "bg-info/10 text-info"
        : "bg-warning/10 text-warning";

  return (
    <div className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-ring/30">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{automation.name}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className={`rounded-full px-2.5 py-1 ${statusClass}`}>{automation.status}</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground">
              <Clock3 className="h-3 w-3" />
              Последний запуск: {automation.lastRun}
            </span>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            automation.enabled ? "bg-primary" : "bg-muted"
          }`}
          aria-label="Переключить автоматизацию"
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
              automation.enabled ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        <AutomationMeta icon={Zap} label="Триггер" value={automation.trigger} />
        <AutomationMeta icon={Filter} label="Условие" value={automation.condition} />
        <AutomationMeta icon={Play} label="Действие" value={automation.action} />
      </div>
    </div>
  );
}

function AutomationMeta({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[11px] uppercase tracking-[0.18em]">{label}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/90">{value}</p>
    </div>
  );
}
