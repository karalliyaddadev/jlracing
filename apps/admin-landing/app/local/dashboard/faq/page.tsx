"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "../../../lib/api";

/* ─────────────────────────── Types ─────────────────────────────────────── */

interface FaqItem {
  id: number;
  categoryId: number;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

interface FaqCategory {
  id: number;
  site: string;
  title: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  items: FaqItem[];
}

/* ─────────────────────────── Component ─────────────────────────────────── */

export default function LocalFaqAdminPage() {
  const [categories, setCategories] = useState<FaqCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* Expanded categories in the list */
  const [expandedCats, setExpandedCats] = useState<Set<number>>(new Set());

  /* ── Category modal ── */
  const [catModal, setCatModal] = useState<"add" | "edit" | null>(null);
  const [catTarget, setCatTarget] = useState<FaqCategory | null>(null);
  const [catTitle, setCatTitle] = useState("");
  const [catOrder, setCatOrder] = useState(0);
  const [catActive, setCatActive] = useState(true);
  const [catSaving, setCatSaving] = useState(false);
  const [catError, setCatError] = useState<string | null>(null);

  /* ── Item modal ── */
  const [itemModal, setItemModal] = useState<"add" | "edit" | null>(null);
  const [itemTarget, setItemTarget] = useState<FaqItem | null>(null);
  const [itemCategoryId, setItemCategoryId] = useState<number | null>(null);
  const [itemQuestion, setItemQuestion] = useState("");
  const [itemAnswer, setItemAnswer] = useState("");
  const [itemOrder, setItemOrder] = useState(0);
  const [itemActive, setItemActive] = useState(true);
  const [itemSaving, setItemSaving] = useState(false);
  const [itemError, setItemError] = useState<string | null>(null);

  /* ── Delete confirm ── */
  const [deleteType, setDeleteType] = useState<"category" | "item" | null>(
    null,
  );
  const [deleteCatTarget, setDeleteCatTarget] = useState<FaqCategory | null>(
    null,
  );
  const [deleteItemTarget, setDeleteItemTarget] = useState<FaqItem | null>(
    null,
  );
  const [deleting, setDeleting] = useState(false);

  /* ─────────────────────────── Fetch ──────────────────────────────────── */

  const fetchCategories = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch("/api/faq/categories?site=LOCAL")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch FAQ data");
        return r.json();
      })
      .then(setCategories)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /* ─────────────────────────── Helpers ───────────────────────────────── */

  function toggleExpand(catId: number) {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      next.has(catId) ? next.delete(catId) : next.add(catId);
      return next;
    });
  }

  /* ─────────────────────── Category CRUD ─────────────────────────────── */

  function openAddCat() {
    setCatModal("add");
    setCatTarget(null);
    setCatTitle("");
    setCatOrder(categories.length);
    setCatActive(true);
    setCatError(null);
  }

  function openEditCat(cat: FaqCategory) {
    setCatModal("edit");
    setCatTarget(cat);
    setCatTitle(cat.title);
    setCatOrder(cat.order);
    setCatActive(cat.isActive);
    setCatError(null);
  }

  function closeCatModal() {
    if (catSaving) return;
    setCatModal(null);
    setCatTarget(null);
    setCatError(null);
  }

  async function saveCat() {
    if (!catTitle.trim()) {
      setCatError("Title is required");
      return;
    }
    setCatSaving(true);
    setCatError(null);
    try {
      const isEdit = catModal === "edit" && catTarget;
      const body = isEdit
        ? { title: catTitle.trim(), order: catOrder, isActive: catActive }
        : {
            site: "LOCAL",
            title: catTitle.trim(),
            order: catOrder,
            isActive: catActive,
          };
      const url = isEdit
        ? `/api/faq/categories/${catTarget!.id}`
        : "/api/faq/categories";
      const res = await apiFetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d?.message ?? "Save failed");
      }
      closeCatModal();
      fetchCategories();
    } catch (e: unknown) {
      setCatError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setCatSaving(false);
    }
  }

  async function toggleCatActive(cat: FaqCategory) {
    try {
      const res = await apiFetch(`/api/faq/categories/${cat.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !cat.isActive }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchCategories();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  /* ─────────────────────── Item CRUD ─────────────────────────────────── */

  function openAddItem(cat: FaqCategory) {
    setItemModal("add");
    setItemTarget(null);
    setItemCategoryId(cat.id);
    setItemQuestion("");
    setItemAnswer("");
    setItemOrder(cat.items.length);
    setItemActive(true);
    setItemError(null);
  }

  function openEditItem(item: FaqItem) {
    setItemModal("edit");
    setItemTarget(item);
    setItemCategoryId(item.categoryId);
    setItemQuestion(item.question);
    setItemAnswer(item.answer);
    setItemOrder(item.order);
    setItemActive(item.isActive);
    setItemError(null);
  }

  function closeItemModal() {
    if (itemSaving) return;
    setItemModal(null);
    setItemTarget(null);
    setItemError(null);
  }

  async function saveItem() {
    if (!itemQuestion.trim()) {
      setItemError("Question is required");
      return;
    }
    if (!itemAnswer.trim()) {
      setItemError("Answer is required");
      return;
    }
    setItemSaving(true);
    setItemError(null);
    try {
      const isEdit = itemModal === "edit" && itemTarget;
      const body = isEdit
        ? {
            question: itemQuestion.trim(),
            answer: itemAnswer.trim(),
            order: itemOrder,
            isActive: itemActive,
          }
        : {
            categoryId: itemCategoryId!,
            question: itemQuestion.trim(),
            answer: itemAnswer.trim(),
            order: itemOrder,
            isActive: itemActive,
          };
      const url = isEdit
        ? `/api/faq/items/${itemTarget!.id}`
        : "/api/faq/items";
      const res = await apiFetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d?.message ?? "Save failed");
      }
      closeItemModal();
      fetchCategories();
    } catch (e: unknown) {
      setItemError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setItemSaving(false);
    }
  }

  async function toggleItemActive(item: FaqItem) {
    try {
      const res = await apiFetch(`/api/faq/items/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchCategories();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }

  /* ─────────────────────── Delete ────────────────────────────────────── */

  function openDeleteCat(cat: FaqCategory) {
    setDeleteType("category");
    setDeleteCatTarget(cat);
    setDeleteItemTarget(null);
  }

  function openDeleteItem(item: FaqItem) {
    setDeleteType("item");
    setDeleteItemTarget(item);
    setDeleteCatTarget(null);
  }

  function closeDeleteModal() {
    if (deleting) return;
    setDeleteType(null);
    setDeleteCatTarget(null);
    setDeleteItemTarget(null);
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      let res: Response;
      if (deleteType === "category" && deleteCatTarget) {
        res = await apiFetch(`/api/faq/categories/${deleteCatTarget.id}`, {
          method: "DELETE",
        });
      } else if (deleteType === "item" && deleteItemTarget) {
        res = await apiFetch(`/api/faq/items/${deleteItemTarget.id}`, {
          method: "DELETE",
        });
      } else {
        return;
      }
      if (!res.ok) throw new Error("Delete failed");
      closeDeleteModal();
      fetchCategories();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  /* ─────────────────────────── Render ────────────────────────────────── */

  const totalItems = categories.reduce((s, c) => s + c.items.length, 0);
  const activeCats = categories.filter((c) => c.isActive).length;

  return (
    <div className="faq-admin">
      {/* ── Page header ── */}
      <div className="faq-admin__header">
        <div>
          <h1 className="faq-admin__title">FAQ Management</h1>
          <p className="faq-admin__subtitle">
            Manage categories and Q&amp;As shown on the local contact page
          </p>
        </div>
        <button className="faq-admin__primary-btn" onClick={openAddCat}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Category
        </button>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="faq-admin__error-banner">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* ── Stats strip ── */}
      {!loading && categories.length > 0 && (
        <div className="faq-admin__stats">
          <div className="faq-admin__stat">
            <span className="faq-admin__stat-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
            <div>
              <p className="faq-admin__stat-value">{categories.length}</p>
              <p className="faq-admin__stat-label">Categories</p>
            </div>
          </div>
          <div className="faq-admin__stat">
            <span className="faq-admin__stat-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <div>
              <p className="faq-admin__stat-value">{totalItems}</p>
              <p className="faq-admin__stat-label">Total Q&amp;As</p>
            </div>
          </div>
          <div className="faq-admin__stat">
            <span className="faq-admin__stat-icon faq-admin__stat-icon--green">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
            <div>
              <p className="faq-admin__stat-value">{activeCats}</p>
              <p className="faq-admin__stat-label">Active Categories</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      {loading ? (
        <div className="faq-admin__loading-wrap">
          <div className="faq-admin__spinner" />
          <p>Loading FAQ data…</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="faq-admin__empty-state">
          <div className="faq-admin__empty-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h3 className="faq-admin__empty-title">No FAQ categories yet</h3>
          <p className="faq-admin__empty-sub">
            Create your first category to start adding questions and answers
          </p>
          <button className="faq-admin__primary-btn" onClick={openAddCat}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add First Category
          </button>
        </div>
      ) : (
        <div className="faq-admin__list">
          {categories.map((cat, catIndex) => {
            const isExpanded = expandedCats.has(cat.id);
            return (
              <div
                key={cat.id}
                className={`faq-admin__cat-card${cat.isActive ? "" : " faq-admin__cat-card--inactive"}`}
              >
                {/* ── Category header ── */}
                <div className="faq-admin__cat-header">
                  <button
                    className="faq-admin__cat-toggle"
                    onClick={() => toggleExpand(cat.id)}
                    aria-expanded={isExpanded}
                  >
                    <span
                      className={`faq-admin__chevron${isExpanded ? " faq-admin__chevron--open" : ""}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                    <span className="faq-admin__cat-index">{catIndex + 1}</span>
                    <span className="faq-admin__cat-name">{cat.title}</span>
                    <span className="faq-admin__cat-count-badge">
                      {cat.items.length} Q&amp;A
                    </span>
                    {!cat.isActive && (
                      <span className="faq-admin__hidden-pill">Hidden</span>
                    )}
                  </button>

                  <div className="faq-admin__cat-controls">
                    <button
                      className={`faq-admin__toggle-switch${cat.isActive ? " faq-admin__toggle-switch--on" : ""}`}
                      onClick={() => toggleCatActive(cat)}
                      title={
                        cat.isActive
                          ? "Click to hide category"
                          : "Click to show category"
                      }
                    >
                      <span className="faq-admin__toggle-knob" />
                    </button>
                    <button
                      className="faq-admin__icon-btn faq-admin__icon-btn--edit"
                      onClick={() => openEditCat(cat)}
                      title="Edit category"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      className="faq-admin__icon-btn faq-admin__icon-btn--delete"
                      onClick={() => openDeleteCat(cat)}
                      title="Delete category"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ── Items panel ── */}
                {isExpanded && (
                  <div className="faq-admin__items-panel">
                    {cat.items.length === 0 ? (
                      <div className="faq-admin__items-empty">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 8v4M12 16h.01" />
                        </svg>
                        <span>No questions yet in this category</span>
                      </div>
                    ) : (
                      <div className="faq-admin__items-list">
                        {cat.items.map((item, idx) => (
                          <div
                            key={item.id}
                            className={`faq-admin__item-row${item.isActive ? "" : " faq-admin__item-row--hidden"}`}
                          >
                            <span className="faq-admin__q-num">{idx + 1}</span>
                            <div className="faq-admin__item-body">
                              <p className="faq-admin__item-question">
                                {item.question}
                              </p>
                              <p className="faq-admin__item-answer">
                                {item.answer}
                              </p>
                            </div>
                            <div className="faq-admin__item-controls">
                              {!item.isActive && (
                                <span className="faq-admin__hidden-pill">
                                  Hidden
                                </span>
                              )}
                              <button
                                className={`faq-admin__toggle-switch faq-admin__toggle-switch--sm${item.isActive ? " faq-admin__toggle-switch--on" : ""}`}
                                onClick={() => toggleItemActive(item)}
                                title={
                                  item.isActive
                                    ? "Hide this Q&A"
                                    : "Show this Q&A"
                                }
                              >
                                <span className="faq-admin__toggle-knob" />
                              </button>
                              <button
                                className="faq-admin__icon-btn faq-admin__icon-btn--edit"
                                onClick={() => openEditItem(item)}
                                title="Edit Q&A"
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                              </button>
                              <button
                                className="faq-admin__icon-btn faq-admin__icon-btn--delete"
                                onClick={() => openDeleteItem(item)}
                                title="Delete Q&A"
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                  <path d="M10 11v6M14 11v6" />
                                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      className="faq-admin__add-item-btn"
                      onClick={() => openAddItem(cat)}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Add Q&amp;A to &quot;{cat.title}&quot;
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════ Category Modal ══════════════ */}
      {catModal && (
        <div className="faq-admin__overlay" onClick={closeCatModal}>
          <div
            className="faq-admin__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="faq-admin__modal-header">
              <div className="faq-admin__modal-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <h2 className="faq-admin__modal-title">
                {catModal === "add" ? "New Category" : "Edit Category"}
              </h2>
              <button
                className="faq-admin__modal-close"
                onClick={closeCatModal}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="faq-admin__modal-body">
              {catError && (
                <div className="faq-admin__form-error">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  {catError}
                </div>
              )}
              <div className="faq-admin__field">
                <label
                  className="faq-admin__label"
                  htmlFor="local-faq-cat-title"
                >
                  Category Title <span className="faq-admin__required">*</span>
                </label>
                <input
                  id="local-faq-cat-title"
                  className="faq-admin__input"
                  type="text"
                  placeholder="e.g. Bike Inventory, Pre-Orders, Spare Parts…"
                  value={catTitle}
                  onChange={(e) => setCatTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="faq-admin__field">
                <label
                  className="faq-admin__label"
                  htmlFor="local-faq-cat-order"
                >
                  Display Order
                </label>
                <input
                  id="local-faq-cat-order"
                  className="faq-admin__input faq-admin__input--sm"
                  type="number"
                  min={0}
                  value={catOrder}
                  onChange={(e) => setCatOrder(Number(e.target.value))}
                />
                <p className="faq-admin__hint">Lower numbers appear first</p>
              </div>
              <label className="faq-admin__check-row">
                <div
                  className={`faq-admin__toggle-switch${catActive ? " faq-admin__toggle-switch--on" : ""}`}
                  onClick={() => setCatActive((v) => !v)}
                >
                  <span className="faq-admin__toggle-knob" />
                </div>
                <span className="faq-admin__check-label">
                  Active — visible on the contact page
                </span>
              </label>
            </div>

            <div className="faq-admin__modal-footer">
              <button
                className="faq-admin__cancel-btn"
                onClick={closeCatModal}
                disabled={catSaving}
              >
                Cancel
              </button>
              <button
                className="faq-admin__save-btn"
                onClick={saveCat}
                disabled={catSaving}
              >
                {catSaving ? (
                  <>
                    <span className="faq-admin__spinner faq-admin__spinner--sm" />{" "}
                    Saving…
                  </>
                ) : catModal === "add" ? (
                  "Create Category"
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ Item Modal ══════════════ */}
      {itemModal && (
        <div className="faq-admin__overlay" onClick={closeItemModal}>
          <div
            className="faq-admin__modal faq-admin__modal--wide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="faq-admin__modal-header">
              <div className="faq-admin__modal-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2 className="faq-admin__modal-title">
                {itemModal === "add" ? "New Q&A" : "Edit Q&A"}
              </h2>
              <button
                className="faq-admin__modal-close"
                onClick={closeItemModal}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="faq-admin__modal-body">
              {itemError && (
                <div className="faq-admin__form-error">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  {itemError}
                </div>
              )}
              <div className="faq-admin__field">
                <label className="faq-admin__label" htmlFor="local-faq-item-q">
                  Question <span className="faq-admin__required">*</span>
                </label>
                <input
                  id="local-faq-item-q"
                  className="faq-admin__input"
                  type="text"
                  placeholder="e.g. What bikes do you currently have in stock?"
                  value={itemQuestion}
                  onChange={(e) => setItemQuestion(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="faq-admin__field">
                <label className="faq-admin__label" htmlFor="local-faq-item-a">
                  Answer <span className="faq-admin__required">*</span>
                </label>
                <textarea
                  id="local-faq-item-a"
                  className="faq-admin__textarea"
                  rows={5}
                  placeholder="Provide a clear, helpful answer that addresses the customer's concern…"
                  value={itemAnswer}
                  onChange={(e) => setItemAnswer(e.target.value)}
                />
                <p className="faq-admin__hint">
                  {itemAnswer.length} characters
                </p>
              </div>
              <div className="faq-admin__row-2">
                <div className="faq-admin__field">
                  <label
                    className="faq-admin__label"
                    htmlFor="local-faq-item-order"
                  >
                    Display Order
                  </label>
                  <input
                    id="local-faq-item-order"
                    className="faq-admin__input faq-admin__input--sm"
                    type="number"
                    min={0}
                    value={itemOrder}
                    onChange={(e) => setItemOrder(Number(e.target.value))}
                  />
                </div>
                <label className="faq-admin__check-row">
                  <div
                    className={`faq-admin__toggle-switch${itemActive ? " faq-admin__toggle-switch--on" : ""}`}
                    onClick={() => setItemActive((v) => !v)}
                  >
                    <span className="faq-admin__toggle-knob" />
                  </div>
                  <span className="faq-admin__check-label">Active</span>
                </label>
              </div>
            </div>

            <div className="faq-admin__modal-footer">
              <button
                className="faq-admin__cancel-btn"
                onClick={closeItemModal}
                disabled={itemSaving}
              >
                Cancel
              </button>
              <button
                className="faq-admin__save-btn"
                onClick={saveItem}
                disabled={itemSaving}
              >
                {itemSaving ? (
                  <>
                    <span className="faq-admin__spinner faq-admin__spinner--sm" />{" "}
                    Saving…
                  </>
                ) : itemModal === "add" ? (
                  "Add Q&A"
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ Delete Modal ══════════════ */}
      {deleteType && (
        <div className="faq-admin__overlay" onClick={closeDeleteModal}>
          <div
            className="faq-admin__modal faq-admin__modal--danger"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="faq-admin__modal-header">
              <div className="faq-admin__modal-icon faq-admin__modal-icon--danger">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </div>
              <h2 className="faq-admin__modal-title">
                {deleteType === "category"
                  ? "Delete Category"
                  : "Delete Question"}
              </h2>
              <button
                className="faq-admin__modal-close"
                onClick={closeDeleteModal}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="faq-admin__modal-body">
              {deleteType === "category" && deleteCatTarget ? (
                <div className="faq-admin__delete-body">
                  <p className="faq-admin__delete-text">
                    You are about to permanently delete the category
                  </p>
                  <p className="faq-admin__delete-name">
                    &quot;{deleteCatTarget.title}&quot;
                  </p>
                  {deleteCatTarget.items.length > 0 && (
                    <div className="faq-admin__delete-warn">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      This will also delete all{" "}
                      <strong>
                        {deleteCatTarget.items.length} Q&amp;A items
                      </strong>{" "}
                      inside this category.
                    </div>
                  )}
                </div>
              ) : (
                <div className="faq-admin__delete-body">
                  <p className="faq-admin__delete-text">
                    You are about to permanently delete the question
                  </p>
                  <p className="faq-admin__delete-name">
                    &quot;{deleteItemTarget?.question}&quot;
                  </p>
                </div>
              )}
            </div>
            <div className="faq-admin__modal-footer">
              <button
                className="faq-admin__cancel-btn"
                onClick={closeDeleteModal}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="faq-admin__danger-btn"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="faq-admin__spinner faq-admin__spinner--sm faq-admin__spinner--light" />{" "}
                    Deleting…
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
