// app/cart/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  getCartItemsCount,
} from "../../../sanity/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    const handleCartUpdate = () => setCart(getCart());
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Your cart is empty</h1>
        <Link
          href="/"
          className="text-xl text-indigo-600 underline hover:text-indigo-800 transition"
        >
          ← Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Your Shopping Cart</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 p-8 border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              {/* Product Image */}
              <div className="w-28 h-28 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mt-1">Rs{item.price.toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium text-lg">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="w-32 text-right">
                <p className="text-xl font-bold">Rs{(item.price * item.quantity).toFixed(2)}</p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 hover:text-red-800 ml-6 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total & Checkout */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total</span>
            <span>Rs{getCartTotal().toFixed(2)}</span>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Link
              href="/"
              className="px-8 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
            
           <Link href="/checkout">
  <button className="px-12 py-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition">
    Proceed to Checkout
  </button>
</Link>
          </div>
        </div>
      </div>
    </div>
  );
}