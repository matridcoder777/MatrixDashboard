"use client";

import React, { useState } from "react";
import {
  Sliders,
  Code2,
  Briefcase,
  Calculator,
  TrendingUp,
  Percent,
  WalletCards,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { OrgState, CalculatedMetrics } from "@/types";
import { formatNumber } from "@/utils/calculations";

interface SimulatorControlsProps {
  state: OrgState;
  metrics: CalculatedMetrics;
  onChange: <K extends keyof OrgState>(key: K, value: OrgState[K]) => void;
}

export const SimulatorControls: React.FC<SimulatorControlsProps> = ({
  state,
  metrics,
  onChange,
}) => {
  const [showCostModel, setShowCostModel] = useState(false);

  const isProfitable = metrics.netProfit >= 0;

  return (
    <div className="bg-cardbg rounded-xl p-6 border border-borderbg shadow-xl">
      {/* Top Banner with Projected Revenue and Net Profit */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-5 mb-6 border-b border-borderbg gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-blue-400" /> Interactive Team &amp; ROI Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Adjust team headcounts, billing assumptions, and payroll costs to forecast monthly revenue, net profit, and profit margins.
          </p>
        </div>

        {/* Financial Highlights Pills */}
        <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
          {/* Revenue Box */}
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl px-4 py-2.5 text-right flex-1 sm:flex-initial shadow-lg">
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
              Monthly Revenue
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 tracking-tight flex items-center justify-end gap-1">
              <span>${formatNumber(metrics.totalProjectedRevenue)}</span>
              <span className="text-xs font-normal text-slate-400">/ mo</span>
            </div>
            <span className="text-[10px] text-emerald-500/90 font-medium block">
              ${formatNumber(metrics.totalProjectedRevenue * 12)} / yr
            </span>
          </div>

          {/* Net Profit Box */}
          <div
            className={`border rounded-xl px-4 py-2.5 text-right flex-1 sm:flex-initial shadow-lg ${
              isProfitable
                ? "bg-emerald-950/20 border-emerald-500/40"
                : "bg-red-950/20 border-red-500/40"
            }`}
          >
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400 block">
              Net Profit ({metrics.netMarginPct}% margin)
            </span>
            <div
              className={`text-xl sm:text-2xl font-extrabold tracking-tight flex items-center justify-end gap-1 ${
                isProfitable ? "text-emerald-300" : "text-red-400"
              }`}
            >
              <span>${formatNumber(metrics.netProfit)}</span>
              <span className="text-xs font-normal text-slate-400">/ mo</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Cost: ${formatNumber(metrics.totalCost)} / mo
            </span>
          </div>
        </div>
      </div>

      {/* 3 Main Input Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Column 1: Core Tech Inputs */}
        <div className="space-y-4 bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" /> Core Tech Team
            </h3>
            <span className="text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded">
              {metrics.totalTech} Devs Total
            </span>
          </div>

          {/* Custom Devs */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">Custom Devs</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.custom}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={state.custom}
              onChange={(e) => onChange("custom", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1</span>
              <span>40</span>
            </div>
          </div>

          {/* Designers */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">Designers</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.design}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={state.design}
              onChange={(e) => onChange("design", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1</span>
              <span>25</span>
            </div>
          </div>

          {/* Mobile Devs */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">Mobile Devs</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.mobile}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={state.mobile}
              onChange={(e) => onChange("mobile", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1</span>
              <span>25</span>
            </div>
          </div>

          {/* WordPress Devs */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">WordPress Devs</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.wordpress}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={state.wordpress}
              onChange={(e) => onChange("wordpress", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1</span>
              <span>20</span>
            </div>
          </div>
        </div>

        {/* Column 2: Hiring & Ops Inputs */}
        <div className="space-y-4 bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Fixed ROI &amp; Ops
            </h3>
            <span className="text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
              {state.hiring + metrics.totalOps} Headcount
            </span>
          </div>

          {/* Hiring / Dedicated */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">Dedicated Hiring (Fixed ROI)</span>
              <span className="font-bold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.hiring}
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={70}
              value={state.hiring}
              onChange={(e) => onChange("hiring", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10</span>
              <span>70</span>
            </div>
          </div>

          {/* Project Managers */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">Project Managers (PM)</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.pm}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={state.pm}
              onChange={(e) => onChange("pm", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1</span>
              <span>15</span>
            </div>
          </div>

          {/* Business Analysts */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">Business Analysts (BA)</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.ba}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={state.ba}
              onChange={(e) => onChange("ba", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          {/* Other Ops */}
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1.5">
              <span className="font-medium">Sales / HR / Accounts</span>
              <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                {state.otherOps}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              value={state.otherOps}
              onChange={(e) => onChange("otherOps", Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>1</span>
              <span>15</span>
            </div>
          </div>
        </div>

        {/* Column 3: Billing & Financial Parameters */}
        <div className="space-y-4 bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Calculator className="w-4 h-4" /> Rates &amp; Utilization
              </h3>
              <span className="text-[11px] font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                Financials
              </span>
            </div>

            {/* Hourly Rate */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-medium">Avg Hourly Billing Rate</span>
                <span className="font-bold text-blue-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  ${state.hourlyRate} / hr
                </span>
              </div>
              <input
                type="range"
                min={15}
                max={80}
                step={1}
                value={state.hourlyRate}
                onChange={(e) => onChange("hourlyRate", Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$15</span>
                <span>$80</span>
              </div>
            </div>

            {/* Utilization */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-medium">Avg Tech Utilization</span>
                <span className="font-bold text-blue-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {state.utilization}%
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={100}
                step={5}
                value={state.utilization}
                onChange={(e) => onChange("utilization", Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Fixed Revenue Per Member */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-medium">Fixed Rev / Dedicated Tech</span>
                <span className="font-bold text-blue-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  ${formatNumber(state.fixedRevenuePerMember)} / mo
                </span>
              </div>
              <input
                type="range"
                min={1500}
                max={8000}
                step={250}
                value={state.fixedRevenuePerMember}
                onChange={(e) => onChange("fixedRevenuePerMember", Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$1,500</span>
                <span>$8,000</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Badges in Column 3 */}
          <div className="pt-2 space-y-2">
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-400" /> Effective Billable Ratio:
              </span>
              <span className="font-bold text-emerald-400 text-sm">{metrics.revPct}%</span>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-lg border border-slate-700 flex justify-between items-center text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> Variable Tech Monthly:
              </span>
              <span className="font-bold text-white text-sm">
                ${formatNumber(metrics.variableTechRevenue)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Cost & Margin Analysis Section */}
      <div className="mt-6 pt-4 border-t border-slate-800">
        <button
          onClick={() => setShowCostModel(!showCostModel)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-300 hover:text-white py-2 px-3 rounded-lg bg-slate-900/40 hover:bg-slate-900 transition border border-slate-800/80"
        >
          <span className="flex items-center gap-2">
            <WalletCards className="w-4 h-4 text-emerald-400" />
            <span>Cost &amp; Profit Margin Assumptions (Payroll &amp; Overhead)</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span>{showCostModel ? "Hide Cost Controls" : "Adjust Cost & Margin"}</span>
            {showCostModel ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </button>

        {showCostModel && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-5 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
            {/* Dev Salary / Cost */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-medium">Avg Developer Monthly Cost</span>
                <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  ${formatNumber(state.avgDevCost)} / mo
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={5000}
                step={100}
                value={state.avgDevCost}
                onChange={(e) => onChange("avgDevCost", Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$1,000</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Ops Salary / Cost */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-medium">Avg Ops &amp; Mgmt Monthly Cost</span>
                <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  ${formatNumber(state.avgOpsCost)} / mo
                </span>
              </div>
              <input
                type="range"
                min={800}
                max={4000}
                step={100}
                value={state.avgOpsCost}
                onChange={(e) => onChange("avgOpsCost", Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$800</span>
                <span>$4,000</span>
              </div>
            </div>

            {/* Fixed Facilities & Infra */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="font-medium">Fixed Infra &amp; Facility Overhead</span>
                <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  ${formatNumber(state.overheadInfraCost)} / mo
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={20000}
                step={500}
                value={state.overheadInfraCost}
                onChange={(e) => onChange("overheadInfraCost", Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$1,000</span>
                <span>$20,000</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
