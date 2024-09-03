import { useState, useCallback } from 'react';
import axios from '@/utilities/customaxios';

interface LoginInput {
  email: string;
  password: string;
}

interface UserData {
  access: string;
  message: string;
  refresh: string;
}

export const useUserLogin = async (userData: LoginInput): Promise<UserData> => {
  try {
    const response = await axios.post<UserData>('/api/user-login', userData);
    return response.data;
  } catch (error) {
    // Handle error here if needed or throw it to be caught by the calling function
    throw error;
  }
};
