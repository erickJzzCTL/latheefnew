'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useSubCategories } from '@/hooks/useSubCategoryData';

interface Subcategory {
  id: number;
  name: string;
  image: string;
}

interface SubCategoryData {
  subcategories: Subcategory[];
  maincategory_name: string;
}

const NavSvg: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className="w-full h-full"
  >
    <path
      d="M18.0001 5C18.2653 5 18.5196 5.10536 18.7072 5.29289C18.8947 5.48043 19.0001 5.73478 19.0001 6V14C19.0001 14.2652 18.8947 14.5196 18.7072 14.7071C18.5196 14.8946 18.2653 15 18.0001 15C17.7348 15 17.4805 14.8946 17.293 14.7071C17.1054 14.5196 17.0001 14.2652 17.0001 14V8.414L7.05006 18.364C6.86146 18.5462 6.60885 18.647 6.34666 18.6447C6.08446 18.6424 5.83365 18.5372 5.64824 18.3518C5.46283 18.1664 5.35766 17.9156 5.35538 17.6534C5.35311 17.3912 5.4539 17.1386 5.63606 16.95L15.5861 7H10.0001C9.73484 7 9.48049 6.89464 9.29295 6.70711C9.10542 6.51957 9.00006 6.26522 9.00006 6C9.00006 5.73478 9.10542 5.48043 9.29295 5.29289C9.48049 5.10536 9.73484 5 10.0001 5H18.0001Z"
      fill="white"
    />
  </svg>
);

const SubcategoryCard: React.FC<{ item: Subcategory }> = ({ item }) => {
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/categoryFilter/${item.id}`);
  };

  return (
    <div className="rounded-lg overflow-hidden h-[200px] md:h-[400px] relative">
      <Image
        src={item.image}
        className="h-full w-full object-cover cursor-pointer"
        width={1000}
        height={1000}
        alt={`Product ${item.name}`}
        onClick={handleImageClick}
      />
      <Link
        href={`/categoryFilter/${item.id}`}
        className="absolute bottom-0 w-full px-2 sm:px-4 py-2 sm:my-4"
      >
        <div className="bg-white text-black px-2 sm:px-6 py-2 sm:py-4 rounded-lg text-[10px] sm:text-[14px] lg:text-[18px] flex justify-between items-center">
          <h1>{item.name}</h1>
          <div className="rounded-full bg-black w-[26px] sm:w-[30px] md:w-[46px] h-[26px] sm:h-[30px] md:h-[46px] flex items-center justify-center">
            <NavSvg />
          </div>
        </div>
      </Link>
    </div>
  );
};

const CategoryProduct: React.FC = () => {
  const params = useParams();
  const categoryId = params.categoryid as string;

  const { data, isLoading, error } = useSubCategories(categoryId) as {
    data?: { data: SubCategoryData };
    isLoading: boolean;
    error: unknown;
  };

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const subcategories = data?.data.subcategories || [];
  const product_collection = data?.data.maincategory_name || 'Collections';

  return (
    <div className="bg-[#F0F0F0]">
      <div className="container mx-auto">
        <h1 className="text-center sm:text-left text-[20px] sm:text-[30px] md:text-[40px] font-semibold pt-6 sm:pt-10">
          {product_collection} Collection
        </h1>
        {isLoading ? (
          <div className="pt-4 pb-14">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-10">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 animate-pulse rounded-lg overflow-hidden h-[200px] md:h-[400px]"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-4 pb-14">
            {subcategories.length === 0 ? (
              <p>No Data Found</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-10">
                {subcategories.map(item => (
                  <SubcategoryCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
