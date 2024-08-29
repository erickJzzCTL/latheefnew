import { useQuery } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";

export const fetchHomeData = () => {
  return axios.get("api/homepage");
};

export const useSetHomeData = () => {
  const { data: homeData } = useQuery({
    queryKey: ["homeData"],
    queryFn: fetchHomeData,
  });

  return { homeData };
};
