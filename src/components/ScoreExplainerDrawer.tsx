"use client";

import React from "react";
import { Form470Opportunity } from "@/data/form470Data";
import { EvaluatedScore } from "@/lib/scoringEngine";
import {
  X,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface ScoreExplainerDrawerProps {
  opportunity: Form470Opportunity | null;
  score: EvaluatedScore | null;
  isOpen: boolean;
  onClose: () => void;
  onRunAiAnalysis?: (opp: Form470Opportunity) => void;
}

export const ScoreExplainerDrawer: React.FC<ScoreExplainerDrawerProps> = ({
  opportunity,
  score,
  isOpen,
  onClose,
  onRunAiAnalysis,
}) => {
  if (!isOpen || !opportunity || !score) return null;

  const { breakdown, whySummary, keyStrengths, riskFactors, recommendation } = score;

  const getTierBadge = () => {
    switch (score.statusColor) {
      case "emerald":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      case "blue":
        return "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800";
      case "amber":
        return "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getTierBadge()}`}>
                {score.matchTier} ({score.totalScore}/100)
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                BEN #{opportunity.ben}
              </span>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                Filing #{opportunity.applicationNumber}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
              {opportunity.billedEntityName}
            </h2>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>{opportunity.city}, {opportunity.state}</span>
              <span>•</span>
              <span>{opportunity.categoryOfService}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close score drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Defensibility Hook Box: The WHY Explanation */}
          <div className="p-4 rounded-xl border-2 border-indigo-500/20 bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/30 dark:from-indigo-950/40 dark:via-slate-900 dark:to-indigo-950/20 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
                  Transparent Scoring Breakdown: Why It Scored {score.totalScore}/100
                </span>
              </div>
              <div className="text-xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                {score.totalScore}<span className="text-xs font-normal opacity-70">/100</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">
              {whySummary}
            </p>

            <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-xs">
              <span className="font-bold text-indigo-900 dark:text-indigo-300">
                Pursuit Recommendation:
              </span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                {recommendation}
              </span>
            </div>
          </div>

          {/* Granular Mathematical Point Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-2">
              <Award className="h-4 w-4 text-slate-400" />
              <span>Configurable Mathematical Weight Breakdown</span>
            </h3>

            <div className="space-y-2.5">
              {breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-text-primary)]">
                      {item.criterion} (Weight: {item.weight}%)
                    </span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {item.pointsAwarded} / {item.weight} pts
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all"
                      style={{
                        width: `${item.weight > 0 ? (item.pointsAwarded / item.weight) * 100 : 0}%`,
                      }}
                    />
                  </div>

                  <p className="text-xs text-[var(--color-text-muted)]">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Strengths & Risk Factors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Strategic Strengths</span>
              </span>
              <ul className="space-y-1 text-xs text-[var(--color-text-secondary)]">
                {keyStrengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                <span>Pursuit Risks / Caveats</span>
              </span>
              <ul className="space-y-1 text-xs text-[var(--color-text-secondary)]">
                {riskFactors.map((risk, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Extracted RFP Specifications */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-400" />
              <span>Extracted RFP Specifications & Scope Details</span>
            </h3>

            <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[var(--color-text-muted)] font-medium">OEM Hardware Target:</span>
                  <div className="font-bold text-[var(--color-text-primary)] mt-0.5">
                    {opportunity.preferredOem.join(", ") || "Open / Equivalent"}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] font-medium">Estimated Budget:</span>
                  <div className="font-bold font-mono text-[var(--color-text-primary)] mt-0.5">
                    ${opportunity.estimatedBudget.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] font-medium">Contract Vehicle:</span>
                  <div className="font-bold text-[var(--color-text-primary)] mt-0.5">
                    {opportunity.specDetails.procurementVehicle}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] font-medium">Mandatory Walkthrough:</span>
                  <div className="font-bold text-[var(--color-text-primary)] mt-0.5">
                    {opportunity.specDetails.mandatoryWalkthrough ? "Required by District" : "None / Optional"}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] font-medium">Bid Cutoff (ACD):</span>
                  <div className="font-bold font-mono text-rose-600 dark:text-rose-400 mt-0.5">
                    {opportunity.allowableContractDate}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] font-medium">Funding Year:</span>
                  <div className="font-bold font-mono text-[var(--color-text-primary)] mt-0.5">
                    FY {opportunity.specDetails.fundingYear}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--color-border)]">
                <span className="text-xs text-[var(--color-text-muted)] font-medium">Executive Summary:</span>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1 bg-[var(--color-panel-subtle)] p-2 rounded-md leading-relaxed">
                  {opportunity.executiveSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Traceable Public Source Link */}
          <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-[var(--color-text-primary)]">
                USAC Open Data Traceability
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-mono">
                {opportunity.rfpDocumentName} ({opportunity.rfpPageCount} pages)
              </div>
            </div>
            <a
              href={opportunity.rfpDocumentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Source</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors whitespace-nowrap shrink-0"
          >
            Close Sheet
          </button>

          {onRunAiAnalysis && (
            <button
              onClick={() => onRunAiAnalysis(opportunity)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Deep AI Spec Extraction</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
