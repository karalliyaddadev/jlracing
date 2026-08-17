"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch } from "../../../lib/api";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

const HERO_DESKTOP_REQUIREMENTS =
  "Aspect ratio: 16:9 · Formats: JPEG, PNG, WebP, AVIF · Max 20 MB";
const HERO_MOBILE_REQUIREMENTS =
  "Aspect ratio: 9:16 · Formats: JPEG, PNG, WebP, AVIF · Max 20 MB";

/* ── Types ─────────────────────────────────────────────────────────────── */

interface HeroImage {
  id: number;
  site: string;
  desktopImage: string;
  mobileImage: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface DraftSlide {
  uid: string;
  desktopFile: File | null;
  desktopPreview: string | null;
  mobileFile: File | null;
  mobilePreview: string | null;
  buttonLink: string;
  order: number;
  isActive: boolean;
}

interface EditForm {
  buttonLink: string;
  order: number;
  isActive: boolean;
}

/* ── Helpers ────────────────────────────────────────────────────────────── */

function uid() {
  return Math.random().toString(36).slice(2);
}

function emptyDraft(order = 0): DraftSlide {
  return {
    uid: uid(),
    desktopFile: null,
    desktopPreview: null,
    mobileFile: null,
    mobilePreview: null,
    buttonLink: "/listings",
    order,
    isActive: true,
  };
}

/* ══════════════════════════════════════════════════════════════════════════
   Page component
   ══════════════════════════════════════════════════════════════════════════ */

export default function IntlHeroBannerAdminPage() {
  /* ── Slide list ── */
  const [slides, setSlides] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ── Multi-add modal ── */
  const [addOpen, setAddOpen] = useState(false);
  const [drafts, setDrafts] = useState<DraftSlide[]>([emptyDraft(0)]);
  const [addError, setAddError] = useState<string | null>(null);
  const [savingProgress, setSavingProgress] = useState<string | null>(null);

  /* ── Edit modal (single slide) ── */
  const [editOpen, setEditOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroImage | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    buttonLink: "/listings",
    order: 0,
    isActive: true,
  });
  const [editDesktopFile, setEditDesktopFile] = useState<File | null>(null);
  const [editDesktopPreview, setEditDesktopPreview] = useState<string | null>(
    null,
  );
  const [editDesktopUrl, setEditDesktopUrl] = useState("");
  const [editMobileFile, setEditMobileFile] = useState<File | null>(null);
  const [editMobilePreview, setEditMobilePreview] = useState<string | null>(
    null,
  );
  const [editMobileUrl, setEditMobileUrl] = useState("");
  const editDesktopRef = useRef<HTMLInputElement>(null);
  const editMobileRef = useRef<HTMLInputElement>(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  /* ── Delete confirm ── */
  const [deleteTarget, setDeleteTarget] = useState<HeroImage | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /* ══════════════════════════════════════════════════════════════════════
     Data fetching
     ══════════════════════════════════════════════════════════════════════ */

  const fetchSlides = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch(`/api/hero?site=FOREIGN`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch slides");
        return r.json();
      })
      .then(setSlides)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  /* ══════════════════════════════════════════════════════════════════════
     Upload helper
     ══════════════════════════════════════════════════════════════════════ */

  async function uploadImage(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await apiFetch(`/api/upload/hero-image`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      const d = await res.json();
      throw new Error(d?.message ?? "Upload failed");
    }
    return (await res.json()).url as string;
  }

  /* ══════════════════════════════════════════════════════════════════════
     Multi-add modal logic
     ══════════════════════════════════════════════════════════════════════ */

  function openAdd() {
    setDrafts([emptyDraft(slides.length)]);
    setAddError(null);
    setSavingProgress(null);
    setAddOpen(true);
  }

  function closeAdd() {
    setAddOpen(false);
    setDrafts([emptyDraft(0)]);
    setAddError(null);
    setSavingProgress(null);
  }

  function addDraft() {
    setDrafts((prev) => [...prev, emptyDraft(slides.length + prev.length)]);
  }

  function removeDraft(draftUid: string) {
    setDrafts((prev) => prev.filter((d) => d.uid !== draftUid));
  }

  function patchDraft(draftUid: string, patch: Partial<DraftSlide>) {
    setDrafts((prev) =>
      prev.map((d) => (d.uid === draftUid ? { ...d, ...patch } : d)),
    );
  }

  async function handleSaveAll() {
    setAddError(null);
    for (let i = 0; i < drafts.length; i++) {
      const d = drafts[i];
      if (!d.desktopFile) {
        setAddError(`Slide ${i + 1}: desktop image is required.`);
        return;
      }
      if (!d.mobileFile) {
        setAddError(`Slide ${i + 1}: mobile image is required.`);
        return;
      }
      if (!d.buttonLink.trim()) {
        setAddError(`Slide ${i + 1}: button link is required.`);
        return;
      }
    }

    setSavingProgress(`Uploading slide 1 of ${drafts.length}…`);
    try {
      for (let i = 0; i < drafts.length; i++) {
        const d = drafts[i];
        setSavingProgress(`Uploading slide ${i + 1} of ${drafts.length}…`);
        const desktopUrl = await uploadImage(d.desktopFile!);
        const mobileUrl = await uploadImage(d.mobileFile!);

        setSavingProgress(`Saving slide ${i + 1} of ${drafts.length}…`);
        const res = await apiFetch(`/api/hero`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            site: "FOREIGN",
            desktopImage: desktopUrl,
            mobileImage: mobileUrl,
            buttonLink: d.buttonLink,
            order: d.order,
            isActive: d.isActive,
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(`Slide ${i + 1}: ${data?.message ?? "Save failed"}`);
        }
      }
      closeAdd();
      fetchSlides();
    } catch (err: unknown) {
      setAddError(err instanceof Error ? err.message : "An error occurred");
      setSavingProgress(null);
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
     Edit modal logic
     ══════════════════════════════════════════════════════════════════════ */

  function openEdit(slide: HeroImage) {
    setEditingSlide(slide);
    setEditForm({
      buttonLink: slide.buttonLink,
      order: slide.order,
      isActive: slide.isActive,
    });
    setEditError(null);
    setEditDesktopFile(null);
    setEditDesktopUrl(slide.desktopImage);
    setEditDesktopPreview(`${CMS_API_URL}${slide.desktopImage}`);
    setEditMobileFile(null);
    setEditMobileUrl(slide.mobileImage);
    setEditMobilePreview(`${CMS_API_URL}${slide.mobileImage}`);
    setEditOpen(true);
  }

  function closeEdit() {
    setEditOpen(false);
    setEditingSlide(null);
    setEditError(null);
    setEditDesktopFile(null);
    setEditDesktopPreview(null);
    setEditDesktopUrl("");
    setEditMobileFile(null);
    setEditMobilePreview(null);
    setEditMobileUrl("");
    if (editDesktopRef.current) editDesktopRef.current.value = "";
    if (editMobileRef.current) editMobileRef.current.value = "";
  }

  async function handleEditSave() {
    if (!editForm.buttonLink.trim()) {
      setEditError("Button link is required.");
      return;
    }
    if (!editingSlide) return;
    setEditSaving(true);
    setEditError(null);
    try {
      let finalDesktop = editDesktopUrl;
      let finalMobile = editMobileUrl;
      if (editDesktopFile) finalDesktop = await uploadImage(editDesktopFile);
      if (editMobileFile) finalMobile = await uploadImage(editMobileFile);

      const res = await apiFetch(`/api/hero/${editingSlide.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "FOREIGN",
          desktopImage: finalDesktop,
          mobileImage: finalMobile,
          buttonLink: editForm.buttonLink,
          order: editForm.order,
          isActive: editForm.isActive,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message ?? "Save failed");
      }
      closeEdit();
      fetchSlides();
    } catch (err: unknown) {
      setEditError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setEditSaving(false);
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
     Delete logic
     ══════════════════════════════════════════════════════════════════════ */

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await apiFetch(`/api/hero/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteTarget(null);
      fetchSlides();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggleActive(slide: HeroImage) {
    try {
      const res = await apiFetch(`/api/hero/${slide.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !slide.isActive }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchSlides();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  /* ══════════════════════════════════════════════════════════════════════
     Render
     ══════════════════════════════════════════════════════════════════════ */

  return (
    <div className="hero-admin">
      {/* ── Page header ── */}
      <div className="hero-admin__header">
        <div>
          <h1 className="hero-admin__title">Hero Banner</h1>
          <p className="hero-admin__subtitle">
            Manage carousel slides for the international frontend homepage
          </p>
        </div>
        <button className="hero-admin__new-btn" onClick={openAdd}>
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
          Add Slides
        </button>
      </div>

      {error && (
        <div className="hero-admin__error">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* ── Slide grid ── */}
      {loading ? (
        <p className="hero-admin__loading">Loading slides…</p>
      ) : (
        <div className="hero-admin__grid">
          {slides.length === 0 && (
            <p className="hero-admin__empty">
              No slides yet. Click &ldquo;Add Slides&rdquo; to get started.
            </p>
          )}
          {slides.map((slide) => (
            <div key={slide.id} className="hero-admin__card">
              <div className="hero-admin__card-thumb">
                <img
                  src={`${CMS_API_URL}${slide.desktopImage}`}
                  alt={`Slide order ${slide.order}`}
                />
                <span className="hero-admin__card-order">#{slide.order}</span>
              </div>

              <div className="hero-admin__card-body">
                <div className="hero-admin__card-row">
                  <span className="hero-admin__card-label">Link</span>
                  <span className="hero-admin__card-value">
                    {slide.buttonLink}
                  </span>
                </div>
                <div className="hero-admin__card-row">
                  <span className="hero-admin__card-label">Mobile</span>
                  <span className="hero-admin__card-value hero-admin__card-value--dim">
                    {slide.mobileImage.split("/").pop()}
                  </span>
                </div>
              </div>

              <div className="hero-admin__card-footer">
                <button
                  className={`hero-admin__badge ${slide.isActive ? "hero-admin__badge--active" : "hero-admin__badge--inactive"}`}
                  onClick={() => handleToggleActive(slide)}
                  title="Toggle visibility"
                >
                  {slide.isActive ? "Active" : "Hidden"}
                </button>
                <div className="hero-admin__card-actions">
                  <button
                    className="hero-admin__edit-btn"
                    onClick={() => openEdit(slide)}
                  >
                    Edit
                  </button>
                  <button
                    className="hero-admin__delete-btn"
                    onClick={() => setDeleteTarget(slide)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          Multi-add modal
          ══════════════════════════════════════════════════════════════════ */}
      {addOpen && (
        <div className="hero-admin__modal-overlay" onClick={closeAdd}>
          <div
            className="hero-admin__modal hero-admin__modal--wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hero-admin__modal-header">
              <h2 className="hero-admin__modal-title">
                Add Slides
                <span className="hero-admin__modal-count">
                  {drafts.length} slide{drafts.length !== 1 ? "s" : ""}
                </span>
              </h2>
              <button
                className="hero-admin__modal-close"
                onClick={closeAdd}
                disabled={!!savingProgress}
              >
                ✕
              </button>
            </div>

            <div className="hero-admin__modal-body">
              {addError && <p className="hero-admin__form-error">{addError}</p>}

              {drafts.map((draft, idx) => (
                <div key={draft.uid} className="hero-admin__draft">
                  {/* Draft header */}
                  <div className="hero-admin__draft-header">
                    <span className="hero-admin__draft-label">
                      Slide {idx + 1}
                    </span>
                    {drafts.length > 1 && (
                      <button
                        className="hero-admin__draft-remove"
                        onClick={() => removeDraft(draft.uid)}
                        disabled={!!savingProgress}
                        title="Remove this slide"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Image row */}
                  <div className="hero-admin__draft-images">
                    {/* Desktop */}
                    <div className="hero-admin__field">
                      <label>
                        Desktop Image
                      </label>
                      <p className="hero-admin__field-guidance">
                        {HERO_DESKTOP_REQUIREMENTS}
                      </p>
                      <div className="hero-admin__image-picker">
                        {draft.desktopPreview ? (
                          <div className="hero-admin__image-preview">
                            <img
                              src={draft.desktopPreview}
                              alt="Desktop preview"
                            />
                            <button
                              type="button"
                              className="hero-admin__image-remove"
                              onClick={() =>
                                patchDraft(draft.uid, {
                                  desktopFile: null,
                                  desktopPreview: null,
                                })
                              }
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label
                            className="hero-admin__image-drop"
                            htmlFor={`intl-desktop-${draft.uid}`}
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
                            <span>Desktop image</span>
                            <span className="hero-admin__image-hint">
                              {HERO_DESKTOP_REQUIREMENTS}
                            </span>
                          </label>
                        )}
                        <input
                          id={`intl-desktop-${draft.uid}`}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            patchDraft(draft.uid, {
                              desktopFile: file,
                              desktopPreview: URL.createObjectURL(file),
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="hero-admin__field">
                      <label>
                        Mobile Image
                      </label>
                      <p className="hero-admin__field-guidance">
                        {HERO_MOBILE_REQUIREMENTS}
                      </p>
                      <div className="hero-admin__image-picker">
                        {draft.mobilePreview ? (
                          <div className="hero-admin__image-preview hero-admin__image-preview--mobile">
                            <img
                              src={draft.mobilePreview}
                              alt="Mobile preview"
                            />
                            <button
                              type="button"
                              className="hero-admin__image-remove"
                              onClick={() =>
                                patchDraft(draft.uid, {
                                  mobileFile: null,
                                  mobilePreview: null,
                                })
                              }
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <label
                            className="hero-admin__image-drop hero-admin__image-drop--portrait"
                            htmlFor={`intl-mobile-${draft.uid}`}
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
                            <span>Mobile image</span>
                            <span className="hero-admin__image-hint">
                              {HERO_MOBILE_REQUIREMENTS}
                            </span>
                          </label>
                        )}
                        <input
                          id={`intl-mobile-${draft.uid}`}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            patchDraft(draft.uid, {
                              mobileFile: file,
                              mobilePreview: URL.createObjectURL(file),
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Settings row */}
                  <div className="hero-admin__draft-settings">
                    <div className="hero-admin__field" style={{ flex: 1 }}>
                      <label>Button Link</label>
                      <input
                        type="text"
                        value={draft.buttonLink}
                        onChange={(e) =>
                          patchDraft(draft.uid, {
                            buttonLink: e.target.value,
                          })
                        }
                        placeholder="/listings"
                        disabled={!!savingProgress}
                      />
                    </div>
                    <div className="hero-admin__field hero-admin__field--sm">
                      <label>Order</label>
                      <input
                        type="number"
                        min={0}
                        value={draft.order}
                        onChange={(e) =>
                          patchDraft(draft.uid, {
                            order: parseInt(e.target.value, 10) || 0,
                          })
                        }
                        disabled={!!savingProgress}
                      />
                    </div>
                    <div className="hero-admin__draft-toggle">
                      <label>Visibility</label>
                      <button
                        type="button"
                        className={`hero-admin__badge ${draft.isActive ? "hero-admin__badge--active" : "hero-admin__badge--inactive"}`}
                        onClick={() =>
                          patchDraft(draft.uid, { isActive: !draft.isActive })
                        }
                        disabled={!!savingProgress}
                        title="Toggle active for this slide"
                      >
                        {draft.isActive ? "Active" : "Hidden"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add another slide button */}
              <button
                className="hero-admin__add-another"
                onClick={addDraft}
                disabled={!!savingProgress}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add another slide
              </button>

              {savingProgress && (
                <p className="hero-admin__uploading">{savingProgress}</p>
              )}
            </div>

            <div className="hero-admin__modal-footer">
              <button
                className="hero-admin__cancel-btn"
                onClick={closeAdd}
                disabled={!!savingProgress}
              >
                Cancel
              </button>
              <button
                className="hero-admin__save-btn"
                onClick={handleSaveAll}
                disabled={!!savingProgress}
              >
                {savingProgress
                  ? savingProgress
                  : `Save ${drafts.length} Slide${drafts.length !== 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          Edit modal (single slide)
          ══════════════════════════════════════════════════════════════════ */}
      {editOpen && editingSlide && (
        <div className="hero-admin__modal-overlay" onClick={closeEdit}>
          <div
            className="hero-admin__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hero-admin__modal-header">
              <h2 className="hero-admin__modal-title">Edit Slide</h2>
              <button
                className="hero-admin__modal-close"
                onClick={closeEdit}
                disabled={editSaving}
              >
                ✕
              </button>
            </div>

            <div className="hero-admin__modal-body">
              {editError && (
                <p className="hero-admin__form-error">{editError}</p>
              )}

              {/* Desktop image */}
              <div className="hero-admin__field">
                <label>
                  Desktop Image{" "}
                  <span className="hero-admin__optional">
                    · leave empty to keep current
                  </span>
                </label>
                <p className="hero-admin__field-guidance">
                  {HERO_DESKTOP_REQUIREMENTS}
                </p>
                <div className="hero-admin__image-picker">
                  {editDesktopPreview ? (
                    <div className="hero-admin__image-preview">
                      <img src={editDesktopPreview} alt="Desktop preview" />
                      <button
                        type="button"
                        className="hero-admin__image-remove"
                        onClick={() => {
                          setEditDesktopFile(null);
                          setEditDesktopPreview(null);
                          setEditDesktopUrl(editingSlide.desktopImage);
                          if (editDesktopRef.current)
                            editDesktopRef.current.value = "";
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label
                      className="hero-admin__image-drop"
                      htmlFor="intl-edit-desktop-input"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Click to replace desktop image</span>
                      <span className="hero-admin__image-hint">
                        {HERO_DESKTOP_REQUIREMENTS}
                      </span>
                    </label>
                  )}
                  <input
                    id="intl-edit-desktop-input"
                    ref={editDesktopRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setEditDesktopFile(file);
                      setEditDesktopPreview(URL.createObjectURL(file));
                      setEditDesktopUrl("");
                    }}
                  />
                </div>
              </div>

              {/* Mobile image */}
              <div className="hero-admin__field">
                <label>
                  Mobile Image{" "}
                  <span className="hero-admin__optional">
                    · leave empty to keep current
                  </span>
                </label>
                <p className="hero-admin__field-guidance">
                  {HERO_MOBILE_REQUIREMENTS}
                </p>
                <div className="hero-admin__image-picker">
                  {editMobilePreview ? (
                    <div className="hero-admin__image-preview hero-admin__image-preview--mobile">
                      <img src={editMobilePreview} alt="Mobile preview" />
                      <button
                        type="button"
                        className="hero-admin__image-remove"
                        onClick={() => {
                          setEditMobileFile(null);
                          setEditMobilePreview(null);
                          setEditMobileUrl(editingSlide.mobileImage);
                          if (editMobileRef.current)
                            editMobileRef.current.value = "";
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label
                      className="hero-admin__image-drop hero-admin__image-drop--portrait"
                      htmlFor="intl-edit-mobile-input"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Click to replace mobile image</span>
                      <span className="hero-admin__image-hint">
                        {HERO_MOBILE_REQUIREMENTS}
                      </span>
                    </label>
                  )}
                  <input
                    id="intl-edit-mobile-input"
                    ref={editMobileRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setEditMobileFile(file);
                      setEditMobilePreview(URL.createObjectURL(file));
                      setEditMobileUrl("");
                    }}
                  />
                </div>
              </div>

              <div className="hero-admin__field-row">
                <div className="hero-admin__field">
                  <label>Button Link *</label>
                  <input
                    type="text"
                    value={editForm.buttonLink}
                    onChange={(e) =>
                      setEditForm({ ...editForm, buttonLink: e.target.value })
                    }
                    placeholder="/listings"
                  />
                </div>
                <div className="hero-admin__field hero-admin__field--sm">
                  <label>Order</label>
                  <input
                    type="number"
                    min={0}
                    value={editForm.order}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        order: parseInt(e.target.value, 10) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="hero-admin__field hero-admin__field--checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={editForm.isActive}
                    onChange={(e) =>
                      setEditForm({ ...editForm, isActive: e.target.checked })
                    }
                  />
                  Show on homepage
                </label>
              </div>
            </div>

            <div className="hero-admin__modal-footer">
              <button
                className="hero-admin__cancel-btn"
                onClick={closeEdit}
                disabled={editSaving}
              >
                Cancel
              </button>
              <button
                className="hero-admin__save-btn"
                onClick={handleEditSave}
                disabled={editSaving}
              >
                {editSaving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          Delete confirmation modal
          ══════════════════════════════════════════════════════════════════ */}
      {deleteTarget && (
        <div
          className="hero-admin__modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="hero-admin__modal hero-admin__modal--confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hero-admin__modal-header">
              <h2 className="hero-admin__modal-title">Delete Slide</h2>
              <button
                className="hero-admin__modal-close"
                onClick={() => setDeleteTarget(null)}
              >
                ✕
              </button>
            </div>
            <div className="hero-admin__modal-body">
              <p className="hero-admin__confirm-text">
                Are you sure you want to delete slide{" "}
                <strong>#{deleteTarget.order}</strong>? This action cannot be
                undone.
              </p>
            </div>
            <div className="hero-admin__modal-footer">
              <button
                className="hero-admin__cancel-btn"
                onClick={() => setDeleteTarget(null)}
                disabled={!!deletingId}
              >
                Cancel
              </button>
              <button
                className="hero-admin__delete-confirm-btn"
                onClick={confirmDelete}
                disabled={!!deletingId}
              >
                {deletingId ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
