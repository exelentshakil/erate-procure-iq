#!/usr/bin/env python3
"""
Production Scope & Formal Estimate Generator
USAC E-Rate Form 470 & Public-Sector Procurement Intelligence Platform
Client: George (MSP / Technology Reseller Firm, Oklahoma City, OK, USA)
Built to exact BarakahSoft Gold-Standard Architecture:
- 6 Direct Flex Children (Zero Middle Void)
- High-Density 6-Row Scope Table with Percentage Allocations
- Verified Upwork Partner Credentials (Never "Top Rated")
- Dual Signature Block with Formal Authorization
- Inlined Base64 Assets and Headless Chrome Single-Page PDF Audit
"""

import os
import re
import base64
import subprocess
import sys

def build_estimate():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.abspath(os.path.join(current_dir, ".."))
    docs_dir = os.path.join(project_dir, "docs")
    html_path = os.path.join(docs_dir, "estimate.html")
    pdf_path = os.path.join(docs_dir, "ESTIMATE.pdf")

    headshot_file = os.path.join(docs_dir, "headshot.jpeg")
    logo_file = os.path.join(docs_dir, "logo.png")

    with open(headshot_file, "rb") as f:
        headshot_b64 = base64.b64encode(f.read()).decode("utf-8")

    with open(logo_file, "rb") as f:
        logo_b64 = base64.b64encode(f.read()).decode("utf-8")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Scope &amp; Formal Estimate - E-Rate &amp; Public Procurement Intelligence Engine</title>
  <style>
    @page {{
      size: letter portrait;
      margin: 6mm 8.5mm 6mm 8.5mm;
    }}
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}
    html, body {{
      margin: 0;
      padding: 0;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }}
    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.32;
      font-size: 8.5px;
    }}
    .sheet {{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}

    /* 1. Header */
    .header {{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 7px;
      border-bottom: 1.5px solid #0f172a;
    }}
    .brand-title {{
      font-size: 15px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #0f172a;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    .brand-badge {{
      background: #4f46e5;
      color: #ffffff;
      font-size: 8px;
      font-weight: 700;
      padding: 1.5px 5px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }}
    .doc-subtitle {{
      font-size: 9px;
      font-weight: 600;
      color: #475569;
    }}
    .meta-table {{
      font-size: 8px;
      border-collapse: collapse;
      text-align: right;
    }}
    .meta-table td {{
      padding: 1px 0 1px 8px;
    }}
    .meta-label {{
      color: #64748b;
      font-weight: 500;
    }}
    .meta-val {{
      font-weight: 700;
      color: #0f172a;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }}

    /* Section Subheaders */
    .sec-header {{
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 4px;
    }}
    .sec-title {{
      font-size: 8.8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 4px;
    }}
    .sec-tag {{
      font-size: 7.5px;
      font-weight: 600;
      color: #64748b;
    }}

    /* 2. Scope Table */
    .scope-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 8px;
      border: 1px solid #cbd5e1;
    }}
    .scope-table th {{
      background: #f1f5f9;
      color: #334155;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 7.2px;
      letter-spacing: 0.03em;
      padding: 3.5px 5px;
      border-bottom: 1px solid #cbd5e1;
      text-align: left;
    }}
    .scope-table td {{
      padding: 3.2px 5px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }}
    .phase-badge {{
      display: inline-block;
      font-weight: 700;
      font-size: 7.2px;
      padding: 1px 4px;
      border-radius: 2px;
      background: #e0e7ff;
      color: #3730a3;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      white-space: nowrap;
    }}
    .phase-pre {{
      background: #dcfce7;
      color: #166534;
    }}
    .col-deliverable {{
      font-weight: 600;
      color: #0f172a;
    }}
    .col-desc {{
      font-size: 7.4px;
      color: #475569;
      line-height: 1.25;
    }}
    .num-col {{
      text-align: right;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-weight: 600;
      white-space: nowrap;
    }}
    .scope-table tfoot td {{
      background: #f8fafc;
      font-weight: 800;
      color: #0f172a;
      border-top: 1.5px solid #0f172a;
      padding: 4px 5px;
      font-size: 8.2px;
    }}

    /* 3. Milestones & Guardrails Grid */
    .grid-row {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
    }}
    .card-box {{
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 5.5px 7px;
      background: #ffffff;
    }}
    .card-title {{
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin-bottom: 3.5px;
      padding-bottom: 2px;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
    }}
    .item-list {{
      display: flex;
      flex-direction: column;
      gap: 2.2px;
      font-size: 7.4px;
      color: #334155;
    }}
    .item-row {{
      display: flex;
      align-items: flex-start;
      gap: 4px;
      line-height: 1.25;
    }}
    .item-bullet {{
      color: #4f46e5;
      font-weight: 800;
      font-size: 8px;
      line-height: 1;
    }}

    /* 4. Commercial Terms */
    .terms-box {{
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 5px 7px;
      background: #f8fafc;
    }}
    .terms-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 6px;
    }}
    .term-col {{
      font-size: 7.3px;
    }}
    .term-title {{
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1px;
    }}
    .term-body {{
      color: #475569;
      line-height: 1.25;
    }}

    /* 5. Authorization Block */
    .auth-block {{
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 5.5px 8px;
      background: #ffffff;
    }}
    .auth-title {{
      font-size: 8px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #0f172a;
      margin-bottom: 3.5px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
    }}
    .auth-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      font-size: 7.4px;
    }}
    .auth-party {{
      display: flex;
      flex-direction: column;
      gap: 1.5px;
    }}
    .auth-party-title {{
      font-weight: 700;
      color: #0f172a;
    }}
    .auth-sign-line {{
      display: flex;
      gap: 6px;
      align-items: flex-end;
      margin-top: 3px;
      padding-bottom: 1.5px;
      border-bottom: 1px solid #0f172a;
    }}
    .auth-sign-field {{
      flex: 1;
      font-family: 'Brush Script MT', 'Dancing Script', cursive, sans-serif;
      font-size: 11px;
      color: #1e1b4b;
    }}
    .auth-date-field {{
      width: 80px;
      text-align: center;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 7.5px;
      font-weight: 600;
    }}
    .auth-label {{
      font-size: 6.8px;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }}

    /* 6. Footer */
    .footer-container {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 5px;
      border-top: 1.5px solid #0f172a;
      font-size: 7.5px;
    }}
    .footer-founder {{
      display: flex;
      align-items: center;
      gap: 7px;
    }}
    .founder-avatar {{
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 1px solid #cbd5e1;
      object-fit: cover;
    }}
    .founder-info {{
      line-height: 1.25;
    }}
    .founder-name {{
      font-size: 8.5px;
      color: #0f172a;
    }}
    .founder-company {{
      color: #475569;
      font-size: 7.3px;
    }}
    .founder-sub {{
      color: #64748b;
      font-size: 7px;
    }}
    .footer-brand {{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1.5px;
    }}
    .business-logo {{
      height: 15px;
      object-fit: contain;
    }}
    .demo-badge {{
      font-size: 7px;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      color: #4f46e5;
      text-decoration: none;
      font-weight: 600;
    }}
  </style>
</head>
<body>
<div class="sheet">
  <!-- 1. Header Section -->
  <div class="header">
    <div>
      <div class="brand-title">
        <span>ProcureIQ™ E-Rate &amp; Public Procurement Intelligence</span>
        <span class="brand-badge">Enterprise Scope</span>
      </div>
      <div class="doc-subtitle">USAC Form 470 RFP Scoring &amp; Public Purchasing History Normalization System</div>
    </div>
    <table class="meta-table">
      <tr>
        <td class="meta-label">Client Target:</td>
        <td class="meta-val">George (MSP/VAR, Oklahoma City, OK)</td>
      </tr>
      <tr>
        <td class="meta-label">Prepared By:</td>
        <td class="meta-val">Md Shakil A. • BarakahSoft LLC</td>
      </tr>
      <tr>
        <td class="meta-label">Date &amp; Term:</td>
        <td class="meta-val">15 Sep 2026 • 58 Hours Fixed Scope</td>
      </tr>
    </table>
  </div>

  <!-- 2. Scope Table Section -->
  <div>
    <div class="sec-header">
      <span class="sec-title">Implementation Milestones &amp; Resource Allocation</span>
      <span class="sec-tag">Turnkey Engineering • Calibrated to Client Historical Rate ($40.00/hr)</span>
    </div>
    <table class="scope-table">
      <thead>
        <tr>
          <th style="width: 10%;">Phase</th>
          <th style="width: 28%;">Milestone Deliverable</th>
          <th style="width: 38%;">Architectural Implementation Details</th>
          <th style="width: 8%;" class="num-col">Hours</th>
          <th style="width: 8%;" class="num-col">Rate</th>
          <th style="width: 8%;" class="num-col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="phase-badge phase-pre">Phase 0</span></td>
          <td class="col-deliverable">Live Working Prototype</td>
          <td class="col-desc">Fully functional Next.js 15 dual-module application with Form 470 scoring, public purchasing search, and live AI spec extractor.</td>
          <td class="num-col">Pre-Funded</td>
          <td class="num-col">$0.00</td>
          <td class="num-col">$0.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 1</span></td>
          <td class="col-deliverable">USAC SODA API Ingestion</td>
          <td class="col-desc">Machine-readable automated delta sync with opendata.usac.org. Throttled at 2 req/s with SHA-256 deduplication and change logging.</td>
          <td class="num-col">12 hrs</td>
          <td class="num-col">$40.00</td>
          <td class="num-col">$480.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 2</span></td>
          <td class="col-deliverable">PDF Parser &amp; Addenda Diff</td>
          <td class="col-desc">Automated PDF equipment schedule extraction, Q&amp;A addenda diffing, and mandatory walkthrough alert notifications.</td>
          <td class="num-col">14 hrs</td>
          <td class="num-col">$40.00</td>
          <td class="num-col">$560.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 3</span></td>
          <td class="col-deliverable">Explainable Scoring Engine</td>
          <td class="col-desc">Configurable 0–100 weighting sliders with slide-out audit drawer explaining WHY an RFP scored (+25 OEM, +20 Geo, +15 Scale).</td>
          <td class="num-col">12 hrs</td>
          <td class="num-col">$40.00</td>
          <td class="num-col">$480.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 4</span></td>
          <td class="col-deliverable">Public Purchase History Engine</td>
          <td class="col-desc">Multi-jurisdiction normalization across OK/TX/AR school districts and county boards with 3-year OEM technology refresh timelines.</td>
          <td class="num-col">12 hrs</td>
          <td class="num-col">$40.00</td>
          <td class="num-col">$480.00</td>
        </tr>
        <tr>
          <td><span class="phase-badge">Phase 5</span></td>
          <td class="col-deliverable">Hardened Deployment &amp; Docs</td>
          <td class="col-desc">Supabase PostgreSQL schemas with Row-Level Security, Vercel Fluid Compute, health monitoring, and complete runbook documentation.</td>
          <td class="num-col">8 hrs</td>
          <td class="num-col">$40.00</td>
          <td class="num-col">$320.00</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align: right; padding-right: 8px;">Total Investment &amp; Guaranteed Engineering Scope:</td>
          <td class="num-col">58 hrs</td>
          <td class="num-col">$40.00</td>
          <td class="num-col" style="color: #4f46e5;">$2,320.00</td>
        </tr>
      </tfoot>
    </table>
  </div>

  <!-- 3. Milestones & Guardrails Grid -->
  <div class="grid-row">
    <div class="card-box">
      <div class="card-title">
        <span>Architectural Guarantees</span>
        <span style="color: #4f46e5; font-size: 7.2px;">Defensibility Guardrails</span>
      </div>
      <div class="item-list">
        <div class="item-row">
          <span class="item-bullet">✓</span>
          <span><strong>100% Public Source Compliance:</strong> Zero CAPTCHA bypassing, zero password-protected scraping, 100% legal compliance under Open Records Acts.</span>
        </div>
        <div class="item-row">
          <span class="item-bullet">✓</span>
          <span><strong>Polite Rate-Limiting:</strong> Hard-coded 2 requests/second ceiling with exponential backoff to avoid strain on public school district infrastructure.</span>
        </div>
        <div class="item-row">
          <span class="item-bullet">✓</span>
          <span><strong>Immutable Source Traceability:</strong> Every purchase record and Form 470 filing maintains a direct verifiable URL link to the official public disclosure.</span>
        </div>
      </div>
    </div>

    <div class="card-box">
      <div class="card-title">
        <span>Client ROI &amp; Value Multiplier</span>
        <span style="color: #166534; font-size: 7.2px;">Operational Impact</span>
      </div>
      <div class="item-list">
        <div class="item-row">
          <span class="item-bullet">✓</span>
          <span><strong>700+ Engineering Hours Saved:</strong> Eliminates 14 hours/week of manual USAC and county portal searches across your senior pre-sales team.</span>
        </div>
        <div class="item-row">
          <span class="item-bullet">✓</span>
          <span><strong>Early Pursuit Advantage:</strong> Identifies high-margin Fortinet, Cisco, and Aruba opportunities 14+ days before local competitors.</span>
        </div>
        <div class="item-row">
          <span class="item-bullet">✓</span>
          <span><strong>Sub-Second Dual AI Failover:</strong> Native OpenAI gpt-4o-mini + Gemini 2.0 Flash fallback chain guarantees zero dropped bids during API outages.</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Commercial Terms Section -->
  <div class="terms-box">
    <div class="terms-grid">
      <div class="term-col">
        <div class="term-title">Fixed-Price Protection</div>
        <div class="term-body">100% milestone-based fixed scope ($2,320.00). Zero hidden hosting surcharges, zero unexpected hourly overages.</div>
      </div>
      <div class="term-col">
        <div class="term-title">30-Day Defect Warranty</div>
        <div class="term-body">Full post-handover warranty covering SODA API schema updates, formula calibration, and ingestion bug fixes at $0 cost.</div>
      </div>
      <div class="term-col">
        <div class="term-title">100% IP &amp; Code Ownership</div>
        <div class="term-body">All Git repositories, Supabase database schemas, and ingestion ETL workers are completely owned by your firm upon milestone sign-off.</div>
      </div>
      <div class="term-col">
        <div class="term-title">Turnkey Runbook Delivery</div>
        <div class="term-body">Comprehensive developer documentation and operational playbooks for running locally or scaling on private cloud infrastructure.</div>
      </div>
    </div>
  </div>

  <!-- 5. Formal Acceptance Authorization Block -->
  <div class="auth-block">
    <div class="auth-title">
      <span>Formal Authorization &amp; Scope Acceptance</span>
      <span style="font-weight: 500; font-size: 7.4px; color: #475569;">Binding upon signature by authorized representatives</span>
    </div>
    <div class="auth-grid">
      <div class="auth-party">
        <div class="auth-party-title">Authorized Provider: BarakahSoft LLC (Wyoming, USA)</div>
        <div>Signatory: <strong>Md Shakil A.</strong> • Principal Systems Architect &amp; Founder</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field">Shakil Ahmed</div>
          <div class="auth-date-field">15 Sep 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Provider Signature</span>
          <span class="auth-label" style="width: 80px; text-align: center;">Date</span>
        </div>
      </div>

      <div class="auth-party">
        <div class="auth-party-title">Authorized Client: George (Oklahoma City, OK, USA)</div>
        <div>Signatory: <strong>George</strong> • Executive Director / Authorized Client Representative</div>
        <div class="auth-sign-line">
          <div class="auth-sign-field" style="color: #64748b; font-family: inherit; font-size: 8px; font-style: italic;">[ Accepted via Upwork Fixed-Price Contract Milestone #1 ]</div>
          <div class="auth-date-field">___ / ___ / 2026</div>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span class="auth-label">Authorized Client Signature</span>
          <span class="auth-label" style="width: 80px; text-align: center;">Date</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Executive Signature Footer -->
  <div class="footer-container">
    <div class="footer-founder">
      <img src="data:image/jpeg;base64,{headshot_b64}" alt="Shakil Ahmed" class="founder-avatar" />
      <div class="founder-info">
        <div class="founder-name"><strong>Md Shakil A.</strong> • Principal Systems Architect (12+ Yrs Exp)</div>
        <div class="founder-company"><strong>BarakahSoft LLC</strong> • Verified Upwork Partner</div>
        <div class="founder-sub">Former Lead Engineer at Legiit ($1M ARR Command Center) • 115+ Delivered Systems</div>
      </div>
    </div>
    <div class="footer-brand">
      <img src="data:image/png;base64,{logo_b64}" alt="BarakahSoft" class="business-logo" />
      <a href="https://erate-procure-iq.vercel.app" target="_blank" class="demo-badge">erate-procure-iq.vercel.app</a>
    </div>
  </div>
</div>
</body>
</html>
"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print("Saved estimate.html to:", html_path)

    # Compile with Headless Chrome using absolute file URI
    chrome_cmd = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        f"file://{os.path.abspath(html_path)}"
    ]

    res = subprocess.run(chrome_cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print("Successfully generated ESTIMATE.pdf via Chrome Headless at:", pdf_path)
        file_size = os.path.getsize(pdf_path)
        print("File size:", file_size, "bytes")
    else:
        print("Chrome print-to-pdf error:", res.stderr, file=sys.stderr)
        sys.exit(1)

    # Verify page count
    with open(pdf_path, "rb") as f:
        pdf_bytes = f.read()

    pages = re.findall(rb"/Type\s*/Page[^s]", pdf_bytes)
    print(f"Verified PDF page count: {len(pages)} page(s)")
    if len(pages) != 1:
        print(f"CRITICAL ERROR: Expected exactly 1 page, got {len(pages)}!", file=sys.stderr)
        sys.exit(1)
    else:
        print("PASSED: Strictly 1 page PDF verified.")

if __name__ == "__main__":
    build_estimate()
