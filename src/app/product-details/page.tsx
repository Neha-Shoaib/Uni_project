"use client";
import { useSearchParams } from "next/navigation";

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const price = searchParams.get("price");
  const image = searchParams.get("image");
  const description = searchParams.get("description");

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <img src={image || ""} alt={name || ""} className="w-full h-96 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-4">{name}</h1>
      <p className="text-xl text-gray-900 mb-4">{price}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
