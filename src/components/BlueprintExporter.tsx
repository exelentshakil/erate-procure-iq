"use client";

import React, { useState } from "react";
import {
  Download,
  X,
  Copy,
  Check,
  FileCode,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Database,
  Cpu,
  Sliders,
  Sparkles,
  Server,
} from "lucide-react";

interface BlueprintExporterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintExporter: React.FC<BlueprintExporterProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const modules = [
    {
      id: "MODULE 01",
      name: "USAC SODA API Ingestion & Delta Engine",
      badge: "SODA v2.1 • 2 req/s Throttled",
      status: "OPERATIONAL",
      techStack: "opendata.usac.org • Socrata API • SHA-256 Hashing",
      icon: Database,
      deliverable:
        "Direct machine-readable integration with official FCC Form 470 open records with 2 req/s polite rate throttling, zero scraping circumvention, SHA-256 content deduplication, and immutable source URL traceability.",
      capabilities: ["Automated hourly delta sync", "Zero scraping / IP ban risk", "Deduplicated records", "State change diffing"],
    },
    {
      id: "MODULE 02",
      name: "RFP Document & Addenda Diff Engine",
      badge: "PyMuPDF • OCR Table Extraction",
      status: "ACTIVE PIPELINE",
      techStack: "PyMuPDF / pdfplumber • Layout Analysis • Addenda Tracker",
      icon: FileCode,
      deliverable:
        "Deep document extraction pipeline parsing dense school district RFP tender specifications, isolating itemized bill-of-materials tables, mandatory walkthrough deadlines, and addenda amendments.",
      capabilities: ["Itemized hardware schedules", "Walkthrough deadline isolation", "Addenda modification alerts", "BOM line-item extraction"],
    },
    {
      id: "MODULE 03",
      name: "Dual AI Specification Extraction Layer",
      badge: "Sub-500ms Failover Redundancy",
      status: "OPERATIONAL",
      techStack: "OpenAI gpt-4o-mini (Primary) + Google Gemini 2.0 Flash (Fallback)",
      icon: Cpu,
      deliverable:
        "Zero-SDK native fetch architecture with structured JSON schema validation. Primary OpenAI inference with sub-second failover to Google Gemini 2.0 Flash and offline deterministic rule engine continuity.",
      capabilities: ["Sub-second latency (<400ms)", "Automatic provider failover", "Structured schema validation", "100% offline rule fallback"],
    },
    {
      id: "MODULE 04",
      name: "Configurable Multi-Factor Scoring Engine",
      badge: "Mathematical Weight Lock (0–100)",
      status: "OPERATIONAL",
      techStack: "Category (25%) • OEM Line (25%) • Proximity (20%) • Budget (15%) • Runway (15%)",
      icon: Sliders,
      deliverable:
        "Deterministic, configurable opportunity scoring engine eliminating black-box AI opacity. Evaluates vendor fit, regional proximity, budget scale, and allowable contract date runway with full points auditability.",
      capabilities: ["Explain WHY points drawer", "Real-time weight sliders", "Instant opportunity ranking", "Zero black-box scoring"],
    },
    {
      id: "MODULE 05",
      name: "Multi-Jurisdiction Purchase History Normalizer",
      badge: "Cross-Agency Public Records",
      status: "INDEXED",
      techStack: "Texas DIR • OK OMES SW1025 • TIPS-USA • Socrata SODA",
      icon: Layers,
      deliverable:
        "Cross-jurisdictional intelligence layer normalizing disparate government purchasing portals into unified vendor purchase histories, PO numbers, contract vehicles, and 3-year OEM refresh schedules.",
      capabilities: ["3-year OEM refresh forecasting", "PO number traceability", "Purchasing vehicle matching", "Cross-agency normalization"],
    },
    {
      id: "MODULE 06",
      name: "Hardened Production Cloud Infrastructure",
      badge: "Vercel Fluid Compute • Supabase RLS",
      status: "HARDENED",
      techStack: "Next.js 15 App Router • TypeScript • Supabase PostgreSQL • Health Telemetry",
      icon: Server,
      deliverable:
        "Enterprise-grade deployment with Row-Level Security, automated health monitoring at /api/health, edge-optimized routing, and high-concurrency event handling.",
      capabilities: ["Live health telemetry", "Row-Level Security (RLS)", "Fluid Compute auto-scaling", "Sub-100ms edge response"],
    },
  ];

  const handleCopyArchitecture = () => {
    const text = `# GovProcure IQ — Enterprise Systems Architecture & Specifications
System: E-Rate Form 470 & Multi-Jurisdiction Public Procurement Intelligence Platform
Frontend: Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS v4
Data Pipeline: USAC SODA API (opendata.usac.org) + Texas DIR + Oklahoma OMES Transparency Portals
AI Redundancy: Dual-provider OpenAI gpt-4o-mini with sub-second Google Gemini 2.0 Flash failover
Compliance: 100% public machine-readable records, 2 req/s polite rate throttling, zero CAPTCHA bypass
Database: Supabase PostgreSQL with Row-Level Security (RLS) + Automated Health Telemetry (/api/health)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileCode className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                  Enterprise Systems Architecture &amp; Blueprints
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  SYSTEM SPEC v2.4
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Modular Production Architecture: SODA Ingestion, Dual-Provider AI &amp; Explainable Scoring
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

        {/* Scrollable Modules List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-indigo-300 dark:hover:border-indigo-800 transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-indigo-600 text-white">
                      {m.id}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                        {m.name}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap self-start sm:self-auto">
                    {m.badge}
                  </span>
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  {m.deliverable}
                </p>

                <div className="pt-2 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {m.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                      >
                        <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                        <span>{cap}</span>
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-mono text-[var(--color-text-muted)] truncate">
                    {m.techStack}
                  </span>
                </div>
              </div>
            );
          })}
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
