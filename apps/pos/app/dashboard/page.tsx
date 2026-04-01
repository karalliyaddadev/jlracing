"use client";

import { useAdmin } from "../components/AdminContext";
import { Donut } from "../components/charts/Donut";
import { SparkBar } from "../components/charts/SparkBar";
import { AreaChart } from "../components/charts/AreaChart";
import { useRouter } from "next/navigation";
import {
  IconRevenue,
  IconUsers,
  IconInvoice,
  IconInventory,
  IconActivity,
  IconTrend,
  IconBike,
} from "../lib/icons";

const revenueData = [42, 58, 47, 73, 65, 88, 76, 95, 82, 110, 98, 125];
const salesData   = [8, 12, 7, 15, 11, 18, 14, 20, 16, 22, 19, 27];

export default function DashboardPage() {
  const { admin } = useAdmin();
  const router = useRouter();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  return (
    <>
      {/* Welcome strip */}
      <div className="dash-welcome">
        <div>
          <h2 className="dash-welcome-title">
            Good {greeting}, {admin.name.split(" ")[0]} 👋
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

      {/* KPI cards */}
      <div className="kpi-grid">
        {[
          { label: "Total Revenue",   value: "LKR 2.4M", trend: "+12.5%", up: true,  icon: <IconRevenue />,   color: "#C9A84C" },
          { label: "Active Users",    value: "12",        trend: "+2",     up: true,  icon: <IconUsers />,     color: "#3B82F6" },
          { label: "Open Invoices",   value: "28",        trend: "+5",     up: false, icon: <IconInvoice />,   color: "#F59E0B" },
          { label: "Low Stock Alerts",value: "7",         trend: "-3",     up: true,  icon: <IconInventory />, color: "#EF4444" },
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
              <span>Monthly Revenue</span>
            </div>
            <span className="chart-badge chart-badge-gold">LKR 2.4M YTD</span>
          </div>
          <div className="chart-legend-row">
            <span className="chart-legend-dot" style={{ background: "#C9A84C" }} />
            <span className="chart-legend-label">Revenue (LKR 000s)</span>
          </div>
          <div className="area-chart-wrap">
            <AreaChart values={revenueData} color="#C9A84C" />
            <div className="area-chart-months">
              {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
                <span key={i}>{m}</span>
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
            <Donut pct={74} color="#C9A84C" label="Bikes"    sublabel="sold" size={84} stroke={10} />
            <Donut pct={58} color="#3B82F6" label="Parts"    sublabel="sold" size={84} stroke={10} />
            <Donut pct={41} color="#10B981" label="Services" sublabel="done" size={84} stroke={10} />
            <Donut pct={87} color="#F59E0B" label="Invoiced" sublabel="paid" size={84} stroke={10} />
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="dash-bottom-row">
        {/* Spark bars */}
        <div className="chart-panel">
          <div className="chart-panel-header">
            <div className="chart-panel-title"><IconTrend /><span>Weekly Sales Units</span></div>
            <span className="chart-badge chart-badge-green">+18% MoM</span>
          </div>
          <div className="spark-wrap">
            <SparkBar values={salesData} color="#C9A84C" />
          </div>
          <div className="area-chart-months">
            {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {/* Inventory health */}
        <div className="chart-panel">
          <div className="chart-panel-header">
            <div className="chart-panel-title"><IconBike /><span>Inventory Health</span></div>
          </div>
          <div className="inv-health-wrap">
            <Donut pct={68} color="#10B981" label="In Stock" sublabel="units" size={100} stroke={12} />
            <div className="inv-health-stats">
              {[
                { label: "In Stock",     val: "68%", color: "#10B981" },
                { label: "Low Stock",    val: "21%", color: "#F59E0B" },
                { label: "Out of Stock", val: "11%", color: "#EF4444" },
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
            {[
              { text: "Invoice #1042 confirmed",      time: "2m ago",  dot: "#10B981" },
              { text: "New user added: M. Kamal",     time: "18m ago", dot: "#3B82F6" },
              { text: "Stock alert: Honda CBR 150",   time: "1h ago",  dot: "#F59E0B" },
              { text: "Invoice #1041 paid",            time: "2h ago",  dot: "#10B981" },
              { text: "Access request from K. Perera", time: "3h ago", dot: "#C9A84C" },
              { text: "Daily report generated",        time: "5h ago", dot: "#6B7280" },
            ].map((a, i) => (
              <div key={i} className="activity-row">
                <span className="activity-dot" style={{ background: a.dot }} />
                <span className="activity-text">{a.text}</span>
                <span className="activity-time">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
