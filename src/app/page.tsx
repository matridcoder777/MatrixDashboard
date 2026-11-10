"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { MetricCards } from "@/components/MetricCards";
import { SimulatorControls } from "@/components/SimulatorControls";
import { OrganogramTree } from "@/components/OrganogramTree";
import { FinancialSummaryTable } from "@/components/FinancialSummaryTable";
import { DEFAULT_ORG_STATE, calculateMetrics } from "@/utils/calculations";
import { OrgState } from "@/types";

// Dynamically import ChartsSection with SSR disabled to prevent any canvas SSR hydration mismatch
const DynamicChartsSection = dynamic(
  () => import("@/components/ChartsSection").then((mod) => mod.ChartsSection),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-cardbg rounded-xl p-5 border border-borderbg h-80 flex items-center justify-center text-slate-500 text-sm animate-pulse">
          Loading charts...
        </div>
        <div className="bg-cardbg rounded-xl p-5 border border-borderbg h-80 flex items-center justify-center text-slate-500 text-sm animate-pulse">
          Loading charts...
        </div>
        <div className="bg-cardbg rounded-xl p-5 border border-borderbg h-80 flex items-center justify-center text-slate-500 text-sm animate-pulse">
          Loading charts...
        </div>
      </div>
    ),
  }
);

export default function DashboardPage() {
  const [state, setState] = useState<OrgState>(DEFAULT_ORG_STATE);
  const [activePreset, setActivePreset] = useState<string>("baseline");

  const metrics = useMemo(() => calculateMetrics(state), [state]);

  const handleStateChange = <K extends keyof OrgState>(key: K, value: OrgState[K]) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }));
    setActivePreset("custom");
  };

  const handleReset = () => {
    setState(DEFAULT_ORG_STATE);
    setActivePreset("baseline");
  };

  const handleSelectPreset = (preset: string) => {
    setActivePreset(preset);
    if (preset === "baseline") {
      setState(DEFAULT_ORG_STATE);
    } else if (preset === "expansion") {
      setState({
        ...DEFAULT_ORG_STATE,
        custom: 20,
        design: 10,
        mobile: 8,
        wordpress: 6,
        hiring: 45,
        pm: 5,
        ba: 3,
        otherOps: 8,
        hourlyRate: 28,
        utilization: 82,
        fixedRevenuePerMember: 3200,
      });
    } else if (preset === "highMargin") {
      setState({
        ...DEFAULT_ORG_STATE,
        custom: 16,
        design: 8,
        mobile: 8,
        wordpress: 4,
        hiring: 40,
        pm: 4,
        ba: 2,
        otherOps: 6,
        hourlyRate: 35,
        utilization: 85,
        fixedRevenuePerMember: 3800,
      });
    }
  };

  return (
    <div className="min-h-screen bg-darkbg text-slate-100 flex flex-col">
      <Header
        totalHeadcount={metrics.totalHeadcount}
        metrics={metrics}
        state={state}
        onReset={handleReset}
        activePreset={activePreset}
        onSelectPreset={handleSelectPreset}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6 w-full flex-1">
        {/* Executive Summary Metric Cards */}
        <MetricCards metrics={metrics} state={state} />

        {/* Dynamic Charts Section */}
        <DynamicChartsSection state={state} metrics={metrics} />

        {/* Interactive ROI & Headcount Simulator */}
        <SimulatorControls
          state={state}
          metrics={metrics}
          onChange={handleStateChange}
        />

        {/* Visual Organogram Section */}
        <OrganogramTree state={state} metrics={metrics} />

        {/* Executive Financial Breakdown Table */}
        <FinancialSummaryTable state={state} metrics={metrics} />

        {/* Footer info for presentation */}
        <footer className="pt-6 pb-8 border-t border-slate-800/80 text-center text-xs text-slate-400 print:hidden">
          <p className="flex items-center justify-center gap-2">
            <span>IT Resource &amp; ROI Executive Center</span>
            <span>•</span>
            <span>Ready for Vercel Deployment</span>
            <span>•</span>
            <span className="text-blue-400 font-medium">Next.js &amp; Tailwind CSS</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
