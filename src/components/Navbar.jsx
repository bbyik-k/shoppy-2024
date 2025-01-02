import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { MdOutlineWbIncandescent } from 'react-icons/md';

export default function Navbar() {
  return (
    <header>
      <Link to='/'>
        <HiOutlineShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='/products/new'>
          <MdOutlineWbIncandescent />
        </Link>
        <button>Login</button>
      </nav>
    </header>
  );
}
