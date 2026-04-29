import { Bell, Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Найти клиента, диалог, сделку или AI-сценарий…"
          className="h-9 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-ring/40 focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
        <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline-flex">
          ⌘K
        </kbd>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-2.5 border-l border-border pl-2">
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-xs font-medium text-foreground">Алексей Морозов</p>
            <p className="text-[11px] text-muted-foreground">ceo@aivio.ru</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-primary-foreground">
            АМ
          </div>
        </div>
      </div>
    </header>
  );
}
