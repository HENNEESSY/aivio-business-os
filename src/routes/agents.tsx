import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BarChart3, Bot, CalendarClock, Headphones, MessageSquare, Plus, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "AI-сотрудники — Aivio" },
      {
        name: "description",
        content:
          "Команда AI-сотрудников для квалификации лидов, поддержки, аналитики, финансов и ассистирования руководителю.",
      },
    ],
  }),
  component: AgentsPage,
});

type Employee = {
  id: number;
  name: string;
  desc: string;
  usage: string;
  on: boolean;
  icon: LucideIcon;
};

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "AI-квалификатор",
    desc: "Разбирает входящие заявки, присваивает сегмент и создаёт карточку клиента.",
    usage: "286 / 500 лидов",
    on: true,
    icon: MessageSquare,
  },
  {
    id: 2,
    name: "AI-саппорт",
    desc: "Закрывает типовые вопросы в Telegram, WhatsApp и Instagram до подключения менеджера.",
    usage: "412 / 1 000 диалогов",
    on: true,
    icon: Headphones,
  },
  {
    id: 3,
    name: "AI-аналитик",
    desc: "Собирает сводки по продажам, воронке и повторным покупкам по всем направлениям.",
    usage: "17 / 40 отчётов",
    on: true,
    icon: BarChart3,
  },
  {
    id: 4,
    name: "AI-финансист",
    desc: "Следит за оплатами, кассовыми разрывами и подсвечивает риски по сегментам бизнеса.",
    usage: "29 / 120 сигналов",
    on: true,
    icon: Wallet,
  },
  {
    id: 5,
    name: "AI-ассистент руководителя",
    desc: "Готовит резюме дня, собирает риски и предлагает следующие действия по команде.",
    usage: "9 / 30 обзоров",
    on: false,
    icon: CalendarClock,
  },
  {
    id: 6,
    name: "AI-оркестратор",
    desc: "Запускает автоматизации и координирует связки между inbox, клиентами и финансами.",
    usage: "163 / 300 сценариев",
    on: true,
    icon: Bot,
  },
];

function AgentsPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const toggle = (id: number) =>
    setEmployees((items) => items.map((item) => (item.id === id ? { ...item, on: !item.on } : item)));

  return (
    <AppLayout>
      <div className="mx-auto max-w-[1400px] p-6 md:p-8">
        <PageHeader
          title="AI-сотрудники"
          description="Команда AI, которая берёт на себя входящие, аналитику, напоминания и финконтроль."
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Новый AI-сотрудник
            </button>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee) => (
            <div key={employee.id} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <employee.icon className="h-5 w-5" />
                </div>
                <button
                  onClick={() => toggle(employee.id)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${employee.on ? "bg-primary" : "bg-surface-elevated"}`}
                  aria-label="Переключить AI-сотрудника"
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                      employee.on ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="mt-4 text-sm font-semibold">{employee.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{employee.desc}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className={`inline-flex items-center gap-1.5 text-xs ${employee.on ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${employee.on ? "bg-success" : "bg-muted-foreground"}`} />
                  {employee.on ? "Активен" : "На паузе"}
                </span>
                <span className="text-xs text-muted-foreground">{employee.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
