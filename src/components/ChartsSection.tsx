"use client";

import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  BarController,
  TooltipItem,
} from "chart.js";
import { PieChart, Laptop, Network } from "lucide-react";
import { OrgState, CalculatedMetrics } from "@/types";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  BarController
);

interface ChartsSectionProps {
  state: OrgState;
  metrics: CalculatedMetrics;
}

export const ChartsSection: React.FC<ChartsSectionProps> = ({ state, metrics }) => {
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const techCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const opsCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const mainChartInstance = useRef<ChartJS | null>(null);
  const techChartInstance = useRef<ChartJS | null>(null);
  const opsChartInstance = useRef<ChartJS | null>(null);

  // Initialize and update Main Distribution Chart
  useEffect(() => {
    if (!mainCanvasRef.current) return;

    if (!mainChartInstance.current) {
      const ctx = mainCanvasRef.current.getContext("2d");
      if (!ctx) return;

      mainChartInstance.current = new ChartJS(ctx, {
        type: "doughnut",
        data: {
          labels: ["Hiring (Fixed ROI)", "Core Tech Production", "Ops & Overhead"],
          datasets: [
            {
              data: [state.hiring, metrics.totalTech, metrics.totalOps],
              backgroundColor: ["#10b981", "#6366f1", "#f59e0b"],
              borderWidth: 2,
              borderColor: "#151e32",
              hoverOffset: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#94a3b8",
                boxWidth: 12,
                padding: 14,
                font: { family: "Inter", size: 11 },
              },
            },
            tooltip: {
              backgroundColor: "#0f172a",
              titleColor: "#f8fafc",
              bodyColor: "#cbd5e1",
              borderColor: "#334155",
              borderWidth: 1,
              padding: 10,
              boxPadding: 4,
              callbacks: {
                label: function (context: TooltipItem<"doughnut">) {
                  const dataArr = context.dataset.data as number[];
                  const total = dataArr.reduce((a, b) => a + b, 0);
                  const val = context.raw as number;
                  const pct = total > 0 ? ((val / total) * 100).toFixed(1) : "0";
                  return ` ${context.label}: ${val} members (${pct}%)`;
                },
              },
            },
          },
          cutout: "70%",
        },
      });
    } else {
      mainChartInstance.current.data.datasets[0].data = [
        state.hiring,
        metrics.totalTech,
        metrics.totalOps,
      ];
      mainChartInstance.current.update();
    }

    return () => {
      // Clean up on component unmount
    };
  }, [state.hiring, metrics.totalTech, metrics.totalOps]);

  // Initialize and update Tech Breakdown Chart
  useEffect(() => {
    if (!techCanvasRef.current) return;

    if (!techChartInstance.current) {
      const ctx = techCanvasRef.current.getContext("2d");
      if (!ctx) return;

      techChartInstance.current = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: ["Custom Dev", "Design", "Mobile", "WordPress"],
          datasets: [
            {
              label: "Team Size",
              data: [state.custom, state.design, state.mobile, state.wordpress],
              backgroundColor: ["#6366f1", "#ec4899", "#14b8a6", "#3b82f6"],
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#0f172a",
              titleColor: "#f8fafc",
              bodyColor: "#cbd5e1",
              borderColor: "#334155",
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: (context: TooltipItem<"bar">) => ` Headcount: ${context.raw} devs`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#94a3b8", font: { family: "Inter", size: 11 } },
            },
            y: {
              grid: { color: "#26354f" },
              ticks: { color: "#94a3b8", font: { family: "Inter", size: 11 }, precision: 0 },
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      techChartInstance.current.data.datasets[0].data = [
        state.custom,
        state.design,
        state.mobile,
        state.wordpress,
      ];
      techChartInstance.current.update();
    }
  }, [state.custom, state.design, state.mobile, state.wordpress]);

  // Initialize and update Operations Breakdown Chart
  useEffect(() => {
    if (!opsCanvasRef.current) return;

    if (!opsChartInstance.current) {
      const ctx = opsCanvasRef.current.getContext("2d");
      if (!ctx) return;

      opsChartInstance.current = new ChartJS(ctx, {
        type: "doughnut",
        data: {
          labels: ["Project Mgmt (PM)", "Sales", "Business Analysts (BA)", "HR", "Accounts"],
          datasets: [
            {
              data: [
                state.pm,
                metrics.sales,
                state.ba,
                metrics.hr,
                metrics.accounts,
              ],
              backgroundColor: ["#f59e0b", "#06b6d4", "#f97316", "#a855f7", "#64748b"],
              borderWidth: 2,
              borderColor: "#151e32",
              hoverOffset: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#94a3b8",
                boxWidth: 10,
                padding: 10,
                font: { family: "Inter", size: 10 },
              },
            },
            tooltip: {
              backgroundColor: "#0f172a",
              titleColor: "#f8fafc",
              bodyColor: "#cbd5e1",
              borderColor: "#334155",
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: function (context: TooltipItem<"doughnut">) {
                  const dataArr = context.dataset.data as number[];
                  const total = dataArr.reduce((a, b) => a + b, 0);
                  const val = context.raw as number;
                  const pct = total > 0 ? ((val / total) * 100).toFixed(1) : "0";
                  return ` ${context.label}: ${val} (${pct}%)`;
                },
              },
            },
          },
          cutout: "65%",
        },
      });
    } else {
      opsChartInstance.current.data.datasets[0].data = [
        state.pm,
        metrics.sales,
        state.ba,
        metrics.hr,
        metrics.accounts,
      ];
      opsChartInstance.current.update();
    }
  }, [state.pm, metrics.sales, state.ba, metrics.hr, metrics.accounts]);

  // Clean up all charts on unmount
  useEffect(() => {
    return () => {
      mainChartInstance.current?.destroy();
      techChartInstance.current?.destroy();
      opsChartInstance.current?.destroy();
    };
  }, []);

  // Calculate percentage of tech team for legend label
  const customPct = metrics.totalTech > 0 ? ((state.custom / metrics.totalTech) * 100).toFixed(1) : "0";
  const designPct = metrics.totalTech > 0 ? ((state.design / metrics.totalTech) * 100).toFixed(1) : "0";
  const mobilePct = metrics.totalTech > 0 ? ((state.mobile / metrics.totalTech) * 100).toFixed(1) : "0";
  const wpPct = metrics.totalTech > 0 ? ((state.wordpress / metrics.totalTech) * 100).toFixed(1) : "0";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* High Level Allocation Donut Chart */}
      <div className="bg-cardbg rounded-xl p-5 border border-borderbg shadow-sm flex flex-col justify-between hover:border-slate-600 transition">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" /> High-Level Distribution
            </h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 font-medium">
              3 Core Pillars
            </span>
          </div>
          <div className="relative h-64 flex items-center justify-center">
            <canvas ref={mainCanvasRef} />
          </div>
        </div>
        <div className="mt-4 pt-3.5 border-t border-slate-700/60 text-xs text-slate-400 flex justify-between items-center">
          <span>Fixed Revenue vs Variable Dev vs Overhead</span>
          <span className="text-blue-400 font-semibold">{metrics.revPct}% Billable</span>
        </div>
      </div>

      {/* Core Production Breakdown Bar Chart */}
      <div className="bg-cardbg rounded-xl p-5 border border-borderbg shadow-sm flex flex-col justify-between hover:border-slate-600 transition">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Laptop className="w-4 h-4 text-indigo-400" /> Tech Team Breakdown
            </h2>
            <span className="text-xs bg-slate-800 text-indigo-300 px-2.5 py-1 rounded-md border border-slate-700 font-semibold">
              {metrics.totalTech} Devs
            </span>
          </div>
          <div className="relative h-64">
            <canvas ref={techCanvasRef} />
          </div>
        </div>
        <div className="mt-4 pt-3.5 border-t border-slate-700/60 text-[11px] text-slate-400 flex flex-wrap justify-between items-center gap-1">
          <span>Custom ({customPct}%), Design ({designPct}%), Mobile ({mobilePct}%), WP ({wpPct}%)</span>
        </div>
      </div>

      {/* Operations Breakdown Donut Chart */}
      <div className="bg-cardbg rounded-xl p-5 border border-borderbg shadow-sm flex flex-col justify-between hover:border-slate-600 transition">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Network className="w-4 h-4 text-amber-400" /> Operations &amp; Mgmt
            </h2>
            <span className="text-xs bg-slate-800 text-amber-300 px-2.5 py-1 rounded-md border border-slate-700 font-semibold">
              {metrics.totalOps} Overhead
            </span>
          </div>
          <div className="relative h-64 flex items-center justify-center">
            <canvas ref={opsCanvasRef} />
          </div>
        </div>
        <div className="mt-4 pt-3.5 border-t border-slate-700/60 text-xs text-slate-400 flex justify-between items-center">
          <span>Non-billable execution &amp; support staff</span>
          <span className="text-amber-400 font-semibold">{metrics.opsPct}% Total</span>
        </div>
      </div>
    </div>
  );
};
