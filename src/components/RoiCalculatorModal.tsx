"use client";

import React, { useState } from "react";
import { DollarSign, X, TrendingUp, Clock, Award, ShieldCheck, Sparkles } from "lucide-react";

interface RoiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoiCalculatorModal: React.FC<RoiCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [hoursPerWeek, setHoursPerWeek] = useState(14);
  const [hourlyRate, setHourlyRate] = useState(65);
  const [annualRfpPursuits, setAnnualRfpPursuits] = useState(24);
  const [avgMarginPerWin, setAvgMarginPerWin] = useState(38000);

  if (!isOpen) return null;

  const annualHoursSaved = hoursPerWeek * 50;
  const annualLaborSavings = annualHoursSaved * hourlyRate;
  // Estimated 1 additional high-margin win from early detection runway
  const additionalGrossMargin = avgMarginPerWin * 1.5;
  const totalAnnualValue = annualLaborSavings + additionalGrossMargin;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-5 sm:p-6 space-y-5 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                MSP Procurement Intelligence ROI Model
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Calculate annual labor savings & win rate lift from automated retrieval
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

        {/* Sliders */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Manual USAC / State Portal Search Hours / Week
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {hoursPerWeek} hrs/wk
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="30"
              step="1"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Senior Systems Engineer / Bid Manager Blended Rate
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                ${hourlyRate}/hr
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Big Output Metrics Box */}
        <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/60 via-white to-emerald-50/30 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
              Projected Annual MSP Economic Value
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white font-mono">
              Net Positive
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
            ${Math.round(totalAnnualValue).toLocaleString()}
            <span className="text-xs font-normal text-[var(--color-text-muted)] ml-1">/ year</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-200 dark:border-emerald-900/60 text-xs">
            <div>
              <span className="text-[var(--color-text-muted)] font-medium">Labor Hours Reclaimed:</span>
              <div className="font-bold font-mono text-[var(--color-text-primary)] mt-0.5">
                {annualHoursSaved.toLocaleString()} hrs / yr
              </div>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] font-medium">Direct Payroll Saved:</span>
              <div className="font-bold font-mono text-[var(--color-text-primary)] mt-0.5">
                ${Math.round(annualLaborSavings).toLocaleString()} / yr
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <span className="text-xs text-[var(--color-text-muted)]">
            Based on 50 operational work weeks / year
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all whitespace-nowrap shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
