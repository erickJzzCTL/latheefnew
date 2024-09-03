import { useQuery } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";
import { getCookie } from "cookies-next";

interface Product {
  id: number;
  image: string;
  date: string;
  is_active: boolean;
  maincategory: number;
  productcategory: number;
  in_cart: boolean;
  in_favourite: boolean;
  // Add any other relevant product fields
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  user: number;
  // Add any other relevant cart item fields
}

interface CartResponse {
  cart_items: CartItem[];
}

const fetchCart = async () => {
  const userToken = getCookie('userToken');
  const response = await axios.get<CartResponse>('/api/get-cart-items', {
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  });
  return response.data.cart_items;
};

export const useFetchCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });
};