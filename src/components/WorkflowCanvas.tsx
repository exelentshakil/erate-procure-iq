"use client";

import React, { useState, useEffect } from "react";
import {
  Database,
  FileText,
  Cpu,
  Sliders,
  Send,
  Play,
  CheckCircle2,
  Sparkles,
  RefreshCw,
} from "lucide-react";

interface WorkflowCanvasProps {
  onTriggerSimulation?: () => void;
  onOpenWeightsModal?: () => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  onOpenWeightsModal,
}) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const nodes = [
    {
      id: 1,
      name: "USAC Open Data Ingest",
      sub: "data.usac.org • Socrata API",
      spec: "2 rps throttled • Zero Bypass",
      icon: Database,
      status: "ARMED",
      color: "blue",
    },
    {
      id: 2,
      name: "RFP Doc & Addenda Parser",
      sub: "PDF OCR & Specs Cleanse",
      spec: "PyMuPDF • Table Extraction",
      icon: FileText,
      status: "ARMED",
      color: "indigo",
    },
    {
      id: 3,
      name: "Dual AI Spec Extraction",
      sub: "OpenAI gpt-4o-mini + Gemini",
      spec: "Sub-500ms Fallback • JSON",
      icon: Cpu,
      status: "ARMED",
      color: "purple",
    },
    {
      id: 4,
      name: "Configurable Scoring Engine",
      sub: "Mathematical Weight Lock",
      spec: "OEM, Geo, Budget, Runway",
      icon: Sliders,
      status: "ARMED",
      color: "amber",
    },
    {
      id: 5,
      name: "Qualified Pursuit Queue",
      sub: "Bidding Team Dispatch",
      spec: "Pursue/Pass • Export RFP Pack",
      icon: Send,
      status: "ARMED",
      color: "emerald",
    },
  ];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setCompletedSteps([]);
    setActiveStep(1);

    // Sequence through steps
    const times = [0, 800, 1700, 2600, 3500];
    times.forEach((t, idx) => {
      setTimeout(() => {
        const stepNum = idx + 1;
        setActiveStep(stepNum);
        setCompletedSteps((prev) => [...prev, stepNum]);

        if (stepNum === 5) {
          setTimeout(() => {
            setIsSimulating(false);
            setActiveStep(null);
          }, 1200);
        }
      }, t);
    });
  };

  return (
    <section className="w-full px-0 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--color-border)]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[var(--color-text-primary)] tracking-tight">
                  Automated Procurement Ingestion & Scoring Pipeline
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
                  Active Loop
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                Event-driven architecture: Socrata Open Data ➔ PDF Parser ➔ Dual AI ➔ Explainable Score ➔ Sales Queue
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-2xs transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin shrink-0" />
                    <span>Processing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current shrink-0" />
                    <span>Simulate Full Pipeline</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Node Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {nodes.map((node) => {
              const isCurrent = activeStep === node.id;
              const isDone = completedSteps.includes(node.id);
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  className={`p-3 rounded-xl border transition-all relative flex flex-col justify-between ${
                    isCurrent
                      ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-xs ring-2 ring-indigo-500/20"
                      : isDone
                      ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/10"
                      : "border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {/* Top Bar with Step & State Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-[var(--color-text-muted)]">
                      0{node.id}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap shrink-0 ${
                        isCurrent
                          ? "bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/60 dark:text-indigo-300 animate-pulse"
                          : isDone
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
                      }`}
                    >
                      {isCurrent ? "RUNNING" : isDone ? "VERIFIED" : node.status}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="my-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isDone
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/80 dark:text-emerald-300"
                            : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4 className="text-xs font-bold text-[var(--color-text-primary)] leading-tight">
                        {node.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-snug">
                      {node.sub}
                    </p>
                  </div>

                  {/* Spec Metadata */}
                  <div className="mt-2 pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono truncate">
                    {node.spec}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Micro-Bar */}
          <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-medium text-[var(--color-text-secondary)]">
                Compliance Protocol:
              </span>
              <span>100% Authorized Public Access • Official Socrata API Endpoint • Zero Scraping Hacks</span>
            </div>
            <div className="font-mono text-xs">
              SLA: 2 rps rate-limit • Automated Nightly Delta Pulls
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
