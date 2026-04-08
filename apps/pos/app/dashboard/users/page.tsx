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
  quantity: number;
  currentSellingPrice?: number | null;
  finalSellingPrice: number;
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

type PurchaseFormState = {
  purchaseType: "BIKE" | "INVENTORY";
  bikeVehicleId: number | "";
  inventoryProductId: number | "";
  quantity: string;
  finalSellingPrice: string;
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
    bikeVehicleId: "",
    inventoryProductId: "",
    quantity: "1",
    finalSellingPrice: "",
  });
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
  const [ordersUser, setOrdersUser] = useState<PosUser | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [ordersSearch, setOrdersSearch] = useState("");
  const [orders, setOrders] = useState<PurchaseHistoryEntry[]>([]);

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

  const loadInitialData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const [usersRes, provincesRes, bikesRes, productsRes] = await Promise.all([
        fetch(`${base}?page=1&limit=200`, { headers: authHeader, cache: "no-store" }),
        fetch(`${base}/meta/provinces`, { headers: authHeader, cache: "no-store" }),
        fetch(`${base}/dream-bikes`, { headers: authHeader, cache: "no-store" }),
        fetch(`${bikeBase}/products?page=1&limit=500`, { headers: authHeader, cache: "no-store" }),
      ]);

      const usersJson = await usersRes.json() as { data?: { users?: PosUser[] }; message?: string };
      const provincesJson = await provincesRes.json() as { data?: { provinces?: ProvinceMeta[] }; message?: string };
      const bikesJson = await bikesRes.json() as { data?: DreamBikeOption[]; message?: string };
      const productsJson = await productsRes.json() as { data?: { products?: InventoryProductOption[] }; message?: string };

      if (!usersRes.ok) throw new Error(usersJson.message ?? "Failed to load users");
      if (!provincesRes.ok) throw new Error(provincesJson.message ?? "Failed to load province data");
      if (!bikesRes.ok) throw new Error(bikesJson.message ?? "Failed to load dream bikes");
      if (!productsRes.ok) throw new Error(productsJson.message ?? "Failed to load inventory products");

      setUsers(usersJson.data?.users ?? []);
      setProvinces(provincesJson.data?.provinces ?? []);
      setDreamBikeOptions(bikesJson.data ?? []);
      setInventoryOptions((productsJson.data?.products ?? []).filter((product) => product.quantity > 0));
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
      bikeVehicleId: "",
      inventoryProductId: "",
      quantity: "1",
      finalSellingPrice: "",
    });
    setPurchaseBikeDetail(null);
    setPurchaseProductDetail(null);
    setPurchaseError(null);
  };

  const closePurchaseModal = () => {
    setPurchaseUser(null);
    setPurchaseForm({
      purchaseType: "BIKE",
      bikeVehicleId: "",
      inventoryProductId: "",
      quantity: "1",
      finalSellingPrice: "",
    });
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
        finalSellingPrice: detail.sellingPrice != null ? String(detail.sellingPrice) : prev.finalSellingPrice,
      }));
    } catch (err) {
      setPurchaseError(err instanceof Error ? err.message : "Failed to load product details");
      setPurchaseProductDetail(null);
    } finally {
      setPurchaseLoadingBike(false);
    }
  };

  const handlePurchaseSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!purchaseUser) return;
    if (purchaseForm.purchaseType === "BIKE" && purchaseForm.bikeVehicleId === "") {
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

    const finalPrice = Number(purchaseForm.finalSellingPrice);
    if (!Number.isFinite(finalPrice) || finalPrice < 0) {
      setPurchaseError("Please enter a valid final selling price");
      return;
    }

    setPurchaseSaving(true);
    setPurchaseError(null);
    try {
      const response = await fetch(`${base}/${purchaseUser.id}/purchases`, {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseType: purchaseForm.purchaseType,
          bikeVehicleId: purchaseForm.purchaseType === "BIKE" ? purchaseForm.bikeVehicleId : undefined,
          inventoryProductId: purchaseForm.purchaseType === "INVENTORY" ? purchaseForm.inventoryProductId : undefined,
          quantity: purchaseForm.purchaseType === "INVENTORY" ? quantity : undefined,
          finalSellingPrice: finalPrice,
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {historyLoading && <tr><td colSpan={7} className="bm-table-empty">Loading purchase history...</td></tr>}
                {!historyLoading && purchaseHistory.length === 0 && <tr><td colSpan={7} className="bm-table-empty">No purchase history records found.</td></tr>}
                {!historyLoading && purchaseHistory.map((entry) => (
                  <tr key={entry.id}>
                    <td><span className="users-order-code">INV-{String(entry.id).padStart(5, "0")}</span></td>
                    <td>
                      <div className="users-order-date">{new Date(entry.purchasedAt).toLocaleDateString()}</div>
                      <div className="users-order-time">{new Date(entry.purchasedAt).toLocaleTimeString()}</div>
                    </td>
                    <td>
                      <div className="users-order-title">{entry.customer.firstName} {entry.customer.lastName}</div>
                      <span className="users-muted">{entry.customer.mobileNumber}</span>
                    </td>
                    <td>
                      <div className="users-order-title">{getPurchaseItemMeta(entry).title}</div>
                      <span className="users-order-item-meta">{getPurchaseItemMeta(entry).subtitle}</span>
                    </td>
                    <td>{entry.quantity}</td>
                    <td><span className="users-order-price">Rs. {entry.finalSellingPrice.toLocaleString()}</span></td>
                    <td>
                      <button type="button" className="btn-outline" onClick={() => setSelectedHistoryPurchase(entry)}>View</button>
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
                      bikeVehicleId: "",
                      inventoryProductId: "",
                      quantity: "1",
                      finalSellingPrice: "",
                    }));
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
                      onChange={(e) => setPurchaseForm((prev) => ({ ...prev, quantity: e.target.value }))}
                      required
                    />
                  </div>
                </>
              )}

              {purchaseLoadingBike && <p className="users-muted">Loading selected item details...</p>}

              {purchaseForm.purchaseType === "BIKE" && purchaseBikeDetail && (
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersLoading && <tr><td colSpan={6} className="bm-table-empty">Loading orders...</td></tr>}
                  {!ordersLoading && orders.length === 0 && <tr><td colSpan={6} className="bm-table-empty">No orders found for this user.</td></tr>}
                  {!ordersLoading && orders.map((entry) => (
                    <tr key={entry.id}>
                      <td><span className="users-order-code">INV-{String(entry.id).padStart(5, "0")}</span></td>
                      <td>
                        <div className="users-order-date">{new Date(entry.purchasedAt).toLocaleDateString()}</div>
                        <div className="users-order-time">{new Date(entry.purchasedAt).toLocaleTimeString()}</div>
                      </td>
                      <td>
                        <div className="users-order-title">{getPurchaseItemMeta(entry).title}</div>
                        <span className="users-order-item-meta">{getPurchaseItemMeta(entry).subtitle}</span>
                      </td>
                      <td>{entry.quantity}</td>
                      <td><span className="users-order-price">Rs. {entry.finalSellingPrice.toLocaleString()}</span></td>
                      <td>
                        <button type="button" className="btn-outline" onClick={() => setSelectedHistoryPurchase(entry)}>View</button>
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
        <div className="bm-modal-backdrop" onClick={() => setSelectedHistoryPurchase(null)}>
          <div className="bm-modal bm-modal-lg" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="bm-modal-close" onClick={() => setSelectedHistoryPurchase(null)}>x</button>
            <h3 className="bm-modal-title">Invoice INV-{String(selectedHistoryPurchase.id).padStart(5, "0")}</h3>

            <div className="users-view-grid">
              <div><strong>Date:</strong> {new Date(selectedHistoryPurchase.purchasedAt).toLocaleString()}</div>
              <div><strong>Customer:</strong> {selectedHistoryPurchase.customer.firstName} {selectedHistoryPurchase.customer.lastName}</div>
              <div><strong>NIC:</strong> {selectedHistoryPurchase.customer.nic}</div>
              <div><strong>Mobile:</strong> {selectedHistoryPurchase.customer.mobileNumber}</div>
              <div className="users-span-2"><strong>Address:</strong> {selectedHistoryPurchase.customer.address}, {selectedHistoryPurchase.customer.district}, {selectedHistoryPurchase.customer.province}</div>
            </div>

            {selectedHistoryPurchase.itemType === "BIKE" && selectedHistoryPurchase.bike && (
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

            {selectedHistoryPurchase.itemType === "INVENTORY" && selectedHistoryPurchase.inventory && (
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
              <div><strong>Current Selling Price:</strong> {selectedHistoryPurchase.currentSellingPrice != null ? `Rs. ${selectedHistoryPurchase.currentSellingPrice.toLocaleString()}` : "-"}</div>
              <div><strong>Quantity:</strong> {selectedHistoryPurchase.quantity}</div>
              <div><strong>Final Selling Price:</strong> Rs. {selectedHistoryPurchase.finalSellingPrice.toLocaleString()}</div>
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button type="button" className="btn-outline" onClick={() => setSelectedHistoryPurchase(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
