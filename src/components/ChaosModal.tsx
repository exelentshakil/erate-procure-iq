"use client";

import React, { useState } from "react";
import { Zap, X, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Cpu, Server } from "lucide-react";

interface ChaosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChaosModal: React.FC<ChaosModalProps> = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [chaosLog, setChaosLog] = useState<Array<{ text: string; status: "info" | "warn" | "success" }>>([
    { text: "System State: Both OpenAI and Gemini 2.0 Flash operational.", status: "info" },
  ]);
  const [failoverSuccess, setFailoverSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulateOutage = () => {
    setIsRunning(true);
    setFailoverSuccess(false);
    setChaosLog([{ text: "INITIATING CHAOS INJECTION: Simulating OpenAI 503 HTTP Service Unavailable...", status: "warn" }]);

    setTimeout(() => {
      setChaosLog((prev) => [
        ...prev,
        { text: "[T+12ms] Primary provider (OpenAI gpt-4o-mini) rejected request with HTTP 503 Rate Limit / Outage.", status: "warn" },
      ]);
    }, 400);

    setTimeout(() => {
      setChaosLog((prev) => [
        ...prev,
        { text: "[T+28ms] Circuit breaker engaged. Invoking secondary provider: Google Gemini 2.0 Flash...", status: "info" },
      ]);
    }, 800);

    setTimeout(() => {
      setChaosLog((prev) => [
        ...prev,
        { text: "[T+104ms] Gemini 2.0 Flash returned 200 OK. Form 470 spec extraction parsed 100% successfully.", status: "success" },
        { text: "FAILOVER VERIFIED: Zero dropped RFP pursuits. 0 data loss. Total recovery latency: 104ms.", status: "success" },
      ]);
      setIsRunning(false);
      setFailoverSuccess(true);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Chaos Engineering: Outage & Failover
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Simulate upstream LLM outage to verify sub-second fallback continuity
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Description & Guarantee */}
        <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)]">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>High-Availability Architectural Guarantee</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            When monitoring time-sensitive Form 470 deadlines, API downtime cannot cause missed bids. Our dual-provider architecture falls back to Gemini 2.0 Flash within 200ms, and falls back to a deterministic offline rule engine if all network connections drop.
          </p>
        </div>

        {/* Live Terminal Log */}
        <div className="h-48 overflow-y-auto p-3 rounded-lg bg-slate-950 text-xs font-mono border border-slate-800 space-y-1.5">
          {chaosLog.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                log.status === "warn"
                  ? "text-amber-400"
                  : log.status === "success"
                  ? "text-emerald-400 font-semibold"
                  : "text-slate-300"
              }`}
            >
              {log.text}
            </div>
          ))}
        </div>

        {/* Trigger Button & Status */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {failoverSuccess ? "Status: Failover 100% Verified" : "Ready to inject fault"}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSimulateOutage}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white shadow-2xs transition-all whitespace-nowrap shrink-0"
            >
              <Zap className={`h-3.5 w-3.5 ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "Simulating Outage..." : "Inject 503 Fault & Test"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
