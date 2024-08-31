"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFetchCart } from "@/hooks/useFetchCart";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useAddToWishlist } from "@/hooks/useAddToWishlist";

export default function Cart() {
  const { data: cartItems = [], isLoading, isError } = useFetchCart();
  const addToWishlistMutation = useAddToWishlist();

  const handleAddToWishlist = (productId: number) => {
    addToWishlistMutation.mutate(productId, {
      onSuccess: (data) => {
        // Show a success message to the user
        alert(data.message);
      },
    });
  };

  const addToCartMutation = useAddToCart();

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate(
      { product_id: productId, quantity: 1 },
      {
        onSuccess: (data) => {
          alert(data.message);
        },
      }
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading cart.</div>;
  }

  return (
    <div className="bg-[#f0f0f0] md:py-0 py-10">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <h1 className="text-2xl md:text-[32px] font-[600] mb-2">
          Cart ({cartItems.length})
        </h1>
        <p className="text-gray-600 mb-10 text-sm md:text-[14px]">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Cart
        </p>

        <div className="bg-gray-100 rounded-[20px] overflow-hidden">
          <div className="hidden md:grid grid-cols-3 gap-4 p-4 bg-[#d3d3d3] font-semibold">
            <div className="flex justify-center items-center">
              <p>Sl.no</p>
            </div>
            <div className="flex justify-center items-center">
              <p>Product</p>
            </div>
            <div className="flex justify-center items-center">
              <p>Action</p>
            </div>
          </div>

          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col md:grid md:grid-cols-3 gap-4 p-4 border-b border-gray-200 items-center"
            >
              <div className="flex justify-between md:justify-center items-center w-full md:w-auto">
                <p className="font-semibold md:font-normal md:hidden">Sl.no</p>
                <p>{index + 1}</p>
              </div>
              <div className="flex justify-center items-center w-full">
                <div className="w-full h-40 md:w-40 md:h-40 relative rounded-[20px] overflow-hidden">
                  <Image
                    src={item.product.image}
                    alt={`Product ${item.id}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[20px]"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center w-full space-y-2 md:space-y-0 md:space-x-2">
                <button
                  onClick={() => handleAddToWishlist(item.product.id)}
                  className="bg-black text-white px-5 py-2 rounded-md text-sm font-[500] w-full md:w-auto"
                >
                  Add to Favourites
                </button>
                <button
                  onClick={() => handleAddToCart(item.product.id)}
                  className="bg-[#e6e6e8] text-gray-800 px-5 py-2 rounded-md text-sm font-[500] w-full md:w-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-black text-white px-4 py-4 rounded-[20px] text-sm w-full mt-6 md:mt-10">
          Enquire Now
        </button>
      </div>
    </div>
  );
}
