import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { PROTECTED_ROUTES, ROUTES } from "@/constants";
import { env } from "@/lib/env";

/**
 * Refreshes the Supabase session cookie on every request, then applies the auth gate:
 * signed-out users can't reach PROTECTED_ROUTES, signed-in users skip login/signup.
 */
export async function updateSession(request: NextRequest) {
  /**Create an unmodified response */
  let supabaseResponse = NextResponse.next({ request });

  /**Initialize supabase server client */
  const supabase = createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        /**Updates response with new cookies (refreshing tokens) */
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  /**Get user
   * Secure as it verifies token with supabase
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  /**AUTH GUARD LOGIC */
  const path = request.nextUrl.pathname;

  /**Match the route itself and anything below it (/projects/123), but not /bookshelf for /books */
  const isProtectedRoute = PROTECTED_ROUTES.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );

  /**If trying to access protected route AND not logged in -> Redirect to Login */
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.login;
    url.search = "";
    /**Send the user back here after login */
    url.searchParams.set("next", path + request.nextUrl.search);
    return redirectWithCookies(url, supabaseResponse);
  }

  /** Auth Routes: If already logged in, prevent access to Login/Signup */
  if (user && (path === ROUTES.login || path === ROUTES.signup)) {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.dashboard;
    url.search = "";
    return redirectWithCookies(url, supabaseResponse);
  }

  return supabaseResponse;
}

/**A redirect that keeps any refreshed session cookies, so the user isn't signed out by it */
function redirectWithCookies(url: URL, supabaseResponse: NextResponse) {
  const response = NextResponse.redirect(url);
  supabaseResponse.cookies
    .getAll()
    .forEach((cookie) => response.cookies.set(cookie));
  return response;
}
