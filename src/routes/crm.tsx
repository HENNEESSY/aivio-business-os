import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import { Plus, X, Mail, Phone, Building2 } from "lucide-react";

export const Route = createFileRoute("/crm")({
  head: () => ({
    meta: [
      { title: "CRM — Aivio" },
      { name: "description", content: "Визуальная воронка с канбан-доской для управления лидами и сделками." },
    ],
  }),
  component: CRMPage,
});

type Lead = {
  id: string;
  name: string;
  company: string;
  value: string;
  email: string;
  owner: string;
};

const columns: { id: string; title: string; tone: string; leads: Lead[] }[] = [
  {
    id: "new",
    title: "Новые",
    tone: "bg-info",
    leads: [
      { id: "1", name: "Эмилия Картер", company: "Northwind", value: "₽ 312 000", email: "emily@northwind.io", owner: "АМ" },
      { id: "2", name: "Джеймс Парк", company: "Lumen", value: "₽ 134 000", email: "james@lumen.co", owner: "СЧ" },
    ],
  },
  {
    id: "qualified",
    title: "Квалифицированы",
    tone: "bg-secondary",
    leads: [
      { id: "3", name: "Прия Шах", company: "Helix Labs", value: "₽ 624 000", email: "priya@helix.com", owner: "МЛ" },
      { id: "4", name: "Дэвид Ким", company: "Forge", value: "₽ 230 000", email: "david@forge.io", owner: "АМ" },
    ],
  },
  {
    id: "demo",
    title: "Демо",
    tone: "bg-primary",
    leads: [
      { id: "5", name: "Анна Ридель", company: "Atlas Group", value: "₽ 928 000", email: "anna@atlas.com", owner: "СЧ" },
    ],
  },
  {
    id: "negotiation",
    title: "Переговоры",
    tone: "bg-warning",
    leads: [
      { id: "6", name: "Томас Вега", company: "Cobalt", value: "₽ 1 632 000", email: "tomas@cobalt.io", owner: "МЛ" },
      { id: "7", name: "Лила Брукс", company: "Pine & Oak", value: "₽ 502 000", email: "lila@pine.co", owner: "АМ" },
    ],
  },
  {
    id: "won",
    title: "Выиграны",
    tone: "bg-success",
    leads: [
      { id: "8", name: "Оуэн Патель", company: "Vega", value: "₽ 728 000", email: "owen@vega.io", owner: "СЧ" },
    ],
  },
];

function CRMPage() {
  const [active, setActive] = useState<Lead | null>(null);
  return (
    <AppLayout>
      <div className="p-6 md:p-8">
        <PageHeader
          title="CRM"
          description="Отслеживайте каждую сделку на всех этапах воронки."
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Новый лид
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {columns.map((col) => (
            <div key={col.id} className="rounded-xl border border-border bg-card/40 p-3">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-1.5 w-1.5 rounded-full ${col.tone}`} />
                  <p className="text-sm font-medium">{col.title}</p>
                  <span className="text-xs text-muted-foreground">{col.leads.length}</span>
                </div>
              </div>
              <div className="space-y-2">
                {col.leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setActive(lead)}
                    className="w-full text-left rounded-lg border border-border bg-card p-3 hover:border-ring/40 transition-colors"
                  >
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{lead.company}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-medium text-foreground">{lead.value}</span>
                      <span className="h-5 w-5 rounded-full bg-surface-elevated flex items-center justify-center text-[10px] font-medium text-muted-foreground">
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
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-xl border border-border bg-popover shadow-elevated"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.company}</p>
              </div>
              <button onClick={() => setActive(null)} className="h-8 w-8 rounded-md hover:bg-accent flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <InfoTile icon={Mail} label="Email" value={active.email} />
                <InfoTile icon={Phone} label="Телефон" value="+7 (495) 010-22-33" />
                <InfoTile icon={Building2} label="Компания" value={active.company} />
                <InfoTile icon={Mail} label="Сумма сделки" value={active.value} />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Заметки</p>
                <textarea
                  rows={4}
                  defaultValue="Интересуется тарифом Pro, демо запланировано на следующей неделе."
                  className="w-full rounded-md bg-surface border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
              <button onClick={() => setActive(null)} className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
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

function InfoTile({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[11px] uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-1 text-sm truncate">{value}</p>
    </div>
  );
}
