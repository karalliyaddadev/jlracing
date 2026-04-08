"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { API_URL } from "../lib/constants";

type ProvinceMeta = { name: string; districts: string[] };
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
};

type CustomerPurchaseModalProps = {
  token: string;
  itemType: "BIKE" | "INVENTORY";
  itemId: number;
  itemLabel: string;
  currentSellingPrice?: number | null;
  maxQuantity?: number;
  onClose: () => void;
  onSaved: () => void;
};

const EMPTY_USER_FORM: UserFormState = {
  firstName: "",
  lastName: "",
  nic: "",
  mobileNumber: "",
  email: "",
  province: "",
  district: "",
  address: "",
};

export default function CustomerPurchaseModal(props: CustomerPurchaseModalProps) {
  const {
    token,
    itemType,
    itemId,
    itemLabel,
    currentSellingPrice,
    maxQuantity = 1,
    onClose,
    onSaved,
  } = props;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [users, setUsers] = useState<PosUser[]>([]);
  const [provinces, setProvinces] = useState<ProvinceMeta[]>([]);

  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [userForm, setUserForm] = useState<UserFormState>(EMPTY_USER_FORM);

  const [quantity, setQuantity] = useState("1");
  const [finalSellingPrice, setFinalSellingPrice] = useState(
    currentSellingPrice != null ? String(currentSellingPrice) : ""
  );

  const base = `${API_URL}/api/pos/user-management`;
  const auth = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const districtsForProvince = useMemo(
    () => provinces.find((province) => province.name === userForm.province)?.districts ?? [],
    [provinces, userForm.province]
  );

  useEffect(() => {
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, provincesRes] = await Promise.all([
          fetch(`${base}?page=1&limit=500`, { headers: auth, cache: "no-store" }),
          fetch(`${base}/meta/provinces`, { headers: auth, cache: "no-store" }),
        ]);

        const usersJson = (await usersRes.json()) as { data?: { users?: PosUser[] }; message?: string };
        const provincesJson = (await provincesRes.json()) as { data?: { provinces?: ProvinceMeta[] }; message?: string };

        if (!usersRes.ok) throw new Error(usersJson.message ?? "Failed to load users");
        if (!provincesRes.ok) throw new Error(provincesJson.message ?? "Failed to load provinces");

        setUsers(usersJson.data?.users ?? []);
        setProvinces(provincesJson.data?.provinces ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load customer data");
      } finally {
        setLoading(false);
      }
    })();
  }, [auth, base]);

  const createCustomer = async () => {
    const response = await fetch(base, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        nic: userForm.nic,
        mobileNumber: userForm.mobileNumber,
        email: userForm.email.trim() || undefined,
        province: userForm.province,
        district: userForm.district,
        address: userForm.address,
        dreamBikeIds: [],
      }),
    });

    const payload = (await response.json()) as { data?: PosUser; message?: string };
    if (!response.ok || !payload.data) {
      throw new Error(payload.message ?? "Failed to create user");
    }

    return payload.data.id;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const resolvedUserId = showAddUser ? await createCustomer() : selectedUserId;
      if (!resolvedUserId) {
        throw new Error("Please select a user or add a new user");
      }

      const parsedFinalPrice = Number(finalSellingPrice);
      if (!Number.isFinite(parsedFinalPrice) || parsedFinalPrice < 0) {
        throw new Error("Please enter a valid final selling price");
      }

      const parsedQty = itemType === "INVENTORY" ? Number(quantity) : 1;
      if (itemType === "INVENTORY") {
        if (!Number.isInteger(parsedQty) || parsedQty < 1) {
          throw new Error("Please enter a valid quantity");
        }
        if (parsedQty > maxQuantity) {
          throw new Error(`Only ${maxQuantity} items are available`);
        }
      }

      const response = await fetch(`${base}/${resolvedUserId}/purchases`, {
        method: "POST",
        headers: { ...auth, "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseType: itemType,
          bikeVehicleId: itemType === "BIKE" ? itemId : undefined,
          inventoryProductId: itemType === "INVENTORY" ? itemId : undefined,
          quantity: itemType === "INVENTORY" ? parsedQty : undefined,
          finalSellingPrice: parsedFinalPrice,
        }),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message ?? "Failed to create sale");
      }

      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create sale");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bm-modal-backdrop" onClick={onClose}>
      <form className="bm-modal bm-modal-lg" onClick={(event) => event.stopPropagation()} onSubmit={submit}>
        <button type="button" className="bm-modal-close" onClick={onClose}>x</button>
        <h3 className="bm-modal-title">Sell To Customer</h3>

        {error && <div className="bm-alert bm-alert-error">{error}</div>}
        {loading && <p className="users-muted">Loading users...</p>}

        {!loading && (
          <>
            <div className="users-form-grid">
              <div className="bm-field-group users-span-2">
                <label>Item</label>
                <input className="bm-input" value={itemLabel} readOnly />
              </div>

              <div className="bm-field-group users-span-2">
                <label>Select Existing Customer</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <select
                    className="bm-input"
                    value={selectedUserId}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSelectedUserId(value ? Number(value) : "");
                      if (value) setShowAddUser(false);
                    }}
                    disabled={showAddUser}
                  >
                    <option value="">Select customer</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName} | {user.nic} | {user.mobileNumber}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="bm-plus-btn"
                    title="Add new customer"
                    onClick={() => {
                      setShowAddUser((value) => !value);
                      setSelectedUserId("");
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {showAddUser && (
                <>
                  <div className="bm-field-group">
                    <label>First Name</label>
                    <input className="bm-input" value={userForm.firstName} onChange={(event) => setUserForm((prev) => ({ ...prev, firstName: event.target.value }))} required />
                  </div>
                  <div className="bm-field-group">
                    <label>Last Name</label>
                    <input className="bm-input" value={userForm.lastName} onChange={(event) => setUserForm((prev) => ({ ...prev, lastName: event.target.value }))} required />
                  </div>
                  <div className="bm-field-group">
                    <label>NIC</label>
                    <input className="bm-input" value={userForm.nic} onChange={(event) => setUserForm((prev) => ({ ...prev, nic: event.target.value }))} required />
                  </div>
                  <div className="bm-field-group">
                    <label>Mobile Number</label>
                    <input className="bm-input" value={userForm.mobileNumber} onChange={(event) => setUserForm((prev) => ({ ...prev, mobileNumber: event.target.value }))} required />
                  </div>
                  <div className="bm-field-group">
                    <label>Email (Optional)</label>
                    <input type="email" className="bm-input" value={userForm.email} onChange={(event) => setUserForm((prev) => ({ ...prev, email: event.target.value }))} />
                  </div>
                  <div className="bm-field-group">
                    <label>Province</label>
                    <select
                      className="bm-input"
                      value={userForm.province}
                      onChange={(event) => setUserForm((prev) => ({ ...prev, province: event.target.value, district: "" }))}
                      required
                    >
                      <option value="">Select province</option>
                      {provinces.map((province) => <option key={province.name} value={province.name}>{province.name}</option>)}
                    </select>
                  </div>
                  <div className="bm-field-group">
                    <label>District</label>
                    <select
                      className="bm-input"
                      value={userForm.district}
                      onChange={(event) => setUserForm((prev) => ({ ...prev, district: event.target.value }))}
                      required
                      disabled={!userForm.province}
                    >
                      <option value="">Select district</option>
                      {districtsForProvince.map((district) => <option key={district} value={district}>{district}</option>)}
                    </select>
                  </div>
                  <div className="bm-field-group users-span-2">
                    <label>Address</label>
                    <textarea className="bm-input users-textarea" value={userForm.address} onChange={(event) => setUserForm((prev) => ({ ...prev, address: event.target.value }))} required />
                  </div>
                </>
              )}

              {itemType === "INVENTORY" && (
                <div className="bm-field-group">
                  <label>Quantity</label>
                  <input
                    className="bm-input"
                    type="number"
                    min={1}
                    max={maxQuantity}
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    required
                  />
                </div>
              )}

              <div className="bm-field-group">
                <label>Current Selling Price</label>
                <input
                  className="bm-input"
                  value={currentSellingPrice != null ? `Rs. ${currentSellingPrice.toLocaleString()}` : "Not set"}
                  readOnly
                />
              </div>

              <div className="bm-field-group">
                <label>Final Selling Price</label>
                <input
                  className="bm-input"
                  type="number"
                  min={0}
                  step="0.01"
                  value={finalSellingPrice}
                  onChange={(event) => setFinalSellingPrice(event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="bm-modal-actions" style={{ marginTop: "1rem" }}>
              <button type="submit" className="btn-accent" disabled={saving}>{saving ? "Saving..." : "Confirm Sale"}</button>
              <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
