import { useQuery } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";

interface UserData {
  id: number;
  password: string;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  email: string;
  groups: any[];
  user_permissions: any[];
}

interface FetchUserDataResponse {
  user: UserData;
}

export const fetchUserData = (token: string) => {
  return axios.get<FetchUserDataResponse>("api/profile-view", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useUserLoginData = (token: string) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserData(token),
    select: (response) => response.data.user, // Directly extract the user data
  });
};
