"use client";

import React from "react";
import {
  Network,
  Building,
  UserCheck,
  Code,
  Palette,
  Smartphone,
  Globe,
  ListChecks,
  TrendingUp,
  LineChart,
  UsersRound,
} from "lucide-react";
import { OrgState, CalculatedMetrics } from "@/types";

interface OrganogramTreeProps {
  state: OrgState;
  metrics: CalculatedMetrics;
}

export const OrganogramTree: React.FC<OrganogramTreeProps> = ({ state, metrics }) => {
  return (
    <div className="bg-cardbg rounded-xl p-6 border border-borderbg shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-borderbg gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-400" /> Visual Organizational Structure
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive hierarchy tree mapping out total org resource allocation and operational reporting lines.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2.5 py-1 rounded-md font-medium">
            Fixed ROI ({state.hiring})
          </span>
          <span className="text-[11px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 px-2.5 py-1 rounded-md font-medium">
            Core Production ({metrics.totalTech})
          </span>
          <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/25 px-2.5 py-1 rounded-md font-medium">
            Overhead / Ops ({metrics.totalOps})
          </span>
        </div>
      </div>

      {/* Organogram Tree Display */}
      <div className="overflow-x-auto custom-scrollbar py-3">
        <div className="min-w-[760px] flex flex-col items-center">
          {/* Root Node */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-xl shadow-blue-500/15 border border-blue-400/30 flex items-center gap-2.5 transform hover:scale-105 transition-transform">
            <Building className="w-4 h-4 text-white" />
            <span>Executive Leadership &amp; Org Root ({metrics.totalHeadcount})</span>
          </div>

          {/* Connector Line Down */}
          <div className="w-0.5 h-6 bg-slate-600"></div>

          {/* Horizontal Connector Bar */}
          <div className="w-[82%] h-0.5 bg-slate-600 relative">
            <div className="absolute left-0 -top-1 w-2 h-2 rounded-full bg-slate-500"></div>
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-slate-500"></div>
            <div className="absolute right-0 -top-1 w-2 h-2 rounded-full bg-slate-500"></div>
          </div>

          {/* 3 Pillar Columns */}
          <div className="w-full grid grid-cols-3 gap-5 pt-6">
            {/* Pillar 1: Dedicated Hiring */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-slate-600 -mt-6"></div>
              <div className="w-full bg-slate-900/90 border border-emerald-500/40 p-4 rounded-xl text-center shadow-lg hover:border-emerald-500 transition-colors">
                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Hiring / Fixed ROI
                </div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  {state.hiring}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Dedicated Client Resources
                </div>
              </div>

              {/* Sub items */}
              <div className="w-full mt-3 space-y-2">
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Client Dedicated Team
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {state.hiring}
                  </span>
                </div>
              </div>
            </div>

            {/* Pillar 2: Core Production */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-slate-600 -mt-6"></div>
              <div className="w-full bg-slate-900/90 border border-indigo-500/40 p-4 rounded-xl text-center shadow-lg hover:border-indigo-500 transition-colors">
                <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  Core Production
                </div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  {metrics.totalTech}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Billable Technical Delivery
                </div>
              </div>

              {/* Sub items grid */}
              <div className="w-full mt-3 space-y-2">
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Code className="w-3.5 h-3.5 text-indigo-400" /> Custom Dev
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {state.custom}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Palette className="w-3.5 h-3.5 text-pink-400" /> Design Team
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {state.design}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Smartphone className="w-3.5 h-3.5 text-teal-400" /> Mobile Apps
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {state.mobile}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <Globe className="w-3.5 h-3.5 text-blue-400" /> WordPress &amp; Web
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {state.wordpress}
                  </span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Operations & Overhead */}
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-slate-600 -mt-6"></div>
              <div className="w-full bg-slate-900/90 border border-amber-500/40 p-4 rounded-xl text-center shadow-lg hover:border-amber-500 transition-colors">
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Operations &amp; Mgmt
                </div>
                <div className="text-2xl font-extrabold text-white mt-1">
                  {metrics.totalOps}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Non-Billable Governance
                </div>
              </div>

              {/* Sub items grid */}
              <div className="w-full mt-3 space-y-2">
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <ListChecks className="w-3.5 h-3.5 text-amber-400" /> Project Managers
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {state.pm}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <LineChart className="w-3.5 h-3.5 text-cyan-400" /> Sales &amp; Business Dev
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {metrics.sales}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-orange-400" /> Business Analysts
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {state.ba}
                  </span>
                </div>
                <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-xs flex justify-between items-center hover:bg-slate-800 transition">
                  <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                    <UsersRound className="w-3.5 h-3.5 text-purple-400" /> HR &amp; Accounts
                  </span>
                  <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700/70">
                    {metrics.hrAcc}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
