"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "../../../components/AdminContext";
import { API_URL } from "../../../lib/constants";
import { IconInvoice } from "../../../lib/icons";
import { readApiData } from "../../../lib/api";
import TablePagination, { paginateRows } from "../../../components/TablePagination";

type InvoiceTerm = {
  id: number;
  text: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function InvoiceTermsPage() {
  const { token } = useAdmin();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [newText, setNewText] = useState("");
  const [newSortOrder, setNewSortOrder] = useState("");
  const [newIsActive, setNewIsActive] = useState(true);

  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [editSortOrder, setEditSortOrder] = useState("");
  const [editIsActive, setEditIsActive] = useState(true);

  const base = `${API_URL}/api/pos/user-management`;
  const auth = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);
  const queryClient = useQueryClient();

  const termsQueryKey = useMemo(() => ["pos", "invoice-terms", token] as const, [token]);

  const termsQuery = useQuery({
    queryKey: termsQueryKey,
    enabled: Boolean(token),
    queryFn: async () => {
      const response = await fetch(`${base}/invoice-terms`, { headers: auth, cache: "no-store" });
      const payload = await readApiData<{ terms?: InvoiceTerm[] }>(response, "Failed to load invoice terms");
      return payload.terms ?? [];
    },
  });
  const filteredTerms = useMemo(() => {
    const terms = termsQuery.data ?? [];
    const needle = search.trim().toLowerCase();
    return needle ? terms.filter((term) => term.text.toLowerCase().includes(needle)) : terms;
  }, [search, termsQuery.data]);
  const pagedTerms = useMemo(() => paginateRows(filteredTerms, page, pageSize), [filteredTerms, page, pageSize]);
  useEffect(() => { setPage(1); }, [search, pageSize]);

  const createTermMutation = useMutation({
    mutationFn: async (input: { text: string; sortOrder?: number; isActive: boolean }) => {
      const response = await fetch(`${base}/invoice-terms`, {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const payload = await response.json() as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to add term");
    },
    onSuccess: async () => {
      resetCreateForm();
      setSuccess("Term added");
      await queryClient.invalidateQueries({ queryKey: termsQueryKey });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to add term");
    },
  });

  const updateTermMutation = useMutation({
    mutationFn: async (input: { id: number; text: string; sortOrder?: number; isActive: boolean }) => {
      const response = await fetch(`${base}/invoice-terms/${input.id}`, {
        method: "PATCH",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({
          text: input.text,
          sortOrder: input.sortOrder,
          isActive: input.isActive,
        }),
      });
      const payload = await response.json() as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to update term");
    },
    onSuccess: async () => {
      stopEdit();
      setSuccess("Term updated");
      await queryClient.invalidateQueries({ queryKey: termsQueryKey });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to update term");
    },
  });

  const deleteTermMutation = useMutation({
    mutationFn: async (termId: number) => {
      const response = await fetch(`${base}/invoice-terms/${termId}`, {
        method: "DELETE",
        headers: auth,
      });
      const payload = await response.json() as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to delete term");
    },
    onSuccess: async (_, termId) => {
      if (editId === termId) stopEdit();
      setSuccess("Term deleted");
      await queryClient.invalidateQueries({ queryKey: termsQueryKey });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to delete term");
    },
  });

  const loading = termsQuery.isPending;
  const saving = createTermMutation.isPending || updateTermMutation.isPending || deleteTermMutation.isPending;
  const queryError = termsQuery.error instanceof Error ? termsQuery.error.message : null;
  const visibleError = error ?? queryError;

  const resetCreateForm = () => {
    setNewText("");
    setNewSortOrder("");
    setNewIsActive(true);
  };

  const startEdit = (term: InvoiceTerm) => {
    setEditId(term.id);
    setEditText(term.text);
    setEditSortOrder(String(term.sortOrder));
    setEditIsActive(term.isActive);
  };

  const stopEdit = () => {
    setEditId(null);
    setEditText("");
    setEditSortOrder("");
    setEditIsActive(true);
  };

  const handleCreate = async () => {
    const text = newText.trim();
    if (!text) {
      setError("Term text is required");
      return;
    }

    setError(null);
    setSuccess(null);
    createTermMutation.mutate({
      text,
      sortOrder: newSortOrder.trim() ? Number(newSortOrder) : undefined,
      isActive: newIsActive,
    });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    const text = editText.trim();
    if (!text) {
      setError("Term text is required");
      return;
    }

    setError(null);
    setSuccess(null);
    updateTermMutation.mutate({
      id: editId,
      text,
      sortOrder: editSortOrder.trim() ? Number(editSortOrder) : undefined,
      isActive: editIsActive,
    });
  };

  const handleDelete = async (termId: number) => {
    const confirmed = window.confirm("Delete this term and condition?");
    if (!confirmed) return;

    setError(null);
    setSuccess(null);
    deleteTermMutation.mutate(termId);
  };

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <div className="page-title-icon"><IconInvoice /></div>
          <div>
            <h2 className="page-title">Invoice Terms & Conditions</h2>
            <p className="page-subtitle">Manage terms shown at the bottom of printed invoices.</p>
          </div>
        </div>
      </div>

      {visibleError && <div className="bm-alert bm-alert-error">{visibleError}</div>}
      {success && <div className="bm-alert bm-alert-success">{success}</div>}

      <div className="bm-table-card" style={{ marginBottom: "1rem" }}>
        <div style={{ padding: "1rem", display: "grid", gap: "0.75rem" }}>
          <h3 className="users-section-title" style={{ margin: 0 }}>Add New Term</h3>
          <textarea
            className="bm-input invoice-terms-textarea"
            placeholder="Enter term and condition text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <div className="invoice-terms-form-row">
            <input
              className="bm-input"
              type="number"
              min={1}
              max={9999}
              placeholder="Sort order (optional)"
              value={newSortOrder}
              onChange={(e) => setNewSortOrder(e.target.value)}
            />
            <label className="invoice-terms-checkbox">
              <input
                type="checkbox"
                checked={newIsActive}
                onChange={(e) => setNewIsActive(e.target.checked)}
              />
              <span>Active</span>
            </label>
            <button type="button" className="btn-accent" onClick={() => void handleCreate()} disabled={saving}>
              {saving ? "Saving..." : "Add Term"}
            </button>
          </div>
        </div>
      </div>

      <div className="bm-table-card">
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--panel-border)" }}><input className="bm-input" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search terms" /></div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: 120 }}>Order</th>
                <th>Term Text</th>
                <th style={{ width: 120 }}>Status</th>
                <th style={{ width: 220 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={4} className="bm-table-empty">Loading terms...</td></tr>
              )}
              {!loading && (termsQuery.data ?? []).length === 0 && (
                <tr><td colSpan={4} className="bm-table-empty">No terms found.</td></tr>
              )}
              {!loading && pagedTerms.map((term) => {
                const isEditing = editId === term.id;
                return (
                  <tr key={term.id}>
                    <td>
                      {isEditing ? (
                        <input
                          className="bm-input"
                          type="number"
                          min={1}
                          max={9999}
                          value={editSortOrder}
                          onChange={(e) => setEditSortOrder(e.target.value)}
                        />
                      ) : term.sortOrder}
                    </td>
                    <td>
                      {isEditing ? (
                        <textarea
                          className="bm-input invoice-terms-textarea"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                      ) : (
                        <span>{term.text}</span>
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <label className="invoice-terms-checkbox">
                          <input
                            type="checkbox"
                            checked={editIsActive}
                            onChange={(e) => setEditIsActive(e.target.checked)}
                          />
                          <span>{editIsActive ? "Active" : "Inactive"}</span>
                        </label>
                      ) : (
                        <span className={term.isActive ? "users-status sold" : "users-status not-sold"}>
                          {term.isActive ? "Active" : "Inactive"}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="invoice-terms-actions">
                        {isEditing ? (
                          <>
                            <button type="button" className="btn-accent" onClick={() => void handleUpdate()} disabled={saving}>Save</button>
                            <button type="button" className="btn-outline" onClick={stopEdit} disabled={saving}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button type="button" className="btn-outline" onClick={() => startEdit(term)} disabled={saving}>Update</button>
                            <button type="button" className="btn-outline invoice-terms-delete-btn" onClick={() => void handleDelete(term.id)} disabled={saving}>Delete</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <TablePagination page={page} pageSize={pageSize} total={filteredTerms.length} onPageChange={setPage} onPageSizeChange={setPageSize} />
      </div>
    </div>
  );
}
