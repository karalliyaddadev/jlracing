"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "../../../lib/api";

interface Subscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function LocalNewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Subscriber | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchSubscribers = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFetch("/api/newsletter")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch subscribers");
        return res.json();
      })
      .then(setSubscribers)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load")
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/newsletter/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setDeleteTarget(null);
      fetchSubscribers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  function copyEmails() {
    const emails = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails).catch(() => {});
  }

  return (
    <div className="nl-admin">
      <div className="nl-admin__header">
        <div>
          <h1 className="nl-admin__title">Newsletter Subscribers</h1>
          <p className="nl-admin__subtitle">
            {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} total
          </p>
        </div>
        {subscribers.length > 0 && (
          <button className="nl-admin__copy-btn" onClick={copyEmails}>
            Copy All Emails
          </button>
        )}
      </div>

      {error && (
        <div className="nl-admin__error">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {loading ? (
        <p className="nl-admin__loading">Loading subscribers…</p>
      ) : (
        <div className="nl-admin__table-wrap">
          <table className="nl-admin__table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={3} className="nl-admin__empty">
                    No subscribers yet.
                  </td>
                </tr>
              )}
              {subscribers.map((sub) => (
                <tr key={sub.id}>
                  <td className="nl-admin__td-email">{sub.email}</td>
                  <td className="nl-admin__td-date">
                    {new Date(sub.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <button
                      className="nl-admin__delete-btn"
                      onClick={() => setDeleteTarget(sub)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <div
          className="nl-admin__modal-overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="nl-admin__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nl-admin__modal-header">
              <h2 className="nl-admin__modal-title">Remove Subscriber</h2>
              <button
                className="nl-admin__modal-close"
                onClick={() => setDeleteTarget(null)}
              >
                ✕
              </button>
            </div>
            <div className="nl-admin__modal-body">
              <p className="nl-admin__confirm-text">
                Remove <strong>{deleteTarget.email}</strong> from the newsletter
                list? This cannot be undone.
              </p>
            </div>
            <div className="nl-admin__modal-footer">
              <button
                className="nl-admin__cancel-btn"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="nl-admin__delete-confirm-btn"
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? "Removing…" : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
