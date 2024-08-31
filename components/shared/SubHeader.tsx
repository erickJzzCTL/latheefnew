"use client";

import { useSetHomeData } from "@/hooks/useHomeData";
import useStore from "@/store/store";
import { AxiosResponse } from "axios";

interface HomeData {
  homepage_titles: HomeDataItem[];
}

interface HomeDataItem {
  id: string | number;
  title: string;
  image: string;
}

export default function SubHeader() {
  const { homeData } = useSetHomeData() as {
    homeData: AxiosResponse<HomeData> | undefined;
  };

  const subheaderData = homeData?.data?.homepage_titles ?? [];
  console.log(subheaderData);

  return (
    <div className="container mx-auto">
      <div className="flex md:gap-6 gap-2 justify-between md:mt-10 mt-6">
        {subheaderData?.map((item: HomeDataItem) => (
          <div
            key={item?.id}
            className="flex md:flex-row flex-col items-center md:justify-start justify-center rounded-[20px] border-[1px] border-[#e6e6e8] px-[12px] py-[12px] md:gap-6 gap-2 w-full"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img
                src={item?.image}
                alt={item?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center">
              <p className="font-[600] md:text-[20px] text-[10px] md:text-start text-center">
                {item?.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
