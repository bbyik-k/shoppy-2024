import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { MdOutlineWbIncandescent } from 'react-icons/md';
import { login } from '../api/firebase';

export default function Navbar() {
  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <HiOutlineShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new' className='flex items-center'>
          <MdOutlineWbIncandescent className='text-2xl' />
          New!
        </Link>
        <button onClick={login}>Login</button>
      </nav>
    </header>
  );
}
