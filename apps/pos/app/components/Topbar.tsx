"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useAdmin } from "./AdminContext";
import { API_URL } from "../lib/constants";
import {
  IconSun,
  IconMoon,
  IconBell,
  IconSearch,
  IconClock,
  IconLogout,
  IconChevronDown,
  IconChevronNav,
} from "../lib/icons";

type LowStockNotification = {
  id: string;
  title: string;
  message: string;
  href: string;
  type: "bike" | "inventory";
};

type BikeVehicleAlert = {
  id: number;
  brand: { name: string };
  model: { id: number; name: string; lowStockThreshold?: number | null };
};

type InventoryProductAlert = {
  id: number;
  name: string;
  quantity: number;
  lowStockThreshold?: number | null;
};

const BREADCRUMBS: Record<string, string> = {
  "/dashboard":            "Dashboard",
  "/dashboard/users":     "User Management",
  "/dashboard/invoices":  "Invoice Management",
  "/dashboard/inventory": "Inventory Management - Inventory",
  "/dashboard/inventory/sold": "Inventory Management - Sold Items",
  "/dashboard/inventory/manage": "Inventory Management - Manage Data",
  "/dashboard/access":    "Access Management",
  "/dashboard/suppliers": "Supplier Management",
  "/dashboard/bikes":     "Bike Management - Inventory",
  "/dashboard/bikes/sold": "Bike Management - Sold Bikes",
  "/dashboard/bikes/manage": "Bike Management - Manage Data",
};

const LOW_STOCK_READ_STORAGE_KEY = "pos_low_stock_notifications_read";
const LOW_STOCK_DELETED_STORAGE_KEY = "pos_low_stock_notifications_deleted";

export function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const { admin, logout, token } = useAdmin();
  const pathname = usePathname();
  const [clockTime, setClockTime] = useState("");
  const [clockDate, setClockDate] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<LowStockNotification[]>([]);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const [deletedNotificationIds, setDeletedNotificationIds] = useState<string[]>([]);
  const [notificationStateReady, setNotificationStateReady] = useState(false);
  const notificationPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
      setClockDate(now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedReadIds = JSON.parse(window.localStorage.getItem(LOW_STOCK_READ_STORAGE_KEY) ?? "[]");
      const savedDeletedIds = JSON.parse(window.localStorage.getItem(LOW_STOCK_DELETED_STORAGE_KEY) ?? "[]");
      setReadNotificationIds(Array.isArray(savedReadIds) ? savedReadIds : []);
      setDeletedNotificationIds(Array.isArray(savedDeletedIds) ? savedDeletedIds : []);
    } catch {
      setReadNotificationIds([]);
      setDeletedNotificationIds([]);
    } finally {
      setNotificationStateReady(true);
    }
  }, []);

  useEffect(() => {
    if (!notificationStateReady || typeof window === "undefined") return;
    window.localStorage.setItem(LOW_STOCK_READ_STORAGE_KEY, JSON.stringify(readNotificationIds));
  }, [notificationStateReady, readNotificationIds]);

  useEffect(() => {
    if (!notificationStateReady || typeof window === "undefined") return;
    window.localStorage.setItem(LOW_STOCK_DELETED_STORAGE_KEY, JSON.stringify(deletedNotificationIds));
  }, [notificationStateReady, deletedNotificationIds]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let alive = true;

    const loadNotifications = async () => {
      try {
        const auth = { Authorization: `Bearer ${token}` };
        const [bikeResponse, inventoryResponse] = await Promise.all([
          fetch(`${API_URL}/api/pos/bike-management/vehicles?status=available&page=1&limit=5000`, { headers: auth, cache: "no-store" }),
          fetch(`${API_URL}/api/pos/bike-management/products?limit=5000`, { headers: auth, cache: "no-store" }),
        ]);

        if ([bikeResponse.status, inventoryResponse.status].some((status) => status === 401 || status === 403)) {
          logout();
          return;
        }

        const [bikePayload, inventoryPayload] = await Promise.all([
          bikeResponse.json(),
          inventoryResponse.json(),
        ]) as [
          { data?: { vehicles?: BikeVehicleAlert[] } },
          { data?: { products?: InventoryProductAlert[] } },
        ];

        const bikeVehicles = bikePayload.data?.vehicles ?? [];
        const bikeGroups = new Map<string, { brandName: string; modelName: string; count: number; threshold: number }>();
        for (const vehicle of bikeVehicles) {
          const key = `${vehicle.brand.name}_${vehicle.model.id}`;
          const existing = bikeGroups.get(key) ?? {
            brandName: vehicle.brand.name,
            modelName: vehicle.model.name,
            count: 0,
            threshold: vehicle.model.lowStockThreshold ?? 1,
          };
          existing.count += 1;
          bikeGroups.set(key, existing);
        }

        const bikeNotifications: LowStockNotification[] = Array.from(bikeGroups.entries())
          .filter(([, group]) => group.threshold > 0 && group.count <= group.threshold)
          .map(([key, group]) => ({
            id: `bike-${key}`,
            type: "bike",
            title: `${group.brandName} ${group.modelName}`,
            message: `Only ${group.count} bikes left. Alert level: ${group.threshold}`,
            href: "/dashboard/bikes",
          }));

        const inventoryNotifications: LowStockNotification[] = (inventoryPayload.data?.products ?? [])
          .filter((product) => (product.lowStockThreshold ?? 0) > 0 && product.quantity <= (product.lowStockThreshold ?? 0))
          .map((product) => ({
            id: `inventory-${product.id}`,
            type: "inventory",
            title: product.name,
            message: `Only ${product.quantity} units left. Alert level: ${product.lowStockThreshold}`,
            href: "/dashboard/inventory",
          }));

        if (alive) {
          const nextNotifications = [...bikeNotifications, ...inventoryNotifications];
          setNotifications(nextNotifications);
          setReadNotificationIds((current) => current.filter((id) => nextNotifications.some((notification) => notification.id === id)));
          setDeletedNotificationIds((current) => current.filter((id) => nextNotifications.some((notification) => notification.id === id)));
        }
      } catch {
        if (alive) {
          setNotifications([]);
        }
      }
    };

    void loadNotifications();
    const intervalId = window.setInterval(() => { void loadNotifications(); }, 60000);
    return () => {
      alive = false;
      window.clearInterval(intervalId);
    };
  }, [token, logout, pathname]);

  const visibleNotifications = notifications.filter((notification) => !deletedNotificationIds.includes(notification.id));
  const unreadCount = visibleNotifications.filter((notification) => !readNotificationIds.includes(notification.id)).length;

  const markNotificationAsRead = (id: string) => {
    setReadNotificationIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const markAllNotificationsAsRead = () => {
    setReadNotificationIds((current) => Array.from(new Set([...current, ...visibleNotifications.map((notification) => notification.id)])));
  };

  const deleteNotification = (id: string) => {
    setDeletedNotificationIds((current) => (current.includes(id) ? current : [...current, id]));
  };

  const deleteAllNotifications = () => {
    setDeletedNotificationIds((current) => Array.from(new Set([...current, ...visibleNotifications.map((notification) => notification.id)])));
  };

  const pageLabel = BREADCRUMBS[pathname] ?? "Dashboard";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          <span className="topbar-breadcrumb-root">POS</span>
          <IconChevronNav />
          <span className="topbar-breadcrumb-page">{pageLabel}</span>
        </div>
        <div className="topbar-search">
          <IconSearch />
          <input type="text" placeholder="Search anything…" />
        </div>
      </div>

      {clockTime && (
        <div className="topbar-clock">
          <IconClock />
          <div className="topbar-clock-text">
            <span className="clock-time">{clockTime}</span>
            <span className="clock-date">{clockDate}</span>
          </div>
        </div>
      )}

      <div className="topbar-right">
        <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <IconMoon /> : <IconSun />}
        </button>
        <div ref={notificationPanelRef} style={{ position: "relative" }}>
          <button type="button" className="icon-btn notif-btn" aria-label="Notifications" onClick={() => setShowNotifications((value) => !value)}>
            <IconBell />
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>
          {showNotifications && (
            <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 360, maxHeight: 430, overflowY: "auto", background: "var(--panel)", border: "1px solid var(--panel-border)", borderRadius: 14, boxShadow: "0 16px 40px rgba(15, 23, 42, 0.18)", padding: 12, zIndex: 30 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <div>
                  <strong>Low stock notifications</strong>
                  <div style={{ color: "var(--text-soft)", fontSize: 12 }}>{unreadCount} unread</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  <button type="button" className="bm-btn bm-btn-ghost" style={{ padding: "6px 8px", fontSize: 11 }} onClick={markAllNotificationsAsRead} disabled={visibleNotifications.length === 0 || unreadCount === 0}>Mark all read</button>
                  <button type="button" className="bm-btn bm-btn-ghost" style={{ padding: "6px 8px", fontSize: 11 }} onClick={deleteAllNotifications} disabled={visibleNotifications.length === 0}>Delete all</button>
                </div>
              </div>
              {visibleNotifications.length === 0 ? (
                <div style={{ color: "var(--text-soft)", fontSize: 13 }}>All stock levels are healthy.</div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {visibleNotifications.map((notification) => {
                    const isRead = readNotificationIds.includes(notification.id);
                    return (
                      <div
                        key={notification.id}
                        style={{ border: "1px solid var(--panel-border)", borderRadius: 12, padding: "10px 12px", display: "grid", gap: 6, opacity: isRead ? 0.72 : 1, background: isRead ? "transparent" : "rgba(245, 158, 11, 0.08)" }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                          <strong style={{ fontSize: 13 }}>{notification.title}</strong>
                          <span className={`badge ${notification.type === "bike" ? "badge-pending" : "badge-warning"}`}>{notification.type === "bike" ? "Bike" : "Inventory"}</span>
                        </div>
                        <span style={{ fontSize: 12, color: "var(--text-soft)" }}>{notification.message}</span>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <Link
                            href={notification.href}
                            onClick={() => {
                              markNotificationAsRead(notification.id);
                              setShowNotifications(false);
                            }}
                            style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-strong)", textDecoration: "none" }}
                          >
                            Open
                          </Link>
                          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {!isRead && (
                              <button
                                type="button"
                                className="bm-btn bm-btn-ghost"
                                style={{ padding: "5px 8px", fontSize: 11 }}
                                onClick={() => markNotificationAsRead(notification.id)}
                              >
                                Mark read
                              </button>
                            )}
                            <button
                              type="button"
                              className="bm-btn bm-btn-ghost"
                              style={{ padding: "5px 8px", fontSize: 11 }}
                              onClick={() => deleteNotification(notification.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="topbar-divider" />
        <div className="admin-pill">
          <div className="admin-avatar">{admin.name.charAt(0).toUpperCase()}</div>
          <div className="admin-info">
            <span className="admin-name">{admin.name}</span>
            <span className="admin-role">Administrator</span>
          </div>
          <IconChevronDown />
        </div>
        <button type="button" className="topbar-logout-btn" onClick={logout} aria-label="Sign out">
          <IconLogout />
          <span>Sign out</span>
        </button>
      </div>
    </header>
  );
}
