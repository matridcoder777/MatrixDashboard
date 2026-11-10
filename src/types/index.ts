export interface OrgState {
  // Core Tech
  custom: number;
  design: number;
  mobile: number;
  wordpress: number;
  // Hiring / Fixed ROI
  hiring: number;
  // Operations & Overhead
  pm: number;
  ba: number;
  otherOps: number;
  // Financial parameters
  hourlyRate: number;
  utilization: number;
  fixedRevenuePerMember: number;
  // Cost & Profitability parameters
  avgDevCost: number;
  avgOpsCost: number;
  overheadInfraCost: number;
}

export interface CalculatedMetrics {
  sales: number;
  hrAcc: number;
  hr: number;
  accounts: number;
  totalTech: number;
  totalOps: number;
  totalHeadcount: number;
  revenueEarningCount: number;
  revPct: string;
  opsPct: string;
  devToMgmtRatio: string;
  billableHoursPerMonth: number;
  variableTechRevenue: number;
  fixedHiringRevenue: number;
  totalProjectedRevenue: number;
  // Cost & Profit metrics
  totalDevCost: number;
  totalOpsCost: number;
  totalCost: number;
  netProfit: number;
  netMarginPct: string;
}
