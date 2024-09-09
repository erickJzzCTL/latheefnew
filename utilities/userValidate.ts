'use client';

import { getCookie } from 'cookies-next';
import {jwtDecode} from 'jwt-decode'; // Import it correctly for TS

interface JwtPayload {
  exp?: number;
  [userToken: string]: any; // This allows for additional properties to exist in the decoded token
}

const userValidate = (): boolean => {
  const token = getCookie('userToken') as string | undefined;
//   console.log('token is', token);
  
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    console.log(decoded);

    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

export default userValidate;
