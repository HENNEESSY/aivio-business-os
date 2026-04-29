import { createFileRoute } from "@tanstack/react-router";
import { AppLayout, PageHeader } from "@/components/AppLayout";
import {
  siStripe,
  siGmail,
  siHubspot,
  siNotion,
  siLinear,
  siZapier,
  siQuickbooks,
  siGoogledrive,
  siCalendly,
  siZoom,
  type SimpleIcon,
} from "simple-icons";

// Slack and Salesforce are excluded from simple-icons due to brand policies —
// inline minimal brand marks here.
const siSlack: SimpleIcon = {
  title: "Slack",
  slug: "slack",
  hex: "4A154B",
  source: "",
  svg: "",
  path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z",
  guidelines: undefined,
  license: undefined,
};
const siSalesforce: SimpleIcon = {
  title: "Salesforce",
  slug: "salesforce",
  hex: "00A1E0",
  source: "",
  svg: "",
  path: "M10.006 5.415a4.195 4.195 0 0 1 3.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22 0 2.879-2.31 5.22-5.159 5.22a4.93 4.93 0 0 1-1.005-.105 3.78 3.78 0 0 1-3.3 1.949c-.51 0-1.05-.121-1.529-.331-.66 1.531-2.205 2.611-3.99 2.611-1.86 0-3.45-1.17-4.08-2.79-.27.061-.557.075-.84.075-2.16 0-3.93-1.755-3.93-3.945 0-1.485.81-2.76 1.995-3.435a4.5 4.5 0 0 1-.375-1.8c0-2.49 2.04-4.5 4.547-4.5 1.486 0 2.806.705 3.616 1.8",
  guidelines: undefined,
  license: undefined,
};

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
