import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignoră request-urile pentru fișiere statice sau API routes
  const isStatic = pathname.startsWith("/_next")
    || pathname.startsWith("/static")
    || pathname.startsWith("/favicon.ico")
    || pathname.startsWith("/robots.txt")
    || pathname.startsWith("/sitemap.xml")
    || pathname.startsWith("/api")
    || pathname.match(/\.[^\/]+$/) // ex: .css, .js, .jpg etc.

  if (isStatic) return NextResponse.next()

  // Redirecționează /home spre /
  if (pathname === "/home") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}
