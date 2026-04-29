import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Mail, Phone, Plus, Sparkles, Tag, X } from "lucide-react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Клиенты — Aivio" },
      {
        name: "description",
        content:
          "Клиенты, лиды и сделки с сегментацией по направлениям бизнеса и AI-анализом.",
      },
    ],
  }),
  component: ClientsPage,
});

type Lead = {
  id: string;
  name: string;
  company: string;
  value: string;
  email: string;
  phone: string;
  owner: string;
  segment: string;
  insight: string;
  notes: string;
};

const columns: { id: string; title: string; tone: string; leads: Lead[] }[] = [
  {
    id: "new",
    title: "Новые",
    tone: "bg-info",
    leads: [
      {
        id: "1",
        name: "Анна Мельникова",
        company: "Lime Beauty",
        value: "₽ 84 000",
        email: "anna@lime-beauty.ru",
        phone: "+7 (926) 410-18-24",
        owner: "МЛ",
        segment: "Бьюти",
        insight: "Пришла из Instagram, интерес к комплексному продвижению и AI-записи.",
        notes: "Просит показать сценарий записи клиентов и напоминания о визите.",
      },
      {
        id: "2",
        name: "Егор Селиванов",
        company: "Точка Права",
        value: "₽ 126 000",
        email: "selivanov@tochkaprava.ru",
        phone: "+7 (916) 228-00-17",
        owner: "АМ",
        segment: "Услуги",
        insight: "Нужен единый inbox для сайта, Telegram и WhatsApp.",
        notes: "Сравнивает нас с Bitrix24, важна простота внедрения.",
      },
    ],
  },
  {
    id: "qualified",
    title: "Квалифицированы",
    tone: "bg-secondary",
    leads: [
      {
        id: "3",
        name: "Ирина Кустова",
        company: "Школа ProSkills",
        value: "₽ 214 000",
        email: "ik@proskills.online",
        phone: "+7 (903) 550-21-48",
        owner: "ЕК",
        segment: "Онлайн-образование",
        insight: "Хочет воронку по вебинарам, оплатам и повторным продажам курсов.",
        notes: "AI-сотрудник должен отвечать на типовые вопросы учеников в Telegram.",
      },
      {
        id: "4",
        name: "Кирилл Зотов",
        company: "Retail Lab",
        value: "₽ 168 000",
        email: "ceo@retaillab.ru",
        phone: "+7 (999) 150-60-77",
        owner: "МЛ",
        segment: "Ритейл",
        insight: "Ищет связку продаж, остатков и кассовых сигналов.",
        notes: "Интерес к интеграциям 1C и МойСклад.",
      },
    ],
  },
  {
    id: "proposal",
    title: "Предложение",
    tone: "bg-primary",
    leads: [
      {
        id: "5",
        name: "Наталья Осипова",
        company: "Flora District",
        value: "₽ 248 000",
        email: "owner@floradistrict.ru",
        phone: "+7 (925) 660-10-90",
        owner: "АМ",
        segment: "Цветочный бизнес",
        insight: "Высокая сезонность, нужен AI-контроль заявок и закупок перед праздниками.",
        notes: "Ждёт оффер с автоматизацией повторных заказов и закупок под спрос.",
      },
    ],
  },
  {
    id: "negotiation",
    title: "Переговоры",
    tone: "bg-warning",
    leads: [
      {
        id: "6",
        name: "Виктория Громова",
        company: "Громова Консалт",
        value: "₽ 340 000",
        email: "vg@gromova-consult.ru",
        phone: "+7 (915) 772-48-12",
        owner: "ЕК",
        segment: "Консалтинг",
        insight: "Нужны шаблоны коммерческих предложений и AI-помощник для подготовки встреч.",
        notes: "Финальное согласование с партнёром в пятницу.",
      },
      {
        id: "7",
        name: "Илья Фомин",
        company: "Дом сервиса",
        value: "₽ 152 000",
        email: "if@domservice.ru",
        phone: "+7 (901) 101-24-55",
        owner: "МЛ",
        segment: "Услуги",
        insight: "Хочет меньше ручной работы по заявкам с сайта и в мессенджерах.",
        notes: "Попросил показать интеграцию с Telegram и Google Sheets.",
      },
    ],
  },
  {
    id: "won",
    title: "Активные",
    tone: "bg-success",
    leads: [
      {
        id: "8",
        name: "Светлана Баринова",
        company: "Skin Sense",
        value: "₽ 196 000",
        email: "ceo@skinsense.ru",
        phone: "+7 (985) 444-19-31",
        owner: "АМ",
        segment: "Бьюти",
        insight: "Уже использует Aivio для записи, повторных продаж и контроля загрузки мастеров.",
        notes: "Готова расширить тариф на второй филиал.",
      },
    ],
  },
];

function ClientsPage() {
  const [active, setActive] = useState<Lead | null>(null);

  return (
    <AppLayout>
      <div className="p-6 md:p-8">
        <PageHeader
          title="Клиенты"
          description="Карточки клиентов, сделки и AI-контекст по каждому сегменту бизнеса."
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Новый клиент
            </button>
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {columns.map((column) => (
            <div key={column.id} className="rounded-xl border border-border bg-card/40 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${column.tone}`} />
                  <p className="text-sm font-medium">{column.title}</p>
                  <span className="text-xs text-muted-foreground">{column.leads.length}</span>
                </div>
              </div>
              <div className="space-y-2">
                {column.leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setActive(lead)}
                    className="w-full rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-ring/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{lead.company}</p>
                      </div>
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
                        {lead.segment}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">{lead.value}</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-elevated text-[10px] font-medium text-muted-foreground">
                        {lead.owner}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-xl rounded-xl border border-border bg-popover shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.company}</p>
              </div>
              <button
                onClick={() => setActive(null)}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="grid grid-cols-2 gap-3">
                <InfoTile icon={Mail} label="Email" value={active.email} />
                <InfoTile icon={Phone} label="Телефон" value={active.phone} />
                <InfoTile icon={Building2} label="Компания" value={active.company} />
                <InfoTile icon={Tag} label="Сумма потенциала" value={active.value} />
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="mb-2 flex items-center gap-1.5 text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  <p className="text-xs font-medium uppercase tracking-wide">AI-анализ клиента</p>
                </div>
                <p className="text-sm text-foreground/90">{active.insight}</p>
              </div>

              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Заметки</p>
                <textarea
                  rows={4}
                  defaultValue={active.notes}
                  className="w-full rounded-md border border-border bg-surface p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button
                onClick={() => setActive(null)}
                className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent"
              >
                Закрыть
              </button>
              <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[11px] uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 truncate text-sm">{value}</p>
    </div>
  );
}
