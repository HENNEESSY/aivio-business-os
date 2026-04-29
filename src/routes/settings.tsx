import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout, PageHeader } from "@/components/AppLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Aivio" },
      { name: "description", content: "Manage your profile, workspace, billing, and integrations." },
    ],
  }),
  component: SettingsPage,
});

const tabs = ["Profile", "Workspace", "Billing", "Notifications", "Security"] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profile");
  return (
    <AppLayout>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <PageHeader title="Settings" description="Manage your account and workspace." />

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

        {tab === "Profile" && (
          <div className="space-y-5">
            <Field label="Full name" defaultValue="Alex Morgan" />
            <Field label="Email" defaultValue="alex@aivio.com" type="email" />
            <Field label="Role" defaultValue="Founder" />
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio</label>
              <textarea
                rows={3}
                defaultValue="Building Aivio — the AI operating system for modern teams."
                className="w-full rounded-md bg-surface border border-border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Cancel</button>
              <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Save changes</button>
            </div>
          </div>
        )}

        {tab === "Workspace" && (
          <div className="space-y-5">
            <Field label="Workspace name" defaultValue="Aivio HQ" />
            <Field label="Workspace URL" defaultValue="aivio.app/hq" />
            <Field label="Default currency" defaultValue="USD" />
          </div>
        )}

        {tab === "Billing" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium">Pro plan</p>
              <p className="text-xs text-muted-foreground mt-1">$49 per user / month • renews May 28, 2026</p>
              <button className="mt-3 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Manage plan</button>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-medium">Payment method</p>
              <p className="text-xs text-muted-foreground mt-1">Visa ending in 4242</p>
            </div>
          </div>
        )}

        {tab === "Notifications" && (
          <div className="space-y-3">
            {["Weekly digest", "New lead alerts", "Invoice reminders", "AI insight summaries"].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
                <p className="text-sm">{n}</p>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-[oklch(0.66_0.18_264)]" />
              </div>
            ))}
          </div>
        )}

        {tab === "Security" && (
          <div className="space-y-5">
            <Field label="Current password" type="password" defaultValue="" />
            <Field label="New password" type="password" defaultValue="" />
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-medium">Two-factor authentication</p>
              <p className="text-xs text-muted-foreground mt-1">Add an extra layer of security to your account.</p>
              <button className="mt-3 rounded-md border border-border px-3 py-1.5 text-sm hover:bg-accent">Enable 2FA</button>
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
