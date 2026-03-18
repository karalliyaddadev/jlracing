"use client";

import { useState } from "react";
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
} from "../lib/icons";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard",           href: "/dashboard",            Icon: IconDashboard  },
  { key: "users",     label: "User Management",      href: "/dashboard/users",      Icon: IconUsers      },
  { key: "invoices",  label: "Invoice Management",   href: "/dashboard/invoices",   Icon: IconInvoice    },
  { key: "inventory", label: "Inventory Management", href: "/dashboard/inventory",  Icon: IconInventory  },
  { key: "access",    label: "Access Management",    href: "/dashboard/access",     Icon: IconAccess     },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

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
