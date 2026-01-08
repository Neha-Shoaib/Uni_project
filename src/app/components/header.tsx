// components/Header.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { LuCircleUser } from "react-icons/lu";
import { HiOutlineHeart } from "react-icons/hi2";
import Swal from "sweetalert2";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

export default function Header() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>(null);

  // Search states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  // Load wishlist & user
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setWishlist(JSON.parse(saved));
    const savedUser = localStorage.getItem("avionUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch products for search
  useEffect(() => {
    client.fetch(`*[_type == "product"]{ _id, name, price, image, slug }`).then(setAllProducts);
  }, []);

  // Live search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 6));
  }, [searchQuery, allProducts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return Swal.fire("Error", "Fill both fields", "error");
    const userData = { name: name.trim(), email: email.trim() };
    localStorage.setItem("avionUser", JSON.stringify(userData));
    setUser(userData);
    Swal.fire("Welcome!", `Logged in as ${name}`, "success");
    setIsModalOpen(false);
    setName("");
    setEmail("");
  };

  const handleLogout = () => {
    localStorage.removeItem("avionUser");
    setUser(null);
    Swal.fire("Logged Out", "See you soon!", "info");
  };

  return (
    <>
      {/* Main Navbar - Same UI */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* Search Icon + Avion Logo (Left Side) */}
          <div className="flex items-center gap-10">
            {/* Search Icon - Left of Avion */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <IoMdSearch className="w-7 h-7 text-gray-700" />
            </button>

            {/* Avion Logo */}
            <Link href="/">
              <h1 className="text-4xl font-bold text-amber-900 tracking-wider">Avion</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex space-x-8 text-sm font-medium text-gray-700">
              <li><Link href="/new-arrivals" className="hover:text-amber-900 transition">All Products</Link></li>
              <li><Link href="/plant-pots" className="hover:text-amber-900 transition">Plant Pots</Link></li>
              <li><Link href="/ceramics" className="hover:text-amber-900 transition">Ceramics</Link></li>
              <li><Link href="/chairs" className="hover:text-amber-900 transition">Chairs</Link></li>
              <li><Link href="/crockery" className="hover:text-amber-900 transition">Crockery</Link></li>
              <li><Link href="/tableware" className="hover:text-amber-900 transition">Tableware</Link></li>
              <li><Link href="/cutlery" className="hover:text-amber-900 transition">Cutlery</Link></li>
            </ul>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-7">
            <Link href="/wishlist" className="relative">
              <HiOutlineHeart className="w-7 h-7 text-gray-700 hover:text-amber-900 transition" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart">
              <IoCartOutline className="w-7 h-7 text-gray-700 hover:text-amber-900 transition" />
            </Link>
            <button onClick={() => !user && setIsModalOpen(true)}>
              <LuCircleUser className="w-7 h-7 text-gray-700 hover:text-amber-900 transition" />
            </button>
          </div>
        </div>
      </nav>

      {/* SEARCH BAR - Ab Sabse Upar Aayega (z-index max) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99999] flex items-start justify-center pt-32 px-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl relative">
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="absolute top-1 right-3 text-gray-600 hover:text-gray-900 z-10"
            >
              <IoMdClose size={32} />
            </button>

            <div className="p-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-8 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-amber-900 transition"
                autoFocus
              />

              <div className="mt-6 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product._id}
                      href={`/products/${product.slug.current}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-6 p-5 hover:bg-gray-50 rounded-2xl transition"
                    >
                      <Image
                        src={urlFor(product.image).width(90).height(90).url()}
                        alt={product.name}
                        width={90}
                        height={90}
                        className="rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                        <p className="text-amber-900 font-bold">Rs {product.price}</p>
                      </div>
                    </Link>
                  ))
                ) : searchQuery ? (
                  <p className="text-center text-gray-500 py-12 text-lg">No products found</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal & User Card - Same as before */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5">
              <IoMdClose size={30} />
            </button>
            <h2 className="text-4xl font-bold text-amber-900 mb-3">Welcome to Avion</h2>
            <p className="text-gray-600 mb-8">Enter your details to continue</p>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-amber-900 outline-none" required />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-amber-900 outline-none" required />
              <button type="submit" className="w-full bg-amber-900 text-white py-4 rounded-2xl font-bold hover:bg-amber-800 transition">
                Continue Shopping
              </button>
            </form>
          </div>
        </div>
      )}

      {user && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl p-5 z-40 border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-900">{user.name[0].toUpperCase()}</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-red-600 text-sm hover:underline mt-3 block">
            Logout
          </button>
        </div>
      )}
    </>
  );
}