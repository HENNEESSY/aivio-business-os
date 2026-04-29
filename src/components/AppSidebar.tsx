import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  Boxes,
  Inbox,
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Settings,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

const items = [
  { title: "Центр управления", url: "/", icon: LayoutDashboard },
  { title: "Клиенты", url: "/clients", icon: Users },
  { title: "Inbox", url: "/inbox", icon: Inbox },
  { title: "AI-сотрудники", url: "/agents", icon: Bot },
  { title: "Автоматизации", url: "/automations", icon: Workflow },
  { title: "Финансовый радар", url: "/finance", icon: LineChart },
  { title: "Интеграции", url: "/integrations", icon: Boxes },
  { title: "Шаблоны", url: "/templates", icon: LayoutTemplate },
  { title: "Настройки", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-foreground">Aivio</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="px-2 pb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Операционная система бизнеса
        </p>
        {items.map((item) => {
          const active = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-sidebar-accent text-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
              }`}
            >
              <item.icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg bg-surface-elevated p-3">
          <p className="text-xs font-medium text-foreground">Aivio Pro</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            12 дней до следующего AI-отчёта по росту и рискам
          </p>
          <button className="mt-2 w-full rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Открыть обзор
          </button>
        </div>
      </div>
    </aside>
  );
}
