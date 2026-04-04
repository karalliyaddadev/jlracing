"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAdmin } from "../../../components/AdminContext";
import { API_URL } from "../../../lib/constants";
import { IconActivity, IconInventory, IconInvoice, IconSupplier } from "../../../lib/icons";

type ProductImage = { id: number; url: string; isPrimary: boolean };
type Product = {
  id: number;
  displayId: string;
  name: string;
  quantity: number;
  soldQuantity: number;
  sellingPrice?: number;
  lastSoldAt?: string | null;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  supplier?: { id: number; name: string; code: string } | null;
  images?: ProductImage[];
};

export default function SoldInventoryPage() {
  const { token } = useAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const base = `${API_URL}/api/pos/bike-management`;
  const auth = { Authorization: `Bearer ${token}` };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const searchParam = search.trim() ? `&search=${encodeURIComponent(search.trim())}` : "";
      const response = await fetch(`${base}/products?limit=5000&soldOnly=true${searchParam}`, { headers: auth });
      const payload = await response.json() as { data?: { products?: Product[] }; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load sold products");
      setProducts(payload.data?.products ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sold products");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, search]);

  useEffect(() => { void loadData(); }, [loadData]);

  const totalSoldUnits = useMemo(() => products.reduce((sum, product) => sum + (product.soldQuantity ?? 0), 0), [products]);
  const totalInStock = useMemo(() => products.reduce((sum, product) => sum + product.quantity, 0), [products]);
  const estimatedRevenue = useMemo(() => products.reduce((sum, product) => sum + ((product.sellingPrice ?? 0) * (product.soldQuantity ?? 0)), 0), [products]);

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <div className="page-title-icon"><IconInvoice /></div>
          <div>
            <h2 className="page-title">Sold Inventory</h2>
            <p className="page-subtitle">See how many spare parts have been sold and keep a clear sold-count summary separate from current stock.</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <Link href="/dashboard/inventory" className="btn-outline">Inventory</Link>
        <Link href="/dashboard/inventory/sold" className="btn-accent">Sold Items</Link>
        <Link href="/dashboard/inventory/manage" className="btn-outline">Manage Data</Link>
      </div>

      {error && <div className="bm-alert bm-alert-error">{error}</div>}

      <div className="bm-stats-grid">
        <div className="bm-stat-card bm-stat-card-soft"><div className="bm-stat-head"><span className="bm-stat-icon"><IconInventory /></span><span className="bm-stat-label">Sold Products</span></div><strong className="bm-stat-value">{products.length}</strong><span className="bm-stat-sub">Products with recorded sales</span></div>
        <div className="bm-stat-card"><div className="bm-stat-head"><span className="bm-stat-icon"><IconInvoice /></span><span className="bm-stat-label">Sold Units</span></div><strong className="bm-stat-value">{totalSoldUnits}</strong><span className="bm-stat-sub">Total quantity sold</span></div>
        <div className="bm-stat-card bm-stat-card-soft"><div className="bm-stat-head"><span className="bm-stat-icon"><IconActivity /></span><span className="bm-stat-label">Estimated Revenue</span></div><strong className="bm-stat-value">Rs. {estimatedRevenue.toLocaleString()}</strong><span className="bm-stat-sub">Based on selling price</span></div>
        <div className="bm-stat-card"><div className="bm-stat-head"><span className="bm-stat-icon"><IconSupplier /></span><span className="bm-stat-label">Stock Left</span></div><strong className="bm-stat-value">{totalInStock}</strong><span className="bm-stat-sub">Remaining units in inventory</span></div>
      </div>

      <div className="bm-table-card">
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--panel-border)", display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <input className="bm-input" style={{ maxWidth: 420 }} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search sold products by name, brand, category or supplier" />
          <button type="button" className="btn-outline" onClick={() => void loadData()}>Refresh</button>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 70 }}>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Supplier</th>
                <th>Sold Qty</th>
                <th>In Stock</th>
                <th>Last Sold</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={8} className="bm-table-empty">Loading sold products...</td></tr>}
              {!loading && products.length === 0 && <tr><td colSpan={8} className="bm-table-empty">No sold inventory records yet.</td></tr>}
              {!loading && products.map((product) => {
                const primaryImg = (product.images ?? []).find((image) => image.isPrimary) ?? (product.images ?? [])[0];
                return (
                  <tr key={product.id} className="bm-vehicle-row">
                    <td>{primaryImg ? <img src={`${API_URL}${primaryImg.url}`} alt="" className="bm-row-thumb" /> : <span className="bm-row-thumb-empty">🖼️</span>}</td>
                    <td>
                      <span className="bm-vehicle-detail">{product.name}</span>
                      <span className="bm-vehicle-meta">{product.displayId}</span>
                    </td>
                    <td>{product.category.name}</td>
                    <td>{product.brand.name}</td>
                    <td>{product.supplier ? `${product.supplier.name} (${product.supplier.code})` : <em className="bm-missing">No supplier</em>}</td>
                    <td>{product.soldQuantity ?? 0}</td>
                    <td>{product.quantity}</td>
                    <td>{product.lastSoldAt ? new Date(product.lastSoldAt).toLocaleString() : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
