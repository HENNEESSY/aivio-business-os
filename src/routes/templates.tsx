import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Шаблоны — Aivio" },
      {
        name: "description",
        content:
          "Готовые отраслевые шаблоны Aivio для запуска воронок, AI-сценариев и автоматизаций.",
      },
    ],
  }),
  component: TemplatesPage,
});

const templates = [
  {
    name: "Услуги",
    desc: "Воронка для заявок с сайта, Telegram и WhatsApp с быстрым распределением по менеджерам.",
    stages: ["Новая заявка", "Разбор AI", "Созвон", "КП", "Оплата"],
  },
  {
    name: "Бьюти",
    desc: "Запись клиентов, напоминания о визите, допродажи после услуги и возврат спящих клиентов.",
    stages: ["Запись", "Подтверждение", "Визит", "Повтор", "LTV"],
  },
  {
    name: "Консалтинг",
    desc: "Работа с длинным циклом сделки, коммерческими предложениями и оплатой по этапам.",
    stages: ["Лид", "Бриф", "КП", "Договор", "Счёт"],
  },
  {
    name: "Онлайн-образование",
    desc: "Регистрация на вебинар, AI-догрев после эфира и повторные продажи следующих потоков.",
    stages: ["Регистрация", "Вебинар", "Оффер", "Оплата", "Повтор"],
  },
  {
    name: "Ритейл",
    desc: "Связка продаж, остатков, повторных покупок и акций для удержания клиентов.",
    stages: ["Контакт", "Покупка", "Повтор", "Сегмент", "Возврат"],
  },
  {
    name: "Цветочный бизнес",
    desc: "Сценарии предзаказов, доставок, закупок и всплесков спроса в праздничные периоды.",
    stages: ["Заказ", "Сборка", "Доставка", "Повтор", "Праздник"],
  },
];

function TemplatesPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-[1400px] p-6 md:p-8">
        <PageHeader title="Шаблоны" description="Запускайте Aivio с готового отраслевого сценария и адаптируйте под свой бизнес." />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.name}
              className="rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-ring/40"
            >
              <p className="text-sm font-semibold">{template.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{template.desc}</p>

              <div className="mt-4 rounded-lg border border-border bg-surface p-3">
                <div className="flex items-center gap-1">
                  {template.stages.map((stage, index) => (
                    <div key={stage} className="flex flex-1 items-center gap-1">
                      <div className={`h-1.5 flex-1 rounded-full ${index === 0 ? "bg-primary" : "bg-muted-foreground/20"}`} />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                  {template.stages.map((stage) => (
                    <span key={stage} className="truncate" style={{ maxWidth: `${100 / template.stages.length}%` }}>
                      {stage}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-4 w-full rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Использовать шаблон
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
