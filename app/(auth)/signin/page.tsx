"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchGuestLoginData, handleSuccessfulLogin } from "@/hooks/guestLogin";
import banner from "../../../assets/signin/banner.png";
import logo from "../../../assets/home/logo.png";

interface LoginInput {
  name: string;
  password: string;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState<LoginInput>({ name: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchGuestLoginData(userData);
      if (data.message === "success") {
        handleSuccessfulLogin(data);
        window.location.reload();
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto mb-10 sm:mb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
        <div className="h-[80vh] sm:h-[100vh] hidden sm:block">
          <Image
            src={banner}
            alt="Lathif signin banner"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center flex-col sm:justify-center gap-6 mt-32 sm:mt-0">
          <div className="h-[100px] w-[200px]">
            <Image
              src={logo}
              alt="Lathif logo"
              className="w-full h-full object-contain"
            />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="text-[rgba(27, 37, 89, 0.80)] text-sm font-semibold">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleChange}
                className="rounded-lg border border-[#E6E6E8] h-[50px] w-full px-4 text-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password" className="text-[rgba(27, 37, 89, 0.80)] text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  onChange={handleChange}
                  className="rounded-lg border border-[#E6E6E8] h-[50px] w-full px-4 text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="bg-black text-white rounded-lg h-[50px] w-full disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p className="text-red-500 text-sm">Invalid Credentials</p>}
        </div>
      </div>
    </div>
  );
}