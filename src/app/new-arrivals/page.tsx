"use client";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";
import { useEffect, useState } from "react";

export default function Newarrivals() {
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Date added");

  // Fetch products with category reference
  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "product"]{
        name,
        price,
        image,
        slug,
        description,
        category-> { name },
        tags
      }`;
      const result = await client.fetch(query);
      setData(result);
      setFilteredData(result);
    };
    fetchData();
  }, []);

  // Get unique categories from data
const categories = ["All", ...Array.from(new Set(data.map(p => p.category?.name).filter(name => name)))];  // Filter & Sort Logic
  useEffect(() => {
    let filtered = [...data];

    // Sorting
    if (selectedSort === "Price Low to High") filtered.sort((a, b) => a.price - b.price);
    if (selectedSort === "Price High to Low") filtered.sort((a, b) => b.price - a.price);
    if (selectedSort === "Name A-Z") filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredData(filtered);
  }, [data, selectedCategory, selectedType, selectedPrice, selectedBrand, selectedSort]);

  return (
    <div>
      <Header />

      {/* Banner */}
      <div style={{ width: "100%", height: "209px", overflow: "hidden" }}>
        <img src="/Page Headers (1).png" alt="Banner" style={{ width: "100%", height: "209px", objectFit: "cover" }} />
      </div>

      {/* FULLY WORKING FILTERS */}
      <div className="flex justify-between items-center w-full h-16 bg-gray-100 px-6 text-sm font-medium">
        <div className="flex gap-8">


        {/* Sorting */}
        <div className="flex gap-4 items-center">
          <span>Sorting by:</span>
          <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}
            className="bg-transparent border-0 cursor-pointer hover:text-gray-600">
            <option>Price and Name ▼</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
            <option>Name A-Z</option>
          </select>
        </div>
      </div>
</div>
      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {filteredData.length === 0 ? (
            <p className="col-span-4 text-center text-gray-500 text-xl">No products found</p>
          ) : (
            filteredData.map((item: any, index: number) => (
              <Link key={item.slug.current} href={`/products/${item.slug.current}`} className="block">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-500"
                  style={{ width: "305px", height: "375px" }}>
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.name}
                    width={305}
                    height={375}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">Rs {item.price}</p>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-[#F8F8F8] text-black text-sm font-medium px-6 py-3 rounded-md shadow-md hover:bg-gray-200 hover:scale-105 transition-all duration-300"
            style={{ width: "170px", height: "56px" }}>
            View Collection
          </button>
        </div>
      </section>

      <Footer />

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.6s ease forwards; }
      `}</style>
    </div>
  );
}