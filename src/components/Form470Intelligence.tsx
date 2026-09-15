"use client";

import React, { useState, useMemo } from "react";
import {
  Form470Opportunity,
} from "@/data/form470Data";
import {
  calculateOpportunityScore,
  ScoringWeights,
  EvaluatedScore,
} from "@/lib/scoringEngine";
import {
  Search,
  SlidersHorizontal,
  Calendar,
  DollarSign,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Clock,
  Building,
  Tag,
  ArrowUpDown,
} from "lucide-react";

interface Form470IntelligenceProps {
  opportunities: Form470Opportunity[];
  weights: ScoringWeights;
  onSelectOpportunity: (opp: Form470Opportunity, evalScore: EvaluatedScore) => void;
  onOpenWeightsModal: () => void;
  initialFilter?: string;
}

export const Form470Intelligence: React.FC<Form470IntelligenceProps> = ({
  opportunities,
  weights,
  onSelectOpportunity,
  onOpenWeightsModal,
  initialFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [quickFilter, setQuickFilter] = useState<string>(initialFilter || "ALL");
  const [sortBy, setSortBy] = useState<"score" | "deadline" | "budget" | "date">("score");

  // Pre-calculate evaluated scores for all opportunities with current weights
  const evaluatedOpportunities = useMemo(() => {
    return opportunities.map((opp) => {
      const evalScore = calculateOpportunityScore(opp, weights);
      return {
        ...opp,
        evaluated: evalScore,
      };
    });
  }, [opportunities, weights]);

  // Filter and sort
  const filteredOpportunities = useMemo(() => {
    return evaluatedOpportunities.filter((item) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.billedEntityName.toLowerCase().includes(q);
        const matchesBen = item.ben.includes(q);
        const matchesApp = item.applicationNumber.includes(q);
        const matchesCity = item.city.toLowerCase().includes(q);
        const matchesOem = item.preferredOem.some((o) => o.toLowerCase().includes(q));
        const matchesServices = item.servicesRequested.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesBen && !matchesApp && !matchesCity && !matchesOem && !matchesServices) {
          return false;
        }
      }

      // State
      if (selectedState !== "ALL" && item.state !== selectedState) {
        return false;
      }

      // Category
      if (selectedCategory !== "ALL") {
        if (selectedCategory === "CAT2" && !item.categoryOfService.includes("Category 2")) return false;
        if (selectedCategory === "CAT1" && !item.categoryOfService.includes("Category 1")) return false;
      }

      // Status
      if (selectedStatus !== "ALL" && item.status !== selectedStatus) {
        return false;
      }

      // Quick filters
      if (quickFilter === "FORTINET") {
        if (!item.preferredOem.some((o) => o.toLowerCase().includes("fortinet"))) return false;
      } else if (quickFilter === "CISCO") {
        if (!item.preferredOem.some((o) => o.toLowerCase().includes("cisco") || o.toLowerCase().includes("meraki"))) return false;
      } else if (quickFilter === "OKLAHOMA") {
        if (item.state !== "OK") return false;
      } else if (quickFilter === "TEXAS") {
        if (item.state !== "TX") return false;
      } else if (quickFilter === "QUALIFIED") {
        if (item.evaluated.totalScore < 75) return false;
      } else if (quickFilter === "CLOSING_SOON") {
        const currentDate = new Date("2026-09-15");
        const acd = new Date(item.allowableContractDate);
        const days = (acd.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);
        if (days > 18) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "score") {
        return b.evaluated.totalScore - a.evaluated.totalScore;
      } else if (sortBy === "budget") {
        return b.estimatedBudget - a.estimatedBudget;
      } else if (sortBy === "deadline") {
        return new Date(a.allowableContractDate).getTime() - new Date(b.allowableContractDate).getTime();
      } else {
        return new Date(b.postingDate).getTime() - new Date(a.postingDate).getTime();
      }
    });
  }, [evaluatedOpportunities, searchQuery, selectedState, selectedCategory, selectedStatus, quickFilter, sortBy]);

  return (
    <div className="space-y-4">
      {/* Control Strip */}
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs space-y-3">
        {/* Search & Select Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by District name, BEN ID, Form 470 #, City, or OEM (e.g. Broken Arrow, Fortinet, 139784)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] focus:outline-hidden focus:border-indigo-500 shrink-0"
            >
              <option value="ALL">All States (OK, TX, AR, KS)</option>
              <option value="OK">Oklahoma Only</option>
              <option value="TX">Texas Only</option>
              <option value="AR">Arkansas Only</option>
              <option value="KS">Kansas Only</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] focus:outline-hidden focus:border-indigo-500 shrink-0"
            >
              <option value="ALL">All Categories</option>
              <option value="CAT2">Category 2: Internal Connections</option>
              <option value="CAT1">Category 1: Internet/WAN</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] focus:outline-hidden focus:border-indigo-500 shrink-0"
            >
              <option value="score">Sort: Fit Score (High-Low)</option>
              <option value="deadline">Sort: Bid Deadline (Soonest)</option>
              <option value="budget">Sort: Est. Budget (Highest)</option>
              <option value="date">Sort: Posting Date (Newest)</option>
            </select>

            <button
              onClick={onOpenWeightsModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-all shrink-0 whitespace-nowrap"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Weights</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Chips (Strict Brevity Law ≤16 chars) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider shrink-0 mr-1">
            Quick Filters:
          </span>
          {[
            { id: "ALL", label: `All (${evaluatedOpportunities.length})` },
            { id: "QUALIFIED", label: "Qualified ≥75" },
            { id: "FORTINET", label: "Fortinet Line" },
            { id: "CISCO", label: "Cisco / Meraki" },
            { id: "OKLAHOMA", label: "Oklahoma Hub" },
            { id: "TEXAS", label: "Texas Region" },
            { id: "CLOSING_SOON", label: "Closing <18d" },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setQuickFilter(chip.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
                quickFilter === chip.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] px-1">
        <div>
          Showing <span className="font-bold text-[var(--color-text-primary)]">{filteredOpportunities.length}</span> matching USAC Form 470 opportunities
        </div>
        <div className="text-xs text-[var(--color-text-muted)] font-mono">
          FCC Form 470 Open Data v2.1 • Socrata API Synced
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-fixed w-full min-w-[960px] divide-y divide-[var(--color-border)] text-left">
            <thead className="bg-[var(--color-panel-subtle)] text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              <tr>
                <th className="w-[30%] py-3 px-4">Opportunity & Billed Entity</th>
                <th className="w-[20%] py-3 px-3">Services Requested</th>
                <th className="w-[15%] py-3 px-3">OEM & Infrastructure</th>
                <th className="w-[14%] py-3 px-3">Budget & Vehicle</th>
                <th className="w-[11%] py-3 px-3">Deadline (ACD)</th>
                <th className="w-[10%] py-3 px-3 text-right">Score & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-xs">
              {filteredOpportunities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No Form 470 opportunities match the selected criteria. Try adjusting your filters or search query.
                  </td>
                </tr>
              ) : (
                filteredOpportunities.map((item) => {
                  const evalScore = item.evaluated;
                  const currentDate = new Date("2026-09-15");
                  const acd = new Date(item.allowableContractDate);
                  const daysRemaining = Math.max(0, Math.round((acd.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-[var(--color-surface-hover)] transition-colors group cursor-pointer"
                      onClick={() => onSelectOpportunity(item, evalScore)}
                    >
                      {/* 1. Opportunity & Billed Entity */}
                      <td className="py-3 px-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-sm text-[var(--color-text-primary)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                              {item.billedEntityName}
                            </span>
                            <span className="px-1.5 py-0.2 rounded text-xs font-bold font-mono bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 shrink-0">
                              {item.state}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-mono truncate">
                            <span>Form 470 #{item.applicationNumber}</span>
                            <span>•</span>
                            <span>BEN: {item.ben}</span>
                            <span>•</span>
                            <span>{item.city}, {item.state}</span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Services Requested */}
                      <td className="py-3 px-3">
                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
                            {item.categoryOfService}
                          </div>
                          <div className="flex items-center gap-1 flex-wrap">
                            {item.servicesRequested.slice(0, 2).map((srv, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 truncate max-w-[140px]"
                              >
                                {srv}
                              </span>
                            ))}
                            {item.servicesRequested.length > 2 && (
                              <span className="text-xs text-slate-500 font-mono">
                                +{item.servicesRequested.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 3. Preferred OEM & Infrastructure */}
                      <td className="py-3 px-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 flex-wrap">
                            {item.preferredOem.map((oem, idx) => {
                              const isFortinet = oem.toLowerCase().includes("fortinet");
                              const isCisco = oem.toLowerCase().includes("cisco") || oem.toLowerCase().includes("meraki");
                              return (
                                <span
                                  key={idx}
                                  className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap shrink-0 border ${
                                    isFortinet
                                      ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900"
                                      : isCisco
                                      ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
                                      : "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                                  }`}
                                >
                                  {oem}
                                </span>
                              );
                            })}
                          </div>
                          {item.specDetails.switchesRequested && item.specDetails.switchesRequested > 0 ? (
                            <div className="text-xs text-[var(--color-text-muted)] font-mono">
                              {item.specDetails.switchesRequested}x Switches requested
                            </div>
                          ) : item.specDetails.accessPointsRequested && item.specDetails.accessPointsRequested > 0 ? (
                            <div className="text-xs text-[var(--color-text-muted)] font-mono">
                              {item.specDetails.accessPointsRequested}x Access Points
                            </div>
                          ) : null}
                        </div>
                      </td>

                      {/* 4. Budget & Vehicle */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <div className="text-sm font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                            ${(item.estimatedBudget).toLocaleString()}
                          </div>
                          <div className="text-xs text-[var(--color-text-muted)] truncate" title={item.specDetails.procurementVehicle}>
                            {item.specDetails.procurementVehicle.split("/")[0].trim()}
                          </div>
                        </div>
                      </td>

                      {/* 5. Allowable Contract Date (ACD / Deadline) */}
                      <td className="py-3 px-3">
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-[var(--color-text-primary)] font-mono">
                            {item.allowableContractDate}
                          </div>
                          <div
                            className={`inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap shrink-0 ${
                              daysRemaining <= 14
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            <Clock className="h-3 w-3 shrink-0" />
                            <span>{daysRemaining}d left</span>
                          </div>
                        </div>
                      </td>

                      {/* 6. Match Score & Action */}
                      <td className="py-3 px-3 text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          <div
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold font-mono border whitespace-nowrap shrink-0 shadow-2xs ${
                              evalScore.totalScore >= 88
                                ? "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700"
                                : evalScore.totalScore >= 75
                                ? "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700"
                                : evalScore.totalScore >= 60
                                ? "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700"
                                : "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
                            }`}
                          >
                            <span>{evalScore.totalScore}</span>
                            <span className="text-xs font-normal opacity-70">/100</span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectOpportunity(item, evalScore);
                            }}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 hover:underline whitespace-nowrap shrink-0"
                          >
                            <HelpCircle className="h-3 w-3" />
                            <span>Why Score?</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
