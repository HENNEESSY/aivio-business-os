import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Send, Sparkles, Paperclip, Search } from "lucide-react";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox — Aivio" },
      { name: "description", content: "Unified messaging with AI context and CRM data on every conversation." },
    ],
  }),
  component: InboxPage,
});

const conversations = [
  { id: 1, name: "Emily Carter", company: "Northwind", preview: "Sounds great — can we move the demo to Thursday?", time: "2m", unread: true },
  { id: 2, name: "Tomás Vega", company: "Cobalt", preview: "Sending over the redlined contract this afternoon.", time: "18m", unread: true },
  { id: 3, name: "Anna Riedel", company: "Atlas Group", preview: "Thanks for the proposal!", time: "1h", unread: false },
  { id: 4, name: "David Kim", company: "Forge", preview: "Loop in your CTO when ready.", time: "3h", unread: false },
  { id: 5, name: "Priya Shah", company: "Helix Labs", preview: "We're aligned on pricing.", time: "Yesterday", unread: false },
];

const thread = [
  { from: "them", text: "Hi Alex — quick follow up on our call.", time: "10:24" },
  { from: "me", text: "Hey Emily, totally — I've put together the deck you asked for.", time: "10:27" },
  { from: "them", text: "Sounds great — can we move the demo to Thursday?", time: "10:29" },
];

function InboxPage() {
  const [active, setActive] = useState(conversations[0]);
  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Conversation list */}
        <div className="w-72 shrink-0 border-r border-border flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search messages"
                className="w-full h-8 rounded-md bg-surface border border-border pl-8 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full text-left px-3 py-3 border-b border-border/60 hover:bg-accent/40 transition-colors ${
                  active.id === c.id ? "bg-accent/60" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <span className="text-[11px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{c.company}</p>
                <p className={`text-xs truncate mt-1 ${c.unread ? "text-foreground" : "text-muted-foreground"}`}>
                  {c.preview}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-14 border-b border-border px-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{active.name}</p>
              <p className="text-xs text-muted-foreground">{active.company}</p>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6 space-y-4">
            {thread.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-md rounded-2xl px-4 py-2.5 text-sm ${
                    m.from === "me"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-surface-elevated text-foreground rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex items-end gap-2 rounded-lg border border-border bg-surface px-3 py-2">
              <button className="text-muted-foreground hover:text-foreground">
                <Paperclip className="h-4 w-4" />
              </button>
              <textarea
                rows={1}
                placeholder="Write a message…"
                className="flex-1 bg-transparent resize-none text-sm focus:outline-none placeholder:text-muted-foreground"
              />
              <button className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="hidden xl:flex w-80 shrink-0 border-l border-border flex-col">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                {active.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.company}</p>
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">AI Summary</p>
            </div>
            <p className="text-sm text-foreground/90">
              Emily is engaged and ready to schedule. She prefers Thursday afternoons. High intent — recommend sending the deck and a calendar link.
            </p>
            <button className="mt-3 w-full rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium hover:bg-accent">
              Draft reply with AI
            </button>
          </div>

          <div className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">CRM Data</p>
            <dl className="space-y-2 text-sm">
              <Row k="Stage" v="Qualified" />
              <Row k="Owner" v="Alex Morgan" />
              <Row k="Deal value" v="$4,200" />
              <Row k="Last contact" v="Yesterday" />
              <Row k="Source" v="Inbound — Website" />
            </dl>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-foreground">{v}</dd>
    </div>
  );
}
