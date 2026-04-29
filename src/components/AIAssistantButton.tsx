import { Sparkles } from "lucide-react";
import { useState } from "react";

export function AIAssistantButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-xl border border-border bg-popover shadow-elevated overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium">Aivio Assistant</p>
          </div>
          <div className="p-4 space-y-3">
            <div className="rounded-md bg-surface-elevated p-3 text-sm text-muted-foreground">
              Hi Alex — I noticed 3 new high-intent leads today. Want me to draft outreach?
            </div>
            <input
              placeholder="Ask anything…"
              className="w-full h-9 rounded-md bg-surface border border-border px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-elevated hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Open AI assistant"
      >
        <Sparkles className="h-5 w-5" />
      </button>
    </>
  );
}
