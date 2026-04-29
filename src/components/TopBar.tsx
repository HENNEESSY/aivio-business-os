import { Bell, Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-background/80 backdrop-blur px-4 md:px-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search anything…"
          className="w-full h-9 rounded-md bg-surface border border-border pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-ring/40"
        />
        <kbd className="hidden md:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative h-9 w-9 inline-flex items-center justify-center rounded-md hover:bg-accent transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-xs font-medium text-foreground">Alex Morgan</p>
            <p className="text-[11px] text-muted-foreground">alex@aivio.com</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-semibold text-primary-foreground">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
