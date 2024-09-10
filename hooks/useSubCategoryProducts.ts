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
  remaining_products: number;
  maincategory_name: string;
  next: string | null; // For pagination
  previous: string | null;
  count: number;
}

const fetchSubCategoryProducts = (categoryId: string, page: number) => {
  if (!categoryId) {
    return Promise.reject(new Error("Invalid category ID"));
  }
  return axios.get<ProductsResponse>(`api/get-subcategories/${categoryId}?page=${page}`);
};

export const useSubCategoryProducts = (categoryId: string, page: number) => {
  return useQuery({
    queryKey: ["subcategoryproducts", categoryId, page], // Include page in the key
    queryFn: () => fetchSubCategoryProducts(categoryId, page),
    // Comment out or remove the keepPreviousData option
    // keepPreviousData: true,
  });
};
