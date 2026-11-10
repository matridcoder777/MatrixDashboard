# IT Resource & ROI Executive Center Dashboard

A modern, high-performance executive dashboard built with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Chart.js**. Converted from a static single-file HTML into a modular, production-ready React application ready for presentation and immediate deployment to **Vercel**.

---

## 🚀 Key Features

- **Executive KPI Cards**: Real-time workforce metrics, billable revenue percentage, overhead allocation, and developer-to-management span ratios.
- **Dynamic Interactive Charts**:
  - **High-Level Allocation**: Doughnut chart comparing Fixed Revenue vs Core Production vs Overhead.
  - **Tech Team Breakdown**: Bar chart illustrating team sizes across Custom Dev, Design, Mobile, and WordPress.
  - **Operations Breakdown**: Doughnut chart displaying PM, Sales, BA, HR, and Accounts overhead.
- **Real-Time Interactive Simulator**:
  - Sliders for headcount adjustments across core tech, fixed dedicated teams, and operations.
  - Real-time financial modeling: Hourly billing rates, technician utilization %, and fixed client retainer revenue.
  - Instant monthly revenue forecasting ($ / mo) and annual run-rate calculation.
- **Visual Organizational Hierarchy (Organogram)**: Interactive tree diagram visualizing the executive root and 3 operational pillars.
- **Executive Financial Breakdown & Unit Economics**: Detailed breakdown comparing fixed retainers vs variable tech capacity, average yield per employee, and capacity analysis.
- **Preset Scenarios**: Quick-switch buttons in the header (**Baseline 83**, **Expansion +25%**, **High Margin**) tailored for executive presentations.

---

## 🛠️ Project Structure

```
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind & custom scrollbar styles
│   │   ├── layout.tsx          # Root layout with Inter typography
│   │   └── page.tsx            # Main executive dashboard view
│   ├── components/
│   │   ├── Header.tsx          # Glassmorphic header with preset selectors
│   │   ├── MetricCards.tsx     # 4 executive KPI metric cards
│   │   ├── ChartsSection.tsx   # Chart.js donut and bar charts
│   │   ├── SimulatorControls.tsx # Interactive sliders and revenue banner
│   │   ├── OrganogramTree.tsx  # Interactive visual organogram
│   │   └── FinancialSummaryTable.tsx # Unit economics & revenue breakdown
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── utils/
│       └── calculations.ts     # Formula engine for capacity and ROI
├── public/                     # Static public assets
├── next.config.mjs             # Next.js configuration (static export enabled)
├── tailwind.config.ts          # Tailwind configuration with custom theme
└── tsconfig.json               # TypeScript configuration
```

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build production bundle**:
   ```bash
   npm run build
   ```

---

## ☁️ Deploying to Vercel

### Option 1: Via Vercel Web Dashboard (Recommended with GitHub)
1. Push your repository to GitHub, GitLab, or Bitbucket:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: IT Resource & ROI Executive Center"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel will automatically detect **Next.js**.
4. Click **Deploy**. Your dashboard will be live on a `*.vercel.app` URL within seconds!

### Option 2: Deploy with Vercel CLI
1. Run:
   ```bash
   npx vercel
   ```
2. Follow the on-screen prompts to deploy instantly from your terminal.
3. For production release:
   ```bash
   npx vercel --prod
   ```
