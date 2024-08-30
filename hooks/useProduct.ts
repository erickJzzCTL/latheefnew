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

const fetchProduct = (productId: string) => {
  return axios.get<ProductResponse>(`/api/get-products/${productId}`)
    .then(response => response.data.product);  // Access the 'product' object
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProduct(productId),
  });
};
