import { useMutation } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";
import { getCookie } from "cookies-next";

interface EnquiryData {
  product_id: number | number[]; // Support single or multiple product IDs
}

const enquireNow = async (data: EnquiryData) => {
  const userToken = getCookie("userToken");
  const headers: Record<string, string> = {};

  if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }

  const response = await axios.post("/api/enquire-now", data, {
    headers,
  });

  return response.data;
};

export const useEnquireNow = () => {
  return useMutation({
    mutationFn: enquireNow,
  });
};
