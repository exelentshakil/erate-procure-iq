"use client";

import React, { useState } from "react";
import { Download, X, Copy, Check, FileCode, CheckCircle2, Layers, ShieldCheck, Database, Calendar } from "lucide-react";

interface BlueprintExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintExporter: React.FC<BlueprintExporterProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const phases = [
    {
      phase: "Phase 0",
      title: "Interactive Live Working Prototype",
      hours: "0 hrs (Pre-Funded)",
      cost: "$0.00",
      status: "Delivered",
      deliverable: "Fully functional Next.js 15 dual-module application with real USAC Form 470 scoring & public procurement search.",
    },
    {
      phase: "Phase 1",
      title: "USAC SODA API Ingestion & Delta Sync",
      hours: "12 hrs",
      cost: "$480.00",
      status: "Ready to Execute",
      deliverable: "Automated hourly delta sync with opendata.usac.org. Rate-limited at 2 req/s with deduplication and state change detection.",
    },
    {
      phase: "Phase 2",
      title: "PDF Parser & Addenda Diff Engine",
      hours: "14 hrs",
      cost: "$560.00",
      status: "Ready to Execute",
      deliverable: "Turnkey PDF text extraction for school board RFPs, itemized hardware schedules, and addenda modification alerts.",
    },
    {
      phase: "Phase 3",
      title: "Configurable Scoring & Explainable AI",
      hours: "12 hrs",
      cost: "$480.00",
      status: "Ready to Execute",
      deliverable: "Client-facing weight sliders (0–100) with plain-English explanation drawer for why an opportunity scored its rank.",
    },
    {
      phase: "Phase 4",
      title: "Public Purchase History Normalizer",
      hours: "12 hrs",
      cost: "$480.00",
      status: "Ready to Execute",
      deliverable: "Multi-jurisdiction search across OK, TX, and AR entities, building 3-year OEM technology purchase timelines.",
    },
    {
      phase: "Phase 5",
      title: "Hardened Production Deployment & Docs",
      hours: "8 hrs",
      cost: "$320.00",
      status: "Ready to Execute",
      deliverable: "PostgreSQL database with Row-Level Security, Vercel Fluid Compute, automated health alerts, and documentation.",
    },
  ];

  const handleCopyArchitecture = () => {
    const text = `# E-Rate & Public Procurement Intelligence Engine
Architecture: Next.js 15 App Router + TypeScript + Tailwind CSS v4 + Supabase PostgreSQL
Ingestion: USAC SODA API (opendata.usac.org) + Texas DIR + Oklahoma OMES
AI Layer: Dual-provider OpenAI gpt-4o-mini with sub-second Gemini 2.0 Flash failover
Compliance: 100% public data access, 2 req/s polite rate limiting, zero CAPTCHA bypass
Total Implementation Scope: 58 Engineering Hours across 5 turnkey phases.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Production Implementation Blueprints & Milestones
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                58-Hour Turnkey Technical Roadmap strictly aligned to client RFP specifications
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

        {/* Scrollable Phases List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {phases.map((p, idx) => (
            <div
              key={p.phase}
              className={`p-3 rounded-xl border transition-all ${
                idx === 0
                  ? "bg-emerald-50/50 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800/80"
                  : "bg-[var(--color-panel-subtle)] border-[var(--color-border)]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                    idx === 0
                      ? "bg-emerald-600 text-white"
                      : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300"
                  }`}>
                    {p.phase}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-text-primary)]">
                    {p.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  <span className="text-[var(--color-text-muted)]">{p.hours}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{p.cost}</span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {p.deliverable}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
          <button
            onClick={handleCopyArchitecture}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Architecture Copied!" : "Copy Technical Specs"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all whitespace-nowrap shrink-0"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
