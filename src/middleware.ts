
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_TOKEN_KEY } from '@/lib/constants';

// Define which routes are protected and require authentication.
const PROTECTED_ROUTES = ['/hub', '/solution', '/admin', '/account']; 

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get(AUTH_TOKEN_KEY)?.value;

  // Check if the current path is one of the protected routes or a sub-path.
  const isProtectedRoute = PROTECTED_ROUTES.some(protectedRoute => {
    if (protectedRoute === '/solution') {
      // This ensures that '/solution' protects '/solution' itself and '/solution/...'
      // but does NOT protect '/solutions' (the public landing page).
      return pathname === protectedRoute || pathname.startsWith(protectedRoute + '/');
    }
    // For all other routes in PROTECTED_ROUTES, the original startsWith logic is fine.
    return pathname.startsWith(protectedRoute);
  });

  // If it's a protected route and the user is not authenticated, redirect to login.
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL('/login', request.url);
    // Optionally, pass the original path to redirect back after login
    loginUrl.searchParams.set('redirect', pathname); 
    return NextResponse.redirect(loginUrl);
  }

  // If the user is trying to access the login page but is already authenticated,
  // redirect them to the solutions hub.
  if (pathname === '/login' && authToken) {
    return NextResponse.redirect(new URL('/hub', request.url));
  }
  
  // For all other cases, allow the request to proceed.
  return NextResponse.next();
}

// Configure the matcher to apply this middleware to relevant paths.
export const config = {
  matcher: [
    // Apply middleware to all routes except for Next.js internals, static files, and images.
    '/((?!api|_next/static|_next/image|favicon.ico|assets).*)',
  ],
};
