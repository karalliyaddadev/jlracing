"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconDashboard,
  IconUsers,
  IconInvoice,
  IconInventory,
  IconAccess,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconBike,
  IconChevronNav,
} from "../lib/icons";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard",           href: "/dashboard",            Icon: IconDashboard  },
  { key: "users",     label: "User Management",      href: "/dashboard/users",      Icon: IconUsers      },
  { key: "invoices",  label: "Invoice Management",   href: "/dashboard/invoices",   Icon: IconInvoice    },
  { key: "inventory", label: "Inventory Management", href: "/dashboard/inventory",  Icon: IconInventory  },
  { key: "access",    label: "Access Management",    href: "/dashboard/access",     Icon: IconAccess     },
];

const BIKE_SUB_ITEMS = [
  { key: "bikes-inventory", label: "Inventory",             href: "/dashboard/bikes"         },
  { key: "bikes-sold",      label: "Sold Bikes",            href: "/dashboard/bikes/sold"    },
  { key: "bikes-manage",    label: "Manage Data",           href: "/dashboard/bikes/manage"  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [bikeOpen, setBikeOpen]   = useState(false);
  const pathname = usePathname();

  const isBikeActive = pathname.startsWith("/dashboard/bikes");

  // Auto-open bike submenu when on a bike route
  useEffect(() => {
    if (isBikeActive) setBikeOpen(true);
  }, [isBikeActive]);

  const isBikeSubItemActive = (href: string) => {
    if (href === "/dashboard/bikes") return pathname === "/dashboard/bikes";
    return pathname.startsWith(href);
  };

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sidebar-header">
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
        {!collapsed && (
          <>
            <Image src="/landing/logo.jpg" alt="JL Racing" width={32} height={32} style={{ borderRadius: 8, flexShrink: 0 }} />
            <span className="sidebar-brand">JL Racing <strong>POS</strong></span>
          </>
        )}
      </div>

      {!collapsed && (
        <div className="sidebar-search">
          <IconSearch />
          <input type="text" placeholder="Quick search…" />
        </div>
      )}

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ key, label, href, Icon }) => {
          const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={key}
              href={href}
              className={`nav-item${isActive ? " active" : ""}`}
              title={collapsed ? label : undefined}
            >
              <span className="nav-icon"><Icon /></span>
              {!collapsed && <span className="nav-label">{label}</span>}
              {!collapsed && isActive && <span className="nav-dot" />}
            </Link>
          );
        })}

        {/* ── Bike Management dropdown ── */}
        {collapsed ? (
          <Link
            href="/dashboard/bikes"
            className={`nav-item${isBikeActive ? " active" : ""}`}
            title="Bike Management"
          >
            <span className="nav-icon"><IconBike /></span>
          </Link>
        ) : (
          <>
            <button
              type="button"
              className={`nav-item nav-group-toggle${isBikeActive ? " active" : ""}`}
              onClick={() => setBikeOpen((v) => !v)}
            >
              <span className="nav-icon"><IconBike /></span>
              <span className="nav-label">Bike Management</span>
              <span className="nav-chevron" style={{ transform: bikeOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                <IconChevronNav />
              </span>
            </button>
            {bikeOpen && (
              <div className="nav-sub-group">
                {BIKE_SUB_ITEMS.map(({ key, label, href }) => {
                  const isActive = isBikeSubItemActive(href);
                  return (
                    <Link
                      key={key}
                      href={href}
                      className={`nav-sub-item${isActive ? " active" : ""}`}
                    >
                      <span className="nav-sub-dot" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <span>POS v2.0</span>
          <span>Mar 2026</span>
        </div>
      )}
    </aside>
  );
}
