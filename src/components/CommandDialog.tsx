"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  X,
  FileText,
  Building2,
  Cpu,
  Sliders,
  ShieldCheck,
  Zap,
  Download,
  DollarSign,
  Layers,
  ArrowRight,
} from "lucide-react";

interface CommandDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: "form470" | "procurement" | "ai" | "ingestion") => void;
  onOpenWeights: () => void;
  onOpenChaos: () => void;
  onOpenBlueprints: () => void;
  onOpenRoi: () => void;
}

export const CommandDialog: React.FC<CommandDialogProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenWeights,
  onOpenChaos,
  onOpenBlueprints,
  onOpenRoi,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "tab-form470",
      title: "View USAC Form 470 RFP Intelligence",
      category: "Navigation",
      icon: FileText,
      run: () => {
        onSelectTab("form470");
        onClose();
      },
    },
    {
      id: "tab-procurement",
      title: "Explore Public-Sector Purchase History",
      category: "Navigation",
      icon: Building2,
      run: () => {
        onSelectTab("procurement");
        onClose();
      },
    },
    {
      id: "tab-ai",
      title: "Open AI RFP Specification Analyzer",
      category: "Navigation",
      icon: Cpu,
      run: () => {
        onSelectTab("ai");
        onClose();
      },
    },
    {
      id: "tab-ingestion",
      title: "Inspect SODA Ingestion & Compliance",
      category: "Navigation",
      icon: ShieldCheck,
      run: () => {
        onSelectTab("ingestion");
        onClose();
      },
    },
    {
      id: "action-weights",
      title: "Adjust Opportunity Scoring Weights (0–100%)",
      category: "Configuration",
      icon: Sliders,
      run: () => {
        onClose();
        onOpenWeights();
      },
    },
    {
      id: "action-chaos",
      title: "Simulate API Outage & Sub-Second Failover",
      category: "Testing",
      icon: Zap,
      run: () => {
        onClose();
        onOpenChaos();
      },
    },
    {
      id: "action-roi",
      title: "Calculate MSP Pipeline ROI & Time Saved",
      category: "Analytics",
      icon: DollarSign,
      run: () => {
        onClose();
        onOpenRoi();
      },
    },
    {
      id: "action-blueprints",
      title: "Export Architecture Blueprints & Delivery Plan",
      category: "Documentation",
      icon: Download,
      run: () => {
        onClose();
        onOpenBlueprints();
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="relative border-b border-[var(--color-border)] p-3 sm:p-4 flex items-center">
          <Search className="h-5 w-5 text-slate-400 absolute left-4" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search action (e.g. 'Weights', 'AI', 'Procurement')..."
            className="w-full pl-10 pr-10 text-sm bg-transparent text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 absolute right-3"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[var(--color-border)]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--color-text-muted)]">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.run}
                  className="w-full px-3 py-2.5 rounded-lg flex items-center justify-between text-left hover:bg-[var(--color-surface-hover)] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-[var(--color-panel-subtle)] group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/60 text-slate-500 group-hover:text-indigo-600 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-[var(--color-text-primary)]">
                        {item.title}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>Use ⌘K or Ctrl+K anytime</span>
          <span className="font-mono">ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
