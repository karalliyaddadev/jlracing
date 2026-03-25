"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAdmin } from "../../components/AdminContext";
import { API_URL } from "../../lib/constants";
import { IconBike, IconInventory, IconActivity, IconInvoice } from "../../lib/icons";

// ── Types ──────────────────────────────────────────────────────────────────
type Brand = { id: number; name: string };
type Model = { id: number; name: string; brandId: number };
type Color = { id: number; name: string };
type Vehicle = {
  id: number; displayId: string; brandId: number; modelId: number;
  brand: { id: number; name: string }; model: { id: number; name: string };
  colour: string; year?: number; fileNo?: string; manufactureDate?: string;
  registerNo?: string; chassisNo?: string; engineNo?: string;
  condition: "brandnew" | "used";
  mileage: number;
  description?: string;
  status: "available" | "sold"; soldAt?: string;
  createdAt: string;
};
type Group = { brandId: number; brandName: string; modelId: number; modelName: string; count: number; vehicles: Vehicle[] };

// ── Combobox (type + suggestions + quick add) ─────────────────────────────
function Combobox({
  value, onChange, options, placeholder, onAdd, addLabel,
}: {
  value: string; onChange: (v: string) => void; options: string[];
  placeholder?: string; onAdd?: (v: string) => Promise<void>; addLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filtered = options.filter((o) => o.toLowerCase().includes(value.toLowerCase()));
  const exactMatch = options.some((o) => o.toLowerCase() === value.toLowerCase());

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAdd = async () => {
    if (!onAdd || !value.trim()) return;
    setAdding(true);
    try { await onAdd(value.trim()); setOpen(false); } finally { setAdding(false); }
  };

  return (
    <div className="bm-combobox" ref={ref}>
      <input
        className="bm-input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <div className="bm-combobox-dropdown">
          {filtered.length === 0 && !value && <div className="bm-combobox-empty">Start typing…</div>}
          {filtered.map((o) => (
            <button key={o} type="button" className="bm-combobox-item" onClick={() => { onChange(o); setOpen(false); }}>{o}</button>
          ))}
          {onAdd && value.trim() && !exactMatch && (
            <button type="button" className="bm-combobox-add" onClick={handleAdd} disabled={adding}>
              {adding ? "Adding…" : `+ Add "${value.trim()}" as ${addLabel ?? "option"}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Dropdown with + button ─────────────────────────────────────────────────
function SelectWithAdd<T extends { id: number; name: string }>({
  value, onChange, options, placeholder, disabled, onAdd,
}: {
  value: string; onChange: (v: string) => void; options: T[];
  placeholder?: string; disabled?: boolean; onAdd?: () => void;
}) {
  return (
    <div className="bm-select-row">
      <select className="bm-select" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} required>
        <option value="">{placeholder ?? "Select…"}</option>
        {options.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
      </select>
      {onAdd && (
        <button type="button" className="bm-plus-btn" onClick={onAdd} title="Add new">+</button>
      )}
    </div>
  );
}

// ── Add Bike Modal ─────────────────────────────────────────────────────────
function AddBikeModal({
  token, brands, colors, fileNos, onClose, onRefresh, onBrandAdded, onColorAdded,
}: {
  token: string; brands: Brand[]; colors: Color[]; fileNos: string[];
  onClose: () => void; onRefresh: () => void;
  onBrandAdded: (b: Brand) => void; onColorAdded: (c: Color) => void;
}) {
  const [mode, setMode] = useState<"single" | "bulk" | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [form, setForm] = useState({
    brandId: "", modelId: "", colour: "", year: "", fileNo: "",
    chassisNo: "", engineNo: "", registerNo: "", count: "1",
    condition: "brandnew", mileage: "0", description: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  // New-brand / new-model inline quick-add
  const [showNewBrand, setShowNewBrand] = useState(false);
  const [showNewModel, setShowNewModel] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [newModelName, setNewModelName] = useState("");

  const base = `${API_URL}/api/pos/bike-management`;
  const auth = { Authorization: `Bearer ${token}` };

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));
  const setE = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => set(k)(e.target.value);
  const setMileageZero = () => set("mileage")("0");

  useEffect(() => {
    if (!form.brandId) { setModels([]); return; }
    void fetch(`${base}/brands/${form.brandId}/models`, { headers: auth }).then(r => r.json()).then((j: { data: Model[] }) => setModels(j.data ?? []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.brandId]);

  const addBrand = async () => {
    if (!newBrandName.trim()) return;
    const r = await fetch(`${base}/brands`, { method: "POST", headers: { ...auth, "Content-Type": "application/json" }, body: JSON.stringify({ name: newBrandName.trim() }) });
    const j = await r.json() as { data: Brand; message?: string };
    if (!r.ok) { setError((j as { message: string }).message); return; }
    onBrandAdded(j.data);
    setForm((f) => ({ ...f, brandId: String(j.data.id) }));
    setNewBrandName(""); setShowNewBrand(false);
  };

  const addModel = async () => {
    if (!newModelName.trim() || !form.brandId) return;
    const r = await fetch(`${base}/brands/${form.brandId}/models`, { method: "POST", headers: { ...auth, "Content-Type": "application/json" }, body: JSON.stringify({ name: newModelName.trim() }) });
    const j = await r.json() as { data: Model; message?: string };
    if (!r.ok) { setError((j as { message: string }).message); return; }
    setModels((m) => [...m, j.data].sort((a, z) => a.name.localeCompare(z.name)));
    setForm((f) => ({ ...f, modelId: String(j.data.id) }));
    setNewModelName(""); setShowNewModel(false);
  };

  const addColor = async (name: string) => {
    const r = await fetch(`${base}/colors`, { method: "POST", headers: { ...auth, "Content-Type": "application/json" }, body: JSON.stringify({ name }) });
    const j = await r.json() as { data: Color };
    if (r.ok) { onColorAdded(j.data); setForm((f) => ({ ...f, colour: name })); }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.brandId || !form.modelId || !form.colour) { setError("Brand, model and colour are required."); return; }
    setSaving(true);
    try {
      if (mode === "bulk") {
        const r = await fetch(`${base}/vehicles/bulk`, {
          method: "POST", headers: { ...auth, "Content-Type": "application/json" },
          body: JSON.stringify({
            brandId: +form.brandId,
            modelId: +form.modelId,
            colour: form.colour,
            condition: form.condition,
            mileage: form.mileage ? +form.mileage : 0,
            year: form.year ? +form.year : undefined,
            count: +form.count,
          }),
        });
        if (!r.ok) { const j = await r.json() as { message: string }; setError(j.message); return; }
      } else {
        const r = await fetch(`${base}/vehicles`, {
          method: "POST", headers: { ...auth, "Content-Type": "application/json" },
          body: JSON.stringify({
            brandId: +form.brandId,
            modelId: +form.modelId,
            colour: form.colour,
            condition: form.condition,
            mileage: form.mileage ? +form.mileage : 0,
            description: form.description.trim() || undefined,
            year: form.year ? +form.year : undefined,
            fileNo: form.fileNo || undefined,
            chassisNo: form.chassisNo || undefined,
            engineNo: form.engineNo || undefined,
            registerNo: form.registerNo || undefined,
          }),
        });
        if (!r.ok) { const j = await r.json() as { message: string }; setError(j.message); return; }
      }
      onRefresh(); onClose();
    } finally { setSaving(false); }
  };

  if (!mode) return (
    <div className="bm-modal-backdrop" onClick={onClose}>
      <div className="bm-modal bm-modal-pick" onClick={(e) => e.stopPropagation()}>
        <h3 className="bm-modal-title">Add Bike</h3>
        <div className="bm-mode-grid">
          <button className="bm-mode-card" onClick={() => setMode("single")}>
            <span className="bm-mode-icon">🏍️</span>
            <strong>Single Add</strong>
            <span>Add one bike with full details</span>
          </button>
          <button className="bm-mode-card" onClick={() => setMode("bulk")}>
            <span className="bm-mode-icon">📦</span>
            <strong>Bulk Add</strong>
            <span>Add multiple bikes of same type</span>
          </button>
        </div>
        <button className="bm-modal-close" onClick={onClose}>✕</button>
      </div>
    </div>
  );

  return (
    <div className="bm-modal-backdrop" onClick={onClose}>
      <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="bm-modal-close" onClick={onClose}>✕</button>
        <h3 className="bm-modal-title">{mode === "bulk" ? "Bulk Add Bikes" : "Add Single Bike"}</h3>
        {error && <div className="bm-alert bm-alert-error">{error}</div>}
        <form className="bm-modal-form" onSubmit={submit}>
          {/* Brand */}
          <div className="bm-field-group">
            <label>Brand *</label>
            <SelectWithAdd value={form.brandId} onChange={set("brandId")} options={brands} placeholder="— Select Brand —" onAdd={() => setShowNewBrand(true)} />
            {showNewBrand && (
              <div className="bm-quick-add-row">
                <input className="bm-input bm-input-sm" placeholder="New brand…" value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void addBrand(); } if (e.key === "Escape") setShowNewBrand(false); }} autoFocus />
                <button type="button" className="btn-accent bm-add-btn" onClick={addBrand}>Save</button>
                <button type="button" className="bm-action-btn bm-cancel-btn" onClick={() => setShowNewBrand(false)}>✕</button>
              </div>
            )}
          </div>

          {/* Model */}
          <div className="bm-field-group">
            <label>Model *</label>
            <SelectWithAdd value={form.modelId} onChange={set("modelId")} options={models} placeholder="— Select Model —" disabled={!form.brandId} onAdd={form.brandId ? () => setShowNewModel(true) : undefined} />
            {showNewModel && (
              <div className="bm-quick-add-row">
                <input className="bm-input bm-input-sm" placeholder="New model…" value={newModelName} onChange={(e) => setNewModelName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void addModel(); } if (e.key === "Escape") setShowNewModel(false); }} autoFocus />
                <button type="button" className="btn-accent bm-add-btn" onClick={addModel}>Save</button>
                <button type="button" className="bm-action-btn bm-cancel-btn" onClick={() => setShowNewModel(false)}>✕</button>
              </div>
            )}
          </div>

          {/* Colour */}
          <div className="bm-field-group">
            <label>Colour *</label>
            <Combobox value={form.colour} onChange={set("colour")} options={colors.map((c) => c.name)} placeholder="Select or type colour" onAdd={addColor} addLabel="colour" />
          </div>

          {/* Year */}
          <div className="bm-field-group">
            <label>Year</label>
            <input className="bm-input" type="number" min={1990} max={2030} value={form.year} onChange={setE("year")} placeholder="e.g. 2024" />
          </div>

          <div className="bm-field-group">
            <label>Condition *</label>
            <select className="bm-select" value={form.condition} onChange={setE("condition")} required>
              <option value="brandnew">Brand New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className="bm-field-group">
            <label>Mileage</label>
            <div className="bm-quick-add-row">
              <input className="bm-input" type="number" min={0} value={form.mileage} onChange={setE("mileage")} placeholder="e.g. 0" />
              <button type="button" className="btn-outline" onClick={setMileageZero}>Set 0</button>
            </div>
          </div>

          {mode === "bulk" && (
            <div className="bm-field-group">
              <label>Quantity *</label>
              <input className="bm-input" type="number" min={1} max={500} value={form.count} onChange={setE("count")} required />
            </div>
          )}

          {mode === "single" && (
            <>
              <div className="bm-field-group">
                <label>Chassis No</label>
                <input className="bm-input" value={form.chassisNo} onChange={setE("chassisNo")} placeholder="e.g. ABC123456" />
              </div>
              <div className="bm-field-group">
                <label>Engine No</label>
                <input className="bm-input" value={form.engineNo} onChange={setE("engineNo")} placeholder="e.g. ENG789012" />
              </div>
              <div className="bm-field-group">
                <label>Register No</label>
                <input className="bm-input" value={form.registerNo} onChange={setE("registerNo")} placeholder="e.g. WP-CAB-1234" />
              </div>
              <div className="bm-field-group">
                <label>File No</label>
                <Combobox value={form.fileNo} onChange={set("fileNo")} options={fileNos} placeholder="Select or type file no" onAdd={(v) => { set("fileNo")(v); return Promise.resolve(); }} addLabel="file no" />
              </div>
              <div className="bm-field-group" style={{ gridColumn: "1 / -1" }}>
                <label>Description</label>
                <textarea
                  className="bm-input"
                  rows={3}
                  value={form.description}
                  onChange={(e) => set("description")(e.target.value)}
                  placeholder="Add vehicle description"
                />
              </div>
            </>
          )}

          <div className="bm-modal-actions">
            <button type="button" className="btn-outline" onClick={() => { setMode(null); setError(null); }}>Back</button>
            <button type="submit" className="btn-accent" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Edit Vehicle Modal ─────────────────────────────────────────────────────
function EditVehicleModal({ vehicle, token, onClose, onSaved }: {
  vehicle: Vehicle; token: string; onClose: () => void; onSaved: (v: Vehicle) => void;
}) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [form, setForm] = useState({
    brandId: String(vehicle.brandId),
    modelId: String(vehicle.modelId),
    chassisNo:  vehicle.chassisNo  ?? "",
    engineNo:   vehicle.engineNo   ?? "",
    registerNo: vehicle.registerNo ?? "",
    fileNo:     vehicle.fileNo     ?? "",
    colour:     vehicle.colour,
    year:       vehicle.year ? String(vehicle.year) : "",
    condition:  vehicle.condition ?? "brandnew",
    mileage:    String(vehicle.mileage ?? 0),
    description: vehicle.description ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const base = `${API_URL}/api/pos/bike-management`;
  const auth = { Authorization: `Bearer ${token}` };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    void fetch(`${base}/brands`, { headers: auth })
      .then((r) => r.json())
      .then((j: { data: Brand[] }) => setBrands(j.data ?? []));

    void fetch(`${base}/colors`, { headers: auth })
      .then((r) => r.json())
      .then((j: { data: Color[] }) => setColors((j.data ?? []).map((c) => c.name)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!form.brandId) {
      setModels([]);
      return;
    }
    void fetch(`${base}/brands/${form.brandId}/models`, { headers: auth })
      .then((r) => r.json())
      .then((j: { data: Model[] }) => setModels(j.data ?? []));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.brandId]);

  const addColor = async (name: string) => {
    const value = name.trim();
    if (!value) return;

    const exists = colors.some((c) => c.toLowerCase() === value.toLowerCase());
    if (exists) return;

    const res = await fetch(`${base}/colors`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ name: value }),
    });

    if (res.ok) {
      setColors((prev) => [...prev, value].sort((a, b) => a.localeCompare(b)));
      return;
    }

    // If another user created same color concurrently, allow update flow to continue.
    const payload = await res.json() as { message?: string };
    if (res.status !== 409) {
      throw new Error(payload.message ?? "Failed to add color");
    }
    setColors((prev) => [...prev, value].sort((a, b) => a.localeCompare(b)));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(null); setSaving(true);
    try {
      if (!form.brandId || !form.modelId) {
        setError("Brand and model are required");
        return;
      }

      await addColor(form.colour);

      const r = await fetch(`${base}/vehicles/${vehicle.id}`, {
        method: "PATCH", headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({
          brandId: +form.brandId,
          modelId: +form.modelId,
          chassisNo: form.chassisNo || undefined,
          engineNo: form.engineNo || undefined,
          registerNo: form.registerNo || undefined,
          fileNo: form.fileNo || undefined,
          colour: form.colour,
          year: form.year ? +form.year : undefined,
          condition: form.condition,
          mileage: form.mileage ? +form.mileage : 0,
          description: form.description.trim() || undefined,
        }),
      });
      const j = await r.json() as { data: Vehicle; message?: string };
      if (!r.ok) { setError((j as { message: string }).message); return; }
      onSaved(j.data); onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally { setSaving(false); }
  };

  return (
    <div className="bm-modal-backdrop" onClick={onClose}>
      <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="bm-modal-close" onClick={onClose}>✕</button>
        <h3 className="bm-modal-title">Edit Vehicle — {vehicle.displayId}</h3>
        {error && <div className="bm-alert bm-alert-error">{error}</div>}
        <form className="bm-modal-form" onSubmit={submit}>
          <div className="bm-fields-grid">
            <div className="bm-field-group">
              <label>Brand</label>
              <select className="bm-select" value={form.brandId} onChange={set("brandId")} required>
                <option value="">Select brand</option>
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div className="bm-field-group">
              <label>Model</label>
              <select className="bm-select" value={form.modelId} onChange={set("modelId")} required>
                <option value="">Select model</option>
                {models.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            <div className="bm-field-group"><label>Chassis No</label><input className="bm-input" value={form.chassisNo} onChange={set("chassisNo")} placeholder="Chassis number" /></div>
            <div className="bm-field-group"><label>Engine No</label><input className="bm-input" value={form.engineNo} onChange={set("engineNo")} placeholder="Engine number" /></div>
            <div className="bm-field-group"><label>Register No</label><input className="bm-input" value={form.registerNo} onChange={set("registerNo")} placeholder="Register number" /></div>
            <div className="bm-field-group"><label>File No</label><input className="bm-input" value={form.fileNo} onChange={set("fileNo")} placeholder="File number" /></div>
            <div className="bm-field-group">
              <label>Colour</label>
              <Combobox
                value={form.colour}
                onChange={(v) => setForm((f) => ({ ...f, colour: v }))}
                options={colors}
                placeholder="Select or type colour"
                onAdd={addColor}
                addLabel="colour"
              />
            </div>
            <div className="bm-field-group"><label>Year</label><input className="bm-input" type="number" value={form.year} onChange={set("year")} /></div>
            <div className="bm-field-group">
              <label>Condition</label>
              <select className="bm-select" value={form.condition} onChange={set("condition")}>
                <option value="brandnew">Brand New</option>
                <option value="used">Used</option>
              </select>
            </div>
            <div className="bm-field-group">
              <label>Mileage</label>
              <div className="bm-quick-add-row">
                <input className="bm-input" type="number" min={0} value={form.mileage} onChange={set("mileage")} />
                <button type="button" className="btn-outline" onClick={() => setForm((f) => ({ ...f, mileage: "0" }))}>Set 0</button>
              </div>
            </div>
            <div className="bm-field-group" style={{ gridColumn: "1 / -1" }}>
              <label>Description</label>
              <textarea
                className="bm-input"
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Add vehicle description"
              />
            </div>
          </div>
          <div className="bm-modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-accent" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ViewVehicleModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  return (
    <div className="bm-modal-backdrop" onClick={onClose}>
      <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
        <button className="bm-modal-close" onClick={onClose}>✕</button>
        <h3 className="bm-modal-title">Bike Details — {vehicle.displayId}</h3>
        <div className="bm-fields-grid">
          <div className="bm-field-group"><label>Brand</label><input className="bm-input" value={vehicle.brand.name} disabled /></div>
          <div className="bm-field-group"><label>Model</label><input className="bm-input" value={vehicle.model.name} disabled /></div>
          <div className="bm-field-group"><label>Colour</label><input className="bm-input" value={vehicle.colour} disabled /></div>
          <div className="bm-field-group"><label>Year</label><input className="bm-input" value={vehicle.year ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>File No</label><input className="bm-input" value={vehicle.fileNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Register No</label><input className="bm-input" value={vehicle.registerNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Chassis No</label><input className="bm-input" value={vehicle.chassisNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Engine No</label><input className="bm-input" value={vehicle.engineNo ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Condition</label><input className="bm-input" value={vehicle.condition === "used" ? "Used" : "Brand New"} disabled /></div>
          <div className="bm-field-group"><label>Mileage</label><input className="bm-input" value={vehicle.mileage ?? 0} disabled /></div>
          <div className="bm-field-group" style={{ gridColumn: "1 / -1" }}><label>Description</label><textarea className="bm-input" rows={3} value={vehicle.description ?? "-"} disabled /></div>
          <div className="bm-field-group"><label>Status</label><input className="bm-input" value={vehicle.status} disabled /></div>
        </div>
        <div className="bm-modal-actions">
          <button type="button" className="btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Group Row (brand+model card) ───────────────────────────────────────────
function GroupRow({ group, token, onRefresh }: { group: Group; token: string; onRefresh: () => void }) {
  const [open, setOpen]         = useState(false);
  const [viewV, setViewV]       = useState<Vehicle | null>(null);
  const [editV, setEditV]       = useState<Vehicle | null>(null);
  const [delConfirm, setDelConfirm] = useState<number | null>(null);
  const [marking, setMarking]   = useState<number | null>(null);
  const base = `${API_URL}/api/pos/bike-management`;
  const auth = { Authorization: `Bearer ${token}` };

  const [vehicles, setVehicles] = useState<Vehicle[]>(group.vehicles);
  useEffect(() => setVehicles(group.vehicles), [group.vehicles]);

  const markSold = async (id: number) => {
    setMarking(id);
    await fetch(`${base}/vehicles/${id}`, { method: "PATCH", headers: { ...auth, "Content-Type": "application/json" }, body: JSON.stringify({ status: "sold" }) });
    onRefresh();
    setMarking(null);
  };

  const deleteVehicle = async (id: number) => {
    await fetch(`${base}/vehicles/${id}`, { method: "DELETE", headers: auth });
    onRefresh(); setDelConfirm(null);
  };

  const available = vehicles.filter((v) => v.status === "available").length;

  return (
    <>
      <tr className="bm-group-row">
        <td>
          <button type="button" className="bm-expand-btn" onClick={() => setOpen((v) => !v)}>
            <span className={`bm-chevron${open ? " open" : ""}`}>▾</span>
          </button>
        </td>
        <td><strong>{group.brandName}</strong></td>
        <td>{group.modelName}</td>
        <td className="td-num">{available}</td>
        <td className="td-num">{group.count}</td>
        <td />
      </tr>
      {open && vehicles.map((v) => (
        <tr key={v.id} className="bm-vehicle-row">
          <td />
          <td><span className="bm-display-id">{v.displayId}</span></td>
          <td>
            <span className="bm-vehicle-detail">{v.colour}{v.year ? ` · ${v.year}` : ""}</span>
            <span className="bm-vehicle-meta">
              {(v.condition === "used" ? "Used" : "Brand New") + ` · ${v.mileage ?? 0} km`}
            </span>
            <span className="bm-vehicle-meta">
              {v.chassisNo ? `CH: ${v.chassisNo}` : <em className="bm-missing">No chassis</em>}
            </span>
          </td>
          <td><span className={`badge ${v.status === "available" ? "badge-active" : "badge-pending"}`}>{v.status}</span></td>
          <td />
          <td>
            <div className="bm-row-actions">
              <button type="button" className="bm-action-btn bm-view-btn" onClick={() => setViewV(v)} title="View details">View</button>
              <button type="button" className="bm-action-btn bm-edit-btn" onClick={() => setEditV(v)} title="Edit">✎</button>
              {v.status === "available" && (
                <button type="button" className="bm-action-btn bm-sold-btn" onClick={() => markSold(v.id)} disabled={marking === v.id} title="Mark as sold">✅</button>
              )}
              <button type="button" className="bm-action-btn bm-del-btn" onClick={() => setDelConfirm(v.id)} title="Delete">🗑</button>
            </div>
          </td>
        </tr>
      ))}
      {viewV && <ViewVehicleModal vehicle={viewV} onClose={() => setViewV(null)} />}
      {editV && <EditVehicleModal vehicle={editV} token={token} onClose={() => setEditV(null)} onSaved={() => { setEditV(null); onRefresh(); }} />}
      {delConfirm !== null && (
        <tr><td colSpan={6}>
          <div className="bm-inline-confirm">
            <span>Delete this vehicle permanently?</span>
            <button className="bm-btn-danger" onClick={() => deleteVehicle(delConfirm)}>Delete</button>
            <button className="btn-outline" onClick={() => setDelConfirm(null)}>Cancel</button>
          </div>
        </td></tr>
      )}
    </>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
function groupByBrandModel(vehicles: Vehicle[]): Group[] {
  const map = new Map<string, Group>();

  for (const v of vehicles) {
    const key = `${v.brandId}_${v.modelId}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, {
        brandId: v.brandId,
        brandName: v.brand.name,
        modelId: v.modelId,
        modelName: v.model.name,
        count: 1,
        vehicles: [v],
      });
      continue;
    }
    existing.count += 1;
    existing.vehicles.push(v);
  }

  return Array.from(map.values()).sort((a, b) => {
    const brandComp = a.brandName.localeCompare(b.brandName);
    if (brandComp !== 0) return brandComp;
    return a.modelName.localeCompare(b.modelName);
  });
}

export default function BikeInventoryPage() {
  const { token } = useAdmin();
  const [groups, setGroups] = useState<Group[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [fileNos, setFileNos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [statsSource, setStatsSource] = useState<Vehicle[]>([]);

  const [filters, setFilters] = useState({
    brandId: "",
    modelId: "",
    colour: "",
    year: "",
    fileNo: "",
    registerNo: "",
    search: "",
  });

  const base = `${API_URL}/api/pos/bike-management`;
  const auth = { Authorization: `Bearer ${token}` };

  const setFilter = (key: keyof typeof filters) => (value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brandId: "",
      modelId: "",
      colour: "",
      year: "",
      fileNo: "",
      registerNo: "",
      search: "",
    });
  };

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const params = new URLSearchParams({ status: "available", page: "1", limit: "5000" });
      if (filters.brandId) params.set("brandId", filters.brandId);
      if (filters.modelId) params.set("modelId", filters.modelId);
      if (filters.colour) params.set("colour", filters.colour);
      if (filters.year) params.set("year", filters.year);
      if (filters.fileNo) params.set("fileNo", filters.fileNo);
      if (filters.registerNo) params.set("registerNo", filters.registerNo);
      if (filters.search) params.set("search", filters.search);

      const vRes = await fetch(`${base}/vehicles?${params.toString()}`, {
        headers: auth,
        cache: "no-store",
      });
      const vj = await vRes.json() as { data?: { vehicles?: Vehicle[] }; message?: string };
      if (!vRes.ok) {
        throw new Error(vj.message ?? "Failed to load bikes");
      }

      const vehicles = vj.data?.vehicles ?? [];
      setStatsSource(vehicles);
      setGroups(groupByBrandModel(vehicles));

      const [bRes, mRes, cRes, fRes] = await Promise.allSettled([
        fetch(`${base}/brands`, { headers: auth, cache: "no-store" }),
        fetch(`${base}/models`, { headers: auth, cache: "no-store" }),
        fetch(`${base}/colors`, { headers: auth, cache: "no-store" }),
        fetch(`${base}/vehicles/filenos`, { headers: auth, cache: "no-store" }),
      ]);

      if (bRes.status === "fulfilled" && bRes.value.ok) {
        const bj = await bRes.value.json() as { data?: Brand[] };
        setBrands(bj.data ?? []);
      }
      if (mRes.status === "fulfilled" && mRes.value.ok) {
        const mj = await mRes.value.json() as { data?: Model[] };
        setModels(mj.data ?? []);
      }
      if (cRes.status === "fulfilled" && cRes.value.ok) {
        const cj = await cRes.value.json() as { data?: Color[] };
        setColors(cj.data ?? []);
      }
      if (fRes.status === "fulfilled" && fRes.value.ok) {
        const fj = await fRes.value.json() as { data?: string[] };
        setFileNos(fj.data ?? []);
      }
    } catch (err) {
      setStatsSource([]);
      setGroups([]);
      setLoadError(err instanceof Error ? err.message : "Failed to load bikes");
    } finally { setLoading(false); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filters]);

  useEffect(() => { void load(); }, [load]);

  const totalAvailable = statsSource.length;
  const brandCount = new Set(statsSource.map((v) => v.brandId)).size;
  const modelCount = new Set(statsSource.map((v) => v.modelId)).size;
  const incompleteCount = statsSource.filter((v) => !v.fileNo || !v.registerNo).length;

  const filteredModels = filters.brandId
    ? models.filter((m) => String(m.brandId) === filters.brandId)
    : models;

  const years = Array.from(new Set(statsSource.map((v) => v.year).filter((v): v is number => typeof v === "number"))).sort((a, b) => b - a);

  useEffect(() => {
    if (!filters.brandId || !filters.modelId) return;
    const exists = filteredModels.some((m) => String(m.id) === filters.modelId);
    if (!exists) {
      setFilters((prev) => ({ ...prev, modelId: "" }));
    }
  }, [filters.brandId, filters.modelId, filteredModels]);

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <div className="page-title-icon"><IconBike /></div>
          <div>
            <h2 className="page-title">Bike Inventory</h2>
            <p className="page-subtitle">{totalAvailable} bikes available in stock</p>
          </div>
        </div>
        <button className="btn-accent" onClick={() => setShowAdd(true)}>+ Add Bike</button>
      </div>

      <div className="bm-stats-grid">
        <div className="bm-stat-card">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconBike /></span>
            <span className="bm-stat-label">Available Bikes</span>
          </div>
          <strong className="bm-stat-value">{totalAvailable}</strong>
          <span className="bm-stat-sub">Current filtered stock</span>
        </div>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconInventory /></span>
            <span className="bm-stat-label">Brands</span>
          </div>
          <strong className="bm-stat-value">{brandCount}</strong>
          <span className="bm-stat-sub">Active in results</span>
        </div>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconActivity /></span>
            <span className="bm-stat-label">Models</span>
          </div>
          <strong className="bm-stat-value">{modelCount}</strong>
          <span className="bm-stat-sub">Variant coverage</span>
        </div>
        <div className="bm-stat-card bm-stat-card-warn">
          <div className="bm-stat-head">
            <span className="bm-stat-icon"><IconInvoice /></span>
            <span className="bm-stat-label">Need Details</span>
          </div>
          <strong className="bm-stat-value">{incompleteCount}</strong>
          <span className="bm-stat-sub">Missing file no or register no</span>
        </div>
      </div>

      <div className="bm-filter-card">
        <div className="bm-filter-grid">
          <div className="bm-field-group">
            <label>Brand</label>
            <select className="bm-select" value={filters.brandId} onChange={(e) => setFilter("brandId")(e.target.value)}>
              <option value="">All Brands</option>
              {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="bm-field-group">
            <label>Model</label>
            <select className="bm-select" value={filters.modelId} onChange={(e) => setFilter("modelId")(e.target.value)}>
              <option value="">All Models</option>
              {filteredModels.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="bm-field-group">
            <label>Colour</label>
            <select className="bm-select" value={filters.colour} onChange={(e) => setFilter("colour")(e.target.value)}>
              <option value="">All Colours</option>
              {colors.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="bm-field-group">
            <label>Year</label>
            <select className="bm-select" value={filters.year} onChange={(e) => setFilter("year")(e.target.value)}>
              <option value="">All Years</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="bm-field-group">
            <label>File No</label>
            <select className="bm-select" value={filters.fileNo} onChange={(e) => setFilter("fileNo")(e.target.value)}>
              <option value="">All File Nos</option>
              {fileNos.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="bm-field-group">
            <label>Register No</label>
            <input className="bm-input" value={filters.registerNo} onChange={(e) => setFilter("registerNo")(e.target.value)} placeholder="Type register no" />
          </div>
          <div className="bm-field-group">
            <label>Chassis / Engine</label>
            <input className="bm-input" value={filters.search} onChange={(e) => setFilter("search")(e.target.value)} placeholder="Search chassis or engine no" />
          </div>
        </div>
        <div className="bm-filter-actions">
          <button type="button" className="btn-outline" onClick={clearFilters}>Reset Filters</button>
        </div>
      </div>

      <div className="bm-table-card">
        {loadError && <div className="bm-alert bm-alert-error">{loadError}</div>}
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 40 }} />
                <th>Brand</th>
                <th>Model</th>
                <th>Available</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="bm-table-empty">Loading…</td></tr>
              )}
              {!loading && groups.length === 0 && (
                <tr><td colSpan={6} className="bm-table-empty">No bikes in stock. Add your first bike!</td></tr>
              )}
              {!loading && groups.map((g) => (
                <GroupRow key={`${g.brandId}_${g.modelId}`} group={g} token={token} onRefresh={load} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <AddBikeModal
          token={token} brands={brands} colors={colors} fileNos={fileNos}
          onClose={() => setShowAdd(false)} onRefresh={load}
          onBrandAdded={(b) => setBrands((prev) => [...prev, b].sort((a, z) => a.name.localeCompare(z.name)))}
          onColorAdded={(c) => setColors((prev) => [...prev, c].sort((a, z) => a.name.localeCompare(z.name)))}
        />
      )}
    </div>
  );
}
