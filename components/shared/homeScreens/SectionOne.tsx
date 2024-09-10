import React, { useState } from "react";
import { useSetHomeData } from "@/hooks/useHomeData";
import { AxiosResponse } from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MainCategory {
  id: number;
  name: string;
  image: string;
  subcategories?: { id: number; name: string }[];
}

interface HomeData {
  main_categories: MainCategory[];
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
      fill="currentColor"
    />
  </svg>
);

const CategoryCard: React.FC<{ category: MainCategory; index: number }> = ({
  category,
  index,
}) => {
  const [activeSubcategory, setActiveSubcategory] = useState(
    category.subcategories?.[0]?.id
  );

  const router = useRouter();

  const handleImageClick = () => {
    if (category.name !== "Kids") {
      router.push(`/categoryProduct/${category.id}`);
    }
  };

  return (
    <div
      className={`relative ${index === 2 ? "col-span-2 md:col-span-1" : ""}`}
    >
      <div className="h-[250px] sm:h-[416px] md:h-[580px] rounded-lg overflow-hidden">
        <Image
          src={category?.image || "/"}
          alt={`${category.name}`}
          width={1000}
          height={1000}
          className={`w-full h-full object-cover md:object-[15%_50%] ${
            category.name !== "Kids" ? "cursor-pointer" : ""
          }`}
          onClick={handleImageClick}
        />
      </div>
      <div className="absolute bottom-0 w-full px-2 sm:px-4 py-2 sm:my-4">
        <div className="bg-white text-black px-2 sm:px-6 py-2 sm:py-4 rounded-lg text-[12px] sm:text-[14px] lg:text-[18px]">
          {category.id !== 1 && category.id !== 2 && (
            <h1 className="text-2xl">{category.name}</h1>
          )}
          {category.subcategories ? (
            <div className="flex gap-4 mt-4">
              {category.subcategories.map((subcategory, subIndex) => (
                <Link
                  key={subcategory.id}
                  href={`/categoryProduct/${subcategory.id}`}
                  className={`px-[32px] py-[12px] rounded-lg bg-[#E6E6E8] hover:bg-black hover:text-white `}
                  onClick={(e) => {
                    setActiveSubcategory(subcategory.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {subIndex === 0 ? "Boys" : "Girls"}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              href={`/categoryProduct/${category.id}`}
              className="flex justify-between items-center"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span>{category.name}</span>
              <div className="rounded-full bg-black w-[26px] sm:w-[30px] md:w-[46px] h-[26px] sm:h-[30px] md:h-[46px] flex items-center justify-center text-white">
                <NavSvg />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const SectionOne: React.FC = () => {
  const { homeData } = useSetHomeData() as {
    homeData: AxiosResponse<HomeData> | undefined;
  };

  // Combine boys and girls categories into a single "Kids" category
  const mainCategories =
    homeData?.data?.main_categories.reduce((acc, category) => {
      if (category.id === 3 || category.id === 5) {
        const kidsCategory = acc.find((c) => c.name === "Kids");
        if (kidsCategory) {
          kidsCategory.subcategories?.push({
            id: category.id,
            name: category.name,
          });
        } else {
          acc.push({
            id: acc.length + 1,
            name: "Kids",
            image: category.image, // You might want to use a different image for the combined category
            subcategories: [{ id: category.id, name: category.name }],
          });
        }
      } else {
        acc.push(category);
      }
      return acc;
    }, [] as MainCategory[]) ?? [];

  return (
    <div className="container mx-auto mt-10 md:mb-24 mb-14">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {mainCategories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionOne;
