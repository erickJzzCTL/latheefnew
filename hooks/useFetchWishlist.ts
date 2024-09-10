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
}

interface FavouriteItem {
  id: number;
  product: Product;
  date: string;
  user: number;
}

interface WishlistResponse {
  favourite_items: FavouriteItem[];
}

const fetchWishlist = async () => {
  const userToken = getCookie("userToken");
  const headers: Record<string, string> = {};

  // Set Authorization header if token exists
  if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }
  const response = await axios.get<WishlistResponse>(
    "/api/get-favourite-items",
    {
      headers,
    }
  );
  return response.data.favourite_items;
};

export const useFetchWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
  });
};
