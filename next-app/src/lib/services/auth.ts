import type { User as SupabaseUser } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import type { LoginRequest, SignupRequest, User } from "@/types";
import api from "./api";

/**
 * Auth endpoints. Sign in, the current session and sign out go through Supabase.
 * Signup goes through the backend, which creates the Supabase user and its profile together.
 */

/** Map a Supabase user onto the app's `User`. Without a `name` in user_metadata, the part of the email before the @ is used. */
const toUser = (user: SupabaseUser): User => ({
  id: user.id,
  email: user.email ?? "",
  name: user.user_metadata?.name ?? user.email?.split("@")[0] ?? "",
});

/** The signed-in user. Throws when there is no session, which AuthGuard treats as signed out. */
export const getMe = async () => {
  const { data, error } = await createClient().auth.getUser();
  if (error) throw error;
  return toUser(data.user);
};

/** Email + password sign in. Supabase stores the session in cookies. */
export const login = async (body: LoginRequest) => {
  const { data, error } = await createClient().auth.signInWithPassword(body);
  if (error) throw error;
  return toUser(data.user);
};

/**
 * POST /auth/signup, then sign in. The backend creates the user with the Supabase
 * admin API, which doesn't start a session, so we sign in here to get one.
 */
export const signup = async (body: SignupRequest) => {
  await api.post("/auth/signup", body);
  return login({ email: body.email, password: body.password });
};

/** Ends the Supabase session. */
export const logout = async () => {
  const { error } = await createClient().auth.signOut();
  if (error) throw error;
};
