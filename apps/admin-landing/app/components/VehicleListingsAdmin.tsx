"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch } from "../lib/api";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface ListingImage {
  id: number;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
}

interface Listing {
  id: number;
  brand: string;
  model: string;
  year: number | null;
  price: number | null;
  category: string;
  condition: string;
  mileage: number;
  colour: string | null;
  engineCc: number | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  images: ListingImage[];
}

interface FormState {
  brand: string;
  model: string;
  year: string;
  price: string;
  condition: string;
  mileage: string;
  colour: string;
  engineCc: string;
  description: string;
  isActive: boolean;
}

interface StagedImage {
  file: File;
  preview: string;
}

const EMPTY_FORM: FormState = {
  brand: "",
  model: "",
  year: "",
  price: "",
  condition: "used",
  mileage: "0",
  colour: "",
  engineCc: "",
  description: "",
  isActive: true,
};

function conditionLabel(c: string) {
  if (c === "brandnew") return "Brand New";
  if (c === "reconditioned") return "Reconditioned";
  return "Used";
}

interface Props {
  category: string;
  title: string;
  subtitle: string;
}

export default function VehicleListingsAdmin({ category, title, subtitle }: Props) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Staged images for CREATE mode (picked before vehicle exists)
  const [stagedImgs, setStagedImgs] = useState<StagedImage[]>([]);
  const stageInputRef = useRef<HTMLInputElement>(null);

  // Immediate image upload for EDIT mode
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchListings = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch(`/api/listings?category=${encodeURIComponent(category)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load listings");
        return r.json();
      })
      .then(setListings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setStagedImgs([]);
    setImgFile(null);
    setImgPreview(null);
    setImgError(null);
    setModalOpen(true);
  }

  function openEdit(item: Listing) {
    setEditing(item);
    setForm({
      brand: item.brand,
      model: item.model,
      year: item.year != null ? String(item.year) : "",
      price: item.price != null ? String(item.price) : "",
      condition: item.condition,
      mileage: String(item.mileage),
      colour: item.colour ?? "",
      engineCc: item.engineCc != null ? String(item.engineCc) : "",
      description: item.description ?? "",
      isActive: item.isActive,
    });
    setFormError(null);
    setStagedImgs([]);
    setImgFile(null);
    setImgPreview(null);
    setImgError(null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setStagedImgs([]);
    setImgFile(null);
    setImgPreview(null);
    setImgError(null);
    if (imgInputRef.current) imgInputRef.current.value = "";
    if (stageInputRef.current) stageInputRef.current.value = "";
  }

  function setField(key: keyof FormState, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // ── Stage image (create mode) ─────────────────────────────────────────────

  function handleStagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const newStaged: StagedImage[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setStagedImgs((prev) => [...prev, ...newStaged]);
    if (stageInputRef.current) stageInputRef.current.value = "";
  }

  function removeStaged(index: number) {
    setStagedImgs((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Upload a single file and attach to listing ────────────────────────────

  async function uploadAndAttach(
    file: File,
    listingId: number,
    isPrimary: boolean,
    sortOrder: number,
  ) {
    const fd = new FormData();
    fd.append("file", file);
    const upRes = await apiFetch("/api/upload/listing-image", {
      method: "POST",
      body: fd,
    });
    if (!upRes.ok) {
      const d = await upRes.json();
      throw new Error(d?.message ?? "Upload failed");
    }
    const { url } = await upRes.json();
    const addRes = await apiFetch(`/api/listings/${listingId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, isPrimary, sortOrder }),
    });
    if (!addRes.ok) throw new Error("Failed to attach image");
  }

  // ── Save vehicle (create or update) ──────────────────────────────────────

  async function handleSave() {
    if (!form.brand.trim() || !form.model.trim()) {
      setFormError("Brand and Model are required.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const payload: Record<string, unknown> = {
        brand: form.brand.trim(),
        model: form.model.trim(),
        category,
        condition: form.condition,
        mileage: parseInt(form.mileage, 10) || 0,
        isActive: form.isActive,
      };
      if (form.year) payload.year = parseInt(form.year, 10);
      if (form.price) payload.price = parseFloat(form.price);
      if (form.colour.trim()) payload.colour = form.colour.trim();
      if (form.engineCc) payload.engineCc = parseInt(form.engineCc, 10);
      if (form.description.trim()) payload.description = form.description.trim();

      const url = editing ? `/api/listings/${editing.id}` : `/api/listings`;
      const method = editing ? "PATCH" : "POST";
      const res = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d?.message ?? "Save failed");
      }
      const saved: Listing = await res.json();

      // Upload all staged images (create mode)
      if (!editing && stagedImgs.length > 0) {
        for (let i = 0; i < stagedImgs.length; i++) {
          await uploadAndAttach(
            stagedImgs[i].file,
            saved.id,
            i === 0,
            i,
          );
        }
      }

      closeModal();
      fetchListings();
    } catch (e: unknown) {
      setFormError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(item: Listing) {
    try {
      const res = await apiFetch(`/api/listings/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchListings();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/listings/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteTarget(null);
      fetchListings();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  // ── Immediate image upload (edit mode) ────────────────────────────────────

  function handleImgPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
    setImgError(null);
  }

  async function handleImgUpload() {
    if (!imgFile || !editing) return;
    setImgUploading(true);
    setImgError(null);
    try {
      const currentImages = editing.images ?? [];
      await uploadAndAttach(
        imgFile,
        editing.id,
        currentImages.length === 0,
        currentImages.length,
      );
      const refreshed = await apiFetch(`/api/listings/${editing.id}`);
      if (refreshed.ok) {
        const data: Listing = await refreshed.json();
        setEditing(data);
        setListings((prev) => prev.map((l) => (l.id === data.id ? data : l)));
      }
      setImgFile(null);
      setImgPreview(null);
      if (imgInputRef.current) imgInputRef.current.value = "";
    } catch (e: unknown) {
      setImgError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setImgUploading(false);
    }
  }

  async function handleSetPrimary(imageId: number) {
    if (!editing) return;
    try {
      const res = await apiFetch(
        `/api/listings/${editing.id}/images/${imageId}/primary`,
        { method: "PATCH" },
      );
      if (!res.ok) throw new Error("Failed to set primary");
      const refreshed = await apiFetch(`/api/listings/${editing.id}`);
      if (refreshed.ok) {
        const data: Listing = await refreshed.json();
        setEditing(data);
        setListings((prev) => prev.map((l) => (l.id === data.id ? data : l)));
      }
    } catch (e: unknown) {
      setImgError(e instanceof Error ? e.message : "Failed to set primary");
    }
  }

  async function handleDeleteImage(imageId: number) {
    if (!editing) return;
    try {
      const res = await apiFetch(
        `/api/listings/${editing.id}/images/${imageId}`,
        { method: "DELETE" },
      );
      if (!res.ok) throw new Error("Failed to delete image");
      const refreshed = await apiFetch(`/api/listings/${editing.id}`);
      if (refreshed.ok) {
        const data: Listing = await refreshed.json();
        setEditing(data);
        setListings((prev) => prev.map((l) => (l.id === data.id ? data : l)));
      }
    } catch (e: unknown) {
      setImgError(e instanceof Error ? e.message : "Failed to delete image");
    }
  }

  const editingImages = editing?.images ?? [];

  const saveBtnLabel = () => {
    if (!saving) return editing ? "Save Changes" : `Create Vehicle${stagedImgs.length > 0 ? ` + Upload ${stagedImgs.length} Image${stagedImgs.length > 1 ? "s" : ""}` : ""}`;
    return editing ? "Saving…" : stagedImgs.length > 0 ? "Creating & Uploading…" : "Creating…";
  };

  return (
    <div className="gallery-admin">
      {/* ── Header ── */}
      <div className="gallery-admin__header">
        <div>
          <h1 className="gallery-admin__title">{title}</h1>
          <p className="gallery-admin__subtitle">{subtitle}</p>
        </div>
        <button className="gallery-admin__new-btn" onClick={openCreate}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Vehicle
        </button>
      </div>

      {error && (
        <div className="gallery-admin__error">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {loading ? (
        <p className="gallery-admin__loading">Loading…</p>
      ) : (
        <div className="gallery-admin__table-wrap">
          <table className="gallery-admin__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Vehicle</th>
                <th>Year</th>
                <th>Price</th>
                <th>Condition</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.length === 0 && (
                <tr>
                  <td colSpan={7} className="gallery-admin__empty">
                    No vehicles yet. Add your first one!
                  </td>
                </tr>
              )}
              {listings.map((item) => {
                const thumb =
                  item.images.find((i) => i.isPrimary) ?? item.images[0];
                return (
                  <tr key={item.id}>
                    <td>
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`${CMS_API_URL}${thumb.url}`}
                          alt={`${item.brand} ${item.model}`}
                          style={{
                            width: 56,
                            height: 42,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 56,
                            height: 42,
                            background: "#1a1a1a",
                            borderRadius: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            color: "#666",
                          }}
                        >
                          No img
                        </div>
                      )}
                    </td>
                    <td className="gallery-admin__td-title">
                      {item.brand} {item.model}
                    </td>
                    <td>{item.year ?? "—"}</td>
                    <td>
                      {item.price != null
                        ? `Rs. ${item.price.toLocaleString("en-LK")}`
                        : "—"}
                    </td>
                    <td>
                      <span
                        className={`gallery-admin__type-badge gallery-admin__type-badge--${item.condition === "brandnew" ? "image" : "video"}`}
                      >
                        {conditionLabel(item.condition)}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`gallery-admin__badge ${item.isActive ? "gallery-admin__badge--active" : "gallery-admin__badge--inactive"}`}
                        onClick={() => handleToggleActive(item)}
                        title="Toggle visibility"
                      >
                        {item.isActive ? "Active" : "Hidden"}
                      </button>
                    </td>
                    <td>
                      <div className="gallery-admin__actions">
                        <button
                          className="gallery-admin__edit-btn"
                          onClick={() => openEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="gallery-admin__delete-btn"
                          onClick={() => setDeleteTarget(item)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      {modalOpen && (
        <div className="gallery-admin__modal-overlay" onClick={closeModal}>
          <div
            className="gallery-admin__modal"
            style={{ maxWidth: 680 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-admin__modal-header">
              <h2 className="gallery-admin__modal-title">
                {editing
                  ? `Edit — ${editing.brand} ${editing.model}`
                  : `Add ${title}`}
              </h2>
              <button
                className="gallery-admin__modal-close"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className="gallery-admin__modal-body">
              {formError && (
                <p className="gallery-admin__form-error">{formError}</p>
              )}

              {/* ── Basic fields ── */}
              <div className="gallery-admin__field-row">
                <div className="gallery-admin__field">
                  <label>Brand *</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setField("brand", e.target.value)}
                    placeholder="e.g. Toyota"
                  />
                </div>
                <div className="gallery-admin__field">
                  <label>Model *</label>
                  <input
                    type="text"
                    value={form.model}
                    onChange={(e) => setField("model", e.target.value)}
                    placeholder="e.g. Land Cruiser"
                  />
                </div>
              </div>

              <div className="gallery-admin__field-row">
                <div className="gallery-admin__field gallery-admin__field--sm">
                  <label>Year</label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => setField("year", e.target.value)}
                    placeholder="e.g. 2022"
                    min={1900}
                    max={2099}
                  />
                </div>
                <div className="gallery-admin__field">
                  <label>Price (Rs.)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setField("price", e.target.value)}
                    placeholder="e.g. 15000000"
                    min={0}
                  />
                </div>
              </div>

              <div className="gallery-admin__field-row">
                <div className="gallery-admin__field">
                  <label>Condition</label>
                  <select
                    value={form.condition}
                    onChange={(e) => setField("condition", e.target.value)}
                  >
                    <option value="used">Used</option>
                    <option value="reconditioned">Reconditioned</option>
                    <option value="brandnew">Brand New</option>
                  </select>
                </div>
                <div className="gallery-admin__field gallery-admin__field--sm">
                  <label>Mileage (km)</label>
                  <input
                    type="number"
                    value={form.mileage}
                    onChange={(e) => setField("mileage", e.target.value)}
                    placeholder="0"
                    min={0}
                  />
                </div>
              </div>

              <div className="gallery-admin__field-row">
                <div className="gallery-admin__field">
                  <label>Colour</label>
                  <input
                    type="text"
                    value={form.colour}
                    onChange={(e) => setField("colour", e.target.value)}
                    placeholder="e.g. White"
                  />
                </div>
                <div className="gallery-admin__field gallery-admin__field--sm">
                  <label>Engine (cc)</label>
                  <input
                    type="number"
                    value={form.engineCc}
                    onChange={(e) => setField("engineCc", e.target.value)}
                    placeholder="e.g. 2000"
                    min={1}
                  />
                </div>
              </div>

              <div className="gallery-admin__field">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="Optional description…"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="gallery-admin__field gallery-admin__field--checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setField("isActive", e.target.checked)}
                  />
                  Visible on site
                </label>
              </div>

              {/* ── Images section (always visible) ── */}
              <div
                style={{
                  borderTop: "1px solid #2a2a2a",
                  paddingTop: 20,
                  marginTop: 8,
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 14,
                    color: "#e0e0e0",
                  }}
                >
                  {editing
                    ? `Images (${editingImages.length})`
                    : `Images${stagedImgs.length > 0 ? ` — ${stagedImgs.length} selected` : ""}`}
                </h3>

                {imgError && (
                  <p
                    className="gallery-admin__form-error"
                    style={{ marginBottom: 10 }}
                  >
                    {imgError}
                  </p>
                )}

                {/* CREATE MODE — staged image previews */}
                {!editing && stagedImgs.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    {stagedImgs.map((s, i) => (
                      <div
                        key={i}
                        style={{ position: "relative", width: 90, flexShrink: 0 }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.preview}
                          alt={`staged ${i + 1}`}
                          style={{
                            width: 90,
                            height: 68,
                            objectFit: "cover",
                            borderRadius: 6,
                            border:
                              i === 0
                                ? "2px solid #c9a84c"
                                : "2px solid #333",
                            display: "block",
                          }}
                        />
                        {i === 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: 3,
                              left: 3,
                              background: "#c9a84c",
                              color: "#000",
                              fontSize: 9,
                              fontWeight: 700,
                              padding: "1px 4px",
                              borderRadius: 3,
                            }}
                          >
                            MAIN
                          </span>
                        )}
                        <button
                          onClick={() => removeStaged(i)}
                          style={{
                            position: "absolute",
                            top: 3,
                            right: 3,
                            width: 18,
                            height: 18,
                            background: "rgba(0,0,0,0.7)",
                            border: "none",
                            color: "#f87171",
                            borderRadius: 3,
                            cursor: "pointer",
                            fontSize: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* CREATE MODE — file picker (multiple) */}
                {!editing && (
                  <div className="gallery-admin__image-picker">
                    <label
                      className="gallery-admin__image-drop"
                      htmlFor="stage-img-input"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {stagedImgs.length === 0
                          ? "Click to add images"
                          : "Click to add more images"}
                      </span>
                      <span className="gallery-admin__image-hint">
                        JPEG, PNG, WebP, AVIF · max 20 MB · multiple allowed
                      </span>
                    </label>
                    <input
                      id="stage-img-input"
                      ref={stageInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                      multiple
                      style={{ display: "none" }}
                      onChange={handleStagePick}
                    />
                  </div>
                )}

                {/* EDIT MODE — existing uploaded images */}
                {editing && editingImages.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      marginBottom: 16,
                    }}
                  >
                    {editingImages.map((img) => (
                      <div
                        key={img.id}
                        style={{ position: "relative", width: 90, flexShrink: 0 }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${CMS_API_URL}${img.url}`}
                          alt="vehicle"
                          style={{
                            width: 90,
                            height: 68,
                            objectFit: "cover",
                            borderRadius: 6,
                            border: img.isPrimary
                              ? "2px solid #c9a84c"
                              : "2px solid #333",
                            display: "block",
                          }}
                        />
                        {img.isPrimary && (
                          <span
                            style={{
                              position: "absolute",
                              top: 3,
                              left: 3,
                              background: "#c9a84c",
                              color: "#000",
                              fontSize: 9,
                              fontWeight: 700,
                              padding: "1px 4px",
                              borderRadius: 3,
                            }}
                          >
                            PRIMARY
                          </span>
                        )}
                        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                          {!img.isPrimary && (
                            <button
                              onClick={() => handleSetPrimary(img.id)}
                              style={{
                                flex: 1,
                                fontSize: 10,
                                padding: "3px 0",
                                background: "#1e1e1e",
                                border: "1px solid #444",
                                color: "#ccc",
                                borderRadius: 4,
                                cursor: "pointer",
                              }}
                            >
                              Set Main
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            style={{
                              flex: 1,
                              fontSize: 10,
                              padding: "3px 0",
                              background: "#2a0a0a",
                              border: "1px solid #6b1a1a",
                              color: "#f87171",
                              borderRadius: 4,
                              cursor: "pointer",
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* EDIT MODE — upload new image */}
                {editing && (
                  <>
                    <div className="gallery-admin__image-picker">
                      {imgPreview ? (
                        <div className="gallery-admin__image-preview">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgPreview} alt="Preview" />
                          <button
                            type="button"
                            className="gallery-admin__image-remove"
                            onClick={() => {
                              setImgFile(null);
                              setImgPreview(null);
                              if (imgInputRef.current)
                                imgInputRef.current.value = "";
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <label
                          className="gallery-admin__image-drop"
                          htmlFor="listing-img-input"
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Click to add an image</span>
                          <span className="gallery-admin__image-hint">
                            JPEG, PNG, WebP, AVIF · max 20 MB
                          </span>
                        </label>
                      )}
                      <input
                        id="listing-img-input"
                        ref={imgInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                        style={{ display: "none" }}
                        onChange={handleImgPick}
                      />
                    </div>
                    {imgFile && (
                      <button
                        className="gallery-admin__save-btn"
                        style={{ marginTop: 10, width: "100%" }}
                        onClick={handleImgUpload}
                        disabled={imgUploading}
                      >
                        {imgUploading ? "Uploading…" : "Upload Image"}
                      </button>
                    )}
                  </>
                )}
              </div>

              {/* ── Modal footer ── */}
              <div
                className="gallery-admin__modal-footer"
                style={{ marginTop: 20 }}
              >
                <button
                  className="gallery-admin__cancel-btn"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="gallery-admin__save-btn"
                  onClick={handleSave}
                  disabled={saving || imgUploading}
                >
                  {saveBtnLabel()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirm ── */}
      {deleteTarget && (
        <div
          className="gallery-admin__modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="gallery-admin__modal gallery-admin__modal--confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-admin__modal-header">
              <h2 className="gallery-admin__modal-title">Delete Vehicle</h2>
              <button
                className="gallery-admin__modal-close"
                onClick={() => setDeleteTarget(null)}
              >
                ✕
              </button>
            </div>
            <div className="gallery-admin__modal-body">
              <p className="gallery-admin__confirm-text">
                Delete{" "}
                <strong>
                  &ldquo;{deleteTarget.brand} {deleteTarget.model}&rdquo;
                </strong>
                ? This will also remove all images and cannot be undone.
              </p>
            </div>
            <div className="gallery-admin__modal-footer">
              <button
                className="gallery-admin__cancel-btn"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="gallery-admin__delete-confirm-btn"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
