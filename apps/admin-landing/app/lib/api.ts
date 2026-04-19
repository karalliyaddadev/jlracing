/**
 * Authenticated fetch wrapper for the admin panel.
 *
 * - Always sends cookies (credentials: "include") so the httpOnly
 *   access_token cookie is forwarded to the CMS backend.
 * - On a 401, automatically calls POST /api/auth/refresh to rotate the
 *   access token and retries the original request once.
 * - If the refresh also fails (session truly expired), redirects to the
 *   root login page.
 */

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

function resolveUrl(input: string): string {
  return input.startsWith("http") ? input : `${CMS_API_URL}${input}`;
}

export async function apiFetch(
  input: string,
  init: RequestInit = {},
): Promise<Response> {
  const url = resolveUrl(input);
  const opts: RequestInit = { ...init, credentials: "include" };

  let res = await fetch(url, opts);

  if (res.status === 401) {
    // Attempt silent token refresh
    const refreshRes = await fetch(`${CMS_API_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (refreshRes.ok) {
      // Retry original request with the new access_token cookie
      res = await fetch(url, opts);
    } else {
      // Refresh failed — redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  }

  return res;
}
