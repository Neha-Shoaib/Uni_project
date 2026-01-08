// app/chair/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { FaTruckFast } from "react-icons/fa6";
import { LuCircleUser } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { ShoppingCart, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { addToCart } from "../../../sanity/lib/cart";
import Swal from "sweetalert2";
import Header from '@/app/components/header'

export default function Chair() {
  const [amount, setAmount] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [curatedSets, setCuratedSets] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const currentProductId = "dandy-chair-001";

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    client.fetch(`*[_type == "product"]{ _id, name, price, image, slug }`).then(setProducts);
  }, []);

  useEffect(() => {
    client
      .fetch(`*[_type == "curatedSet"]{
        _id, title, description,
        products[]->{ _id, name, price, image, slug }
      }`)
      .then(setCuratedSets);
  }, []);

  const toggleWishlist = (id: string, name: string) => {
    if (wishlist.includes(id)) {
      setWishlist(prev => prev.filter(x => x !== id));
      Swal.fire({ icon: "info", title: "Removed", text: name, toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
    } else {
      setWishlist(prev => [...prev, id]);
      Swal.fire({ icon: "success", title: "Added to Wishlist!", text: name, toast: true, position: "top-end", timer: 1800, showConfirmButton: false });
    }
  };

  const handleAddToCartFromGrid = (product: any) => {
    addToCart({
      _id: product._id,
      title: product.name,
      price: product.price,
      image: urlFor(product.image).url(),
      slug: product.slug.current,
    });
    Swal.fire({ icon: "success", title: "Added to Cart!", text: product.name, toast: true, position: "top-end", timer: 1500, showConfirmButton: false });
  };

  const handleAddToCart = () => {
    for (let i = 0; i < amount; i++) {
      addToCart({ _id: currentProductId, title: "The Dandy Chair", price: 250, image: "/Image Left.png" });
    }
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      html: `<strong>${amount} × The Dandy Chair</strong>`,
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
    });
    setAmount(1);
  };

  const addSetToCart = (set: any) => {
    set.products.forEach((product: any) => {
      addToCart({
        _id: product._id,
        title: product.name,
        price: product.price,
        image: urlFor(product.image).url(),
        slug: product.slug.current,
      });
    });
    const total = set.products.reduce((sum: number, p: any) => sum + p.price, 0);
    Swal.fire({
      icon: "success",
      title: "Set Added!",
      html: `<strong>${set.title}</strong><br/>Rs ${total.toLocaleString()} added to cart!`,
      toast: true,
      position: "top-end",
      timer: 2500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Promo Bar */}
      <div className="bg-amber-900 text-white text-center py-3 text-sm font-medium relative">
        <div className="flex items-center justify-center gap-2">
          <FaTruckFast className="w-5 h-5" />
          Free Delivery on Orders Over Rs 5000
        </div>
        <button onClick={() => window.location.href = "/"} className="absolute right-6 top-3 text-2xl">×</button>
      </div>

<Header/>
      {/* Product Detail – FINAL & ERROR-FREE */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/Image Left.png"
            alt="The Dandy Chair"
            width={800}
            height={800}
            className="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">The Dandy Chair</h1>
          <p className="text-4xl text-amber-900 font-medium mb-10">Rs 250</p>

          <div className="space-y-8">
            <p className="text-gray-600 text-lg leading-relaxed">
              A timeless design, with premium materials features as one of our most popular and iconic pieces. 
              The Dandy Chair is perfect for any stylish living space with beech legs and lambskin leather upholstery.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-800 rounded-full" />
                Premium material
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-800 rounded-full" />
                Handmade upholstery
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-800 rounded-full" />
                Quality timeless classic
              </li>
            </ul>

            {/* Dimensions – Super Tight & Clean */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Dimensions</h3>
              <div className="flex items-end justify-between max-w-md">
                <div className="text-center">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Height</p>
                  <p className="text-xl font-bold text-gray-900">110cm</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Width</p>
                  <p className="text-xl font-bold text-gray-900">75cm</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Depth</p>
                  <p className="text-xl font-bold text-gray-900">50cm</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector – FIXED TYPO */}
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <span className="text-gray-700 font-medium mr-5">Amount:</span>
                <div className="flex items-center border border-gray-300 rounded-xl">
                  <button
                    onClick={() => setAmount(a => Math.max(1, a - 1))}
                    className="px-6 py-4 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-10 py-4 font-bold text-xl">{amount}</span>
                  <button
                    onClick={() => setAmount(a => a + 1)}
                    className="px-6 py-4 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-amber-900 text-white px-12 py-5 rounded-xl font-semibold hover:bg-amber-800 transition text-lg"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* You might also like */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-medium text-center mb-16 text-gray-800">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.slice(4, 8).map((product) => {
              const isWishlisted = wishlist.includes(product._id);
              return (
                <div key={product._id} className="group">
                  <Link href={`/products/${product.slug.current}`}>
                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                      <Image
                        src={urlFor(product.image).url()}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="flex gap-5">
                          <button onClick={(e) => { e.preventDefault(); toggleWishlist(product._id, product.name); }} className="p-4 bg-white rounded-full shadow-xl hover:scale-110 transition">
                            {isWishlisted ? <HiHeart className="w-7 h-7 text-amber-900" /> : <HiOutlineHeart className="w-7 h-7 text-gray-800" />}
                          </button>
                          <button onClick={(e) => { e.preventDefault(); handleAddToCartFromGrid(product); }} className="p-4 bg-white rounded-full shadow-xl hover:scale-110 transition">
                            <ShoppingCart className="w-7 h-7 text-amber-900" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 text-left">
                      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-lg text-amber-900 font-medium mt-1">Rs {product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-20">
            <Link href="/products">
              <button className="px-10 py-4 bg-white border-2 border-amber-900 text-amber-900 rounded-full font-semibold hover:bg-amber-50 transition text-lg">
                View Full Collection
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Complete the Look */}
      {/* Footer */}
      <footer className="bg-amber-950 text-white py-16 text-center">
        <p className="text-xl">© 2025 Avion LTD • Timeless Home Decor for Modern Living</p>
      </footer>
    </div>
  );
}