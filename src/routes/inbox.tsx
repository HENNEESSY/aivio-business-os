import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Send, Sparkles, Paperclip, Search } from "lucide-react";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Входящие — Aivio" },
      { name: "description", content: "Единая лента сообщений с AI-контекстом и данными CRM по каждому диалогу." },
    ],
  }),
  component: InboxPage,
});

const conversations = [
  { id: 1, name: "Эмилия Картер", company: "Northwind", preview: "Отлично — можем перенести демо на четверг?", time: "2 мин", unread: true },
  { id: 2, name: "Томас Вега", company: "Cobalt", preview: "Сегодня после обеда пришлю договор с правками.", time: "18 мин", unread: true },
  { id: 3, name: "Анна Ридель", company: "Atlas Group", preview: "Спасибо за коммерческое предложение!", time: "1 ч", unread: false },
  { id: 4, name: "Дэвид Ким", company: "Forge", preview: "Подключите вашего CTO, когда будете готовы.", time: "3 ч", unread: false },
  { id: 5, name: "Прия Шах", company: "Helix Labs", preview: "По цене договорились.", time: "Вчера", unread: false },
];

const thread = [
  { from: "them", text: "Привет, Алексей — хотела уточнить по нашему звонку.", time: "10:24" },
  { from: "me", text: "Привет, Эмилия! Подготовил презентацию, о которой ты просила.", time: "10:27" },
  { from: "them", text: "Отлично — можем перенести демо на четверг?", time: "10:29" },
];

function InboxPage() {
  const [active, setActive] = useState(conversations[0]);
  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        <div className="w-72 shrink-0 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Поиск по сообщениям"
                className="w-full h-8 rounded-md bg-surface border border-border pl-8 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full text-left px-3 py-3 border-b border-border/60 hover:bg-accent/40 transition-colors ${
                  active.id === c.id ? "bg-accent/60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <span className="text-[11px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{c.company}</p>
                <p className={`text-xs truncate mt-1 ${c.unread ? "text-foreground" : "text-muted-foreground"}`}>
                  {c.preview}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-14 border-b border-border px-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{active.name}</p>
              <p className="text-xs text-muted-foreground">{active.company}</p>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6 space-y-4">
            {thread.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "me"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-surface-elevated text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-end gap-2 rounded-lg border border-border bg-surface px-3 py-2">
              <button className="text-muted-foreground hover:text-foreground">
                <Paperclip className="h-4 w-4" />
              </button>
              <textarea
                rows={1}
                placeholder="Напишите сообщение…"
                className="flex-1 bg-transparent resize-none text-sm focus:outline-none placeholder:text-muted-foreground"
              />
              <button className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex w-80 shrink-0 border-l border-border flex-col">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                {active.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.company}</p>
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">AI-резюме</p>
            </div>
            <p className="text-sm text-foreground/90">
              Эмилия вовлечена и готова назначить встречу. Предпочитает четверг во второй половине дня. Высокий интерес — рекомендуем отправить презентацию и ссылку на календарь.
            </p>
            <button className="mt-3 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-accent">
              Составить ответ с AI
            </button>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Данные CRM</p>
            <dl className="space-y-2 text-sm">
              <Row k="Этап" v="Квалифицирован" />
              <Row k="Ответственный" v="Алексей Морозов" />
              <Row k="Сумма сделки" v="₽ 312 000" />
              <Row k="Последний контакт" v="Вчера" />
              <Row k="Источник" v="Входящий — сайт" />
            </dl>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-foreground">{v}</dd>
    </div>
  );
}
