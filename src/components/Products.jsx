import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const rawProducts = await getProducts();

      console.log(`rawProducts`);
      console.log(rawProducts);
      return rawProducts.map((product) => ({
        ...product,
        priceFormatted: product.price.toLocaleString('ko-KR'), // 변환된 가격 추가
      }));
    },
  });
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>{products && products.map((product) => <ProductCard key={product.id} product={product} />)}</ul>
    </>
  );
}
