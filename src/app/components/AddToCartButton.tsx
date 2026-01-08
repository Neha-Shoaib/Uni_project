// components/AddToCartButton.tsx
'use client';

import { useState } from 'react';
import { addToCart } from '../../../sanity/lib/cart';

interface ProductForCart {
  _id: string;
  title: string;
  price: number;
  image: string;
  slug?: string;
}

export default function AddToCartButton({ product }: { product: ProductForCart }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdding}
      className={`px-8 py-3 bg-white text-black font-medium rounded-md shadow-lg transition-all ${
        isAdding
          ? 'opacity-90 scale-95'
          : 'hover:scale-105 hover:shadow-xl'
      } whitespace-nowrap`}
    >
      {isAdding ? 'Added ✓' : 'Add to Cart'}
    </button>
  );
}