'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSubCategoryProducts } from '@/hooks/useSubCategoryProducts';
import useStore from '@/store/store';

interface Product {
  id: number;
  image: string;
  date: string;
  is_active: boolean;
  maincategory: number;
  productcategory: number;
}

export default function ProductGrid() {
  const { categoryid } = useParams<{ categoryid: string }>();
  const setOpenCategory = useStore(state => state.setOpenCategory);
  const togglePanel = useStore(state => state.togglePanel);

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [subcategoryId, setSubcategoryId] = useState<string | null>(
    categoryid || ''
  );

  const { data, isLoading, error } = useSubCategoryProducts(
    subcategoryId || '',
    page
  );

  useEffect(() => {
    if (categoryid && categoryid !== subcategoryId) {
      setSubcategoryId(categoryid);
    }
  }, [categoryid]);

  useEffect(() => {
    if (data && data.data.products) {
      // Deduplicate products before updating state
      const newProducts = data.data.products.filter(
        newProduct =>
          !allProducts.some(
            existingProduct => existingProduct.id === newProduct.id
          )
      );
      setAllProducts(prev => [...prev, ...newProducts]);
    }
  }, [data]);

  useEffect(() => {
    setAllProducts([]);
    setPage(1);
  }, [subcategoryId]);

  useEffect(() => {
    if (allProducts.length > 0) {
      setOpenCategory(
        typeof allProducts[0]?.maincategory === 'number'
          ? allProducts[0].maincategory
          : typeof categoryid === 'string'
          ? parseInt(categoryid)
          : null
      );
    }
  }, [allProducts, categoryid, setOpenCategory]);

  if (!subcategoryId || isNaN(Number(subcategoryId))) {
    return (
      <div>
        <p className="md:text-[28px] text-[14px] font-[600]">
          No valid subcategory selected
        </p>
      </div>
    );
  }

  if (isLoading && allProducts.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  const remainingProducts = data?.data.remaining_products || 0;
  const subcategoryName = data?.data.subcategory_name || 'Products';
  const maincategoryName = data?.data.maincategory_name || 'Collections';

  if (!allProducts || allProducts.length === 0) {
    return (
      <div>
        <div className="flex items-center gap-2">
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
            {maincategoryName} - {subcategoryName}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="md:text-[28px] text-[14px] font-[600] mt-[10%] mb-[10%]">
            No products found
          </p>
        </div>
      </div>
    );
  }

  const handleLoadMore = () => {
    if (data?.data.next) {
      setPage(prev => prev + 1);
    }
  };

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
          {maincategoryName} - {subcategoryName}
        </p>
      </div>
      <div className="columns-2 gap-3 w-full mx-auto space-y-3 md:pb-10 pb-4">
        {allProducts.map((product: Product) => (
          <div
            key={product.id}
            className="bg-gray-100 break-inside-avoid rounded-[20px] overflow-hidden"
          >
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

      {remainingProducts > 0 && (
        <div className="w-full flex md:flex-row flex-col-reverse items-center justify-center md:justify-between md:gap-0 gap-2">
          <button
            onClick={handleLoadMore}
            className="bg-black text-white cursor-pointer md:text-[16px] text-[14px] md:px-14 px-6 md:py-4 py-2 rounded-[20px] w-fit md:ml-[40%]"
          >
            Load More
          </button>
          <p className="md:text-right text-center text-[16px] w-full md:w-[35%]">
            {remainingProducts} products remaining
          </p>
        </div>
      )}
    </div>
  );
}
