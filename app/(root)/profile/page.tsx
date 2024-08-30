"use client";

import { deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";
import React from "react";

const Profile = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie('userToken');
    router.push("/");
  };

  return (
    <div className="bg-[#F0F0F0]">
      <div className="container mx-auto">
        <div className="pb-6 pt-2 sm:pt-10">
          <h1 className="text-[40px] font-semibold">Profile</h1>
          <p className="mt-4">Home / Profile</p>
          <div className="hidden sm:block">
            <div className="mt-4 bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
              <div className="grid grid-cols-3 text-center ">
                <div>
                  <h1>Name</h1>
                </div>
                <div>
                  <h1>Email</h1>
                </div>
                <div>
                  <h1>Password</h1>
                </div>
              </div>
            </div>
            <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
              <div className="grid grid-cols-3 text-center h-24 items-center">
                <div>
                  <h1>Chris Kevin</h1>
                </div>
                <div>
                  <h1>Chriskevin26@gmail.com</h1>
                </div>
                <div>
                  <h1>chr*************</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="block sm:hidden">
            <div className="mt-4">
              <div className=" bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
                <div className=" text-center ">
                  <div>
                    <h1>Name</h1>
                  </div>
                </div>
              </div>
              <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
                <div className=" flex h-12 items-center justify-center">
                  <div>
                    <h1>Chris Kevin</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className=" bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
                <div className=" text-center ">
                  <div>
                    <h1>Email</h1>
                  </div>
                </div>
              </div>
              <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
                <div className=" flex h-12 items-center justify-center">
                  <div>
                    <h1>Chriskevin26@gmail.com</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className=" bg-[#D3D3D3] px-2 py-4 rounded-t-xl">
                <div className=" text-center ">
                  <div>
                    <h1>Password</h1>
                  </div>
                </div>
              </div>
              <div className="bg-[#fff] px-2 py-4 rounded-b-xl">
                <div className=" flex h-12 items-center justify-center">
                  <div>
                    <h1>chr*************</h1>
                  </div>
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
