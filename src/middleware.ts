import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_KEY } from '@/lib/constants';

// Define which top-level routes are protected and require authentication.
const PROTECTED_ROUTES = ['/hub', '/solution', '/admin', '/account'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token from cookies, as this is the only storage accessible by middleware.
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;

  // Determine if the requested path is a protected route.
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));

  // Case 1: Trying to access a protected route without a token.
  // Redirect to the login page, preserving the intended destination for a redirect after login.
  console.log(`Requesting path: ${pathname}, Auth Token: ${authToken}`);  
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: Trying to access the login page while already authenticated.
  // Redirect to the main application hub.
  if (pathname === '/login' && authToken) {
    return NextResponse.redirect(new URL('/hub', request.url));
  }
  
  // Case 3: All other scenarios.
  // Allow the request to proceed as normal.
  return NextResponse.next();
}

// Configure the matcher to apply this middleware efficiently.
// This excludes static files, images, and API routes, which don't need auth checks.
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};