"use client";

import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "../../../components/AdminContext";
import { API_URL } from "../../../lib/constants";
import { IconBike, IconInventory, IconActivity, IconInvoice } from "../../../lib/icons";

type Brand = { id: number; name: string; _count?: { models: number; vehicles: number } };
type Model = { id: number; name: string; brandId: number; _count?: { vehicles: number } };
type Color = { id: number; name: string };

type ConfirmState = { type: "brand" | "model" | "color" | "fileNo"; id: number; name: string } | null;
type Tab = "brands" | "colors" | "filenos";

export default function ManageBikesPage() {
  const { token } = useAdmin();
  const [tab, setTab]                     = useState<Tab>("brands");
  const [brands, setBrands]               = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [models, setModels]               = useState<Model[]>([]);
  const [colors, setColors]               = useState<Color[]>([]);
  const [fileNos, setFileNos]             = useState<string[]>([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [confirm, setConfirm]             = useState<ConfirmState>(null);

  // Inline edit state
  const [editingBrand, setEditingBrand] = useState<{ id: number; name: string } | null>(null);
  const [editingModel, setEditingModel] = useState<{ id: number; name: string } | null>(null);
  const [editingColor, setEditingColor] = useState<{ id: number; name: string } | null>(null);
  const [editingFileNo, setEditingFileNo] = useState<{ oldValue: string; value: string } | null>(null);

  // Add brand / model / color
  const [newBrandName, setNewBrandName] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [savingBrand, setSavingBrand]   = useState(false);
  const [savingModel, setSavingModel]   = useState(false);
  const [savingColor, setSavingColor]   = useState(false);

  const authHeader = { Authorization: `Bearer ${token}` };
  const base = `${API_URL}/api/pos/bike-management`;

  const loadBrands = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${base}/brands`, { headers: authHeader });
      const json = await res.json() as { data: Brand[] };
      setBrands(json.data ?? []);
    } catch { setError("Failed to load brands"); }
    finally   { setLoading(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, token]);

  const loadModels = useCallback(async (brand: Brand) => {
    const res = await fetch(`${base}/brands/${brand.id}/models`, { headers: authHeader });
    const json = await res.json() as { data: Model[] };
    setModels(json.data ?? []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, token]);

  const loadColors = useCallback(async () => {
    const res = await fetch(`${base}/colors`, { headers: authHeader });
    const json = await res.json() as { data: Color[] };
    setColors(json.data ?? []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, token]);

  const loadFileNos = useCallback(async () => {
    const res = await fetch(`${base}/vehicles/filenos`, { headers: authHeader });
    const json = await res.json() as { data: string[] };
    setFileNos(json.data ?? []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, token]);

  useEffect(() => { void loadBrands(); void loadColors(); void loadFileNos(); }, [loadBrands, loadColors, loadFileNos]);
  useEffect(() => {
    if (selectedBrand) void loadModels(selectedBrand);
    else setModels([]);
  }, [selectedBrand, loadModels]);

  // ── Brand CRUD ──────────────────────────────────────────────────────────────
  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    setSavingBrand(true);
    setError(null);
    try {
      const res = await fetch(`${base}/brands`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrandName.trim() }),
      });
      const json = await res.json() as { data: Brand; message?: string };
      if (!res.ok) { setError((json as { message: string }).message); return; }
      setBrands((b) => [...b, json.data].sort((a, z) => a.name.localeCompare(z.name)));
      setNewBrandName("");
    } finally { setSavingBrand(false); }
  };

  const handleUpdateBrand = async () => {
    if (!editingBrand) return;
    setError(null);
    try {
      const res = await fetch(`${base}/brands/${editingBrand.id}`, {
        method: "PATCH",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingBrand.name.trim() }),
      });
      const json = await res.json() as { data: Brand; message?: string };
      if (!res.ok) { setError((json as { message: string }).message); return; }
      setBrands((b) => b.map((br) => br.id === json.data.id ? { ...br, ...json.data } : br)
        .sort((a, z) => a.name.localeCompare(z.name)));
      if (selectedBrand?.id === editingBrand.id) setSelectedBrand((s) => s ? { ...s, name: json.data.name } : s);
      setEditingBrand(null);
    } catch { setError("Update failed"); }
  };

  const handleDeleteBrand = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${base}/brands/${id}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) { const j = await res.json() as { message: string }; setError(j.message); return; }
      setBrands((b) => b.filter((br) => br.id !== id));
      if (selectedBrand?.id === id) { setSelectedBrand(null); setModels([]); }
    } catch { setError("Delete failed"); }
    finally { setConfirm(null); }
  };

  // ── Model CRUD ──────────────────────────────────────────────────────────────
  const handleAddModel = async () => {
    if (!newModelName.trim() || !selectedBrand) return;
    setSavingModel(true);
    setError(null);
    try {
      const res = await fetch(`${base}/brands/${selectedBrand.id}/models`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: newModelName.trim() }),
      });
      const json = await res.json() as { data: Model; message?: string };
      if (!res.ok) { setError((json as { message: string }).message); return; }
      setModels((m) => [...m, json.data].sort((a, z) => a.name.localeCompare(z.name)));
      // Update brand model count
      setBrands((b) => b.map((br) => br.id === selectedBrand.id
        ? { ...br, _count: { models: (br._count?.models ?? 0) + 1, vehicles: br._count?.vehicles ?? 0 } }
        : br));
      setNewModelName("");
    } finally { setSavingModel(false); }
  };

  const handleUpdateModel = async () => {
    if (!editingModel) return;
    setError(null);
    try {
      const res = await fetch(`${base}/models/${editingModel.id}`, {
        method: "PATCH",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingModel.name.trim() }),
      });
      const json = await res.json() as { data: Model; message?: string };
      if (!res.ok) { setError((json as { message: string }).message); return; }
      setModels((m) => m.map((mo) => mo.id === json.data.id ? { ...mo, ...json.data } : mo)
        .sort((a, z) => a.name.localeCompare(z.name)));
      setEditingModel(null);
    } catch { setError("Update failed"); }
  };

  const handleDeleteModel = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${base}/models/${id}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) { const j = await res.json() as { message: string }; setError(j.message); return; }
      setModels((m) => m.filter((mo) => mo.id !== id));
      if (selectedBrand) {
        setBrands((b) => b.map((br) => br.id === selectedBrand.id
          ? { ...br, _count: { models: Math.max(0, (br._count?.models ?? 1) - 1), vehicles: br._count?.vehicles ?? 0 } }
          : br));
      }
    } catch { setError("Delete failed"); }
    finally { setConfirm(null); }
  };

  // ── Color CRUD ──────────────────────────────────────────────────────────────
  const handleAddColor = async () => {
    if (!newColorName.trim()) return;
    setSavingColor(true); setError(null);
    try {
      const res = await fetch(`${base}/colors`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: newColorName.trim() }),
      });
      const json = await res.json() as { data: Color; message?: string };
      if (!res.ok) { setError((json as { message: string }).message); return; }
      setColors((c) => [...c, json.data].sort((a, z) => a.name.localeCompare(z.name)));
      setNewColorName("");
    } finally { setSavingColor(false); }
  };

  const handleUpdateColor = async () => {
    if (!editingColor) return;
    setError(null);
    try {
      const res = await fetch(`${base}/colors/${editingColor.id}`, {
        method: "PATCH",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingColor.name.trim() }),
      });
      const json = await res.json() as { data: Color; message?: string };
      if (!res.ok) { setError((json as { message: string }).message); return; }
      setColors((c) => c.map((co) => co.id === json.data.id ? json.data : co).sort((a, z) => a.name.localeCompare(z.name)));
      setEditingColor(null);
    } catch { setError("Update failed"); }
  };

  const handleDeleteColor = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`${base}/colors/${id}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) { const j = await res.json() as { message: string }; setError(j.message); return; }
      setColors((c) => c.filter((co) => co.id !== id));
    } catch { setError("Delete failed"); }
    finally { setConfirm(null); }
  };

  // ── File No CRUD ───────────────────────────────────────────────────────────
  const handleUpdateFileNo = async () => {
    if (!editingFileNo) return;
    const next = editingFileNo.value.trim();
    if (!next) return;
    setError(null);
    try {
      const res = await fetch(`${base}/vehicles/filenos`, {
        method: "PATCH",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ oldFileNo: editingFileNo.oldValue, newFileNo: next }),
      });
      const json = await res.json() as { message?: string };
      if (!res.ok) { setError(json.message ?? "Update failed"); return; }
      await loadFileNos();
      setEditingFileNo(null);
    } catch {
      setError("Update failed");
    }
  };

  const handleDeleteFileNo = async (fileNo: string) => {
    setError(null);
    try {
      const res = await fetch(`${base}/vehicles/filenos`, {
        method: "DELETE",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ fileNo }),
      });
      const json = await res.json() as { message?: string };
      if (!res.ok) { setError(json.message ?? "Delete failed"); return; }
      await loadFileNos();
    } catch {
      setError("Delete failed");
    } finally {
      setConfirm(null);
    }
  };

  const totalModels = brands.reduce((sum, b) => sum + (b._count?.models ?? 0), 0);
  const totalVehicles = brands.reduce((sum, b) => sum + (b._count?.vehicles ?? 0), 0);

  return (
    <div className="bm-page">
      {/* Header */}
      <div className="page-title-row">
        <div className="page-title-icon"><IconBike /></div>
        <div>
          <h2 className="page-title">Manage Data</h2>
          <p className="page-subtitle">Manage brands, models and colours. Deletions cascade to related vehicles.</p>
        </div>
      </div>

      {error && <div className="bm-alert bm-alert-error">{error}</div>}

      <div className="bm-stats-grid">
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconInventory /></span>
            <span className="bm-stat-label">Brands</span>
          </div>
          <strong className="bm-stat-value">{brands.length}</strong>
          <span className="bm-stat-sub">Total registered brands</span>
        </div>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconBike /></span>
            <span className="bm-stat-label">Models</span>
          </div>
          <strong className="bm-stat-value">{totalModels}</strong>
          <span className="bm-stat-sub">Across all brands</span>
        </div>
        <div className="bm-stat-card">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconActivity /></span>
            <span className="bm-stat-label">Colours</span>
          </div>
          <strong className="bm-stat-value">{colors.length}</strong>
          <span className="bm-stat-sub">Available colour options</span>
        </div>
        <div className="bm-stat-card bm-stat-card-danger">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconInvoice /></span>
            <span className="bm-stat-label">File Numbers</span>
          </div>
          <strong className="bm-stat-value">{fileNos.length}</strong>
          <span className="bm-stat-sub">Unique file references</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bm-manage-tabs">
        <button type="button" className={`bm-tab-btn${tab === "brands" ? " active" : ""}`} onClick={() => setTab("brands")}>Brands &amp; Models</button>
        <button type="button" className={`bm-tab-btn${tab === "colors" ? " active" : ""}`} onClick={() => setTab("colors")}>Colours</button>
        <button type="button" className={`bm-tab-btn${tab === "filenos" ? " active" : ""}`} onClick={() => setTab("filenos")}>File Nos</button>
      </div>

      {/* ── Brands & Models tab ────────────────────────────────────────────── */}
      {tab === "brands" && (
        <div className="bm-manage-grid">
          {/* Brands column */}
          <div className="bm-manage-col">
            <div className="bm-col-header">
              <span className="bm-col-title">Brands</span>
              <span className="bm-col-count">{brands.length}</span>
            </div>

            <div className="bm-quick-add-row bm-col-add">
              <input
                className="bm-input bm-input-sm"
                placeholder="New brand name…"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleAddBrand(); }}}
              />
              <button type="button" className="btn-accent bm-add-btn" onClick={handleAddBrand} disabled={savingBrand || !newBrandName.trim()}>
                {savingBrand ? "…" : "+"}
              </button>
            </div>

            {loading && <p className="bm-empty">Loading…</p>}
            {!loading && brands.length === 0 && <p className="bm-empty">No brands yet.</p>}

            <div className="bm-list">
              {brands.map((brand) => {
                const isSelected = selectedBrand?.id === brand.id;
                const isEditing  = editingBrand?.id === brand.id;
                return (
                  <div key={brand.id} className={`bm-list-item${isSelected ? " bm-list-item-active" : ""}`}>
                    {isEditing ? (
                      <div className="bm-edit-row">
                        <input
                          className="bm-input bm-input-sm bm-edit-input"
                          value={editingBrand.name}
                          autoFocus
                          onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleUpdateBrand(); } if (e.key === "Escape") setEditingBrand(null); }}
                        />
                        <button type="button" className="bm-action-btn bm-save-btn" onClick={handleUpdateBrand} title="Save">✓</button>
                        <button type="button" className="bm-action-btn bm-cancel-btn" onClick={() => setEditingBrand(null)} title="Cancel">✕</button>
                      </div>
                    ) : (
                      <>
                        <button type="button" className="bm-item-name-btn" onClick={() => setSelectedBrand(brand)}>
                          <span className="bm-item-name">{brand.name}</span>
                          <span className="bm-item-meta">
                            {brand._count?.models ?? 0} models · {brand._count?.vehicles ?? 0} vehicles
                          </span>
                        </button>
                        <div className="bm-actions">
                          <button type="button" className="bm-action-btn bm-edit-btn" onClick={() => setEditingBrand({ id: brand.id, name: brand.name })} title="Edit">✎</button>
                          <button type="button" className="bm-action-btn bm-del-btn" onClick={() => setConfirm({ type: "brand", id: brand.id, name: brand.name })} title="Delete">🗑</button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Models column */}
          <div className="bm-manage-col">
            <div className="bm-col-header">
              <span className="bm-col-title">
                {selectedBrand ? `Models — ${selectedBrand.name}` : "Models"}
              </span>
              {selectedBrand && <span className="bm-col-count">{models.length}</span>}
            </div>

            {!selectedBrand ? (
              <p className="bm-empty">← Select a brand to view its models.</p>
            ) : (
              <>
                <div className="bm-quick-add-row bm-col-add">
                  <input
                    className="bm-input bm-input-sm"
                    placeholder="New model name…"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleAddModel(); }}}
                  />
                  <button type="button" className="btn-accent bm-add-btn" onClick={handleAddModel} disabled={savingModel || !newModelName.trim()}>
                    {savingModel ? "…" : "+"}
                  </button>
                </div>

                {models.length === 0 && <p className="bm-empty">No models yet for this brand.</p>}

                <div className="bm-list">
                  {models.map((model) => {
                    const isEditing = editingModel?.id === model.id;
                    return (
                      <div key={model.id} className="bm-list-item">
                        {isEditing ? (
                          <div className="bm-edit-row">
                            <input
                              className="bm-input bm-input-sm bm-edit-input"
                              value={editingModel.name}
                              autoFocus
                              onChange={(e) => setEditingModel({ ...editingModel, name: e.target.value })}
                              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleUpdateModel(); } if (e.key === "Escape") setEditingModel(null); }}
                            />
                            <button type="button" className="bm-action-btn bm-save-btn" onClick={handleUpdateModel} title="Save">✓</button>
                            <button type="button" className="bm-action-btn bm-cancel-btn" onClick={() => setEditingModel(null)} title="Cancel">✕</button>
                          </div>
                        ) : (
                          <>
                            <div className="bm-item-name-btn">
                              <span className="bm-item-name">{model.name}</span>
                              <span className="bm-item-meta">{model._count?.vehicles ?? 0} vehicles</span>
                            </div>
                            <div className="bm-actions">
                              <button type="button" className="bm-action-btn bm-edit-btn" onClick={() => setEditingModel({ id: model.id, name: model.name })} title="Edit">✎</button>
                              <button type="button" className="bm-action-btn bm-del-btn" onClick={() => setConfirm({ type: "model", id: model.id, name: model.name })} title="Delete">🗑</button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Colours tab ────────────────────────────────────────────────────── */}
      {tab === "colors" && (
        <div className="bm-manage-col bm-manage-col-single">
          <div className="bm-col-header">
            <span className="bm-col-title">Colours</span>
            <span className="bm-col-count">{colors.length}</span>
          </div>

          <div className="bm-quick-add-row bm-col-add">
            <input
              className="bm-input bm-input-sm"
              placeholder="New colour name…"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleAddColor(); }}}
            />
            <button type="button" className="btn-accent bm-add-btn" onClick={handleAddColor} disabled={savingColor || !newColorName.trim()}>
              {savingColor ? "…" : "+"}
            </button>
          </div>

          {colors.length === 0 && <p className="bm-empty">No colours yet.</p>}

          <div className="bm-list">
            {colors.map((color) => {
              const isEditing = editingColor?.id === color.id;
              return (
                <div key={color.id} className="bm-list-item">
                  {isEditing ? (
                    <div className="bm-edit-row">
                      <input
                        className="bm-input bm-input-sm bm-edit-input"
                        value={editingColor.name}
                        autoFocus
                        onChange={(e) => setEditingColor({ ...editingColor, name: e.target.value })}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleUpdateColor(); } if (e.key === "Escape") setEditingColor(null); }}
                      />
                      <button type="button" className="bm-action-btn bm-save-btn" onClick={handleUpdateColor} title="Save">✓</button>
                      <button type="button" className="bm-action-btn bm-cancel-btn" onClick={() => setEditingColor(null)} title="Cancel">✕</button>
                    </div>
                  ) : (
                    <>
                      <div className="bm-item-name-btn">
                        <span className="bm-item-name">{color.name}</span>
                      </div>
                      <div className="bm-actions">
                        <button type="button" className="bm-action-btn bm-edit-btn" onClick={() => setEditingColor({ id: color.id, name: color.name })} title="Edit">✎</button>
                        <button type="button" className="bm-action-btn bm-del-btn" onClick={() => setConfirm({ type: "color", id: color.id, name: color.name })} title="Delete">🗑</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── File No tab ───────────────────────────────────────────────────── */}
      {tab === "filenos" && (
        <div className="bm-manage-col bm-manage-col-single">
          <div className="bm-col-header">
            <span className="bm-col-title">File Numbers</span>
            <span className="bm-col-count">{fileNos.length}</span>
          </div>

          <p className="bm-item-meta">File numbers are created from bike records. You can rename or clear them here.</p>

          {fileNos.length === 0 && <p className="bm-empty">No file numbers yet.</p>}

          <div className="bm-list">
            {fileNos.map((fileNo, idx) => {
              const isEditing = editingFileNo?.oldValue === fileNo;
              return (
                <div key={`${fileNo}-${idx}`} className="bm-list-item">
                  {isEditing ? (
                    <div className="bm-edit-row">
                      <input
                        className="bm-input bm-input-sm bm-edit-input"
                        value={editingFileNo.value}
                        autoFocus
                        onChange={(e) => setEditingFileNo({ ...editingFileNo, value: e.target.value })}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleUpdateFileNo(); } if (e.key === "Escape") setEditingFileNo(null); }}
                      />
                      <button type="button" className="bm-action-btn bm-save-btn" onClick={handleUpdateFileNo} title="Save">✓</button>
                      <button type="button" className="bm-action-btn bm-cancel-btn" onClick={() => setEditingFileNo(null)} title="Cancel">✕</button>
                    </div>
                  ) : (
                    <>
                      <div className="bm-item-name-btn">
                        <span className="bm-item-name">{fileNo}</span>
                      </div>
                      <div className="bm-actions">
                        <button type="button" className="bm-action-btn bm-edit-btn" onClick={() => setEditingFileNo({ oldValue: fileNo, value: fileNo })} title="Edit">✎</button>
                        <button type="button" className="bm-action-btn bm-del-btn" onClick={() => setConfirm({ type: "fileNo", id: idx, name: fileNo })} title="Delete">🗑</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Confirm delete modal ── */}
      {confirm && (
        <div className="bm-modal-backdrop" onClick={() => setConfirm(null)}>
          <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="bm-modal-title">Confirm Delete</h3>
            <p className="bm-modal-body">
              {confirm.type === "brand"
                ? <>Delete brand <strong>{confirm.name}</strong>? All related models and vehicles will also be permanently removed.</>
                : confirm.type === "model"
                ? <>Delete model <strong>{confirm.name}</strong>? All related vehicles will also be permanently removed.</>
                : confirm.type === "color"
                ? <>Delete colour <strong>{confirm.name}</strong>?</>
                : <>Delete file number <strong>{confirm.name}</strong>? This will clear that file number from all linked bikes.</>
              }
            </p>
            <div className="bm-modal-actions">
              <button type="button" className="btn-outline" onClick={() => setConfirm(null)}>Cancel</button>
              <button
                type="button"
                className="bm-btn-danger"
                onClick={() => confirm.type === "brand" ? handleDeleteBrand(confirm.id) : confirm.type === "model" ? handleDeleteModel(confirm.id) : confirm.type === "color" ? handleDeleteColor(confirm.id) : handleDeleteFileNo(confirm.name)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
