"use client";

import { useEffect, useState } from "react";
import { useAdmin } from "../../../components/AdminContext";
import { API_URL } from "../../../lib/constants";
import { IconAccounts, IconEdit, IconPlus } from "../../../lib/icons";

type Account = { id: number; name: string; code: string };

type VoucherRow = {
  id: number;
  voucherNo: string;
  createdAt: string;
  type: string;
  typeLabel: string;
  amount: number;
  description?: string | null;
  isVoided: boolean;
  account: { id: number; name: string; code: string };
};

const VOUCHER_TYPES = [
  { value: "VEHICLE_CLEARANCE", label: "Vehicle Clearance Payment" },
  { value: "BILL", label: "Bill" },
  { value: "OTHER_PAYMENT", label: "Other Payment" },
  { value: "PERMIT", label: "Permit Payment" },
  { value: "LEASING_PAYMENT", label: "Leasing Payment" },
  { value: "LOAN_PAYMENT", label: "Loan Payment" },
  { value: "SALARY", label: "Salary" },
  { value: "CUSTOMER_REFUND", label: "Customer Refund" },
  { value: "VEHICLE_PURCHASE", label: "Vehicle Purchase" },
  { value: "ADVANCE_REFUND", label: "Advance Invoice Refund" },
];

const EMPTY_FORM = { accountId: 0, type: "", amount: 0, description: "" };

function formatRs(v: number) {
  return `Rs. ${v.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB");
}

export default function VouchersPage() {
  const { token } = useAdmin();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [vouchers, setVouchers] = useState<VoucherRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [editingVoucher, setEditingVoucher] = useState<VoucherRow | null>(null);
  const [editForm, setEditForm] = useState({ type: "", amount: 0, description: "" });
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  const [printVoucher, setPrintVoucher] = useState<VoucherRow | null>(null);

  async function fetchAccounts() {
    const res = await fetch(`${API_URL}/api/pos/accounts/chart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setAccounts((d.data ?? []).filter((a: Account & { isActive: boolean }) => a.isActive));
  }

  async function fetchVouchers() {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/pos/accounts/vouchers?limit=100`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setVouchers(d.data?.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (token) {
      fetchAccounts();
      fetchVouchers();
    }
  }, [token]);

  async function submitVoucher() {
    if (!form.accountId) { setFormError("Select an account"); return; }
    if (!form.type) { setFormError("Select a voucher type"); return; }
    if (!form.amount || form.amount <= 0) { setFormError("Enter a valid amount"); return; }
    setSaving(true);
    setFormError("");
    try {
      const res = await fetch(`${API_URL}/api/pos/accounts/vouchers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ accountId: form.accountId, type: form.type, amount: form.amount, description: form.description || undefined }),
      });
      const d = await res.json();
      if (!res.ok) { setFormError(d.message ?? "Failed to create"); return; }
      setForm(EMPTY_FORM);
      setPrintVoucher(d.data);
      fetchVouchers();
    } catch {
      setFormError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function handleVoid(id: number) {
    if (!confirm("Void this voucher? The ledger entry will be reversed.")) return;
    await fetch(`${API_URL}/api/pos/accounts/vouchers/${id}/void`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchVouchers();
  }

  function openEdit(v: VoucherRow) {
    setEditingVoucher(v);
    setEditForm({ type: v.type, amount: v.amount, description: v.description ?? "" });
    setEditError("");
  }

  async function submitEdit() {
    if (!editingVoucher) return;
    setEditSaving(true);
    setEditError("");
    try {
      const res = await fetch(`${API_URL}/api/pos/accounts/vouchers/${editingVoucher.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type: editForm.type || undefined, amount: editForm.amount, description: editForm.description || undefined }),
      });
      if (!res.ok) { const d = await res.json(); setEditError(d.message ?? "Failed"); return; }
      setEditingVoucher(null);
      fetchVouchers();
    } catch {
      setEditError("Network error");
    } finally {
      setEditSaving(false);
    }
  }

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <span className="page-title-icon"><IconAccounts /></span>
          <div>
            <h1 className="page-title">Vouchers</h1>
            <p className="page-subtitle">Record cash out / expense payments</p>
          </div>
        </div>
      </div>

      {/* Create voucher form */}
      <div className="bm-form-card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingBottom: "0.75rem", borderBottom: "1px solid var(--panel-border)", marginBottom: "1rem" }}>
          <span style={{ color: "var(--accent)" }}><IconPlus /></span>
          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text)" }}>New Voucher</h3>
        </div>
        {formError && <div className="bm-alert bm-alert-error" style={{ marginBottom: 12 }}>{formError}</div>}
        <div className="bm-fields-grid">
          <div className="bm-field-group">
            <label className="users-label">Voucher Type *</label>
            <select className="bm-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="">— Select type —</option>
              {VOUCHER_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div className="bm-field-group">
            <label className="users-label">Amount (Rs.) *</label>
            <input className="bm-input" type="number" min={0} value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
          </div>
          <div className="bm-field-group">
            <label className="users-label">From Account *</label>
            <select className="bm-select" value={form.accountId} onChange={(e) => setForm({ ...form, accountId: Number(e.target.value) })}>
              <option value={0}>— Select account —</option>
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.name} ({a.code})</option>)}
            </select>
          </div>
          <div className="bm-field-group">
            <label className="users-label">Description (optional)</label>
            <input className="bm-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Additional notes..." />
          </div>
        </div>
        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
          <button className="btn-accent" style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={submitVoucher} disabled={saving}>
            <IconPlus /> {saving ? "Creating..." : "Create Voucher"}
          </button>
        </div>
      </div>

      {/* Voucher history */}
      <div className="bm-table-card">
        <div className="panel-header">
          <div className="panel-title-row">
            <span style={{ color: "var(--accent)" }}><IconAccounts /></span>
            <h3>Voucher History</h3>
          </div>
        </div>
        {loading ? (
          <div className="bm-table-empty">Loading...</div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Voucher No</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th>Account</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.length === 0 ? (
                  <tr><td colSpan={8} className="bm-table-empty">No vouchers yet</td></tr>
                ) : vouchers.map((v) => (
                  <tr key={v.id} style={{ opacity: v.isVoided ? 0.5 : 1 }}>
                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "var(--accent)" }}>
                        {v.voucherNo}
                      </span>
                    </td>
                    <td className="td-muted">{formatDate(v.createdAt)}</td>
                    <td>{v.typeLabel}</td>
                    <td style={{ textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatRs(v.amount)}</td>
                    <td className="td-muted">{v.account.name}</td>
                    <td className="td-muted">{v.description ?? "—"}</td>
                    <td>
                      {v.isVoided
                        ? <span className="badge" style={{ background: "var(--danger-bg)", color: "var(--danger)" }}>Voided</span>
                        : <span className="badge badge-active">Active</span>
                      }
                    </td>
                    <td>
                      <div className="bm-row-actions">
                        <button className="bm-action-btn" onClick={() => setPrintVoucher(v)} title="Print" style={{ fontSize: "0.9rem" }}>🖨</button>
                        {!v.isVoided && (
                          <button className="bm-action-btn bm-edit-btn" onClick={() => openEdit(v)}><IconEdit /></button>
                        )}
                        {!v.isVoided && (
                          <button className="bm-action-btn" style={{ borderColor: "var(--danger)", color: "var(--danger)" }} onClick={() => handleVoid(v.id)}>Void</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit voucher modal */}
      {editingVoucher && (
        <div className="bm-modal-backdrop" onClick={() => setEditingVoucher(null)}>
          <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close" onClick={() => setEditingVoucher(null)}>✕</button>
            <h2 className="bm-modal-title">Edit Voucher — {editingVoucher.voucherNo}</h2>
            <div className="bm-modal-body">
              {editError && <div className="bm-alert bm-alert-error" style={{ marginBottom: 10 }}>{editError}</div>}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div className="bm-field-group">
                  <label className="users-label">Type</label>
                  <select className="bm-select" value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}>
                    {VOUCHER_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="bm-field-group">
                  <label className="users-label">Amount (Rs.)</label>
                  <input className="bm-input" type="number" min={0} value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })} />
                </div>
                <div className="bm-field-group">
                  <label className="users-label">Description</label>
                  <input className="bm-input" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="bm-modal-actions">
              <button className="btn-outline" onClick={() => setEditingVoucher(null)}>Cancel</button>
              <button className="btn-accent" onClick={submitEdit} disabled={editSaving}>{editSaving ? "Saving..." : "Update"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Print voucher modal */}
      {printVoucher && (
        <div className="bm-modal-backdrop print-hide" onClick={() => setPrintVoucher(null)}>
          <div className="bm-modal bm-modal-lg invoice-print-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close print-hide" onClick={() => setPrintVoucher(null)}>✕</button>
            <h2 className="bm-modal-title print-hide">Voucher — {printVoucher.voucherNo}</h2>
            <div className="bm-modal-body" style={{ paddingTop: 8 }}>
              <div style={{ padding: "1.25rem", border: "1px solid var(--panel-border)", borderRadius: "var(--radius-md)", background: "var(--bg)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>JL RACING</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>Importers, Exporters &amp; Dealers Of Motorcycles</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>No:154, Puttalam Road, Kurunegala, Sri Lanka</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--accent)" }}>PAYMENT VOUCHER</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-soft)" }}>Voucher No: <strong style={{ color: "var(--text)" }}>{printVoucher.voucherNo}</strong></div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-soft)" }}>Date: {formatDate(printVoucher.createdAt)}</div>
                  </div>
                </div>
                <hr style={{ margin: "12px 0", borderColor: "var(--panel-border)" }} />
                <table className="data-table" style={{ width: "100%" }}>
                  <tbody>
                    <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Payment Type</td><td style={{ textAlign: "right", fontWeight: 600 }}>{printVoucher.typeLabel}</td></tr>
                    <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Amount</td><td style={{ textAlign: "right", fontWeight: 700, color: "var(--accent)" }}>{formatRs(printVoucher.amount)}</td></tr>
                    <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>From Account</td><td style={{ textAlign: "right" }}>{printVoucher.account.name} ({printVoucher.account.code})</td></tr>
                    {printVoucher.description && <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Description</td><td style={{ textAlign: "right" }}>{printVoucher.description}</td></tr>}
                  </tbody>
                </table>
                <hr style={{ margin: "16px 0", borderColor: "var(--panel-border)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <div style={{ textAlign: "center" }}><div style={{ borderTop: "1px solid #333", width: 120, marginBottom: 4 }} /><small style={{ color: "var(--text-soft)" }}>Prepared By</small></div>
                  <div style={{ textAlign: "center" }}><div style={{ borderTop: "1px solid #333", width: 120, marginBottom: 4 }} /><small style={{ color: "var(--text-soft)" }}>Authorised By</small></div>
                </div>
              </div>
            </div>
            <div className="bm-modal-actions print-hide">
              <button className="btn-outline print-hide" onClick={() => setPrintVoucher(null)}>Close</button>
              <button className="btn-accent print-hide" onClick={() => window.print()}>🖨 Print Voucher</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
