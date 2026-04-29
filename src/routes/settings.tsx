import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Настройки — Aivio" },
      { name: "description", content: "Управление профилем, рабочим пространством, тарифом и интеграциями." },
    ],
  }),
  component: SettingsPage,
});

const tabs = ["Профиль", "Пространство", "Тариф", "Уведомления", "Безопасность"] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Профиль");
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <PageHeader title="Настройки" description="Управляйте аккаунтом и рабочим пространством." />

        <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-2 text-sm transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Профиль" && (
          <div className="space-y-5">
            <Field label="Полное имя" defaultValue="Алексей Морозов" />
            <Field label="Email" defaultValue="alex@aivio.com" type="email" />
            <Field label="Должность" defaultValue="Основатель" />
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">О себе</label>
              <textarea
                rows={3}
                defaultValue="Создаю Aivio — AI-операционную систему для современных команд."
                className="w-full rounded-md bg-surface border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Отмена</button>
              <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Сохранить</button>
            </div>
          </div>
        )}

        {tab === "Пространство" && (
          <div className="space-y-5">
            <Field label="Название пространства" defaultValue="Aivio HQ" />
            <Field label="URL пространства" defaultValue="aivio.app/hq" />
            <Field label="Валюта по умолчанию" defaultValue="RUB" />
          </div>
        )}

        {tab === "Тариф" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium">Тариф Pro</p>
              <p className="text-xs text-muted-foreground mt-1">₽ 3 600 за пользователя в месяц • продление 28 мая 2026</p>
              <button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Управление тарифом</button>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium">Способ оплаты</p>
              <p className="text-xs text-muted-foreground mt-1">Visa, оканчивается на 4242</p>
            </div>
          </div>
        )}

        {tab === "Уведомления" && (
          <div className="space-y-3">
            {["Еженедельная сводка", "Уведомления о новых лидах", "Напоминания по счетам", "Сводки AI-инсайтов"].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <p className="text-sm">{n}</p>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[oklch(0.66_0.18_264)]" />
              </div>
            ))}
          </div>
        )}

        {tab === "Безопасность" && (
          <div className="space-y-5">
            <Field label="Текущий пароль" type="password" defaultValue="" />
            <Field label="Новый пароль" type="password" defaultValue="" />
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-medium">Двухфакторная аутентификация</p>
              <p className="text-xs text-muted-foreground mt-1">Добавьте ещё один уровень защиты для вашего аккаунта.</p>
              <button className="mt-3 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Включить 2FA</button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full h-9 rounded-md bg-surface border border-border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
