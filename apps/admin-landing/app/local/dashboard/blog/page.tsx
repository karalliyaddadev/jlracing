"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { apiFetch } from "../../../lib/api";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  imageRatio: string;
  article: string;
  publishedAt: string;
  isPublished: boolean;
  createdAt: string;
}

interface FormData {
  title: string;
  author: string;
  imageUrl: string;
  imageRatio: string;
  article: string;
  isPublished: boolean;
}

const EMPTY_FORM: FormData = {
  title: "",
  author: "",
  imageUrl: "",
  imageRatio: "16:9",
  article: "",
  isPublished: false,
};

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirm modal state
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch(`/api/blog`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  function openCreate() {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setImageFile(null);
    setImagePreview(null);
    setModalOpen(true);
  }

  function openEdit(post: BlogPost) {
    setEditingPost(post);
    setForm({
      title: post.title,
      author: post.author,
      imageUrl: post.imageUrl,
      imageRatio: post.imageRatio,
      article: post.article,
      isPublished: post.isPublished,
    });
    setFormError(null);
    setImageFile(null);
    // Show existing image as preview
    setImagePreview(post.imageUrl ? `${CMS_API_URL}${post.imageUrl}` : null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleImagePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    // Clear previously saved URL so we know a new upload is pending
    setForm((prev) => ({ ...prev, imageUrl: "" }));
  }

  async function handleSave() {
    if (!form.title.trim() || !form.author.trim() || !form.article.trim()) {
      setFormError("Title, author and article are required.");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      let finalImageUrl = form.imageUrl;

      // Upload image file first if a new one was picked
      if (imageFile) {
        setUploading(true);
        const fd = new FormData();
        fd.append("file", imageFile);
        const uploadRes = await apiFetch(`/api/upload/blog-image`, {
          method: "POST",
          body: fd,
        });
        setUploading(false);
        if (!uploadRes.ok) {
          const uploadData = await uploadRes.json();
          throw new Error(uploadData?.message ?? "Image upload failed");
        }
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      const url = editingPost ? `/api/blog/${editingPost.id}` : `/api/blog`;
      const method = editingPost ? "PATCH" : "POST";
      const res = await apiFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imageUrl: finalImageUrl }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message ?? "Save failed");
      }
      closeModal();
      fetchPosts();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      const res = await apiFetch(`/api/blog/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteTarget(null);
      fetchPosts();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleTogglePublish(post: BlogPost) {
    try {
      const res = await apiFetch(`/api/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchPosts();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="blog-admin">
      {/* ── Page header ── */}
      <div className="blog-admin__header">
        <div>
          <h1 className="blog-admin__title">Blog Posts</h1>
          <p className="blog-admin__subtitle">
            Manage blog articles for the local frontend
          </p>
        </div>
        <button className="blog-admin__new-btn" onClick={openCreate}>
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
          New Post
        </button>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="blog-admin__error">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* ── Table ── */}
      {loading ? (
        <p className="blog-admin__loading">Loading posts…</p>
      ) : (
        <div className="blog-admin__table-wrap">
          <table className="blog-admin__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="blog-admin__empty">
                    No blog posts yet. Create your first one!
                  </td>
                </tr>
              )}
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="blog-admin__td-title">{post.title}</td>
                  <td>{post.author}</td>
                  <td>
                    <button
                      className={`blog-admin__badge ${post.isPublished ? "blog-admin__badge--published" : "blog-admin__badge--draft"}`}
                      onClick={() => handleTogglePublish(post)}
                      title="Toggle publish status"
                    >
                      {post.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="blog-admin__td-date">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <div className="blog-admin__actions">
                      <button
                        className="blog-admin__edit-btn"
                        onClick={() => openEdit(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="blog-admin__delete-btn"
                        onClick={() => setDeleteTarget(post)}
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
        <div className="blog-admin__modal-overlay" onClick={closeModal}>
          <div
            className="blog-admin__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blog-admin__modal-header">
              <h2 className="blog-admin__modal-title">
                {editingPost ? "Edit Post" : "New Post"}
              </h2>
              <button className="blog-admin__modal-close" onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className="blog-admin__modal-body">
              {formError && (
                <p className="blog-admin__form-error">{formError}</p>
              )}

              <div className="blog-admin__field">
                <label>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Post title"
                />
              </div>

              <div className="blog-admin__field">
                <label>Author *</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author name"
                />
              </div>

              <div className="blog-admin__field-row">
                <div className="blog-admin__field">
                  <label>Cover Image</label>
                  {/* File picker — uploads to uploads/local/blog/ on the backend */}
                  <div className="blog-admin__image-picker">
                    {imagePreview ? (
                      <div className="blog-admin__image-preview">
                        <img src={imagePreview} alt="Preview" />
                        <button
                          type="button"
                          className="blog-admin__image-remove"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setForm((prev) => ({ ...prev, imageUrl: "" }));
                            if (fileInputRef.current)
                              fileInputRef.current.value = "";
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label
                        className="blog-admin__image-drop"
                        htmlFor="blog-image-input"
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
                        <span>Click to select image</span>
                        <span className="blog-admin__image-hint">
                          JPEG, PNG, WebP, AVIF · max 20 MB
                        </span>
                      </label>
                    )}
                    <input
                      id="blog-image-input"
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/avif"
                      style={{ display: "none" }}
                      onChange={handleImagePick}
                    />
                  </div>
                  {uploading && (
                    <span className="blog-admin__uploading">
                      Uploading image…
                    </span>
                  )}
                </div>
                <div className="blog-admin__field blog-admin__field--sm">
                  <label>Aspect Ratio</label>
                  <select
                    value={form.imageRatio}
                    onChange={(e) =>
                      setForm({ ...form, imageRatio: e.target.value })
                    }
                  >
                    <option value="16:9">16:9</option>
                    <option value="4:3">4:3</option>
                    <option value="1:1">1:1</option>
                    <option value="3:2">3:2</option>
                  </select>
                </div>
              </div>

              <div className="blog-admin__field">
                <label>Article *</label>
                <textarea
                  value={form.article}
                  onChange={(e) =>
                    setForm({ ...form, article: e.target.value })
                  }
                  placeholder="Write the article content here…"
                  rows={10}
                />
              </div>

              <div className="blog-admin__field blog-admin__field--checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) =>
                      setForm({ ...form, isPublished: e.target.checked })
                    }
                  />
                  Publish immediately
                </label>
              </div>
            </div>

            <div className="blog-admin__modal-footer">
              <button
                className="blog-admin__cancel-btn"
                onClick={closeModal}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="blog-admin__save-btn"
                onClick={handleSave}
                disabled={saving || uploading}
              >
                {uploading
                  ? "Uploading…"
                  : saving
                    ? "Saving…"
                    : editingPost
                      ? "Save Changes"
                      : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete confirmation modal ── */}
      {deleteTarget && (
        <div
          className="blog-admin__modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="blog-admin__modal blog-admin__modal--confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blog-admin__modal-header">
              <h2 className="blog-admin__modal-title">Delete Post</h2>
              <button
                className="blog-admin__modal-close"
                onClick={() => setDeleteTarget(null)}
              >
                ✕
              </button>
            </div>
            <div className="blog-admin__modal-body">
              <p className="blog-admin__confirm-text">
                Are you sure you want to delete{" "}
                <strong>&ldquo;{deleteTarget.title}&rdquo;</strong>? This action
                cannot be undone.
              </p>
            </div>
            <div className="blog-admin__modal-footer">
              <button
                className="blog-admin__cancel-btn"
                onClick={() => setDeleteTarget(null)}
                disabled={!!deletingId}
              >
                Cancel
              </button>
              <button
                className="blog-admin__delete-confirm-btn"
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
