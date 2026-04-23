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
  lowStockThreshold?: number | null;
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

function getRecognizedRevenue(purchase: Purchase) {
  // Leasing revenue is recognized only after it is fully settled.
  if (purchase.purchaseChannel === "LEASING" && (purchase.remainingAmount ?? 0) > 0) {
    return 0;
  }
  return purchase.finalSellingPrice;
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

  const auth = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadDashboardData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [purchasesRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/api/pos/user-management/purchases?page=1&limit=500`, { headers: auth, cache: "no-store" }),
        fetch(`${API_URL}/api/pos/bike-management/products?page=1&limit=500`, { headers: auth, cache: "no-store" }),
      ]);

      const purchasesJson = await purchasesRes.json() as { data?: { purchases?: Purchase[] }; message?: string };
      const productsJson = await productsRes.json() as { data?: { products?: InventoryProduct[] }; message?: string };

      if (!purchasesRes.ok) throw new Error(purchasesJson.message ?? "Failed to load purchases");
      if (!productsRes.ok) throw new Error(productsJson.message ?? "Failed to load inventory summary");

      setPurchases(purchasesJson.data?.purchases ?? []);
      setProducts(productsJson.data?.products ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [auth, token]);

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  const totals = useMemo(() => {
    const now = new Date();
    const todayKey = dateKeyLocal(now, "DAILY");

    let totalRevenue = 0;
    let todayRevenue = 0;
    let todaySoldUnits = 0;
    let openInvoices = 0;
    const uniqueCustomers = new Set<number>();

    purchases.forEach((purchase) => {
      const recognizedRevenue = getRecognizedRevenue(purchase);
      totalRevenue += recognizedRevenue;
      uniqueCustomers.add(purchase.customer.id);
      if ((purchase.remainingAmount ?? 0) > 0) openInvoices += 1;

      const purchasedAt = new Date(purchase.purchasedAt);
      if (dateKeyLocal(purchasedAt, "DAILY") === todayKey) {
        todayRevenue += recognizedRevenue;
        todaySoldUnits += purchase.quantity;
      }
    });

    const lowStockAlerts = products.filter((product) => {
      const threshold = product.lowStockThreshold ?? 0;
      return threshold > 0 && product.quantity <= threshold;
    }).length;

    return {
      totalRevenue,
      todayRevenue,
      todaySoldUnits,
      openInvoices,
      activeUsers: uniqueCustomers.size,
      lowStockAlerts,
    };
  }, [products, purchases]);

  const groupedRevenue = useMemo(() => {
    const map = new Map<string, { revenue: number; soldUnits: number }>();
    purchases.forEach((purchase) => {
      const key = dateKeyLocal(new Date(purchase.purchasedAt), revenueMode);
      const current = map.get(key) ?? { revenue: 0, soldUnits: 0 };
      current.revenue += getRecognizedRevenue(purchase);
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
          <button type="button" className="btn-outline" onClick={() => router.push("/dashboard/invoices")}>
            <IconInvoice /> New Invoice
          </button>
          <button type="button" className="btn-accent" onClick={() => router.push("/dashboard/bikes")}>
            <IconBike /> Check Stock
          </button>
        </div>
      </div>

      {error && <div className="bm-alert bm-alert-error">{error}</div>}

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
