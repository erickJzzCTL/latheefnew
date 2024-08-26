import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["600"], // Specify the weights you need
  subsets: ["latin"],
  display: "swap",
});

export default function SubHeader() {
  return (
    <div className="grid grid-cols-3">
      <div className="flex items-center justify-center rounded-[20px] border-[1px] border-[#E6E6E8] px-[12px] py-[24px] gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          fill="none"
        >
          <rect width="64" height="64" rx="32" fill="#000" />
          <mask
            id="a"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="16"
            y="16"
            width="32"
            height="32"
          >
            <path fill="#D9D9D9" d="M16 16h32v32H16z" />
          </mask>
          <g mask="url(#a)">
            <path
              d="m24 30.6-1.333.733a1.306 1.306 0 0 1-1 .134 1.225 1.225 0 0 1-.8-.6L18.2 26.2a1.306 1.306 0 0 1-.133-1c.089-.356.289-.622.6-.8l7.667-4.4h2.333c.2 0 .361.061.483.183a.653.653 0 0 1 .184.484v.666c0 .734.26 1.361.783 1.884.522.522 1.15.783 1.883.783.734 0 1.361-.261 1.884-.783.522-.523.783-1.15.783-1.884v-.666c0-.2.061-.361.183-.484a.654.654 0 0 1 .484-.183h2.333l7.667 4.4c.31.178.51.444.6.8.089.356.044.689-.134 1l-2.666 4.667a1.163 1.163 0 0 1-.784.583 1.43 1.43 0 0 1-1.016-.15L40 30.633v12.034c0 .377-.127.694-.383.95a1.29 1.29 0 0 1-.95.383H25.334a1.29 1.29 0 0 1-.95-.383 1.29 1.29 0 0 1-.384-.95V30.6Z"
              fill="#fff"
            />
          </g>
        </svg>
        <p className={`${poppins.className} font-semibold`}>
          100% Quality Products
        </p>
      </div>
    </div>
  );
}
