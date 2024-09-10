'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import signuptwoimage from '../../../../assets/signup/signuptwoimage.jpeg';
import logo from '../../../assets/home/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '@/hooks/userRegister';

// Define props type
interface SignupFieldProps {
  isSignInModalOpen: boolean;
  setSignInModalOpen: (open: boolean) => void;
  isSignUpModalOpen: boolean;
  setSignUpModalOpen: (open: boolean) => void;
}

// Define the type for post data
interface PostData {
  name: string;
  email: string;
  password: string;
  mobile_number: string;
  confirmpassword: string;
}

// Define the type for error messages
interface ErrorMessages {
  name?: string;
  email?: string;
  password?: string;
  mobile_number?: string;
  confirmpassword?: string;
}

export default function SignupField({
  isSignInModalOpen,
  setSignInModalOpen,
  isSignUpModalOpen,
  setSignUpModalOpen,
}: SignupFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  const [postData, setPostData] = useState<PostData>({
    name: '',
    email: '',
    password: '',
    mobile_number: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState<ErrorMessages>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State to control submission

  const postDataFn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof PostData
  ) => {
    let value = e.target.value;
    if (key === 'mobile_number') {
      value = value.replace(/\D/g, ''); // Remove non-digit characters
      if (value.length > 10) value = value.slice(0, 10); // Limit to 10 digits
    }
    setPostData({ ...postData, [key]: value });

    // Clear the error for this field when the user starts typing
    if (errors[key]) {
      setErrors({ ...errors, [key]: '' });
    }
  };

  const validateFields = (): boolean => {
    const newErrors: ErrorMessages = {};

    // Name validation
    if (!postData.name) newErrors.name = 'Name is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    if (!postData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(postData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    if (!postData.mobile_number) {
      newErrors.mobile_number = 'Phone number is required';
    } else if (postData.mobile_number.length !== 10) {
      newErrors.mobile_number = 'Phone number must be exactly 10 digits';
    } else if (!/^\d+$/.test(postData.mobile_number)) {
      newErrors.mobile_number = 'Phone number must contain only digits';
    }

    // Password validation
    if (!postData.password) newErrors.password = 'Password is required';

    // Confirm password validation
    if (!postData.confirmpassword)
      newErrors.confirmpassword = 'Confirm Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const submitFn = async () => {
    if (!validateFields()) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (postData.password !== postData.confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      const response = await registerUser(postData); // Make the API call

      if (response.message === 'Registration Successful') {
        toast.success('Data Submitted', {
          autoClose: 1500,
          onClose: () => {
            setSignInModalOpen(!isSignInModalOpen);
            setSignUpModalOpen(!isSignUpModalOpen);
          },
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Registration failed'; // Default message if not available
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false); // Reset submitting state after the request completes
    }
  };

  const LoginFn = () => {
    setSignInModalOpen(!isSignInModalOpen);
    setSignUpModalOpen(!isSignUpModalOpen);
  };

  return (
    <div className="mb-10 sm:mb-0">
      {/* <ToastContainer position="bottom-left" /> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8 overflow-hidden">
        <div className="h-[60vh] sm:h-[90vh] mt-6 sm:mt-0 rounded-xl sm:rounded-none overflow-hidden">
          <Image
            src={signuptwoimage}
            alt="lathif signin banner"
            className="w-full h-full object-cover overflow-hidden"
          />
        </div>
        <div className="flex items-center flex-col sm:justify-center gap-4">
          <h1 className="text-2xl font-normal mt-0">
            👋 Hi, Signup to Luxurious Watch
          </h1>
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
              Name
            </label>
            <input
              className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4"
              placeholder="Name"
              onChange={e => postDataFn(e, 'name')}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
                Email
              </label>
              <input
                type="email"
                className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4"
                placeholder="Email"
                onChange={e => postDataFn(e, 'email')}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
                Phone Number
              </label>
              <input
                className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4"
                placeholder="Phone Number"
                value={postData.mobile_number}
                onChange={e => postDataFn(e, 'mobile_number')}
              />
              {errors.mobile_number && (
                <span className="text-red-500 text-sm">
                  {errors.mobile_number}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-4 w-full">
            <div className="flex flex-col gap-4 w-full">
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
                  type={showPassword ? 'text' : 'password'}
                  onChange={e => postDataFn(e, 'password')}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <label className="text-[rgba(27, 37, 89, 0.80] text-[18px] font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="rounded-lg border-[1px] border-[#E6E6E8] h-[50px] w-full px-4"
                  placeholder="Confirm Password"
                  type={showPassword2 ? 'text' : 'password'}
                  onChange={e => postDataFn(e, 'confirmpassword')}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {errors.confirmpassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmpassword}
                </span>
              )}
            </div>
          </div>
          <button
            className="bg-black text-white w-full text-lg rounded-lg h-[50px] hover:bg-[#000000de]"
            onClick={submitFn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </button>
          <div className="flex items-center justify-center gap-2 mt-4">
            <p>Already have an account?</p>
            <Link
              href="#"
              onClick={LoginFn}
              className="text-[#FF6551] hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
