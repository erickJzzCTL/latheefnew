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
  subcategory_name: string;
}

const fetchSubCategoryProducts = (categoryId: string) => {
  if (!categoryId) {
    return Promise.reject(new Error("Invalid category ID"));
  }
  return axios.get<ProductsResponse>(`api/get-subcategories/${categoryId}`);
};

export const useSubCategoryProducts = (categoryId: string) => {
  return useQuery({
    queryKey: ["subcategoryproducts", categoryId],
    queryFn: () => fetchSubCategoryProducts(categoryId),
  });
};
