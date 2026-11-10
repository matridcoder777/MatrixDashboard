"use client";

import React from "react";
import { BarChart3, TrendingUp, DollarSign, Wallet, ShieldCheck } from "lucide-react";
import { OrgState, CalculatedMetrics } from "@/types";
import { formatNumber } from "@/utils/calculations";

interface FinancialSummaryTableProps {
  state: OrgState;
  metrics: CalculatedMetrics;
}

export const FinancialSummaryTable: React.FC<FinancialSummaryTableProps> = ({
  state,
  metrics,
}) => {
  const avgRevPerEmployee =
    metrics.totalHeadcount > 0
      ? Math.round(metrics.totalProjectedRevenue / metrics.totalHeadcount)
      : 0;

  const avgRevPerBillable =
    metrics.revenueEarningCount > 0
      ? Math.round(metrics.totalProjectedRevenue / metrics.revenueEarningCount)
      : 0;

  const isProfitable = metrics.netProfit >= 0;

  return (
    <div className="bg-cardbg rounded-xl p-6 border border-borderbg shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-borderbg gap-2">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" /> Executive Financial Breakdown &amp; Unit Economics
          </h2>
          <p className="text-xs text-slate-400">
            Granular breakdown of revenue engines, operating delivery costs, and net margin profitability.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-700">
            160 hrs/mo basis
          </span>
        </div>
      </div>

      {/* 4 Revenue Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
            Fixed Retainer Stream
          </span>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            ${formatNumber(metrics.fixedHiringRevenue)}
            <span className="text-xs font-normal text-slate-400"> / mo</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {state.hiring} dedicated staff @ ${formatNumber(state.fixedRevenuePerMember)}/mo
          </span>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
            Variable Tech Stream
          </span>
          <div className="text-xl font-bold text-indigo-400 mt-1">
            ${formatNumber(metrics.variableTechRevenue)}
            <span className="text-xs font-normal text-slate-400"> / mo</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {metrics.totalTech} devs @ ${state.hourlyRate}/hr ({state.utilization}% util)
          </span>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
            Avg Yield / Org Head
          </span>
          <div className="text-xl font-bold text-white mt-1">
            ${formatNumber(avgRevPerEmployee)}
            <span className="text-xs font-normal text-slate-400"> / mo</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Blended across all {metrics.totalHeadcount} team members
          </span>
        </div>

        <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
          <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider block">
            Avg Yield / Billable Head
          </span>
          <div className="text-xl font-bold text-cyan-400 mt-1">
            ${formatNumber(avgRevPerBillable)}
            <span className="text-xs font-normal text-slate-400"> / mo</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Excludes {metrics.totalOps} overhead staff members
          </span>
        </div>
      </div>

      {/* Profitability & Margin Summary Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Total Monthly Operating Cost
            </span>
            <div className="text-lg font-bold text-slate-200 mt-0.5">
              ${formatNumber(metrics.totalCost)} / mo
            </div>
            <span className="text-[11px] text-slate-400">
              Devs: ${formatNumber(metrics.totalDevCost)} | Ops: ${formatNumber(metrics.totalOpsCost)}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800 text-slate-400">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        <div
          className={`p-4 rounded-xl border flex items-center justify-between ${
            isProfitable
              ? "bg-emerald-950/20 border-emerald-500/30"
              : "bg-red-950/20 border-red-500/30"
          }`}
        >
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Net Operating Profit (EBITDA)
            </span>
            <div
              className={`text-lg font-bold mt-0.5 ${
                isProfitable ? "text-emerald-400" : "text-red-400"
              }`}
            >
              ${formatNumber(metrics.netProfit)} / mo
            </div>
            <span className="text-[11px] text-slate-400">
              ${formatNumber(metrics.netProfit * 12)} / yr annualized
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              Net Profit Margin
            </span>
            <div
              className={`text-lg font-bold mt-0.5 ${
                isProfitable ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {metrics.netMarginPct}%
            </div>
            <span className="text-[11px] text-slate-400">
              {isProfitable ? "Healthy operational margin" : "Deficit - adjust rates/capacity"}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Projections Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[11px] uppercase bg-slate-900/90 text-slate-400 border-b border-slate-800 font-semibold">
            <tr>
              <th scope="col" className="px-4 py-3 rounded-l-lg">Financial Category</th>
              <th scope="col" className="px-4 py-3">Headcount / Scope</th>
              <th scope="col" className="px-4 py-3">Unit Basis</th>
              <th scope="col" className="px-4 py-3">Monthly Yield</th>
              <th scope="col" className="px-4 py-3">Annual Run-Rate</th>
              <th scope="col" className="px-4 py-3 rounded-r-lg">Share / Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr className="hover:bg-slate-900/40 transition">
              <td className="px-4 py-3.5 font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Fixed Hiring / Dedicated Teams
              </td>
              <td className="px-4 py-3.5">{state.hiring} members</td>
              <td className="px-4 py-3.5">Dedicated SLA</td>
              <td className="px-4 py-3.5 font-bold text-emerald-400">
                ${formatNumber(metrics.fixedHiringRevenue)}
              </td>
              <td className="px-4 py-3.5">
                ${formatNumber(metrics.fixedHiringRevenue * 12)}
              </td>
              <td className="px-4 py-3.5 text-slate-400">
                {metrics.totalProjectedRevenue > 0
                  ? ((metrics.fixedHiringRevenue / metrics.totalProjectedRevenue) * 100).toFixed(1)
                  : "0"}% Rev
              </td>
            </tr>
            <tr className="hover:bg-slate-900/40 transition">
              <td className="px-4 py-3.5 font-semibold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                Core Production Delivery
              </td>
              <td className="px-4 py-3.5">{metrics.totalTech} devs</td>
              <td className="px-4 py-3.5">
                {formatNumber(metrics.totalTech * metrics.billableHoursPerMonth)} billable hrs
              </td>
              <td className="px-4 py-3.5 font-bold text-indigo-400">
                ${formatNumber(metrics.variableTechRevenue)}
              </td>
              <td className="px-4 py-3.5">
                ${formatNumber(metrics.variableTechRevenue * 12)}
              </td>
              <td className="px-4 py-3.5 text-slate-400">
                {metrics.totalProjectedRevenue > 0
                  ? ((metrics.variableTechRevenue / metrics.totalProjectedRevenue) * 100).toFixed(1)
                  : "0"}% Rev
              </td>
            </tr>
            <tr className="bg-slate-900/40 hover:bg-slate-900/60 transition text-slate-400">
              <td className="px-4 py-3.5 flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                Operating Delivery Cost
              </td>
              <td className="px-4 py-3.5">{metrics.totalHeadcount} total staff</td>
              <td className="px-4 py-3.5">Blended Payroll + Infra</td>
              <td className="px-4 py-3.5 font-bold text-red-400">
                -${formatNumber(metrics.totalCost)}
              </td>
              <td className="px-4 py-3.5 text-red-400">
                -${formatNumber(metrics.totalCost * 12)}
              </td>
              <td className="px-4 py-3.5 text-slate-400">
                {metrics.totalProjectedRevenue > 0
                  ? ((metrics.totalCost / metrics.totalProjectedRevenue) * 100).toFixed(1)
                  : "0"}% Cost
              </td>
            </tr>
            <tr className="bg-slate-900/90 font-bold text-white border-t-2 border-slate-700">
              <td className="px-4 py-3.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Net Operating Profit (EBITDA)
              </td>
              <td className="px-4 py-3.5">{metrics.revenueEarningCount} billable</td>
              <td className="px-4 py-3.5">Net Contribution</td>
              <td className={`px-4 py-3.5 text-sm ${isProfitable ? "text-emerald-400" : "text-red-400"}`}>
                ${formatNumber(metrics.netProfit)}
              </td>
              <td className={`px-4 py-3.5 text-sm ${isProfitable ? "text-blue-400" : "text-red-400"}`}>
                ${formatNumber(metrics.netProfit * 12)}
              </td>
              <td className={`px-4 py-3.5 ${isProfitable ? "text-emerald-400" : "text-red-400"}`}>
                {metrics.netMarginPct}% Net
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
