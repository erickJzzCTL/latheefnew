import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/utilities/customaxios";
import { getCookie } from "cookies-next";

interface AddToWishlistResponse {
  message: string;
  is_added: boolean;
}

const addToWishlist = async (productId: number) => {
  console.log("productId", productId);

  const userToken = getCookie("userToken");
  const headers: Record<string, string> = {};

  // Set Authorization header if token exists
  if (userToken) {
    headers["Authorization"] = `Bearer ${userToken}`;
  }
  const response = await axios.post<AddToWishlistResponse>(
    "/api/add-to-favourite",
    { product_id: productId },
    {
      headers,
    }
  );
  return response.data;
};

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToWishlist,
    onSuccess: () => {
      // Invalidate and refetch the wishlist query
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
