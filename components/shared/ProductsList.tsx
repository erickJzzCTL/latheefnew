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

  return (
    <div className="flex flex-col gap-4 mb-12">
      <div>
        <p className="text-[28px] font-[600]">
          Men's Collection - BELT / TIES / SUNGLASSES
        </p>
      </div>
      <div className="columns-2 gap-3 w-full mx-auto space-y-3 pb-10">
        {productsData.map((product) => (
          <div className="bg-gray-100 break-inside-avoid">
            <Image src={product.Image} alt="Product Image" />
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-center relative">
        <button className="bg-black text-white text-[16px] px-14 py-4 rounded-[20px] w-fit">
          Load More
        </button>
        <p className="text-right text-[16px] w-full absolute right-0">
          Showing 11 results out of 12,000
        </p>
      </div>
    </div>
  );
}
