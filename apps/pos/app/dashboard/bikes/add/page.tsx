"use client";

import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "../../../components/AdminContext";
import { API_URL } from "../../../lib/constants";
import { IconBike } from "../../../lib/icons";

type Brand = { id: number; name: string };
type Model = { id: number; name: string; brandId: number };

const EMPTY_FORM = {
  brandId: "",
  modelId: "",
  colour: "",
  registerNo: "",
  chassisNo: "",
  engineNo: "",
  fileNo: "",
  manufactureDate: "",
};

export default function AddBikePage() {
  const { token } = useAdmin();
  const [brands, setBrands]   = useState<Brand[]>([]);
  const [models, setModels]   = useState<Model[]>([]);
  const [form, setForm]       = useState(EMPTY_FORM);
  const [saving, setSaving]   = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError]     = useState<string | null>(null);

  // New brand / model inline-add controls
  const [newBrand, setNewBrand]           = useState("");
  const [addingBrand, setAddingBrand]     = useState(false);
  const [newModel, setNewModel]           = useState("");
  const [addingModel, setAddingModel]     = useState(false);

  const authHeader = { Authorization: `Bearer ${token}` };
  const base = `${API_URL}/api/pos/bike-management`;

  const loadBrands = useCallback(async () => {
    const res = await fetch(`${base}/brands`, { headers: authHeader });
    const json = await res.json() as { data: Brand[] };
    setBrands(json.data ?? []);
  }, [base, token]);

  useEffect(() => { void loadBrands(); }, [loadBrands]);

  useEffect(() => {
    if (!form.brandId) { setModels([]); return; }
    void (async () => {
      const res = await fetch(`${base}/brands/${form.brandId}/models`, { headers: authHeader });
      const json = await res.json() as { data: Model[] };
      setModels(json.data ?? []);
      setForm((f) => ({ ...f, modelId: "" }));
    })();
  }, [form.brandId]);

  const set = (field: keyof typeof EMPTY_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleAddBrand = async () => {
    if (!newBrand.trim()) return;
    setAddingBrand(true);
    try {
      const res = await fetch(`${base}/brands`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrand.trim() }),
      });
      if (!res.ok) {
        const j = await res.json() as { message: string };
        setError(j.message);
        return;
      }
      const j = await res.json() as { data: Brand };
      setBrands((b) => [...b, j.data].sort((a, z) => a.name.localeCompare(z.name)));
      setForm((f) => ({ ...f, brandId: String(j.data.id) }));
      setNewBrand("");
    } finally {
      setAddingBrand(false);
    }
  };

  const handleAddModel = async () => {
    if (!newModel.trim() || !form.brandId) return;
    setAddingModel(true);
    try {
      const res = await fetch(`${base}/brands/${form.brandId}/models`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ name: newModel.trim() }),
      });
      if (!res.ok) {
        const j = await res.json() as { message: string };
        setError(j.message);
        return;
      }
      const j = await res.json() as { data: Model };
      setModels((m) => [...m, j.data].sort((a, z) => a.name.localeCompare(z.name)));
      setForm((f) => ({ ...f, modelId: String(j.data.id) }));
      setNewModel("");
    } finally {
      setAddingModel(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!form.brandId || !form.modelId) { setError("Please select a brand and model."); return; }
    setSaving(true);
    try {
      const payload = {
        brandId:         Number(form.brandId),
        modelId:         Number(form.modelId),
        colour:          form.colour,
        registerNo:      form.registerNo,
        chassisNo:       form.chassisNo,
        engineNo:        form.engineNo,
        fileNo:          form.fileNo || undefined,
        manufactureDate: form.manufactureDate || undefined,
      };
      const res = await fetch(`${base}/vehicles`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json() as { data: { displayId: string }; message?: string };
      if (!res.ok) { setError((json as { message: string }).message ?? "Failed to add bike"); return; }
      setSuccess(`Bike added successfully — ID: ${json.data.displayId}`);
      setForm(EMPTY_FORM);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bm-page">
      {/* Header */}
      <div className="page-title-row">
        <div className="page-title-icon">
          <IconBike />
        </div>
        <div>
          <h2 className="page-title">Add Bike</h2>
          <p className="page-subtitle">Register a new vehicle in the inventory</p>
        </div>
      </div>

      <form className="bm-form-card" onSubmit={handleSubmit}>

        {/* Feedback banners */}
        {error   && <div className="bm-alert bm-alert-error">{error}</div>}
        {success && <div className="bm-alert bm-alert-success">{success}</div>}

        {/* Brand */}
        <div className="bm-form-section">
          <h3 className="bm-section-label">Brand</h3>
          <div className="bm-inline-add-row">
            <select className="bm-select" value={form.brandId} onChange={set("brandId")} required>
              <option value="">— Select Brand —</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="bm-quick-add-row">
            <input
              className="bm-input bm-input-sm"
              placeholder="New brand name…"
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleAddBrand(); }}}
            />
            <button type="button" className="btn-accent bm-add-btn" onClick={handleAddBrand} disabled={addingBrand || !newBrand.trim()}>
              {addingBrand ? "Adding…" : "+ Add Brand"}
            </button>
          </div>
        </div>

        {/* Model */}
        <div className="bm-form-section">
          <h3 className="bm-section-label">Model</h3>
          <div className="bm-inline-add-row">
            <select className="bm-select" value={form.modelId} onChange={set("modelId")} required disabled={!form.brandId}>
              <option value="">— Select Model —</option>
              {models.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          {form.brandId && (
            <div className="bm-quick-add-row">
              <input
                className="bm-input bm-input-sm"
                placeholder="New model name…"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void handleAddModel(); }}}
              />
              <button type="button" className="btn-accent bm-add-btn" onClick={handleAddModel} disabled={addingModel || !newModel.trim()}>
                {addingModel ? "Adding…" : "+ Add Model"}
              </button>
            </div>
          )}
        </div>

        {/* Vehicle details */}
        <div className="bm-form-section">
          <h3 className="bm-section-label">Vehicle Details</h3>
          <div className="bm-fields-grid">
            <div className="bm-field-group">
              <label>Chassis Number *</label>
              <input className="bm-input" value={form.chassisNo} onChange={set("chassisNo")} required placeholder="e.g. ABC123456" />
            </div>
            <div className="bm-field-group">
              <label>Engine Number *</label>
              <input className="bm-input" value={form.engineNo} onChange={set("engineNo")} required placeholder="e.g. ENG789012" />
            </div>
            <div className="bm-field-group">
              <label>Register Number *</label>
              <input className="bm-input" value={form.registerNo} onChange={set("registerNo")} required placeholder="e.g. WP-CAB-1234" />
            </div>
            <div className="bm-field-group">
              <label>Colour *</label>
              <input className="bm-input" value={form.colour} onChange={set("colour")} required placeholder="e.g. Red" />
            </div>
            <div className="bm-field-group">
              <label>File No</label>
              <input className="bm-input" value={form.fileNo} onChange={set("fileNo")} placeholder="Optional" />
            </div>
            <div className="bm-field-group">
              <label>Manufacture Date</label>
              <input className="bm-input" type="date" value={form.manufactureDate} onChange={set("manufactureDate")} />
            </div>
          </div>
        </div>

        <div className="bm-form-footer">
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? <><span className="spinner" />Saving…</> : "Save Vehicle"}
          </button>
        </div>
      </form>
    </div>
  );
}
