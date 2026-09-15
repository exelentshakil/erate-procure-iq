import { NextRequest, NextResponse } from "next/server";
import { analyzeRfpDocument } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      rfpText = "",
      entityName = "Sample District",
      category = "Category 2: Internal Connections",
      state = "OK",
    } = body;

    if (!rfpText || rfpText.trim().length === 0) {
      return NextResponse.json(
        { error: "RFP text excerpt is required for analysis" },
        { status: 400 }
      );
    }

    const result = await analyzeRfpDocument(rfpText, entityName, category, state);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { error: "Failed to analyze RFP", details: errorMessage },
      { status: 500 }
    );
  }
}
