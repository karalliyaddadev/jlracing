"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdmin } from "../../components/AdminContext";
import { API_URL } from "../../lib/constants";
import { IconInvoice, IconUsers } from "../../lib/icons";

type Purchase = {
  id: number;
  purchasedAt: string;
  itemType: "BIKE" | "INVENTORY";
  purchaseMode?: "SINGLE" | "BULK";
  invoiceGroupCode?: string | null;
  quantity: number;
  currentSellingPrice?: number | null;
  finalSellingPrice: number;
  paymentType?: "DIRECT" | "DOWNPAYMENT";
  downPaymentAmount?: number;
  remainingAmount?: number;
  settlementStatus?: "SETTLED" | "TO_SETTLE";
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    nic: string;
    mobileNumber: string;
    address: string;
    province: string;
    district: string;
  };
  bike?: {
    id: number;
    displayId: string;
    brand: string;
    model: string;
    colour: string;
    year?: number | null;
    engineCapacityCc?: number | null;
    mileage?: number | null;
    condition: string;
    registrationType: string;
    fileNo?: string | null;
    registerNo?: string | null;
    chassisNo?: string | null;
    engineNo?: string | null;
    description?: string | null;
  } | null;
  inventory?: {
    id: number;
    displayId: string;
    name: string;
    brand: string;
    category: string;
    supplier?: string | null;
    description?: string | null;
  } | null;
};

type InvoiceRow = {
  key: string;
  invoiceLabel: string;
  purchasedAt: string;
  customer: Purchase["customer"];
  entries: Purchase[];
  quantity: number;
  finalSellingPrice: number;
  currentSellingPrice: number;
  downPaymentAmount: number;
  remainingAmount: number;
  settlementStatus: "SETTLED" | "TO_SETTLE";
  paymentTypeText: "Direct" | "Downpayment";
  purchaseModeText: "Single" | "Bulk";
  itemTitle: string;
  itemSubtitle: string;
};

export default function InvoicesPage() {
  const { token } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [invoices, setInvoices] = useState<Purchase[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(null);

  const base = `${API_URL}/api/pos/user-management`;
  const auth = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadInvoices = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const searchParam = search.trim() ? `&search=${encodeURIComponent(search.trim())}` : "";
      const response = await fetch(`${base}/purchases?page=1&limit=500${searchParam}`, { headers: auth, cache: "no-store" });
      const payload = await response.json() as { data?: { purchases?: Purchase[] }; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load invoices");
      setInvoices(payload.data?.purchases ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }, [auth, base, search, token]);

  useEffect(() => {
    void loadInvoices();
  }, [loadInvoices]);

  const getPurchaseItemMeta = useCallback((entry: Purchase) => {
    if (entry.itemType === "BIKE" && entry.bike) {
      return {
        title: `${entry.bike.brand} ${entry.bike.model}`,
        subtitle: `${entry.bike.displayId} • ${entry.bike.colour}`,
      };
    }
    if (entry.inventory) {
      return {
        title: entry.inventory.name,
        subtitle: `${entry.inventory.displayId} • ${entry.inventory.brand}`,
      };
    }
    return { title: "Unknown item", subtitle: "-" };
  }, []);

  const isDownPaymentEntry = useCallback((entry: Purchase) => {
    if (entry.paymentType === "DOWNPAYMENT") return true;
    const downPayment = entry.downPaymentAmount ?? 0;
    const remaining = entry.remainingAmount ?? 0;
    if (remaining > 0) return true;
    if (downPayment > 0 && downPayment < entry.finalSellingPrice) return true;
    return false;
  }, []);

  const invoiceRows = useMemo(() => {
    const grouped = new Map<string, Purchase[]>();

    const heuristicCounts = new Map<string, number>();
    invoices.forEach((entry) => {
      if (entry.invoiceGroupCode?.trim()) return;
      if (entry.itemType !== "BIKE") return;
      const secondBucket = Math.floor(new Date(entry.purchasedAt).getTime() / 1000);
      const key = `${entry.customer.id}:${secondBucket}`;
      heuristicCounts.set(key, (heuristicCounts.get(key) ?? 0) + 1);
    });

    invoices.forEach((entry) => {
      const groupCode = entry.invoiceGroupCode?.trim();
      const secondBucket = Math.floor(new Date(entry.purchasedAt).getTime() / 1000);
      const heuristicKey = `${entry.customer.id}:${secondBucket}`;
      const isHeuristicBulk = !groupCode && entry.itemType === "BIKE" && (heuristicCounts.get(heuristicKey) ?? 0) > 1;
      const key = groupCode
        ? `group:${entry.customer.id}:${groupCode}`
        : isHeuristicBulk
          ? `heuristic:${heuristicKey}`
          : `single:${entry.id}`;
      const existing = grouped.get(key);
      if (existing) existing.push(entry);
      else grouped.set(key, [entry]);
    });

    const rows: InvoiceRow[] = Array.from(grouped.entries()).map(([key, entries]) => {
      const sorted = [...entries].sort((a, b) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt));
      const representative = sorted[0];
      const explicitGroupCode = representative.invoiceGroupCode?.trim();
      const isBulk = sorted.length > 1 || representative.purchaseMode === "BULK" || !!explicitGroupCode;

      const quantity = sorted.reduce((sum, entry) => sum + entry.quantity, 0);
      const finalSellingPrice = sorted.reduce((sum, entry) => sum + entry.finalSellingPrice, 0);
      const currentSellingPrice = sorted.reduce((sum, entry) => sum + (entry.currentSellingPrice ?? 0), 0);
      const downPaymentAmount = sorted.reduce((sum, entry) => {
        const explicit = entry.downPaymentAmount ?? 0;
        if (explicit > 0) return sum + explicit;
        if (!isDownPaymentEntry(entry)) return sum;
        return sum + Math.max(0, entry.finalSellingPrice - (entry.remainingAmount ?? 0));
      }, 0);
      const remainingAmount = Math.max(0, Math.round(sorted.reduce((sum, entry) => sum + (entry.remainingAmount ?? 0), 0) * 100) / 100);
      const settlementStatus: "SETTLED" | "TO_SETTLE" = remainingAmount > 0 || sorted.some((entry) => entry.settlementStatus === "TO_SETTLE")
        ? "TO_SETTLE"
        : "SETTLED";
      const paymentTypeText: "Direct" | "Downpayment" = sorted.some((entry) => isDownPaymentEntry(entry)) ? "Downpayment" : "Direct";

      const itemTitle = isBulk ? `Bulk Purchase (${sorted.length} bike entries)` : getPurchaseItemMeta(representative).title;
      const itemSubtitle = isBulk
        ? sorted.slice(0, 2).map((entry) => getPurchaseItemMeta(entry).title).join(" + ")
        : getPurchaseItemMeta(representative).subtitle;

      const invoiceLabel = explicitGroupCode
        ? explicitGroupCode
        : isBulk
          ? `BULK-${String(Math.min(...sorted.map((entry) => entry.id))).padStart(5, "0")}`
          : `INV-${String(representative.id).padStart(5, "0")}`;

      return {
        key,
        invoiceLabel,
        purchasedAt: representative.purchasedAt,
        customer: representative.customer,
        entries: sorted,
        quantity,
        finalSellingPrice,
        currentSellingPrice,
        downPaymentAmount,
        remainingAmount,
        settlementStatus,
        paymentTypeText,
        purchaseModeText: isBulk ? "Bulk" : "Single",
        itemTitle,
        itemSubtitle,
      };
    });

    rows.sort((a, b) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt));
    return rows;
  }, [getPurchaseItemMeta, invoices, isDownPaymentEntry]);

  const totalInvoiceAmount = useMemo(
    () => invoiceRows.reduce((sum, invoice) => sum + invoice.finalSellingPrice, 0),
    [invoiceRows]
  );

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <div className="page-title-icon"><IconInvoice /></div>
          <div>
            <h2 className="page-title">Invoice Management</h2>
            <p className="page-subtitle">Purchase invoices with complete customer and item details.</p>
          </div>
        </div>
      </div>

      {error && <div className="bm-alert bm-alert-error">{error}</div>}

      <div className="bm-stats-grid" style={{ marginBottom: "1rem" }}>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconInvoice /></span><span className="bm-stat-label">Total Invoices</span></div>
          <strong className="bm-stat-value">{invoiceRows.length}</strong>
          <span className="bm-stat-sub">Completed purchase invoices</span>
        </div>
        <div className="bm-stat-card">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconUsers /></span><span className="bm-stat-label">Total Amount</span></div>
          <strong className="bm-stat-value">Rs. {totalInvoiceAmount.toLocaleString()}</strong>
          <span className="bm-stat-sub">Sum of final selling prices</span>
        </div>
      </div>

      <div className="bm-table-card">
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--panel-border)", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            className="bm-input"
            style={{ maxWidth: 420 }}
            placeholder="Search by customer, NIC, item ID, bike brand/model, or product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="btn-outline" onClick={() => void loadInvoices()}>Refresh</button>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Final Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="bm-table-empty">Loading invoices...</td></tr>}
              {!loading && invoiceRows.length === 0 && <tr><td colSpan={6} className="bm-table-empty">No invoices found.</td></tr>}
              {!loading && invoiceRows.map((invoice) => (
                <tr key={invoice.key}>
                  <td>{invoice.invoiceLabel}</td>
                  <td>{new Date(invoice.purchasedAt).toLocaleString()}</td>
                  <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                  <td>
                    <div className="users-order-title">{invoice.itemTitle}</div>
                    <span className="users-order-item-meta">{invoice.itemSubtitle}</span>
                    <span className="users-muted" style={{ display: "block" }}>{invoice.purchaseModeText} • {invoice.paymentTypeText}</span>
                  </td>
                  <td>Rs. {invoice.finalSellingPrice.toLocaleString()}</td>
                  <td>
                    <button type="button" className="btn-outline" onClick={() => setSelectedInvoice(invoice)}>View Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInvoice && (
        <div className="bm-modal-backdrop" onClick={() => setSelectedInvoice(null)}>
          <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="bm-modal-close" onClick={() => setSelectedInvoice(null)}>x</button>
            <h3 className="bm-modal-title">Invoice {selectedInvoice.invoiceLabel}</h3>
            <p className="users-muted" style={{ marginTop: "-0.5rem", marginBottom: "0.8rem" }}>
              {selectedInvoice.purchaseModeText} Invoice • {selectedInvoice.paymentTypeText}
            </p>

            <div className="users-view-grid">
              <div><strong>Date:</strong> {new Date(selectedInvoice.purchasedAt).toLocaleString()}</div>
              <div><strong>Customer:</strong> {selectedInvoice.customer.firstName} {selectedInvoice.customer.lastName}</div>
              <div><strong>NIC:</strong> {selectedInvoice.customer.nic}</div>
              <div><strong>Mobile:</strong> {selectedInvoice.customer.mobileNumber}</div>
              <div className="users-span-2"><strong>Address:</strong> {selectedInvoice.customer.address}, {selectedInvoice.customer.district}, {selectedInvoice.customer.province}</div>
            </div>

            {selectedInvoice.entries.length > 1 && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Bulk Contains Bikes</h4>
                <div className="data-table-wrap">
                  <table className="data-table users-orders-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Payment</th>
                        <th>Final Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.entries.map((entry) => (
                        <tr key={entry.id}>
                          <td>
                            <div className="users-order-title">{getPurchaseItemMeta(entry).title}</div>
                            <span className="users-order-item-meta">{getPurchaseItemMeta(entry).subtitle}</span>
                          </td>
                          <td>{entry.quantity}</td>
                          <td>{isDownPaymentEntry(entry) ? "Downpayment" : "Direct"}</td>
                          <td>Rs. {entry.finalSellingPrice.toLocaleString()}</td>
                          <td>{(entry.remainingAmount ?? 0) > 0 || entry.settlementStatus === "TO_SETTLE" ? `To Settle (Rs. ${(entry.remainingAmount ?? 0).toLocaleString()})` : "Settled"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {selectedInvoice.entries.length === 1 && selectedInvoice.entries[0].itemType === "BIKE" && selectedInvoice.entries[0].bike && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Bike Details</h4>
                <div className="users-view-grid">
                  <div><strong>Bike ID:</strong> {selectedInvoice.entries[0].bike.displayId}</div>
                  <div><strong>Model:</strong> {selectedInvoice.entries[0].bike.brand} {selectedInvoice.entries[0].bike.model}</div>
                  <div><strong>Colour:</strong> {selectedInvoice.entries[0].bike.colour}</div>
                  <div><strong>Year:</strong> {selectedInvoice.entries[0].bike.year ?? "-"}</div>
                  <div><strong>Engine Capacity:</strong> {selectedInvoice.entries[0].bike.engineCapacityCc ? `${selectedInvoice.entries[0].bike.engineCapacityCc} cc` : "-"}</div>
                  <div><strong>Mileage:</strong> {selectedInvoice.entries[0].bike.mileage != null ? `${selectedInvoice.entries[0].bike.mileage.toLocaleString()} km` : "-"}</div>
                  <div><strong>Condition:</strong> {selectedInvoice.entries[0].bike.condition}</div>
                  <div><strong>Registration:</strong> {selectedInvoice.entries[0].bike.registrationType}</div>
                  <div><strong>Register No:</strong> {selectedInvoice.entries[0].bike.registerNo ?? "-"}</div>
                  <div><strong>File No:</strong> {selectedInvoice.entries[0].bike.fileNo ?? "-"}</div>
                  <div><strong>Chassis No:</strong> {selectedInvoice.entries[0].bike.chassisNo ?? "-"}</div>
                  <div><strong>Engine No:</strong> {selectedInvoice.entries[0].bike.engineNo ?? "-"}</div>
                </div>
              </>
            )}

            {selectedInvoice.entries.length === 1 && selectedInvoice.entries[0].itemType === "INVENTORY" && selectedInvoice.entries[0].inventory && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Inventory Item Details</h4>
                <div className="users-view-grid">
                  <div><strong>Product ID:</strong> {selectedInvoice.entries[0].inventory.displayId}</div>
                  <div><strong>Product:</strong> {selectedInvoice.entries[0].inventory.name}</div>
                  <div><strong>Brand:</strong> {selectedInvoice.entries[0].inventory.brand}</div>
                  <div><strong>Category:</strong> {selectedInvoice.entries[0].inventory.category}</div>
                  <div><strong>Supplier:</strong> {selectedInvoice.entries[0].inventory.supplier ?? "-"}</div>
                  <div><strong>Quantity:</strong> {selectedInvoice.entries[0].quantity}</div>
                  <div className="users-span-2"><strong>Description:</strong> {selectedInvoice.entries[0].inventory.description ?? "-"}</div>
                </div>
              </>
            )}

            <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Pricing</h4>
            <div className="users-view-grid">
              <div><strong>Purchase Mode:</strong> {selectedInvoice.purchaseModeText}</div>
              <div><strong>Current Selling Price:</strong> {selectedInvoice.currentSellingPrice > 0 ? `Rs. ${selectedInvoice.currentSellingPrice.toLocaleString()}` : "-"}</div>
              <div><strong>Quantity:</strong> {selectedInvoice.quantity}</div>
              <div><strong>Final Selling Price:</strong> Rs. {selectedInvoice.finalSellingPrice.toLocaleString()}</div>
              <div><strong>Payment Type:</strong> {selectedInvoice.paymentTypeText} Buy</div>
              <div><strong>Downpayment:</strong> Rs. {selectedInvoice.downPaymentAmount.toLocaleString()}</div>
              <div><strong>Remaining Amount:</strong> Rs. {selectedInvoice.remainingAmount.toLocaleString()}</div>
              <div><strong>Status:</strong> {selectedInvoice.settlementStatus === "TO_SETTLE" ? "To Settle" : "Settled"}</div>
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button type="button" className="btn-accent" onClick={() => window.print()}>Print Invoice</button>
              <button type="button" className="btn-outline" onClick={() => setSelectedInvoice(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
