import { useQuery, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";
import { setCookie } from 'cookies-next';


interface LoginInput {
  name: string;
  password: string;
}

interface UserData {
  token: string;
  message: string;
  expires_in: number;
}

export const fetchGuestLoginData = async (userData: LoginInput): Promise<UserData> => {
  const response = await axios.post<UserData>("/api/guest-user-password-check", userData);
  return response.data;
};

export const useGuestLogin = (userData: LoginInput): UseQueryResult<UserData, Error> => {
  const queryOptions: UseQueryOptions<UserData, Error, UserData, [string, LoginInput]> = {
    queryKey: ["guestLogin", userData],
    queryFn: () => fetchGuestLoginData(userData),
    enabled: !!userData.name && !!userData.password,
  };

  return useQuery(queryOptions);
};

// Separate function to handle successful login
export const handleSuccessfulLogin = (data: UserData) => {
    const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 2);
  setCookie('guestToken', data.token, { 
    path: '/',
    expires: expiryDate
  });
};