"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch } from "../../../lib/api";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

const HOME_VIDEO_REQUIREMENTS =
  "Aspect ratio: 16:9 · Formats: MP4, WebM, OGG · Max 200 MB";

interface VideoBannerItem {
  id: number;
  site: string;
  videoUrl: string;
  aspectRatio: string;
  durationSec: number | null;
  isActive: boolean;
  createdAt: string;
}

export default function VideoBannerAdminPage() {
  const [items, setItems] = useState<VideoBannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ── Upload state ── */
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Delete confirm ── */
  const [deleteTarget, setDeleteTarget] = useState<VideoBannerItem | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /* ── Fetch ── */
  const fetchItems = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch(`/api/video-banner?site=LOCAL`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch videos");
        return r.json();
      })
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  /* ── Upload + create ── */
  async function handleUpload() {
    if (!videoFile) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    try {
      // 1. Upload file
      const fd = new FormData();
      fd.append("file", videoFile);
      const upRes = await apiFetch(`/api/upload/video-banner`, {
        method: "POST",
        body: fd,
      });
      if (!upRes.ok) {
        const d = await upRes.json();
        throw new Error(d?.message ?? "Upload failed");
      }
      const { url } = await upRes.json();

      // 2. Deactivate all existing items first
      for (const item of items.filter((i) => i.isActive)) {
        await apiFetch(`/api/video-banner/${item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isActive: false }),
        });
      }

      // 3. Create new record (active by default)
      const createRes = await apiFetch(`/api/video-banner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site: "LOCAL",
          videoUrl: url,
          aspectRatio: "16:9",
          isActive: true,
        }),
      });
      if (!createRes.ok) {
        const d = await createRes.json();
        throw new Error(d?.message ?? "Create failed");
      }

      setVideoFile(null);
      setVideoPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setUploadSuccess(true);
      fetchItems();
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setUploading(false);
    }
  }

  /* ── Toggle active ── */
  async function handleSetActive(item: VideoBannerItem) {
    try {
      // Deactivate all, then activate the chosen one
      await Promise.all(
        items
          .filter((i) => i.isActive && i.id !== item.id)
          .map((i) =>
            apiFetch(`/api/video-banner/${i.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isActive: false }),
            }),
          ),
      );
      await apiFetch(`/api/video-banner/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  /* ── Delete ── */
  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await apiFetch(`/api/video-banner/${deleteTarget.id}`, {
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

  /* ── Helpers ── */
  function formatSize(bytes: number) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const activeItem = items.find((i) => i.isActive) ?? null;

  return (
    <div className="video-admin">
      {/* ── Header ── */}
      <div className="video-admin__header">
        <div>
          <h1 className="video-admin__title">Video Banner</h1>
          <p className="video-admin__subtitle">
            The active video plays as a silent background loop on the homepage
          </p>
        </div>
      </div>

      {error && (
        <div className="video-admin__error">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* ── Active preview ── */}
      {activeItem && (
        <div className="video-admin__active-preview">
          <div className="video-admin__active-label">
            <span className="video-admin__badge video-admin__badge--active">
              Live
            </span>
            Currently showing on the homepage
          </div>
          <video
            key={activeItem.videoUrl}
            className="video-admin__preview-video"
            src={`${CMS_API_URL}${activeItem.videoUrl}`}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      )}

      {/* ── Upload panel ── */}
      <div className="video-admin__upload-panel">
        <h2 className="video-admin__section-title">Upload New Video</h2>
        <p className="video-admin__section-hint">
          {HOME_VIDEO_REQUIREMENTS} · MP4 recommended · The upload will become
          the active banner automatically
        </p>

        {uploadError && (
          <p className="video-admin__form-error">{uploadError}</p>
        )}
        {uploadSuccess && (
          <p className="video-admin__success">Video uploaded successfully!</p>
        )}

        <div className="video-admin__drop-area">
          {videoPreviewUrl ? (
            <div className="video-admin__chosen-file">
              <video
                key={videoPreviewUrl}
                src={videoPreviewUrl}
                className="video-admin__chosen-preview"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="video-admin__chosen-info">
                <span className="video-admin__chosen-name">
                  {videoFile?.name}
                </span>
                <span className="video-admin__chosen-size">
                  {videoFile ? formatSize(videoFile.size) : ""}
                </span>
                <button
                  className="video-admin__remove-file"
                  onClick={() => {
                    setVideoFile(null);
                    setVideoPreviewUrl(null);
                    setUploadSuccess(false);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <label
              className="video-admin__drop-label"
              htmlFor="video-banner-input"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14" />
                <rect x="3" y="6" width="12" height="12" rx="2" />
              </svg>
              <span className="video-admin__drop-text">
                Click to select a video file
              </span>
              <span className="video-admin__drop-hint">
                {HOME_VIDEO_REQUIREMENTS}
              </span>
            </label>
          )}
          <input
            id="video-banner-input"
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setVideoFile(file);
              setVideoPreviewUrl(URL.createObjectURL(file));
              setUploadSuccess(false);
              setUploadError(null);
            }}
          />
        </div>

        <div className="video-admin__upload-footer">
          <button
            className="video-admin__upload-btn"
            onClick={handleUpload}
            disabled={!videoFile || uploading}
          >
            {uploading ? "Uploading…" : "Upload & Set Active"}
          </button>
        </div>
      </div>

      {/* ── All videos list ── */}
      <div className="video-admin__list-section">
        <h2 className="video-admin__section-title">All Videos</h2>

        {loading ? (
          <p className="video-admin__loading">Loading…</p>
        ) : items.length === 0 ? (
          <p className="video-admin__empty">No videos uploaded yet.</p>
        ) : (
          <div className="video-admin__list">
            {items.map((item) => (
              <div
                key={item.id}
                className={`video-admin__item ${item.isActive ? "video-admin__item--active" : ""}`}
              >
                {/* Thumbnail/preview */}
                <div className="video-admin__item-thumb">
                  <video
                    key={item.videoUrl}
                    src={`${CMS_API_URL}${item.videoUrl}`}
                    className="video-admin__item-video"
                    muted
                    playsInline
                    preload="metadata"
                    onMouseEnter={(e) =>
                      (e.currentTarget as HTMLVideoElement).play()
                    }
                    onMouseLeave={(e) => {
                      const v = e.currentTarget as HTMLVideoElement;
                      v.pause();
                      v.currentTime = 0;
                    }}
                  />
                  {item.isActive && (
                    <span className="video-admin__item-live">Live</span>
                  )}
                </div>

                {/* Info */}
                <div className="video-admin__item-info">
                  <span className="video-admin__item-filename">
                    {item.videoUrl.split("/").pop()}
                  </span>
                  <span className="video-admin__item-date">
                    Added {formatDate(item.createdAt)}
                  </span>
                </div>

                {/* Actions */}
                <div className="video-admin__item-actions">
                  <button
                    className={`video-admin__badge ${item.isActive ? "video-admin__badge--active" : "video-admin__badge--inactive"}`}
                    onClick={() => handleSetActive(item)}
                    title={item.isActive ? "Deactivate" : "Set as active"}
                  >
                    {item.isActive ? "Active" : "Set Active"}
                  </button>
                  <button
                    className="video-admin__delete-btn"
                    onClick={() => setDeleteTarget(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Delete confirm modal ── */}
      {deleteTarget && (
        <div
          className="video-admin__modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="video-admin__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="video-admin__modal-header">
              <h2 className="video-admin__modal-title">Delete Video</h2>
              <button
                className="video-admin__modal-close"
                onClick={() => setDeleteTarget(null)}
              >
                ✕
              </button>
            </div>
            <div className="video-admin__modal-body">
              <p className="video-admin__confirm-text">
                Are you sure you want to delete{" "}
                <strong>{deleteTarget.videoUrl.split("/").pop()}</strong>?{" "}
                {deleteTarget.isActive && (
                  <span className="video-admin__confirm-warn">
                    This is the currently active banner — deleting it will
                    remove it from the homepage.
                  </span>
                )}
              </p>
            </div>
            <div className="video-admin__modal-footer">
              <button
                className="video-admin__cancel-btn"
                onClick={() => setDeleteTarget(null)}
                disabled={!!deletingId}
              >
                Cancel
              </button>
              <button
                className="video-admin__delete-confirm-btn"
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
