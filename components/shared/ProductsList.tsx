'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useStore from "@/store/store";
import { useSubCategoryProducts } from "@/hooks/useSubCategoryProducts";

interface Product {
  id: number;
  image: string;
  date: string;
  is_active: boolean;
  maincategory: number;
  productcategory: number;
}

export default function ProductGrid() {
  const togglePanel = useStore((state) => state.togglePanel);
  const selectedSubcategory = useStore((state) => state.selectedSubcategory);

  // Ensure categoryId is a valid string
  const categoryId = selectedSubcategory || ""; // Keep as string

  const { data, isLoading, error } = useSubCategoryProducts(categoryId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>; // Display error message

  const products = data?.data.products || [];
  const subcategoryName = data?.data.subcategory_name || "Products";

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="md:text-[28px] text-[14px] font-[600] mt-[10%]">
          No products found
        </p>
      </div>
    );
  }

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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </div>

        <p className="md:text-[28px] text-[14px] font-[600]">
          {subcategoryName}
        </p>
      </div>
      <div className="columns-2 gap-3 w-full mx-auto space-y-3 md:pb-10 pb-4">
        {products.map((product: Product) => (
          <div key={product.id} className="bg-gray-100 break-inside-avoid rounded-[20px] overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image}
                alt="Product Image"
                width={500}
                height={500}
                className="object-contain w-full h-auto"
              />
            </Link>
          </div>
        ))}
      </div>

      <div className="w-full flex md:flex-row flex-col-reverse items-center justify-center md:relative md:gap-0 gap-2">
        <button className="bg-black text-white md:text-[16px] text-[14px] md:px-14 px-6 md:py-4 py-2 rounded-[20px] w-fit">
          Load More
        </button>
        <p className="md:text-right text-center text-[16px] w-full md:absolute md:right-0">
          Showing {products.length} results
        </p>
      </div>
    </div>
  );
}
