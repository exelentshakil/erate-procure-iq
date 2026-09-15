# Product Requirements Document (PRD)
## GovProcure IQ — USAC Form 470 & Public-Sector Procurement Intelligence Platform
**Target Client:** George (Oklahoma City, OK — MSP / VAR Technology Reseller & Systems Integrator)  
**Ref Code:** `BS-2026-PROCURE-IQ`  
**Architect:** Shakil Ahmed, Founder at BarakahSoft LLC  

---

### 1. Executive Summary & Defensibility Hook
George's business (VAR & MSP focused on public-sector infrastructure, switching, wireless, Fortinet/Cisco security, and E-Rate RFPs) spends hundreds of manual hours searching USAC Form 470 filings and county/school district board meetings. 

**The Core Fear & Client Requirement:**
> *"We are particularly interested in developers who understand the difference between simply scraping webpages and building a reliable data ingestion architecture that can accommodate APIs, downloadable datasets, documents, and multiple public data sources... The application should explain WHY the opportunity received that score rather than simply displaying a number."*

**The Defensibility Architecture:**
1. **Explainable Scoring Engine**: Rather than an opaque number (e.g. `92/100`), the platform emits a mathematical audit trail per RFP (e.g., `+25pts: Fortinet/Cisco Switching Match`, `+20pts: OK/TX Regional Priority`, `+20pts: Category 2 Budget > $150k`, `+15pts: Bid Window > 14 Days`, `+12pts: TIPS/DIR Vehicle Approved`).
2. **Pluggable Data Ingestion Layer**: An abstraction interface (`ProcurementSourceAdapter`) supporting official USAC Socrata Open Data APIs, State Transparency Portals (Texas Open Data, Oklahoma OMES), SAM.gov federal feeds, and batch CSV/JSON ingestion without altering frontend or database schemas.
3. **Deterministic Separation of AI**: AI (OpenAI GPT-4o-mini + Gemini 2.0 Flash) is strictly deployed for unstructured PDF spec extraction and narrative justification; all scoring math, filtering, and date arithmetic remain 100% deterministic and auditable.

---

### 2. Core Functional Pillars

#### Pillar 1: USAC Form 470 RFP Intelligence
- **Open Data Ingestion**: Direct adapter for USAC Socrata Open Data (`data.usac.org`) endpoint retrieving Category 1 (Internet/WAN) and Category 2 (Internal Connections, Switching, Wireless, Cabling, Managed Services) opportunities.
- **RFP Document & Addenda Indexer**: Captures and indexes linked RFP PDFs, statement of work (SOW) documents, questions & answers addenda, and equipment specification sheets.
- **Configurable Opportunity Scoring**: Admin-defined weights across 5 key dimensions:
  - Product/Service Category (0–30 pts)
  - Preferred/Approved Manufacturer (0–30 pts: Cisco, Fortinet, Aruba, Meraki, Juniper)
  - Geographic Alignment (0–25 pts: Oklahoma, Texas, Arkansas, Kansas, Missouri)
  - Estimated Contract Scale (0–15 pts)
  - Proposal Window & Milestones (0–10 pts)
- **Bid Pursuit Kanban / Workflow**:
  - `New Discovery` ➔ `Scored & Qualified (≥75)` ➔ `Technical Review` ➔ `Bid Decision (Pursue/Pass)` ➔ `Proposal Prepared`
- **Milestone & Date Countdown**: Tracks Filing Date, Question Cutoff Date, and Allowable Contract Date (ACD / Bid Deadline) with SLA warnings.

#### Pillar 2: Public-Sector Purchase History Intelligence
- **Entity Search & Aggregation**: Instant search across School Districts, Community Colleges, Universities, Counties, and Municipalities (e.g. *"Tulsa Public Schools"*, *"Oklahoma City Community College"*, *"Austin ISD"*, *"Dallas County"*).
- **Normalized Schema**:
  - `entity_name`, `entity_type`, `city`, `state`, `purchase_date`, `fiscal_year`, `vendor_awarded`, `manufacturer_oem`, `technology_category`, `description`, `amount_usd`, `po_contract_num`, `contract_vehicle` (TIPS-USA, DIR, OMES), `source_attribution_url`, `verification_status`.
- **Historical Vendor & Tech Timeline**: View 3–5 year technology refresh cycles (e.g., 2023 Cisco Switching $240k ➔ 2024 Fortinet Firewall $72k ➔ 2025 Aruba APs $185k) revealing incumbent vendors and upcoming replacement windows.
- **Multi-Dimensional Query Filter**: Filter by State, Entity Type, Manufacturer OEM, Vendor, Fiscal Year range, and Contract Value bracket.

#### Pillar 3: Pluggable ETL Ingestion Engine (Compliance-First)
- **Zero-Bypass Architecture**: Uses official APIs and public transparency disclosures. Zero CAPTCHA cracking, zero authentication circumvention, rate-limit throttled at 2 requests/second.
- **Pluggable Adapter Model**:
  - `USACSocrataAdapter`: USAC Form 470 Open Data REST API.
  - `TexasDIRAdapter`: Texas Department of Information Resources public purchase datasets.
  - `OklahomaOMESAdapter`: Oklahoma Office of Management & Enterprise Services contracts.
  - `SAMGovPublicAdapter`: Federal grant and contract intelligence.
- **Dual-Provider Spec Extraction**: When parsing unstructured procurement PDF specifications, the pipeline utilizes OpenAI `gpt-4o-mini` with automatic sub-second failover to Gemini `gemini-2.0-flash`.

---

### 3. Data Model & Schema Overview

```sql
-- 1. USAC Form 470 Opportunities
CREATE TABLE form_470_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number VARCHAR(64) UNIQUE NOT NULL,
  billed_entity_name VARCHAR(255) NOT NULL,
  ben_id VARCHAR(32) NOT NULL,
  entity_type VARCHAR(64) NOT NULL, -- School District, Library, Consortium
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  category_of_service VARCHAR(100) NOT NULL, -- Category 1 (WAN) / Category 2 (Internal Connections)
  services_requested TEXT[] NOT NULL, -- Switching, Wireless, Cabling, Firewall
  preferred_oem TEXT[] DEFAULT '{}', -- Cisco, Fortinet, Meraki
  estimated_budget NUMERIC(12,2),
  posting_date DATE NOT NULL,
  questions_due_date DATE,
  allowable_contract_date DATE NOT NULL, -- Bid Deadline
  rfp_document_url TEXT,
  addenda_count INT DEFAULT 0,
  match_score INT DEFAULT 0,
  scoring_breakdown JSONB DEFAULT '{}'::jsonb,
  status VARCHAR(32) DEFAULT 'new', -- new, qualified, reviewing, pursue, pass, submitted
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Public Sector Purchase Records (Normalized)
CREATE TABLE public_procurement_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name VARCHAR(255) NOT NULL,
  organization_type VARCHAR(64) NOT NULL, -- K-12 District, Higher Ed, County, City
  city VARCHAR(100) NOT NULL,
  state VARCHAR(2) NOT NULL,
  fiscal_year INT NOT NULL,
  purchase_date DATE NOT NULL,
  vendor_name VARCHAR(255) NOT NULL,
  manufacturer_oem VARCHAR(100), -- Cisco, Fortinet, HP, Dell
  technology_category VARCHAR(100) NOT NULL,
  purchase_description TEXT NOT NULL,
  amount_usd NUMERIC(12,2) NOT NULL,
  po_number VARCHAR(100),
  contract_vehicle VARCHAR(100), -- TIPS-USA, DIR, OMES, USAC E-Rate
  source_name VARCHAR(100) NOT NULL,
  source_record_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 4. Acceptance Criteria & Brief Traceability

| Job Requirement | Implementation in GovProcure IQ Demo | Verification |
|---|---|---|
| USAC Form 470 Retrieval | Live dataset loaded with Category 1 & 2 opportunities with BEN IDs | Verified in UI Table & Cards |
| Linked RFPs & Addenda | Slide-out Drawer showing Form 470 summary, downloadable specs, addenda | Verified via Row Inspection |
| Configurable Scoring Criteria | Interactive Scoring Rules Drawer with live weight sliders & recalculation | Verified via Scoring Modal |
| "Explain WHY it scored" | Detailed Score Breakdown card detailing exact points awarded per criterion | Verified on Opportunity Detail |
| Org Search (e.g. Texas ISD, OK County) | Dynamic search across Tulsa Public Schools, Austin ISD, Oklahoma City CC | Verified in Purchase History Tab |
| Normalized Procurement Database | Standardized schema uniting state datasets with OEM, Vendor, PO, Amount | Verified in Data Grid |
| Traceability to Public Records | Direct clickable source links and dataset verification badges on every row | Verified on Row Badges |
| Data Source Compliance | Clean API/downloadable schema, rate-limit throttled, zero CAPTCHA bypass | Verified in Pipeline Canvas & Docs |
| Turnkey Exportable Blueprints | n8n Workflow JSON, Inngest TypeScript Durable Function, Docker Compose | Verified via Blueprint Modal |

---

### 5. Multi-Phase Delivery Plan (Turnkey 58 Hours)
- **Phase 0 (Completed & Live Now — $0.00)**: Interactive SaaS cockpit, USAC Form 470 dataset, transparent scoring engine with breakdown, public procurement database with organization search, and live AI spec extraction.
- **Phase 1 (Data Ingestion & Socrata Sync)**: Official USAC Socrata API integration, automated nightly sync, state portal connectors (Texas DIR, OK OMES), S3/Supabase document storage.
- **Phase 2 (Document Extraction Pipeline)**: PDF OCR & parsing engine, addenda change detection, equipment table structured extraction with dual-AI verification.
- **Phase 3 (Enterprise Admin & Alerts)**: Multi-user role-based access (Sales AE, Proposal Writer, Admin), email/Slack alerts on new ≥85 match RFPs, export to Excel/CSV.
- **Phase 4 (Production Deployment & Training)**: Vercel/AWS production hardening, database indexing, administrative documentation, and 30-day hypercare warranty.
