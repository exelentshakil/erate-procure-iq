"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Cpu,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  DollarSign,
  Layers,
  ShieldCheck,
  Send,
  RefreshCw,
  Copy,
  Check,
  Award,
  AlertTriangle,
} from "lucide-react";
import { AiRfpAnalysisResult } from "@/lib/ai";

const SAMPLE_RFPS = [
  {
    id: "okc-fortinet",
    title: "Oklahoma County — Data Center Fortinet FortiGate Cluster",
    entity: "Oklahoma County Board of Commissioners",
    category: "Internal Connections",
    state: "OK",
    text: `REQUEST FOR PROPOSALS: RFP-2025-089-IT
ENTITY: Oklahoma County Board of Commissioners, Oklahoma City, OK
PROJECT TITLE: High-Availability Fortinet Next-Generation Core Firewall Cluster

1. SCOPE OF SERVICES:
Oklahoma County Information Technology Department requests formal proposals for the turnkey acquisition, configuration, and implementation of high-availability core firewall appliances replacing end-of-life Cisco ASA units at the County Data Center (320 Robert S. Kerr Ave, OKC).

2. TECHNICAL SPECIFICATIONS & APPROVED MANUFACTURERS:
- Core Appliance: (2x) Fortinet FortiGate 600F in Active-Passive High-Availability Cluster with 10GbE SFP+ uplinks.
- Security Licenses: 3-Year Unified Threat Protection (UTP) bundle (IPS, Advanced Malware Protection, Application Control, Web Filtering).
- Switching: (4x) FortiSwitch 1048E 48-port 10GbE managed rackmount switches.
- Management: FortiManager Cloud orchestration license for 36 months.
- No substitute manufacturers accepted due to existing county-wide FortiClient EMS fabric.

3. TIMELINE & MANDATORY REQUIREMENTS:
- RFP Release Date: February 10, 2025
- Mandatory Pre-Proposal Site Walk: March 12, 2025 at 10:00 AM CST at OKC Data Center.
- Written Inquiries Deadline: March 18, 2025
- Proposal Submission Deadline: April 2, 2025 at 2:00 PM CST.
- Estimated Project Budget: $245,000 to $275,000 funded via County Technology Infrastructure Capital Fund.
- Permissible Contract Vehicles: Oklahoma OMES Statewide Contract SW1025 or direct sealed competitive bid.
- Vendor must hold active Fortinet Advanced or Expert Partner certification.`,
  },
  {
    id: "tulsa-cisco",
    title: "Tulsa Public Schools — District-Wide Core 10GbE Switch Refresh",
    entity: "Tulsa Public Schools (Independent District 1)",
    category: "Internal Connections",
    state: "OK",
    text: `USAC E-RATE FORM 470 SPECIFICATION
BEN: 139785 | Tulsa Public Schools, Tulsa, OK
Funding Year: 2025-2026 | Service Category: Category 2 (Internal Connections)

PROJECT OVERVIEW:
Tulsa Public Schools is soliciting competitive proposals under FCC Form 470 for network infrastructure equipment across 8 high schools and 12 middle schools.

EQUIPMENT SPECIFICATIONS:
- Primary Manufacturer: Cisco Systems Catalyst 9300 Series (or functional equivalent).
- Quantities:
  * (48) Cisco Catalyst C9300-48P-A (48-port PoE+, Network Advantage)
  * (96) Cisco 10GBASE-SR SFP+ transceiver modules
  * (48) Cisco StackWise-480 stacking kits with 50cm stacking cables
  * (48) Cisco DNA Premier 5-Year Term subscription licenses
- Services: Physical rack installation, VLAN migration, and Cisco Smart Net Total Care 8x5xNBD for 3 years.

E-RATE COMPLIANCE & DEADLINES:
- Form 470 Number: 250019284
- Questions Due: March 14, 2025
- Bid Submission Cutoff: March 28, 2025 at 3:00 PM CST.
- Estimated Budget: $480,000 (80% E-Rate Discount Rate applies).
- Service Provider Identification Number (SPIN) required on all bid documents. Form 473 (SPAC) must be active for FY2025.`,
  },
  {
    id: "austin-aruba",
    title: "Austin ISD — 800-Unit Aruba Wi-Fi 6E Wireless Expansion",
    entity: "Austin Independent School District",
    category: "Internal Connections",
    state: "TX",
    text: `PUBLIC PROCUREMENT SOLICITATION: RFP #25-AISD-004
ENTITY: Austin Independent School District, Austin, TX
PROJECT: Campus Wireless Infrastructure Modernization (Wi-Fi 6E AP-635)

SUMMARY:
Austin ISD requests proposals from qualified technology resellers and systems integrators for the supply and provisioning of Enterprise Wireless Access Points across 22 elementary campuses.

SPECIFICATIONS:
- Wireless APs: (800) Aruba AP-635 Campus AP (Tri-band 2.4/5/6GHz Wi-Fi 6E).
- Mounting Hardware: (800) Aruba AP-MNT-MP10-B individual ceiling rail mounts.
- Cloud Management: (800) Aruba Central Foundation 5-Year Device Tokens.
- Switching Interconnect: (22) Aruba CX 6200F 48G Class 4 PoE 4SFP+ 370W Switches.
- Contract Vehicle: Texas DIR Contract (DIR-TSO-4138) or TIPS USA Purchasing Cooperative.

BUDGET & SUBMISSION:
- Budget Ceiling: $620,000 total funded.
- Bid Due Date: April 10, 2025 by 4:00 PM CDT.
- Prevailing wage rates of Travis County apply to any on-site structured cabling work.`,
  },
];

export const AiSpecAnalyzer: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_RFPS[0]);
  const [customText, setCustomText] = useState(SAMPLE_RFPS[0].text);
  const [entityName, setEntityName] = useState(SAMPLE_RFPS[0].entity);
  const [category, setCategory] = useState(SAMPLE_RFPS[0].category);
  const [state, setState] = useState(SAMPLE_RFPS[0].state);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiRfpAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectSample = (sample: typeof SAMPLE_RFPS[0]) => {
    setSelectedSample(sample);
    setCustomText(sample.text);
    setEntityName(sample.entity);
    setCategory(sample.category);
    setState(sample.state);
    setResult(null);
    setError(null);
  };

  const handleRunAnalysis = async () => {
    if (!customText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/analyze-rfp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rfpText: customText,
          entityName,
          category,
          state,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("AI Analysis error:", err);
      setError(err.message || "Failed to analyze RFP");
    } finally {
      setIsLoading(false);
    }
  };

  const copyJson = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                Dual-Provider AI RFP Spec Extraction Engine
              </h3>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                Live Sub-Second Telemetry
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
              Extracts OEM hardware models, quantities, budgets, mandatory walkthrough dates, and win positioning using native OpenAI GPT-4o-mini with Gemini 2.0 Flash failover.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
              Load Preset RFP:
            </span>
            {SAMPLE_RFPS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 ${
                  selectedSample.id === sample.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                    : "bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                {sample.id === "okc-fortinet" ? "OK County (Fortinet)" : sample.id === "tulsa-cisco" ? "Tulsa Schools (Cisco)" : "Austin ISD (Aruba)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: RFP Input Box */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                  Raw RFP Document / Addenda Text
                </span>
              </div>
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                {customText.length.toLocaleString()} characters
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  Public Entity
                </label>
                <input
                  type="text"
                  value={entityName}
                  onChange={(e) => setEntityName(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  Service Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)]"
                />
              </div>
            </div>

            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={12}
              placeholder="Paste raw RFP text, USAC Form 470 description, or district procurement solicitation here..."
              className="w-full p-3 text-xs font-mono leading-relaxed rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setCustomText("")}
                className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                Clear Text
              </button>

              <button
                onClick={handleRunAnalysis}
                disabled={isLoading || !customText.trim()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-2xs whitespace-nowrap shrink-0"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Parsing Specs...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Run AI Spec Extraction</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Structured AI Spec Output */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs min-h-[460px] flex flex-col justify-between">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-3 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 animate-spin" />
                  <Sparkles className="h-5 w-5 text-indigo-600 absolute inset-0 m-auto" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-bold text-[var(--color-text-primary)]">
                    Analyzing Public RFP Specifications...
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Evaluating OEM preferences, hardware items, budgets & mandatory dates
                  </p>
                </div>
              </div>
            ) : error ? (
              <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs flex items-start gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Extraction Error</div>
                  <div>{error}</div>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {/* Result Header & Telemetry */}
                <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold font-mono bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {result.provider.toUpperCase()} • {result.model}
                      </span>
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        {result.latencyMs}ms
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                        result.pursuitVerdict === "PURSUE"
                          ? "bg-emerald-600 text-white"
                          : result.pursuitVerdict === "CONDITIONAL"
                          ? "bg-amber-500 text-white"
                          : "bg-rose-600 text-white"
                      }`}>
                        Verdict: {result.pursuitVerdict} ({result.confidenceScore}%)
                      </span>
                    </div>
                    <div className="text-xs font-bold text-[var(--color-text-primary)] mt-1 line-clamp-1">
                      {result.summary}
                    </div>
                  </div>

                  <button
                    onClick={copyJson}
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-2 py-1 rounded border border-[var(--color-border)] bg-[var(--color-panel-subtle)]"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? "Copied" : "JSON"}</span>
                  </button>
                </div>

                {/* Core Specs Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">OEM Manufacturers:</span>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {result.extractedOem.join(", ") || "Open / Multiple"}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">Pricing Strategy:</span>
                    <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">
                      {result.recommendedPricingStrategy}
                    </div>
                  </div>
                </div>

                {/* Equipment Requirements */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Extracted Equipment Schedule
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {result.equipmentRequirements.firewall && (
                      <div className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                        <span className="font-semibold text-slate-500">Firewall: </span>
                        <span className="font-bold text-[var(--color-text-primary)]">{result.equipmentRequirements.firewall}</span>
                      </div>
                    )}
                    {result.equipmentRequirements.switches && (
                      <div className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                        <span className="font-semibold text-slate-500">Switches: </span>
                        <span className="font-bold text-[var(--color-text-primary)]">{result.equipmentRequirements.switches}</span>
                      </div>
                    )}
                    {result.equipmentRequirements.accessPoints && (
                      <div className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                        <span className="font-semibold text-slate-500">Access Points: </span>
                        <span className="font-bold text-[var(--color-text-primary)]">{result.equipmentRequirements.accessPoints}</span>
                      </div>
                    )}
                    {result.equipmentRequirements.cabling && (
                      <div className="p-2 rounded border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                        <span className="font-semibold text-slate-500">Cabling: </span>
                        <span className="font-bold text-[var(--color-text-primary)]">{result.equipmentRequirements.cabling}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mandatories & Risks */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Mandatory Terms & Disqualification Risks
                  </span>
                  <div className="space-y-1 text-xs">
                    {result.mandatoryRequirements.slice(0, 2).map((req, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                    {result.disqualificationRisks.slice(0, 1).map((risk, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-amber-700 dark:text-amber-300 font-semibold">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>Risk: {risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Explanation */}
                <div className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30 space-y-1">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                    Defensibility Hook: Why This Opportunity Was Qualified
                  </span>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {result.whyExplanation}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--color-text-primary)]">
                    Ready to Extract RFP Specifications
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)] max-w-sm mt-1">
                    Click "Run AI Spec Extraction" to invoke the live dual-provider LLM pipeline and extract structured parameters.
                  </p>
                </div>
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="font-mono">Model: OpenAI gpt-4o-mini ➔ Gemini Failover</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="h-3 w-3" />
                <span>Zero-Dependency Native Fetch</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
