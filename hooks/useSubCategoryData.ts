import { useQuery } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";

interface Product {
  id: number;
  name: string;
  image: string;
  date: string;
  is_active: boolean;
  maincategory: number;
  productcategory: number;
}

interface ProductsResponse {
  subcategories: Product[];
  maincategory_name: string;  // Ensure this is typed as a string
}

const fetchProducts = (categoryId: string) => {
  return axios.get<ProductsResponse>(`api/get-maincategories/${categoryId}`);
};

export const useSubCategories = (categoryId: string) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => fetchProducts(categoryId),
  });
};
