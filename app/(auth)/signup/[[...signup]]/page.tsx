"use client";

import React from "react";
import Image from "next/image";
import signuptwoimage from "../../../../assets/signup/signuptwoimage.jpeg";
import logo from "../../../../assets/home/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
export default function Signup() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  return (
    <div className="container mx-auto mb-10 sm:mb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
        <div className="h-[60vh]  sm:h-[100vh] mt-6 sm:mt-0 rounded-xl sm:rounded-none overflow-hidden">
          <Image
            src={signuptwoimage}
            alt="lathif signin banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center flex-col sm:justify-center gap-6">
          <h1 className="text-2xl font-normal mt-4">
            👋 Hi, Signup to Luxurious Watch
          </h1>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
              Name
            </label>
            <input
              className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4"
              placeholder="Name"
            ></input>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
              Email
            </label>
            <input
              className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4"
              placeholder="Email"
            ></input>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
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
                className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4 no-eye-icon"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              ></input>
              <div
                className="absolute top-0 right-0 h-full flex items-center pr-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
              Confirm Password
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
                className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4 no-eye-icon"
                placeholder="Password"
                type={showPassword2 ? "text" : "password"}
              ></input>
              <div
                className="absolute top-0 right-0 h-full flex items-center pr-4 cursor-pointer"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <Link className="w-full" href={"/loginSuccess"}>
            <button className="bg-black text-white rounded-lg h-[50px] w-full">
              Submit
            </button>
          </Link>
          <div className="flex justify-center">
            <h1>
              <span>Already have an account?</span>
              <Link href={"/login"} className="ml-2 font-bold">
                Login
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
