import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import {
  siSlack,
  siStripe,
  siGmail,
  siHubspot,
  siNotion,
  siLinear,
  siZapier,
  siSalesforce,
  siQuickbooks,
  siGoogledrive,
  siCalendly,
  siZoom,
  type SimpleIcon,
} from "simple-icons";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Интеграции — Aivio" },
      { name: "description", content: "Подключите Aivio к инструментам, которыми уже пользуется ваша команда." },
    ],
  }),
  component: IntegrationsPage,
});

type Integration = {
  name: string;
  desc: string;
  icon: SimpleIcon;
  connected: boolean;
};

const integrations: Integration[] = [
  { name: "Slack", desc: "Командные сообщения", icon: siSlack, connected: true },
  { name: "Stripe", desc: "Платежи и биллинг", icon: siStripe, connected: true },
  { name: "Gmail", desc: "Синхронизация почты", icon: siGmail, connected: true },
  { name: "HubSpot", desc: "Маркетинговая CRM", icon: siHubspot, connected: false },
  { name: "Notion", desc: "Документы и вики", icon: siNotion, connected: false },
  { name: "Linear", desc: "Трекер задач", icon: siLinear, connected: true },
  { name: "Zapier", desc: "Автоматизация процессов", icon: siZapier, connected: false },
  { name: "Salesforce", desc: "Корпоративная CRM", icon: siSalesforce, connected: false },
  { name: "QuickBooks", desc: "Бухгалтерия", icon: siQuickbooks, connected: true },
  { name: "Google Drive", desc: "Хранилище файлов", icon: siGoogledrive, connected: false },
  { name: "Calendly", desc: "Планирование встреч", icon: siCalendly, connected: true },
  { name: "Zoom", desc: "Видеовстречи", icon: siZoom, connected: false },
];

function BrandIcon({ icon }: { icon: SimpleIcon }) {
  return (
    <div
      className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: `#${icon.hex}` }}
    >
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="#ffffff"
        aria-label={icon.title}
      >
        <title>{icon.title}</title>
        <path d={icon.path} />
      </svg>
    </div>
  );
}

function IntegrationsPage() {
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
        <PageHeader
          title="Интеграции"
          description="Подключите свой стек — и Aivio возьмёт рутину на себя."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {integrations.map((i) => (
            <div key={i.name} className="rounded-xl border border-border bg-card p-5 shadow-soft">
              <div className="flex items-center gap-3">
                <BrandIcon icon={i.icon} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{i.name}</p>
                  <p className="text-xs text-muted-foreground">{i.desc}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs ${i.connected ? "text-success" : "text-muted-foreground"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${i.connected ? "bg-success" : "bg-muted-foreground"}`} />
                  {i.connected ? "Подключено" : "Не подключено"}
                </span>
                <button
                  className={`text-xs font-medium rounded-md px-2.5 py-1 ${
                    i.connected
                      ? "border border-border text-foreground hover:bg-accent"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {i.connected ? "Управлять" : "Подключить"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
