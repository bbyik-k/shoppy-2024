import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import useCart from '../hooks/useCart';

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

export default function Cartitem({ product, product: { id, image, title, quantity, price, option } }) {
  const { addOrUpdateItemMutation, removeItemMutation } = useCart();

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateItemMutation.mutate({ ...product, quantity: product.quantity - 1 });
  };
  const handlePlus = () => addOrUpdateItemMutation.mutate({ ...product, quantity: product.quantity + 1 });
  const handleDelete = () => removeItemMutation.mutate(id);

  return (
    <li className='flex justify-between my-2 items-center' key={id}>
      <img className='w-24 md:w-48 rounded-lg ' src={image} alt={title} />
      <div className='flex flex-1 justify-between ml-4'>
        <div className='basis-3/5'>
          <p className='text-lg'>{title}</p>
          <p className='text-xl font-bold text-brand'>{option}</p>
          <p>{price.toLocaleString('ko-KR')}원</p>
        </div>

        <div className='flex items-center text-2xl'>
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
