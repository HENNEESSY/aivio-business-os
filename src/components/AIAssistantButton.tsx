import { useState } from "react";
import { Sparkles } from "lucide-react";

export function AIAssistantButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 overflow-hidden rounded-xl border border-border bg-popover shadow-elevated">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">Ассистент Aivio</p>
          </div>
          <div className="space-y-3 p-4">
            <div className="rounded-md bg-surface-elevated p-3 text-sm text-muted-foreground">
              Сегодня AI нашёл 3 горячих лида, 2 неоплаченных счёта и одну точку роста в повторных продажах. Собрать план
              действий?
            </div>
            <input
              placeholder="Спросите про клиентов, деньги или AI-сценарии…"
              className="h-9 w-full rounded-md border border-border bg-surface px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-all hover:scale-105 hover:bg-primary/90"
        aria-label="Открыть AI-ассистента"
      >
        <Sparkles className="h-5 w-5" />
      </button>
    </>
  );
}
