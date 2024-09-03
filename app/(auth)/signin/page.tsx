"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import banner from "../../../assets/signin/banner.png";
import logo from "../../../assets/home/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGuestLogin,handleSuccessfulLogin  } from "@/hooks/guestLogin";
import { getCookie } from 'cookies-next';

// Define the structure of the input data
interface LoginInput {
  name: string;
  password: string;
}

export default function Signin() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<LoginInput>({
    name: "",
    password: "",
  });
  const router = useRouter();
  const { data, error, isLoading, refetch } = useGuestLogin(userData);
 
  const handleSubmit = async () => {
    try {
      // Trigger refetch or query update if userData is valid
      const result = await refetch();
      if (result.data && result.data?.message === "success") {
        handleSuccessfulLogin(result.data);
        // router.push("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof LoginInput
  ) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  return (
    <div className="container mx-auto mb-10 sm:mb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
        <div className="h-[80vh] sm:h-[100vh] hidden sm:block">
          <Image
            src={banner}
            alt="lathif signin banner"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center flex-col sm:justify-center gap-6 mt-32 sm:mt-0">
          <div className="h-[100px] w-[200px]">
            <Image
              src={logo}
              alt="lathif signin banner"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[14px] font-semibold">
              Name
            </label>
            <input
              className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4 text-[14px] placeholder:text-[14px]"
              placeholder="Name"
              value={userData.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[14px] font-semibold">
              Password
            </label>
            <div className="relative">
              <style>
                {`
                  input::-ms-reveal,
                  input::-ms-clear {
                    display: none;
                  }
                `}
              </style>
              <input
                className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4 no-eye-icon text-[14px] placeholder:text-[14px]"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={userData.password}
                onChange={(e) => handleChange(e, "password")}
              />
              <div
                className="absolute top-0 right-0 h-full flex items-center pr-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-black text-white rounded-lg h-[50px] w-full"
            disabled={isLoading} // Disable the button while loading
          >
            Submit
          </button>
          {error && <p className="text-red-500">{error.message}</p>}
        </div>
      </div>
    </div>
  );
}
