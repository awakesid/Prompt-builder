import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/authConstants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin/manage-prompts and its sub-routes
  if (pathname.startsWith('/admin/manage-prompts')) {
    const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);

    if (!sessionCookie || sessionCookie.value !== 'logged_in_admin_user') {
      const loginUrl = new URL('/admin/login', request.url);
      // Add a query param to redirect back after successful login
      // loginUrl.searchParams.set('redirect', pathname); // Optional: redirect back
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin/login (the login page itself to avoid redirect loop)
     */
    '/admin/manage-prompts/:path*', // Protect the target admin page
     // Ensure we don't protect static assets needed by the login page if it were more complex
    // '/((?!api|_next/static|_next/image|favicon.ico|admin/login).*)',
  ],
};
