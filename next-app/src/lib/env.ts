/**
 * Public environment variables, read in one place.
 *
 * NEXT_PUBLIC_* values are inlined into the browser bundle at build time,
 * so always read them with the full `process.env.NEXT_PUBLIC_...` expression.
 * Never put secrets in NEXT_PUBLIC_* variables.
 */
export const env = {
  /** Base URL of your backend API. Set NEXT_PUBLIC_API_URL in .env.local. */
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  /** Supabase project URL and public anon key. Set both in .env.local. */
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;
