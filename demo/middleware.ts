// middleware.ts (racine du projet)

import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import type { UserRole } from "@/lib/types/auth";

const ROUTE_ROLES: Record<string, UserRole[]> = {
  "/admin": ["admin", "editor"],
  "/dashboard": ["client", "prestataire"],
  //"/survey/result": ["client", "prestataire"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Rafraîchir la session silencieusement
  const { data: { user } } = await supabase.auth.getUser();

  for (const [route, allowedRoles] of Object.entries(ROUTE_ROLES)) {
    if (!pathname.startsWith(route)) continue;

    const loginUrl = route.startsWith("/admin") ? "/admin/login" : "/auth/login";

    if (!user) {
      return NextResponse.redirect(
        new URL(`${loginUrl}?returnTo=${pathname}`, req.url)
      );
    }

    const role = user.user_metadata?.role as UserRole;

    if (!allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/403", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/survey/result/:path*"],
};