import { NextRequest } from 'next/server';

export const authToken = (request: NextRequest): boolean => {
  // Use the cookies method on NextRequest to get the token
  const token = request?.cookies.get('guestToken')?.value;

  // Return true if the token is defined, otherwise false
  return token !== undefined && token.length > 0;
};
