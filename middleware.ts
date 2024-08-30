import { NextRequest, NextResponse } from 'next/server';
import { authToken } from './utilities/index';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (authToken(request)) {
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
