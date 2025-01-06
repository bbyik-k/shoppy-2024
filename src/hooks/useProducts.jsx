import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const rawProducts = await fetchProducts();
      return rawProducts.map((product) => ({
        ...product,
        priceFormatted: product.price.toLocaleString('ko-KR'), // 변환된 가격 추가
      }));
    },
    staleTime: 1000 * 120,
  });

  const addProductMutation = useMutation({
    mutationFn: ({ product, url }) => addNewProduct(product, url),
    onSuccess: () => queryClient.invalidateQueries(['products']),
  });

  return { productsQuery, addProductMutation };
}
