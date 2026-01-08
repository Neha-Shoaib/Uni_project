// app/components/ProductList.tsx
'use client';
import { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductList({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    // Check if product already in cart
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      setCart([...cart, product]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p._id} style={{ marginBottom: '2rem' }}>
            <h2>{p.name}</h2>
            <p>Price: ${p.price}</p>
            <img src={p.imageUrl} alt={p.name} width={200} />
            <br />
            <button onClick={() => addToCart(p)} style={{ marginTop: '0.5rem' }}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((item) => (
          <li key={item._id} style={{ marginBottom: '1rem' }}>
            {item.name} - ${item.price}
            <button
              onClick={() => removeFromCart(item._id)}
              style={{ marginLeft: '1rem' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
