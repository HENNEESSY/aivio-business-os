import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Bot, Mail, MessageSquare, Headphones, FileText, BarChart3, Plus } from "lucide-react";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "AI-агенты — Aivio" },
      { name: "description", content: "Подключайте AI-сотрудников для рассылок, поддержки, продаж и аналитики." },
    ],
  }),
  component: AgentsPage,
});

const initialAgents = [
  { id: 1, name: "Агент рассылок", desc: "Персонализированные холодные письма в большом масштабе.", usage: "1 284 / 5 000 действий", on: true, icon: Mail },
  { id: 2, name: "Агент поддержки", desc: "Автоматически закрывает обращения первого уровня.", usage: "412 / 1 000 диалогов", on: true, icon: Headphones },
  { id: 3, name: "Помощник продаж", desc: "Готовит коммерческие предложения и follow-up за менеджеров.", usage: "98 / 500 задач", on: false, icon: MessageSquare },
  { id: 4, name: "Аналитик", desc: "Формирует еженедельные отчёты по эффективности бизнеса.", usage: "12 / 50 отчётов", on: true, icon: BarChart3 },
  { id: 5, name: "Контент-агент", desc: "Пишет статьи и посты для соцсетей по короткому брифу.", usage: "24 / 100 черновиков", on: false, icon: FileText },
  { id: 6, name: "Агент исследований", desc: "Изучает компании и обогащает профили лидов.", usage: "640 / 2 000 запросов", on: true, icon: Bot },
];

function AgentsPage() {
  const [agents, setAgents] = useState(initialAgents);
  const toggle = (id: number) =>
    setAgents((xs) => xs.map((a) => (a.id === id ? { ...a, on: !a.on } : a)));
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader
          title="AI-агенты"
          description="Ваша команда AI-сотрудников, работающая 24/7."
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Новый агент
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
                  aria-label="Переключить агента"
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
                  {a.on ? "Активен" : "На паузе"}
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
