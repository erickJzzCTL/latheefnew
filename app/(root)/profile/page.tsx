"use client";

import { useUserLoginData } from '@/hooks/useuserLoginDetails';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import React from "react";

interface User {
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

const Profile = () => {
  const router = useRouter();
  const userToken = getCookie('userToken') as string | undefined;

  // Check if the user token is available
  if (!userToken) {
    router.push("/");
    return null; // Avoid rendering the component if there's no token
  }

  // Use the custom hook to fetch user data
  const { data: userData, error, isLoading } = useUserLoginData(userToken);
console.log('userData is', userData);

  const handleLogout = () => {
    deleteCookie('userToken');
    router.push("/");
  };

  // Handle loading state and errors
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user data:", error);
    return <div>Error loading profile data</div>;
  }

  return (
    <div className="bg-[#F0F0F0]">
      <div className="container mx-auto">
        <div className="pb-6 pt-2 sm:pt-10">
          <h1 className="text-[40px] font-semibold">Profile</h1>
          <p className="mt-4">Home / Profile</p>
          <div className="hidden sm:block">
            <div className="mt-4 bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
              <div className="grid grid-cols-3 text-center ">
                <div><h1>Name</h1></div>
                <div><h1>Email</h1></div>
                <div><h1>Password</h1></div>
              </div>
            </div>
            <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
              <div className="grid grid-cols-3 text-center h-24 items-center">
                <div><h1>{userData?.first_name || 'N/A'}</h1></div>
                <div><h1>{userData?.email || 'N/A'}</h1></div>
                <div><h1>**********</h1></div>
              </div>
            </div>
          </div>
          <div className="block sm:hidden">
            <div className="mt-4">
              <div className="bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
                <div className="text-center"><h1>Name</h1></div>
              </div>
              <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
                <div className="flex h-12 items-center justify-center">
                  <div><h1>{userData?.first_name || 'N/A'}</h1></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
                <div className="text-center"><h1>Email</h1></div>
              </div>
              <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
                <div className="flex h-12 items-center justify-center">
                  <div><h1>{userData?.email || 'N/A'}</h1></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
                <div className="text-center"><h1>Password</h1></div>
              </div>
              <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
                <div className="flex h-12 items-center justify-center">
                  <div><h1>**********</h1></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 mb-4 sm:mb-24">
            <button
              onClick={handleLogout}
              className="bg-black text-white px-16 py-2 rounded-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
