"use client";

import React from "react";
import { Users, Coins, ShieldCheck, GitPullRequest } from "lucide-react";
import { CalculatedMetrics, OrgState } from "@/types";

interface MetricCardsProps {
  metrics: CalculatedMetrics;
  state: OrgState;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics, state }) => {
  const mgmtCount = state.pm + state.ba;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Headcount */}
      <div className="bg-cardbg rounded-xl p-5 border border-borderbg shadow-sm relative overflow-hidden group hover:border-blue-500/60 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Workforce
          </span>
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {metrics.totalHeadcount}
          </span>
          <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            100% capacity
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2 flex items-center justify-between">
          <span>Core Tech + Dedicated + Ops</span>
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Card 2: Revenue Earning (Billable / Fixed ROI) */}
      <div className="bg-cardbg rounded-xl p-5 border border-borderbg shadow-sm relative overflow-hidden group hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Revenue Generating
          </span>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
            <Coins className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {metrics.revenueEarningCount}
          </span>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {metrics.revPct}%
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {state.hiring} Fixed Hiring + {metrics.totalTech} Core Tech
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Card 3: Non-Billable Overhead */}
      <div className="bg-cardbg rounded-xl p-5 border border-borderbg shadow-sm relative overflow-hidden group hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Overhead &amp; Support
          </span>
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {metrics.totalOps}
          </span>
          <span className="text-xs text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            {metrics.opsPct}%
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2 truncate">
          PM, Sales, BA, HR &amp; Accounts
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>

      {/* Card 4: Dev-to-Management Ratio */}
      <div className="bg-cardbg rounded-xl p-5 border border-borderbg shadow-sm relative overflow-hidden group hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            PM &amp; BA Span
          </span>
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
            <GitPullRequest className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {metrics.devToMgmtRatio}:1
          </span>
          <span className="text-xs text-purple-400 font-semibold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
            Devs per Mgmt
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {metrics.totalTech} Devs / {mgmtCount} Mgmt ({state.pm} PM + {state.ba} BA)
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
};
