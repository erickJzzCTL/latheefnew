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

interface ProductsResponse {
  products: Product[];
}

const fetchProducts = (categoryId: string) => {
  return axios.get<ProductsResponse>(`api/get-subcategories/${categoryId}`);
};

export const useSubCategories = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProducts(categoryId),
  });
};