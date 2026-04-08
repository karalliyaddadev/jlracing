"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdmin } from "../../components/AdminContext";
import { API_URL } from "../../lib/constants";
import { IconInvoice, IconUsers } from "../../lib/icons";

type Purchase = {
  id: number;
  purchasedAt: string;
  itemType: "BIKE" | "INVENTORY";
  quantity: number;
  currentSellingPrice?: number | null;
  finalSellingPrice: number;
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

export default function InvoicesPage() {
  const { token } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [invoices, setInvoices] = useState<Purchase[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Purchase | null>(null);

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

  const totalInvoiceAmount = useMemo(
    () => invoices.reduce((sum, invoice) => sum + invoice.finalSellingPrice, 0),
    [invoices]
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
          <strong className="bm-stat-value">{invoices.length}</strong>
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
              {!loading && invoices.length === 0 && <tr><td colSpan={6} className="bm-table-empty">No invoices found.</td></tr>}
              {!loading && invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>INV-{String(invoice.id).padStart(5, "0")}</td>
                  <td>{new Date(invoice.purchasedAt).toLocaleString()}</td>
                  <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                  <td>
                    {invoice.itemType === "BIKE" && invoice.bike
                      ? `${invoice.bike.displayId} | ${invoice.bike.brand} ${invoice.bike.model}`
                      : invoice.inventory
                        ? `${invoice.inventory.displayId} | ${invoice.inventory.name}`
                        : "-"}
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
            <h3 className="bm-modal-title">Invoice INV-{String(selectedInvoice.id).padStart(5, "0")}</h3>

            <div className="users-view-grid">
              <div><strong>Date:</strong> {new Date(selectedInvoice.purchasedAt).toLocaleString()}</div>
              <div><strong>Customer:</strong> {selectedInvoice.customer.firstName} {selectedInvoice.customer.lastName}</div>
              <div><strong>NIC:</strong> {selectedInvoice.customer.nic}</div>
              <div><strong>Mobile:</strong> {selectedInvoice.customer.mobileNumber}</div>
              <div className="users-span-2"><strong>Address:</strong> {selectedInvoice.customer.address}, {selectedInvoice.customer.district}, {selectedInvoice.customer.province}</div>
            </div>

            {selectedInvoice.itemType === "BIKE" && selectedInvoice.bike && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Bike Details</h4>
                <div className="users-view-grid">
                  <div><strong>Bike ID:</strong> {selectedInvoice.bike.displayId}</div>
                  <div><strong>Model:</strong> {selectedInvoice.bike.brand} {selectedInvoice.bike.model}</div>
                  <div><strong>Colour:</strong> {selectedInvoice.bike.colour}</div>
                  <div><strong>Year:</strong> {selectedInvoice.bike.year ?? "-"}</div>
                  <div><strong>Engine Capacity:</strong> {selectedInvoice.bike.engineCapacityCc ? `${selectedInvoice.bike.engineCapacityCc} cc` : "-"}</div>
                  <div><strong>Mileage:</strong> {selectedInvoice.bike.mileage != null ? `${selectedInvoice.bike.mileage.toLocaleString()} km` : "-"}</div>
                  <div><strong>Condition:</strong> {selectedInvoice.bike.condition}</div>
                  <div><strong>Registration:</strong> {selectedInvoice.bike.registrationType}</div>
                  <div><strong>Register No:</strong> {selectedInvoice.bike.registerNo ?? "-"}</div>
                  <div><strong>File No:</strong> {selectedInvoice.bike.fileNo ?? "-"}</div>
                  <div><strong>Chassis No:</strong> {selectedInvoice.bike.chassisNo ?? "-"}</div>
                  <div><strong>Engine No:</strong> {selectedInvoice.bike.engineNo ?? "-"}</div>
                </div>
              </>
            )}

            {selectedInvoice.itemType === "INVENTORY" && selectedInvoice.inventory && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Inventory Item Details</h4>
                <div className="users-view-grid">
                  <div><strong>Product ID:</strong> {selectedInvoice.inventory.displayId}</div>
                  <div><strong>Product:</strong> {selectedInvoice.inventory.name}</div>
                  <div><strong>Brand:</strong> {selectedInvoice.inventory.brand}</div>
                  <div><strong>Category:</strong> {selectedInvoice.inventory.category}</div>
                  <div><strong>Supplier:</strong> {selectedInvoice.inventory.supplier ?? "-"}</div>
                  <div><strong>Quantity:</strong> {selectedInvoice.quantity}</div>
                  <div className="users-span-2"><strong>Description:</strong> {selectedInvoice.inventory.description ?? "-"}</div>
                </div>
              </>
            )}

            <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Pricing</h4>
            <div className="users-view-grid">
              <div><strong>Current Selling Price:</strong> {selectedInvoice.currentSellingPrice != null ? `Rs. ${selectedInvoice.currentSellingPrice.toLocaleString()}` : "-"}</div>
              <div><strong>Quantity:</strong> {selectedInvoice.quantity}</div>
              <div><strong>Final Selling Price:</strong> Rs. {selectedInvoice.finalSellingPrice.toLocaleString()}</div>
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
