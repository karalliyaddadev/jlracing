"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdmin } from "../components/AdminContext";
import { Donut } from "../components/charts/Donut";
import { SparkBar } from "../components/charts/SparkBar";
import { AreaChart } from "../components/charts/AreaChart";
import { useRouter } from "next/navigation";
import { API_URL } from "../lib/constants";
import {
  IconRevenue,
  IconUsers,
  IconInvoice,
  IconInventory,
  IconActivity,
  IconTrend,
  IconBike,
} from "../lib/icons";

type Purchase = {
  id: number;
  purchasedAt: string;
  itemType: "BIKE" | "INVENTORY";
  quantity: number;
  finalSellingPrice: number;
  purchaseChannel?: "PERSONAL" | "LEASING";
  remainingAmount?: number;
  customer: { id: number };
};

type InventoryProduct = {
  id: number;
  quantity: number;
  soldQuantity?: number;
  taxPaid?: number;
  additionalExpenses?: number;
  lowStockThreshold?: number | null;
};

type VehicleExpense = {
  amount: number;
};

type VehicleSummary = {
  id: number;
  status: "available" | "sold";
  taxAmount?: number;
  expenses?: VehicleExpense[];
};

type RevenueViewMode = "DAILY" | "MONTHLY" | "YEARLY";

function dateKeyLocal(date: Date, mode: RevenueViewMode) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  if (mode === "YEARLY") return String(year);
  if (mode === "MONTHLY") return `${year}-${month}`;
  return `${year}-${month}-${day}`;
}

function labelFromKey(key: string, mode: RevenueViewMode) {
  if (mode === "YEARLY") return key;
  if (mode === "MONTHLY") {
    const [y, m] = key.split("-");
    const month = new Date(Number(y), Number(m) - 1, 1).toLocaleString(undefined, { month: "short" });
    return `${month} ${y.slice(-2)}`;
  }
  const [y, m, d] = key.split("-");
  const date = new Date(Number(y), Number(m) - 1, Number(d));
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatCurrencyCompact(value: number) {
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Math.round(value));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.round(value * 100) / 100);
}

function getSettledRevenue(purchase: Purchase) {
  const remaining = Math.max(0, purchase.remainingAmount ?? 0);
  const settled = purchase.finalSellingPrice - remaining;
  return Math.max(0, Math.min(purchase.finalSellingPrice, settled));
}

function clampMoney(value: number) {
  return Math.round(value * 100) / 100;
}

export default function DashboardPage() {
  const { admin, token } = useAdmin();
  const router = useRouter();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revenueMode, setRevenueMode] = useState<RevenueViewMode>("MONTHLY");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [vehicles, setVehicles] = useState<VehicleSummary[]>([]);

  const auth = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadDashboardData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [purchasesRes, productsRes, vehiclesRes] = await Promise.all([
        fetch(`${API_URL}/api/pos/user-management/purchases?page=1&limit=500`, { headers: auth, cache: "no-store" }),
        fetch(`${API_URL}/api/pos/bike-management/products?page=1&limit=500`, { headers: auth, cache: "no-store" }),
        fetch(`${API_URL}/api/pos/bike-management/vehicles?limit=5000`, { headers: auth, cache: "no-store" }),
      ]);

      const purchasesJson = await purchasesRes.json() as { data?: { purchases?: Purchase[] }; message?: string };
      const productsJson = await productsRes.json() as { data?: { products?: InventoryProduct[] }; message?: string };
      const vehiclesJson = await vehiclesRes.json() as { data?: { vehicles?: VehicleSummary[] }; message?: string };

      if (!purchasesRes.ok) throw new Error(purchasesJson.message ?? "Failed to load purchases");
      if (!productsRes.ok) throw new Error(productsJson.message ?? "Failed to load inventory summary");
      if (!vehiclesRes.ok) throw new Error(vehiclesJson.message ?? "Failed to load bike summary");

      setPurchases(purchasesJson.data?.purchases ?? []);
      setProducts(productsJson.data?.products ?? []);
      setVehicles(vehiclesJson.data?.vehicles ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [auth, token]);

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  const derivedTaxes = useMemo(() => {
    const inventoryTax = products.reduce((sum, product) => {
      const soldQuantity = Math.max(0, product.soldQuantity ?? 0);
      const taxPerUnit = Math.max(0, product.taxPaid ?? 0);
      return sum + taxPerUnit * soldQuantity;
    }, 0);

    const bikeTax = vehicles.reduce((sum, vehicle) => {
      if (vehicle.status !== "sold") return sum;
      return sum + Math.max(0, vehicle.taxAmount ?? 0);
    }, 0);

    return clampMoney(inventoryTax + bikeTax);
  }, [products, vehicles]);

  const derivedOtherCosts = useMemo(() => {
    const inventoryCosts = products.reduce((sum, product) => {
      const soldQuantity = Math.max(0, product.soldQuantity ?? 0);
      const extraPerUnit = Math.max(0, product.additionalExpenses ?? 0);
      return sum + extraPerUnit * soldQuantity;
    }, 0);

    const bikeCosts = vehicles.reduce((sum, vehicle) => {
      if (vehicle.status !== "sold") return sum;
      const expenses = vehicle.expenses ?? [];
      return sum + expenses.reduce((innerSum, item) => innerSum + Math.max(0, item.amount), 0);
    }, 0);

    return clampMoney(inventoryCosts + bikeCosts);
  }, [products, vehicles]);

  const activeTaxes = derivedTaxes;
  const activeOtherCosts = derivedOtherCosts;

  const financialSummary = useMemo(() => {
    const now = new Date();
    const dailyKey = dateKeyLocal(now, "DAILY");
    const monthKey = dateKeyLocal(now, "MONTHLY");

    let totalRevenue = 0;
    let dailyRevenue = 0;
    let monthlyRevenue = 0;
    let leasingOutstanding = 0;
    let nonLeasingOutstanding = 0;

    purchases.forEach((purchase) => {
      const settledRevenue = getSettledRevenue(purchase);
      const remaining = Math.max(0, purchase.remainingAmount ?? 0);
      totalRevenue += settledRevenue;

      const purchasedAt = new Date(purchase.purchasedAt);
      if (dateKeyLocal(purchasedAt, "DAILY") === dailyKey) {
        dailyRevenue += settledRevenue;
      }
      if (dateKeyLocal(purchasedAt, "MONTHLY") === monthKey) {
        monthlyRevenue += settledRevenue;
      }

      if (purchase.purchaseChannel === "LEASING") {
        leasingOutstanding += remaining;
      } else {
        nonLeasingOutstanding += remaining;
      }
    });

    const totalOutstanding = nonLeasingOutstanding + leasingOutstanding;
    const grossProfit = totalRevenue - (activeTaxes + activeOtherCosts);

    return {
      totalRevenue,
      dailyRevenue,
      monthlyRevenue,
      totalOutstanding,
      leasingOutstanding,
      grossProfit,
    };
  }, [activeOtherCosts, activeTaxes, purchases]);

  const totals = useMemo(() => {
    const now = new Date();
    const todayKey = dateKeyLocal(now, "DAILY");

    let todayRevenue = 0;
    let todaySoldUnits = 0;
    let openInvoices = 0;
    const uniqueCustomers = new Set<number>();

    purchases.forEach((purchase) => {
      const settledRevenue = getSettledRevenue(purchase);
      uniqueCustomers.add(purchase.customer.id);
      if ((purchase.remainingAmount ?? 0) > 0) openInvoices += 1;

      const purchasedAt = new Date(purchase.purchasedAt);
      if (dateKeyLocal(purchasedAt, "DAILY") === todayKey) {
        todayRevenue += settledRevenue;
        todaySoldUnits += purchase.quantity;
      }
    });

    const lowStockAlerts = products.filter((product) => {
      const threshold = product.lowStockThreshold ?? 0;
      return threshold > 0 && product.quantity <= threshold;
    }).length;

    return {
      totalRevenue: financialSummary.totalRevenue,
      todayRevenue,
      todaySoldUnits,
      openInvoices,
      activeUsers: uniqueCustomers.size,
      lowStockAlerts,
    };
  }, [financialSummary.totalRevenue, products, purchases]);

  const groupedRevenue = useMemo(() => {
    const map = new Map<string, { revenue: number; soldUnits: number }>();
    purchases.forEach((purchase) => {
      const key = dateKeyLocal(new Date(purchase.purchasedAt), revenueMode);
      const current = map.get(key) ?? { revenue: 0, soldUnits: 0 };
      current.revenue += getSettledRevenue(purchase);
      current.soldUnits += purchase.quantity;
      map.set(key, current);
    });

    const now = new Date();
    const rangeKeys: string[] = [];

    if (revenueMode === "DAILY") {
      for (let i = 13; i >= 0; i -= 1) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        rangeKeys.push(dateKeyLocal(d, "DAILY"));
      }
    } else if (revenueMode === "MONTHLY") {
      for (let i = 11; i >= 0; i -= 1) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        rangeKeys.push(dateKeyLocal(d, "MONTHLY"));
      }
    } else {
      for (let i = 7; i >= 0; i -= 1) {
        const d = new Date(now.getFullYear() - i, 0, 1);
        rangeKeys.push(dateKeyLocal(d, "YEARLY"));
      }
    }

    return {
      labels: rangeKeys.map((key) => labelFromKey(key, revenueMode)),
      revenueValues: rangeKeys.map((key) => Math.round((map.get(key)?.revenue ?? 0) * 100) / 100),
      soldValues: rangeKeys.map((key) => map.get(key)?.soldUnits ?? 0),
    };
  }, [purchases, revenueMode]);

  const selectedRangeRevenue = useMemo(
    () => groupedRevenue.revenueValues.reduce((sum, value) => sum + value, 0),
    [groupedRevenue.revenueValues]
  );

  const bikeSalesCount = useMemo(
    () => purchases.filter((purchase) => purchase.itemType === "BIKE").length,
    [purchases]
  );

  const inventorySalesCount = useMemo(
    () => purchases.filter((purchase) => purchase.itemType === "INVENTORY").length,
    [purchases]
  );

  const totalSalesCount = purchases.length;
  const bikeShare = totalSalesCount > 0 ? Math.round((bikeSalesCount / totalSalesCount) * 100) : 0;
  const inventoryShare = totalSalesCount > 0 ? Math.round((inventorySalesCount / totalSalesCount) * 100) : 0;
  const settledShare = totalSalesCount > 0
    ? Math.round((purchases.filter((purchase) => (purchase.remainingAmount ?? 0) <= 0).length / totalSalesCount) * 100)
    : 0;
  const pendingShare = Math.max(0, 100 - settledShare);

  const recentActivity = useMemo(
    () => [...purchases]
      .sort((a, b) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt))
      .slice(0, 6),
    [purchases]
  );

  const revenueSeries = groupedRevenue.revenueValues.length > 0
    ? groupedRevenue.revenueValues
    : [0];
  const soldSeries = groupedRevenue.soldValues.length > 0
    ? groupedRevenue.soldValues
    : [0];
  const axisLabels = groupedRevenue.labels.length > 0
    ? groupedRevenue.labels
    : ["-"];

  const exportFinanceReportPdf = () => {
    if (typeof window === "undefined") return;

    const generatedAt = new Date().toLocaleString();
    const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>dashboard-finance-report-${dateKeyLocal(new Date(), "DAILY")}</title>
    <style>
      @page { size: A4 portrait; margin: 14mm; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", Arial, sans-serif;
        color: #111827;
        background: #ffffff;
      }
      .header {
        border-bottom: 2px solid #d4af37;
        padding-bottom: 10px;
        margin-bottom: 14px;
      }
      .title {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
      }
      .subtitle {
        margin-top: 4px;
        font-size: 12px;
        color: #4b5563;
      }
      .meta {
        margin-top: 4px;
        font-size: 11px;
        color: #6b7280;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-bottom: 14px;
      }
      .card {
        border: 1px solid #d1d5db;
        border-radius: 8px;
        padding: 10px;
      }
      .label {
        font-size: 11px;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .value {
        margin-top: 6px;
        font-size: 24px;
        font-weight: 700;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 4px;
      }
      .table th {
        background: #f3f4f6;
        border: 1px solid #d1d5db;
        text-align: left;
        font-size: 11px;
        padding: 7px 8px;
      }
      .table td {
        border: 1px solid #e5e7eb;
        font-size: 11px;
        padding: 7px 8px;
      }
      .section-title {
        margin-top: 10px;
        margin-bottom: 6px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #374151;
        font-weight: 700;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1 class="title">JL Racing Finance Report</h1>
      <div class="subtitle">Daily and monthly revenue summary with outstanding, taxes, costs, and gross profit.</div>
      <div class="meta">Generated: ${generatedAt}</div>
    </div>
    <div class="grid">
      <div class="card"><div class="label">Daily Revenue</div><div class="value">LKR ${formatCurrency(financialSummary.dailyRevenue)}</div></div>
      <div class="card"><div class="label">Monthly Revenue</div><div class="value">LKR ${formatCurrency(financialSummary.monthlyRevenue)}</div></div>
      <div class="card"><div class="label">Total Revenue</div><div class="value">LKR ${formatCurrency(financialSummary.totalRevenue)}</div></div>
      <div class="card"><div class="label">Gross Profit</div><div class="value">LKR ${formatCurrency(financialSummary.grossProfit)}</div></div>
    </div>

    <div class="section-title">Finance Details</div>
    <table class="table">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Amount (LKR)</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Total Outstanding</td><td>${formatCurrency(financialSummary.totalOutstanding)}</td><td>Open invoice balances</td></tr>
        <tr><td>Leasing Outstanding</td><td>${formatCurrency(financialSummary.leasingOutstanding)}</td><td>Open leasing balances</td></tr>
        <tr><td>Taxes</td><td>${formatCurrency(activeTaxes)}</td><td>Sold bikes + sold inventory tax totals</td></tr>
        <tr><td>Other Costs</td><td>${formatCurrency(activeOtherCosts)}</td><td>Sold bikes expenses + sold inventory extra costs</td></tr>
        <tr><td>Gross Profit</td><td>${formatCurrency(financialSummary.grossProfit)}</td><td>Total Revenue - (Taxes + Other Costs)</td></tr>
      </tbody>
    </table>
  </body>
</html>`;

    const printFrame = document.createElement("iframe");
    printFrame.setAttribute("aria-hidden", "true");
    printFrame.style.position = "fixed";
    printFrame.style.right = "0";
    printFrame.style.bottom = "0";
    printFrame.style.width = "0";
    printFrame.style.height = "0";
    printFrame.style.border = "0";
    printFrame.style.opacity = "0";

    const cleanup = () => {
      window.setTimeout(() => {
        if (printFrame.parentNode) {
          printFrame.parentNode.removeChild(printFrame);
        }
      }, 1000);
    };

    printFrame.onload = () => {
      const frameWindow = printFrame.contentWindow;
      if (!frameWindow) {
        cleanup();
        return;
      }
      frameWindow.requestAnimationFrame(() => {
        window.setTimeout(() => {
          frameWindow.focus();
          frameWindow.print();
          cleanup();
        }, 120);
      });
    };

    document.body.appendChild(printFrame);
    printFrame.srcdoc = html;
  };

  return (
    <>
      {/* Welcome strip */}
      <div className="dash-welcome">
        <div>
          <h2 className="dash-welcome-title">
            Good {greeting}, {admin.name.split(" ")[0]}
          </h2>
          <p className="dash-welcome-sub">Here&apos;s what&apos;s happening at JL Racing today.</p>
        </div>
        <div className="dash-welcome-actions">
          <button type="button" className="btn-outline" onClick={exportFinanceReportPdf}>
            <IconInvoice /> Print Finance PDF
          </button>
          <button type="button" className="btn-outline" onClick={() => router.push("/dashboard/invoices")}>
            <IconInvoice /> New Invoice
          </button>
          <button type="button" className="btn-accent" onClick={() => router.push("/dashboard/bikes")}>
            <IconBike /> Check Stock
          </button>
        </div>
      </div>

      {error && <div className="bm-alert bm-alert-error">{error}</div>}

      <div className="finance-cards-grid">
        {[
          {
            label: "Total Revenue",
            value: `LKR ${formatCurrency(financialSummary.totalRevenue)}`,
            hint: "Includes all settled amounts",
          },
          {
            label: "Total Outstanding",
            value: `LKR ${formatCurrency(financialSummary.totalOutstanding)}`,
            hint: "Personal + leasing balance",
          },
          {
            label: "Leasing Outstanding",
            value: `LKR ${formatCurrency(financialSummary.leasingOutstanding)}`,
            hint: "Only leasing balance",
          },
          {
            label: "Taxes",
            value: `LKR ${formatCurrency(activeTaxes)}`,
            hint: "Auto from sold records",
          },
          {
            label: "Other Costs",
            value: `LKR ${formatCurrency(activeOtherCosts)}`,
            hint: "Auto from sold records",
          },
          {
            label: "Gross Profit",
            value: `LKR ${formatCurrency(financialSummary.grossProfit)}`,
            hint: "Revenue - (Taxes + Other Costs)",
          },
        ].map((card) => (
          <div key={card.label} className="finance-card">
            <span className="finance-card-label">{card.label}</span>
            <strong className="finance-card-value">{card.value}</strong>
            <span className="finance-card-hint">{card.hint}</span>
          </div>
        ))}
      </div>

      {/* KPI cards */}
      <div className="kpi-grid">
        {[
          {
            label: "Daily Revenue",
            value: loading ? "Loading..." : `LKR ${formatCurrencyCompact(totals.todayRevenue)}`,
            trend: `${totals.todaySoldUnits} units sold today`,
            up: true,
            icon: <IconRevenue />,
            color: "#C9A84C",
          },
          {
            label: "Whole Revenue",
            value: loading ? "Loading..." : `LKR ${formatCurrencyCompact(totals.totalRevenue)}`,
            trend: `${purchases.length} total invoices`,
            up: true,
            icon: <IconTrend />,
            color: "#10B981",
          },
          {
            label: "Active Users",
            value: loading ? "Loading..." : String(totals.activeUsers),
            trend: `${totals.openInvoices} open invoices`,
            up: totals.openInvoices === 0,
            icon: <IconUsers />,
            color: "#3B82F6",
          },
          {
            label: "Low Stock Alerts",
            value: loading ? "Loading..." : String(totals.lowStockAlerts),
            trend: "inventory threshold", 
            up: totals.lowStockAlerts === 0,
            icon: <IconInventory />,
            color: "#EF4444",
          },
        ].map((k) => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">{k.label}</span>
              <span className="kpi-icon-wrap" style={{ background: `${k.color}18`, borderColor: `${k.color}30`, color: k.color }}>
                {k.icon}
              </span>
            </div>
            <strong className="kpi-value">{k.value}</strong>
            <span className={`kpi-trend ${k.up ? "kpi-up" : "kpi-down"}`}>
              {k.up ? "↑" : "↓"} {k.trend} this week
            </span>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="dash-charts-row">
        {/* Revenue area chart */}
        <div className="chart-panel chart-wide">
          <div className="chart-panel-header">
            <div className="chart-panel-title">
              <IconRevenue />
              <span>Revenue Trend</span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
              <select
                className="bm-input"
                style={{ minWidth: 140 }}
                value={revenueMode}
                onChange={(event) => setRevenueMode(event.target.value as RevenueViewMode)}
              >
                <option value="DAILY">Daily</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
              <span className="chart-badge chart-badge-gold">LKR {formatCurrencyCompact(selectedRangeRevenue)}</span>
            </div>
          </div>
          <div className="chart-legend-row">
            <span className="chart-legend-dot" style={{ background: "#C9A84C" }} />
            <span className="chart-legend-label">Revenue (LKR)</span>
          </div>
          <div className="area-chart-wrap">
            <AreaChart values={revenueSeries} color="#C9A84C" />
            <div className="area-chart-months">
              {axisLabels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sales breakdown donuts */}
        <div className="chart-panel chart-narrow">
          <div className="chart-panel-header">
            <div className="chart-panel-title">
              <IconActivity />
              <span>Sales Breakdown</span>
            </div>
          </div>
          <div className="donuts-grid">
            <Donut pct={bikeShare} color="#C9A84C" label="Bikes" sublabel="sold" size={84} stroke={10} />
            <Donut pct={inventoryShare} color="#3B82F6" label="Inventory" sublabel="sold" size={84} stroke={10} />
            <Donut pct={settledShare} color="#10B981" label="Settled" sublabel="invoices" size={84} stroke={10} />
            <Donut pct={pendingShare} color="#F59E0B" label="Pending" sublabel="invoices" size={84} stroke={10} />
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="dash-bottom-row">
        {/* Spark bars */}
        <div className="chart-panel">
          <div className="chart-panel-header">
            <div className="chart-panel-title"><IconTrend /><span>Sold Units Trend</span></div>
            <span className="chart-badge chart-badge-green">{revenueMode.toLowerCase()}</span>
          </div>
          <div className="spark-wrap">
            <SparkBar values={soldSeries} color="#C9A84C" />
          </div>
          <div className="area-chart-months">
            {axisLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>

        {/* Inventory health */}
        <div className="chart-panel">
          <div className="chart-panel-header">
            <div className="chart-panel-title"><IconBike /><span>Inventory Health</span></div>
          </div>
          <div className="inv-health-wrap">
            <Donut
              pct={products.length > 0 ? Math.round((products.filter((product) => product.quantity > 0).length / products.length) * 100) : 0}
              color="#10B981"
              label="In Stock"
              sublabel="products"
              size={100}
              stroke={12}
            />
            <div className="inv-health-stats">
              {[
                {
                  label: "In Stock",
                  val: products.length > 0
                    ? `${Math.round((products.filter((product) => product.quantity > 0).length / products.length) * 100)}%`
                    : "0%",
                  color: "#10B981",
                },
                {
                  label: "Low Stock",
                  val: products.length > 0
                    ? `${Math.round((products.filter((product) => {
                      const threshold = product.lowStockThreshold ?? 0;
                      return threshold > 0 && product.quantity <= threshold;
                    }).length / products.length) * 100)}%`
                    : "0%",
                  color: "#F59E0B",
                },
                {
                  label: "Out of Stock",
                  val: products.length > 0
                    ? `${Math.round((products.filter((product) => product.quantity <= 0).length / products.length) * 100)}%`
                    : "0%",
                  color: "#EF4444",
                },
              ].map((s) => (
                <div key={s.label} className="inv-stat-row">
                  <span className="inv-stat-dot" style={{ background: s.color }} />
                  <span className="inv-stat-label">{s.label}</span>
                  <span className="inv-stat-val">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="chart-panel">
          <div className="chart-panel-header">
            <div className="chart-panel-title"><IconActivity /><span>Recent Activity</span></div>
          </div>
          <div className="activity-list">
            {recentActivity.length === 0 && <div className="users-muted">No sales activity yet.</div>}
            {recentActivity.map((entry) => (
              <div key={entry.id} className="activity-row">
                <span className="activity-dot" style={{ background: (entry.remainingAmount ?? 0) > 0 ? "#F59E0B" : "#10B981" }} />
                <span className="activity-text">
                  {entry.itemType === "BIKE" ? "Bike sale" : "Inventory sale"} • LKR {Math.round(entry.finalSellingPrice).toLocaleString()}
                </span>
                <span className="activity-time">{new Date(entry.purchasedAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
