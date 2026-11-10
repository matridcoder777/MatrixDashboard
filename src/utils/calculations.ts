import { OrgState, CalculatedMetrics } from "@/types";

export const DEFAULT_ORG_STATE: OrgState = {
  custom: 14,
  design: 8,
  mobile: 6,
  wordpress: 4,
  hiring: 35,
  pm: 4,
  ba: 2,
  otherOps: 6,
  hourlyRate: 25,
  utilization: 80,
  fixedRevenuePerMember: 3000,
  // Cost assumptions (monthly payroll & overhead averages)
  avgDevCost: 1800,
  avgOpsCost: 1500,
  overheadInfraCost: 5000,
};

/**
 * Deterministic number formatting to avoid SSR vs Client locale mismatches (e.g. en-US vs en-IN).
 * Formats 207400 as "207,400" identically on both server and client.
 */
export function formatNumber(val: number): string {
  if (isNaN(val) || val === null || val === undefined) return "0";
  const rounded = Math.round(val);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function calculateMetrics(state: OrgState): CalculatedMetrics {
  const {
    custom,
    design,
    mobile,
    wordpress,
    hiring,
    pm,
    ba,
    otherOps,
    hourlyRate,
    utilization,
    fixedRevenuePerMember,
    avgDevCost = 1800,
    avgOpsCost = 1500,
    overheadInfraCost = 5000,
  } = state;

  // Split otherOps into sales (~2/3) and hr/accounts (~1/3)
  const sales = Math.max(1, Math.round(otherOps * 0.66));
  const hrAcc = Math.max(1, otherOps - sales);
  const hr = Math.ceil(hrAcc / 2);
  const accounts = Math.floor(hrAcc / 2);

  // Group sums
  const totalTech = custom + design + mobile + wordpress;
  const totalOps = pm + ba + sales + hr + accounts;
  const totalHeadcount = hiring + totalTech + totalOps;
  const revenueEarningCount = hiring + totalTech;

  // Percentages & Ratios
  const revPct = totalHeadcount > 0 ? ((revenueEarningCount / totalHeadcount) * 100).toFixed(1) : "0.0";
  const opsPct = totalHeadcount > 0 ? ((totalOps / totalHeadcount) * 100).toFixed(1) : "0.0";
  const mgmtCount = pm + ba;
  const devToMgmtRatio = mgmtCount > 0 ? (totalTech / mgmtCount).toFixed(1) : "N/A";

  // Financial Calculations (160 working hours/month)
  const billableHoursPerMonth = 160 * (utilization / 100);
  const variableTechRevenue = totalTech * billableHoursPerMonth * hourlyRate;
  const fixedHiringRevenue = hiring * fixedRevenuePerMember;
  const totalProjectedRevenue = Math.round(variableTechRevenue + fixedHiringRevenue);

  // Cost & Profit Margin Analysis
  const totalDevCost = Math.round((hiring + totalTech) * avgDevCost);
  const totalOpsCost = Math.round(totalOps * avgOpsCost);
  const totalCost = Math.round(totalDevCost + totalOpsCost + overheadInfraCost);
  const netProfit = totalProjectedRevenue - totalCost;
  const netMarginPct =
    totalProjectedRevenue > 0
      ? ((netProfit / totalProjectedRevenue) * 100).toFixed(1)
      : "0.0";

  return {
    sales,
    hrAcc,
    hr,
    accounts,
    totalTech,
    totalOps,
    totalHeadcount,
    revenueEarningCount,
    revPct,
    opsPct,
    devToMgmtRatio,
    billableHoursPerMonth,
    variableTechRevenue,
    fixedHiringRevenue,
    totalProjectedRevenue,
    totalDevCost,
    totalOpsCost,
    totalCost,
    netProfit,
    netMarginPct,
  };
}
