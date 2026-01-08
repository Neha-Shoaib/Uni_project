"use client";

import { urlFor } from "../../../sanity/lib/image";
import { client } from "../../../sanity/lib/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/header";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    const loadWishlist = async () => {
      const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
      if (ids.length > 0) {
        const query = `*[_type == "product" && _id in $ids]{ _id, name, price, image}`;
        const products = await client.fetch(query, { ids });
        setWishlist(products);
      }
    };
    loadWishlist();

    const handleUpdate = () => loadWishlist();
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, []);

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
        <Link href="/" className="text-indigo-900 underline">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto ">
              <Header/>
      <h1 className="text-4xl font-bold text-center mb-12 mt-12">My Wishlist ({wishlist.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {wishlist.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-xl shadow">
            <Image src={urlFor(product.image).url()} alt={product.name} width={300} height={300} className="rounded-lg" />
            <h3 className="mt-4 font-semibold">{product.name}</h3>
            <p>Rs{product.price}</p>
          <Link 
  href={`/product-details?name=${encodeURIComponent(product.name)}&price=${product.price}&image=${urlFor(product.image).url()}`}
  className="block mt-4 text-indigo-900 font-medium hover:underline"
>
  View Product →
</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
