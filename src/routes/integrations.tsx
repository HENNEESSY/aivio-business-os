import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  CalendarDays,
  Database,
  MessageCircle,
  Network,
  RadioTower,
  Send,
  Sheet,
  Store,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Интеграции — Aivio" },
      {
        name: "description",
        content:
          "Подключите каналы сообщений, учётные системы и AI-инфраструктуру, с которой уже работает бизнес.",
      },
    ],
  }),
  component: IntegrationsPage,
});

type Integration = {
  name: string;
  desc: string;
  icon: LucideIcon;
  connected: boolean;
  accent: string;
};

const integrations: Integration[] = [
  { name: "Telegram", desc: "Входящие диалоги и рассылки", icon: Send, connected: true, accent: "bg-sky-500/15 text-sky-400" },
  { name: "WhatsApp", desc: "Поддержка и напоминания клиентам", icon: MessageCircle, connected: true, accent: "bg-emerald-500/15 text-emerald-400" },
  { name: "Instagram", desc: "Лиды из директ и контент-воронки", icon: RadioTower, connected: true, accent: "bg-pink-500/15 text-pink-400" },
  { name: "VK", desc: "Сообщения и заявки из сообщества", icon: Network, connected: false, accent: "bg-blue-500/15 text-blue-400" },
  { name: "Google Calendar", desc: "Слоты, встречи и расписание команды", icon: CalendarDays, connected: true, accent: "bg-cyan-500/15 text-cyan-400" },
  { name: "Google Sheets", desc: "Отчёты, выгрузки и оперативные таблицы", icon: Sheet, connected: false, accent: "bg-lime-500/15 text-lime-400" },
  { name: "Yandex", desc: "Формы, почта и рекламные источники", icon: MessageCircle, connected: false, accent: "bg-red-500/15 text-red-400" },
  { name: "1C", desc: "Учёт, документы и бухгалтерский контур", icon: Database, connected: true, accent: "bg-amber-500/15 text-amber-400" },
  { name: "МойСклад", desc: "Остатки, закупки и продажи", icon: Store, connected: true, accent: "bg-orange-500/15 text-orange-400" },
  { name: "Bitrix24", desc: "Миграция данных и обмен сделками", icon: Workflow, connected: false, accent: "bg-indigo-500/15 text-indigo-400" },
  { name: "OpenRouter", desc: "Маршрутизация AI-моделей для сотрудников", icon: Bot, connected: true, accent: "bg-violet-500/15 text-violet-400" },
  { name: "n8n", desc: "Сложные сценарии и внешние процессы", icon: Workflow, connected: true, accent: "bg-fuchsia-500/15 text-fuchsia-400" },
  { name: "Make", desc: "Визуальные автоматизации и оркестрация", icon: Workflow, connected: false, accent: "bg-teal-500/15 text-teal-400" },
];

function IntegrationsPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-[1400px] p-6 md:p-8">
        <PageHeader
          title="Интеграции"
          description="Подключите каналы общения, учётные системы и автоматизации, которые уже есть у бизнеса."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${integration.accent}`}>
                  <integration.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">{integration.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs ${
                    integration.connected ? "text-success" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      integration.connected ? "bg-success" : "bg-muted-foreground"
                    }`}
                  />
                  {integration.connected ? "Подключено" : "Не подключено"}
                </span>
                <button
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                    integration.connected
                      ? "border border-border text-foreground hover:bg-accent"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {integration.connected ? "Управлять" : "Подключить"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
