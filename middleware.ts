import { NextRequest, NextResponse } from 'next/server';

const isAuthenticated = true; // Replace with your actual authentication logic

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAuthenticated) {
    if (pathname === '/signin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  } else {
    if (pathname !== '/signin') {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
    return NextResponse.next();
  }
}

// Configuration to exclude static assets from being processed by middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};