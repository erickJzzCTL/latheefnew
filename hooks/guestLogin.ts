import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";

// Define the structure of the input data that will be sent to the API
interface LoginInput {
  name: string;
  password: string;
}

// Define the expected structure of the user data
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
  return useQuery<UserData, Error>({
    queryKey: ["userData", userData],
    queryFn: () => fetchGuestLoginData(userData),
    enabled: !!userData.name && !!userData.password // Only run query if userData is not empty
  });
};
