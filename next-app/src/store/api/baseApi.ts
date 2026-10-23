import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { toApiError, type ApiError } from "@/lib/services/api";

/**
 * The single RTK Query API. Requests themselves are made with axios in lib/services;
 * RTK Query adds caching, loading and error states on top.
 * Each feature adds its endpoints with `baseApi.injectEndpoints` (see authApi.ts, projectsApi.ts).
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery<ApiError>(),
  tagTypes: ["User", "Project"],
  endpoints: () => ({}),
});

/** Run a service call inside an endpoint's `queryFn`: `queryFn: () => fromService(getProjects())`. */
export const fromService = async <T>(
  request: Promise<T>,
): Promise<{ data: T } | { error: ApiError }> => {
  try {
    return { data: await request };
  } catch (error) {
    return { error: toApiError(error) };
  }
};
