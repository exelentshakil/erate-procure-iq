"use client";

import React from "react";
import {
  CheckCircle2,
  FileSearch,
  HelpCircle,
  History,
  Layers,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface ReviewerTourProps {
  verifiedSteps: { [key: number]: boolean };
  onStepAction: (stepNumber: number) => void;
}

export const ReviewerTour: React.FC<ReviewerTourProps> = ({
  verifiedSteps,
  onStepAction,
}) => {
  const completedCount = Object.values(verifiedSteps).filter(Boolean).length;
  const isFullyVerified = completedCount === 4;

  const steps = [
    {
      num: 1,
      tag: "Form 470 Ingestion",
      title: "Automated Retrieval & Weighted Scoring",
      desc: "Scans USAC open filings and calculates 0-100 fit scores based on your configured OEM, category, and regional rules.",
      actionLabel: "Test Scoring",
      icon: FileSearch,
    },
    {
      num: 2,
      tag: "Explain WHY Hook",
      title: "Transparent Points Breakdown Audit",
      desc: "Solves your core requirement: explains exactly WHY an RFP scored 94/100 (+25 OEM, +20 Geo, +20 Scope) rather than showing a black-box number.",
      actionLabel: "Inspect 94/100 RFP",
      icon: HelpCircle,
    },
    {
      num: 3,
      tag: "Procurement Intel",
      title: "Public Purchase History & OEM Timelines",
      desc: "Search Tulsa Public Schools, Austin ISD, or OK County to see 3-year vendor refresh cycles, PO numbers, and TIPS/DIR vehicles.",
      actionLabel: "Search History",
      icon: History,
    },
    {
      num: 4,
      tag: "Data Ingestion ETL",
      title: "Official Socrata API & Turnkey Blueprints",
      desc: "100% public source compliance. Zero CAPTCHA bypass. Export production n8n workflows, Inngest durable workers, and SQL schemas.",
      actionLabel: "Get Blueprints",
      icon: Layers,
    },
  ];

  return (
    <section className="w-full px-0 py-4 bg-gradient-to-b from-slate-50/80 to-transparent dark:from-slate-900/40 dark:to-transparent border-b border-[var(--color-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Interactive 30-Second Verification Tour
            </h2>
            <span className="text-xs text-[var(--color-text-muted)] hidden md:inline">
              — Verify all 4 primary RFP capabilities
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="w-28 sm:w-36 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shrink-0">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isFullyVerified
                    ? "bg-emerald-500"
                    : "bg-indigo-600 dark:bg-indigo-500"
                }`}
                style={{ width: `${(completedCount / 4) * 100}%` }}
              />
            </div>
            <span
              className={`text-xs font-bold font-mono whitespace-nowrap shrink-0 ${
                isFullyVerified ? "text-emerald-600" : "text-indigo-600 dark:text-indigo-400"
              }`}
            >
              {completedCount}/4 {isFullyVerified ? "Verified!" : "Verified"}
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step) => {
            const isDone = Boolean(verifiedSteps[step.num]);
            const Icon = step.icon;

            return (
              <div
                key={step.num}
                className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isDone
                    ? "bg-emerald-50/40 border-emerald-300 dark:bg-emerald-950/20 dark:border-emerald-800/80 shadow-2xs"
                    : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-indigo-300 dark:hover:border-indigo-800 shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center gap-1 text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      STEP 0{step.num}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                        isDone
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-700"
                          : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                      }`}
                    >
                      {step.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] leading-snug mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                    {step.desc}
                  </p>
                </div>

                <button
                  onClick={() => onStepAction(step.num)}
                  className={`w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isDone
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs"
                      : "bg-[#0f2942] hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-2xs"
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{step.actionLabel} (Re-test)</span>
                    </>
                  ) : (
                    <>
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span>{step.actionLabel}</span>
                      <ArrowRight className="h-3 w-3 shrink-0 ml-0.5" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
