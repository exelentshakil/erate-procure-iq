import { Form470Opportunity, ScoringBreakdownItem } from "@/data/form470Data";

export interface ScoringWeights {
  categoryWeight: number; // default 25
  oemWeight: number;      // default 25
  geoWeight: number;      // default 20
  budgetWeight: number;   // default 15
  deadlineWeight: number; // default 15
}

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  categoryWeight: 25,
  oemWeight: 25,
  geoWeight: 20,
  budgetWeight: 15,
  deadlineWeight: 15,
};

export interface EvaluatedScore {
  totalScore: number;
  matchTier: "Strong Match" | "Qualified Fit" | "Moderate Fit" | "Low Priority";
  statusColor: "emerald" | "blue" | "amber" | "slate";
  breakdown: ScoringBreakdownItem[];
  whySummary: string;
  keyStrengths: string[];
  riskFactors: string[];
  recommendation: string;
}

export function calculateOpportunityScore(
  opp: Form470Opportunity,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS
): EvaluatedScore {
  const breakdown: ScoringBreakdownItem[] = [];
  const keyStrengths: string[] = [];
  const riskFactors: string[] = [];

  // Normalize weights if they don't sum to 100
  const weightSum =
    weights.categoryWeight +
    weights.oemWeight +
    weights.geoWeight +
    weights.budgetWeight +
    weights.deadlineWeight || 100;
  
  const normCat = (weights.categoryWeight / weightSum) * 100;
  const normOem = (weights.oemWeight / weightSum) * 100;
  const normGeo = (weights.geoWeight / weightSum) * 100;
  const normBud = (weights.budgetWeight / weightSum) * 100;
  const normDed = (weights.deadlineWeight / weightSum) * 100;

  // 1. Category Match (Cat 2 Internal Connections / Managed Services vs Cat 1 WAN)
  let catPointsRatio = 0.5;
  let catReason = "";
  if (opp.categoryOfService.includes("Category 2: Internal Connections")) {
    catPointsRatio = 1.0;
    catReason = "Direct Category 2 Internal Connections (Switching/WiFi/Firewall hardware + installation)";
    keyStrengths.push("High-margin Category 2 hardware and deployment scope");
  } else if (opp.categoryOfService.includes("Basic Maintenance")) {
    catPointsRatio = 0.85;
    catReason = "Category 2 Basic Maintenance (BMIC) recurring support and warranty renewal";
    keyStrengths.push("Predictable 3-year recurring maintenance margin");
  } else {
    catPointsRatio = 0.3;
    catReason = "Category 1 Leased Lit/Dark Fiber Carrier transport (Telecommunications)";
    riskFactors.push("Carrier-dominated Category 1 WAN transport with limited VAR hardware margin");
  }
  const catPoints = Math.round(normCat * catPointsRatio);
  breakdown.push({
    criterion: "Product / Service Category",
    weight: Math.round(normCat),
    pointsAwarded: catPoints,
    reason: catReason,
    status: catPointsRatio >= 0.8 ? "matched" : catPointsRatio >= 0.5 ? "partial" : "missed",
  });

  // 2. OEM / Manufacturer Alignment (Fortinet, Cisco, Meraki, Aruba)
  let oemRatio = 0.3;
  let oemReason = "";
  const preferred = opp.preferredOem.map((o) => o.toLowerCase());
  const hasFortinet = preferred.some((o) => o.includes("fortinet"));
  const hasCisco = preferred.some((o) => o.includes("cisco") || o.includes("meraki"));
  const hasAruba = preferred.some((o) => o.includes("aruba"));

  if (hasFortinet && hasCisco) {
    oemRatio = 1.0;
    oemReason = `Direct match on core partner lines: ${opp.preferredOem.join(" / ")}`;
    keyStrengths.push(`Direct OEM authorized tier for ${opp.preferredOem.join(" & ")}`);
  } else if (hasFortinet || hasCisco || hasAruba) {
    oemRatio = 0.88;
    oemReason = `Authorized manufacturer line specified: ${opp.preferredOem.join(", ")}`;
    keyStrengths.push(`Standard authorization for ${opp.preferredOem.join(", ")}`);
  } else {
    oemRatio = 0.25;
    oemReason = `Non-standard or telecom carrier line: ${opp.preferredOem.join(", ") || "Unspecified"}`;
    riskFactors.push("Requires external sub-contracting or off-card vendor authorization");
  }
  const oemPoints = Math.round(normOem * oemRatio);
  breakdown.push({
    criterion: "Manufacturer / OEM Alignment",
    weight: Math.round(normOem),
    pointsAwarded: oemPoints,
    reason: oemReason,
    status: oemRatio >= 0.8 ? "matched" : oemRatio >= 0.5 ? "partial" : "missed",
  });

  // 3. Geographic Proximity & Contracting Precedents
  let geoRatio = 0.4;
  let geoReason = "";
  if (opp.state === "OK") {
    geoRatio = 1.0;
    geoReason = `Home state priority (${opp.city}, OK) with established OMES & local district relationships`;
    keyStrengths.push("Local Oklahoma territory with fast deployment and zero travel friction");
  } else if (opp.state === "TX") {
    geoRatio = 0.85;
    geoReason = `Primary expansion corridor (${opp.city}, TX) eligible under TIPS cooperative purchasing`;
    keyStrengths.push("Eligible for TIPS-USA cooperative purchasing vehicle");
  } else if (opp.state === "AR") {
    geoRatio = 0.8;
    geoReason = `Border state proximity (${opp.city}, AR) with direct drive deployment capability`;
  } else {
    geoRatio = 0.6;
    geoReason = `Regional market (${opp.city}, ${opp.state}) requiring remote staging or field dispatch`;
    riskFactors.push(`Out-of-state field dispatch logistics for ${opp.state}`);
  }
  const geoPoints = Math.round(normGeo * geoRatio);
  breakdown.push({
    criterion: "Geographic Location & State",
    weight: Math.round(normGeo),
    pointsAwarded: geoPoints,
    reason: geoReason,
    status: geoRatio >= 0.8 ? "matched" : geoRatio >= 0.5 ? "partial" : "missed",
  });

  // 4. Estimated Project Budget / Scope Sweet Spot ($100k - $500k)
  let budRatio = 0.5;
  let budReason = "";
  const b = opp.estimatedBudget;
  if (b >= 150000 && b <= 450000) {
    budRatio = 1.0;
    budReason = `$${b.toLocaleString()} falls directly in the optimal mid-market VAR revenue envelope`;
    keyStrengths.push(`Optimal $${(b / 1000).toFixed(0)}k contract scale for rapid margin realization`);
  } else if (b > 450000) {
    budRatio = 0.85;
    budReason = `$${b.toLocaleString()} is a high-value enterprise RFP with competitive multi-vendor bidding`;
    keyStrengths.push("High-value enterprise revenue potential");
  } else if (b >= 750000) {
    budRatio = 0.75;
    budReason = `$${b.toLocaleString()} target contract size`;
  } else {
    budRatio = 0.6;
    budReason = `$${b.toLocaleString()} smaller scope suitable for fast turnkey proposal turnaround`;
  }
  const budPoints = Math.round(normBud * budRatio);
  breakdown.push({
    criterion: "Estimated Contract Scale",
    weight: Math.round(normBud),
    pointsAwarded: budPoints,
    reason: budReason,
    status: budRatio >= 0.8 ? "matched" : budRatio >= 0.5 ? "partial" : "missed",
  });

  // 5. Proposal Window & Allowable Contract Date (ACD) Runway
  // Assuming current date is September 15, 2026
  const currentDate = new Date("2026-09-15");
  const acdDate = new Date(opp.allowableContractDate);
  const daysRemaining = Math.max(0, Math.round((acdDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));

  let dedRatio = 0.3;
  let dedReason = "";
  if (daysRemaining >= 18) {
    dedRatio = 1.0;
    dedReason = `${daysRemaining} days until Allowable Contract Date (${opp.allowableContractDate}) — ample runway for questions and BOM engineering`;
    keyStrengths.push(`${daysRemaining}-day submission window allows full architectural pricing`);
  } else if (daysRemaining >= 12) {
    dedRatio = 0.8;
    dedReason = `${daysRemaining} days remaining (${opp.allowableContractDate}) — active questions window, prompt response needed`;
  } else if (daysRemaining >= 7) {
    dedRatio = 0.55;
    dedReason = `${daysRemaining} days remaining (${opp.allowableContractDate}) — condensed proposal cycle`;
    riskFactors.push(`Short deadline runway: only ${daysRemaining} days until allowable contract date`);
  } else {
    dedRatio = 0.2;
    dedReason = `Critical deadline: only ${daysRemaining} days to submit`;
    riskFactors.push("Imminent submission deadline with tight turnaround SLA");
  }

  if (opp.specDetails.mandatoryWalkthrough) {
    riskFactors.push("Mandatory pre-bid vendor walkthrough required on campus");
  }

  const dedPoints = Math.round(normDed * dedRatio);
  breakdown.push({
    criterion: "Proposal Runway & Deadlines",
    weight: Math.round(normDed),
    pointsAwarded: dedPoints,
    reason: dedReason,
    status: dedRatio >= 0.8 ? "matched" : dedRatio >= 0.5 ? "partial" : "missed",
  });

  const totalScore = Math.min(100, Math.max(0, catPoints + oemPoints + geoPoints + budPoints + dedPoints));

  let matchTier: EvaluatedScore["matchTier"] = "Moderate Fit";
  let statusColor: EvaluatedScore["statusColor"] = "amber";
  let recommendation = "Review specifications and evaluate vendor landscape.";

  if (totalScore >= 88) {
    matchTier = "Strong Match";
    statusColor = "emerald";
    recommendation = "Immediate Pursuit — High-priority capture target with high OEM alignment and favorable regional contract vehicle.";
  } else if (totalScore >= 75) {
    matchTier = "Qualified Fit";
    statusColor = "blue";
    recommendation = "Recommended Pursuit — Request addenda, verify bill of materials (BOM), and submit clarification questions.";
  } else if (totalScore >= 60) {
    matchTier = "Moderate Fit";
    statusColor = "amber";
    recommendation = "Conditional Review — Potential bid if partnering with local sub-contractor or using existing cooperative schedule.";
  } else {
    matchTier = "Low Priority";
    statusColor = "slate";
    recommendation = "Low Priority Pass — Unfavorable telecom category or misaligned manufacturer specs.";
  }

  // Generate plain-English Why Summary
  const topStrengthsText = keyStrengths.slice(0, 2).join("; ");
  const whySummary = `Scored ${totalScore}/100 based on ${catReason.toLowerCase()} and ${oemReason.toLowerCase()}. ${
    riskFactors.length > 0 ? `Key constraint: ${riskFactors[0]}.` : "Zero major technical compliance red flags identified."
  }`;

  return {
    totalScore,
    matchTier,
    statusColor,
    breakdown,
    whySummary,
    keyStrengths,
    riskFactors,
    recommendation,
  };
}
