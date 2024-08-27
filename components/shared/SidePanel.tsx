"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Mens Collection",
    subcategories: ["Shirts", "Pants", "Shoes"],
  },
  {
    id: 2,
    name: "womens Collection",
    subcategories: ["Dresses", "Tops", "Skirts"],
  },
  {
    id: 3,
    name: "Boys Collection",
    subcategories: ["T-shirts", "Jeans", "Jackets"],
  },
  {
    id: 4,
    name: "Girls Collection",
    subcategories: ["Dresses", "Tops", "Accessories"],
  },
  {
    id: 5,
    name: "Louis Vuitton Women Bags",
    subcategories: ["Handbags", "Totes", "Clutches"],
  },
  {
    id: 6,
    name: "Louis Vuitton men Bags",
    subcategories: ["Briefcases", "Backpacks", "Messenger Bags"],
  },
];

export default function SidePanel() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const panelContent = (
    <div className="border-[1px] border-[#E6E6E8] md:rounded-[20px] px-6 py-4 md:h-fit h-full bg-white">
      <h2 className="text-[24px] font-[500] mb-4">Main Category</h2>
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
                  {category.subcategories.map((sub, index) => (
                    <div key={index} className="py-2 cursor-pointer">
                      {sub}
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
