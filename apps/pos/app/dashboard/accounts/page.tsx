"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../components/AdminContext";
import { API_URL } from "../../lib/constants";
import { IconAccounts, IconEdit, IconPlus } from "../../lib/icons";

type Account = {
  id: number;
  name: string;
  code: string;
  type: "BANK" | "CASH";
  openingBalance: number;
  isActive: boolean;
  createdAt: string;
};

const EMPTY_FORM = { name: "", type: "BANK" as "BANK" | "CASH", openingBalance: 0 };

export default function ManageAccountsPage() {
  const { token } = useAdmin();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Account | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchAccounts() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/pos/accounts/chart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAccounts(data.data ?? []);
    } catch {
      setError("Failed to load accounts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) fetchAccounts();
  }, [token]);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  }

  function openEdit(acc: Account) {
    setEditing(acc);
    setForm({ name: acc.name, type: acc.type, openingBalance: acc.openingBalance });
    setError("");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) { setError("Name is required"); return; }
    setSaving(true);
    setError("");
    try {
      const url = editing
        ? `${API_URL}/api/pos/accounts/chart/${editing.id}`
        : `${API_URL}/api/pos/accounts/chart`;
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.message ?? "Failed to save");
        return;
      }
      setModalOpen(false);
      fetchAccounts();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(acc: Account) {
    await fetch(`${API_URL}/api/pos/accounts/chart/${acc.id}/toggle`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAccounts();
  }

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <span className="page-title-icon"><IconAccounts /></span>
          <div>
            <h1 className="page-title">Manage Accounts</h1>
            <p className="page-subtitle">Bank and cash accounts for the general ledger</p>
          </div>
        </div>
        <button className="btn-accent" style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={openAdd}>
          <IconPlus /> Add Account
        </button>
      </div>

      <div className="bm-table-card">
        {loading ? (
          <div className="bm-table-empty">Loading accounts...</div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Opening Balance</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.length === 0 ? (
                  <tr><td colSpan={6} className="bm-table-empty">No accounts yet. Add your first account.</td></tr>
                ) : accounts.map((acc) => (
                  <tr key={acc.id} style={{ opacity: acc.isActive ? 1 : 0.55 }}>
                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "var(--accent)" }}>
                        {acc.code}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>{acc.name}</td>
                    <td>
                      <span className={`badge ${acc.type === "BANK" ? "badge-review" : "badge-active"}`}>
                        {acc.type}
                      </span>
                    </td>
                    <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      Rs. {acc.openingBalance.toLocaleString()}
                    </td>
                    <td>
                      <span className={`badge ${acc.isActive ? "badge-active" : "badge-pending"}`}>
                        {acc.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="bm-row-actions">
                        <button className="bm-action-btn bm-edit-btn" onClick={() => openEdit(acc)} title="Edit">
                          <IconEdit />
                        </button>
                        <button
                          className={`bm-action-btn ${acc.isActive ? "" : "bm-restore-btn"}`}
                          style={acc.isActive ? { borderColor: "var(--warning)", color: "var(--warning)" } : {}}
                          onClick={() => handleToggle(acc)}
                        >
                          {acc.isActive ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="bm-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close" onClick={() => setModalOpen(false)}>✕</button>
            <h2 className="bm-modal-title">{editing ? "Edit Account" : "Add Account"}</h2>
            <div className="bm-modal-body">
              {error && <div className="bm-alert bm-alert-error" style={{ marginBottom: 12 }}>{error}</div>}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div className="bm-field-group">
                  <label className="users-label">Account Name *</label>
                  <input
                    className="bm-input"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. JLracing HNB"
                  />
                </div>
                <div className="bm-field-group">
                  <label className="users-label">Account Type *</label>
                  <select
                    className="bm-select"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as "BANK" | "CASH" })}
                  >
                    <option value="BANK">Bank Account</option>
                    <option value="CASH">Cash Account</option>
                  </select>
                </div>
                <div className="bm-field-group">
                  <label className="users-label">Opening Balance (Rs.)</label>
                  <input
                    className="bm-input"
                    type="number"
                    min={0}
                    value={form.openingBalance}
                    onChange={(e) => setForm({ ...form, openingBalance: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
            <div className="bm-modal-actions">
              <button className="btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn-accent" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
