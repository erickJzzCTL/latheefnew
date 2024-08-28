'use client';

import useStore from "@/store/store";
import { log } from "console";

type HomeDataItem = {
  image: string;
  id: number;
  title: string;
};

export default function SubHeader() {
  const { homeData } = useStore((state) => ({ homeData: state.homeData }));
  
  // Ensure homeData and homepage_titles are properly accessed and not undefined
  const subheaderData = homeData?.homepage_titles ?? [];
console.log(homeData);

  console.log(subheaderData);
  

  return (
    <div className="container mx-auto">
      <div className="flex md:gap-6 gap-2 justify-between md:mt-10 mt-6">
        {subheaderData.map((item: HomeDataItem) => (
          <div
            key={item.id}
            className="flex md:flex-row flex-col items-center md:justify-start justify-center rounded-[20px] border-[1px] border-[#e6e6e8] px-[12px] py-[12px] md:gap-6 gap-2 w-full"
          >
            <div>
              <img src={item.image} alt={item.title} className="w-full h-auto" />
            </div>
            <p className="font-[600] md:text-[24px] text-[10px] md:text-start text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
