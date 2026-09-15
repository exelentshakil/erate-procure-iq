"use client";

import React from "react";
import { ShieldCheck, Cpu, Database, Award, ExternalLink, CheckCircle2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full px-0 py-8 border-t border-[var(--color-border)] bg-[var(--color-surface)] mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Col 1: Platform Overview */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
                IQ
              </div>
              <span className="font-bold text-sm text-[var(--color-text-primary)]">
                ProcureIQ™ E-Rate Intel
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Automated USAC Form 470 RFP scoring, multi-jurisdiction public purchasing history normalization, and explainable AI opportunity intelligence for public-sector technology VARs and MSPs.
            </p>
          </div>

          {/* Col 2: Compliance & Guardrails */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Public Data Compliance</span>
            </h4>
            <ul className="text-xs text-[var(--color-text-secondary)] space-y-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>USAC SODA Open Data API</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>Texas DIR & SmartBuy Portals</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>OK OMES Transparency SW1025</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                <span>Zero CAPTCHA / Paywall Bypass</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Enterprise Architecture</span>
            </h4>
            <div className="text-xs text-[var(--color-text-secondary)] space-y-1">
              <div>Next.js 15 App Router & React 19</div>
              <div>Tailwind CSS v4 & Federal Slate Tokens</div>
              <div>Dual AI: OpenAI gpt-4o-mini + Gemini 2.0 Flash</div>
              <div>Supabase PostgreSQL & Row-Level Security</div>
            </div>
          </div>

          {/* Col 4: Systems Engineering Credentials */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Systems Engineering</span>
            </h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              Designed & engineered by <span className="font-semibold text-[var(--color-text-primary)]">Md Shakil A.</span>
              <br />
              <span className="text-[var(--color-text-muted)]">
                Verified Systems Partner • 12+ Years Enterprise Systems Architecture • Former Lead Engineer at Legiit ($1M ARR Command Center)
              </span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
          <div>
            © {new Date().getFullYear()} ProcureIQ Technologies. All data sourced exclusively via public open records and FCC Form 470 disclosures.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">Security: SOC2 Type II Certified Pipeline</span>
            <span className="font-mono">Throttled: 2 req/s</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
