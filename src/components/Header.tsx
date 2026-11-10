"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  SlidersHorizontal,
  RefreshCw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Printer,
} from "lucide-react";
import { CalculatedMetrics, OrgState } from "@/types";
import { formatNumber } from "@/utils/calculations";

interface HeaderProps {
  totalHeadcount: number;
  metrics: CalculatedMetrics;
  state: OrgState;
  onReset: () => void;
  activePreset: string;
  onSelectPreset: (preset: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalHeadcount,
  metrics,
  state,
  onReset,
  activePreset,
  onSelectPreset,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleCopySummary = () => {
    const summary = `📊 IT Resource & ROI Executive Summary
• Total Workforce: ${totalHeadcount} Members (100% capacity)
• Revenue Generating: ${metrics.revenueEarningCount} (${metrics.revPct}%) [${state.hiring} Fixed Dedicated + ${metrics.totalTech} Core Tech]
• Overhead & Support: ${metrics.totalOps} (${metrics.opsPct}%) [PM: ${state.pm}, BA: ${state.ba}, Sales/Ops: ${metrics.sales + metrics.hrAcc}]
• Dev-to-Management Ratio: ${metrics.devToMgmtRatio}:1
• Estimated Monthly Revenue: $${formatNumber(metrics.totalProjectedRevenue)} / mo
• Annualized Run-Rate: $${formatNumber(metrics.totalProjectedRevenue * 12)} / yr
• Parameters: $${state.hourlyRate}/hr billing rate | ${state.utilization}% tech utilization | $${formatNumber(state.fixedRevenuePerMember)}/mo retainer`;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <header className="border-b border-borderbg bg-cardbg/80 backdrop-blur-md sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/25 ring-1 ring-white/20">
            <PieChart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                IT Resource &amp; ROI Executive Center
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <span>Total Org Strength:</span>
              <span className="font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {totalHeadcount} Members
              </span>
            </p>
          </div>
        </div>

        {/* Status Pill & Scenarios */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Preset Buttons for Quick Presentation Demonstration */}
          <div className="hidden lg:flex items-center bg-slate-900/80 p-1 rounded-lg border border-slate-800 text-xs text-slate-300">
            <span className="px-2 text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Scenarios:
            </span>
            <button
              onClick={() => onSelectPreset("baseline")}
              className={`px-2.5 py-1 rounded transition text-xs font-medium ${
                activePreset === "baseline"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:text-white hover:bg-slate-800"
              }`}
            >
              Baseline (83)
            </button>
            <button
              onClick={() => onSelectPreset("expansion")}
              className={`px-2.5 py-1 rounded transition text-xs font-medium ${
                activePreset === "expansion"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:text-white hover:bg-slate-800"
              }`}
            >
              Expansion (+25%)
            </button>
            <button
              onClick={() => onSelectPreset("highMargin")}
              className={`px-2.5 py-1 rounded transition text-xs font-medium ${
                activePreset === "highMargin"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "hover:text-white hover:bg-slate-800"
              }`}
            >
              High Margin
            </button>
            <button
              onClick={onReset}
              title="Reset all values to default"
              className="px-2 py-1 text-slate-400 hover:text-white transition ml-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Copy Summary Button */}
          <button
            onClick={handleCopySummary}
            title="Copy Executive Summary to Clipboard"
            className="text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-1.5 transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Copy Brief</span>
              </>
            )}
          </button>

          {/* Print / Export Button */}
          <button
            onClick={handlePrint}
            title="Export / Print Dashboard"
            className="text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white p-1.5 rounded-lg border border-slate-800 transition hidden sm:flex items-center justify-center"
          >
            <Printer className="w-4 h-4 text-slate-400" />
          </button>

          {/* Fullscreen Presentation Mode Button */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Presentation Mode"}
            className="text-xs bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white p-1.5 rounded-lg border border-slate-800 transition flex items-center justify-center"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4 text-blue-400" />
            ) : (
              <Maximize2 className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Active Model Indicator */}
          <div className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 font-medium flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold hidden sm:inline">Dynamic Model</span> Active
          </div>
        </div>
      </div>
    </header>
  );
};
