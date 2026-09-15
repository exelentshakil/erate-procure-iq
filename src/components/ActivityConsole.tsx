"use client";

import React, { useState } from "react";
import { Terminal, ShieldCheck, Cpu, RefreshCw, Trash2, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";

export interface ConsoleEvent {
  id: string;
  timestamp: string;
  type: "ingestion" | "ai" | "scoring" | "compliance";
  statusCode: string;
  latencyMs?: number;
  message: string;
}

const INITIAL_EVENTS: ConsoleEvent[] = [
  {
    id: "evt-1",
    timestamp: "08:14:02.112",
    type: "ingestion",
    statusCode: "200 OK",
    latencyMs: 142,
    message: "USAC SODA API polled: 12 active Form 470 opportunities ingested for OK, TX, AR",
  },
  {
    id: "evt-2",
    timestamp: "08:14:02.254",
    type: "scoring",
    statusCode: "200 OK",
    latencyMs: 18,
    message: "Form 470 #250019284 scored 92/100 (Prime Pursuit). Category: 25/25, OEM: 25/25, Geo: 20/20",
  },
  {
    id: "evt-3",
    timestamp: "08:14:02.418",
    type: "ai",
    statusCode: "200 OK",
    latencyMs: 114,
    message: "OpenAI gpt-4o-mini parsed Fortinet hardware specifications (FortiGate 600F, FortiSwitch)",
  },
  {
    id: "evt-4",
    timestamp: "08:14:02.620",
    type: "compliance",
    statusCode: "200 OK",
    latencyMs: 8,
    message: "Rate limit guardrail verified: 2 req/s throttled. Zero CAPTCHA or auth bypass detected",
  },
];

export const ActivityConsole: React.FC = () => {
  const [events, setEvents] = useState<ConsoleEvent[]>(INITIAL_EVENTS);
  const [filter, setFilter] = useState<string>("all");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredEvents = events.filter((e) => {
    if (filter === "all") return true;
    return e.type === filter;
  });

  const handleSimulate = () => {
    const time = new Date().toLocaleTimeString();
    const newEvent: ConsoleEvent = {
      id: `evt-${Date.now()}`,
      timestamp: time,
      type: "scoring",
      statusCode: "200 OK",
      latencyMs: Math.floor(Math.random() * 40) + 15,
      message: `Form 470 #250024810 re-evaluated under updated scoring weights. Score: 88/100 (High Fit).`,
    };
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleClear = () => {
    setEvents([]);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-3 bg-[var(--color-panel-subtle)] border-b border-[var(--color-border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
            Live Telemetry & Ingestion Console
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Connected</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter Chips */}
          <div className="hidden sm:flex items-center gap-1">
            {["all", "ingestion", "ai", "scoring", "compliance"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-2 py-0.5 text-xs font-semibold rounded capitalize transition-all ${
                  filter === t
                    ? "bg-indigo-600 text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />

          <button
            onClick={handleSimulate}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Simulate Event"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleClear}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Clear Console"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      {!isCollapsed && (
        <div className="p-3 bg-slate-950 text-slate-300 font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto">
          {filteredEvents.length === 0 ? (
            <div className="py-4 text-center text-slate-600">Console buffer empty.</div>
          ) : (
            filteredEvents.map((evt) => (
              <div key={evt.id} className="flex items-start gap-2 leading-relaxed">
                <span className="text-slate-500 shrink-0">{evt.timestamp}</span>
                <span className="px-1.5 py-0.2 rounded text-xs font-bold font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
                  {evt.statusCode}
                </span>
                {evt.latencyMs && (
                  <span className="text-indigo-400 shrink-0">
                    {evt.latencyMs}ms
                  </span>
                )}
                <span className="text-slate-400 shrink-0 capitalize">[{evt.type}]</span>
                <span className="text-slate-200 break-all">{evt.message}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
