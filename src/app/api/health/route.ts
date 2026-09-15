import { NextResponse } from "next/server";

export async function GET() {
  const hasOpenAi = Boolean(process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("placeholder"));
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY.includes("placeholder"));
  const hasSupabase = Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL);

  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "GovProcure IQ — E-Rate & Procurement Intelligence Platform",
    environment: process.env.NODE_ENV || "production",
    providers: {
      openai: {
        active: hasOpenAi,
        model: "gpt-4o-mini",
        role: "Primary RFP Spec & Addenda Extractor",
      },
      gemini: {
        active: hasGemini,
        model: "gemini-2.0-flash",
        role: "High-Speed Document Fallback",
      },
      deterministicRules: {
        active: true,
        model: "deterministic-scoring-v2",
        role: "100% Offline Regulatory & Math Lock",
      },
      supabase: {
        active: hasSupabase,
        role: "Normalized Procurement Data Vault",
      },
    },
    adapters: {
      usacSocrata: {
        active: true,
        endpoint: "data.usac.org/resource/470.json",
        rateLimit: "2 req/sec throttled",
        compliance: "100% Public Open Data / Zero Bypass",
      },
      texasDir: {
        active: true,
        endpoint: "dir.texas.gov/transparency/data",
        compliance: "Public Transparency Disclosure",
      },
      oklahomaOmes: {
        active: true,
        endpoint: "omes.ok.gov/transparency/contracts",
        compliance: "State Financial Transparency Act",
      },
    },
    version: "1.0.0-production",
  });
}
