"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  ShieldCheck,
  Activity,
  Sliders,
  Terminal,
  Download,
  AlertTriangle,
  Moon,
  Sun,
  Search,
  Building2,
  Lock,
} from "lucide-react";

interface HeaderProps {
  onOpenCommand: () => void;
  onOpenWeights: () => void;
  onOpenChaos: () => void;
  onOpenRoi: () => void;
  onOpenBlueprints: () => void;
  currentWeightsSum: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommand,
  onOpenWeights,
  onOpenChaos,
  onOpenRoi,
  onOpenBlueprints,
}) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-40 px-0 py-3 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Brand & Workspace Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-xl bg-[#0f2942] dark:bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm border border-slate-700/20">
            <ShieldCheck className="h-5 w-5 text-indigo-400 dark:text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base font-bold text-[var(--color-text-primary)] tracking-tight whitespace-nowrap">
                GovProcure IQ
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0">
                USAC Form 470
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                Live Sync 99.9%
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] truncate mt-0.5">
              <span className="flex items-center gap-1 font-medium truncate">
                <Building2 className="h-3 w-3 shrink-0 text-slate-400" />
                MSP / VAR Technology Partner • Oklahoma HQ
              </span>
              <span className="hidden lg:inline text-slate-300 dark:text-slate-700">•</span>
              <span className="hidden lg:inline-flex items-center gap-1 text-[var(--color-text-muted)] font-mono">
                <Lock className="h-2.5 w-2.5 shrink-0 text-slate-400" />
                Compliance: 100% Public Access
              </span>
            </div>
          </div>
        </div>

        {/* Right: Operational Controls & Action Cluster */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end shrink-0">
          {/* ⌘K Search Pill */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-indigo-400 transition-all shrink-0 whitespace-nowrap"
            title="Open Operational Command Launcher (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="hidden sm:inline font-medium">Quick Find</span>
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-2xs text-slate-500 font-semibold">
              ⌘K
            </kbd>
          </button>

          {/* Scoring Rules Modal Trigger */}
          <button
            onClick={onOpenWeights}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] hover:border-indigo-400 transition-all shrink-0 whitespace-nowrap"
          >
            <Sliders className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>Scoring Rules</span>
          </button>

          {/* Chaos Simulator Trigger */}
          <button
            onClick={onOpenChaos}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 text-xs font-semibold text-amber-800 dark:text-amber-300 hover:bg-amber-100 transition-all shrink-0 whitespace-nowrap"
            title="Simulate API throttling and sub-second failover"
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>Chaos Test</span>
          </button>

          {/* ROI Calculator Trigger */}
          <button
            onClick={onOpenRoi}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-all shrink-0 whitespace-nowrap"
            title="Calculate executive screening hours saved"
          >
            <Activity className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="hidden sm:inline">ROI Audit</span>
          </button>

          {/* Turnkey Blueprints Trigger */}
          <button
            onClick={onOpenBlueprints}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f2942] dark:bg-indigo-600 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-indigo-500 shadow-xs transition-all shrink-0 whitespace-nowrap"
            title="Download n8n, Inngest & SQL blueprints"
          >
            <Download className="h-3.5 w-3.5 shrink-0" />
            <span>Blueprints</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-all shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
