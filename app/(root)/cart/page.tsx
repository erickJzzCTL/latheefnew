import Image from "next/image";
import Link from "next/link";

import img1 from "../../../assets/products/img1.png";
import img2 from "../../../assets/products/img2.png";
import img3 from "../../../assets/products/img3.png";
import img4 from "../../../assets/products/img4.png";

const cartItems = [
  { id: "01", image: img1 },
  { id: "02", image: img2 },
  { id: "03", image: img3 },
  { id: "04", image: img4 },
];

export default function Cart() {
  return (
    <div className="bg-[#f0f0f0]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-[32px] font-[600] mb-2">Cart(07)</h1>
        <p className="text-gray-600 mb-10 text-[14px]">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Cart
        </p>

        <div className="bg-gray-100 rounded-[20px] overflow-hidden">
          <div className="grid grid-cols-3 gap-4 p-4 bg-[#d3d3d3] font-semibold">
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

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 items-center"
            >
              <div className="flex justify-center items-center">
                <p>{item.id}</p>
              </div>
              <div className="flex justify-center items-center">
                <div className="w-40 h-40 relative rounded-[20px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`Product ${item.id}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[20px]"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="flex space-x-2">
                  <button className="bg-black text-white px-4 py-2 rounded-md text-[16px]">
                    Add to Favourites
                  </button>
                  <button className="bg-[#e6e6e8] text-gray-800 px-4 py-2 rounded-md text-[16px]">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-black text-white px-4 py-4 rounded-[20px] text-[16px] w-full mt-10">Enquire Now</button>
      </div>
    </div>
  );
}
