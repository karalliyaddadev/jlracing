"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAdmin } from "../../../components/AdminContext";
import { API_URL } from "../../../lib/constants";
import { IconAccounts, IconEdit, IconPlus } from "../../../lib/icons";

type Account = { id: number; name: string; code: string; type: string };

type InvoiceRow = {
  id: number;
  invoiceRef: string;
  customer: { id: number; firstName: string; lastName: string; nic: string; mobileNumber: string; address: string };
  itemLabel: string;
  itemType: string;
  purchaseChannel: string;
  paymentType: string;
  finalSellingPrice: number;
  totalReceivable: number;
  totalReceipted: number;
  outstanding: number;
  receiptCount: number;
  purchasedAt: string;
};

type ReceiptRow = {
  id: number;
  receiptNo: string;
  createdAt: string;
  amount: number;
  paymentMethod: "CASH" | "CHEQUE";
  chequeNo?: string | null;
  chequeBank?: string | null;
  chequeStatus?: "PENDING" | "CLEARED" | "BOUNCED" | null;
  isVoided: boolean;
  description?: string | null;
  account: { id: number; name: string; code: string };
  purchase: { id: number; invoiceGroupCode?: string | null; customer: { firstName: string; lastName: string; nic: string } };
};

const EMPTY_RECEIPT_FORM = {
  purchaseId: 0,
  accountId: 0,
  amount: 0,
  paymentMethod: "CASH" as "CASH" | "CHEQUE",
  chequeNo: "",
  chequeBank: "",
  chequeDate: "",
  description: "",
};

function formatRs(v: number) {
  return `Rs. ${v.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB");
}

export default function ReceiptsPage() {
  const { token } = useAdmin();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);
  const [receipts, setReceipts] = useState<ReceiptRow[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);
  const [loadingReceipts, setLoadingReceipts] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [panelInvoice, setPanelInvoice] = useState<InvoiceRow | null>(null);
  const [form, setForm] = useState(EMPTY_RECEIPT_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const lastAccountRef = useRef<number>(0);

  const [printData, setPrintData] = useState<{ receiptId: number } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [printReceipt, setPrintReceipt] = useState<any>(null);

  const [editingReceipt, setEditingReceipt] = useState<ReceiptRow | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_RECEIPT_FORM);
  const [editError, setEditError] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  async function fetchAccounts() {
    const res = await fetch(`${API_URL}/api/pos/accounts/chart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setAccounts((d.data ?? []).filter((a: Account & { isActive: boolean }) => a.isActive));
  }

  const fetchInvoices = useCallback(async () => {
    setLoadingInvoices(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("showAll", showAll ? "true" : "false");
    if (fromDate) params.set("from", fromDate);
    if (toDate) params.set("to", toDate);
    params.set("limit", "200");
    const res = await fetch(`${API_URL}/api/pos/accounts/receipts/invoices?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setInvoices(d.data ?? []);
    setLoadingInvoices(false);
  }, [token, search, showAll, fromDate, toDate]);

  async function fetchReceipts() {
    setLoadingReceipts(true);
    const res = await fetch(`${API_URL}/api/pos/accounts/receipts?limit=100`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setReceipts(d.data?.data ?? []);
    setLoadingReceipts(false);
  }

  useEffect(() => {
    if (token) {
      fetchAccounts();
      fetchReceipts();
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchInvoices();
  }, [token, fetchInvoices]);

  function openPanel(inv: InvoiceRow) {
    setPanelInvoice(inv);
    setForm({ ...EMPTY_RECEIPT_FORM, purchaseId: inv.id, amount: inv.outstanding, accountId: lastAccountRef.current });
    setFormError("");
  }

  async function submitReceipt() {
    if (!form.accountId) { setFormError("Please select an account"); return; }
    if (!form.amount || form.amount <= 0) { setFormError("Enter a valid amount"); return; }
    if (form.paymentMethod === "CHEQUE" && !form.chequeNo.trim()) { setFormError("Cheque number is required"); return; }
    setSaving(true);
    setFormError("");
    try {
      const body: Record<string, unknown> = {
        purchaseId: form.purchaseId,
        accountId: form.accountId,
        amount: form.amount,
        paymentMethod: form.paymentMethod,
        description: form.description || undefined,
      };
      if (form.paymentMethod === "CHEQUE") {
        body.chequeNo = form.chequeNo;
        body.chequeBank = form.chequeBank || undefined;
        body.chequeDate = form.chequeDate || undefined;
      }
      const res = await fetch(`${API_URL}/api/pos/accounts/receipts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const d = await res.json();
      if (!res.ok) { setFormError(d.message ?? "Failed to create receipt"); return; }
      lastAccountRef.current = form.accountId;
      setPanelInvoice(null);
      fetchInvoices();
      fetchReceipts();
      setPrintData({ receiptId: d.data.id });
      fetchReceiptForPrint(d.data.id);
    } catch {
      setFormError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function fetchReceiptForPrint(id: number) {
    const res = await fetch(`${API_URL}/api/pos/accounts/receipts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setPrintReceipt(d.data);
  }

  async function handleVoid(id: number) {
    if (!confirm("Void this receipt? This will reverse the ledger entry.")) return;
    await fetch(`${API_URL}/api/pos/accounts/receipts/${id}/void`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReceipts();
    fetchInvoices();
  }

  async function handleBounce(id: number) {
    if (!confirm("Mark this cheque as bounced? The ledger entry will be reversed.")) return;
    await fetch(`${API_URL}/api/pos/accounts/receipts/${id}/bounce`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReceipts();
    fetchInvoices();
  }

  async function handleClearCheque(id: number) {
    await fetch(`${API_URL}/api/pos/accounts/receipts/${id}/clear`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReceipts();
  }

  function openEdit(r: ReceiptRow) {
    setEditingReceipt(r);
    setEditForm({
      purchaseId: r.purchase.id,
      accountId: r.account.id,
      amount: r.amount,
      paymentMethod: r.paymentMethod,
      chequeNo: r.chequeNo ?? "",
      chequeBank: r.chequeBank ?? "",
      chequeDate: "",
      description: r.description ?? "",
    });
    setEditError("");
  }

  async function submitEdit() {
    if (!editingReceipt) return;
    setEditSaving(true);
    setEditError("");
    try {
      const body: Record<string, unknown> = {
        accountId: editForm.accountId,
        amount: editForm.amount,
        paymentMethod: editForm.paymentMethod,
        description: editForm.description || undefined,
      };
      if (editForm.paymentMethod === "CHEQUE") {
        body.chequeNo = editForm.chequeNo;
        body.chequeBank = editForm.chequeBank || undefined;
      }
      const res = await fetch(`${API_URL}/api/pos/accounts/receipts/${editingReceipt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = await res.json();
        setEditError(d.message ?? "Failed to update");
        return;
      }
      setEditingReceipt(null);
      fetchReceipts();
      fetchInvoices();
    } catch {
      setEditError("Network error");
    } finally {
      setEditSaving(false);
    }
  }

  function chequeStatusBadge(r: ReceiptRow) {
    if (r.paymentMethod !== "CHEQUE") return null;
    if (r.chequeStatus === "CLEARED") return <span className="badge badge-active">Cheque Cleared</span>;
    if (r.chequeStatus === "BOUNCED") return <span className="badge" style={{ background: "var(--danger-bg)", color: "var(--danger)" }}>Cheque Bounced</span>;
    return <span className="badge badge-pending">Cheque Pending</span>;
  }

  const outstandingCount = invoices.filter((i) => i.outstanding > 0).length;
  const totalOutstanding = invoices.filter((i) => i.outstanding > 0).reduce((s, i) => s + i.outstanding, 0);

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <span className="page-title-icon"><IconAccounts /></span>
          <div>
            <h1 className="page-title">Receipts</h1>
            <p className="page-subtitle">Record cash received from customers</p>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="bm-stats-grid" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))" }}>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-label">Outstanding Invoices</div>
          <div className="bm-stat-value">{outstandingCount}</div>
          <div className="bm-stat-sub">invoices need payment</div>
        </div>
        <div className="bm-stat-card">
          <div className="bm-stat-label">Total Outstanding</div>
          <div className="bm-stat-value" style={{ fontSize: "1.15rem", color: "var(--warning)" }}>{formatRs(totalOutstanding)}</div>
          <div className="bm-stat-sub">across all invoices</div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bm-filter-card">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 140px auto auto", gap: "0.75rem", alignItems: "end" }}>
          <div className="bm-field-group" style={{ marginBottom: 0 }}>
            <label className="users-label">Search</label>
            <input
              className="bm-input"
              placeholder="Customer name or NIC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="bm-field-group" style={{ marginBottom: 0 }}>
            <label className="users-label">From Date</label>
            <input type="date" className="bm-input" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="bm-field-group" style={{ marginBottom: 0 }}>
            <label className="users-label">To Date</label>
            <input type="date" className="bm-input" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <div style={{ paddingBottom: 2 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: "0.82rem", color: "var(--text-soft)", fontWeight: 500, whiteSpace: "nowrap" }}>
              <input
                type="checkbox"
                checked={showAll}
                onChange={(e) => setShowAll(e.target.checked)}
                style={{ accentColor: "var(--accent)" }}
              />
              Show all invoices
            </label>
          </div>
        </div>
      </div>

      {/* Invoice queue */}
      <div className="bm-table-card">
        <div className="panel-header">
          <div className="panel-title-row">
            <span style={{ color: "var(--accent)" }}><IconAccounts /></span>
            <h3>{showAll ? "All Invoices" : "Outstanding Invoices"}</h3>
          </div>
        </div>
        {loadingInvoices ? (
          <div className="bm-table-empty">Loading invoices...</div>
        ) : invoices.length === 0 ? (
          <div className="bm-table-empty">No outstanding invoices — all caught up!</div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice Ref</th>
                  <th>Customer</th>
                  <th>Item</th>
                  <th style={{ textAlign: "right" }}>Total Amount</th>
                  <th style={{ textAlign: "right" }}>Receipted</th>
                  <th style={{ textAlign: "right" }}>Outstanding</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>
                      <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "var(--accent)" }}>
                        {inv.invoiceRef}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inv.customer.firstName} {inv.customer.lastName}</div>
                      <div className="td-muted" style={{ fontSize: "0.78rem" }}>{inv.customer.nic}</div>
                    </td>
                    <td className="td-muted">{inv.itemLabel}</td>
                    <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{formatRs(inv.totalReceivable)}</td>
                    <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", color: "var(--success)" }}>{formatRs(inv.totalReceipted)}</td>
                    <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      <span style={{ color: inv.outstanding > 0 ? "var(--warning)" : "var(--success)", fontWeight: 600 }}>
                        {formatRs(inv.outstanding)}
                      </span>
                    </td>
                    <td className="td-muted">{formatDate(inv.purchasedAt)}</td>
                    <td>
                      <button
                        className="btn-accent"
                        style={{ display: "flex", alignItems: "center", gap: 4, padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                        onClick={() => openPanel(inv)}
                      >
                        <IconPlus /> Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Receipt history — collapsible */}
      <div className="bm-table-card">
        <button
          type="button"
          className="panel-header"
          onClick={() => setHistoryOpen(!historyOpen)}
          style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <div className="panel-title-row" style={{ flex: 1 }}>
            <span style={{ color: "var(--accent)" }}><IconAccounts /></span>
            <h3>Receipt History</h3>
          </div>
          <span style={{ color: "var(--text-xsoft)", fontSize: "0.8rem" }}>{historyOpen ? "▲ hide" : "▼ show"}</span>
        </button>
        {historyOpen && (
          loadingReceipts ? (
            <div className="bm-table-empty">Loading receipts...</div>
          ) : (
            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Receipt No</th>
                    <th>Date</th>
                    <th>Invoice Ref</th>
                    <th>Customer</th>
                    <th style={{ textAlign: "right" }}>Amount</th>
                    <th>Method</th>
                    <th>Account</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receipts.length === 0 ? (
                    <tr><td colSpan={9} className="bm-table-empty">No receipts yet</td></tr>
                  ) : receipts.map((r) => (
                    <tr key={r.id} style={{ opacity: r.isVoided ? 0.5 : 1 }}>
                      <td>
                        <span style={{ fontFamily: "monospace", fontSize: "0.82rem", fontWeight: 700, color: "var(--accent)" }}>
                          {r.receiptNo}
                        </span>
                      </td>
                      <td className="td-muted">{formatDate(r.createdAt)}</td>
                      <td className="td-muted">{r.purchase.invoiceGroupCode ?? `INV-${String(r.purchase.id).padStart(5, "0")}`}</td>
                      <td>{r.purchase.customer.firstName} {r.purchase.customer.lastName}</td>
                      <td style={{ textAlign: "right", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{formatRs(r.amount)}</td>
                      <td>
                        <span className={`badge ${r.paymentMethod === "CHEQUE" ? "badge-review" : "badge-active"}`}>
                          {r.paymentMethod}
                        </span>
                      </td>
                      <td className="td-muted">{r.account.name}</td>
                      <td>
                        {r.isVoided
                          ? <span className="badge" style={{ background: "var(--danger-bg)", color: "var(--danger)" }}>Voided</span>
                          : chequeStatusBadge(r) ?? <span className="badge badge-active">Active</span>
                        }
                      </td>
                      <td>
                        <div className="bm-row-actions">
                          <button
                            className="bm-action-btn"
                            style={{ fontSize: "0.9rem" }}
                            onClick={() => { fetchReceiptForPrint(r.id); setPrintData({ receiptId: r.id }); }}
                            title="Print"
                          >🖨</button>
                          {!r.isVoided && (
                            <button className="bm-action-btn bm-edit-btn" onClick={() => openEdit(r)} title="Edit"><IconEdit /></button>
                          )}
                          {!r.isVoided && r.paymentMethod === "CHEQUE" && r.chequeStatus === "PENDING" && (
                            <>
                              <button className="bm-action-btn" style={{ borderColor: "var(--success)", color: "var(--success)" }} onClick={() => handleClearCheque(r.id)}>Cleared</button>
                              <button className="bm-action-btn" style={{ borderColor: "var(--danger)", color: "var(--danger)" }} onClick={() => handleBounce(r.id)}>Bounced</button>
                            </>
                          )}
                          {!r.isVoided && (
                            <button className="bm-action-btn" style={{ borderColor: "var(--danger)", color: "var(--danger)" }} onClick={() => handleVoid(r.id)}>Void</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Create receipt panel */}
      {panelInvoice && (
        <div className="bm-modal-backdrop" onClick={() => setPanelInvoice(null)}>
          <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close" onClick={() => setPanelInvoice(null)}>✕</button>
            <h2 className="bm-modal-title">Create Receipt</h2>
            <div className="bm-modal-body">
              {/* Invoice info block */}
              <div style={{ padding: "0.75rem 1rem", background: "var(--accent-bg)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "var(--radius-sm)", marginBottom: 16 }}>
                <div style={{ fontWeight: 700 }}>{panelInvoice.customer.firstName} {panelInvoice.customer.lastName}</div>
                <div className="td-muted" style={{ fontSize: "0.8rem" }}>{panelInvoice.invoiceRef} · {panelInvoice.itemLabel}</div>
                <div style={{ marginTop: 6, fontSize: "0.85rem" }}>
                  Outstanding: <strong style={{ color: "var(--warning)" }}>{formatRs(panelInvoice.outstanding)}</strong>
                </div>
              </div>

              {formError && <div className="bm-alert bm-alert-error" style={{ marginBottom: 12 }}>{formError}</div>}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div className="bm-field-group">
                  <label className="users-label">Amount Received (Rs.) *</label>
                  <input
                    className="bm-input"
                    type="number"
                    min={0}
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  />
                </div>

                <div className="bm-field-group">
                  <label className="users-label">Payment Method *</label>
                  <div style={{ display: "flex", gap: 20 }}>
                    {(["CASH", "CHEQUE"] as const).map((m) => (
                      <label key={m} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>
                        <input type="radio" checked={form.paymentMethod === m} onChange={() => setForm({ ...form, paymentMethod: m })} style={{ accentColor: "var(--accent)" }} />
                        {m}
                      </label>
                    ))}
                  </div>
                </div>

                {form.paymentMethod === "CHEQUE" && (
                  <>
                    <div className="bm-field-group">
                      <label className="users-label">Cheque No *</label>
                      <input className="bm-input" value={form.chequeNo} onChange={(e) => setForm({ ...form, chequeNo: e.target.value })} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <div className="bm-field-group">
                        <label className="users-label">Bank</label>
                        <input className="bm-input" value={form.chequeBank} onChange={(e) => setForm({ ...form, chequeBank: e.target.value })} placeholder="e.g. HNB" />
                      </div>
                      <div className="bm-field-group">
                        <label className="users-label">Cheque Date</label>
                        <input className="bm-input" type="date" value={form.chequeDate} onChange={(e) => setForm({ ...form, chequeDate: e.target.value })} />
                      </div>
                    </div>
                  </>
                )}

                <div className="bm-field-group">
                  <label className="users-label">Deposit to Account *</label>
                  <select
                    className="bm-select"
                    value={form.accountId}
                    onChange={(e) => setForm({ ...form, accountId: Number(e.target.value) })}
                  >
                    <option value={0}>— Select account —</option>
                    {accounts.map((a) => (
                      <option key={a.id} value={a.id}>{a.name} ({a.code})</option>
                    ))}
                  </select>
                </div>

                <div className="bm-field-group">
                  <label className="users-label">Description (optional)</label>
                  <input className="bm-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="bm-modal-actions">
              <button className="btn-outline" onClick={() => setPanelInvoice(null)}>Cancel</button>
              <button className="btn-accent" onClick={submitReceipt} disabled={saving}>
                {saving ? "Saving..." : "Create Receipt"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit receipt modal */}
      {editingReceipt && (
        <div className="bm-modal-backdrop" onClick={() => setEditingReceipt(null)}>
          <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close" onClick={() => setEditingReceipt(null)}>✕</button>
            <h2 className="bm-modal-title">Edit Receipt — {editingReceipt.receiptNo}</h2>
            <div className="bm-modal-body">
              {editError && <div className="bm-alert bm-alert-error" style={{ marginBottom: 12 }}>{editError}</div>}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div className="bm-field-group">
                  <label className="users-label">Amount (Rs.) *</label>
                  <input className="bm-input" type="number" min={0} value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: Number(e.target.value) })} />
                </div>
                <div className="bm-field-group">
                  <label className="users-label">Payment Method</label>
                  <div style={{ display: "flex", gap: 20 }}>
                    {(["CASH", "CHEQUE"] as const).map((m) => (
                      <label key={m} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}>
                        <input type="radio" checked={editForm.paymentMethod === m} onChange={() => setEditForm({ ...editForm, paymentMethod: m })} style={{ accentColor: "var(--accent)" }} />
                        {m}
                      </label>
                    ))}
                  </div>
                </div>
                {editForm.paymentMethod === "CHEQUE" && (
                  <div className="bm-field-group">
                    <label className="users-label">Cheque No</label>
                    <input className="bm-input" value={editForm.chequeNo} onChange={(e) => setEditForm({ ...editForm, chequeNo: e.target.value })} />
                  </div>
                )}
                <div className="bm-field-group">
                  <label className="users-label">Account</label>
                  <select className="bm-select" value={editForm.accountId} onChange={(e) => setEditForm({ ...editForm, accountId: Number(e.target.value) })}>
                    <option value={0}>— Select —</option>
                    {accounts.map((a) => <option key={a.id} value={a.id}>{a.name} ({a.code})</option>)}
                  </select>
                </div>
                <div className="bm-field-group">
                  <label className="users-label">Description</label>
                  <input className="bm-input" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="bm-modal-actions">
              <button className="btn-outline" onClick={() => setEditingReceipt(null)}>Cancel</button>
              <button className="btn-accent" onClick={submitEdit} disabled={editSaving}>
                {editSaving ? "Saving..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Print receipt modal */}
      {printData && printReceipt && (
        <div className="bm-modal-backdrop print-hide" onClick={() => { setPrintData(null); setPrintReceipt(null); }}>
          <div className="bm-modal bm-modal-lg invoice-print-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close print-hide" onClick={() => { setPrintData(null); setPrintReceipt(null); }}>✕</button>
            <h2 className="bm-modal-title print-hide">Receipt — {printReceipt.receiptNo}</h2>
            <div className="bm-modal-body">
              <div style={{ padding: "1.25rem", border: "1px solid var(--panel-border)", borderRadius: "var(--radius-md)", background: "var(--bg)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text)" }}>JL RACING</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>Importers, Exporters &amp; Dealers Of Motorcycles</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>No:154, Puttalam Road, Kurunegala, Sri Lanka</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>Tel: 071 791 0091</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--accent)" }}>RECEIPT</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-soft)" }}>Receipt No: <strong style={{ color: "var(--text)" }}>{printReceipt.receiptNo}</strong></div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-soft)" }}>Date: {formatDate(printReceipt.createdAt)}</div>
                  </div>
                </div>
                <hr style={{ margin: "12px 0", borderColor: "var(--panel-border)" }} />
                <div style={{ fontSize: "0.85rem", marginBottom: 12 }}>
                  <div><strong>Received From:</strong> {printReceipt.purchase?.customer?.firstName} {printReceipt.purchase?.customer?.lastName}</div>
                  <div style={{ color: "var(--text-soft)" }}>NIC: {printReceipt.purchase?.customer?.nic}</div>
                  <div style={{ color: "var(--text-soft)" }}>Mobile: {printReceipt.purchase?.customer?.mobileNumber}</div>
                </div>
                <hr style={{ margin: "12px 0", borderColor: "var(--panel-border)" }} />
                <table className="data-table" style={{ width: "100%" }}>
                  <tbody>
                    <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Invoice Reference</td><td style={{ textAlign: "right" }}>{printReceipt.purchase?.invoiceGroupCode ?? `INV-${String(printReceipt.purchase?.id ?? "").padStart(5, "0")}`}</td></tr>
                    <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Amount Received</td><td style={{ textAlign: "right", fontWeight: 700, color: "var(--accent)" }}>{formatRs(printReceipt.amount)}</td></tr>
                    <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Payment Method</td><td style={{ textAlign: "right" }}>{printReceipt.paymentMethod}</td></tr>
                    {printReceipt.paymentMethod === "CHEQUE" && (
                      <>
                        <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Cheque No</td><td style={{ textAlign: "right" }}>{printReceipt.chequeNo}</td></tr>
                        {printReceipt.chequeBank && <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Cheque Bank</td><td style={{ textAlign: "right" }}>{printReceipt.chequeBank}</td></tr>}
                      </>
                    )}
                    <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Deposited to Account</td><td style={{ textAlign: "right" }}>{printReceipt.account?.name}</td></tr>
                    {printReceipt.description && <tr><td style={{ color: "var(--text-soft)", fontSize: "0.85rem" }}>Notes</td><td style={{ textAlign: "right" }}>{printReceipt.description}</td></tr>}
                  </tbody>
                </table>
                <hr style={{ margin: "16px 0", borderColor: "var(--panel-border)" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
                  <div style={{ textAlign: "center" }}><div style={{ borderTop: "1px solid #333", width: 120, marginBottom: 4 }} /><small style={{ color: "var(--text-soft)" }}>Customer Signature</small></div>
                  <div style={{ textAlign: "center" }}><div style={{ borderTop: "1px solid #333", width: 120, marginBottom: 4 }} /><small style={{ color: "var(--text-soft)" }}>Authorised Signature</small></div>
                </div>
              </div>
            </div>
            <div className="bm-modal-actions print-hide">
              <button className="btn-outline print-hide" onClick={() => { setPrintData(null); setPrintReceipt(null); }}>Close</button>
              <button className="btn-accent print-hide" onClick={() => window.print()}>🖨 Print Receipt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
