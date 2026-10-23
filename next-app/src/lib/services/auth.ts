import type { LoginRequest, SignupRequest, User } from "@/types";
import api from "./api";

/** Auth endpoints. The template expects cookie sessions (see README → Connecting your backend). */

/** GET /auth/me: the signed-in user, or 401. */
export const getMe = async () => {
  const { data } = await api.get<User>("/auth/me");
  return data;
};

/** POST /auth/login */
export const login = async (body: LoginRequest) => {
  const { data } = await api.post<User>("/auth/login", body);
  return data;
};

/** POST /auth/signup */
export const signup = async (body: SignupRequest) => {
  const { data } = await api.post<User>("/auth/signup", body);
  return data;
};

/** POST /auth/logout */
export const logout = async () => {
  await api.post("/auth/logout");
};
