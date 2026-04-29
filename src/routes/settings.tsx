import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Настройки — Aivio" },
      {
        name: "description",
        content:
          "Профиль, рабочее пространство, тариф, уведомления и безопасность Aivio Business OS.",
      },
    ],
  }),
  component: SettingsPage,
});

const tabs = ["Профиль", "Пространство", "Тариф", "Уведомления", "Безопасность"] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Профиль");

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl p-6 md:p-8">
        <PageHeader title="Настройки" description="Управляйте аккаунтом, пространством и ключевыми параметрами Aivio." />

        <div className="-mb-px mb-6 flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`border-b-2 px-3 py-2 text-sm transition-colors ${
                tab === item
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "Профиль" && (
          <div className="space-y-5">
            <Field label="Полное имя" defaultValue="Алексей Морозов" />
            <Field label="Email" defaultValue="ceo@aivio.ru" type="email" />
            <Field label="Роль" defaultValue="Руководитель" />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">О себе</label>
              <textarea
                rows={3}
                defaultValue="Отвечаю за рост, клиентов и операционную эффективность бизнеса в Aivio."
                className="w-full rounded-md border border-border bg-surface p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Отмена</button>
              <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Сохранить
              </button>
            </div>
          </div>
        )}

        {tab === "Пространство" && (
          <div className="space-y-5">
            <Field label="Название пространства" defaultValue="Aivio • Demo SMB" />
            <Field label="URL пространства" defaultValue="os.aivio.ru/demo-smb" />
            <Field label="Валюта по умолчанию" defaultValue="RUB" />
          </div>
        )}

        {tab === "Тариф" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium">Тариф Pro</p>
              <p className="mt-1 text-xs text-muted-foreground">₽ 3 600 за пользователя в месяц • продление 28 мая 2026</p>
              <button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Управление тарифом
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium">Способ оплаты</p>
              <p className="mt-1 text-xs text-muted-foreground">Безналичный счёт для юрлица • оплата до 5 мая 2026</p>
            </div>
          </div>
        )}

        {tab === "Уведомления" && (
          <div className="space-y-3">
            {[
              "Ежедневная сводка по бизнесу",
              "Уведомления о новых лидах",
              "Напоминания по неоплаченным счетам",
              "AI-сигналы по клиентам и рискам",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <p className="text-sm">{item}</p>
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
              <p className="mt-1 text-xs text-muted-foreground">
                Добавьте ещё один уровень защиты для руководителя и менеджеров.
              </p>
              <button className="mt-3 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">
                Включить 2FA
              </button>
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
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
      />
    </div>
  );
}
