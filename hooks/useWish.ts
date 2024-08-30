import { useQuery } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";

interface Product {
  id: number;
  image: string;
  date: string;
  is_active: boolean;
  maincategory: number;
  productcategory: number;
}

interface ProductResponse {
  product: Product;  // Adjusted to match the API response
}

const fetchWish = (wishId: string) => {
  return axios.get<ProductResponse>(`/api/get-products/${wishId}`)
    .then(response => response.data.product);  // Access the 'product' object
};

export const useWish = (wishId: string) => {
  return useQuery({
    queryKey: ["products", wishId],
    queryFn: () => fetchWish(wishId),
  });
};
