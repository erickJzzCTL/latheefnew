'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from "next/image";
import signupimage from '../../../assets/signup/signupimage.jpeg';
import logo from "../../../assets/home/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import useStore from '@/store/store';
import Link from 'next/link';
import SignupField from './signupField/SignupField';
import SignInSuccess from './signInSuccess/SignInSuccess';
import { useUserLogin, handleUserSuccessfulLogin } from '@/hooks/userLogin';


export default function SignInPopup() {

  const [isModalOpen, setIsModalOpen] = useStore(
    (state) => [state.isModalOpen, state.setIsModalOpen] as [boolean, (open: boolean) => void]
  );

  const [isSignInModalOpen, setSignInModalOpen] = useState<boolean>(true);
const [isSignUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);
const [isSignInSuccessOpen, setSignInSuccessOpen] = useState<boolean>(false);

    const [showPassword, setShowPassword] = useState<boolean>(false);
    



  const handleCancel = () => {
    setIsModalOpen(false);
    if(!isSignInModalOpen) {
      setSignUpModalOpen(false);
      setSignInSuccessOpen(false)
      setSignInModalOpen(true)
    }
    else{
      setSignUpModalOpen(false);
    }
    
  };

  const loginPostFn = () => {
    setSignInSuccessOpen(!isSignInSuccessOpen);
    setSignInModalOpen(false);
    setSignUpModalOpen(false);
  }

// ---------------MODAL DATA --------------------

const SignUpPopupFn = () => {
  console.log('clicked');
  setSignInModalOpen(!isSignInModalOpen);
  setSignUpModalOpen(!isSignUpModalOpen);
}

interface LoginInput {
  email: string;
  password: string;
}

const [userData, setUserData] = React.useState<LoginInput>({ email: "", password: "" });
const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof LoginInput) => {
  setUserData({ ...userData, [key]: e.target.value });
};

const { data, error, isLoading, refetch } = useUserLogin(userData);

const handleSubmit = async () => {
  try {
    // Trigger refetch or query update if userData is valid
    const result = await refetch();
    if (result.data && result.data?.message === "Login Successfull") {
      handleUserSuccessfulLogin(result.data);
      setSignInSuccessOpen(!isSignInSuccessOpen);
      setSignInModalOpen(false);
      setSignUpModalOpen(false);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};
  return (
    <div>
       <Modal 
        open={isModalOpen} 
        onCancel={handleCancel} 
        footer={null}  // Removes OK and Cancel buttons
        title={null}   // Removes the modal title
        // closable={false}  Hides the close (X) button 
className='popup-class'
      >
        {isSignInModalOpen &&   <div className="mb-10 sm:mb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
        <div className="h-[60vh]  sm:h-[90vh] mt-6 sm:mt-0 rounded-xl sm:rounded-none overflow-hidden hidden sm:block">
          <Image
            src={signupimage}
            alt="lathif signin banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center flex-col sm:justify-center gap-6">
          <h1 className="text-2xl font-normal mt-4">
            👋 Hi, Login to Luxurious Watch
          </h1>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
              Name
            </label>
            <input
              className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4"
              placeholder="Email"
              onChange={(e) => handleChange(e, 'email')}
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
                onChange={(e) => handleChange(e, 'password')}
              ></input>
              <div
                className="absolute top-0 right-0 h-full flex items-center pr-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <Link href="/forgot">Forgot Password? </Link>
          </div>
          <Link
            className="w-full"
            href={"/"}
          >
            <button onClick ={handleSubmit} className="bg-black text-white rounded-lg h-[50px] w-full">
              Submit
            </button>
          </Link>
          <div className="flex justify-center">
            <h1>
              <span>don&apos;t have an account?</span>
              <span onClick={SignUpPopupFn} className="ml-2 font-bold cursor-pointer">
                signup
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>}
  {isSignUpModalOpen &&   <SignupField isSignInModalOpen={isSignInModalOpen} setSignInModalOpen ={setSignInModalOpen} isSignUpModalOpen={isSignUpModalOpen} setSignUpModalOpen={setSignUpModalOpen}  />}
  {isSignInSuccessOpen &&<SignInSuccess handleCancel={handleCancel} />}
      </Modal>
    </div>
  );
}