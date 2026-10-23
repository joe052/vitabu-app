import axios from "axios";
import { ROUTES } from "@/constants";
import { env } from "@/lib/env";

/**
 * The single axios instance that talks to your backend.
 * Every service in this folder (auth.ts, projects.ts...) uses it, so base URL,
 * credentials and headers are configured in one place.
 */
const backendApi = axios.create({
  baseURL: env.apiUrl,
  /**Send cookies with every request (session/cookie auth).
   * A backend on another origin must allow credentials in its CORS settings. */
  withCredentials: true,
  headers: { Accept: "application/json", "Content-Type": "application/json" },
});

/**REQUEST INTERCEPTOR */
backendApi.interceptors.request.use(
  (config) => {
    /**Using bearer tokens instead of cookies? Attach them here:
     * config.headers["Authorization"] = `Bearer ${token}`; */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**RESPONSE INTERCEPTOR */
backendApi.interceptors.response.use(
  (response) => {
    /**Return response if successful */
    return response;
  },
  (error) => {
    /**A 401 on any non-auth request means the session expired.
     * Auth requests are skipped: a failed login shows its own error,
     * and a 401 from /auth/me is handled by AuthGuard. */
    const isAuthRequest = error.config?.url?.startsWith("/auth/");
    if (error.response?.status === 401 && !isAuthRequest) {
      /**We use window.location because we can't use Next.js 'useRouter' inside a non-component file.
       * The full reload also clears the Redux store. */
      if (typeof window !== "undefined") {
        window.location.href = ROUTES.login;
      }
    }
    /**Return the error so the calling service still knows something failed */
    return Promise.reject(error);
  },
);

/** The error shape every service call rejects with (see `toApiError`). */
export type ApiError = {
  /** HTTP status, or undefined when the request never got a response. */
  status?: number;
  /** The backend's `{ message }`, or a network error message. */
  message?: string;
};

/** Turn whatever axios throws into an `ApiError`. Expects error bodies like `{ "message": "..." }`. */
export const toApiError = (error: unknown): ApiError => {
  if (!axios.isAxiosError(error)) return {};
  if (!error.response) return { message: "Could not reach the server." };

  const { status, data } = error.response;
  const message =
    data && typeof data === "object" && typeof data.message === "string"
      ? data.message
      : undefined;
  return { status, message };
};

/**EXPORTS */
const api = {
  get: <T>(uri: string) => {
    return backendApi.get<T>(uri);
  },
  post: <T>(uri: string, data?: unknown) => {
    return backendApi.post<T>(uri, data);
  },
  put: <T>(uri: string, data?: unknown) => {
    return backendApi.put<T>(uri, data);
  },
  delete: <T>(uri: string) => {
    return backendApi.delete<T>(uri);
  },
};

export default api;
export { backendApi };
