import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import useCart from '../hooks/useCart';

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <div className='relative'>
      <TiShoppingCart className='text-4xl' />
      {products && <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2 opacity-90'>{products.length}</p>}
    </div>
  );
}
