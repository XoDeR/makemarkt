import { NextRequest, NextResponse } from "next/server";

export const config = {
  // Match all except:
  // 1. /api
  // 2. /_next
  // 3. /_static (inside /public)
  // 4. all root files inside /public (like /favicon.ico)
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|media/|[\\w-]+\\.\\w+).*)",
  ]
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  // hostname example: "john.makemarkt.com" or "john.localhost:3000"
  const hostname = req.headers.get("host") || "";

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

  if (hostname.endsWith(`.${rootDomain}`)) {
    const tenantSlug = hostname.replace(`.${rootDomain}`, "");
    return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}