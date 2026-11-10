"use client";

import React from "react";
import { BarChart3 } from "lucide-react";
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

  return (
    <div className="bg-cardbg rounded-xl p-6 border border-borderbg shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-borderbg gap-2">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" /> Executive Financial Breakdown &amp; Unit Economics
          </h2>
          <p className="text-xs text-slate-400">
            Granular breakdown of revenue engines, efficiency metrics, and annual run-rate potential.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-md border border-slate-700">
            160 hrs/mo basis
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Projections Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[11px] uppercase bg-slate-900/90 text-slate-400 border-b border-slate-800 font-semibold">
            <tr>
              <th scope="col" className="px-4 py-3 rounded-l-lg">Revenue Engine</th>
              <th scope="col" className="px-4 py-3">Headcount</th>
              <th scope="col" className="px-4 py-3">Capacity / Month</th>
              <th scope="col" className="px-4 py-3">Monthly Revenue</th>
              <th scope="col" className="px-4 py-3">Annualized (12 mo)</th>
              <th scope="col" className="px-4 py-3 rounded-r-lg">% of Total</th>
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
                  : "0"}%
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
                  : "0"}%
              </td>
            </tr>
            <tr className="bg-slate-900/60 font-bold text-white">
              <td className="px-4 py-3.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Total Combined Output
              </td>
              <td className="px-4 py-3.5">{metrics.revenueEarningCount} billable</td>
              <td className="px-4 py-3.5">-</td>
              <td className="px-4 py-3.5 text-emerald-400 text-sm">
                ${formatNumber(metrics.totalProjectedRevenue)}
              </td>
              <td className="px-4 py-3.5 text-blue-400 text-sm">
                ${formatNumber(metrics.totalProjectedRevenue * 12)}
              </td>
              <td className="px-4 py-3.5 text-slate-300">100.0%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
