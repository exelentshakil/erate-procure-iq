"use client";

import React, { useState } from "react";
import { ScoringWeights, DEFAULT_SCORING_WEIGHTS } from "@/lib/scoringEngine";
import { Sliders, X, RefreshCw, CheckCircle2, Award, Sparkles } from "lucide-react";

interface ScoringWeightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWeights: ScoringWeights;
  onSaveWeights: (newWeights: ScoringWeights) => void;
}

export const ScoringWeightsModal: React.FC<ScoringWeightsModalProps> = ({
  isOpen,
  onClose,
  currentWeights,
  onSaveWeights,
}) => {
  const [weights, setWeights] = useState<ScoringWeights>({ ...currentWeights });

  if (!isOpen) return null;

  const total =
    weights.categoryWeight +
    weights.oemWeight +
    weights.geoWeight +
    weights.budgetWeight +
    weights.deadlineWeight;

  const handleSliderChange = (key: keyof ScoringWeights, val: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleReset = () => {
    setWeights({ ...DEFAULT_SCORING_WEIGHTS });
  };

  const handleSave = () => {
    onSaveWeights(weights);
    onClose();
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
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                Configurable Opportunity Scoring Model
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Adjust scoring weights (0–100 total) to align with MSP vendor partnerships
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

        {/* Weights Sliders */}
        <div className="space-y-4">
          {/* Category Weight */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Service Category Fit (Cat 2 Internal Connections)
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {weights.categoryWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.categoryWeight}
              onChange={(e) => handleSliderChange("categoryWeight", parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* OEM Preference */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Manufacturer / OEM Alignment (Fortinet, Cisco, Aruba)
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {weights.oemWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={weights.oemWeight}
              onChange={(e) => handleSliderChange("oemWeight", parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Geographic Proximity */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Geographic Proximity to Oklahoma City HQ
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {weights.geoWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              step="5"
              value={weights.geoWeight}
              onChange={(e) => handleSliderChange("geoWeight", parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Budget Scale */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Contract Scale & Target Budget ($100k – $600k)
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {weights.budgetWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={weights.budgetWeight}
              onChange={(e) => handleSliderChange("budgetWeight", parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Runway */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-text-primary)]">
                Submission Runway (&gt;14 days runway)
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {weights.deadlineWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="5"
              value={weights.deadlineWeight}
              onChange={(e) => handleSliderChange("deadlineWeight", parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        {/* Total Weights Indicator */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
            total === 100
              ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
              : "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Cumulative Scoring Weight: {total}%</span>
          </div>
          <span className="font-mono">
            {total === 100 ? "Balanced (100%)" : `${100 - total}% remaining`}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-all"
            >
              Apply & Re-Score Pipeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
