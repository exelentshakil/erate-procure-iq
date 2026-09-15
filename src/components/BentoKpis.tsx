"use client";

import React from "react";
import {
  TrendingUp,
  Target,
  Database,
  Cpu,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

interface BentoKpisProps {
  totalBudget: number;
  qualifiedCount: number;
  publicRecordsCount: number;
  averageScore: number;
  onFilterQualified: () => void;
  onViewHistory: () => void;
}

export const BentoKpis: React.FC<BentoKpisProps> = ({
  totalBudget,
  qualifiedCount,
  publicRecordsCount,
  averageScore,
  onFilterQualified,
  onViewHistory,
}) => {
  return (
    <section className="w-full px-0 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Tile 1: Active Form 470 Pipeline */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
              <span className="font-semibold uppercase tracking-wider">Active 470 Pipeline</span>
              <TrendingUp className="h-4 w-4 text-emerald-600 shrink-0" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)] tracking-tight">
                ${(totalBudget / 1000000).toFixed(1)}M
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>12 Live Form 470s in territory</span>
              </div>
            </div>
          </div>

          {/* Tile 2: High-Priority Pursuit Queue */}
          <div
            onClick={onFilterQualified}
            className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-2xs flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
              <span className="font-semibold uppercase tracking-wider">Qualified Pursuits</span>
              <Target className="h-4 w-4 text-indigo-600 shrink-0 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)] tracking-tight">
                {qualifiedCount}{" "}
                <span className="text-xs font-semibold text-[var(--color-text-muted)]">
                  RFPs (Score ≥ 75)
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                <span>Fortinet & Cisco Targets</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </div>
            </div>
          </div>

          {/* Tile 3: Public Purchase History */}
          <div
            onClick={onViewHistory}
            className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-2xs flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
              <span className="font-semibold uppercase tracking-wider">Purchase Records</span>
              <Database className="h-4 w-4 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)] tracking-tight">
                {publicRecordsCount.toLocaleString()}
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                <span>OK, TX, AR, KS Public Portals</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </div>
            </div>
          </div>

          {/* Tile 4: Average OEM Fit Index */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
              <span className="font-semibold uppercase tracking-wider">Average Match Fit</span>
              <Cpu className="h-4 w-4 text-purple-600 shrink-0" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)] tracking-tight">
                {averageScore}
                <span className="text-sm font-semibold text-[var(--color-text-muted)]">
                  /100
                </span>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium mt-1 truncate">
                Weighted against partner OEM line card
              </div>
            </div>
          </div>

          {/* Tile 5: Ingestion Sync & Compliance */}
          <div className="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] mb-1">
              <span className="font-semibold uppercase tracking-wider">Socrata Ingestion</span>
              <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)] tracking-tight text-emerald-600 dark:text-emerald-400">
                99.9%
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] font-mono mt-1 truncate">
                Throttled: 2 req/s • Zero Bypass
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
