import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const token = request.cookies.get("token")?.value || null;

    if (token) {
        if (pathname.startsWith("/login")) {
            return NextResponse.redirect(new URL("/dashboard", request.url))
        }
    }

    if (!token) {
        if (pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
}