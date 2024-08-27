'use client';

import React from "react";
import Image from "next/image";

import img1 from "../../assets/products/img1.png";
import img2 from "../../assets/products/img2.png";
import img3 from "../../assets/products/img3.png";
import img4 from "../../assets/products/img4.png";
import img5 from "../../assets/products/img5.png";
import img6 from "../../assets/products/img6.png";
import img7 from "../../assets/products/img7.png";
import img8 from "../../assets/products/img8.png";
import img9 from "../../assets/products/img9.png";
import img10 from "../../assets/products/img10.png";
import img11 from "../../assets/products/img11.png";
import Link from "next/link";
import useStore from "@/store/store";

const MAX_COLUMNS = 4;

export default function ProductGrid() {
  const productsData = [
    { id: 1, Image: img1 },
    { id: 2, Image: img2 },
    { id: 3, Image: img3 },
    { id: 4, Image: img4 },
    { id: 5, Image: img5 },
    { id: 6, Image: img6 },
    { id: 7, Image: img7 },
    { id: 8, Image: img8 },
    { id: 9, Image: img9 },
    { id: 10, Image: img10 },
    { id: 11, Image: img11 },
  ];

  const togglePanel = useStore((state) => state.togglePanel);

  return (
    <div className="flex flex-col gap-4 mb-12">
      <div className="flex items-center gap-4">
        <div
          onClick={togglePanel}
          className="w-fit rounded-full bg-black p-2 cursor-pointer md:hidden block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </div>

        <p className="md:text-[28px] text-[14px] font-[600]">
          Men's Collection - BELT / TIES / SUNGLASSES
        </p>
      </div>
      <div className="columns-2 gap-3 w-full mx-auto space-y-3 md:pb-10 pb-4">
        {productsData.map((product) => (
          <div className="bg-gray-100 break-inside-avoid">
            <Link href={`/products/${product.id}`}>
              <Image src={product.Image} alt="Product Image" />
            </Link>
          </div>
        ))}
      </div>

      <div className="w-full flex md:flex-row flex-col-reverse items-center justify-center md:relative md:gap-0 gap-2">
        <button className="bg-black text-white md:text-[16px] text-[14px] md:px-14 px-6 md:py-4 py-2 rounded-[20px] w-fit">
          Load More
        </button>
        <p className="md:text-right text-center text-[16px] w-full md:absolute md:right-0">
          Showing 11 results out of 12,000
        </p>
      </div>
    </div>
  );
}
