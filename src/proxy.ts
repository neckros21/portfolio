import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

// Choisit la langue d'après le navigateur (Accept-Language), sinon le français.
function preferred(header: string | null): Locale {
  const langs = (header ?? "")
    .split(",")
    .map((part) => {
      const [code, q] = part.trim().split(";q=");
      return { code: code.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { code } of langs) {
    const base = code.split("-")[0];
    if (isLocale(base)) return base;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (first && isLocale(first)) return;
  request.nextUrl.pathname = `/${preferred(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ignore les fichiers internes et statiques (_next, previews, robots.txt…)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
