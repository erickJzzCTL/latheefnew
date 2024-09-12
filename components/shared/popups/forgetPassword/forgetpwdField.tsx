'use client';

import Link from 'next/link';
import React, { useRef, useState, ChangeEvent } from 'react';
import useStore from '@/store/store';
import axios from '@/utilities/customaxios';
import { AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
interface PsdsState {
  [key: string]: string; // Adjust this type if you have specific keys and value types
}

interface LoginResponseData {
  access_token: string;
  // Add other properties here if needed
}

// Define props type
interface SignupFieldProps {
  isSignInModalOpen: boolean;
  setSignInModalOpen: (open: boolean) => void;
  isForgetPasswordOpen: boolean;
  setForgetPasswordOpen: (open: boolean) => void;
}

const ForgotPassword = ({
  onContinue,
  setSignInModalOpen,
  setForgetPasswordOpen,
}: {
  onContinue: () => void;
  setSignInModalOpen: (open: boolean) => void;
  setForgetPasswordOpen: (open: boolean) => void;
}) => {
  const { forgetPwdMail, setForgetPwdMail } = useStore(state => ({
    forgetPwdMail: state.forgetPwdMail,
    setForgetPwdMail: state.setForgetPwdMail,
  }));
  const { userotp, setUserOTP } = useStore(state => ({
    userotp: state.userotp,
    setUserOTP: state.setUserOTP,
  }));
  const [loading, setLoading] = useState(false);
  const emailsubFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const email = forgetPwdMail;
      const response = await axios.post('/api/forget-password', {
        email,
      });
      const { otp } = response.data;
      setLoading(false);
      if (response.status === 200) {
        setUserOTP(otp);
        onContinue();
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      toast.error('Email does not exist');
      // Display an error message to the user
    }
  };
  const loginTabFun = () => {
    setSignInModalOpen(true);
    setForgetPasswordOpen(false);
  };
  return (
    <div className="w-full max-w-md p-6 bg-white ">
      <h2 className="text-2xl font-bold mb-2 text-left">
        Forgot Your Password?
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        Enter your email to reset password.
      </p>

      <form
        onSubmit={e => {
          emailsubFun(e);
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <div className="relative w-full">
            <input
              type="email"
              onChange={e => {
                setForgetPwdMail(e.target.value);
              }}
              id="email"
              name="email"
              placeholder="Eg : johndoe@examplemail.com"
              className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-black placeholder:text-[14px]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
            >
              <path
                d="M2.33366 14.1666C1.87533 14.1666 1.48296 14.0034 1.15658 13.677C0.830187 13.3506 0.666992 12.9583 0.666992 12.4999V2.49992C0.666992 2.04159 0.830187 1.64922 1.15658 1.32284C1.48296 0.996446 1.87533 0.833252 2.33366 0.833252H15.667C16.1253 0.833252 16.5177 0.996446 16.8441 1.32284C17.1705 1.64922 17.3337 2.04159 17.3337 2.49992V12.4999C17.3337 12.9583 17.1705 13.3506 16.8441 13.677C16.5177 14.0034 16.1253 14.1666 15.667 14.1666H2.33366ZM9.00033 8.33325L2.33366 4.16659V12.4999H15.667V4.16659L9.00033 8.33325ZM9.00033 6.66658L15.667 2.49992H2.33366L9.00033 6.66658ZM2.33366 4.16659V2.49992V12.4999V4.16659Z"
                fill="#1C1B1F"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white text-[14px] py-3 px-4 rounded-[12px] hover:bg-gray-800 transition duration-300"
        >
          {loading ? 'Continue ...' : 'Continue'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">Remember your account?</span>
        <div
          onClick={loginTabFun}
          className="text-sm text-black font-[500] hover:underline ml-2"
        >
          Login
        </div>
      </div>
    </div>
  );
};

const VerifyAccount = ({ onVerify }: { onVerify: () => void }) => {
  const { forgetPwdMail, setForgetPwdMail } = useStore(state => ({
    forgetPwdMail: state.forgetPwdMail,
    setForgetPwdMail: state.setForgetPwdMail,
  }));
  const { userotp, setUserOTP } = useStore(state => ({
    userotp: state.userotp,
    setUserOTP: state.setUserOTP,
  }));
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const codeString = code.join(''); // Convert code array to a single string
      if (userotp !== null && codeString === userotp) {
        // console.log('matched');
        onVerify();
        setUserOTP('');
      } else {
        // Add this else block to show the error toast
        toast.error('Incorrect OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const resendPwdFun = async () => {
    try {
      const email = forgetPwdMail;
      const response = await axios.post('/api/forget-password', {
        email,
      });
      const { otp } = response.data;
      if (response.status === 200) {
        setUserOTP(otp);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      toast.error('Something went wrong');
      // Display an error message to the user
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div className="w-full max-w-md p-6 bg-white">
      <h2 className="text-2xl font-bold mb-2 text-left">Verify Account!</h2>
      <p className="text-sm text-gray-600 mb-2 text-left">
        Please verify with the code sent to your email ID
      </p>
      <p className="text-sm text-gray-600 mb-6 text-left">{forgetPwdMail}</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              className="w-full text-center px-3 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-black text-[18px] placeholder:text-[14px]"
              onChange={e => handleInputChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(e, index)}
              ref={(el: HTMLInputElement | null) => {
                inputRefs.current[index] = el;
              }}
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white text-[14px] py-3 px-4 rounded-[12px] hover:bg-gray-800 transition duration-300"
        >
          Verify
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">Didn&apos;t get code? </span>
        <div
          onClick={resendPwdFun}
          className="text-sm text-black font-[500] hover:underline ml-2 cursor-pointer"
        >
          Resend
        </div>
      </div>
    </div>
  );
};

const CreatePassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = (
    field: 'password' | 'confirmPassword'
  ): void => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const [psds, setPsds] = useState<PsdsState>({
    password: '',
    confirmpassword: '',
  });
  const handleInputPwdChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setPsds({ ...psds, [key]: e.target.value });
  };

  const { forgetPwdMail, setForgetPwdMail } = useStore(state => ({
    forgetPwdMail: state.forgetPwdMail,
    setForgetPwdMail: state.setForgetPwdMail,
  }));

  const cPwdFun = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (psds.password === psds.confirmpassword) {
        const sentData = {
          email: forgetPwdMail,
          password: psds.password,
        };
        const response: AxiosResponse<LoginResponseData> = await axios.post(
          '/api/reset-password',
          sentData
        );
        if (response.status === 200) {
          console.log('token is 2', response.data.access_token);

          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 2); // Set expiry date to 2 days from now
          setCookie('userToken', response.data.access_token, {
            path: '/',
            expires: expiryDate,
          });
          toast.success('Password Changed!', {
            autoClose: 1500,
            onClose: () => {
              loginPostFn();
            },
          });
        }
      } else {
        toast.error('password does not match');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // Display an error message to the user
    }
  };

  const loginPostFn = () => {
    window.location.reload();
  };
  return (
    <div className="w-full max-w-md p-6 bg-white ">
      {/* <ToastContainer position="bottom-left" /> */}
      <h2 className="text-2xl font-bold mb-2 text-left">Create Password</h2>
      <p className="text-sm text-gray-600 mb-6 text-left">
        Create your new password for your account.
      </p>

      <form onSubmit={cPwdFun}>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Enter your new password"
              onChange={e => handleInputPwdChange(e, 'password')}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-black placeholder:text-[14px]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
            >
              <path
                d="M2.50065 17.5833C2.04232 17.5833 1.64996 17.4201 1.32357 17.0937C0.997179 16.7673 0.833984 16.3749 0.833984 15.9166V7.58325C0.833984 7.12492 0.997179 6.73256 1.32357 6.40617C1.64996 6.07978 2.04232 5.91658 2.50065 5.91658H3.33398V4.24992C3.33398 3.09714 3.74023 2.1145 4.55273 1.302C5.36523 0.489502 6.34787 0.083252 7.50065 0.083252C8.65343 0.083252 9.63607 0.489502 10.4486 1.302C11.2611 2.1145 11.6673 3.09714 11.6673 4.24992V5.91658H12.5007C12.959 5.91658 13.3513 6.07978 13.6777 6.40617C14.0041 6.73256 14.1673 7.12492 14.1673 7.58325V15.9166C14.1673 16.3749 14.0041 16.7673 13.6777 17.0937C13.3513 17.4201 12.959 17.5833 12.5007 17.5833H2.50065ZM2.50065 15.9166H12.5007V7.58325H2.50065V15.9166ZM7.50065 13.4166C7.95898 13.4166 8.35135 13.2534 8.67773 12.927C9.00412 12.6006 9.16732 12.2083 9.16732 11.7499C9.16732 11.2916 9.00412 10.8992 8.67773 10.5728C8.35135 10.2464 7.95898 10.0833 7.50065 10.0833C7.04232 10.0833 6.64996 10.2464 6.32357 10.5728C5.99718 10.8992 5.83398 11.2916 5.83398 11.7499C5.83398 12.2083 5.99718 12.6006 6.32357 12.927C6.64996 13.2534 7.04232 13.4166 7.50065 13.4166ZM5.00065 5.91658H10.0007V4.24992C10.0007 3.55547 9.7576 2.9652 9.27148 2.47909C8.78537 1.99297 8.1951 1.74992 7.50065 1.74992C6.80621 1.74992 6.21593 1.99297 5.72982 2.47909C5.24371 2.9652 5.00065 3.55547 5.00065 4.24992V5.91658Z"
                fill="#1C1B1F"
              />
            </svg>
            <button
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative w-full">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              onChange={e => handleInputPwdChange(e, 'confirmpassword')}
              className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-black placeholder:text-[14px]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
            >
              <path
                d="M2.50065 17.5833C2.04232 17.5833 1.64996 17.4201 1.32357 17.0937C0.997179 16.7673 0.833984 16.3749 0.833984 15.9166V7.58325C0.833984 7.12492 0.997179 6.73256 1.32357 6.40617C1.64996 6.07978 2.04232 5.91658 2.50065 5.91658H3.33398V4.24992C3.33398 3.09714 3.74023 2.1145 4.55273 1.302C5.36523 0.489502 6.34787 0.083252 7.50065 0.083252C8.65343 0.083252 9.63607 0.489502 10.4486 1.302C11.2611 2.1145 11.6673 3.09714 11.6673 4.24992V5.91658H12.5007C12.959 5.91658 13.3513 6.07978 13.6777 6.40617C14.0041 6.73256 14.1673 7.12492 14.1673 7.58325V15.9166C14.1673 16.3749 14.0041 16.7673 13.6777 17.0937C13.3513 17.4201 12.959 17.5833 12.5007 17.5833H2.50065ZM2.50065 15.9166H12.5007V7.58325H2.50065V15.9166ZM7.50065 13.4166C7.95898 13.4166 8.35135 13.2534 8.67773 12.927C9.00412 12.6006 9.16732 12.2083 9.16732 11.7499C9.16732 11.2916 9.00412 10.8992 8.67773 10.5728C8.35135 10.2464 7.95898 10.0833 7.50065 10.0833C7.04232 10.0833 6.64996 10.2464 6.32357 10.5728C5.99718 10.8992 5.83398 11.2916 5.83398 11.7499C5.83398 12.2083 5.99718 12.6006 6.32357 12.927C6.64996 13.2534 7.04232 13.4166 7.50065 13.4166ZM5.00065 5.91658H10.0007V4.24992C10.0007 3.55547 9.7576 2.9652 9.27148 2.47909C8.78537 1.99297 8.1951 1.74992 7.50065 1.74992C6.80621 1.74992 6.21593 1.99297 5.72982 2.47909C5.24371 2.9652 5.00065 3.55547 5.00065 4.24992V5.91658Z"
                fill="#1C1B1F"
              />
            </svg>
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white text-[14px] py-3 px-4 rounded-[12px] hover:bg-gray-800 transition duration-300"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default function ForgetpwdField({
  isSignInModalOpen,
  setSignInModalOpen,
  isForgetPasswordOpen,
  setForgetPasswordOpen,
}: SignupFieldProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleVerify = () => {
    setCurrentStep(3);
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center min-h-[90vh] relative">
        {currentStep === 1 && (
          <ForgotPassword
            onContinue={handleContinue}
            setSignInModalOpen={setSignInModalOpen}
            setForgetPasswordOpen={setForgetPasswordOpen}
          />
        )}
        {currentStep === 2 && <VerifyAccount onVerify={handleVerify} />}
        {currentStep === 3 && <CreatePassword />}
      </div>
    </>
  );
}
