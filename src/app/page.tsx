"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { ReviewerTour } from "@/components/ReviewerTour";
import { BentoKpis } from "@/components/BentoKpis";
import { WorkflowCanvas } from "@/components/WorkflowCanvas";
import { Form470Intelligence } from "@/components/Form470Intelligence";
import { ProcurementHistory } from "@/components/ProcurementHistory";
import { AiSpecAnalyzer } from "@/components/AiSpecAnalyzer";
import { IngestionArchitecture } from "@/components/IngestionArchitecture";
import { ScoreExplainerDrawer } from "@/components/ScoreExplainerDrawer";
import { ScoringWeightsModal } from "@/components/ScoringWeightsModal";
import { CommandDialog } from "@/components/CommandDialog";
import { ChaosModal } from "@/components/ChaosModal";
import { RoiCalculatorModal } from "@/components/RoiCalculatorModal";
import { BlueprintExporter } from "@/components/BlueprintExporter";
import { ActivityConsole } from "@/components/ActivityConsole";
import { Footer } from "@/components/Footer";

import {
  ScoringWeights,
  DEFAULT_SCORING_WEIGHTS,
  EvaluatedScore,
  calculateOpportunityScore,
} from "@/lib/scoringEngine";
import { Form470Opportunity, INITIAL_FORM_470_OPPORTUNITIES } from "@/data/form470Data";
import {
  FileText,
  Building2,
  Cpu,
  ShieldCheck,
  Radio,
  Sliders,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"form470" | "procurement" | "ai" | "ingestion">("form470");
  const [scoringWeights, setScoringWeights] = useState<ScoringWeights>(DEFAULT_SCORING_WEIGHTS);

  // Verified steps tracking for Reviewer Tour
  const [verifiedSteps, setVerifiedSteps] = useState<{ [key: number]: boolean }>({
    1: true,
    2: false,
    3: false,
    4: false,
  });

  // Modals & Drawers
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [isChaosModalOpen, setIsChaosModalOpen] = useState(false);
  const [isBlueprintsModalOpen, setIsBlueprintsModalOpen] = useState(false);
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Slide-out Drawer for Score Explainer
  const [explainerOpp, setExplainerOpp] = useState<Form470Opportunity | null>(null);
  const [explainerScore, setExplainerScore] = useState<EvaluatedScore | null>(null);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  // Cross-Navigation state (e.g. clicking an entity in Form 470 to search Procurement History)
  const [initialOrgSearch, setInitialOrgSearch] = useState<string>("");

  const handleOpenScoreExplainer = (opp: Form470Opportunity, score: EvaluatedScore) => {
    setExplainerOpp(opp);
    setExplainerScore(score);
    setIsExplainerOpen(true);
    setVerifiedSteps((prev) => ({ ...prev, 2: true }));
  };

  const handleSearchOrgFromOpp = (orgName: string) => {
    setInitialOrgSearch(orgName);
    setActiveTab("procurement");
    setVerifiedSteps((prev) => ({ ...prev, 3: true }));
  };

  const handleTourStepAction = (stepNumber: number) => {
    setVerifiedSteps((prev) => ({ ...prev, [stepNumber]: true }));
    if (stepNumber === 1) {
      setActiveTab("form470");
      setIsWeightsModalOpen(true);
    } else if (stepNumber === 2) {
      setActiveTab("form470");
      const topOpp = INITIAL_FORM_470_OPPORTUNITIES[0];
      handleOpenScoreExplainer(topOpp, calculateOpportunityScore(topOpp, scoringWeights));
    } else if (stepNumber === 3) {
      setActiveTab("procurement");
    } else if (stepNumber === 4) {
      setIsBlueprintsModalOpen(true);
    }
  };

  const currentWeightsSum =
    scoringWeights.categoryWeight +
    scoringWeights.oemWeight +
    scoringWeights.geoWeight +
    scoringWeights.budgetWeight +
    scoringWeights.deadlineWeight;

  const totalBudget = INITIAL_FORM_470_OPPORTUNITIES.reduce((sum, o) => sum + o.estimatedBudget, 0);
  const allScores = INITIAL_FORM_470_OPPORTUNITIES.map((o) => calculateOpportunityScore(o, scoringWeights));
  const qualifiedCount = allScores.filter((s) => s.totalScore >= 75).length;
  const publicRecordsCount = 4820;
  const averageScore = Math.round(
    allScores.reduce((sum, s) => sum + s.totalScore, 0) / (allScores.length || 1)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)] relative">
      {/* Background Grid & Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.07),transparent_65%)]" />
      </div>

      {/* Enterprise Header */}
      <Header
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenWeights={() => setIsWeightsModalOpen(true)}
        onOpenChaos={() => setIsChaosModalOpen(true)}
        onOpenRoi={() => setIsRoiModalOpen(true)}
        onOpenBlueprints={() => setIsBlueprintsModalOpen(true)}
        currentWeightsSum={currentWeightsSum}
      />

      {/* Main Container */}
      <main className="flex-1 w-full px-0 py-4 sm:py-6 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Reviewer Tour */}
          <ReviewerTour
            verifiedSteps={verifiedSteps}
            onStepAction={handleTourStepAction}
          />

          {/* Bento KPIs Grid */}
          <BentoKpis
            totalBudget={totalBudget}
            qualifiedCount={qualifiedCount}
            publicRecordsCount={publicRecordsCount}
            averageScore={averageScore}
            onFilterQualified={() => setActiveTab("form470")}
            onViewHistory={() => setActiveTab("procurement")}
          />

          {/* Event-Driven Workflow Canvas */}
          <WorkflowCanvas onOpenWeightsModal={() => setIsWeightsModalOpen(true)} />

          {/* Main Navigation Segment Switcher Tabs */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
              {/* Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setActiveTab("form470")}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "form470"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  <span>Form 470 RFPs</span>
                  <span className="px-1.5 py-0.2 text-xs font-mono rounded bg-white/20 text-white ml-0.5">
                    12
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("procurement")}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "procurement"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span>Purchasing History</span>
                  <span className="px-1.5 py-0.2 text-xs font-mono rounded bg-slate-200 dark:bg-slate-800 text-[var(--color-text-secondary)] ml-0.5">
                    21 Orgs
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("ai")}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "ai"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  <Cpu className="h-4 w-4 shrink-0" />
                  <span>AI Spec Extractor</span>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-500 font-mono font-normal">
                    <Radio className="h-3 w-3 animate-pulse" />
                    <span>Live</span>
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("ingestion")}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    activeTab === "ingestion"
                      ? "bg-indigo-600 text-white shadow-2xs"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>SODA & Compliance</span>
                </button>
              </div>

              {/* Quick Action Button */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setIsWeightsModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-all whitespace-nowrap shrink-0"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Scoring Weights</span>
                </button>
              </div>
            </div>

            {/* Tab Views */}
            {activeTab === "form470" && (
              <Form470Intelligence
                weights={scoringWeights}
                opportunities={INITIAL_FORM_470_OPPORTUNITIES}
                onSelectOpportunity={handleOpenScoreExplainer}
                onOpenWeightsModal={() => setIsWeightsModalOpen(true)}
                
              />
            )}

            {activeTab === "procurement" && (
              <ProcurementHistory initialOrgSearch={initialOrgSearch} />
            )}

            {activeTab === "ai" && <AiSpecAnalyzer />}

            {activeTab === "ingestion" && <IngestionArchitecture />}
          </div>

          {/* Real-time Telemetry & Ingestion Console */}
          <ActivityConsole />
        </div>
      </main>

      {/* Enterprise Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <ScoreExplainerDrawer
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
        opportunity={explainerOpp}
        score={explainerScore}
        onRunAiAnalysis={() => {
          setIsExplainerOpen(false);
          setActiveTab("ai");
        }}
      />

      <ScoringWeightsModal
        isOpen={isWeightsModalOpen}
        onClose={() => setIsWeightsModalOpen(false)}
        currentWeights={scoringWeights}
        onSaveWeights={(newWeights) => setScoringWeights(newWeights)}
      />

      <CommandDialog
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenWeights={() => setIsWeightsModalOpen(true)}
        onOpenChaos={() => setIsChaosModalOpen(true)}
        onOpenBlueprints={() => setIsBlueprintsModalOpen(true)}
        onOpenRoi={() => setIsRoiModalOpen(true)}
      />

      <ChaosModal
        isOpen={isChaosModalOpen}
        onClose={() => setIsChaosModalOpen(false)}
      />

      <RoiCalculatorModal
        isOpen={isRoiModalOpen}
        onClose={() => setIsRoiModalOpen(false)}
      />

      <BlueprintExporter
        isOpen={isBlueprintsModalOpen}
        onClose={() => setIsBlueprintsModalOpen(false)}
      />
    </div>
  );
}
