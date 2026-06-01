"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "../../components/AdminContext";
import { API_URL } from "../../lib/constants";
import { IconInvoice, IconUsers } from "../../lib/icons";

type InstallmentPayment = {
  id: number;
  amount: number;
  penaltyAmount: number;
  note?: string | null;
  paidAt: string;
};

type Installment = {
  id: number;
  installmentNo: number;
  dueDate: string;
  dueAmount: number;
  paidAmount: number;
  isPartial: boolean;
  penaltyRate: number;
  penaltyAmount: number;
  status: "PENDING" | "PARTIAL" | "PAID";
  settledAt?: string | null;
  payments?: InstallmentPayment[];
};

type Purchase = {
  id: number;
  purchasedAt: string;
  itemType: "BIKE" | "INVENTORY";
  purchaseMode?: "SINGLE" | "BULK";
  invoiceGroupCode?: string | null;
  quantity: number;
  currentSellingPrice?: number | null;
  finalSellingPrice: number;
  paymentType?: "DIRECT" | "DOWNPAYMENT";
  purchaseChannel?: "PERSONAL" | "LEASING";
  leasingCompany?: { id: number; name: string } | null;
  leasingDownPaymentAmount?: number;
  leasingFinancedAmount?: number;
  downPaymentAmount?: number;
  remainingAmount?: number;
  settlementStatus?: "SETTLED" | "TO_SETTLE";
  hasRegistrationFee?: boolean;
  registrationFeeAmount?: number;
  interestRate?: number | null;
  installmentMonths?: number | null;
  monthlyInstallmentAmount?: number | null;
  totalWithInterest?: number | null;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    nic: string;
    mobileNumber: string;
    address: string;
    province: string;
    district: string;
  };
  bike?: {
    id: number;
    displayId: string;
    brand: string;
    model: string;
    colour: string;
    year?: number | null;
    engineCapacityCc?: number | null;
    mileage?: number | null;
    condition: string;
    registrationType: string;
    fileNo?: string | null;
    registerNo?: string | null;
    chassisNo?: string | null;
    engineNo?: string | null;
    description?: string | null;
  } | null;
  inventory?: {
    id: number;
    displayId: string;
    name: string;
    brand: string;
    category: string;
    supplier?: string | null;
    description?: string | null;
  } | null;
};

type InvoiceRow = {
  key: string;
  invoiceLabel: string;
  purchasedAt: string;
  customer: Purchase["customer"];
  entries: Purchase[];
  quantity: number;
  finalSellingPrice: number;
  currentSellingPrice: number;
  downPaymentAmount: number;
  registrationFeeTotal: number;
  remainingAmount: number;
  settlementStatus: "SETTLED" | "TO_SETTLE";
  paymentTypeText: string;
  purchaseModeText: "Single" | "Bulk";
  itemTitle: string;
  itemSubtitle: string;
};

type InvoiceTerm = {
  id: number;
  text: string;
  sortOrder: number;
  isActive: boolean;
};

type InvoiceAccount = {
  id: number;
  accountHolder: string;
  accountNumber: string;
  bankName: string;
  branchName?: string | null;
  sortOrder: number;
  isActive: boolean;
};

function getActiveInvoiceTerms(terms: InvoiceTerm[]) {
  return terms
    .filter((term) => term.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
    .map((term) => term.text);
}

function getActiveInvoiceAccounts(accounts: InvoiceAccount[]) {
  return accounts
    .filter((account) => account.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

const HTML_ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
};

function escapeInvoiceHtml(value: string | number | null | undefined) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ENTITY_MAP[char] ?? char);
}

export default function InvoicesPage() {
  const { token } = useAdmin();
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(null);
  const [invoiceInstallments, setInvoiceInstallments] = useState<Installment[]>([]);

  const base = `${API_URL}/api/pos/user-management`;
  const auth = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const invoicesQuery = useQuery({
    queryKey: ["pos", "invoices", token],
    enabled: Boolean(token),
    queryFn: async (): Promise<Purchase[]> => {
      const response = await fetch(`${base}/purchases?page=1&limit=500`, { headers: auth, cache: "no-store" });
      const payload = await readApiData<{ purchases?: Purchase[] }>(response, "Failed to load invoices");
      return payload.purchases ?? [];
    },
  });

  const invoiceTermsQuery = useQuery({
    queryKey: ["pos", "invoice-terms", token],
    enabled: Boolean(token),
    staleTime: 0,
    refetchOnMount: "always",
    queryFn: async (): Promise<InvoiceTerm[]> => {
      const response = await fetch(`${base}/invoice-terms`, { headers: auth, cache: "no-store" });
      const payload = await response.json() as { data?: { terms?: InvoiceTerm[] }; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load invoice terms");
      setInvoiceTerms(payload.data?.terms ?? []);
    } catch {
      setInvoiceTerms([]);
    }
  }, [auth, base, token]);

  useEffect(() => {
    void loadInvoiceTerms();
  }, [loadInvoiceTerms]);

  useEffect(() => {
    if (!selectedInvoice) { setInvoiceInstallments([]); return; }
    const entry = selectedInvoice.entries.find((e) => (e.installmentMonths ?? 0) > 0);
    if (!entry) { setInvoiceInstallments([]); return; }
    void (async () => {
      try {
        const resp = await fetch(`${base}/${entry.customer.id}/purchases/${entry.id}/installments`, { headers: auth, cache: "no-store" });
        const json = await resp.json() as { data?: { installments?: Installment[] } };
        setInvoiceInstallments(json.data?.installments ?? []);
      } catch { setInvoiceInstallments([]); }
    })();
  }, [auth, base, selectedInvoice]);

  const getPurchaseItemMeta = useCallback((entry: Purchase) => {
    if (entry.itemType === "BIKE" && entry.bike) {
      return {
        title: `${entry.bike.brand} ${entry.bike.model}`,
        subtitle: `${entry.bike.displayId} • ${entry.bike.colour}`,
      };
    }
    if (entry.inventory) {
      return {
        title: entry.inventory.name,
        subtitle: `${entry.inventory.displayId} • ${entry.inventory.brand}`,
      };
    }
    return { title: "Unknown item", subtitle: "-" };
  }, []);

  const isDownPaymentEntry = useCallback((entry: Purchase) => {
    if (entry.purchaseChannel === "LEASING") return false;
    if (entry.paymentType === "DOWNPAYMENT") return true;
    const downPayment = entry.downPaymentAmount ?? 0;
    const remaining = entry.remainingAmount ?? 0;
    if (remaining > 0) return true;
    if (downPayment > 0 && downPayment < entry.finalSellingPrice) return true;
    return false;
  }, []);

  const getPaymentLabel = useCallback((entry: Purchase) => {
    if (entry.purchaseChannel === "LEASING") {
      return entry.leasingCompany?.name ? `Leasing (${entry.leasingCompany.name})` : "Leasing";
    }
    return isDownPaymentEntry(entry) ? "Downpayment" : "Direct";
  }, [isDownPaymentEntry]);

  const invoiceRows = useMemo(() => {
    const grouped = new Map<string, Purchase[]>();

    const heuristicCounts = new Map<string, number>();
    invoices.forEach((entry: Purchase) => {
      if (entry.invoiceGroupCode?.trim()) return;
      if (entry.itemType !== "BIKE") return;
      const secondBucket = Math.floor(new Date(entry.purchasedAt).getTime() / 1000);
      const key = `${entry.customer.id}:${secondBucket}`;
      heuristicCounts.set(key, (heuristicCounts.get(key) ?? 0) + 1);
    });

    invoices.forEach((entry: Purchase) => {
      const groupCode = entry.invoiceGroupCode?.trim();
      const secondBucket = Math.floor(new Date(entry.purchasedAt).getTime() / 1000);
      const heuristicKey = `${entry.customer.id}:${secondBucket}`;
      const isHeuristicBulk = !groupCode && entry.itemType === "BIKE" && (heuristicCounts.get(heuristicKey) ?? 0) > 1;
      const key = groupCode
        ? `group:${entry.customer.id}:${groupCode}`
        : isHeuristicBulk
          ? `heuristic:${heuristicKey}`
          : `single:${entry.id}`;
      const existing = grouped.get(key);
      if (existing) existing.push(entry);
      else grouped.set(key, [entry]);
    });

    const rows: InvoiceRow[] = Array.from(grouped.entries()).map(([key, entries]) => {
      const sorted = [...entries].sort((a, b) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt));
      const representative = sorted[0];
      const explicitGroupCode = representative.invoiceGroupCode?.trim();
      const isBulk = sorted.length > 1 || representative.purchaseMode === "BULK" || !!explicitGroupCode;

      const quantity = sorted.reduce((sum, entry) => sum + entry.quantity, 0);
      const finalSellingPrice = sorted.reduce((sum, entry) => sum + entry.finalSellingPrice, 0);
      const currentSellingPrice = sorted.reduce((sum, entry) => sum + (entry.currentSellingPrice ?? 0), 0);
      const downPaymentAmount = sorted.reduce((sum, entry) => {
        const explicit = entry.downPaymentAmount ?? 0;
        if (explicit > 0) return sum + explicit;
        if (!isDownPaymentEntry(entry)) return sum;
        return sum + Math.max(0, entry.finalSellingPrice - (entry.remainingAmount ?? 0));
      }, 0);
      const registrationFeeTotal = sorted.reduce((sum, entry) => {
        if (!entry.hasRegistrationFee) return sum;
        return sum + (entry.registrationFeeAmount ?? 0);
      }, 0);
      const remainingAmount = Math.max(0, Math.round(sorted.reduce((sum, entry) => sum + (entry.remainingAmount ?? 0), 0) * 100) / 100);
      const settlementStatus: "SETTLED" | "TO_SETTLE" = remainingAmount > 0 || sorted.some((entry) => entry.settlementStatus === "TO_SETTLE")
        ? "TO_SETTLE"
        : "SETTLED";
      const paymentTypeText = getPaymentLabel(representative);

      const itemTitle = isBulk ? `Bulk Purchase (${sorted.length} bike entries)` : getPurchaseItemMeta(representative).title;
      const itemSubtitle = isBulk
        ? sorted.slice(0, 2).map((entry) => getPurchaseItemMeta(entry).title).join(" + ")
        : getPurchaseItemMeta(representative).subtitle;

      const invoiceLabel = explicitGroupCode
        ? explicitGroupCode
        : isBulk
          ? `BULK-${String(Math.min(...sorted.map((entry) => entry.id))).padStart(5, "0")}`
          : `INV-${String(representative.id).padStart(5, "0")}`;

      return {
        key,
        invoiceLabel,
        purchasedAt: representative.purchasedAt,
        customer: representative.customer,
        entries: sorted,
        quantity,
        finalSellingPrice,
        currentSellingPrice,
        downPaymentAmount,
        registrationFeeTotal,
        remainingAmount,
        settlementStatus,
        paymentTypeText,
        purchaseModeText: isBulk ? "Bulk" : "Single",
        itemTitle,
        itemSubtitle,
      };
    });

    rows.sort((a, b) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt));
    return rows;
  }, [getPaymentLabel, getPurchaseItemMeta, invoices, isDownPaymentEntry]);

  const filteredInvoiceRows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return invoiceRows;

    return invoiceRows.filter((invoice: InvoiceRow) => {
      const searchableValues = [
        invoice.invoiceLabel,
        invoice.customer.firstName,
        invoice.customer.lastName,
        invoice.customer.nic,
        invoice.customer.mobileNumber,
        invoice.customer.address,
        invoice.customer.province,
        invoice.customer.district,
        invoice.itemTitle,
        invoice.itemSubtitle,
        invoice.paymentTypeText,
        invoice.purchaseModeText,
        ...invoice.entries.flatMap((entry) => [
          String(entry.id),
          entry.customer.nic,
          entry.customer.mobileNumber,
          entry.bike?.displayId,
          entry.bike?.brand,
          entry.bike?.model,
          entry.inventory?.displayId,
          entry.inventory?.name,
          entry.inventory?.brand,
        ]),
      ];

      return searchableValues.some((value) => value?.toLowerCase().includes(needle));
    });
  }, [invoiceRows, search]);

  const totalInvoiceAmount = useMemo(
    () => invoiceRows.reduce((sum, invoice) => sum + invoice.finalSellingPrice, 0),
    [invoiceRows]
  );

  const activeInvoiceTerms = useMemo((): string[] => {
    return getActiveInvoiceTerms(invoiceTerms);
  }, [invoiceTerms]);

  const activeInvoiceAccounts = useMemo((): InvoiceAccount[] => {
    return getActiveInvoiceAccounts(invoiceAccounts);
  }, [invoiceAccounts]);

  const getInvoiceGrandTotal = (invoice: InvoiceRow) => {
    const effectiveTotal = invoice.entries.reduce((sum, e) => sum + (e.totalWithInterest ?? e.finalSellingPrice), 0);
    return effectiveTotal + invoice.registrationFeeTotal;
  };

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <div className="page-title-icon"><IconInvoice /></div>
          <div>
            <h2 className="page-title">Invoice Management</h2>
            <p className="page-subtitle">Purchase invoices with complete customer and item details.</p>
          </div>
        </div>
      </div>

      {visibleError && <div className="bm-alert bm-alert-error">{visibleError}</div>}

      <div className="bm-stats-grid" style={{ marginBottom: "1rem" }}>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconInvoice /></span><span className="bm-stat-label">Total Invoices</span></div>
          <strong className="bm-stat-value">{invoiceRows.length}</strong>
          <span className="bm-stat-sub">Completed purchase invoices</span>
        </div>
        <div className="bm-stat-card">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconUsers /></span><span className="bm-stat-label">Total Amount</span></div>
          <strong className="bm-stat-value">Rs. {totalInvoiceAmount.toLocaleString()}</strong>
          <span className="bm-stat-sub">Sum of final selling prices</span>
        </div>
      </div>

      <div className="bm-table-card">
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--panel-border)", display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            className="bm-input"
            style={{ maxWidth: 420 }}
            placeholder="Search by customer, NIC, item ID, bike brand/model, or product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="btn-outline" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Final Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan={7} className="bm-table-empty">Loading invoices...</td></tr>}
              {!loading && invoiceRows.length === 0 && <tr><td colSpan={7} className="bm-table-empty">No invoices found.</td></tr>}
              {!loading && invoiceRows.map((invoice) => (
                <tr key={invoice.key}>
                  <td>{invoice.invoiceLabel}</td>
                  <td>{new Date(invoice.purchasedAt).toLocaleString()}</td>
                  <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                  <td>
                    <div className="users-order-title">{invoice.itemTitle}</div>
                    <span className="users-order-item-meta">{invoice.itemSubtitle}</span>
                    <span className="users-muted" style={{ display: "block" }}>{invoice.purchaseModeText} • {invoice.paymentTypeText}</span>
                  </td>
                  <td>Rs. {invoice.finalSellingPrice.toLocaleString()}</td>
                  <td>
                    {(invoice.remainingAmount > 0 || invoice.settlementStatus === "SETTLED") && (
                      <span style={{
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        color: invoice.settlementStatus === "SETTLED" ? "var(--green)" : "var(--amber, #f59e0b)",
                      }}>
                        {invoice.settlementStatus === "SETTLED" ? "Settled" : "To Settle"}
                      </span>
                    )}
                  </td>
                  <td>
                    <button type="button" className="btn-outline" onClick={() => setSelectedInvoice(invoice)}>View Invoice</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInvoice && (
        <div className="bm-modal-backdrop" onClick={() => setSelectedInvoice(null)}>
          <div className="bm-modal bm-modal-lg invoice-template-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="bm-modal-close" onClick={() => setSelectedInvoice(null)}>x</button>
            <div className="invoice-paper">
              <header className="invoice-paper-header">
                <img src="/landing/logoq.png" alt="JL Racing" className="invoice-brand-logo" />
                <p className="invoice-brand-line">Importers, Exporters & Dealers Of Motorcycles, Motor Vehicles, Machineries & Other</p>
                <p className="invoice-brand-line">Motorized Equipments With Spare Parts.</p>
                <p className="invoice-brand-address">No:154, Puttalam Road, Kurunegala, Sri Lanka, Kurunegala</p>
              </header>

              <section className="invoice-paper-body">
                <div className="invoice-meta-row">
                  <strong>Invoice No: #{String(Math.min(...selectedInvoice.entries.map((entry) => entry.id))).padStart(4, "0")}</strong>
                  <strong>Date: {new Date(selectedInvoice.purchasedAt).toLocaleDateString("en-GB")}</strong>
                </div>

                <div className="invoice-customer-block">
                  <strong>{selectedInvoice.customer.firstName} {selectedInvoice.customer.lastName}</strong>
                  <span>{selectedInvoice.customer.address}</span>
                  <span>{selectedInvoice.customer.district}</span>
                </div>

                <div className="invoice-divider" />

                <table className="invoice-print-table">
                  <thead>
                    <tr>
                      <th className="invoice-col-desc">Description</th>
                      <th className="invoice-col-qty">Qty</th>
                      <th className="invoice-col-amount">Unit Price</th>
                      <th className="invoice-col-amount">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.entries.map((entry) => {
                      const itemMeta = getPurchaseItemMeta(entry);
                      const hasBike = entry.itemType === "BIKE" && !!entry.bike;
                      return (
                        <tr key={`entry-${entry.id}`}>
                          <td className="invoice-desc-cell">
                            <strong>{itemMeta.title}</strong>
                            <div className="invoice-item-meta">{itemMeta.subtitle}</div>
                            {hasBike && (
                              <div className="invoice-vehicle-meta">
                                Chassis No: {entry.bike?.chassisNo ?? "-"} | Engine No: {entry.bike?.engineNo ?? "-"} | Registration: {entry.bike?.registrationType ?? "-"}
                              </div>
                            )}
                          </td>
                          <td className="invoice-col-qty">{entry.quantity}</td>
                          <td className="invoice-col-amount">Rs. {(entry.quantity > 0 ? entry.finalSellingPrice / entry.quantity : entry.finalSellingPrice).toLocaleString()}</td>
                          <td className="invoice-col-amount">Rs. {entry.finalSellingPrice.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    {selectedInvoice.entries
                      .filter((entry) => entry.hasRegistrationFee && (entry.registrationFeeAmount ?? 0) > 0)
                      .map((entry) => (
                        <tr key={`reg-${entry.id}`} className="invoice-registration-row">
                          <td className="invoice-desc-cell">
                            Registration Fee
                            {entry.bike ? ` - ${entry.bike.brand} ${entry.bike.model}` : ""}
                          </td>
                          <td className="invoice-col-qty">{entry.quantity}</td>
                          <td className="invoice-col-amount">Rs. {(entry.registrationFeeAmount ?? 0).toLocaleString()}</td>
                          <td className="invoice-col-amount">Rs. {((entry.registrationFeeAmount ?? 0) * entry.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    {selectedInvoice.entries.some((entry) => entry.purchaseChannel === "LEASING") && (
                      <>
                        <tr className="invoice-summary-row">
                          <td className="invoice-desc-cell">
                            Leasing Partner
                            {selectedInvoice.entries.find((entry) => entry.purchaseChannel === "LEASING")?.leasingCompany?.name
                              ? ` - ${selectedInvoice.entries.find((entry) => entry.purchaseChannel === "LEASING")?.leasingCompany?.name}`
                              : ""}
                          </td>
                          <td className="invoice-col-qty" />
                          <td className="invoice-col-amount" />
                          <td className="invoice-col-amount" />
                        </tr>
                        <tr className="invoice-summary-row">
                          <td className="invoice-desc-cell">Leasing Amount</td>
                          <td className="invoice-col-qty" />
                          <td className="invoice-col-amount">Rs. {selectedInvoice.entries.reduce((sum, entry) => sum + (entry.leasingFinancedAmount ?? 0), 0).toLocaleString()}</td>
                          <td className="invoice-col-amount" />
                        </tr>
                      </>
                    )}
                    {(() => {
                      const interestEntry = selectedInvoice.entries.find((e) => (e.interestRate ?? 0) > 0 && (e.installmentMonths ?? 0) > 0);
                      if (!interestEntry) return null;
                      return (
                        <>
                          <tr className="invoice-summary-row">
                            <td className="invoice-desc-cell">Finance Charge ({interestEntry.interestRate}%)</td>
                            <td className="invoice-col-qty" />
                            <td className="invoice-col-amount">Rs. {((interestEntry.totalWithInterest ?? 0) - interestEntry.finalSellingPrice).toLocaleString()}</td>
                            <td className="invoice-col-amount" />
                          </tr>
                          <tr className="invoice-summary-row">
                            <td className="invoice-desc-cell">Monthly Installment × {interestEntry.installmentMonths} months</td>
                            <td className="invoice-col-qty" />
                            <td className="invoice-col-amount">Rs. {(interestEntry.monthlyInstallmentAmount ?? 0).toLocaleString()}</td>
                            <td className="invoice-col-amount" />
                          </tr>
                        </>
                      );
                    })()}
                    <tr className="invoice-summary-row">
                      <td className="invoice-desc-cell">Advance Paid</td>
                      <td className="invoice-col-qty" />
                      <td className="invoice-col-amount">Rs. {selectedInvoice.downPaymentAmount.toLocaleString()}</td>
                      <td className="invoice-col-amount" />
                    </tr>
                    <tr className="invoice-summary-row invoice-balance-row">
                      <td className="invoice-desc-cell">Balance Remaining</td>
                      <td className="invoice-col-qty" />
                      <td className="invoice-col-amount">Rs. {selectedInvoice.remainingAmount.toLocaleString()}</td>
                      <td className="invoice-col-amount" />
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="invoice-total-label">Grand Total</td>
                      <td className="invoice-total-value">Rs. {getInvoiceGrandTotal(selectedInvoice).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="invoice-bank-block">
                  <strong>Bank Details</strong>
                  <span>019010033205</span>
                  <span>JL Racing</span>
                  <span>HNB</span>
                </div>

                {invoiceInstallments.length > 0 && (() => {
                  const paidCount = invoiceInstallments.filter((i) => i.status === "PAID" || i.status === "PARTIAL").length;
                  const remainingCount = invoiceInstallments.filter((i) => i.status === "PENDING" || i.status === "PARTIAL").length;
                  return (
                    <>
                      <div className="invoice-divider" />
                      <strong style={{ display: "block", marginBottom: "0.5rem" }}>
                        Installment Schedule — {paidCount} of {invoiceInstallments.length} months paid · {remainingCount} remaining
                      </strong>
                      <table className="invoice-print-table">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Due Date</th>
                            <th className="invoice-col-amount">Monthly Due</th>
                            <th className="invoice-col-amount">Paid</th>
                            <th className="invoice-col-amount">Penalty</th>
                            <th className="invoice-col-amount">Balance Due</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceInstallments.map((inst) => {
                            const balanceDue = Math.max(0, Math.round((inst.dueAmount + (inst.penaltyAmount ?? 0) - inst.paidAmount) * 100) / 100);
                            return (
                              <>
                                <tr key={inst.id} style={{ opacity: inst.status === "PAID" ? 0.65 : 1 }}>
                                  <td>{inst.installmentNo}</td>
                                  <td>
                                    {new Date(inst.dueDate).toLocaleDateString("en-GB")}
                                    {inst.settledAt && <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Last: {new Date(inst.settledAt).toLocaleDateString("en-GB")}</div>}
                                  </td>
                                  <td className="invoice-col-amount">Rs. {inst.dueAmount.toLocaleString()}</td>
                                  <td className="invoice-col-amount">{inst.paidAmount > 0 ? `Rs. ${inst.paidAmount.toLocaleString()}` : "—"}</td>
                                  <td className="invoice-col-amount">{(inst.penaltyAmount ?? 0) > 0 ? `Rs. ${inst.penaltyAmount.toLocaleString()}` : "—"}</td>
                                  <td className="invoice-col-amount" style={{ fontWeight: balanceDue > 0 ? 600 : undefined, color: balanceDue > 0 ? "var(--amber, #f59e0b)" : undefined }}>
                                    {balanceDue > 0 ? `Rs. ${balanceDue.toLocaleString()}` : "—"}
                                  </td>
                                  <td>
                                    <span style={{ fontWeight: 600, color: inst.status === "PAID" ? "var(--green)" : inst.status === "PARTIAL" ? "var(--amber, #f59e0b)" : "var(--text-muted)" }}>
                                      {inst.status}
                                    </span>
                                  </td>
                                </tr>
                                {inst.payments && inst.payments.length > 0 && inst.payments.map((pay) => (
                                  <tr key={`pay-${pay.id}`} style={{ background: "var(--panel-bg, #f9f9f9)" }}>
                                    <td style={{ paddingLeft: "1.2rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>↳</td>
                                    <td style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{new Date(pay.paidAt).toLocaleDateString("en-GB")}</td>
                                    <td className="invoice-col-amount" style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{pay.note ?? ""}</td>
                                    <td className="invoice-col-amount" style={{ fontSize: "0.78rem" }}>Rs. {pay.amount.toLocaleString()}</td>
                                    <td className="invoice-col-amount" style={{ fontSize: "0.78rem", color: pay.penaltyAmount > 0 ? "var(--amber, #f59e0b)" : "var(--text-muted)" }}>
                                      {pay.penaltyAmount > 0 ? `Rs. ${pay.penaltyAmount.toLocaleString()}` : "—"}
                                    </td>
                                    <td colSpan={2} />
                                  </tr>
                                ))}
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </>
                  );
                })()}

                {activeInvoiceTerms.length > 0 && (
                  <>
                    <div className="invoice-divider" />
                    <ul className="invoice-paper-terms">
                      {activeInvoiceTerms.map((term, index) => (
                        <li key={`${index}-${term.slice(0, 24)}`}>{term}</li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="invoice-support-note">If you have any questions concerning this invoice, please contact us at <strong>071 791 0091</strong></p>
              </section>
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button 
                type="button" 
                className="btn-accent" 
                disabled={invoiceSupportLoading || isPreparingPrint}
                onClick={() => void handlePrintInvoice(selectedInvoice)}
              >
                {invoiceSupportLoading || isPreparingPrint ? "Preparing Invoice..." : "Print Invoice"}
              </button>
              <button type="button" className="btn-outline" onClick={() => setSelectedInvoice(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
