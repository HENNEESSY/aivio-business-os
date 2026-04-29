import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bot,
  BriefcaseBusiness,
  Globe,
  Mail,
  MessageCircle,
  Paperclip,
  Search,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox — Aivio" },
      {
        name: "description",
        content:
          "Communication Layer Aivio: единый контур сообщений, клиентов, сделок и AI-анализа.",
      },
    ],
  }),
  component: InboxPage,
});

type Channel = {
  id: string;
  label: string;
  icon: LucideIcon;
  count: number;
};

type Message = {
  from: "client" | "manager" | "ai";
  text: string;
  time: string;
  meta: {
    client: string;
    deal: string;
    ai: string;
  };
};

type Conversation = {
  id: number;
  client: string;
  company: string;
  channel: string;
  preview: string;
  time: string;
  unread: boolean;
  manager: string;
  deal: string;
  stage: string;
  intent: string;
  budget: string;
  urgency: string;
  summary: string;
  suggestedReply: string;
  messages: Message[];
};

const channels: Channel[] = [
  { id: "telegram", label: "Telegram", icon: Send, count: 18 },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, count: 11 },
  { id: "instagram", label: "Instagram", icon: Sparkles, count: 9 },
  { id: "vk", label: "VK", icon: MessageCircle, count: 4 },
  { id: "email", label: "Email", icon: Mail, count: 7 },
  { id: "site", label: "Сайт", icon: Globe, count: 6 },
];

const conversations: Conversation[] = [
  {
    id: 1,
    client: "Анна Мельникова",
    company: "Lime Beauty",
    channel: "Instagram",
    preview: "Нужно, чтобы после записи AI предлагал допродажу и напоминал о визите.",
    time: "2 мин",
    unread: true,
    manager: "Марина Лаврова",
    deal: "Автоматизация записи и повторных продаж",
    stage: "Переговоры",
    intent: "Высокое",
    budget: "₽ 90 000–120 000",
    urgency: "На этой неделе",
    summary:
      "Клиент уже понимает сценарий внедрения и хочет быстро запустить напоминания, допродажи и загрузку мастеров через AI.",
    suggestedReply:
      "Анна, можем собрать для вас сценарий: запись → напоминание → визит → допродажа после услуги. Сегодня подготовлю короткий план запуска и покажу, как это будет работать в Aivio.",
    messages: [
      {
        from: "client",
        text: "Можно сделать так, чтобы клиенту уходило напоминание перед визитом и потом предложение на следующую услугу?",
        time: "10:24",
        meta: {
          client: "Анна Мельникова",
          deal: "Автоматизация записи и повторных продаж",
          ai: "Высокое намерение",
        },
      },
      {
        from: "manager",
        text: "Да, Aivio отправит напоминание в WhatsApp и после визита сможет запускать допродажу по выбранному сценарию.",
        time: "10:26",
        meta: {
          client: "Анна Мельникова",
          deal: "Автоматизация записи и повторных продаж",
          ai: "Сделка в работе",
        },
      },
      {
        from: "ai",
        text: "AI-анализ: клиент спрашивает про конкретный сценарий автоматизации и сроки запуска. Вероятность сделки высокая, рекомендовано предложить быстрый пилот.",
        time: "10:27",
        meta: {
          client: "Анна Мельникова",
          deal: "Автоматизация записи и повторных продаж",
          ai: "Рекомендация: быстрый пилот",
        },
      },
      {
        from: "client",
        text: "Отлично, тогда мне важно уложиться в запуск уже на этой неделе.",
        time: "10:29",
        meta: {
          client: "Анна Мельникова",
          deal: "Автоматизация записи и повторных продаж",
          ai: "Срочность высокая",
        },
      },
    ],
  },
  {
    id: 2,
    client: "Наталья Осипова",
    company: "Flora District",
    channel: "Telegram",
    preview: "Ищем сценарий предзаказов и повторных заказов перед праздниками.",
    time: "11 мин",
    unread: true,
    manager: "Алексей Морозов",
    deal: "Праздничные сценарии для цветочного бизнеса",
    stage: "Квалификация",
    intent: "Среднее",
    budget: "₽ 140 000",
    urgency: "До конца месяца",
    summary:
      "Клиенту важны сезонные пики, закупки и повторные продажи. Сейчас собирает варианты и сравнивает с ручной работой в мессенджерах.",
    suggestedReply:
      "Наталья, можем показать готовый сценарий для цветочного бизнеса: предзаказ → сборка → доставка → повторный заказ. Если удобно, подготовлю схему именно под ваши пиковые даты.",
    messages: [
      {
        from: "client",
        text: "Нужен сценарий для повторных заказов к праздникам и контроль, чтобы менеджеры не теряли обращения.",
        time: "12:04",
        meta: {
          client: "Наталья Осипова",
          deal: "Праздничные сценарии для цветочного бизнеса",
          ai: "Интерес к автоматизации",
        },
      },
    ],
  },
  {
    id: 3,
    client: "Ирина Кустова",
    company: "Школа ProSkills",
    channel: "WhatsApp",
    preview: "После вебинара нужен AI-догрев тех, кто не оплатил курс.",
    time: "38 мин",
    unread: false,
    manager: "Екатерина Новикова",
    deal: "Догрев после вебинаров",
    stage: "Предложение",
    intent: "Высокое",
    budget: "₽ 210 000",
    urgency: "Перед следующим потоком",
    summary:
      "У клиента уже есть вебинарная воронка, но проседает этап дожима после эфира. Нужны касания, офферы и повторные продажи.",
    suggestedReply:
      "Ирина, для вас подойдёт сценарий: регистрация → вебинар → AI-догрев → оплата → повторная продажа следующего потока. Могу отправить пример структуры и этапов сегодня.",
    messages: [
      {
        from: "client",
        text: "После вебинара хотим автоматически отправлять оффер и догревать тех, кто не оплатил.",
        time: "09:46",
        meta: {
          client: "Ирина Кустова",
          deal: "Догрев после вебинаров",
          ai: "Запрос на конкретный сценарий",
        },
      },
    ],
  },
  {
    id: 4,
    client: "Виктория Громова",
    company: "Громова Консалт",
    channel: "VK",
    preview: "Как AI поможет менеджеру готовить следующий шаг по сделке?",
    time: "1 ч",
    unread: false,
    manager: "Марина Лаврова",
    deal: "AI-помощник для консалтинга",
    stage: "Переговоры",
    intent: "Среднее",
    budget: "₽ 180 000",
    urgency: "В течение 2 недель",
    summary:
      "Клиенту нужен помощник для длинного цикла продаж: предложения, follow-up и следующие действия по зависшим сделкам.",
    suggestedReply:
      "Виктория, AI может собирать краткое резюме диалога, предлагать следующий шаг и готовить черновик сообщения менеджеру. При желании покажу сценарий на вашем процессе.",
    messages: [
      {
        from: "client",
        text: "Как AI может готовить следующий шаг по сделке и не давать менеджеру забывать о клиентах?",
        time: "08:55",
        meta: {
          client: "Виктория Громова",
          deal: "AI-помощник для консалтинга",
          ai: "Намерение среднее",
        },
      },
    ],
  },
  {
    id: 5,
    client: "Илья Фомин",
    company: "Дом сервиса",
    channel: "Сайт",
    preview: "Нужно объединить сообщения с сайта и мессенджеров в одном окне.",
    time: "Вчера",
    unread: false,
    manager: "Алексей Морозов",
    deal: "Единый communication layer",
    stage: "Новый лид",
    intent: "Среднее",
    budget: "₽ 70 000–100 000",
    urgency: "Без срочности",
    summary:
      "Пока клиент изучает базовый слой коммуникаций: единый inbox, карточки клиентов и привязку к сделкам.",
    suggestedReply:
      "Илья, в Aivio сообщения с сайта, Telegram и WhatsApp можно собрать в один слой коммуникаций и сразу связать с клиентом и сделкой. Если хотите, покажу это на примере.",
    messages: [
      {
        from: "client",
        text: "Важно видеть все обращения с сайта и мессенджеров в одном окне.",
        time: "17:14",
        meta: {
          client: "Илья Фомин",
          deal: "Единый communication layer",
          ai: "Первичный интерес",
        },
      },
    ],
  },
];

function InboxPage() {
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [activeId, setActiveId] = useState(conversations[0].id);

  const filteredConversations = useMemo(() => {
    if (selectedChannel === "all") {
      return conversations;
    }
    const channelLabel = channels.find((item) => item.id === selectedChannel)?.label;
    return conversations.filter((item) => item.channel === channelLabel);
  }, [selectedChannel]);

  const activeConversation =
    filteredConversations.find((item) => item.id === activeId) ??
    conversations.find((item) => item.id === activeId) ??
    conversations[0];

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)] min-h-0">
        <aside className="flex w-[21rem] shrink-0 flex-col border-r border-border bg-card/30">
          <div className="border-b border-border px-4 py-4">
            <div className="mb-3">
              <p className="text-sm font-semibold">Communication Layer</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Все сообщения из каналов связаны с клиентом, сделкой и AI-анализом.
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Поиск по диалогам"
                className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>

          <div className="border-b border-border px-3 py-3">
            <div className="flex flex-wrap gap-2">
              <ChannelButton
                active={selectedChannel === "all"}
                label="Все"
                count={conversations.length}
                onClick={() => setSelectedChannel("all")}
              />
              {channels.map((channel) => (
                <ChannelButton
                  key={channel.id}
                  active={selectedChannel === channel.id}
                  label={channel.label}
                  count={channel.count}
                  icon={channel.icon}
                  onClick={() => setSelectedChannel(channel.id)}
                />
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setActiveId(conversation.id)}
                className={`w-full border-b border-border/60 px-4 py-4 text-left transition-colors hover:bg-accent/30 ${
                  activeConversation.id === conversation.id ? "bg-accent/50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{conversation.client}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{conversation.company}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted-foreground">{conversation.time}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
                  <Badge>{conversation.channel}</Badge>
                  <Badge>{conversation.stage}</Badge>
                  {conversation.unread && <Badge tone="primary">Новое</Badge>}
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {conversation.preview}
                </p>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-border px-5 py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{activeConversation.client}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {activeConversation.company} • {activeConversation.channel} • {activeConversation.manager}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <LinkedPill icon={UserRound} label={`Клиент: ${activeConversation.client}`} />
                <LinkedPill icon={BriefcaseBusiness} label={`Сделка: ${activeConversation.stage}`} />
                <LinkedPill icon={Bot} label={`AI: ${activeConversation.intent}`} />
              </div>
            </div>
          </div>

          <div className="border-b border-border bg-surface/60 px-5 py-3">
            <div className="grid gap-3 md:grid-cols-3">
              <ContextCard
                icon={UserRound}
                title="Клиент"
                value={activeConversation.client}
                sub={activeConversation.company}
              />
              <ContextCard
                icon={BriefcaseBusiness}
                title="Сделка"
                value={activeConversation.deal}
                sub={activeConversation.stage}
              />
              <ContextCard
                icon={Sparkles}
                title="AI-анализ"
                value={activeConversation.intent}
                sub={`Бюджет: ${activeConversation.budget}`}
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-auto bg-[radial-gradient(circle_at_top,rgba(79,124,255,0.08),transparent_35%),transparent] p-6">
            {activeConversation.messages.map((message, index) => (
              <div key={index} className={`flex ${message.from === "manager" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-2xl ${message.from === "manager" ? "items-end" : "items-start"} flex flex-col`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm shadow-soft ${
                      message.from === "manager"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : message.from === "ai"
                          ? "rounded-bl-sm border border-primary/20 bg-primary/10 text-foreground"
                          : "rounded-bl-sm bg-surface-elevated text-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                    <MetaChip label={`Клиент: ${message.meta.client}`} />
                    <MetaChip label={`Сделка: ${message.meta.deal}`} />
                    <MetaChip label={`AI: ${message.meta.ai}`} />
                    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground">
                      {message.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-5 py-4">
            <div className="rounded-xl border border-border bg-surface p-3">
              <div className="mb-2 flex flex-wrap gap-2 text-[11px]">
                <MetaChip label={`Клиент: ${activeConversation.client}`} />
                <MetaChip label={`Сделка: ${activeConversation.deal}`} />
                <MetaChip label={`AI-контекст: ${activeConversation.intent}`} />
              </div>
              <div className="flex items-end gap-2">
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  <Paperclip className="h-4 w-4" />
                </button>
                <textarea
                  rows={1}
                  placeholder="Напишите сообщение клиенту…"
                  className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="hidden w-[24rem] shrink-0 flex-col border-l border-border bg-card/20 lg:flex">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">AI-анализ и контекст</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Каждый диалог связан с клиентом, сделкой и следующим действием.
            </p>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-auto p-5">
            <SideSection title="Клиент">
              <KeyValue label="Клиент" value={activeConversation.client} />
              <KeyValue label="Компания" value={activeConversation.company} />
              <KeyValue label="Ответственный" value={activeConversation.manager} />
              <KeyValue label="Канал" value={activeConversation.channel} />
            </SideSection>

            <SideSection title="Сделка">
              <KeyValue label="Сделка" value={activeConversation.deal} />
              <KeyValue label="Стадия" value={activeConversation.stage} />
            </SideSection>

            <SideSection title="AI-оценка">
              <KeyValue label="Намерение клиента" value={activeConversation.intent} />
              <KeyValue label="Бюджет" value={activeConversation.budget} />
              <KeyValue label="Срочность" value={activeConversation.urgency} />
            </SideSection>

            <SideSection title="Краткое резюме">
              <p className="text-sm leading-relaxed text-foreground/90">{activeConversation.summary}</p>
            </SideSection>

            <SideSection title="Предложенный ответ">
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm leading-relaxed text-foreground/95">
                {activeConversation.suggestedReply}
              </div>
            </SideSection>
          </div>

          <div className="border-t border-border p-5">
            <div className="grid gap-2">
              <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Создать сделку
              </button>
              <button className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent">
                Создать задачу
              </button>
              <button className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent">
                Сформировать ответ
              </button>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}

function ChannelButton({
  active,
  label,
  count,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  icon?: LucideIcon;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] transition-colors ${
        active
          ? "border-primary/30 bg-primary/10 text-primary"
          : "border-border bg-surface text-muted-foreground hover:text-foreground"
      }`}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      <span>{label}</span>
      <span className="rounded-full bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground">{count}</span>
    </button>
  );
}

function LinkedPill({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-[11px] text-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </span>
  );
}

function ContextCard({
  icon: Icon,
  title,
  value,
  sub,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[11px] uppercase tracking-[0.18em]">{title}</span>
      </div>
      <p className="mt-2 text-sm font-medium">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function MetaChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground">
      {label}
    </span>
  );
}

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "primary";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 ${
        tone === "primary" ? "bg-primary/10 text-primary" : "bg-surface text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

function SideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-4">
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function KeyValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm text-foreground">{value}</span>
    </div>
  );
}
