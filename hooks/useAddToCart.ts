import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/utilities/customaxios';
import { getCookie } from 'cookies-next';

interface AddToCartResponse {
  message: string;
  is_added: boolean;
  // Add any other relevant fields from the API response
}

interface AddToCartParams {
  product_id: number;
  quantity: number;
}

const addToCart = async ({ product_id, quantity }: AddToCartParams) => {
  const userToken = getCookie('userToken');
  const response = await axios.post<AddToCartResponse>(
    '/api/add-to-cart',
    { product_id, quantity },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );
  return response.data;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Invalidate and refetch the cart query
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};
