import React from 'react';

export default function Button({ text, onClick }) {
  return (
    <button className='bg-brand text-gray-100 py-2 px-4 rounded-sm hover:brightness-110' onClick={onClick}>
      {text}
    </button>
  );
}
