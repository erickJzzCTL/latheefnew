import { useQuery } from '@tanstack/react-query';
import axios from '@/utilities/customaxios';

interface Product {
  id: number;
  image: string;
  date: string;
  is_active: boolean;
  maincategory: number;
  productcategory: number;
  in_cart: boolean;
  in_favourite: boolean;
}

interface ProductResponse {
  product: Product; // Matches the API response format
}

const fetchProduct = async (productId: string): Promise<Product> => {
  const { data } = await axios.get<ProductResponse>(
    `/api/get-products/${productId}`
  );
  return data.product; // Return the 'product' object
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: ['product', productId], // Singular 'product' since it's fetching one product
    queryFn: () => fetchProduct(productId),
    enabled: !!productId, // Prevent fetching if productId is not available
  });
};
