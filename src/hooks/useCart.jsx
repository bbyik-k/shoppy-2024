import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, removeFromCart, getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCart() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: async () => {
      return await getCart(uid);
    },
    enabled: !!uid,
  });

  const addOrUpdateItemMutation = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeItemMutation = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return { cartQuery, addOrUpdateItemMutation, removeItemMutation };
}
