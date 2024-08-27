"use client"; 

import React from 'react'
import Image from 'next/image'
import banner from '../../../../assets/signin/banner.png'
import logo from '../../../../assets/home/logo.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
export default function Signin() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className='container mx-auto mb-10 sm:mb-0'>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
        <div className='h-[90vh] sm:h-[100vh]'>
          <Image src={banner} alt='lathif signin banner' className='w-full h-full object-contain'/>
        </div>
        <div className="flex items-center flex-col sm:justify-center gap-6">
        <div className='h-[100px] w-[200px]'>
          <Image src={logo} alt='lathif signin banner' className='w-full h-full object-contain'/>
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <label className='text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold'>Name</label>
          <input className='rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4' placeholder='Name'></input>
        </div>
        <div className='flex flex-col gap-3 w-full'>
          <label className='text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold'>Password</label>
          <div className="relative">
          <style>
        {`
          input::-ms-reveal,
          input::-ms-clear {
            display: none;
          }
        `}
      </style>
          <input className='rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4 no-eye-icon' placeholder='Password' type={showPassword ? "text" : "password"}></input>
       <div 
                className="absolute top-0 right-0 h-full flex items-center pr-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
          </div>
        </div>
        <button className='bg-black text-white rounded-lg h-[50px] w-full'>Submit</button>
        </div>
      </div>
    </div>
  )
}
