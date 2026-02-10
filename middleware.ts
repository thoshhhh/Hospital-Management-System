import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

const protectedPaths = ["/", "/doctors", "/patients", "/appointments", "/reports", "/settings", "/billing", "/pharmacy", "/laboratory"]
const authPaths = ["/login", "/signup"]

function isProtected(pathname: string) {
  return protectedPaths.some((p) => p === pathname || pathname.startsWith(p + "/"))
}

function isAuthPath(pathname: string) {
  return authPaths.some((p) => pathname.startsWith(p))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/auth/") || pathname.startsWith("/_next") || pathname.includes(".")) {
    const { response } = await updateSession(request)
    return response
  }

  const { response, user } = await updateSession(request)

  if (isAuthPath(pathname) && user) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return Response.redirect(url)
  }

  if (isProtected(pathname) && !user) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("next", pathname)
    return Response.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
