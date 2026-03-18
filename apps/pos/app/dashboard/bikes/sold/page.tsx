"use client";

import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "../../../components/AdminContext";
import { API_URL } from "../../../lib/constants";
import { IconBike, IconInventory, IconActivity, IconInvoice } from "../../../lib/icons";

type Vehicle = {
  id: number; displayId: string;
  brand: { name: string }; model: { name: string };
  colour: string; year?: number; fileNo?: string;
  chassisNo?: string; engineNo?: string; registerNo?: string;
  soldAt?: string;
};

function ViewVehicleModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  return (
    <div className="bm-modal-backdrop" onClick={onClose}>
      <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="bm-modal-close" onClick={onClose}>✕</button>
        <h3 className="bm-modal-title">Sold Bike Details — {vehicle.displayId}</h3>
        <div className="bm-fields-grid">
          <div className="bm-field-group"><label>Brand</label><input className="bm-input" value={vehicle.brand.name} disabled /></div>
          <div className="bm-field-group"><label>Model</label><input className="bm-input" value={vehicle.model.name} disabled /></div>
          <div className="bm-field-group"><label>Colour</label><input className="bm-input" value={vehicle.colour} disabled /></div>
          <div className="bm-field-group"><label>Year</label><input className="bm-input" value={vehicle.year ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>File No</label><input className="bm-input" value={vehicle.fileNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Register No</label><input className="bm-input" value={vehicle.registerNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Chassis No</label><input className="bm-input" value={vehicle.chassisNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Engine No</label><input className="bm-input" value={vehicle.engineNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Sold At</label><input className="bm-input" value={vehicle.soldAt ? new Date(vehicle.soldAt).toLocaleString() : "-"} disabled /></div>
        </div>
        <div className="bm-modal-actions">
          <button type="button" className="btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function SoldBikesPage() {
  const { token }           = useAdmin();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading]   = useState(true);
  const [restoring, setRestoring] = useState<number | null>(null);
  const [delConfirm, setDelConfirm] = useState<number | null>(null);
  const [viewVehicle, setViewVehicle] = useState<Vehicle | null>(null);

  const base = `${API_URL}/api/pos/bike-management`;
  const auth = { Authorization: `Bearer ${token}` };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${base}/vehicles?status=sold`, { headers: auth });
      const j = await r.json() as { data: { vehicles: Vehicle[] } };
      setVehicles(j.data?.vehicles ?? []);
    } finally { setLoading(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => { void load(); }, [load]);

  const restore = async (id: number) => {
    setRestoring(id);
    await fetch(`${base}/vehicles/${id}`, {
      method: "PATCH",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ status: "available" }),
    });
    setRestoring(null);
    void load();
  };

  const deleteSold = async (id: number) => {
    await fetch(`${base}/vehicles/${id}`, { method: "DELETE", headers: auth });
    setDelConfirm(null);
    void load();
  };

  const soldWithFileNo = vehicles.filter((v) => !!v.fileNo).length;
  const soldWithRegister = vehicles.filter((v) => !!v.registerNo).length;
  const uniqueModels = new Set(vehicles.map((v) => `${v.brand.name}_${v.model.name}`)).size;
  const latestSold = vehicles
    .map((v) => v.soldAt)
    .filter((d): d is string => typeof d === "string")
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <div className="page-title-icon"><IconBike /></div>
          <div>
            <h2 className="page-title">Sold Bikes</h2>
            <p className="page-subtitle">{vehicles.length} bike{vehicles.length !== 1 ? "s" : ""} sold</p>
          </div>
        </div>
      </div>

      <div className="bm-stats-grid">
        <div className="bm-stat-card bm-stat-card-danger">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconBike /></span>
            <span className="bm-stat-label">Total Sold</span>
          </div>
          <strong className="bm-stat-value">{vehicles.length}</strong>
          <span className="bm-stat-sub">Sold inventory records</span>
        </div>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconInvoice /></span>
            <span className="bm-stat-label">With File No</span>
          </div>
          <strong className="bm-stat-value">{soldWithFileNo}</strong>
          <span className="bm-stat-sub">Ready documentation</span>
        </div>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconInventory /></span>
            <span className="bm-stat-label">With Register No</span>
          </div>
          <strong className="bm-stat-value">{soldWithRegister}</strong>
          <span className="bm-stat-sub">Registered units</span>
        </div>
        <div className="bm-stat-card">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconActivity /></span>
            <span className="bm-stat-label">Model Coverage</span>
          </div>
          <strong className="bm-stat-value">{uniqueModels}</strong>
          <span className="bm-stat-sub">Latest sale: {latestSold ? new Date(latestSold).toLocaleDateString() : "-"}</span>
        </div>
      </div>

      <div className="bm-table-card">
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
                <th>Colour</th>
                <th>Year</th>
                <th>Chassis No</th>
                <th>Engine No</th>
                <th>File No</th>
                <th>Sold At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={10} className="bm-table-empty">Loading…</td></tr>
              )}
              {!loading && vehicles.length === 0 && (
                <tr><td colSpan={10} className="bm-table-empty">No sold bikes.</td></tr>
              )}
              {!loading && vehicles.map((v) => (
                <>
                  <tr key={v.id} className="bm-vehicle-row">
                    <td><span className="bm-display-id">{v.displayId}</span></td>
                    <td>{v.brand.name}</td>
                    <td>{v.model.name}</td>
                    <td>{v.colour}</td>
                    <td>{v.year ?? "—"}</td>
                    <td>{v.chassisNo ?? <em className="bm-missing">—</em>}</td>
                    <td>{v.engineNo ?? <em className="bm-missing">—</em>}</td>
                    <td>{v.fileNo ?? <em className="bm-missing">—</em>}</td>
                    <td>{v.soldAt ? new Date(v.soldAt).toLocaleDateString() : "—"}</td>
                    <td>
                      <div className="bm-row-actions">
                        <button
                          type="button"
                          className="bm-action-btn bm-view-btn"
                          onClick={() => setViewVehicle(v)}
                          title="View details"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="bm-action-btn bm-restore-btn"
                          onClick={() => restore(v.id)}
                          disabled={restoring === v.id}
                          title="Mark as available"
                        >
                          {restoring === v.id ? "…" : "↩ Restore"}
                        </button>
                        <button
                          type="button"
                          className="bm-action-btn bm-del-btn"
                          onClick={() => setDelConfirm(v.id)}
                          title="Delete permanently"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                  {delConfirm === v.id && (
                    <tr key={`del-${v.id}`}>
                      <td colSpan={10}>
                        <div className="bm-inline-confirm">
                          <span>Delete <strong>{v.displayId}</strong> permanently?</span>
                          <button className="bm-btn-danger" onClick={() => deleteSold(v.id)}>Delete</button>
                          <button className="btn-outline" onClick={() => setDelConfirm(null)}>Cancel</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewVehicle && <ViewVehicleModal vehicle={viewVehicle} onClose={() => setViewVehicle(null)} />}
    </div>
  );
}
