import { useQuery, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";
import { setCookie } from 'cookies-next';


interface LoginInput {
  email: string;
  password: string;
}

interface UserData {
    access: string;
  message: string;
  refresh: string;
}

export const fetchUserLoginData = async (userData: LoginInput): Promise<UserData> => {
  const response = await axios.post<UserData>("/api/user-login", userData);
  return response.data;
};

export const useUserLogin = (userData: LoginInput): UseQueryResult<UserData, Error> => {
  const queryOptions: UseQueryOptions<UserData, Error, UserData, [string, LoginInput]> = {
    queryKey: ["guestLogin", userData],
    queryFn: () => fetchUserLoginData(userData),
    enabled: !!userData.email && !!userData.password,
  };

  return useQuery(queryOptions);
};

// Separate function to handle successful login
export const handleUserSuccessfulLogin = (data: UserData) => {
    const expiryDate = new Date();
//   expiryDate.setDate(expiryDate.getDate() + 2);
  setCookie('userToken', data.access, { 
    path: '/',
  });
};