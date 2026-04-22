"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAdmin } from "../../components/AdminContext";
import { API_URL } from "../../lib/constants";
import { IconActivity, IconBike, IconClock, IconInvoice, IconUsers } from "../../lib/icons";

type ProvinceMeta = { name: string; districts: string[] };
type DreamBikeOption = {
  id: number;
  displayId: string;
  brandName: string;
  modelName: string;
  colour: string;
  year?: number | null;
  sellingPrice?: number | null;
  availability: string;
};

type PosUser = {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  mobileNumber: string;
  email?: string | null;
  province: string;
  district: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  dreamBikes: Array<{
    relationId: number;
    bikeId: number;
    displayId: string;
    brandName: string;
    modelName: string;
    colour: string;
    year?: number | null;
    sellingPrice?: number | null;
    availability: string;
  }>;
};

type BikeDetail = {
  id: number;
  displayId: string;
  status: string;
  colour: string;
  year?: number | null;
  engineCapacityCc?: number | null;
  mileage?: number | null;
  condition?: string;
  registrationType?: string;
  fileNo?: string | null;
  registerNo?: string | null;
  chassisNo?: string | null;
  engineNo?: string | null;
  sellingPrice?: number | null;
  brand: { name: string };
  model: { name: string };
  description?: string | null;
  images?: Array<{ id: number; url: string; isPrimary: boolean }>;
};

type PurchaseHistoryEntry = {
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

type PurchaseInvoiceRow = {
  key: string;
  representative: PurchaseHistoryEntry;
  purchasedAt: string;
  invoiceLabel: string;
  purchaseMode: "SINGLE" | "BULK";
  quantity: number;
  finalSellingPrice: number;
  remainingAmount: number;
  settlementStatus: "SETTLED" | "TO_SETTLE";
  paymentTypeText: string;
  statusText: string;
  itemTitle: string;
  itemSubtitle: string;
};

type PurchaseFormState = {
  purchaseType: "BIKE" | "INVENTORY";
  purchaseMode: "SINGLE" | "BULK";
  bikeVehicleId: number | "";
  inventoryProductId: number | "";
  quantity: string;
  finalSellingPrice: string;
  paymentType: "DIRECT" | "DOWNPAYMENT";
  downPaymentAmount: string;
  purchaseChannel: "PERSONAL" | "LEASING";
  leasingCompanyId: number | "";
  leasingDownPaymentAmount: string;
  hasRegistrationFee: boolean;
  registrationFeeAmount: string;
};

type LeasingCompanyOption = {
  id: number;
  name: string;
};

type BulkBikeLine = {
  key: string;
  brandName: string;
  modelName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  hasRegistrationFee: boolean;
  registrationFeeAmount: number;
  registrationFeeSubtotal: number;
  bikeIds: number[];
};

type InventoryProductOption = {
  id: number;
  displayId: string;
  name: string;
  quantity: number;
  sellingPrice: number;
  brand: { name: string };
  category: { name: string };
  supplier?: { name: string; code: string } | null;
  description?: string | null;
};

type UserFormState = {
  firstName: string;
  lastName: string;
  nic: string;
  mobileNumber: string;
  email: string;
  province: string;
  district: string;
  address: string;
  dreamBikeIds: number[];
};

type UserFormField = keyof UserFormState;

const EMPTY_FORM: UserFormState = {
  firstName: "",
  lastName: "",
  nic: "",
  mobileNumber: "",
  email: "",
  province: "",
  district: "",
  address: "",
  dreamBikeIds: [],
};

function parsePositiveInt(value: string, fallback = 1) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function formatMoneyInput(value: number) {
  return Number.isFinite(value) ? String(Math.round(value * 100) / 100) : "";
}

export default function UsersPage() {
  const { token } = useAdmin();
  const pathname = usePathname();
  const router = useRouter();

  const activeTab: "users" | "history" = pathname.startsWith("/dashboard/users/history") ? "history" : "users";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dreamBikeSearch, setDreamBikeSearch] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);

  const [users, setUsers] = useState<PosUser[]>([]);
  const [provinces, setProvinces] = useState<ProvinceMeta[]>([]);
  const [dreamBikeOptions, setDreamBikeOptions] = useState<DreamBikeOption[]>([]);
  const [inventoryOptions, setInventoryOptions] = useState<InventoryProductOption[]>([]);
  const [leasingCompanies, setLeasingCompanies] = useState<LeasingCompanyOption[]>([]);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [form, setForm] = useState<UserFormState>(EMPTY_FORM);
  const [formFieldErrors, setFormFieldErrors] = useState<Partial<Record<UserFormField, string>>>({});
  const [formGeneralError, setFormGeneralError] = useState<string | null>(null);

  const [viewUser, setViewUser] = useState<PosUser | null>(null);
  const [bikeDetail, setBikeDetail] = useState<BikeDetail | null>(null);
  const [bikeModalOpen, setBikeModalOpen] = useState(false);
  const [bikeLoading, setBikeLoading] = useState(false);
  const [purchaseUser, setPurchaseUser] = useState<PosUser | null>(null);
  const [purchaseForm, setPurchaseForm] = useState<PurchaseFormState>({
    purchaseType: "BIKE",
    purchaseMode: "SINGLE",
    bikeVehicleId: "",
    inventoryProductId: "",
    quantity: "1",
    finalSellingPrice: "",
    paymentType: "DIRECT",
    downPaymentAmount: "",
    purchaseChannel: "PERSONAL",
    leasingCompanyId: "",
    leasingDownPaymentAmount: "",
    hasRegistrationFee: false,
    registrationFeeAmount: "",
  });
  const [bulkBrandModelKey, setBulkBrandModelKey] = useState("");
  const [bulkCount, setBulkCount] = useState("1");
  const [bulkUnitPrice, setBulkUnitPrice] = useState("");
  const [bulkBikeLines, setBulkBikeLines] = useState<BulkBikeLine[]>([]);
  const [purchaseBikeDetail, setPurchaseBikeDetail] = useState<BikeDetail | null>(null);
  const [purchaseProductDetail, setPurchaseProductDetail] = useState<InventoryProductOption | null>(null);
  const [purchaseLoadingBike, setPurchaseLoadingBike] = useState(false);
  const [purchaseSaving, setPurchaseSaving] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [historySearch, setHistorySearch] = useState("");
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryEntry[]>([]);
  const [selectedHistoryPurchase, setSelectedHistoryPurchase] = useState<PurchaseHistoryEntry | null>(null);
  const [invoiceSourceEntries, setInvoiceSourceEntries] = useState<PurchaseHistoryEntry[] | null>(null);
  const [ordersUser, setOrdersUser] = useState<PosUser | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [ordersSearch, setOrdersSearch] = useState("");
  const [orders, setOrders] = useState<PurchaseHistoryEntry[]>([]);
  const [settleTarget, setSettleTarget] = useState<PurchaseHistoryEntry | null>(null);
  const [settleAmount, setSettleAmount] = useState("");
  const [settleSaving, setSettleSaving] = useState(false);
  const [settleError, setSettleError] = useState<string | null>(null);
  const [showBulkBikeDetails, setShowBulkBikeDetails] = useState(false);

  const base = `${API_URL}/api/pos/user-management`;
  const bikeBase = `${API_URL}/api/pos/bike-management`;
  const authHeader = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const districtsForProvince = useMemo(
    () => provinces.find((province) => province.name === form.province)?.districts ?? [],
    [form.province, provinces]
  );

  const totalUsers = useMemo(() => users.length, [users]);
  const usersWithDreamBikes = useMemo(() => users.filter((user) => user.dreamBikes.length > 0).length, [users]);
  const totalDreamSelections = useMemo(() => users.reduce((sum, user) => sum + user.dreamBikes.length, 0), [users]);
  const availableDreamBikes = useMemo(() => dreamBikeOptions.filter((bike) => bike.availability === "available").length, [dreamBikeOptions]);

  const filteredBikeOptions = useMemo(() => {
    const q = dreamBikeSearch.trim().toLowerCase();
    if (!q) return dreamBikeOptions;
    return dreamBikeOptions.filter((bike) => {
      return (
        bike.displayId.toLowerCase().includes(q)
        || bike.brandName.toLowerCase().includes(q)
        || bike.modelName.toLowerCase().includes(q)
        || bike.colour.toLowerCase().includes(q)
      );
    });
  }, [dreamBikeOptions, dreamBikeSearch]);

  const availableBikeOptions = useMemo(
    () => dreamBikeOptions.filter((bike) => bike.availability === "available"),
    [dreamBikeOptions]
  );

  const bikeGroupOptions = useMemo(() => {
    const map = new Map<string, {
      brandName: string;
      modelName: string;
      totalCount: number;
      availableCount: number;
      soldCount: number;
      defaultPrice?: number | null;
    }>();

    dreamBikeOptions.forEach((bike) => {
      const key = `${bike.brandName}__${bike.modelName}`;
      const current = map.get(key);
      const isAvailable = bike.availability === "available";
      if (current) {
        current.totalCount += 1;
        if (isAvailable) current.availableCount += 1;
        else current.soldCount += 1;
        if ((current.defaultPrice == null || current.defaultPrice <= 0) && bike.sellingPrice != null) {
          current.defaultPrice = bike.sellingPrice;
        }
      } else {
        map.set(key, {
          brandName: bike.brandName,
          modelName: bike.modelName,
          totalCount: 1,
          availableCount: isAvailable ? 1 : 0,
          soldCount: isAvailable ? 0 : 1,
          defaultPrice: bike.sellingPrice,
        });
      }
    });

    return Array.from(map.entries())
      .map(([key, value]) => ({ key, ...value }))
      .sort((left, right) => `${left.brandName} ${left.modelName}`.localeCompare(`${right.brandName} ${right.modelName}`));
  }, [dreamBikeOptions]);

  const bulkBikeTotal = useMemo(
    () => bulkBikeLines.reduce((sum, line) => sum + line.subtotal, 0),
    [bulkBikeLines]
  );

  const bulkRegistrationFeeTotal = useMemo(
    () => bulkBikeLines.reduce((sum, line) => sum + line.registrationFeeSubtotal, 0),
    [bulkBikeLines]
  );

  const bulkUsedByGroupKey = useMemo(() => {
    const used = new Map<string, number>();
    bulkBikeLines.forEach((line) => {
      const key = `${line.brandName}__${line.modelName}`;
      used.set(key, (used.get(key) ?? 0) + line.quantity);
    });
    return used;
  }, [bulkBikeLines]);

  const bikeGroupOptionsWithRemaining = useMemo(
    () => bikeGroupOptions.map((group) => {
      const usedCount = bulkUsedByGroupKey.get(group.key) ?? 0;
      const remainingCount = Math.max(0, group.availableCount - usedCount);
      return {
        ...group,
        usedCount,
        remainingCount,
      };
    }),
    [bikeGroupOptions, bulkUsedByGroupKey]
  );

  const loadInitialData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const [usersRes, provincesRes, bikesRes, productsRes, leasingCompaniesRes] = await Promise.all([
        fetch(`${base}?page=1&limit=200`, { headers: authHeader, cache: "no-store" }),
        fetch(`${base}/meta/provinces`, { headers: authHeader, cache: "no-store" }),
        fetch(`${base}/dream-bikes`, { headers: authHeader, cache: "no-store" }),
        fetch(`${bikeBase}/products?page=1&limit=500`, { headers: authHeader, cache: "no-store" }),
        fetch(`${base}/leasing-companies`, { headers: authHeader, cache: "no-store" }),
      ]);

      const usersJson = await usersRes.json() as { data?: { users?: PosUser[] }; message?: string };
      const provincesJson = await provincesRes.json() as { data?: { provinces?: ProvinceMeta[] }; message?: string };
      const bikesJson = await bikesRes.json() as { data?: DreamBikeOption[]; message?: string };
      const productsJson = await productsRes.json() as { data?: { products?: InventoryProductOption[] }; message?: string };
      const leasingCompaniesJson = await leasingCompaniesRes.json() as { data?: { companies?: LeasingCompanyOption[] }; message?: string };

      if (!usersRes.ok) throw new Error(usersJson.message ?? "Failed to load users");
      if (!provincesRes.ok) throw new Error(provincesJson.message ?? "Failed to load province data");
      if (!bikesRes.ok) throw new Error(bikesJson.message ?? "Failed to load dream bikes");
      if (!productsRes.ok) throw new Error(productsJson.message ?? "Failed to load inventory products");
      if (!leasingCompaniesRes.ok) throw new Error(leasingCompaniesJson.message ?? "Failed to load leasing companies");

      setUsers(usersJson.data?.users ?? []);
      setProvinces(provincesJson.data?.provinces ?? []);
      setDreamBikeOptions(bikesJson.data ?? []);
      setInventoryOptions((productsJson.data?.products ?? []).filter((product) => product.quantity > 0));
      setLeasingCompanies(leasingCompaniesJson.data?.companies ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load user management data";
      setError(message.includes("Route not found") ? `${message}. Restart backend and confirm /api/pos/user-management route is running.` : message);
    } finally {
      setLoading(false);
    }
  }, [authHeader, base, bikeBase, token]);

  useEffect(() => {
    void loadInitialData();
  }, [loadInitialData]);

  const loadPurchaseHistory = useCallback(async () => {
    if (!token) return;
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const searchParam = historySearch.trim() ? `&search=${encodeURIComponent(historySearch.trim())}` : "";
      const response = await fetch(`${base}/purchases?page=1&limit=500${searchParam}`, {
        headers: authHeader,
        cache: "no-store",
      });
      const payload = await response.json() as { data?: { purchases?: PurchaseHistoryEntry[] }; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load user history");
      setPurchaseHistory(payload.data?.purchases ?? []);
    } catch (err) {
      setHistoryError(err instanceof Error ? err.message : "Failed to load user history");
    } finally {
      setHistoryLoading(false);
    }
  }, [authHeader, base, historySearch, token]);

  useEffect(() => {
    if (activeTab !== "history") return;
    void loadPurchaseHistory();
  }, [activeTab, loadPurchaseHistory]);

  const loadOrdersForUser = useCallback(async (userId: number, searchText = "") => {
    if (!token) return;
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const searchParam = searchText.trim() ? `&search=${encodeURIComponent(searchText.trim())}` : "";
      const response = await fetch(`${base}/${userId}/purchases?page=1&limit=500${searchParam}`, {
        headers: authHeader,
        cache: "no-store",
      });
      const payload = await response.json() as { data?: { purchases?: PurchaseHistoryEntry[] }; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load user orders");
      setOrders(payload.data?.purchases ?? []);
    } catch (err) {
      setOrdersError(err instanceof Error ? err.message : "Failed to load user orders");
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  }, [authHeader, base, token]);

  const openOrdersModal = (user: PosUser) => {
    setOrdersUser(user);
    setOrdersSearch("");
    setOrdersError(null);
    setOrders([]);
    void loadOrdersForUser(user.id, "");
  };

  const closeOrdersModal = () => {
    setOrdersUser(null);
    setOrdersSearch("");
    setOrdersError(null);
    setOrders([]);
  };

  const openInvoiceModal = useCallback(async (entry: PurchaseHistoryEntry) => {
    setSelectedHistoryPurchase(entry);
    setInvoiceSourceEntries(null);
    setShowBulkBikeDetails(false);
    try {
      const response = await fetch(`${base}/${entry.customer.id}/purchases?page=1&limit=1000`, {
        headers: authHeader,
        cache: "no-store",
      });
      const payload = await response.json() as { data?: { purchases?: PurchaseHistoryEntry[] }; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load invoice details");
      setInvoiceSourceEntries(payload.data?.purchases ?? []);
    } catch {
      setInvoiceSourceEntries(null);
    }
  }, [authHeader, base]);

  const closeInvoiceModal = () => {
    setSelectedHistoryPurchase(null);
    setInvoiceSourceEntries(null);
    setShowBulkBikeDetails(false);
  };

  const getPurchaseItemMeta = (entry: PurchaseHistoryEntry) => {
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
  };

  const isDownPaymentEntry = (entry: PurchaseHistoryEntry) => {
    if (entry.purchaseChannel === "LEASING") return false;
    if (entry.paymentType === "DOWNPAYMENT") return true;
    const downPayment = entry.downPaymentAmount ?? 0;
    const remaining = entry.remainingAmount ?? 0;
    if (remaining > 0) return true;
    if (downPayment > 0 && downPayment < entry.finalSellingPrice) return true;
    const currentSellingPrice = entry.currentSellingPrice ?? 0;
    if (currentSellingPrice > 0 && entry.finalSellingPrice > 0 && entry.finalSellingPrice < currentSellingPrice * 0.7) return true;
    return false;
  };

  const getSettlementBadgeText = (entry: PurchaseHistoryEntry) => {
    if (isDownPaymentEntry(entry)) {
      return entry.settlementStatus === "TO_SETTLE"
        ? `Downpay • Settle Rs. ${(entry.remainingAmount ?? 0).toLocaleString()}`
        : "Downpay • Settled";
    }
    return "Direct • Settled";
  };

  const getPaymentTypeText = (entry: PurchaseHistoryEntry) => {
    if (entry.purchaseChannel === "LEASING") {
      return entry.leasingCompany?.name ? `Leasing (${entry.leasingCompany.name})` : "Leasing";
    }
    return isDownPaymentEntry(entry) ? "Downpayment" : "Direct";
  };

  const buildInvoiceRows = useCallback((entries: PurchaseHistoryEntry[]): PurchaseInvoiceRow[] => {
    const bulkHeuristicCounts = new Map<string, number>();
    for (const entry of entries) {
      if (entry.invoiceGroupCode?.trim()) continue;
      if (entry.itemType !== "BIKE") continue;
      const secondBucket = Math.floor(new Date(entry.purchasedAt).getTime() / 1000);
      const heuristicKey = `${entry.customer.id}:${secondBucket}`;
      bulkHeuristicCounts.set(heuristicKey, (bulkHeuristicCounts.get(heuristicKey) ?? 0) + 1);
    }

    const grouped = new Map<string, PurchaseHistoryEntry[]>();

    for (const entry of entries) {
      const groupCode = entry.invoiceGroupCode?.trim();
      const secondBucket = Math.floor(new Date(entry.purchasedAt).getTime() / 1000);
      const heuristicKey = `${entry.customer.id}:${secondBucket}`;
      const isHeuristicBulk = !groupCode && entry.itemType === "BIKE" && (bulkHeuristicCounts.get(heuristicKey) ?? 0) > 1;
      const key = groupCode
        ? `group:${entry.customer.id}:${groupCode}`
        : isHeuristicBulk
          ? `heuristic:${heuristicKey}`
          : `single:${entry.id}`;
      const bucket = grouped.get(key);
      if (bucket) bucket.push(entry);
      else grouped.set(key, [entry]);
    }

    const rows = Array.from(grouped.entries()).map(([key, bucket]) => {
      const sorted = [...bucket].sort((a, b) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt));
      const representative = sorted[0];
      const groupCode = representative.invoiceGroupCode?.trim();
      const isHeuristicBulk = key.startsWith("heuristic:");
      const isBulk = bucket.length > 1 || representative.purchaseMode === "BULK" || !!groupCode;
      const purchaseMode: "SINGLE" | "BULK" = isBulk ? "BULK" : "SINGLE";

      const quantity = bucket.reduce((sum, row) => sum + row.quantity, 0);
      const finalSellingPrice = bucket.reduce((sum, row) => sum + row.finalSellingPrice, 0);
      const remainingAmount = Math.max(0, Math.round(bucket.reduce((sum, row) => sum + (row.remainingAmount ?? 0), 0) * 100) / 100);
      const hasDownPayment = bucket.some((row) => isDownPaymentEntry(row));
      const settlementStatus: "SETTLED" | "TO_SETTLE" = remainingAmount > 0 || bucket.some((row) => row.settlementStatus === "TO_SETTLE")
        ? "TO_SETTLE"
        : "SETTLED";

      const paymentTypeText = getPaymentTypeText(representative);
      const statusText = representative.purchaseChannel === "LEASING"
        ? `Leasing • Rs. ${sorted.reduce((sum, row) => sum + (row.leasingFinancedAmount ?? 0), 0).toLocaleString()}`
        : hasDownPayment
          ? settlementStatus === "TO_SETTLE"
            ? `Downpay • Settle Rs. ${remainingAmount.toLocaleString()}`
            : "Downpay • Settled"
          : "Direct • Settled";

      const itemTitle = isBulk ? `Bulk Purchase (${bucket.length} bike entries)` : getPurchaseItemMeta(representative).title;
      const itemSubtitle = isBulk
        ? bucket.slice(0, 2).map((row) => getPurchaseItemMeta(row).title).join(" + ")
        : getPurchaseItemMeta(representative).subtitle;

      return {
        key,
        representative,
        purchasedAt: representative.purchasedAt,
        invoiceLabel: groupCode || (isHeuristicBulk ? `BULK-${String(representative.id).padStart(5, "0")}` : `INV-${String(representative.id).padStart(5, "0")}`),
        purchaseMode,
        quantity,
        finalSellingPrice,
        remainingAmount,
        settlementStatus,
        paymentTypeText,
        statusText,
        itemTitle,
        itemSubtitle,
      };
    });

    rows.sort((a, b) => +new Date(b.purchasedAt) - +new Date(a.purchasedAt));
    return rows;
  }, [getPurchaseItemMeta]);

  const historyInvoiceRows = useMemo(() => buildInvoiceRows(purchaseHistory), [buildInvoiceRows, purchaseHistory]);
  const orderInvoiceRows = useMemo(() => buildInvoiceRows(orders), [buildInvoiceRows, orders]);

  const getInvoiceRemaining = (entry: PurchaseHistoryEntry) => {
    const groupCode = entry.invoiceGroupCode?.trim();
    if (!groupCode) {
      return Math.max(0, Math.round(((entry.remainingAmount ?? 0)) * 100) / 100);
    }

    const merged = [...orders, ...purchaseHistory];
    let hasMatch = false;
    let total = 0;
    merged.forEach((row) => {
      if (row.customer.id === entry.customer.id && row.invoiceGroupCode === groupCode) {
        total += row.remainingAmount ?? 0;
        hasMatch = true;
      }
    });

    if (!hasMatch) {
      return Math.max(0, Math.round(((entry.remainingAmount ?? 0)) * 100) / 100);
    }
    return Math.max(0, Math.round(total * 100) / 100);
  };

  const openSettleModal = (entry: PurchaseHistoryEntry) => {
    const remaining = getInvoiceRemaining(entry);
    setSettleTarget(entry);
    setSettleAmount(remaining > 0 ? String(remaining) : "");
    setSettleError(null);
  };

  const closeSettleModal = () => {
    setSettleTarget(null);
    setSettleAmount("");
    setSettleError(null);
    setSettleSaving(false);
  };

  const submitSettlePayment = async (event: FormEvent) => {
    event.preventDefault();
    if (!settleTarget) return;

    const remaining = getInvoiceRemaining(settleTarget);
    const amount = Number(settleAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setSettleError("Please enter a valid settle amount");
      return;
    }
    if (amount > remaining) {
      setSettleError(`Settle amount cannot exceed remaining amount (Rs. ${remaining.toLocaleString()})`);
      return;
    }

    setSettleSaving(true);
    setSettleError(null);
    try {
      const response = await fetch(`${base}/${settleTarget.customer.id}/purchases/${settleTarget.id}/settle`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const payload = await response.json() as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to settle amount");

      setSuccess("Settlement payment added successfully");
      if (ordersUser) {
        await loadOrdersForUser(ordersUser.id, ordersSearch);
      }
      if (activeTab === "history") {
        await loadPurchaseHistory();
      }
      closeSettleModal();
    } catch (err) {
      setSettleError(err instanceof Error ? err.message : "Failed to settle amount");
    } finally {
      setSettleSaving(false);
    }
  };

  const ordersTotalValue = useMemo(
    () => orders.reduce((sum, order) => sum + order.finalSellingPrice, 0),
    [orders]
  );
  const ordersBikeCount = useMemo(
    () => orders.filter((order) => order.itemType === "BIKE").length,
    [orders]
  );
  const ordersInventoryCount = useMemo(
    () => orders.filter((order) => order.itemType === "INVENTORY").length,
    [orders]
  );

  const purchaseInvoiceTotal = useMemo(() => {
    if (purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "BULK") {
      return bulkBikeTotal;
    }
    const value = Number(purchaseForm.finalSellingPrice);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  }, [bulkBikeTotal, purchaseForm.finalSellingPrice, purchaseForm.purchaseMode, purchaseForm.purchaseType]);

  const purchaseRegistrationTotal = useMemo(() => {
    if (purchaseForm.purchaseType !== "BIKE") return 0;
    if (purchaseForm.purchaseMode === "BULK") return bulkRegistrationFeeTotal;
    if (!purchaseForm.hasRegistrationFee) return 0;
    const value = Number(purchaseForm.registrationFeeAmount || "0");
    return Number.isFinite(value) && value > 0 ? value : 0;
  }, [bulkRegistrationFeeTotal, purchaseForm.hasRegistrationFee, purchaseForm.purchaseMode, purchaseForm.purchaseType, purchaseForm.registrationFeeAmount]);

  const purchaseGrandTotal = useMemo(
    () => purchaseInvoiceTotal + purchaseRegistrationTotal,
    [purchaseInvoiceTotal, purchaseRegistrationTotal]
  );

  const purchaseDownPaymentPreview = useMemo(() => {
    if (purchaseForm.purchaseChannel === "LEASING") {
      const value = Number(purchaseForm.leasingDownPaymentAmount || "0");
      return Number.isFinite(value) && value >= 0 ? value : 0;
    }
    if (purchaseForm.paymentType === "DIRECT") return purchaseInvoiceTotal;
    const value = Number(purchaseForm.downPaymentAmount || "0");
    return Number.isFinite(value) && value >= 0 ? value : 0;
  }, [purchaseForm.downPaymentAmount, purchaseForm.leasingDownPaymentAmount, purchaseForm.paymentType, purchaseForm.purchaseChannel, purchaseInvoiceTotal]);

  const purchaseRemainingPreview = useMemo(
    () => Math.max(0, Math.round((purchaseInvoiceTotal - purchaseDownPaymentPreview) * 100) / 100),
    [purchaseDownPaymentPreview, purchaseInvoiceTotal]
  );

  const selectedBulkGroup = useMemo(
    () => bikeGroupOptionsWithRemaining.find((group) => group.key === bulkBrandModelKey) ?? null,
    [bikeGroupOptionsWithRemaining, bulkBrandModelKey]
  );

  const selectedBulkUsedCount = useMemo(() => {
    if (!selectedBulkGroup) return 0;
    return selectedBulkGroup.usedCount;
  }, [selectedBulkGroup]);

  const selectedBulkRemainingCount = useMemo(() => {
    if (!selectedBulkGroup) return 0;
    return selectedBulkGroup.remainingCount;
  }, [selectedBulkGroup]);

  const selectedBulkRequestedCount = useMemo(() => {
    const parsed = Number(bulkCount);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : 0;
  }, [bulkCount]);

  const selectedBulkBikes = useMemo(() => {
    const bikeIdSet = new Set(bulkBikeLines.flatMap((line) => line.bikeIds));
    return availableBikeOptions.filter((bike) => bikeIdSet.has(bike.id));
  }, [availableBikeOptions, bulkBikeLines]);

  useEffect(() => {
    if (!selectedBulkGroup) return;
    if (bulkUnitPrice.trim().length > 0) return;
    if (selectedBulkGroup.defaultPrice == null || selectedBulkGroup.defaultPrice <= 0) return;
    setBulkUnitPrice(String(selectedBulkGroup.defaultPrice));
  }, [bulkUnitPrice, selectedBulkGroup]);

  const selectedInvoiceEntries = useMemo(() => {
    if (!selectedHistoryPurchase) return [] as PurchaseHistoryEntry[];
    const groupCode = selectedHistoryPurchase.invoiceGroupCode?.trim();
    const merged = invoiceSourceEntries && invoiceSourceEntries.length > 0
      ? invoiceSourceEntries
      : [...purchaseHistory, ...orders];
    const unique = new Map<number, PurchaseHistoryEntry>();

    if (groupCode) {
      merged.forEach((entry) => {
        if (entry.id === selectedHistoryPurchase.id || entry.invoiceGroupCode === groupCode) {
          unique.set(entry.id, entry);
        }
      });
      return Array.from(unique.values()).sort((left, right) => left.id - right.id);
    }

    const selectedSecondBucket = Math.floor(new Date(selectedHistoryPurchase.purchasedAt).getTime() / 1000);
    const selectedHeuristicKey = `${selectedHistoryPurchase.customer.id}:${selectedSecondBucket}`;
    const heuristicMatches = merged.filter((entry) => {
      if (entry.invoiceGroupCode?.trim()) return false;
      if (entry.itemType !== "BIKE") return false;
      const secondBucket = Math.floor(new Date(entry.purchasedAt).getTime() / 1000);
      const heuristicKey = `${entry.customer.id}:${secondBucket}`;
      return heuristicKey === selectedHeuristicKey;
    });

    if (heuristicMatches.length > 1) {
      heuristicMatches.forEach((entry) => unique.set(entry.id, entry));
      unique.set(selectedHistoryPurchase.id, selectedHistoryPurchase);
      return Array.from(unique.values()).sort((left, right) => left.id - right.id);
    }

    return [selectedHistoryPurchase];
  }, [invoiceSourceEntries, orders, purchaseHistory, selectedHistoryPurchase]);

  const selectedInvoiceTotals = useMemo(() => {
    const entries = selectedInvoiceEntries;
    return {
      quantity: entries.reduce((sum, entry) => sum + entry.quantity, 0),
      finalSellingPrice: entries.reduce((sum, entry) => sum + entry.finalSellingPrice, 0),
      downPaymentAmount: entries.reduce((sum, entry) => {
        const explicitDownPayment = entry.downPaymentAmount ?? 0;
        if (explicitDownPayment > 0) return sum + explicitDownPayment;
        if (!isDownPaymentEntry(entry)) return sum;
        const paidAmount = Math.max(0, entry.finalSellingPrice - (entry.remainingAmount ?? 0));
        return sum + paidAmount;
      }, 0),
      registrationFeeAmount: entries.reduce((sum, entry) => {
        if (!entry.hasRegistrationFee) return sum;
        return sum + (entry.registrationFeeAmount ?? 0);
      }, 0),
      remainingAmount: entries.reduce((sum, entry) => sum + (entry.remainingAmount ?? 0), 0),
      settlementStatus: entries.some((entry) => entry.settlementStatus === "TO_SETTLE") ? "TO_SETTLE" : "SETTLED",
    };
  }, [selectedInvoiceEntries]);

  const selectedInvoicePaymentType = useMemo(
    () => (selectedInvoiceEntries.some((entry) => isDownPaymentEntry(entry)) ? "Downpayment" : "Direct"),
    [selectedInvoiceEntries]
  );

  const selectedInvoicePurchaseChannel = useMemo(() => {
    const leasingEntries = selectedInvoiceEntries.filter((entry) => entry.purchaseChannel === "LEASING");
    if (leasingEntries.length === 0) return "Pay Personally";
    const leasingCompanyName = leasingEntries[0]?.leasingCompany?.name;
    return leasingCompanyName ? `Go With Leasing (${leasingCompanyName})` : "Go With Leasing";
  }, [selectedInvoiceEntries]);

  const selectedInvoicePurchaseMode = useMemo(
    () => (selectedInvoiceEntries.length > 1 || selectedHistoryPurchase?.purchaseMode === "BULK" || !!selectedHistoryPurchase?.invoiceGroupCode ? "Bulk" : "Single"),
    [selectedHistoryPurchase?.invoiceGroupCode, selectedHistoryPurchase?.purchaseMode, selectedInvoiceEntries.length]
  );

  const selectedInvoiceDisplayCode = useMemo(() => {
    if (!selectedHistoryPurchase) return "";
    const explicitGroupCode = selectedHistoryPurchase.invoiceGroupCode?.trim();
    if (explicitGroupCode) return explicitGroupCode;
    if (selectedInvoiceEntries.length > 1) {
      const minId = selectedInvoiceEntries.reduce((min, entry) => Math.min(min, entry.id), selectedInvoiceEntries[0]?.id ?? selectedHistoryPurchase.id);
      return `BULK-${String(minId).padStart(5, "0")}`;
    }
    return `INV-${String(selectedHistoryPurchase.id).padStart(5, "0")}`;
  }, [selectedHistoryPurchase, selectedInvoiceEntries]);

  const selectedInvoiceCurrentSellingTotal = useMemo(
    () => selectedInvoiceEntries.reduce((sum, entry) => sum + (entry.currentSellingPrice ?? 0), 0),
    [selectedInvoiceEntries]
  );

  const isBulkInvoiceView = useMemo(
    () => {
      if (!selectedHistoryPurchase) return false;
      return selectedInvoiceEntries.length > 1 || selectedHistoryPurchase.purchaseMode === "BULK" || !!selectedHistoryPurchase.invoiceGroupCode;
    },
    [selectedHistoryPurchase, selectedInvoiceEntries.length]
  );

  const bulkBikeDetailEntries = useMemo(
    () => selectedInvoiceEntries.filter(
      (entry): entry is PurchaseHistoryEntry & { bike: NonNullable<PurchaseHistoryEntry["bike"]> } => entry.itemType === "BIKE" && !!entry.bike
    ),
    [selectedInvoiceEntries]
  );

  useEffect(() => {
    setShowBulkBikeDetails(false);
  }, [selectedHistoryPurchase?.id]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingUserId(null);
    setDreamBikeSearch("");
    setFormFieldErrors({});
    setFormGeneralError(null);
    setShowFormModal(false);
  };

  const openAddUserModal = () => {
    setError(null);
    setSuccess(null);
    setForm(EMPTY_FORM);
    setEditingUserId(null);
    setDreamBikeSearch("");
    setFormFieldErrors({});
    setFormGeneralError(null);
    setShowFormModal(true);
  };

  const toggleDreamBike = (bikeId: number) => {
    setForm((prev) => {
      const exists = prev.dreamBikeIds.includes(bikeId);
      return {
        ...prev,
        dreamBikeIds: exists
          ? prev.dreamBikeIds.filter((id) => id !== bikeId)
          : [...prev.dreamBikeIds, bikeId],
      };
    });
    setFormFieldErrors((prev) => ({ ...prev, dreamBikeIds: undefined }));
  };

  const handleProvinceChange = (province: string) => {
    const validDistricts = provinces.find((p) => p.name === province)?.districts ?? [];
    setForm((prev) => ({
      ...prev,
      province,
      district: validDistricts.includes(prev.district) ? prev.district : "",
    }));
    setFormFieldErrors((prev) => ({ ...prev, province: undefined, district: undefined }));
  };

  const handleSaveUser = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;

    setSaving(true);
    setError(null);
    setSuccess(null);
    setFormFieldErrors({});
    setFormGeneralError(null);

    try {
      const payload = {
        ...form,
        email: form.email.trim() || undefined,
      };

      const url = editingUserId ? `${base}/${editingUserId}` : base;
      const method = editingUserId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json() as {
        message?: string;
        errors?: {
          formErrors?: string[];
          fieldErrors?: Record<string, string[]>;
        };
      };
      if (!response.ok) {
        const fieldErrors = json.errors?.fieldErrors ?? {};
        const mappedFieldErrors: Partial<Record<UserFormField, string>> = {};
        const knownFields: UserFormField[] = [
          "firstName",
          "lastName",
          "nic",
          "mobileNumber",
          "email",
          "province",
          "district",
          "address",
          "dreamBikeIds",
        ];

        for (const field of knownFields) {
          const messages = fieldErrors[field];
          if (Array.isArray(messages) && messages.length > 0) {
            mappedFieldErrors[field] = messages[0];
          }
        }

        setFormFieldErrors(mappedFieldErrors);
        setFormGeneralError(json.errors?.formErrors?.[0] ?? json.message ?? "Validation failed");
        return;
      }

      setSuccess(editingUserId ? "User updated successfully" : "User created successfully");
      resetForm();
      await loadInitialData();
    } catch (err) {
      setFormGeneralError(err instanceof Error ? err.message : "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (user: PosUser) => {
    setEditingUserId(user.id);
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      nic: user.nic,
      mobileNumber: user.mobileNumber,
      email: user.email ?? "",
      province: user.province,
      district: user.district,
      address: user.address,
      dreamBikeIds: user.dreamBikes.map((bike) => bike.bikeId),
    });
    setFormFieldErrors({});
    setFormGeneralError(null);
    setDreamBikeSearch("");
    setShowFormModal(true);
  };

  const handleDelete = async (user: PosUser) => {
    if (!token) return;
    const confirmed = window.confirm(`Delete user ${user.firstName} ${user.lastName}?`);
    if (!confirmed) return;

    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${base}/${user.id}`, {
        method: "DELETE",
        headers: authHeader,
      });
      const json = await response.json() as { message?: string };
      if (!response.ok) throw new Error(json.message ?? "Failed to delete user");
      setSuccess("User deleted successfully");
      await loadInitialData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const openBikeModal = async (bikeId: number) => {
    setBikeModalOpen(true);
    setBikeLoading(true);
    setBikeDetail(null);
    try {
      const [bikeRes, imagesRes] = await Promise.all([
        fetch(`${bikeBase}/vehicles/${bikeId}`, { headers: authHeader }),
        fetch(`${bikeBase}/vehicles/${bikeId}/images`, { headers: authHeader }),
      ]);
      const bikeJson = await bikeRes.json() as { data?: BikeDetail; message?: string };
      const imagesJson = await imagesRes.json() as { data?: Array<{ id: number; url: string; isPrimary: boolean }>; message?: string };

      if (!bikeRes.ok) throw new Error(bikeJson.message ?? "Failed to load bike details");
      if (!imagesRes.ok) throw new Error(imagesJson.message ?? "Failed to load bike images");

      setBikeDetail({
        ...(bikeJson.data as BikeDetail),
        images: imagesJson.data ?? [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bike details");
      setBikeModalOpen(false);
    } finally {
      setBikeLoading(false);
    }
  };

  const openPurchaseModal = (user: PosUser) => {
    setPurchaseUser(user);
    setPurchaseForm({
      purchaseType: "BIKE",
      purchaseMode: "SINGLE",
      bikeVehicleId: "",
      inventoryProductId: "",
      quantity: "1",
      finalSellingPrice: "",
      paymentType: "DIRECT",
      downPaymentAmount: "",
      purchaseChannel: "PERSONAL",
      leasingCompanyId: "",
      leasingDownPaymentAmount: "",
      hasRegistrationFee: false,
      registrationFeeAmount: "",
    });
    setBulkBrandModelKey("");
    setBulkCount("1");
    setBulkUnitPrice("");
    setBulkBikeLines([]);
    setPurchaseBikeDetail(null);
    setPurchaseProductDetail(null);
    setPurchaseError(null);
  };

  const closePurchaseModal = () => {
    setPurchaseUser(null);
    setPurchaseForm({
      purchaseType: "BIKE",
      purchaseMode: "SINGLE",
      bikeVehicleId: "",
      inventoryProductId: "",
      quantity: "1",
      finalSellingPrice: "",
      paymentType: "DIRECT",
      downPaymentAmount: "",
      purchaseChannel: "PERSONAL",
      leasingCompanyId: "",
      leasingDownPaymentAmount: "",
      hasRegistrationFee: false,
      registrationFeeAmount: "",
    });
    setBulkBrandModelKey("");
    setBulkCount("1");
    setBulkUnitPrice("");
    setBulkBikeLines([]);
    setPurchaseBikeDetail(null);
    setPurchaseProductDetail(null);
    setPurchaseError(null);
  };

  const loadPurchaseBikeDetail = async (bikeId: number) => {
    setPurchaseLoadingBike(true);
    setPurchaseError(null);
    try {
      const response = await fetch(`${bikeBase}/vehicles/${bikeId}`, { headers: authHeader });
      const payload = await response.json() as { data?: BikeDetail; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load bike details");
      const detail = payload.data as BikeDetail;
      setPurchaseBikeDetail(detail);
      setPurchaseForm((prev) => ({
        ...prev,
        finalSellingPrice: detail.sellingPrice != null ? String(detail.sellingPrice) : prev.finalSellingPrice,
      }));
    } catch (err) {
      setPurchaseError(err instanceof Error ? err.message : "Failed to load bike details");
      setPurchaseBikeDetail(null);
    } finally {
      setPurchaseLoadingBike(false);
    }
  };

  const loadPurchaseProductDetail = async (productId: number) => {
    setPurchaseLoadingBike(true);
    setPurchaseError(null);
    try {
      const response = await fetch(`${bikeBase}/products/${productId}`, { headers: authHeader });
      const payload = await response.json() as { data?: InventoryProductOption; message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to load product details");
      const detail = payload.data as InventoryProductOption;
      setPurchaseProductDetail(detail);
      setPurchaseForm((prev) => ({
        ...prev,
        finalSellingPrice: detail.sellingPrice != null
          ? formatMoneyInput(detail.sellingPrice * parsePositiveInt(prev.quantity, 1))
          : prev.finalSellingPrice,
      }));
    } catch (err) {
      setPurchaseError(err instanceof Error ? err.message : "Failed to load product details");
      setPurchaseProductDetail(null);
    } finally {
      setPurchaseLoadingBike(false);
    }
  };

  const addBulkBikeLine = () => {
    if (!bulkBrandModelKey) {
      setPurchaseError("Please select a brand and model");
      return;
    }

    const requestedCount = Number(bulkCount);
    const selectedGroup = bikeGroupOptions.find((group) => group.key === bulkBrandModelKey) ?? null;
    let unitPrice = Number(bulkUnitPrice);
    if ((!Number.isFinite(unitPrice) || unitPrice <= 0) && selectedGroup?.defaultPrice != null && selectedGroup.defaultPrice > 0) {
      unitPrice = Number(selectedGroup.defaultPrice);
      setBulkUnitPrice(String(selectedGroup.defaultPrice));
    }
    if (!Number.isInteger(requestedCount) || requestedCount <= 0) {
      setPurchaseError("Please enter a valid bike count");
      return;
    }
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      setPurchaseError("Please enter a valid allocated price greater than 0");
      return;
    }
    const registrationFeeAmount = purchaseForm.hasRegistrationFee
      ? Number(purchaseForm.registrationFeeAmount || "0")
      : 0;
    if (purchaseForm.hasRegistrationFee && (!Number.isFinite(registrationFeeAmount) || registrationFeeAmount <= 0)) {
      setPurchaseError("Please enter a valid registration fee amount");
      return;
    }

    const [brandName, modelName] = bulkBrandModelKey.split("__");
    const usedBikeIds = new Set(bulkBikeLines.flatMap((line) => line.bikeIds));
    const matchingBikes = availableBikeOptions.filter((bike) => (
      bike.brandName === brandName
      && bike.modelName === modelName
      && !usedBikeIds.has(bike.id)
    ));

    if (matchingBikes.length < requestedCount) {
      setPurchaseError(`Not available for requested count. Available amount for ${brandName} ${modelName}: ${matchingBikes.length}`);
      return;
    }

    const selected = matchingBikes.slice(0, requestedCount);
    const subtotal = Math.round(unitPrice * requestedCount * 100) / 100;
    const key = `${brandName}__${modelName}__${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    setBulkBikeLines((prev) => [
      ...prev,
      {
        key,
        brandName,
        modelName,
        unitPrice,
        quantity: requestedCount,
        subtotal,
        hasRegistrationFee: purchaseForm.hasRegistrationFee,
        registrationFeeAmount: purchaseForm.hasRegistrationFee ? registrationFeeAmount : 0,
        registrationFeeSubtotal: purchaseForm.hasRegistrationFee
          ? Math.round(registrationFeeAmount * requestedCount * 100) / 100
          : 0,
        bikeIds: selected.map((bike) => bike.id),
      },
    ]);
    setBulkBrandModelKey("");
    setBulkCount("1");
    setPurchaseError(null);
  };

  const removeBulkBikeLine = (key: string) => {
    setBulkBikeLines((prev) => prev.filter((line) => line.key !== key));
  };

  const allocateDownPayments = (lineItems: Array<{ bikeId: number; unitPrice: number }>, totalDownPayment: number) => {
    if (lineItems.length === 0) {
      return [] as Array<{ bikeId: number; unitPrice: number; downPayment: number }>;
    }

    const totalPrice = lineItems.reduce((sum, item) => sum + item.unitPrice, 0);
    const targetCents = Math.round(totalDownPayment * 100);

    if (totalPrice <= 0) {
      const base = Math.floor(targetCents / lineItems.length);
      const remainder = targetCents % lineItems.length;
      return lineItems.map((item, index) => ({
        ...item,
        downPayment: (base + (index < remainder ? 1 : 0)) / 100,
      }));
    }

    const provisional = lineItems.map((item, index) => {
      const raw = (targetCents * item.unitPrice) / totalPrice;
      const floor = Math.floor(raw);
      return { index, floor, fraction: raw - floor };
    });

    let allocated = provisional.reduce((sum, item) => sum + item.floor, 0);
    let remaining = targetCents - allocated;
    provisional.sort((a, b) => b.fraction - a.fraction);
    for (let i = 0; i < provisional.length && remaining > 0; i += 1) {
      provisional[i].floor += 1;
      remaining -= 1;
    }

    const centsByIndex = new Map<number, number>(provisional.map((item) => [item.index, item.floor]));
    return lineItems.map((item, index) => ({
      ...item,
      downPayment: (centsByIndex.get(index) ?? 0) / 100,
    }));
  };

  const handlePurchaseSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!purchaseUser) return;
    if (
      purchaseForm.purchaseType === "BIKE"
      && purchaseForm.purchaseMode === "SINGLE"
      && purchaseForm.bikeVehicleId === ""
    ) {
      setPurchaseError("Please select a bike");
      return;
    }
    if (purchaseForm.purchaseType === "INVENTORY" && purchaseForm.inventoryProductId === "") {
      setPurchaseError("Please select an inventory product");
      return;
    }

    const quantity = Number(purchaseForm.quantity || "1");
    if (purchaseForm.purchaseType === "INVENTORY" && (!Number.isInteger(quantity) || quantity <= 0)) {
      setPurchaseError("Please enter a valid quantity");
      return;
    }

    if (purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "BULK" && bulkBikeLines.length === 0) {
      setPurchaseError("Please add at least one bulk bike line");
      return;
    }

    const finalPrice = Number(purchaseForm.finalSellingPrice);
    if (
      !(purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "BULK")
      && (!Number.isFinite(finalPrice) || finalPrice < 0)
    ) {
      setPurchaseError("Please enter a valid final selling price");
      return;
    }

    const effectiveTotalPrice = (
      purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "BULK"
    ) ? bulkBikeTotal : finalPrice;

    const downPayment = Number(purchaseForm.downPaymentAmount || "0");
    const leasingDownPayment = Number(purchaseForm.leasingDownPaymentAmount || "0");
    const registrationFee = Number(purchaseForm.registrationFeeAmount || "0");
    if (
      purchaseForm.purchaseType === "BIKE"
      && purchaseForm.purchaseMode === "SINGLE"
      && purchaseForm.hasRegistrationFee
      && (!Number.isFinite(registrationFee) || registrationFee <= 0)
    ) {
      setPurchaseError("Please enter a valid registration fee amount");
      return;
    }
    if (purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseChannel === "LEASING") {
      if (purchaseForm.leasingCompanyId === "") {
        setPurchaseError("Please select a leasing company");
        return;
      }
      if (!Number.isFinite(leasingDownPayment) || leasingDownPayment < 0) {
        setPurchaseError("Please enter a valid leasing downpayment amount");
        return;
      }
      if (leasingDownPayment > effectiveTotalPrice) {
        setPurchaseError("Leasing downpayment amount cannot exceed final selling price");
        return;
      }
    }

    if (purchaseForm.purchaseChannel !== "LEASING" && purchaseForm.paymentType === "DOWNPAYMENT") {
      if (!Number.isFinite(downPayment) || downPayment <= 0) {
        setPurchaseError("Please enter a valid downpayment amount");
        return;
      }
      if (downPayment > effectiveTotalPrice) {
        setPurchaseError("Downpayment amount cannot exceed final selling price");
        return;
      }
    }

    setPurchaseSaving(true);
    setPurchaseError(null);
    try {
      if (purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "BULK") {
        const invoiceGroupCode = `BULK-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const lineItems = bulkBikeLines.flatMap((line) => line.bikeIds.map((bikeId) => ({
          bikeId,
          unitPrice: line.unitPrice,
          hasRegistrationFee: line.hasRegistrationFee,
          registrationFeeAmount: line.registrationFeeAmount,
        })));
        const effectiveDownPayment = purchaseForm.purchaseChannel === "LEASING"
          ? leasingDownPayment
          : (purchaseForm.paymentType === "DIRECT" ? bulkBikeTotal : downPayment);
        const allocations = allocateDownPayments(lineItems, effectiveDownPayment);

        for (const line of allocations) {
          const registrationForBike = lineItems.find((item) => item.bikeId === line.bikeId);
          const response = await fetch(`${base}/${purchaseUser.id}/purchases`, {
            method: "POST",
            headers: { ...authHeader, "Content-Type": "application/json" },
            body: JSON.stringify({
              purchaseType: "BIKE",
              purchaseMode: "BULK",
              invoiceGroupCode,
              bikeVehicleId: line.bikeId,
              finalSellingPrice: line.unitPrice,
              purchaseChannel: purchaseForm.purchaseChannel,
              leasingCompanyId: purchaseForm.purchaseChannel === "LEASING" ? purchaseForm.leasingCompanyId : undefined,
              leasingDownPaymentAmount: purchaseForm.purchaseChannel === "LEASING" ? line.downPayment : undefined,
              paymentType: purchaseForm.purchaseChannel === "LEASING" ? "DIRECT" : purchaseForm.paymentType,
              downPaymentAmount: purchaseForm.purchaseChannel === "LEASING"
                ? undefined
                : (purchaseForm.paymentType === "DOWNPAYMENT" ? line.downPayment : undefined),
              hasRegistrationFee: registrationForBike?.hasRegistrationFee ?? false,
              registrationFeeAmount: registrationForBike?.registrationFeeAmount ?? 0,
            }),
          });

          const payload = await response.json() as { message?: string };
          if (!response.ok) throw new Error(payload.message ?? "Failed to create bulk purchase");
        }

        setSuccess("Bulk purchase created successfully");
        closePurchaseModal();
        await loadInitialData();
        return;
      }

      const response = await fetch(`${base}/${purchaseUser.id}/purchases`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseType: purchaseForm.purchaseType,
          purchaseMode: "SINGLE",
          bikeVehicleId: purchaseForm.purchaseType === "BIKE" ? purchaseForm.bikeVehicleId : undefined,
          inventoryProductId: purchaseForm.purchaseType === "INVENTORY" ? purchaseForm.inventoryProductId : undefined,
          quantity: purchaseForm.purchaseType === "INVENTORY" ? quantity : undefined,
          finalSellingPrice: finalPrice,
          purchaseChannel: purchaseForm.purchaseType === "BIKE" ? purchaseForm.purchaseChannel : "PERSONAL",
          leasingCompanyId: purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseChannel === "LEASING"
            ? purchaseForm.leasingCompanyId
            : undefined,
          leasingDownPaymentAmount: purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseChannel === "LEASING"
            ? leasingDownPayment
            : undefined,
          paymentType: purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseChannel === "LEASING"
            ? "DIRECT"
            : purchaseForm.paymentType,
          downPaymentAmount: purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseChannel === "LEASING"
            ? undefined
            : (purchaseForm.paymentType === "DOWNPAYMENT" ? downPayment : undefined),
          hasRegistrationFee: purchaseForm.purchaseType === "BIKE" ? purchaseForm.hasRegistrationFee : false,
          registrationFeeAmount: purchaseForm.purchaseType === "BIKE" && purchaseForm.hasRegistrationFee ? registrationFee : undefined,
        }),
      });

      const payload = await response.json() as { message?: string };
      if (!response.ok) throw new Error(payload.message ?? "Failed to create purchase");

      setSuccess("Purchase created successfully");
      closePurchaseModal();
      await loadInitialData();
    } catch (err) {
      setPurchaseError(err instanceof Error ? err.message : "Failed to create purchase");
    } finally {
      setPurchaseSaving(false);
    }
  };

  return (
    <div className="bm-page">
      <div className="bm-page-header">
        <div className="page-title-row">
          <div className="page-title-icon"><IconUsers /></div>
          <div>
            <h2 className="page-title">User Management</h2>
            <p className="page-subtitle">Add and manage users with profile details, address, and dream bike preferences.</p>
          </div>
        </div>
      </div>

      <div className="bm-manage-tabs">
        <button className={`bm-tab-btn ${activeTab === "users" ? "active" : ""}`} onClick={() => router.push("/dashboard/users")}>Users</button>
        <button className={`bm-tab-btn ${activeTab === "history" ? "active" : ""}`} onClick={() => router.push("/dashboard/users/history")}>
          <IconClock />
          User History
        </button>
      </div>

      {error && !showFormModal && <div className="bm-alert bm-alert-error">{error}</div>}
      {success && <div className="bm-alert bm-alert-success">{success}</div>}

      <div className="bm-stats-grid" style={{ marginBottom: "1rem" }}>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconUsers /></span><span className="bm-stat-label">Total Users</span></div>
          <strong className="bm-stat-value">{totalUsers}</strong>
          <span className="bm-stat-sub">Registered user records</span>
        </div>
        <div className="bm-stat-card">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconBike /></span><span className="bm-stat-label">Users With Dream Bikes</span></div>
          <strong className="bm-stat-value">{usersWithDreamBikes}</strong>
          <span className="bm-stat-sub">Users who selected at least one bike</span>
        </div>
        <div className="bm-stat-card bm-stat-card-soft">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconInvoice /></span><span className="bm-stat-label">Dream Bike Selections</span></div>
          <strong className="bm-stat-value">{totalDreamSelections}</strong>
          <span className="bm-stat-sub">Total saved dream bike links</span>
        </div>
        <div className="bm-stat-card">
          <div className="bm-stat-head"><span className="bm-stat-icon"><IconActivity /></span><span className="bm-stat-label">Available Dream Bikes</span></div>
          <strong className="bm-stat-value">{availableDreamBikes}</strong>
          <span className="bm-stat-sub">Currently available in bike inventory</span>
        </div>
      </div>

      {activeTab === "history" && (
        <div className="bm-table-card">
          <div className="users-history-toolbar">
            <h3 className="users-section-title" style={{ margin: 0 }}>User Purchase History</h3>
            <div className="users-history-toolbar-actions">
              <input
                className="bm-input"
                style={{ minWidth: 320 }}
                placeholder="Search by customer, NIC, bike/product ID, brand, model or product name"
                value={historySearch}
                onChange={(event) => setHistorySearch(event.target.value)}
              />
              <button type="button" className="btn-outline" onClick={() => void loadPurchaseHistory()}>Refresh</button>
            </div>
          </div>

          {historyError && <div className="bm-alert bm-alert-error" style={{ margin: "1rem" }}>{historyError}</div>}

          <div className="data-table-wrap">
            <table className="data-table users-orders-table">
              <thead>
                <tr>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Final Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {historyLoading && <tr><td colSpan={8} className="bm-table-empty">Loading purchase history...</td></tr>}
                {!historyLoading && historyInvoiceRows.length === 0 && <tr><td colSpan={8} className="bm-table-empty">No purchase history records found.</td></tr>}
                {!historyLoading && historyInvoiceRows.map((row) => (
                  <tr key={row.key}>
                    <td><span className="users-order-code">{row.invoiceLabel}</span></td>
                    <td>
                      <div className="users-order-date">{new Date(row.purchasedAt).toLocaleDateString()}</div>
                      <div className="users-order-time">{new Date(row.purchasedAt).toLocaleTimeString()}</div>
                    </td>
                    <td>
                      <div className="users-order-title">{row.representative.customer.firstName} {row.representative.customer.lastName}</div>
                      <span className="users-muted">{row.representative.customer.mobileNumber}</span>
                    </td>
                    <td>
                      <div className="users-order-title">{row.itemTitle}</div>
                      <span className="users-order-item-meta">{row.itemSubtitle}</span>
                      <span className="users-muted" style={{ display: "block" }}>{row.purchaseMode === "BULK" ? "Bulk" : "Single"} • {row.paymentTypeText}</span>
                    </td>
                    <td>{row.quantity}</td>
                    <td><span className="users-order-price">Rs. {row.finalSellingPrice.toLocaleString()}</span></td>
                    <td>
                      <span className={`badge ${row.settlementStatus === "TO_SETTLE" ? "badge-pending" : "badge-active"}`}>
                        {row.statusText}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button type="button" className="btn-outline" onClick={() => void openInvoiceModal(row.representative)}>View</button>
                        {row.remainingAmount > 0 && (
                          <button type="button" className="btn-accent" onClick={() => openSettleModal(row.representative)}>Settle</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <>
          <div className="bm-table-card">
            <div style={{ padding: "1rem", borderBottom: "1px solid var(--panel-border)", display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
              <h3 className="users-section-title" style={{ margin: 0 }}>Users</h3>
              <div style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
                <button type="button" className="btn-accent" onClick={openAddUserModal}>Add User</button>
                <button type="button" className="btn-outline" onClick={() => void loadInitialData()}>Refresh</button>
              </div>
            </div>

            <div className="data-table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Mobile</th>
                    <th>Province / District</th>
                    <th>Dream Bikes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td colSpan={6} className="bm-table-empty">Loading users...</td></tr>}
                  {!loading && users.length === 0 && <tr><td colSpan={6} className="bm-table-empty">No users found.</td></tr>}
                  {!loading && users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div>{user.firstName} {user.lastName}</div>
                        <small className="users-muted">{user.email || "No email"}</small>
                      </td>
                      <td>{user.nic}</td>
                      <td>{user.mobileNumber}</td>
                      <td>{user.province} / {user.district}</td>
                      <td>{user.dreamBikes.length}</td>
                      <td>
                        <div className="users-row-actions">
                          <button type="button" className="btn-outline" onClick={() => setViewUser(user)}>View</button>
                          <button type="button" className="btn-outline" onClick={() => openOrdersModal(user)}>View Orders</button>
                          <button type="button" className="btn-accent" onClick={() => openPurchaseModal(user)}>Purchase</button>
                          <button type="button" className="btn-outline" onClick={() => handleEdit(user)}>Edit</button>
                          <button type="button" className="bm-btn-danger" onClick={() => void handleDelete(user)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {showFormModal && (
        <div className="bm-modal-backdrop" onClick={resetForm}>
          <form onSubmit={handleSaveUser} className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="bm-modal-close" onClick={resetForm}>x</button>
            <h3 className="bm-modal-title">{editingUserId ? "Edit User" : "Add New User"}</h3>
            {formGeneralError && <div className="bm-alert bm-alert-error">{formGeneralError}</div>}
            <div className="users-form-grid">
              <div className="bm-field-group">
                <label>First Name</label>
                <input className={`bm-input ${formFieldErrors.firstName ? "users-input-error" : ""}`} value={form.firstName} onChange={(e) => { setForm((prev) => ({ ...prev, firstName: e.target.value })); setFormFieldErrors((prev) => ({ ...prev, firstName: undefined })); }} required />
                {formFieldErrors.firstName && <span className="users-field-error">{formFieldErrors.firstName}</span>}
              </div>
              <div className="bm-field-group">
                <label>Last Name</label>
                <input className={`bm-input ${formFieldErrors.lastName ? "users-input-error" : ""}`} value={form.lastName} onChange={(e) => { setForm((prev) => ({ ...prev, lastName: e.target.value })); setFormFieldErrors((prev) => ({ ...prev, lastName: undefined })); }} required />
                {formFieldErrors.lastName && <span className="users-field-error">{formFieldErrors.lastName}</span>}
              </div>
              <div className="bm-field-group">
                <label>NIC</label>
                <input className={`bm-input ${formFieldErrors.nic ? "users-input-error" : ""}`} value={form.nic} onChange={(e) => { setForm((prev) => ({ ...prev, nic: e.target.value })); setFormFieldErrors((prev) => ({ ...prev, nic: undefined })); }} required />
                {formFieldErrors.nic && <span className="users-field-error">{formFieldErrors.nic}</span>}
              </div>
              <div className="bm-field-group">
                <label>Mobile Number</label>
                <input className={`bm-input ${formFieldErrors.mobileNumber ? "users-input-error" : ""}`} value={form.mobileNumber} onChange={(e) => { setForm((prev) => ({ ...prev, mobileNumber: e.target.value })); setFormFieldErrors((prev) => ({ ...prev, mobileNumber: undefined })); }} required />
                {formFieldErrors.mobileNumber && <span className="users-field-error">{formFieldErrors.mobileNumber}</span>}
              </div>
              <div className="bm-field-group">
                <label>Email (Optional)</label>
                <input type="email" className={`bm-input ${formFieldErrors.email ? "users-input-error" : ""}`} value={form.email} onChange={(e) => { setForm((prev) => ({ ...prev, email: e.target.value })); setFormFieldErrors((prev) => ({ ...prev, email: undefined })); }} />
                {formFieldErrors.email && <span className="users-field-error">{formFieldErrors.email}</span>}
              </div>
              <div className="bm-field-group">
                <label>Province</label>
                <select className={`bm-input ${formFieldErrors.province ? "users-input-error" : ""}`} value={form.province} onChange={(e) => handleProvinceChange(e.target.value)} required>
                  <option value="">Select province</option>
                  {provinces.map((province) => <option key={province.name} value={province.name}>{province.name}</option>)}
                </select>
                {formFieldErrors.province && <span className="users-field-error">{formFieldErrors.province}</span>}
              </div>
              <div className="bm-field-group">
                <label>District</label>
                <select className={`bm-input ${formFieldErrors.district ? "users-input-error" : ""}`} value={form.district} onChange={(e) => { setForm((prev) => ({ ...prev, district: e.target.value })); setFormFieldErrors((prev) => ({ ...prev, district: undefined })); }} required disabled={!form.province}>
                  <option value="">Select district</option>
                  {districtsForProvince.map((district) => <option key={district} value={district}>{district}</option>)}
                </select>
                {formFieldErrors.district && <span className="users-field-error">{formFieldErrors.district}</span>}
              </div>
              <div className="bm-field-group users-span-2">
                <label>Address</label>
                <textarea className={`bm-input users-textarea ${formFieldErrors.address ? "users-input-error" : ""}`} value={form.address} onChange={(e) => { setForm((prev) => ({ ...prev, address: e.target.value })); setFormFieldErrors((prev) => ({ ...prev, address: undefined })); }} required />
                {formFieldErrors.address && <span className="users-field-error">{formFieldErrors.address}</span>}
              </div>
            </div>

            <div className="users-dream-bikes-wrap">
              <label className="users-label">Dream Bikes</label>
              <input className="bm-input" placeholder="Search bikes by display ID, brand, model or color" value={dreamBikeSearch} onChange={(e) => setDreamBikeSearch(e.target.value)} />
              <div className="users-bike-list">
                {filteredBikeOptions.map((bike) => {
                  const checked = form.dreamBikeIds.includes(bike.id);
                  return (
                    <label key={bike.id} className={`users-bike-option ${checked ? "checked" : ""}`}>
                      <input type="checkbox" checked={checked} onChange={() => toggleDreamBike(bike.id)} />
                      <span>
                        {bike.displayId} | {bike.brandName} {bike.modelName} ({bike.colour})
                        <em className={`users-availability ${bike.availability === "available" ? "ok" : "warn"}`}>
                          {bike.availability === "available" ? "Available" : "Not Available"}
                        </em>
                      </span>
                    </label>
                  );
                })}
                {filteredBikeOptions.length === 0 && <p className="users-muted">No bikes found for the current search.</p>}
              </div>
              {formFieldErrors.dreamBikeIds && <span className="users-field-error">{formFieldErrors.dreamBikeIds}</span>}
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button type="submit" className="btn-accent" disabled={saving}>{saving ? "Saving..." : editingUserId ? "Update User" : "Add User"}</button>
              <button type="button" className="btn-outline" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {viewUser && (
        <div className="bm-modal-backdrop" onClick={() => setViewUser(null)}>
          <div className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close" onClick={() => setViewUser(null)}>x</button>
            <h3 className="bm-modal-title">{viewUser.firstName} {viewUser.lastName}</h3>
            <div className="users-view-grid">
              <div><strong>NIC:</strong> {viewUser.nic}</div>
              <div><strong>Mobile:</strong> {viewUser.mobileNumber}</div>
              <div><strong>Email:</strong> {viewUser.email || "No email"}</div>
              <div><strong>Province / District:</strong> {viewUser.province} / {viewUser.district}</div>
              <div className="users-span-2"><strong>Address:</strong> {viewUser.address}</div>
            </div>

            <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Dream Bikes</h4>
            <div className="users-bike-chips">
              {viewUser.dreamBikes.map((bike) => (
                <button type="button" key={bike.relationId} className="users-bike-chip" onClick={() => void openBikeModal(bike.bikeId)}>
                  {bike.displayId} | {bike.brandName} {bike.modelName}
                  <span className={`users-availability ${bike.availability === "available" ? "ok" : "warn"}`}>
                    {bike.availability === "available" ? "Available" : "Not Available"}
                  </span>
                </button>
              ))}
              {viewUser.dreamBikes.length === 0 && <p className="users-muted">No dream bikes added.</p>}
            </div>
          </div>
        </div>
      )}

      {bikeModalOpen && (
        <div className="bm-modal-backdrop" onClick={() => setBikeModalOpen(false)}>
          <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
            <button className="bm-modal-close" onClick={() => setBikeModalOpen(false)}>x</button>
            <h3 className="bm-modal-title">Dream Bike Details</h3>
            {bikeLoading && <p className="users-muted">Loading bike details...</p>}
            {!bikeLoading && bikeDetail && (
              <div className="users-bike-detail">
                {bikeDetail.images && bikeDetail.images.length > 0 && (
                  <img
                    className="users-bike-image"
                    src={`${API_URL}${(bikeDetail.images.find((img) => img.isPrimary) ?? bikeDetail.images[0]).url}`}
                    alt={`${bikeDetail.brand.name} ${bikeDetail.model.name}`}
                  />
                )}
                <p><strong>ID:</strong> {bikeDetail.displayId}</p>
                <p><strong>Model:</strong> {bikeDetail.brand.name} {bikeDetail.model.name}</p>
                <p><strong>Color:</strong> {bikeDetail.colour}</p>
                <p><strong>Year:</strong> {bikeDetail.year ?? "-"}</p>
                <p><strong>Availability:</strong> {bikeDetail.status === "available" ? "Available" : "Not Available"}</p>
                <p><strong>Selling Price:</strong> {bikeDetail.sellingPrice != null ? `Rs. ${bikeDetail.sellingPrice.toLocaleString()}` : "-"}</p>
                {bikeDetail.description && <p><strong>Description:</strong> {bikeDetail.description}</p>}
              </div>
            )}
          </div>
        </div>
      )}

      {purchaseUser && (
        <div className="bm-modal-backdrop" onClick={closePurchaseModal}>
          <form className="bm-modal bm-modal-lg" onClick={(e) => e.stopPropagation()} onSubmit={handlePurchaseSubmit}>
            <button type="button" className="bm-modal-close" onClick={closePurchaseModal}>x</button>
            <h3 className="bm-modal-title">Create Purchase</h3>
            {purchaseError && <div className="bm-alert bm-alert-error">{purchaseError}</div>}

            <div className="users-view-grid" style={{ marginBottom: "1rem" }}>
              <div><strong>User:</strong> {purchaseUser.firstName} {purchaseUser.lastName}</div>
              <div><strong>NIC:</strong> {purchaseUser.nic}</div>
              <div><strong>Mobile:</strong> {purchaseUser.mobileNumber}</div>
              <div><strong>Province / District:</strong> {purchaseUser.province} / {purchaseUser.district}</div>
            </div>

            <div className="users-form-grid">
              <div className="bm-field-group users-span-2">
                <label>Purchase Type</label>
                <select
                  className="bm-input"
                  value={purchaseForm.purchaseType}
                  onChange={(e) => {
                    const type = e.target.value as "BIKE" | "INVENTORY";
                    setPurchaseForm((prev) => ({
                      ...prev,
                      purchaseType: type,
                      purchaseMode: "SINGLE",
                      bikeVehicleId: "",
                      inventoryProductId: "",
                      quantity: "1",
                      finalSellingPrice: "",
                      paymentType: "DIRECT",
                      downPaymentAmount: "",
                      purchaseChannel: "PERSONAL",
                      leasingCompanyId: "",
                      leasingDownPaymentAmount: "",
                      hasRegistrationFee: false,
                      registrationFeeAmount: "",
                    }));
                    setBulkBrandModelKey("");
                    setBulkCount("1");
                    setBulkUnitPrice("");
                    setBulkBikeLines([]);
                    setPurchaseBikeDetail(null);
                    setPurchaseProductDetail(null);
                    setPurchaseError(null);
                  }}
                >
                  <option value="BIKE">Bike</option>
                  <option value="INVENTORY">Inventory Product</option>
                </select>
              </div>

              {purchaseForm.purchaseType === "BIKE" && (
                <div className="bm-field-group users-span-2">
                  <label>Purchase Option</label>
                  <select
                    className="bm-input"
                    value={purchaseForm.purchaseMode}
                    onChange={(e) => {
                      const mode = e.target.value as "SINGLE" | "BULK";
                      setPurchaseForm((prev) => ({
                        ...prev,
                        purchaseMode: mode,
                        bikeVehicleId: "",
                        finalSellingPrice: "",
                      }));
                      setPurchaseBikeDetail(null);
                      if (mode === "SINGLE") {
                        setBulkBikeLines([]);
                        setBulkBrandModelKey("");
                        setBulkCount("1");
                        setBulkUnitPrice("");
                      }
                      setPurchaseError(null);
                    }}
                  >
                    <option value="SINGLE">Single Purchase</option>
                    <option value="BULK">Bulk Purchase</option>
                  </select>
                </div>
              )}

              {purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "SINGLE" && (
                <div className="bm-field-group users-span-2">
                  <label>Select Bike</label>
                  <select
                    className="bm-input"
                    value={purchaseForm.bikeVehicleId}
                    onChange={(e) => {
                      const value = e.target.value;
                      const bikeVehicleId = value ? Number(value) : "";
                      setPurchaseForm((prev) => ({ ...prev, bikeVehicleId }));
                      if (bikeVehicleId !== "") {
                        void loadPurchaseBikeDetail(bikeVehicleId);
                      } else {
                        setPurchaseBikeDetail(null);
                      }
                    }}
                    required
                  >
                    <option value="">Select available bike</option>
                    {availableBikeOptions.map((bike) => (
                      <option key={bike.id} value={bike.id}>{bike.displayId} | {bike.brandName} {bike.modelName} ({bike.colour})</option>
                    ))}
                  </select>
                </div>
              )}

              {purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "BULK" && (
                <>
                  <div className="bm-field-group">
                    <label>Brand + Model</label>
                    <select className="bm-input" value={bulkBrandModelKey} onChange={(e) => setBulkBrandModelKey(e.target.value)}>
                      <option value="">Select brand and model</option>
                      {bikeGroupOptionsWithRemaining.map((group) => (
                        <option key={group.key} value={group.key}>
                          {group.brandName} {group.modelName} (Available now: {group.remainingCount}, Added: {group.usedCount}, Sold: {group.soldCount})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="bm-field-group">
                    <label>Bike Count</label>
                    <input className="bm-input" type="number" min={1} value={bulkCount} onChange={(e) => setBulkCount(e.target.value)} />
                    {selectedBulkGroup && selectedBulkRequestedCount > selectedBulkRemainingCount && (
                      <span className="users-field-error">Not available. Available amount: {selectedBulkRemainingCount}</span>
                    )}
                    {selectedBulkGroup && selectedBulkRequestedCount > 0 && selectedBulkRequestedCount <= selectedBulkRemainingCount && (
                      <span className="users-muted">Available amount: {selectedBulkRemainingCount}</span>
                    )}
                  </div>
                  <div className="bm-field-group">
                    <label>Allocated Price (Per Bike)</label>
                    <input className="bm-input" type="number" min={0} step="0.01" value={bulkUnitPrice} onChange={(e) => setBulkUnitPrice(e.target.value)} />
                    {selectedBulkGroup?.defaultPrice != null && selectedBulkGroup.defaultPrice > 0 && (
                      <span className="users-muted">Default selling price: Rs. {selectedBulkGroup.defaultPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="bm-field-group">
                    <label>Registration Needed</label>
                    <select
                      className="bm-input"
                      value={purchaseForm.hasRegistrationFee ? "yes" : "no"}
                      onChange={(e) => {
                        const enabled = e.target.value === "yes";
                        setPurchaseForm((prev) => ({
                          ...prev,
                          hasRegistrationFee: enabled,
                          registrationFeeAmount: enabled ? prev.registrationFeeAmount : "",
                        }));
                      }}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="bm-field-group">
                    <label>Registration Fee (Per Bike)</label>
                    <input
                      className="bm-input"
                      type="number"
                      min={0}
                      step="0.01"
                      value={purchaseForm.registrationFeeAmount}
                      onChange={(e) => setPurchaseForm((prev) => ({ ...prev, registrationFeeAmount: e.target.value }))}
                      disabled={!purchaseForm.hasRegistrationFee}
                    />
                  </div>
                  <div className="bm-field-group" style={{ display: "flex", alignItems: "end" }}>
                    <button type="button" className="btn-accent" onClick={addBulkBikeLine}>Apply</button>
                  </div>

                  <div className="bm-field-group users-span-2">
                    <label>Added Bike List</label>
                    <p className="users-muted" style={{ marginTop: 0 }}>You can add multiple lines with different brands and models in the same bulk invoice.</p>
                    {bulkBikeLines.length === 0 && <p className="users-muted">No bulk items added yet.</p>}
                    {bulkBikeLines.length > 0 && (
                      <div className="data-table-wrap" style={{ marginTop: 8 }}>
                        <table className="data-table users-orders-table">
                          <thead>
                            <tr>
                              <th>Brand</th>
                              <th>Model</th>
                              <th>Count</th>
                              <th>Allocated Price</th>
                              <th>Reg Fee</th>
                              <th>Subtotal</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bulkBikeLines.map((line) => (
                              <tr key={line.key}>
                                <td>{line.brandName}</td>
                                <td>{line.modelName}</td>
                                <td>{line.quantity}</td>
                                <td>Rs. {line.unitPrice.toLocaleString()}</td>
                                <td>{line.hasRegistrationFee ? `Rs. ${line.registrationFeeSubtotal.toLocaleString()}` : "-"}</td>
                                <td>Rs. {line.subtotal.toLocaleString()}</td>
                                <td>
                                  <button type="button" className="btn-outline" onClick={() => removeBulkBikeLine(line.key)}>Remove</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="bm-field-group users-span-2">
                    <label>Bikes Assigned To This User</label>
                    {selectedBulkBikes.length === 0 && <p className="users-muted">No bikes selected yet.</p>}
                    {selectedBulkBikes.length > 0 && (
                      <div className="data-table-wrap" style={{ marginTop: 8 }}>
                        <table className="data-table users-orders-table">
                          <thead>
                            <tr>
                              <th>Bike ID</th>
                              <th>Brand</th>
                              <th>Model</th>
                              <th>Colour</th>
                              <th>Selling Count</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedBulkBikes.map((bike) => {
                              const soldCountForModel = bikeGroupOptions.find((group) => (
                                group.brandName === bike.brandName && group.modelName === bike.modelName
                              ))?.soldCount ?? 0;
                              return (
                                <tr key={bike.id}>
                                  <td>{bike.displayId}</td>
                                  <td>{bike.brandName}</td>
                                  <td>{bike.modelName}</td>
                                  <td>{bike.colour}</td>
                                  <td>{soldCountForModel}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}

              {purchaseForm.purchaseType === "INVENTORY" && (
                <>
                  <div className="bm-field-group users-span-2">
                    <label>Select Inventory Product</label>
                    <select
                      className="bm-input"
                      value={purchaseForm.inventoryProductId}
                      onChange={(e) => {
                        const value = e.target.value;
                        const inventoryProductId = value ? Number(value) : "";
                        setPurchaseForm((prev) => ({ ...prev, inventoryProductId }));
                        if (inventoryProductId !== "") {
                          void loadPurchaseProductDetail(inventoryProductId);
                        } else {
                          setPurchaseProductDetail(null);
                        }
                      }}
                      required
                    >
                      <option value="">Select available inventory product</option>
                      {inventoryOptions.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.displayId} | {product.name} ({product.brand.name}) - Stock {product.quantity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bm-field-group">
                    <label>Quantity</label>
                    <input
                      className="bm-input"
                      type="number"
                      min={1}
                      step={1}
                      value={purchaseForm.quantity}
                      onChange={(e) => {
                        const nextQuantityRaw = e.target.value;
                        setPurchaseForm((prev) => {
                          const oldQuantity = parsePositiveInt(prev.quantity, 1);
                          const nextQuantity = parsePositiveInt(nextQuantityRaw, oldQuantity);
                          const oldTotal = Number(prev.finalSellingPrice);
                          const fallbackUnitPrice = purchaseProductDetail?.sellingPrice ?? 0;
                          const inferredUnitPrice = Number.isFinite(oldTotal) && oldTotal > 0
                            ? oldTotal / oldQuantity
                            : fallbackUnitPrice;
                          const nextTotal = inferredUnitPrice > 0 ? inferredUnitPrice * nextQuantity : oldTotal;

                          return {
                            ...prev,
                            quantity: nextQuantityRaw,
                            finalSellingPrice: formatMoneyInput(nextTotal),
                          };
                        });
                      }}
                      required
                    />
                  </div>
                </>
              )}

              {purchaseLoadingBike && <p className="users-muted">Loading selected item details...</p>}

              {purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "SINGLE" && purchaseBikeDetail && (
                <>
                  <div className="bm-field-group"><label>Brand</label><input className="bm-input" value={purchaseBikeDetail.brand.name} readOnly /></div>
                  <div className="bm-field-group"><label>Model</label><input className="bm-input" value={purchaseBikeDetail.model.name} readOnly /></div>
                  <div className="bm-field-group"><label>Display ID</label><input className="bm-input" value={purchaseBikeDetail.displayId} readOnly /></div>
                  <div className="bm-field-group"><label>Current Selling Price</label><input className="bm-input" value={purchaseBikeDetail.sellingPrice != null ? `Rs. ${purchaseBikeDetail.sellingPrice.toLocaleString()}` : "Not set"} readOnly /></div>
                  <div className="bm-field-group"><label>Engine Capacity</label><input className="bm-input" value={purchaseBikeDetail.engineCapacityCc ? `${purchaseBikeDetail.engineCapacityCc} cc` : "-"} readOnly /></div>
                  <div className="bm-field-group"><label>Mileage</label><input className="bm-input" value={purchaseBikeDetail.mileage != null ? `${purchaseBikeDetail.mileage.toLocaleString()} km` : "-"} readOnly /></div>
                  <div className="bm-field-group"><label>Condition</label><input className="bm-input" value={purchaseBikeDetail.condition ?? "-"} readOnly /></div>
                  <div className="bm-field-group"><label>Registration Type</label><input className="bm-input" value={purchaseBikeDetail.registrationType ?? "-"} readOnly /></div>
                  <div className="bm-field-group"><label>Register No</label><input className="bm-input" value={purchaseBikeDetail.registerNo ?? "-"} readOnly /></div>
                  <div className="bm-field-group"><label>File No</label><input className="bm-input" value={purchaseBikeDetail.fileNo ?? "-"} readOnly /></div>
                  <div className="bm-field-group"><label>Chassis No</label><input className="bm-input" value={purchaseBikeDetail.chassisNo ?? "-"} readOnly /></div>
                  <div className="bm-field-group"><label>Engine No</label><input className="bm-input" value={purchaseBikeDetail.engineNo ?? "-"} readOnly /></div>
                  <div className="bm-field-group">
                    <label>Registration Needed</label>
                    <select
                      className="bm-input"
                      value={purchaseForm.hasRegistrationFee ? "yes" : "no"}
                      onChange={(e) => {
                        const enabled = e.target.value === "yes";
                        setPurchaseForm((prev) => ({
                          ...prev,
                          hasRegistrationFee: enabled,
                          registrationFeeAmount: enabled ? prev.registrationFeeAmount : "",
                        }));
                      }}
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div className="bm-field-group">
                    <label>Registration Fee</label>
                    <input
                      className="bm-input"
                      type="number"
                      min={0}
                      step="0.01"
                      value={purchaseForm.registrationFeeAmount}
                      onChange={(e) => setPurchaseForm((prev) => ({ ...prev, registrationFeeAmount: e.target.value }))}
                      disabled={!purchaseForm.hasRegistrationFee}
                    />
                  </div>
                </>
              )}

              {purchaseForm.purchaseType === "INVENTORY" && purchaseProductDetail && (
                <>
                  <div className="bm-field-group"><label>Product</label><input className="bm-input" value={purchaseProductDetail.name} readOnly /></div>
                  <div className="bm-field-group"><label>Display ID</label><input className="bm-input" value={purchaseProductDetail.displayId} readOnly /></div>
                  <div className="bm-field-group"><label>Brand</label><input className="bm-input" value={purchaseProductDetail.brand.name} readOnly /></div>
                  <div className="bm-field-group"><label>Category</label><input className="bm-input" value={purchaseProductDetail.category.name} readOnly /></div>
                  <div className="bm-field-group"><label>Supplier</label><input className="bm-input" value={purchaseProductDetail.supplier ? `${purchaseProductDetail.supplier.name} (${purchaseProductDetail.supplier.code})` : "-"} readOnly /></div>
                  <div className="bm-field-group"><label>In Stock</label><input className="bm-input" value={String(purchaseProductDetail.quantity)} readOnly /></div>
                  <div className="bm-field-group users-span-2"><label>Description</label><textarea className="bm-input users-textarea" value={purchaseProductDetail.description ?? "-"} readOnly /></div>
                  <div className="bm-field-group"><label>Current Selling Price</label><input className="bm-input" value={purchaseProductDetail.sellingPrice != null ? `Rs. ${purchaseProductDetail.sellingPrice.toLocaleString()}` : "Not set"} readOnly /></div>
                </>
              )}

              {!(purchaseForm.purchaseType === "BIKE" && purchaseForm.purchaseMode === "BULK") && (
                <div className="bm-field-group users-span-2">
                  <label>Final Selling Price (Keep or Change)</label>
                  <input
                    className="bm-input"
                    type="number"
                    min={0}
                    step="0.01"
                    value={purchaseForm.finalSellingPrice}
                    onChange={(e) => setPurchaseForm((prev) => ({ ...prev, finalSellingPrice: e.target.value }))}
                    placeholder="Enter final selling price"
                    required
                  />
                </div>
              )}

              {purchaseForm.purchaseType === "BIKE" && (
                <>
                  <div className="bm-field-group">
                    <label>Payment Option</label>
                    <select
                      className="bm-input"
                      value={purchaseForm.purchaseChannel}
                      onChange={(e) => {
                        const channel = e.target.value as "PERSONAL" | "LEASING";
                        setPurchaseForm((prev) => ({
                          ...prev,
                          purchaseChannel: channel,
                          leasingCompanyId: channel === "LEASING" ? prev.leasingCompanyId : "",
                          leasingDownPaymentAmount: channel === "LEASING" ? prev.leasingDownPaymentAmount : "",
                        }));
                      }}
                    >
                      <option value="PERSONAL">Pay Personally</option>
                      <option value="LEASING">Go With Leasing</option>
                    </select>
                  </div>

                  {purchaseForm.purchaseChannel === "PERSONAL" && (
                    <>
                      <div className="bm-field-group">
                        <label>Payment Type</label>
                        <select
                          className="bm-input"
                          value={purchaseForm.paymentType}
                          onChange={(e) => {
                            const paymentType = e.target.value as "DIRECT" | "DOWNPAYMENT";
                            setPurchaseForm((prev) => ({
                              ...prev,
                              paymentType,
                              downPaymentAmount: paymentType === "DIRECT" ? String(purchaseInvoiceTotal) : prev.downPaymentAmount,
                            }));
                          }}
                        >
                          <option value="DIRECT">Direct Buy</option>
                          <option value="DOWNPAYMENT">Downpayment</option>
                        </select>
                      </div>

                      <div className="bm-field-group">
                        <label>Downpayment Amount</label>
                        <input
                          className="bm-input"
                          type="number"
                          min={0}
                          step="0.01"
                          value={purchaseForm.paymentType === "DIRECT" ? String(purchaseInvoiceTotal) : purchaseForm.downPaymentAmount}
                          onChange={(e) => setPurchaseForm((prev) => ({ ...prev, downPaymentAmount: e.target.value }))}
                          disabled={purchaseForm.paymentType === "DIRECT"}
                          required={purchaseForm.paymentType === "DOWNPAYMENT"}
                        />
                      </div>
                    </>
                  )}

                  {purchaseForm.purchaseChannel === "LEASING" && (
                    <>
                      <div className="bm-field-group">
                        <label>Select Leasing Partner</label>
                        <select
                          className="bm-input"
                          value={purchaseForm.leasingCompanyId}
                          onChange={(e) => {
                            const value = e.target.value;
                            setPurchaseForm((prev) => ({ ...prev, leasingCompanyId: value ? Number(value) : "" }));
                          }}
                          required
                        >
                          <option value="">Select leasing company</option>
                          {leasingCompanies.map((company) => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="bm-field-group">
                        <label>Customer Downpayment</label>
                        <input
                          className="bm-input"
                          type="number"
                          min={0}
                          step="0.01"
                          value={purchaseForm.leasingDownPaymentAmount}
                          onChange={(e) => setPurchaseForm((prev) => ({ ...prev, leasingDownPaymentAmount: e.target.value }))}
                        />
                        <span className="users-muted">Remaining amount will be marked under selected leasing company.</span>
                      </div>
                    </>
                  )}
                </>
              )}

              {purchaseForm.purchaseType === "INVENTORY" && (
                <>
                  <div className="bm-field-group">
                    <label>Payment Type</label>
                    <select
                      className="bm-input"
                      value={purchaseForm.paymentType}
                      onChange={(e) => {
                        const paymentType = e.target.value as "DIRECT" | "DOWNPAYMENT";
                        setPurchaseForm((prev) => ({
                          ...prev,
                          paymentType,
                          downPaymentAmount: paymentType === "DIRECT" ? String(purchaseInvoiceTotal) : prev.downPaymentAmount,
                        }));
                      }}
                    >
                      <option value="DIRECT">Direct Buy</option>
                      <option value="DOWNPAYMENT">Downpayment</option>
                    </select>
                  </div>

                  <div className="bm-field-group">
                    <label>Downpayment Amount</label>
                    <input
                      className="bm-input"
                      type="number"
                      min={0}
                      step="0.01"
                      value={purchaseForm.paymentType === "DIRECT" ? String(purchaseInvoiceTotal) : purchaseForm.downPaymentAmount}
                      onChange={(e) => setPurchaseForm((prev) => ({ ...prev, downPaymentAmount: e.target.value }))}
                      disabled={purchaseForm.paymentType === "DIRECT"}
                      required={purchaseForm.paymentType === "DOWNPAYMENT"}
                    />
                  </div>
                </>
              )}

              <div className="bm-field-group">
                <label>Invoice Total</label>
                <input className="bm-input" value={`Rs. ${purchaseInvoiceTotal.toLocaleString()}`} readOnly />
              </div>

              {purchaseForm.purchaseType === "BIKE" && (
                <div className="bm-field-group">
                  <label>Registration Total</label>
                  <input className="bm-input" value={`Rs. ${purchaseRegistrationTotal.toLocaleString()}`} readOnly />
                </div>
              )}

              <div className="bm-field-group">
                <label>Grand Total</label>
                <input className="bm-input" value={`Rs. ${purchaseGrandTotal.toLocaleString()}`} readOnly />
              </div>

              <div className="bm-field-group">
                <label>Remaining To Settle</label>
                <input className="bm-input" value={`Rs. ${purchaseRemainingPreview.toLocaleString()}`} readOnly />
                <span className="users-muted">Auto-calculated as invoice total - downpayment.</span>
              </div>
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button type="submit" className="btn-accent" disabled={purchaseSaving}>{purchaseSaving ? "Saving..." : "Confirm Purchase"}</button>
              <button type="button" className="btn-outline" onClick={closePurchaseModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {ordersUser && (
        <div className="bm-modal-backdrop" onClick={closeOrdersModal}>
          <div className="bm-modal bm-view-modal users-orders-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="bm-modal-close" onClick={closeOrdersModal}>x</button>
            <h3 className="bm-modal-title">Orders - {ordersUser.firstName} {ordersUser.lastName}</h3>

            <div className="users-orders-summary">
              <div className="users-orders-summary-card">
                <span className="users-orders-summary-label">Total Orders</span>
                <strong>{orders.length}</strong>
              </div>
              <div className="users-orders-summary-card">
                <span className="users-orders-summary-label">Bike Orders</span>
                <strong>{ordersBikeCount}</strong>
              </div>
              <div className="users-orders-summary-card">
                <span className="users-orders-summary-label">Inventory Orders</span>
                <strong>{ordersInventoryCount}</strong>
              </div>
              <div className="users-orders-summary-card">
                <span className="users-orders-summary-label">Total Value</span>
                <strong>Rs. {ordersTotalValue.toLocaleString()}</strong>
              </div>
            </div>

            <div className="users-history-toolbar-actions" style={{ marginBottom: "0.5rem" }}>
              <input
                className="bm-input"
                style={{ minWidth: 280 }}
                placeholder="Search this user's orders"
                value={ordersSearch}
                onChange={(event) => setOrdersSearch(event.target.value)}
              />
              <button
                type="button"
                className="btn-outline"
                onClick={() => void loadOrdersForUser(ordersUser.id, ordersSearch)}
              >
                Search
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setOrdersSearch("");
                  void loadOrdersForUser(ordersUser.id, "");
                }}
              >
                Reset
              </button>
            </div>

            {ordersError && <div className="bm-alert bm-alert-error">{ordersError}</div>}

            <div className="data-table-wrap">
              <table className="data-table users-orders-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Final Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersLoading && <tr><td colSpan={7} className="bm-table-empty">Loading orders...</td></tr>}
                  {!ordersLoading && orderInvoiceRows.length === 0 && <tr><td colSpan={7} className="bm-table-empty">No orders found for this user.</td></tr>}
                  {!ordersLoading && orderInvoiceRows.map((row) => (
                    <tr key={row.key}>
                      <td><span className="users-order-code">{row.invoiceLabel}</span></td>
                      <td>
                        <div className="users-order-date">{new Date(row.purchasedAt).toLocaleDateString()}</div>
                        <div className="users-order-time">{new Date(row.purchasedAt).toLocaleTimeString()}</div>
                      </td>
                      <td>
                        <div className="users-order-title">{row.itemTitle}</div>
                        <span className="users-order-item-meta">{row.itemSubtitle}</span>
                        <span className="users-muted" style={{ display: "block" }}>{row.purchaseMode === "BULK" ? "Bulk" : "Single"} • {row.paymentTypeText}</span>
                      </td>
                      <td>{row.quantity}</td>
                      <td><span className="users-order-price">Rs. {row.finalSellingPrice.toLocaleString()}</span></td>
                      <td>
                        <span className={`badge ${row.settlementStatus === "TO_SETTLE" ? "badge-pending" : "badge-active"}`}>
                          {row.statusText}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <button type="button" className="btn-outline" onClick={() => void openInvoiceModal(row.representative)}>View</button>
                          {row.remainingAmount > 0 && (
                            <button type="button" className="btn-accent" onClick={() => openSettleModal(row.representative)}>Settle</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button type="button" className="btn-outline" onClick={closeOrdersModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {selectedHistoryPurchase && (
        <div className="bm-modal-backdrop" onClick={closeInvoiceModal}>
          <div className="bm-modal bm-modal-lg" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="bm-modal-close" onClick={closeInvoiceModal}>x</button>
            <h3 className="bm-modal-title">
              Invoice {selectedInvoiceDisplayCode}
            </h3>
            <p className="users-muted" style={{ marginTop: "-0.5rem", marginBottom: "0.8rem" }}>
              {selectedInvoicePurchaseMode} Invoice • {selectedInvoicePurchaseChannel} • {selectedInvoicePaymentType}
            </p>

            <div className="users-view-grid">
              <div><strong>Date:</strong> {new Date(selectedHistoryPurchase.purchasedAt).toLocaleString()}</div>
              <div><strong>Customer:</strong> {selectedHistoryPurchase.customer.firstName} {selectedHistoryPurchase.customer.lastName}</div>
              <div><strong>NIC:</strong> {selectedHistoryPurchase.customer.nic}</div>
              <div><strong>Mobile:</strong> {selectedHistoryPurchase.customer.mobileNumber}</div>
              <div className="users-span-2"><strong>Address:</strong> {selectedHistoryPurchase.customer.address}, {selectedHistoryPurchase.customer.district}, {selectedHistoryPurchase.customer.province}</div>
            </div>

            {isBulkInvoiceView && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Bulk Contains Bikes</h4>
                <div className="data-table-wrap">
                  <table className="data-table users-orders-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Payment</th>
                        <th>Final Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoiceEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td>
                            <div className="users-order-title">{getPurchaseItemMeta(entry).title}</div>
                            <span className="users-order-item-meta">{getPurchaseItemMeta(entry).subtitle}</span>
                          </td>
                          <td>{entry.quantity}</td>
                          <td>{getPaymentTypeText(entry)}</td>
                          <td>Rs. {entry.finalSellingPrice.toLocaleString()}</td>
                          <td>
                            {getSettlementBadgeText(entry)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: "grid", gap: "0.6rem", marginTop: "0.75rem" }}>
                  {selectedInvoiceEntries.map((entry) => (
                    <div key={`bulk-summary-card-${entry.id}`} className="bm-stat-card bm-stat-card-soft" style={{ padding: "0.7rem" }}>
                      <div className="users-order-title">{getPurchaseItemMeta(entry).title}</div>
                      <div className="users-order-item-meta">{getPurchaseItemMeta(entry).subtitle}</div>
                      <div className="users-muted" style={{ marginTop: "0.2rem" }}>
                        Qty: {entry.quantity} | Payment: {getPaymentTypeText(entry)} | Final: Rs. {entry.finalSellingPrice.toLocaleString()} | {getSettlementBadgeText(entry)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bm-modal-actions" style={{ marginTop: "0.75rem", justifyContent: "flex-start" }}>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => setShowBulkBikeDetails((prev) => !prev)}
                    disabled={bulkBikeDetailEntries.length === 0}
                  >
                    {showBulkBikeDetails ? "Hide All Bike Details" : "View All Bike Details"}
                  </button>
                </div>

                {showBulkBikeDetails && bulkBikeDetailEntries.length > 0 && (
                  <>
                    <h4 className="users-section-title" style={{ marginTop: "0.75rem" }}>All Bikes In This Bulk Invoice</h4>
                    <div className="data-table-wrap">
                      <table className="data-table users-orders-table">
                        <thead>
                          <tr>
                            <th>Bike</th>
                            <th>Year</th>
                            <th>Engine CC</th>
                            <th>Mileage</th>
                            <th>Registration</th>
                            <th>Register No</th>
                            <th>File No</th>
                            <th>Chassis No</th>
                            <th>Engine No</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulkBikeDetailEntries.map((entry) => (
                            <tr key={`bulk-bike-detail-${entry.id}`}>
                              <td>
                                <div className="users-order-title">{entry.bike.brand} {entry.bike.model}</div>
                                <span className="users-order-item-meta">{entry.bike.displayId} • {entry.bike.colour}</span>
                              </td>
                              <td>{entry.bike.year ?? "-"}</td>
                              <td>{entry.bike.engineCapacityCc != null ? `${entry.bike.engineCapacityCc} cc` : "-"}</td>
                              <td>{entry.bike.mileage != null ? `${entry.bike.mileage.toLocaleString()} km` : "-"}</td>
                              <td>{entry.bike.registrationType}</td>
                              <td>{entry.bike.registerNo ?? "-"}</td>
                              <td>{entry.bike.fileNo ?? "-"}</td>
                              <td>{entry.bike.chassisNo ?? "-"}</td>
                              <td>{entry.bike.engineNo ?? "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ display: "grid", gap: "0.6rem", marginTop: "0.75rem" }}>
                      {bulkBikeDetailEntries.map((entry) => (
                        <div key={`bulk-bike-card-${entry.id}`} className="bm-stat-card" style={{ padding: "0.75rem" }}>
                          <div className="users-order-title">{entry.bike.brand} {entry.bike.model} ({entry.bike.displayId})</div>
                          <div className="users-order-item-meta">Colour: {entry.bike.colour} | Year: {entry.bike.year ?? "-"}</div>
                          <div className="users-muted" style={{ marginTop: "0.2rem" }}>
                            Engine CC: {entry.bike.engineCapacityCc != null ? `${entry.bike.engineCapacityCc} cc` : "-"} | Mileage: {entry.bike.mileage != null ? `${entry.bike.mileage.toLocaleString()} km` : "-"}
                          </div>
                          <div className="users-muted">
                            Registration: {entry.bike.registrationType} | Register No: {entry.bike.registerNo ?? "-"} | File No: {entry.bike.fileNo ?? "-"}
                          </div>
                          <div className="users-muted">
                            Chassis No: {entry.bike.chassisNo ?? "-"} | Engine No: {entry.bike.engineNo ?? "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {!isBulkInvoiceView && selectedHistoryPurchase.itemType === "BIKE" && selectedHistoryPurchase.bike && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Bought Bike Details</h4>
                <div className="users-view-grid">
                  <div><strong>Bike ID:</strong> {selectedHistoryPurchase.bike.displayId}</div>
                  <div><strong>Model:</strong> {selectedHistoryPurchase.bike.brand} {selectedHistoryPurchase.bike.model}</div>
                  <div><strong>Colour:</strong> {selectedHistoryPurchase.bike.colour}</div>
                  <div><strong>Year:</strong> {selectedHistoryPurchase.bike.year ?? "-"}</div>
                  <div><strong>Engine Capacity:</strong> {selectedHistoryPurchase.bike.engineCapacityCc ? `${selectedHistoryPurchase.bike.engineCapacityCc} cc` : "-"}</div>
                  <div><strong>Mileage:</strong> {selectedHistoryPurchase.bike.mileage != null ? `${selectedHistoryPurchase.bike.mileage.toLocaleString()} km` : "-"}</div>
                  <div><strong>Condition:</strong> {selectedHistoryPurchase.bike.condition}</div>
                  <div><strong>Registration:</strong> {selectedHistoryPurchase.bike.registrationType}</div>
                  <div><strong>Register No:</strong> {selectedHistoryPurchase.bike.registerNo ?? "-"}</div>
                  <div><strong>File No:</strong> {selectedHistoryPurchase.bike.fileNo ?? "-"}</div>
                  <div><strong>Chassis No:</strong> {selectedHistoryPurchase.bike.chassisNo ?? "-"}</div>
                  <div><strong>Engine No:</strong> {selectedHistoryPurchase.bike.engineNo ?? "-"}</div>
                </div>
              </>
            )}

            {!isBulkInvoiceView && selectedHistoryPurchase.itemType === "INVENTORY" && selectedHistoryPurchase.inventory && (
              <>
                <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Bought Inventory Details</h4>
                <div className="users-view-grid">
                  <div><strong>Product ID:</strong> {selectedHistoryPurchase.inventory.displayId}</div>
                  <div><strong>Product:</strong> {selectedHistoryPurchase.inventory.name}</div>
                  <div><strong>Brand:</strong> {selectedHistoryPurchase.inventory.brand}</div>
                  <div><strong>Category:</strong> {selectedHistoryPurchase.inventory.category}</div>
                  <div><strong>Supplier:</strong> {selectedHistoryPurchase.inventory.supplier ?? "-"}</div>
                  <div><strong>Quantity:</strong> {selectedHistoryPurchase.quantity}</div>
                  <div className="users-span-2"><strong>Description:</strong> {selectedHistoryPurchase.inventory.description ?? "-"}</div>
                </div>
              </>
            )}

            <h4 className="users-section-title" style={{ marginTop: "1rem" }}>Pricing</h4>
            <div className="users-view-grid">
              <div><strong>Purchase Mode:</strong> {selectedInvoicePurchaseMode}</div>
              <div><strong>Purchase Method:</strong> {selectedInvoicePurchaseChannel}</div>
              <div>
                <strong>Current Selling Price:</strong>{" "}
                {isBulkInvoiceView
                  ? `Rs. ${selectedInvoiceCurrentSellingTotal.toLocaleString()}`
                  : selectedHistoryPurchase.currentSellingPrice != null
                    ? `Rs. ${selectedHistoryPurchase.currentSellingPrice.toLocaleString()}`
                    : "-"}
              </div>
              <div><strong>Quantity:</strong> {selectedInvoiceTotals.quantity}</div>
              <div><strong>Final Selling Price:</strong> Rs. {selectedInvoiceTotals.finalSellingPrice.toLocaleString()}</div>
              <div><strong>Payment Type:</strong> {selectedInvoicePaymentType} Buy</div>
              <div><strong>Downpayment:</strong> Rs. {selectedInvoiceTotals.downPaymentAmount.toLocaleString()}</div>
              <div><strong>Leasing Downpayment:</strong> Rs. {selectedInvoiceEntries.reduce((sum, entry) => sum + (entry.leasingDownPaymentAmount ?? 0), 0).toLocaleString()}</div>
              <div><strong>Leasing Amount:</strong> Rs. {selectedInvoiceEntries.reduce((sum, entry) => sum + (entry.leasingFinancedAmount ?? 0), 0).toLocaleString()}</div>
              <div><strong>Registration Fee:</strong> Rs. {selectedInvoiceTotals.registrationFeeAmount.toLocaleString()}</div>
              <div><strong>Grand Total:</strong> Rs. {(selectedInvoiceTotals.finalSellingPrice + selectedInvoiceTotals.registrationFeeAmount).toLocaleString()}</div>
              <div><strong>Remaining Amount:</strong> Rs. {selectedInvoiceTotals.remainingAmount.toLocaleString()}</div>
              <div><strong>Status:</strong> {selectedInvoiceTotals.settlementStatus === "TO_SETTLE" ? "To Settle" : "Settled"}</div>
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              {selectedInvoiceTotals.remainingAmount > 0 && (
                <button type="button" className="btn-accent" onClick={() => openSettleModal(selectedHistoryPurchase)}>Settle Amount</button>
              )}
              <button type="button" className="btn-outline" onClick={closeInvoiceModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {settleTarget && (
        <div className="bm-modal-backdrop" onClick={closeSettleModal}>
          <form className="bm-modal" onClick={(event) => event.stopPropagation()} onSubmit={submitSettlePayment}>
            <button type="button" className="bm-modal-close" onClick={closeSettleModal}>x</button>
            <h3 className="bm-modal-title">Settle Invoice Amount</h3>
            {settleError && <div className="bm-alert bm-alert-error">{settleError}</div>}
            <div className="users-view-grid" style={{ marginBottom: "1rem" }}>
              <div><strong>Invoice:</strong> {settleTarget.invoiceGroupCode || `INV-${String(settleTarget.id).padStart(5, "0")}`}</div>
              <div><strong>Customer:</strong> {settleTarget.customer.firstName} {settleTarget.customer.lastName}</div>
              <div><strong>Remaining To Settle:</strong> Rs. {getInvoiceRemaining(settleTarget).toLocaleString()}</div>
              <div><strong>Payment Type:</strong> {getPaymentTypeText(settleTarget)}</div>
            </div>

            <div className="bm-field-group">
              <label>Settle Amount</label>
              <input
                className="bm-input"
                type="number"
                min={0.01}
                step="0.01"
                value={settleAmount}
                onChange={(event) => setSettleAmount(event.target.value)}
                required
              />
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button type="submit" className="btn-accent" disabled={settleSaving}>{settleSaving ? "Saving..." : "Add Settlement"}</button>
              <button type="button" className="btn-outline" onClick={closeSettleModal}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
