"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useStore from "@/store/store";
import { useSetHomeData } from "@/hooks/useHomeData";

interface SubCategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: SubCategory[]; // Use SubCategory objects instead of names only
}

interface HomeData {
  data?: {
    main_categories?: {
      id: number;
      name: string;
      sub_category: SubCategory[];
    }[];
  };
}

export default function SidePanel() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const isOpen = useStore((state) => state.isOpen);
  const togglePanel = useStore((state) => state.togglePanel);
  const setSelectedSubcategory = useStore(
    (state) => state.setSelectedSubcategory
  );
  const [isMobile, setIsMobile] = useState(false);
  const { homeData } = useSetHomeData() as { homeData: HomeData };

  const categories: Category[] =
    homeData?.data?.main_categories?.map((category) => ({
      id: category.id,
      name: category.name,
      subcategories: category.sub_category.map((sub) => ({
        id: sub.id,
        name: sub.name,
      })),
    })) || [];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleCategory = (id: number) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  const handleSubcategoryClick = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId.toString()); // Convert ID to string
    if (isMobile) togglePanel(); // Close the panel on mobile after selection
  };

  const panelContent = (
    <div className="border-[1px] border-[#E6E6E8] md:rounded-[20px] px-6 py-4 md:h-fit h-full bg-white mb-10">
      <div className="flex justify-between items-center">
        <p className="text-[24px] font-[500] mb-4">Main Category</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x cursor-pointer -mt-2 md:hidden block"
          onClick={togglePanel}
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </div>
      {categories.map((category, index) => (
        <div key={category.id}>
          <div
            className={`py-3 flex justify-between items-center cursor-pointer ${
              index !== categories.length - 1 ? "border-b border-[#E6E6E8]" : ""
            }`}
            onClick={() => toggleCategory(category.id)}
          >
            <span>{category.name}</span>
            <motion.span
              className="text-gray-400"
              animate={{ rotate: openCategory === category.id ? 0 : -90 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.span>
          </div>
          <AnimatePresence>
            {openCategory === category.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pl-4 py-2">
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="py-2 cursor-pointer"
                      onClick={() => handleSubcategoryClick(sub.id)}
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {isMobile ? (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-sm z-40 overflow-y-auto"
            >
              {panelContent}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        panelContent
      )}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={togglePanel}
        />
      )}
    </>
  );
}
