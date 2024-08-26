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

export default function ProductGrid() {
  const productsData = [
    { id: 1, img: img1 },
    { id: 2, img: img2 },
    { id: 3, img: img3 },
    { id: 4, img: img4 },
    { id: 5, img: img5 },
    { id: 6, img: img6 },
    { id: 7, img: img7 },
    { id: 8, img: img8 },
    { id: 9, img: img9 },
    { id: 10, img: img10 },
    { id: 11, img: img11 }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {productsData.map((product) => (
        <div key={product.id} className="relative w-full">
          <Image
            src={product.img}
            alt={`Product ${product.id}`}
            layout="responsive"
            width={100}
            height={100}
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  );
}