"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch } from "../../../lib/api";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface GalleryItem {
  id: number;
  site: string;
  mediaUrl: string;
  thumbnailUrl: string | null;
  title: string;
  mediaType: string;
  aspectRatio: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface FormData {
  title: string;
  mediaType: string;
  aspectRatio: string;
  order: number;
  isActive: boolean;
}

const EMPTY_FORM: FormData = {
  title: "",
  mediaType: "video",
  aspectRatio: "16:9",
  order: 0,
  isActive: true,
};

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Media file state
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  // Thumbnail state (optional)
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [thumbPreview, setThumbPreview] = useState<string | null>(null);
  const [thumbUrl, setThumbUrl] = useState<string>("");
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchItems = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch(`/api/gallery?site=LOCAL`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch gallery");
        return res.json();
      })
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function openCreate() {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setMediaFile(null);
    setMediaPreview(null);
    setMediaUrl("");
    setThumbFile(null);
    setThumbPreview(null);
    setThumbUrl("");
    setModalOpen(true);
  }

  function openEdit(item: GalleryItem) {
    setEditingItem(item);
    setForm({
      title: item.title,
      mediaType: item.mediaType,
      aspectRatio: item.aspectRatio,
      order: item.order,
      isActive: item.isActive,
    });
    setFormError(null);
    setMediaFile(null);
    setMediaUrl(item.mediaUrl);
    setMediaPreview(
      item.mediaType === "image" ? `${CMS_API_URL}${item.mediaUrl}` : null,
    );
    setThumbFile(null);
    setThumbUrl(item.thumbnailUrl ?? "");
    setThumbPreview(
      item.thumbnailUrl ? `${CMS_API_URL}${item.thumbnailUrl}` : null,
    );
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setMediaFile(null);
    setMediaPreview(null);
    setMediaUrl("");
    setThumbFile(null);
    setThumbPreview(null);
    setThumbUrl("");
    if (mediaInputRef.current) mediaInputRef.current.value = "";
    if (thumbInputRef.current) thumbInputRef.current.value = "";
  }

  function handleMediaPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaFile(file);
    setMediaPreview(
      file.type.startsWith("image/") ? URL.createObjectURL(file) : "video",
    );
    setMediaUrl("");
  }

  function handleThumbPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbFile(file);
    setThumbPreview(URL.createObjectURL(file));
    setThumbUrl("");
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await apiFetch(`/api/upload/gallery-media`, {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data?.message ?? "Upload failed");
    }
    const data = await res.json();
    return data.url as string;
  }

  async function handleSave() {
    if (!form.title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!editingItem && !mediaFile) {
      setFormError("Please select a media file.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      let finalMediaUrl = mediaUrl;
      let finalThumbUrl = thumbUrl;

      setUploading(true);
      if (mediaFile) finalMediaUrl = await uploadFile(mediaFile);
      if (thumbFile) finalThumbUrl = await uploadFile(thumbFile);
      setUploading(false);

      const payload: Record<string, unknown> = {
        site: "LOCAL",
        title: form.title,
        mediaType: form.mediaType,
        mediaUrl: finalMediaUrl,
        aspectRatio: form.aspectRatio,
        order: form.order,
        isActive: form.isActive,
      };
      if (finalThumbUrl) payload.thumbnailUrl = finalThumbUrl;

      const url = editingItem
        ? `${CMS_API_URL}/api/gallery/${editingItem.id}`
        : `${CMS_API_URL}/api/gallery`;
      const method = editingItem ? "PATCH" : "POST";
      const res = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message ?? "Save failed");
      }
      closeModal();
      fetchItems();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await apiFetch(`/api/gallery/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteTarget(null);
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  }

  async function handleToggleActive(item: GalleryItem) {
    try {
      const res = await apiFetch(`/api/gallery/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  return (
    <div className="gallery-admin">
      {/* ── Page header ── */}
      <div className="gallery-admin__header">
        <div>
          <h1 className="gallery-admin__title">Gallery</h1>
          <p className="gallery-admin__subtitle">
            Manage gallery videos and images for the local frontend
          </p>
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
          Add Item
        </button>
      </div>

      {error && (
        <div className="gallery-admin__error">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {loading ? (
        <p className="gallery-admin__loading">Loading gallery…</p>
      ) : (
        <div className="gallery-admin__table-wrap">
          <table className="gallery-admin__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Order</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="gallery-admin__empty">
                    No gallery items yet. Add your first one!
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="gallery-admin__td-title">{item.title}</td>
                  <td>
                    <span
                      className={`gallery-admin__type-badge gallery-admin__type-badge--${item.mediaType}`}
                    >
                      {item.mediaType === "video" ? "▶ Video" : "⬛ Image"}
                    </span>
                  </td>
                  <td className="gallery-admin__td-order">{item.order}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal ── */}
      {modalOpen && (
        <div className="gallery-admin__modal-overlay" onClick={closeModal}>
          <div
            className="gallery-admin__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-admin__modal-header">
              <h2 className="gallery-admin__modal-title">
                {editingItem ? "Edit Gallery Item" : "New Gallery Item"}
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

              <div className="gallery-admin__field">
                <label>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Item title"
                />
              </div>

              <div className="gallery-admin__field-row">
                <div className="gallery-admin__field">
                  <label>Media Type</label>
                  <select
                    value={form.mediaType}
                    onChange={(e) => {
                      setForm({ ...form, mediaType: e.target.value });
                      setMediaFile(null);
                      setMediaPreview(null);
                      setMediaUrl(editingItem?.mediaUrl ?? "");
                      if (mediaInputRef.current)
                        mediaInputRef.current.value = "";
                    }}
                  >
                    <option value="video">Video</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                <div className="gallery-admin__field gallery-admin__field--sm">
                  <label>Aspect Ratio</label>
                  <select
                    value={form.aspectRatio}
                    onChange={(e) =>
                      setForm({ ...form, aspectRatio: e.target.value })
                    }
                  >
                    <option value="16:9">16:9</option>
                    <option value="4:3">4:3</option>
                    <option value="1:1">1:1</option>
                    <option value="9:16">9:16</option>
                  </select>
                </div>
              </div>

              {/* ── Media file ── */}
              <div className="gallery-admin__field">
                <label>
                  {form.mediaType === "video" ? "Video File" : "Image File"} *
                  {editingItem && (
                    <span className="gallery-admin__optional">
                      {" "}
                      (leave empty to keep current)
                    </span>
                  )}
                </label>
                <div className="gallery-admin__image-picker">
                  {mediaPreview === "video" ? (
                    /* Video file staged */
                    <div className="gallery-admin__video-staged">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>{mediaFile?.name}</span>
                      <button
                        type="button"
                        className="gallery-admin__image-remove"
                        onClick={() => {
                          setMediaFile(null);
                          setMediaPreview(null);
                          setMediaUrl(editingItem?.mediaUrl ?? "");
                          if (mediaInputRef.current)
                            mediaInputRef.current.value = "";
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : mediaPreview ? (
                    /* Image preview */
                    <div className="gallery-admin__image-preview">
                      <img src={mediaPreview} alt="Preview" />
                      <button
                        type="button"
                        className="gallery-admin__image-remove"
                        onClick={() => {
                          setMediaFile(null);
                          setMediaPreview(null);
                          setMediaUrl(editingItem?.mediaUrl ?? "");
                          if (mediaInputRef.current)
                            mediaInputRef.current.value = "";
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : editingItem && mediaUrl ? (
                    /* Editing — show current filename + replace link */
                    <div className="gallery-admin__current-media">
                      <span>{mediaUrl.split("/").pop()}</span>
                      <label
                        className="gallery-admin__replace-btn"
                        htmlFor="gallery-media-input"
                      >
                        Replace
                      </label>
                    </div>
                  ) : (
                    /* Empty drop zone */
                    <label
                      className="gallery-admin__image-drop"
                      htmlFor="gallery-media-input"
                    >
                      {form.mediaType === "video" ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      ) : (
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
                      )}
                      <span>
                        Click to select{" "}
                        {form.mediaType === "video" ? "video" : "image"}
                      </span>
                      <span className="gallery-admin__image-hint">
                        {form.mediaType === "video"
                          ? "MP4, WebM · max 200 MB"
                          : "JPEG, PNG, WebP, AVIF · max 20 MB"}
                      </span>
                    </label>
                  )}
                  <input
                    id="gallery-media-input"
                    ref={mediaInputRef}
                    type="file"
                    accept={
                      form.mediaType === "video"
                        ? "video/mp4,video/webm,video/ogg"
                        : "image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    }
                    style={{ display: "none" }}
                    onChange={handleMediaPick}
                  />
                </div>
              </div>

              {/* ── Thumbnail (optional) ── */}
              <div className="gallery-admin__field">
                <label>
                  Thumbnail Image{" "}
                  <span className="gallery-admin__optional">
                    (optional — poster shown before video plays)
                  </span>
                </label>
                <div className="gallery-admin__image-picker">
                  {thumbPreview ? (
                    <div className="gallery-admin__image-preview">
                      <img src={thumbPreview} alt="Thumbnail preview" />
                      <button
                        type="button"
                        className="gallery-admin__image-remove"
                        onClick={() => {
                          setThumbFile(null);
                          setThumbPreview(null);
                          setThumbUrl("");
                          if (thumbInputRef.current)
                            thumbInputRef.current.value = "";
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label
                      className="gallery-admin__image-drop"
                      htmlFor="gallery-thumb-input"
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
                      <span>Click to select thumbnail</span>
                      <span className="gallery-admin__image-hint">
                        JPEG, PNG, WebP, AVIF · max 20 MB
                      </span>
                    </label>
                  )}
                  <input
                    id="gallery-thumb-input"
                    ref={thumbInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                    style={{ display: "none" }}
                    onChange={handleThumbPick}
                  />
                </div>
              </div>

              <div className="gallery-admin__field-row">
                <div className="gallery-admin__field">
                  <label>Display Order</label>
                  <input
                    type="number"
                    min={0}
                    value={form.order}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        order: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="gallery-admin__field gallery-admin__field--checkbox gallery-admin__field--checkbox-right">
                  <label>
                    <input
                      type="checkbox"
                      checked={form.isActive}
                      onChange={(e) =>
                        setForm({ ...form, isActive: e.target.checked })
                      }
                    />
                    Visible on site
                  </label>
                </div>
              </div>

              {uploading && (
                <span className="gallery-admin__uploading">
                  Uploading media…
                </span>
              )}
            </div>

            <div className="gallery-admin__modal-footer">
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
                disabled={saving || uploading}
              >
                {uploading
                  ? "Uploading…"
                  : saving
                    ? "Saving…"
                    : editingItem
                      ? "Save Changes"
                      : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation modal ── */}
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
              <h2 className="gallery-admin__modal-title">Delete Item</h2>
              <button
                className="gallery-admin__modal-close"
                onClick={() => setDeleteTarget(null)}
              >
                ✕
              </button>
            </div>
            <div className="gallery-admin__modal-body">
              <p className="gallery-admin__confirm-text">
                Are you sure you want to delete{" "}
                <strong>&ldquo;{deleteTarget.title}&rdquo;</strong>? This action
                cannot be undone.
              </p>
            </div>
            <div className="gallery-admin__modal-footer">
              <button
                className="gallery-admin__cancel-btn"
                onClick={() => setDeleteTarget(null)}
                disabled={!!deletingId}
              >
                Cancel
              </button>
              <button
                className="gallery-admin__delete-confirm-btn"
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
