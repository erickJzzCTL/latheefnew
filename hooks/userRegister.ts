import axios from '@/utilities/customaxios';

interface LoginInput {
  //   name: string;
  password: string;
  email: string;
  //   mobile_number: string;
}

interface UserData {
  message: string;
}

export const registerUser = async (userData: LoginInput): Promise<UserData> => {
  try {
    const response = await axios.post<UserData>(
      '/api/user-registration',
      userData
    );
    return response.data;
  } catch (error) {
    // Handle error here if needed or throw it to be caught by the calling function
    throw error;
  }
};
