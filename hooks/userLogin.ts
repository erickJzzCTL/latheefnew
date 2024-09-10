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

export const useUserLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (userData: LoginInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<UserData>('/api/user-login', userData);
      return response.data;
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { login, isLoading, error };
};
