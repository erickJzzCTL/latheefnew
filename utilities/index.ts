import { NextRequest } from 'next/server';

export const authToken = (request?: NextRequest): boolean => {
  // Server-side
  if (request) {
    const token = request.cookies.get('guestToken')?.value;
    return token !== undefined && token.length > 0;
  }

  // Client-side
  const token = typeof window !== 'undefined' ? localStorage.getItem('guestToken') : null;
  return token !== null && token.length > 0;
};