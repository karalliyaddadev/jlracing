"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "../components/AdminContext";
import { Donut } from "../components/charts/Donut";
import { SparkBar } from "../components/charts/SparkBar";
import { AreaChart } from "../components/charts/AreaChart";
import { useRouter } from "next/navigation";
import { API_URL } from "../lib/constants";
import { readApiData } from "../lib/api";
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
  bike?: { id: number } | null;
  inventory?: { id: number } | null;
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

function isDateWithinRange(iso: string | null | undefined, from: string, to: string) {
  if (!iso) return false;

  const value = new Date(iso).getTime();
  if (Number.isNaN(value)) return false;

  if (from) {
    const fromValue = new Date(`${from}T00:00:00`).getTime();
    if (value < fromValue) return false;
  }

  if (to) {
    const toValue = new Date(`${to}T23:59:59.999`).getTime();
    if (value > toValue) return false;
  }

  return true;
}

function formatDateRangeLabel(from: string, to: string) {
  if (from && to) return `${from} to ${to}`;
  if (from) return `From ${from}`;
  if (to) return `Up to ${to}`;
  return "All dates";
}

function formatDisplayDate(value: string) {
  if (!value) return "All dates";
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDisplayDateRange(from: string, to: string) {
  if (from && to) return `${formatDisplayDate(from)} to ${formatDisplayDate(to)}`;
  if (from) return `From ${formatDisplayDate(from)}`;
  if (to) return `Up to ${formatDisplayDate(to)}`;
  return "All dates";
}

export default function DashboardPage() {
  const { admin, token } = useAdmin();
  const router = useRouter();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  const [revenueMode, setRevenueMode] = useState<RevenueViewMode>("MONTHLY");
  const [financeDateFrom, setFinanceDateFrom] = useState("");
  const [financeDateTo, setFinanceDateTo] = useState("");

  const auth = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const purchasesQuery = useQuery({
    queryKey: ["pos", "dashboard", "purchases", token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/pos/user-management/purchases?page=1&limit=500`, {
        headers: auth,
        cache: "no-store",
      });
      const payload = await readApiData<{ purchases?: Purchase[] }>(response, "Failed to load purchases");
      return payload.purchases ?? [];
    },
  });

  const productsQuery = useQuery({
    queryKey: ["pos", "dashboard", "products", token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/pos/bike-management/products?page=1&limit=500`, {
        headers: auth,
        cache: "no-store",
      });
      const payload = await readApiData<{ products?: InventoryProduct[] }>(response, "Failed to load inventory summary");
      return payload.products ?? [];
    },
  });

  const vehiclesQuery = useQuery({
    queryKey: ["pos", "dashboard", "vehicles", token],
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/pos/bike-management/vehicles?limit=5000`, {
        headers: auth,
        cache: "no-store",
      });
      const payload = await readApiData<{ vehicles?: VehicleSummary[] }>(response, "Failed to load bike summary");
      return payload.vehicles ?? [];
    },
  });

  const purchases: Purchase[] = purchasesQuery.data ?? [];
  const products: InventoryProduct[] = productsQuery.data ?? [];
  const vehicles: VehicleSummary[] = vehiclesQuery.data ?? [];
  const loading = purchasesQuery.isPending || productsQuery.isPending || vehiclesQuery.isPending;
  const error = purchasesQuery.error instanceof Error
    ? purchasesQuery.error.message
    : productsQuery.error instanceof Error
      ? productsQuery.error.message
      : vehiclesQuery.error instanceof Error
        ? vehiclesQuery.error.message
        : null;

  const financeDateRangeInvalid = Boolean(
    financeDateFrom && financeDateTo && financeDateFrom > financeDateTo,
  );

  const financeDateRangeLabel = useMemo(
    () => formatDateRangeLabel(financeDateFrom, financeDateTo),
    [financeDateFrom, financeDateTo],
  );

  const productsById = useMemo(
    () => new Map(products.map((product: InventoryProduct) => [product.id, product])),
    [products],
  );

  const vehiclesById = useMemo(
    () => new Map(vehicles.map((vehicle: VehicleSummary) => [vehicle.id, vehicle])),
    [vehicles],
  );

  const filteredFinancePurchases = useMemo(() => {
    if (financeDateRangeInvalid) return [];
    return purchases.filter((purchase: Purchase) =>
      isDateWithinRange(purchase.purchasedAt, financeDateFrom, financeDateTo),
    );
  }, [financeDateFrom, financeDateRangeInvalid, financeDateTo, purchases]);

  const activeTaxes = useMemo(() => {
    const total = filteredFinancePurchases.reduce((sum: number, purchase: Purchase) => {
      if (purchase.itemType === "INVENTORY") {
        const productId = purchase.inventory?.id;
        const product = productId ? productsById.get(productId) : undefined;
        return sum + Math.max(0, product?.taxPaid ?? 0) * Math.max(0, purchase.quantity);
      }

      const bikeId = purchase.bike?.id;
      const bike = bikeId ? vehiclesById.get(bikeId) : undefined;
      return sum + Math.max(0, bike?.taxAmount ?? 0);
    }, 0);

    return clampMoney(total);
  }, [filteredFinancePurchases, productsById, vehiclesById]);

  const activeOtherCosts = useMemo(() => {
    const total = filteredFinancePurchases.reduce((sum: number, purchase: Purchase) => {
      if (purchase.itemType === "INVENTORY") {
        const productId = purchase.inventory?.id;
        const product = productId ? productsById.get(productId) : undefined;
        return sum + Math.max(0, product?.additionalExpenses ?? 0) * Math.max(0, purchase.quantity);
      }

      const bikeId = purchase.bike?.id;
      const bike = bikeId ? vehiclesById.get(bikeId) : undefined;
      const expenses = bike?.expenses ?? [];
      return sum + expenses.reduce((innerSum, item) => innerSum + Math.max(0, item.amount), 0);
    }, 0);

    return clampMoney(total);
  }, [filteredFinancePurchases, productsById, vehiclesById]);

  const financialSummary = useMemo(() => {
    const now = new Date();
    const dailyKey = dateKeyLocal(now, "DAILY");
    const monthKey = dateKeyLocal(now, "MONTHLY");

    let totalRevenue = 0;
    let dailyRevenue = 0;
    let monthlyRevenue = 0;
    let leasingOutstanding = 0;
    let cashOutstanding = 0;

    filteredFinancePurchases.forEach((purchase: Purchase) => {
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
        cashOutstanding += remaining;
      }
    });

    const totalOutstanding = cashOutstanding + leasingOutstanding;
    const grossProfit = totalRevenue - (activeTaxes + activeOtherCosts);

    return {
      totalRevenue,
      dailyRevenue,
      monthlyRevenue,
      totalOutstanding,
      cashOutstanding,
      leasingOutstanding,
      grossProfit,
    };
  }, [activeOtherCosts, activeTaxes, filteredFinancePurchases]);

  const allTimeRevenue = useMemo(
    () => clampMoney(purchases.reduce((sum: number, purchase: Purchase) => sum + getSettledRevenue(purchase), 0)),
    [purchases],
  );

  const totals = useMemo(() => {
    const now = new Date();
    const todayKey = dateKeyLocal(now, "DAILY");

    let todayRevenue = 0;
    let todaySoldUnits = 0;
    let openInvoices = 0;
    const uniqueCustomers = new Set<number>();

    purchases.forEach((purchase: Purchase) => {
      const settledRevenue = getSettledRevenue(purchase);
      uniqueCustomers.add(purchase.customer.id);
      if ((purchase.remainingAmount ?? 0) > 0) openInvoices += 1;

      const purchasedAt = new Date(purchase.purchasedAt);
      if (dateKeyLocal(purchasedAt, "DAILY") === todayKey) {
        todayRevenue += settledRevenue;
        todaySoldUnits += purchase.quantity;
      }
    });

    const lowStockAlerts = products.filter((product: InventoryProduct) => {
      const threshold = product.lowStockThreshold ?? 0;
      return threshold > 0 && product.quantity <= threshold;
    }).length;

    return {
      totalRevenue: allTimeRevenue,
      todayRevenue,
      todaySoldUnits,
      openInvoices,
      activeUsers: uniqueCustomers.size,
      lowStockAlerts,
    };
  }, [allTimeRevenue, products, purchases]);

  const groupedRevenue = useMemo(() => {
    const map = new Map<string, { revenue: number; soldUnits: number }>();
    purchases.forEach((purchase: Purchase) => {
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
    () => purchases.filter((purchase: Purchase) => purchase.itemType === "BIKE").length,
    [purchases]
  );

  const inventorySalesCount = useMemo(
    () => purchases.filter((purchase: Purchase) => purchase.itemType === "INVENTORY").length,
    [purchases]
  );

  const totalSalesCount = purchases.length;
  const bikeShare = totalSalesCount > 0 ? Math.round((bikeSalesCount / totalSalesCount) * 100) : 0;
  const inventoryShare = totalSalesCount > 0 ? Math.round((inventorySalesCount / totalSalesCount) * 100) : 0;
  const settledShare = totalSalesCount > 0
    ? Math.round((purchases.filter((purchase: Purchase) => (purchase.remainingAmount ?? 0) <= 0).length / totalSalesCount) * 100)
    : 0;
  const pendingShare = Math.max(0, 100 - settledShare);

  const recentActivity = useMemo(
    () => [...purchases]
      .sort((a: Purchase, b: Purchase) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt))
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
    const reportDateRange = formatDisplayDateRange(financeDateFrom, financeDateTo);
    const reportNumber = `#${String(purchases.length).padStart(4, "0")}`;
    const reportDate = new Date().toLocaleDateString("en-GB");
    const rowDescriptions: Record<string, string> = {
      "Total Revenue": "Settled revenue in the selected range",
      Taxes: "Vehicle tax and inventory tax totals",
      "Other Costs": "Vehicle expenses and inventory extras",
      "Gross Profit": "Total Revenue - (Taxes + Other Costs)",
      "Total Outstanding": "Unsettled balances in the selected range",
      "Leasing Outstanding": "Outstanding leasing balances only",
    };
    const rows = [
      {
        label: "Total Revenue",
        totalPrice: `LKR ${formatCurrency(financialSummary.totalRevenue)}`,
      },
      {
        label: "Taxes",
        totalPrice: `LKR ${formatCurrency(activeTaxes)}`,
      },
      {
        label: "Other Costs",
        totalPrice: `LKR ${formatCurrency(activeOtherCosts)}`,
      },
      {
        label: "Gross Profit",
        totalPrice: `LKR ${formatCurrency(financialSummary.grossProfit)}`,
      },
      {
        label: "Total Outstanding",
        totalPrice: `LKR ${formatCurrency(financialSummary.totalOutstanding)}`,
      },
      {
        label: "Leasing Outstanding",
        totalPrice: `LKR ${formatCurrency(financialSummary.leasingOutstanding)}`,
      },
    ];
    const html = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>JL Racing Finance Report ${dateKeyLocal(new Date(), "DAILY")}</title>
    <style>
      @page { size: A4 portrait; margin: 6mm; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        color: #111;
        background: #fff;
      }
      .sheet {
        width: 100%;
        max-width: 198mm;
        margin: 0 auto;
        background: #fff;
        border: 1px solid #d5d5d5;
      }
      .header {
        background: #000;
        color: #caa24a;
        text-align: center;
        padding: 12px 16px 10px;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .logo {
        width: 110px;
        height: auto;
        display: block;
        margin: 0 auto 6px;
      }
      .brand {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.3;
        letter-spacing: 0.01em;
        margin: 0;
      }
      .brand-title {
        margin: 0;
        font-size: 11px;
        font-weight: 700;
        line-height: 1.35;
      }
      .brand-address {
        margin: 0;
        font-size: 11px;
        font-weight: 700;
        line-height: 1.35;
      }
      .content {
        padding: 12px 12px 10px;
      }
      .top-row {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 10px;
        align-items: start;
        margin-bottom: 10px;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .invoice-number {
        font-size: 18px;
        font-weight: 700;
        margin: 0 0 6px;
      }
      .invoice-label {
        font-size: 12px;
        font-weight: 700;
        margin: 0;
      }
      .invoice-subtext {
        display: block;
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.35;
      }
      .report-date {
        font-size: 14px;
        font-weight: 700;
        margin: 0;
        text-align: right;
        white-space: nowrap;
      }
      .report-pill {
        display: inline-block;
        margin-top: 6px;
        padding: 5px 10px;
        border-radius: 999px;
        background: #111;
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.03em;
      }
      .divider {
        height: 10px;
        background: #000;
        margin: 10px 0 8px;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .meta-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
        margin-bottom: 10px;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .meta-card {
        border: 1px solid #d1d1d1;
        background: #f6f6f6;
        padding: 8px 10px;
      }
      .meta-label {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #666;
        font-weight: 700;
        margin: 0 0 4px;
      }
      .meta-value {
        margin: 0;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.35;
      }
      .table-wrap {
        background: #fff;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      }
      .table thead th {
        text-align: left;
        padding: 7px 8px;
        border-bottom: 2px solid #999;
        font-size: 11px;
        font-weight: 700;
      }
      .table tbody td {
        padding: 8px 8px;
        border-bottom: 1px solid #d3d3d3;
        vertical-align: top;
        font-size: 11px;
      }
      .table tbody tr:nth-child(even) td {
        background: #f6f6f6;
      }
      .desc strong {
        display: block;
        font-size: 12px;
        line-height: 1.25;
        margin-bottom: 2px;
      }
      .desc span {
        display: block;
        color: #666;
        font-size: 10px;
        line-height: 1.35;
      }
      .amount {
        white-space: nowrap;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .amount {
        width: 160px;
      }
      .desc-col {
        width: auto;
      }
      .summary-block {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .summary-label {
        text-align: right;
        font-size: 13px;
        font-weight: 700;
        color: #333;
        padding-right: 6px;
      }
      .summary-total {
        background: #000;
        color: #fff;
        padding: 8px 14px;
        min-width: 170px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
      }
      .footer-note {
        margin-top: 10px;
        font-size: 10px;
        color: #555;
        line-height: 1.45;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .terms {
        margin-top: 10px;
        padding: 8px 10px;
        border: 1px solid #cfcfcf;
        background: #f7f7f7;
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .terms h3 {
        margin: 0 0 6px;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }
      .terms ul {
        margin: 0;
        padding-left: 16px;
      }
      .terms li {
        margin: 0 0 3px;
        font-size: 10px;
        line-height: 1.4;
      }
      @media print {
        body {
          background: #fff;
        }
        .sheet {
          border: none;
          max-width: none;
          width: 100%;
          margin: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="header">
        <img src="/landing/logo.jpg" alt="JL Racing" class="logo" />
        <p class="brand">JL Racing</p>
        <p class="brand-title">Importers, Exporters & Dealers Of Motorcycles, Motor Vehicles, Machineries & Other</p>
        <p class="brand-title">Motorized Equipments With Spare Parts.</p>
        <p class="brand-address">No:154, Puttalam Road, Kurunegala, Sri Lanka, Kurunegala</p>
      </div>

      <div class="content">
        <div class="top-row">
          <div>
            <p class="invoice-number">Finance Report ${reportNumber}</p>
            <p class="invoice-label">Report Range: <span class="invoice-subtext">${reportDateRange}</span></p>
            <span class="report-pill">Generated at ${generatedAt}</span>
          </div>
          <div>
            <p class="report-date">Date: ${reportDate}</p>
          </div>
        </div>

        <div class="meta-grid">
          <div class="meta-card">
            <p class="meta-label">Report Scope</p>
            <p class="meta-value">JL Racing Dashboard Finance Summary</p>
          </div>
          <div class="meta-card">
            <p class="meta-label">Selected Range</p>
            <p class="meta-value">${reportDateRange}</p>
          </div>
          <div class="meta-card">
            <p class="meta-label">Matched Invoices</p>
            <p class="meta-value">${filteredFinancePurchases.length}</p>
          </div>
        </div>

        <div class="divider"></div>

        <div class="table-wrap">
          <table class="table">
            <thead>
              <tr>
                <th>Description</th>
                <th class="amount">Total Price</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map((row) => `
                <tr>
                  <td class="desc desc-col"><strong>${row.label}</strong><span>${rowDescriptions[row.label] ?? "Finance summary item"}</span></td>
                  <td class="amount">${row.totalPrice}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="summary-block">
          <div class="summary-label">Total</div>
          <div class="summary-total">LKR ${formatCurrency(financialSummary.totalRevenue)}</div>
        </div>

        <div class="terms">
          <h3>Finance Notes</h3>
          <ul>
            <li>Selected range: ${reportDateRange}</li>
            <li>Generated from the JL Racing dashboard finance summary</li>
            <li>Outstanding balances: LKR ${formatCurrency(financialSummary.totalOutstanding)} | Leasing: LKR ${formatCurrency(financialSummary.leasingOutstanding)}</li>
          </ul>
        </div>

        <div class="footer-note">This document is formatted for print and PDF export from the dashboard. ${generatedAt}</div>
      </div>
    </div>
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
          <button
            type="button"
            className="btn-outline"
            onClick={exportFinanceReportPdf}
            disabled={financeDateRangeInvalid}
          >
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

      <div className="finance-controls-panel">
        <div className="finance-control-row">
          <label className="finance-control-label" htmlFor="finance-date-from">
            From date
          </label>
          <input
            id="finance-date-from"
            type="date"
            className="bm-input"
            value={financeDateFrom}
            onChange={(event) => setFinanceDateFrom(event.target.value)}
          />
        </div>
        <div className="finance-control-row">
          <label className="finance-control-label" htmlFor="finance-date-to">
            To date
          </label>
          <input
            id="finance-date-to"
            type="date"
            className="bm-input"
            value={financeDateTo}
            onChange={(event) => setFinanceDateTo(event.target.value)}
          />
        </div>
        <div className="finance-equations">
          {financeDateRangeInvalid && (
            <div className="bm-alert bm-alert-error">
              From date must be earlier than or equal to the to date.
            </div>
          )}
          <span>Showing finance cards for {financeDateRangeLabel}.</span>
          <span>{filteredFinancePurchases.length} invoice(s) matched the selected range.</span>
          <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", marginTop: "0.35rem" }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setFinanceDateFrom("");
                setFinanceDateTo("");
              }}
              disabled={!financeDateFrom && !financeDateTo}
            >
              Clear Dates
            </button>
          </div>
        </div>
      </div>

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
            hint: "Cash + leasing balance",
          },
          {
            label: "Cash Outstanding",
            value: `LKR ${formatCurrency(financialSummary.cashOutstanding)}`,
            hint: "Outstanding cash balance only",
          },
          {
            label: "Leasing Outstanding",
            value: `LKR ${formatCurrency(financialSummary.leasingOutstanding)}`,
            hint: "Only leasing balance",
          },
          {
            label: "Taxes",
            value: `LKR ${formatCurrency(activeTaxes)}`,
            hint: `Auto from sales in ${financeDateRangeLabel.toLowerCase()}`,
          },
          {
            label: "Other Costs",
            value: `LKR ${formatCurrency(activeOtherCosts)}`,
            hint: `Auto from sales in ${financeDateRangeLabel.toLowerCase()}`,
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
