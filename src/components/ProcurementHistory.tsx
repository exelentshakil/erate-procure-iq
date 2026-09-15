"use client";

import React, { useState, useMemo } from "react";
import {
  ProcurementRecord,
  INITIAL_PROCUREMENT_RECORDS,
} from "@/data/procurementRecords";
import {
  Search,
  Building2,
  Calendar,
  DollarSign,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface ProcurementHistoryProps {
  initialOrgSearch?: string;
}

export const ProcurementHistory: React.FC<ProcurementHistoryProps> = ({
  initialOrgSearch = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrgSearch);
  const [selectedState, setSelectedState] = useState<string>("ALL");
  const [selectedOrgType, setSelectedOrgType] = useState<string>("ALL");
  const [selectedOem, setSelectedOem] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");
  const [selectedOrgName, setSelectedOrgName] = useState<string | null>(
    initialOrgSearch || "Tulsa Public Schools (Independent District 1)"
  );

  const records = INITIAL_PROCUREMENT_RECORDS;

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((rec) => {
      // Free text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mOrg = rec.organizationName.toLowerCase().includes(q);
        const mCity = rec.city.toLowerCase().includes(q);
        const mVendor = rec.vendorName.toLowerCase().includes(q);
        const mOem = rec.manufacturerOem.toLowerCase().includes(q);
        const mDesc = rec.purchaseDescription.toLowerCase().includes(q);
        const mPo = rec.poContractNumber.toLowerCase().includes(q);
        const mCat = rec.technologyCategory.toLowerCase().includes(q);
        if (!mOrg && !mCity && !mVendor && !mOem && !mDesc && !mPo && !mCat) {
          return false;
        }
      }

      // State
      if (selectedState !== "ALL" && rec.state !== selectedState) return false;

      // Org Type
      if (selectedOrgType !== "ALL" && rec.organizationType !== selectedOrgType) return false;

      // OEM
      if (selectedOem !== "ALL" && rec.manufacturerOem !== selectedOem) return false;

      // Category
      if (selectedCategory !== "ALL" && rec.technologyCategory !== selectedCategory) return false;

      // Year
      if (selectedYear !== "ALL" && rec.fiscalYear.toString() !== selectedYear) return false;

      return true;
    });
  }, [records, searchQuery, selectedState, selectedOrgType, selectedOem, selectedCategory, selectedYear]);

  // Selected Org Timeline Records
  const orgTimelineRecords = useMemo(() => {
    if (!selectedOrgName) return [];
    return records
      .filter((r) => r.organizationName.toLowerCase() === selectedOrgName.toLowerCase())
      .sort((a, b) => b.fiscalYear - a.fiscalYear);
  }, [records, selectedOrgName]);

  // Quick preset organizations
  const presetOrgs = [
    { name: "Tulsa Public Schools (Independent District 1)", label: "Tulsa Public Schools (OK)", state: "OK" },
    { name: "Austin Independent School District", label: "Austin ISD (TX)", state: "TX" },
    { name: "Oklahoma County Board of Commissioners", label: "Oklahoma County (OK)", state: "OK" },
    { name: "Collin County Community College District", label: "Collin College (TX)", state: "TX" },
    { name: "Broken Arrow Public Schools (District 3)", label: "Broken Arrow Schools (OK)", state: "OK" },
    { name: "Oklahoma City Community College", label: "OCCC (OK)", state: "OK" },
  ];

  return (
    <div className="space-y-4">
      {/* Search and Filters Strip */}
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by public entity (e.g. 'Tulsa Public Schools', 'Austin ISD', 'Oklahoma County')..."
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
              <option value="ALL">All States (OK, TX, AR)</option>
              <option value="OK">Oklahoma</option>
              <option value="TX">Texas</option>
              <option value="AR">Arkansas</option>
            </select>

            {/* Org Type Filter */}
            <select
              value={selectedOrgType}
              onChange={(e) => setSelectedOrgType(e.target.value)}
              className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] focus:outline-hidden focus:border-indigo-500 shrink-0"
            >
              <option value="ALL">All Org Types</option>
              <option value="School District">School Districts (K-12)</option>
              <option value="Community College">Community Colleges</option>
              <option value="Public University">Public Universities</option>
              <option value="County Government">County Government</option>
              <option value="City Municipality">City Municipality</option>
            </select>

            {/* OEM Filter */}
            <select
              value={selectedOem}
              onChange={(e) => setSelectedOem(e.target.value)}
              className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] focus:outline-hidden focus:border-indigo-500 shrink-0"
            >
              <option value="ALL">All Manufacturers</option>
              <option value="Fortinet">Fortinet</option>
              <option value="Cisco">Cisco</option>
              <option value="Aruba / HPE">Aruba / HPE</option>
              <option value="Palo Alto">Palo Alto</option>
            </select>

            {/* Year Filter */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-2.5 py-2 text-xs font-semibold rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] focus:outline-hidden focus:border-indigo-500 shrink-0"
            >
              <option value="ALL">All Fiscal Years</option>
              <option value="2025">FY 2025</option>
              <option value="2024">FY 2024</option>
              <option value="2023">FY 2023</option>
            </select>
          </div>
        </div>

        {/* Preset Org Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider shrink-0 mr-1">
            Fast Target Load:
          </span>
          {presetOrgs.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setSelectedOrgName(preset.name);
                setSearchQuery(preset.name);
              }}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 border ${
                selectedOrgName === preset.name
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                  : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Organization Profile & Technology Purchase Timeline */}
      {selectedOrgName && orgTimelineRecords.length > 0 && (
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50/50 dark:from-indigo-950/20 dark:via-slate-900/60 dark:to-slate-900/40 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-indigo-100 dark:border-indigo-900/50">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                  {selectedOrgName}
                </h3>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                  {orgTimelineRecords[0]?.organizationType}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] font-mono">
                  {orgTimelineRecords[0]?.city}, {orgTimelineRecords[0]?.state}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                Verified Multi-Year Public Purchasing Records & Technology Refresh Timeline
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Tracked Spend
                </div>
                <div className="text-sm font-bold font-mono text-[var(--color-text-primary)]">
                  ${orgTimelineRecords.reduce((acc, r) => acc + r.amountUsd, 0).toLocaleString()}
                </div>
              </div>
              <div className="h-7 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="text-right">
                <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">
                  Incumbents
                </div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 truncate max-w-[150px]">
                  {Array.from(new Set(orgTimelineRecords.map((r) => r.vendorName))).slice(0, 2).join(", ")}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-600" />
              <span>Technology Purchase History Timeline (3-Year OEM Refresh Cycle)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {orgTimelineRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-indigo-400 transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-indigo-600 text-white">
                        FY {rec.fiscalYear}
                      </span>
                      <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                        ${rec.amountUsd.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[var(--color-text-primary)] mb-0.5">
                      {rec.vendorName}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] mb-1.5">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {rec.manufacturerOem}
                      </span>
                      <span>•</span>
                      <span className="truncate">{rec.technologyCategory}</span>
                    </div>

                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed mb-2">
                      {rec.purchaseDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">
                      {rec.contractVehicle}
                    </span>
                    <a
                      href={rec.sourceRecordUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      <span>Public Record</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Normalized Records Table Header */}
      <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] px-1">
        <div>
          Showing <span className="font-bold text-[var(--color-text-primary)]">{filteredRecords.length}</span> normalized procurement records
        </div>
        <div className="text-xs text-[var(--color-text-muted)] font-mono">
          State Transparency Acts • FOIA & Board Minutes Verified
        </div>
      </div>

      {/* Complete Normalized Procurement Table */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-fixed w-full min-w-[960px] divide-y divide-[var(--color-border)] text-left">
            <thead className="bg-[var(--color-panel-subtle)] text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              <tr>
                <th className="w-[26%] py-3 px-4">Public Organization</th>
                <th className="w-[14%] py-3 px-3">Awarded Vendor</th>
                <th className="w-[12%] py-3 px-3">OEM / Category</th>
                <th className="w-[24%] py-3 px-3">Purchase Description</th>
                <th className="w-[12%] py-3 px-3">Amount ($) & PO</th>
                <th className="w-[12%] py-3 px-3 text-right">Source & Trace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-xs">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No procurement records match your search filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedOrgName(rec.organizationName);
                    }}
                  >
                    {/* Organization */}
                    <td className="py-3 px-4">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-[var(--color-text-primary)] hover:text-indigo-600 transition-colors truncate">
                          {rec.organizationName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-mono mt-0.5">
                          <span>{rec.organizationType}</span>
                          <span>•</span>
                          <span>{rec.city}, {rec.state}</span>
                        </div>
                      </div>
                    </td>

                    {/* Vendor */}
                    <td className="py-3 px-3">
                      <div className="font-semibold text-xs text-[var(--color-text-primary)] truncate">
                        {rec.vendorName}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)] font-mono">
                        {rec.contractVehicle}
                      </div>
                    </td>

                    {/* OEM & Category */}
                    <td className="py-3 px-3">
                      <div className="space-y-0.5">
                        <span className="inline-block px-1.5 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800">
                          {rec.manufacturerOem}
                        </span>
                        <div className="text-xs text-[var(--color-text-secondary)] truncate">
                          {rec.technologyCategory}
                        </div>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3 px-3">
                      <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-snug">
                        {rec.purchaseDescription}
                      </p>
                    </td>

                    {/* Amount & PO */}
                    <td className="py-3 px-3">
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                          ${rec.amountUsd.toLocaleString()}
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] font-mono truncate">
                          {rec.poContractNumber}
                        </div>
                      </div>
                    </td>

                    {/* Source & Traceability */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 whitespace-nowrap shrink-0">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                          <span>{rec.verificationBadge}</span>
                        </span>
                        <a
                          href={rec.sourceRecordUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <span>Original Link</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
