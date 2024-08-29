"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../assets/home/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useStore from "@/store/store";
import SignInPopup from "./popups/SignInPopup";
import { useSetHomeData } from "@/hooks/useHomeData";
import { AxiosResponse } from "axios";
const whatsappsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
  >
    <g clip-path="url(#clip0_89_7430)">
      <path
        d="M12 2.5C17.523 2.5 22 6.977 22 12.5C22 18.023 17.523 22.5 12 22.5C10.298 22.5025 8.62369 22.0687 7.13701 21.24L6.83201 21.062L3.80001 21.954C3.63501 22.0026 3.46033 22.0083 3.29252 21.9705C3.12472 21.9327 2.96935 21.8526 2.84115 21.738C2.71294 21.6233 2.61615 21.4778 2.55995 21.3152C2.50375 21.1526 2.49 20.9784 2.52001 20.809L2.54601 20.7L3.43801 17.668C2.49497 16.1093 1.99759 14.3218 2.00001 12.5C2.00001 6.977 6.47701 2.5 12 2.5ZM12 4.5C10.5676 4.49974 9.16147 4.88406 7.92834 5.61281C6.69521 6.34157 5.68036 7.38804 4.98977 8.64294C4.29918 9.89784 3.95817 11.3151 4.00237 12.7468C4.04656 14.1785 4.47433 15.5721 5.24101 16.782C5.43901 17.094 5.52401 17.478 5.45701 17.859L5.41801 18.022L4.97701 19.523L6.47801 19.082C6.91101 18.954 7.36101 19.032 7.71801 19.259C8.76634 19.9228 9.9547 20.3336 11.1892 20.459C12.4236 20.5844 13.6703 20.421 14.8307 19.9816C15.9911 19.5422 17.0334 18.8389 17.8752 17.9273C18.717 17.0157 19.3352 15.9208 19.6809 14.7291C20.0266 13.5374 20.0904 12.2817 19.8673 11.0611C19.6441 9.84053 19.14 8.6886 18.395 7.69638C17.65 6.70415 16.6843 5.89883 15.5744 5.34408C14.4645 4.78933 13.2408 4.50036 12 4.5ZM9.10201 7.684C9.21272 7.63606 9.33401 7.61776 9.45394 7.63091C9.57387 7.64406 9.68831 7.6882 9.78601 7.759C10.29 8.127 10.69 8.621 11.034 9.103L11.361 9.577L11.514 9.802C11.6023 9.93108 11.6456 10.0856 11.6373 10.2418C11.629 10.3979 11.5695 10.547 11.468 10.666L11.393 10.742L10.469 11.428C10.4245 11.4602 10.3932 11.5074 10.3809 11.5609C10.3686 11.6144 10.3761 11.6706 10.402 11.719C10.612 12.099 10.983 12.666 11.409 13.092C11.836 13.518 12.429 13.914 12.835 14.147C12.923 14.197 13.029 14.181 13.101 14.116L13.139 14.071L13.74 13.156C13.8503 13.009 14.0133 12.9105 14.1947 12.881C14.3761 12.8516 14.5618 12.8935 14.713 12.998L15.256 13.377C15.796 13.762 16.315 14.176 16.726 14.701C16.8024 14.7995 16.851 14.9167 16.8667 15.0403C16.8823 15.164 16.8645 15.2896 16.815 15.404C16.419 16.328 15.416 17.115 14.374 17.077L14.215 17.067L14.024 17.049C13.988 17.0447 13.952 17.0401 13.916 17.035L13.678 16.995C12.754 16.821 11.273 16.297 9.73801 14.763C8.20401 13.228 7.68001 11.747 7.50601 10.823L7.46601 10.585L7.44101 10.377L7.42801 10.202C7.42643 10.177 7.42509 10.152 7.42401 10.127C7.38601 9.083 8.17701 8.08 9.10201 7.684Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_89_7430">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

const heartsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="49"
    viewBox="0 0 48 49"
    fill="none"
  >
    <circle cx="24" cy="24.5" r="24" fill="#1C1B1F" fill-opacity="0.08" />
    <mask
      id="mask0_89_7436"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="12"
      y="12"
      width="24"
      height="25"
    >
      <rect x="12" y="12.5" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_89_7436)">
      <path
        d="M24 32.8267L22.8963 31.8345C21.2386 30.3307 19.8678 29.0384 18.7838 27.9577C17.6997 26.8769 16.8408 25.915 16.2068 25.072C15.5728 24.2292 15.1298 23.4602 14.878 22.7652C14.626 22.0704 14.5 21.3653 14.5 20.65C14.5 19.2308 14.9785 18.0427 15.9355 17.0855C16.8927 16.1285 18.0808 15.65 19.5 15.65C20.373 15.65 21.198 15.8542 21.975 16.2625C22.752 16.6708 23.427 17.2564 24 18.0192C24.573 17.2564 25.248 16.6708 26.025 16.2625C26.802 15.8542 27.627 15.65 28.5 15.65C29.9192 15.65 31.1073 16.1285 32.0645 17.0855C33.0215 18.0427 33.5 19.2308 33.5 20.65C33.5 21.3653 33.374 22.0704 33.122 22.7652C32.8702 23.4602 32.4272 24.2292 31.7932 25.072C31.1592 25.915 30.3018 26.8769 29.221 27.9577C28.1403 29.0384 26.7679 30.3307 25.1038 31.8345L24 32.8267ZM24 30.8C25.6 29.3603 26.9167 28.1263 27.95 27.098C28.9833 26.0698 29.8 25.1766 30.4 24.4182C31 23.6599 31.4167 22.9865 31.65 22.398C31.8833 21.8097 32 21.227 32 20.65C32 19.65 31.6667 18.8167 31 18.15C30.3333 17.4833 29.5 17.15 28.5 17.15C27.7103 17.15 26.9805 17.374 26.3105 17.822C25.6407 18.2702 25.1102 18.8936 24.7192 19.6922H23.2808C22.8833 18.8871 22.3512 18.2621 21.6845 17.8172C21.0178 17.3724 20.2897 17.15 19.5 17.15C18.5063 17.15 17.6746 17.4833 17.0048 18.15C16.3349 18.8167 16 19.65 16 20.65C16 21.227 16.1167 21.8097 16.35 22.398C16.5833 22.9865 17 23.6599 17.6 24.4182C18.2 25.1766 19.0167 26.0682 20.05 27.0932C21.0833 28.1182 22.4 29.3538 24 30.8Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
);
const heartsvgmob = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <circle cx="16" cy="16" r="16" fill="#1C1B1F" fill-opacity="0.08" />
    <mask
      id="mask0_89_5113"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="8"
      y="8"
      width="16"
      height="16"
    >
      <rect x="8" y="8" width="16" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_89_5113)">
      <path
        d="M16.0001 21.5511L15.2642 20.8896C14.1591 19.8871 13.2452 19.0256 12.5226 18.3051C11.7999 17.5846 11.2272 16.9433 10.8046 16.3813C10.3819 15.8194 10.0866 15.3068 9.91875 14.8435C9.75075 14.3803 9.66675 13.9102 9.66675 13.4333C9.66675 12.4872 9.98575 11.6951 10.6237 11.057C11.2619 10.419 12.054 10.1 13.0001 10.1C13.5821 10.1 14.1321 10.2361 14.6501 10.5083C15.1681 10.7805 15.6181 11.1709 16.0001 11.6795C16.3821 11.1709 16.8321 10.7805 17.3501 10.5083C17.8681 10.2361 18.4181 10.1 19.0001 10.1C19.9462 10.1 20.7383 10.419 21.3764 11.057C22.0144 11.6951 22.3334 12.4872 22.3334 13.4333C22.3334 13.9102 22.2494 14.3803 22.0814 14.8435C21.9135 15.3068 21.6182 15.8194 21.1956 16.3813C20.7729 16.9433 20.2013 17.5846 19.4807 18.3051C18.7603 19.0256 17.8454 19.8871 16.7359 20.8896L16.0001 21.5511ZM16.0001 20.2C17.0667 19.2402 17.9445 18.4175 18.6334 17.732C19.3223 17.0465 19.8667 16.451 20.2667 15.9455C20.6667 15.4399 20.9445 14.991 21.1001 14.5986C21.2556 14.2064 21.3334 13.818 21.3334 13.4333C21.3334 12.7666 21.1112 12.2111 20.6667 11.7666C20.2223 11.3222 19.6667 11.1 19.0001 11.1C18.4736 11.1 17.9871 11.2493 17.5404 11.548C17.0939 11.8468 16.7402 12.2624 16.4796 12.7948H15.5206C15.2556 12.258 14.9009 11.8414 14.4564 11.5448C14.012 11.2483 13.5265 11.1 13.0001 11.1C12.3376 11.1 11.7831 11.3222 11.3366 11.7666C10.89 12.2111 10.6667 12.7666 10.6667 13.4333C10.6667 13.818 10.7445 14.2064 10.9001 14.5986C11.0556 14.991 11.3334 15.4399 11.7334 15.9455C12.1334 16.451 12.6779 17.0455 13.3667 17.7288C14.0556 18.4121 14.9334 19.2359 16.0001 20.2Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
);

const cartsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="49"
    viewBox="0 0 48 49"
    fill="none"
  >
    <circle cx="24" cy="24.5" r="24" fill="#1C1B1F" fill-opacity="0.08" />
    <mask
      id="mask0_89_7441"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="12"
      y="12"
      width="24"
      height="25"
    >
      <rect x="12" y="12.5" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_89_7441)">
      <path
        d="M19.1538 34.0578C18.6679 34.0578 18.2548 33.8875 17.9145 33.547C17.5742 33.2067 17.404 32.7936 17.404 32.3078C17.404 31.8218 17.5742 31.4086 17.9145 31.0683C18.2548 30.7279 18.6679 30.5577 19.1538 30.5577C19.6398 30.5577 20.0529 30.7279 20.3933 31.0683C20.7336 31.4086 20.9038 31.8218 20.9038 32.3078C20.9038 32.7936 20.7336 33.2067 20.3933 33.547C20.0529 33.8875 19.6398 34.0578 19.1538 34.0578ZM28.8463 34.0578C28.3603 34.0578 27.9471 33.8875 27.6068 33.547C27.2664 33.2067 27.0963 32.7936 27.0963 32.3078C27.0963 31.8218 27.2664 31.4086 27.6068 31.0683C27.9471 30.7279 28.3603 30.5577 28.8463 30.5577C29.3321 30.5577 29.7452 30.7279 30.0855 31.0683C30.4258 31.4086 30.596 31.8218 30.596 32.3078C30.596 32.7936 30.4258 33.2067 30.0855 33.547C29.7452 33.8875 29.3321 34.0578 28.8463 34.0578ZM18.0153 18.25L20.55 23.5577H27.3673C27.4249 23.5577 27.4763 23.5433 27.5213 23.5145C27.5661 23.4857 27.6045 23.4456 27.6365 23.3943L30.3193 18.5193C30.3578 18.4488 30.3609 18.3863 30.3288 18.3318C30.2968 18.2773 30.2423 18.25 30.1653 18.25H18.0153ZM17.2963 16.75H31.1808C31.5898 16.75 31.899 16.9241 32.1085 17.2723C32.3182 17.6203 32.3282 17.9757 32.1385 18.3385L28.9345 24.1423C28.7705 24.4307 28.5536 24.6554 28.2838 24.8162C28.0138 24.9773 27.7179 25.0577 27.3963 25.0577H20.1L18.9423 27.173C18.8909 27.25 18.8893 27.3333 18.9375 27.423C18.9855 27.5128 19.0576 27.5577 19.1538 27.5577H30.596V29.0577H19.1538C18.4871 29.0577 17.9862 28.7703 17.651 28.1953C17.3157 27.6203 17.3038 27.0462 17.6155 26.473L19.0423 23.9078L15.404 16.25H13.5V14.75H16.3463L17.2963 16.75Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
);
const cartsvgmob = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <circle cx="16" cy="16" r="16" fill="#1C1B1F" fill-opacity="0.08" />
    <mask
      id="mask0_89_5118"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="8"
      y="8"
      width="16"
      height="16"
    >
      <rect x="8" y="8" width="16" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_89_5118)">
      <path
        d="M12.7692 22.3718C12.4453 22.3718 12.1699 22.2583 11.943 22.0313C11.7161 21.8044 11.6027 21.5291 11.6027 21.2052C11.6027 20.8812 11.7161 20.6057 11.943 20.3788C12.1699 20.1519 12.4453 20.0385 12.7692 20.0385C13.0932 20.0385 13.3686 20.1519 13.5955 20.3788C13.8224 20.6057 13.9358 20.8812 13.9358 21.2052C13.9358 21.5291 13.8224 21.8044 13.5955 22.0313C13.3686 22.2583 13.0932 22.3718 12.7692 22.3718ZM19.2308 22.3718C18.9068 22.3718 18.6314 22.2583 18.4045 22.0313C18.1776 21.8044 18.0642 21.5291 18.0642 21.2052C18.0642 20.8812 18.1776 20.6057 18.4045 20.3788C18.6314 20.1519 18.9068 20.0385 19.2308 20.0385C19.5547 20.0385 19.8301 20.1519 20.057 20.3788C20.2839 20.6057 20.3973 20.8812 20.3973 21.2052C20.3973 21.5291 20.2839 21.8044 20.057 22.0313C19.8301 22.2583 19.5547 22.3718 19.2308 22.3718ZM12.0102 11.8333L13.7 15.3718H18.2448C18.2833 15.3718 18.3175 15.3622 18.3475 15.343C18.3774 15.3238 18.403 15.2971 18.4243 15.2628L20.2128 12.0128C20.2385 11.9658 20.2406 11.9242 20.2192 11.8878C20.1978 11.8515 20.1615 11.8333 20.1102 11.8333H12.0102ZM11.5308 10.8333H20.7872C21.0598 10.8333 21.266 10.9494 21.4057 11.1815C21.5454 11.4135 21.5521 11.6504 21.4257 11.8923L19.2897 15.7615C19.1803 15.9538 19.0357 16.1036 18.8558 16.2108C18.6758 16.3182 18.4786 16.3718 18.2642 16.3718H13.4L12.6282 17.782C12.5939 17.8333 12.5929 17.8889 12.625 17.9487C12.657 18.0086 12.7051 18.0385 12.7692 18.0385H20.3973V19.0385H12.7692C12.3247 19.0385 11.9908 18.8468 11.7673 18.4635C11.5438 18.0802 11.5359 17.6974 11.7437 17.3153L12.6948 15.6052L10.2693 10.5H9V9.5H10.8975L11.5308 10.8333Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
);

const usersvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="49"
    viewBox="0 0 48 49"
    fill="none"
  >
    <circle cx="24" cy="24.5" r="24" fill="#1C1B1F" fill-opacity="0.08" />
    <mask
      id="mask0_89_7446"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="12"
      y="12"
      width="24"
      height="25"
    >
      <rect x="12" y="12.5" width="24" height="24" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_89_7446)">
      <path
        d="M24 24.1922C23.0375 24.1922 22.2136 23.8496 21.5283 23.1642C20.8428 22.4787 20.5 21.6547 20.5 20.6922C20.5 19.7297 20.8428 18.9058 21.5283 18.2205C22.2136 17.535 23.0375 17.1922 24 17.1922C24.9625 17.1922 25.7864 17.535 26.4718 18.2205C27.1573 18.9058 27.5 19.7297 27.5 20.6922C27.5 21.6547 27.1573 22.4787 26.4718 23.1642C25.7864 23.8496 24.9625 24.1922 24 24.1922ZM16.5 31.8077V29.5845C16.5 29.0948 16.633 28.6413 16.899 28.224C17.165 27.8067 17.5205 27.4858 17.9655 27.2615C18.9538 26.777 19.9509 26.4136 20.9567 26.1712C21.9626 25.9289 22.977 25.8077 24 25.8077C25.023 25.8077 26.0374 25.9289 27.0433 26.1712C28.0491 26.4136 29.0462 26.777 30.0345 27.2615C30.4795 27.4858 30.835 27.8067 31.101 28.224C31.367 28.6413 31.5 29.0948 31.5 29.5845V31.8077H16.5ZM18 30.3077H30V29.5845C30 29.382 29.9413 29.1945 29.824 29.022C29.7067 28.8497 29.5474 28.709 29.3462 28.6C28.4846 28.1757 27.6061 27.8542 26.7107 27.6355C25.8152 27.417 24.9117 27.3077 24 27.3077C23.0883 27.3077 22.1848 27.417 21.2893 27.6355C20.3939 27.8542 19.5154 28.1757 18.6537 28.6C18.4526 28.709 18.2933 28.8497 18.176 29.022C18.0587 29.1945 18 29.382 18 29.5845V30.3077ZM24 22.6922C24.55 22.6922 25.0208 22.4964 25.4125 22.1047C25.8042 21.7131 26 21.2422 26 20.6922C26 20.1422 25.8042 19.6714 25.4125 19.2797C25.0208 18.8881 24.55 18.6922 24 18.6922C23.45 18.6922 22.9792 18.8881 22.5875 19.2797C22.1958 19.6714 22 20.1422 22 20.6922C22 21.2422 22.1958 21.7131 22.5875 22.1047C22.9792 22.4964 23.45 22.6922 24 22.6922Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
);
const usersvgmob = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
  >
    <circle cx="16" cy="16" r="16" fill="#1C1B1F" fill-opacity="0.08" />
    <mask
      id="mask0_89_5123"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="8"
      y="8"
      width="16"
      height="16"
    >
      <rect x="8" y="8" width="16" height="16" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_89_5123)">
      <path
        d="M16 15.795C15.3583 15.795 14.8091 15.5665 14.3522 15.1096C13.8952 14.6526 13.6667 14.1033 13.6667 13.4616C13.6667 12.82 13.8952 12.2707 14.3522 11.8138C14.8091 11.3568 15.3583 11.1283 16 11.1283C16.6417 11.1283 17.1909 11.3568 17.6478 11.8138C18.1048 12.2707 18.3333 12.82 18.3333 13.4616C18.3333 14.1033 18.1048 14.6526 17.6478 15.1096C17.1909 15.5665 16.6417 15.795 16 15.795ZM11 20.872V19.3898C11 19.0634 11.0887 18.761 11.266 18.4828C11.4433 18.2046 11.6803 17.9907 11.977 17.8411C12.6359 17.5181 13.3006 17.2759 13.9712 17.1143C14.6417 16.9527 15.318 16.872 16 16.872C16.682 16.872 17.3583 16.9527 18.0288 17.1143C18.6994 17.2759 19.3641 17.5181 20.023 17.8411C20.3197 17.9907 20.5567 18.2046 20.734 18.4828C20.9113 18.761 21 19.0634 21 19.3898V20.872H11ZM12 19.872H20V19.3898C20 19.2548 19.9609 19.1298 19.8827 19.0148C19.8044 18.8999 19.6983 18.8061 19.5642 18.7335C18.9897 18.4506 18.4041 18.2362 17.8072 18.0905C17.2102 17.9448 16.6078 17.872 16 17.872C15.3922 17.872 14.7898 17.9448 14.1928 18.0905C13.5959 18.2362 13.0103 18.4506 12.4358 18.7335C12.3017 18.8061 12.1956 18.8999 12.1173 19.0148C12.0391 19.1298 12 19.2548 12 19.3898V19.872ZM16 14.795C16.3667 14.795 16.6806 14.6644 16.9417 14.4033C17.2028 14.1422 17.3333 13.8283 17.3333 13.4616C17.3333 13.095 17.2028 12.7811 16.9417 12.52C16.6806 12.2589 16.3667 12.1283 16 12.1283C15.6333 12.1283 15.3194 12.2589 15.0583 12.52C14.7972 12.7811 14.6667 13.095 14.6667 13.4616C14.6667 13.8283 14.7972 14.1422 15.0583 14.4033C15.3194 14.6644 15.6333 14.795 16 14.795Z"
        fill="#1C1B1F"
      />
    </g>
  </svg>
);
const navsvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="13"
    viewBox="0 0 18 13"
    fill="none"
  >
    <path
      d="M0 12.5V10.5H18V12.5H0ZM0 7.5V5.5H18V7.5H0ZM0 2.5V0.5H18V2.5H0Z"
      fill="black"
    />
  </svg>
);

const navsvgact = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="13"
    viewBox="0 0 18 13"
    fill="none"
  >
    <path
      d="M0 12.5V10.5H18V12.5H0ZM0 7.5V5.5H18V7.5H0ZM0 2.5V0.5H18V2.5H0Z"
      fill="white"
    />
  </svg>
);

interface HomeData {
  homepage_titles: any[];
  main_categories: any[];
  whatsapp_number: string;
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useStore(
    (state) =>
      [state.isModalOpen, state.setIsModalOpen] as [
        boolean,
        (open: boolean) => void
      ]
  );

  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { homeData } = useSetHomeData() as {
    homeData: AxiosResponse<HomeData> | undefined;
  };

  const whatsappNumber = homeData?.data.whatsapp_number;

  return (
    <div className="header py-[6px] sm:py-[16px] border-b-[1px] border-b-[#E6E6E8]">
      <div className="container mx-auto">
        <SignInPopup />
        <div className="flex justify-between">
          <Link href={"/"}>
            <div className="h-[67px] sm:h-[85px]">
              <Image
                src={logo}
                alt="Logo.png"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
          <div className="gap-[40px] items-center hidden sm:flex">
            <button>
              <Link
                href={"/login"}
                className="flex bg-black py-[12px] px-[24px] text-white rounded-3xl"
              >
                {whatsappsvg} <h1 className="ml-2">+91{whatsappNumber}</h1>
              </Link>
            </button>
            <div className="flex gap-[24px]">
              <Link href={"/wishlist"}>
                <div
                  className={`w-[48px] h-[48px] flex items-center rounded-full  ${
                    pathname === "/wishlist" && "border-[1px] border-black"
                  }`}
                >
                  {heartsvg}
                </div>
              </Link>
              <Link href={"/cart"}>
                <div
                  className={`w-[48px] h-[48px] flex items-center rounded-full  ${
                    pathname === "/cart" && "border-[1px] border-black"
                  }`}
                >
                  {cartsvg}
                </div>
              </Link>
              <Link href={"/profile"}>
                <div
                  className={`w-[48px] h-[48px] flex items-center rounded-full  ${
                    pathname === "/profile" && "border-[1px] border-black"
                  }`}
                >
                  {usersvg}
                </div>
              </Link>

              <div
                onClick={() => setIsModalOpen(true)}
                className={`w-[48px] h-[48px] flex items-center rounded-full  ${
                  pathname === "/profile" && "border-[1px] border-black"
                }`}
              >
                {usersvg}
              </div>
            </div>
          </div>
          <div className="flex sm:hidden items-center">
            <div className="block">
              <div
                className={`p-[16px] rounded border-[1px] border-[#E6E6E8] cursor-pointer ${
                  isNavOpen ? "bg-black" : "bg-white"
                }`}
                onClick={() => {
                  setIsNavOpen(!isNavOpen);
                }}
              >
                {!isNavOpen ? (
                  <div className="h-[12px] w-[18px]"> {navsvg}</div>
                ) : (
                  <div className="h-[12px] w-[18px]"> {navsvgact}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        {isNavOpen && (
          <div className="flex justify-between my-2">
            <div>
              <div className="rounded-full bg-black w-[32px] h-[32px] flex items-center justify-center">
                {whatsappsvg}
              </div>
            </div>
            <div className="flex gap-[24px]">
              <Link href={"/wishlist"}>
                <div
                  className={`w-[32px] h-[32px] flex items-center rounded-full  ${
                    pathname === "/wishlist" && "border-[1px] border-black"
                  }`}
                >
                  {heartsvgmob}
                </div>
              </Link>
              <Link href={"/cart"}>
                <div
                  className={`w-[32px] h-[32px] flex items-center rounded-full  ${
                    pathname === "/cart" && "border-[1px] border-black"
                  }`}
                >
                  {cartsvgmob}
                </div>
              </Link>
              <Link href={"/profile"}>
                <div
                  className={`w-[32px] h-[32px] flex items-center rounded-full  ${
                    pathname === "/profile" && "border-[1px] border-black"
                  }`}
                >
                  {usersvgmob}
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
