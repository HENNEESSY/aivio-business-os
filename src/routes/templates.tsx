import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Шаблоны — Aivio" },
      { name: "description", content: "Готовые воронки и сценарии для быстрого старта." },
    ],
  }),
  component: TemplatesPage,
});

const templates = [
  { name: "Воронка продаж SaaS", desc: "5-этапная воронка под B2B SaaS-сделки.", stages: ["Новый", "Квалифицирован", "Демо", "Переговоры", "Выигран"] },
  { name: "Онбординг агентства", desc: "Подключение новых клиентов с трекингом этапов.", stages: ["Заявка", "Кикофф", "Дискавери", "Реализация", "Финал"] },
  { name: "Воронка e-commerce", desc: "Путь клиента от первого визита до повторной покупки.", stages: ["Визит", "Лид", "Корзина", "Клиент", "Повтор"] },
  { name: "Подбор персонала", desc: "От отклика до найма в одном месте.", stages: ["Отклик", "Скрининг", "Интервью", "Оффер", "Нанят"] },
  { name: "Customer Success", desc: "Снижение оттока через health-score.", stages: ["Онбординг", "Адаптация", "Здоров", "В зоне риска", "Ушёл"] },
  { name: "Воронка инвесторов", desc: "Управление раундами инвестиций.", stages: ["Найден", "Встреча", "Due Diligence", "Term sheet", "Закрыт"] },
];

function TemplatesPage() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader title="Шаблоны" description="Стартуйте с готового сценария и адаптируйте под себя." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-card p-5 shadow-soft hover:border-ring/40 transition-colors">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{t.desc}</p>

              <div className="mt-4 rounded-lg bg-surface border border-border p-3">
                <div className="flex items-center gap-1">
                  {t.stages.map((s, i) => (
                    <div key={s} className="flex items-center gap-1 flex-1">
                      <div className={`flex-1 h-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/20"}`} />
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                  {t.stages.map((s) => (
                    <span key={s} className="truncate" style={{ maxWidth: `${100 / t.stages.length}%` }}>{s}</span>
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
