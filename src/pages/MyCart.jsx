import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import Cartitem from '../components/Cartitem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';

const SHIPPING = 3000;

export default function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery({
    queryKey: ['carts'],
    queryFn: async () => {
      return await getCart(uid);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice = products && products.reduce((prev, current) => prev + parseInt(current.price) * current.quantity, 0);

  return (
    <section className='flex flex-col p-10'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 쇼핑을 즐겨 보세요!</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {products &&
              products.map((product) => {
                console.log(product.id);
                return <Cartitem key={product.id} product={product} uid={uid} />;
              })}
          </ul>
          <div className='flex justify-between items-center p-2 mb-6 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총 가격' price={totalPrice + SHIPPING} />
          </div>
          <div className='flex flex-col mx-12'>
            <Button text='주문하기' />
          </div>
        </>
      )}
    </section>
  );
}
