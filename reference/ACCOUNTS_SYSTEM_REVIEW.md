# Accounts System Review — JL Racing POS

## Overview

The reference system at **mybizlk.asia/jlracing** has a full **Accounts Portal** that the current JL Racing POS does not have.  
This document reviews the reference system features, maps them to the current POS architecture, and lists what needs to be built.

---

## Comparison: Our POS vs Reference POS

| Feature | Our POS (Current) | Reference POS (mybizlk.asia) |
|---|---|---|
| Bike & spare parts sales tracking | ✅ Full invoicing | ✅ Yes |
| Revenue / gross profit dashboard | ✅ Dashboard KPIs | ✅ Yes |
| **Accounts portal** | ❌ Missing | ✅ Full portal |
| **Cash deposit (receipt → account)** | ❌ Missing | ✅ Yes |
| **Payment voucher (expense entry)** | ❌ Missing | ✅ Yes |
| **General ledger (per-account view)** | ❌ Missing | ✅ Yes |
| **Chart of accounts management** | ❌ Missing | ✅ Yes |
| Excel/export of transactions | ❌ Missing | ✅ Yes |
| Settle downpayment invoices | ✅ Partial (settle endpoint) | ✅ Full flow |

---

## Reference System — Feature-by-Feature Review

### 1. Invoice / Invoice
Standard sales invoice creation. Same as what we have now.

---

### 2. Invoice / Receipts
- After a sale, a **receipt is generated** for each invoice.
- The receipt can be **printed**.
- The receipt enters a queue in **Cash Deposit** waiting to be allocated to a bank account.

**Our POS:** We generate invoices but do not produce a separate "receipt" record that feeds into accounting.

---

### 3. Accounts / Cash Deposit

**Purpose:** Links completed sale receipts to a specific bank/cash account.

**UI Flow:**
1. A list of all undeposited receipts is shown — each row has:
   - Row #, Invoice No, Customer Name, NIC/Reference, Payment Amount input, Total Amount, Checkbox, "Update" button
2. Admin selects which receipts to deposit.
3. Selects the **Deposit Bank** (from a dropdown of accounts like "Cash in Hand", "HNB", etc.).
4. Enters the **Payment Amount (Rs.)**.
5. Clicks **Submit** — this records a **debit entry** to the selected account in the ledger.

**Effect in General Ledger:**
- Transaction type: `cashdeposit`
- Creates a Dr entry on the selected account.

**What we need to build:**
- A receipts queue that auto-populates from completed POS sales (bikes + spare parts).
- An accounts/bank dropdown.
- Deposit submission → creates a ledger transaction.

---

### 4. Accounts / Payment Voucher

**Purpose:** Record any **outgoing expense or payment** from one account to another.  
This covers everything that is NOT a bike/parts sale.

**Payment Types available in the reference system:**
| Payment Type | Description |
|---|---|
| Vehicle Clearance Payment | Customs / clearance costs for a vehicle |
| Bill | Utility/operating bills |
| Other Payments | Generic catch-all |
| Permit Payments | Registration permit costs |
| Customer Overdue | Overdue collections from customers |
| Leasing Payment | Payment to a leasing company |
| Loan Payment | Bank loan repayment |
| Customer Refunds | Refund issued to a customer |
| Secondhand Vehicle Purchase | Cost of buying a used vehicle for inventory |
| Advance Invoice Refunds | Refund of advance/deposit invoices |

**Form Fields:**
- Amount (Rs.)
- Description (text)
- Payment Type (dropdown — from list above)
- Select Cr (Credit) Account — the account money leaves from
- Select Dr (Debit) Account — the account money goes to
- "Add to Voucher" button

**Effect in General Ledger:**
- Creates both a **Cr entry** on the source account and a **Dr entry** on the destination account.

**What we need to build:**
- Payment voucher form with all payment types.
- Double-entry: one Cr + one Dr transaction per voucher.
- Account selection dropdowns.

---

### 5. Accounts / General Ledger

**Purpose:** View the full transaction history for any single account, with running balance.

**Filters:**
- From Date (default: start of year)
- To Date (default: today)
- Account (dropdown — all accounts)

**Table Columns:**
| Column | Description |
|---|---|
| Type | Transaction type (cashdeposit, paymentvoucher, openbalance, etc.) |
| Ref No | Reference number (invoice or voucher ref) |
| User | Who entered the transaction (e.g. JLadmin) |
| Date | Transaction date |
| Classic No | Classic reference/cheque no |
| Next Account | The counter-account (double-entry partner) |
| Description | Freetext description |
| Cheque No | Cheque number if payment by cheque |
| Dr (Rs.) | Debit amount |
| Cr (Rs.) | Credit amount |
| Balance (Rs.) | Running balance |

**First Row — Open Balance:**
- Shows the opening balance for the account as of the "From Date".
- Balance cascades down each row.

**Export:**
- Excel export button for the filtered view.

**What we need to build:**
- Ledger query API with date + account filter.
- Running balance calculation (open balance + sum of transactions).
- Excel export (using a library like `xlsx` or `exceljs`).

---

### 6. Accounts — Chart of Accounts (Inferred)

The account dropdown in Cash Deposit, Payment Voucher, and General Ledger all reference a managed set of accounts. From the screenshots we can see accounts like:

- JLracing HNB (Account Code: BIN9B03205)
- Cash in Hand

**What we need to build:**
- A **Chart of Accounts** management page: create, edit, delete accounts.
- Each account has: name, account code, type (Bank, Cash, Expense, Income, etc.).
- Opening balance per account.

---

## Current POS Architecture — What Already Exists

### Backend Models (Relevant)
- `PosCustomerPurchase` — all bike and spare parts sales with payment type (DIRECT, DOWNPAYMENT), settlement status, leasing details.
- `PosAdmin` — admin accounts with `lastLoginAt`.
- `BikeVehicleExpense` — individual expenses per bike vehicle.
- `InventoryProductExpense` — individual expenses per inventory product.

### Backend Auth
- POS admin auth at `/api/pos/auth` with JWT.
- All `/api/pos/*` routes protected by `authenticatePosAdmin()` middleware.

### POS Frontend
- Built in Next.js 14, App Router at `apps/pos`.
- Dashboard layout with sidebar nav.
- Existing finance: dashboard KPI cards (Revenue, Gross Profit, Outstanding, Taxes, Costs).
- No accounts portal pages exist yet.

---

## What Needs to Be Built

### New Prisma Models (Backend)

```
Account              — Chart of accounts (name, code, type, openingBalance)
AccountTransaction   — Each ledger entry (accountId, type, amount, direction DR/CR, 
                       refNo, counterAccountId, description, chequeNo, createdBy, createdAt)
Receipt              — Receipt record linked to PosCustomerPurchase (auto-created on sale)
PaymentVoucher       — Voucher header (type, amount, description, crAccountId, 
                       drAccountId, createdBy, createdAt)
```

### New Backend Routes

```
GET/POST/PATCH/DELETE  /api/pos/accounts              — Chart of accounts CRUD
GET                    /api/pos/accounts/:id/ledger    — General ledger for one account
GET                    /api/pos/receipts               — Undeposited receipts list
POST                   /api/pos/receipts/deposit       — Submit deposit to account
POST                   /api/pos/vouchers               — Create payment voucher
GET                    /api/pos/vouchers               — List vouchers
```

### New POS Frontend Pages

| Route | Page | Description |
|---|---|---|
| `/dashboard/accounts` | Chart of Accounts | Manage bank/cash accounts |
| `/dashboard/accounts/deposit` | Cash Deposit | Assign receipts to accounts |
| `/dashboard/accounts/voucher` | Payment Voucher | Record expenses/payments |
| `/dashboard/accounts/ledger` | General Ledger | Per-account transaction history |

### Sidebar Addition
New top-level nav item: **Accounts** with sub-items:
- Cash Deposit → `/dashboard/accounts/deposit`
- Payment Voucher → `/dashboard/accounts/voucher`
- General Ledger → `/dashboard/accounts/ledger`
- Manage Accounts → `/dashboard/accounts`

---

## Auto-Population Strategy

**The client's question: "How can we retrieve bike/spare parts sales automatically?"**

**Answer / Design Decision:**
When a sale is created via `POST /api/pos/user-management/:id/purchases`, the backend should:
1. Auto-create a `Receipt` record linked to that purchase.
2. The receipt appears in the **Cash Deposit** queue as "pending deposit".
3. When the admin deposits it to an account, an `AccountTransaction` is created (Dr entry on the selected account).

This means:
- Bike sales → automatically appear in Cash Deposit as receipts.
- Admin only needs to **manually enter** other income via Payment Voucher.
- No double data entry for sales.

For downpayment settlements: when `POST /api/pos/user-management/:id/purchases/:id/settle` is called, a new receipt should be auto-created for the settlement amount and appear in the Cash Deposit queue — so **no separate invoice printing is required for settlement**.

---

## Feature Priority Recommendation

| Priority | Feature | Effort |
|---|---|---|
| 1 | Chart of Accounts (manage accounts/banks) | Small |
| 2 | Auto-create receipts when sales are made | Small |
| 3 | Cash Deposit page (link receipts to accounts) | Medium |
| 4 | Payment Voucher (enter expenses) | Medium |
| 5 | General Ledger view + Excel export | Medium |

Total estimated scope: **Medium** — 5 new pages, ~4 new Prisma models, ~8 new API endpoints.

---

## Open Questions to Confirm Before Implementation

1. **Downpayment settlements:** Should settling a downpayment auto-create a receipt in Cash Deposit? (Recommended: Yes — avoids needing to print a new invoice.)
2. **Account types:** Do we need to separate account types (Bank, Cash, Expense, Income) or is a flat list of accounts enough for now?
3. **Payment Voucher types:** Should we use the same 10 types from the reference system or add/remove any?
4. **Excel export:** Is Excel export required from day one or can we start with just the screen view?
5. **Opening balances:** Does the client need to enter existing bank balances to start with an accurate ledger?
