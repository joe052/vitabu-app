import * as auth from "@/lib/services/auth";
import type { LoginRequest, SignupRequest, User } from "@/types";
import { baseApi, fromService } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      queryFn: () => fromService(auth.getMe()),
      providesTags: ["User"],
    }),
    login: build.mutation<User, LoginRequest>({
      queryFn: (body) => fromService(auth.login(body)),
      // Put the returned user straight into the `getMe` cache so guarded pages render immediately.
      onQueryStarted: async (_body, { dispatch, queryFulfilled }) => {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(authApi.util.upsertQueryData("getMe", undefined, user));
        } catch {
          // The error is exposed through the mutation hook.
        }
      },
    }),
    signup: build.mutation<User, SignupRequest>({
      queryFn: (body) => fromService(auth.signup(body)),
      onQueryStarted: async (_body, { dispatch, queryFulfilled }) => {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(authApi.util.upsertQueryData("getMe", undefined, user));
        } catch {
          // The error is exposed through the mutation hook.
        }
      },
    }),
    logout: build.mutation<void, void>({
      queryFn: () => fromService(auth.logout()),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;
