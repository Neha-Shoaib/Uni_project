"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/image";
import { FaTruckFast } from "react-icons/fa6";
import { LuCircleUser } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { CheckCircle, Truck, Tag, RefreshCcw } from "lucide-react";
import Header from "@/app/components/header";
// YOUR CART SYSTEM
import { addToCart } from "../../../../sanity/lib/cart";

// NEW: SweetAlert2 Import
import Swal from "sweetalert2";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [amount, setAmount] = useState(1);
 
  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && slug.current == $slug][0]{
        _id,
        name,
        price,
        image,
        description
      }`;
      const result = await client.fetch(query, { slug });
      setProduct(result);
    };
    fetchProduct();
  }, [slug]);

  const incrementAmount = () => setAmount((prev) => prev + 1);
  const decrementAmount = () => setAmount((prev) => (prev > 1 ? prev - 1 : 1));

  // BEAUTIFUL SWEETALERT2 ON ADD TO CART
  const handleAddToCart = () => {
    if (!product) return;

    const productToAdd = {
      _id: product._id,
      title: product.name,
      price: product.price,
      image: urlFor(product.image).url(),
      slug: slug as string,
    };

    // Add selected quantity
    for (let i = 0; i < amount; i++) {
      addToCart(productToAdd);
    }

    // GORGEOUS SUCCESS POPUP
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      html: `
        <div style="text-align:left; margin-top:12px; font-size:16px;">
          <strong style="font-size:18px;">${amount} × ${product.name}</strong><br/>
          <span style="color:#666;">Successfully added to your cart</span>
        </div>
      `,
      confirmButtonText: "Continue Shopping",
      cancelButtonText: "View Cart",
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-xl shadow-2xl",
        confirmButton:
          "px-8 py-3 bg-orange-900 text-white font-medium rounded-md hover:bg-orange-800 mx-2 transition",
        cancelButton:
          "px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 mx-2 transition",
      },
      width: "420px",
    }).then((result) => {
      if (result.isDismissed) {
        window.location.href = "/cart";
      }
    });

    setAmount(1); // Reset quantity
  };

  const features = [
    { icon: <Truck className="text-gray-900 w-8 h-8" />, title: "Next day as standard", description: "Order before 3pm and get your order the next day as standard" },
    { icon: <CheckCircle className="text-gray-900 w-8 h-8" />, title: "Made by true artisans", description: "Handmade crafted goods made with real passion and craftsmanship" },
    { icon: <Tag className="text-gray-900 w-8 h-8" />, title: "Unbeatable prices", description: "For our materials and quality, you won't find better prices anywhere" },
    { icon: <RefreshCcw className="text-gray-900 w-8 h-8" />, title: "Recycled packaging", description: "We use 100% recycled materials to ensure our footprint is more manageable" },
  ];

  if (!product) {
    return <div className="text-center py-20 text-2xl">Loading...</div>;
  }

  return (
    <div>
      {/* Promo Bar */}
      <div className="bg-orange-900 text-white flex items-center justify-between px-4 py-2">
        <div className="flex items-center mx-auto">
          <FaTruckFast className="w-6 h-6 mr-2" />
          <p className="text-sm font-medium">Free Delivery on Orders Over $50</p>
        </div>
      </div>
 <Header/>
      <div className="flex flex-wrap relative mt-6">
        <div className="w-full lg:w-1/2 h-auto lg:h-[759px]">
          <Image
            src={urlFor(product.image).url()}
            alt={product.name}
            width={700}
            height={759}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 h-auto lg:h-[657px] p-6 lg:absolute lg:left-[50%] lg:top-[50px]">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-gray-900 mb-4">Rs {product.price}</p>
          <p className="text-base text-gray-700 mb-6">{product.description}</p>

          <div className="mt-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <span className="font-medium">Amount:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button onClick={decrementAmount} className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300">-</button>
                <input type="text" value={amount} readOnly className="w-12 h-8 text-center border-l border-r border-gray-300" />
                <button onClick={incrementAmount} className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300">+</button>
              </div>
            </div>

            {/* ADD TO CART BUTTON WITH SWEETALERT */}
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-20 max-w-[241px] h-[51px] bg-orange-900 text-white font-medium rounded hover:bg-orange-700 transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12 text-gray-900">
          What makes our brand different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

    
      
<footer className="bg-indigo-950 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="font-bold text-lg">Avion</h3>
          <address className="not-italic mt-4 text-sm">
            21 New York Street <br />
            New York City <br />
            United States of America <br />
            432 34
          </address>
          <p className="text-sm mt-4">&copy; 2022 Avion LTD</p>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h6 className="text-sm text-white font-medium">SOCIAL MEDIA</h6>
          <ul className="flex space-x-4">
            <li>
              <Link href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-blue-600 w-8 h-8" viewBox="0 0 49.652 49.652">
                  <path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" data-original="#000000" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 112.196 112.196">
                  <circle cx="56.098" cy="56.097" r="56.098" fill="#007ab9" data-original="#007ab9" />
                  <path fill="#fff" d="M89.616 60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118-3.705 0-5.906 2.491-6.878 4.903-.353.862-.444 2.059-.444 3.268v22.524h-13.41s.18-36.546 0-40.329h13.411v5.715c-.027.045-.065.089-.089.132h.089v-.132c1.782-2.742 4.96-6.662 12.085-6.662 8.822 0 15.436 5.764 15.436 18.149zm-54.96-36.642c-4.587 0-7.588 3.011-7.588 6.967 0 3.872 2.914 6.97 7.412 6.97h.087c4.677 0 7.585-3.098 7.585-6.97-.089-3.956-2.908-6.967-7.496-6.967zm-6.791 59.77H41.27v-40.33H27.865v40.33z" data-original="#f1f2f2" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 152 152">
                  <linearGradient id="a" x1="22.26" x2="129.74" y1="22.26" y2="129.74" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#fae100" />
                    <stop offset=".15" stop-color="#fcb720" />
                    <stop offset=".3" stop-color="#ff7950" />
                    <stop offset=".5" stop-color="#ff1c74" />
                    <stop offset="1" stop-color="#6c1cd1" />
                  </linearGradient>
                  <g data-name="Layer 2">
                    <g data-name="03.Instagram">
                      <rect width="152" height="152" fill="url(#a)" data-original="url(#a)" rx="76" />
                      <g fill="#fff">
                        <path fill="#ffffff10" d="M133.2 26c-11.08 20.34-26.75 41.32-46.33 60.9S46.31 122.12 26 133.2q-1.91-1.66-3.71-3.46A76 76 0 1 1 129.74 22.26q1.8 1.8 3.46 3.74z" data-original="#ffffff10" />
                        <path d="M94 36H58a22 22 0 0 0-22 22v36a22 22 0 0 0 22 22h36a22 22 0 0 0 22-22V58a22 22 0 0 0-22-22zm15 54.84A18.16 18.16 0 0 1 90.84 109H61.16A18.16 18.16 0 0 1 43 90.84V61.16A18.16 18.16 0 0 1 61.16 43h29.68A18.16 18.16 0 0 1 109 61.16z" data-original="#ffffff" />
                        <path d="m90.59 61.56-.19-.19-.16-.16A20.16 20.16 0 0 0 76 55.33 20.52 20.52 0 0 0 55.62 76a20.75 20.75 0 0 0 6 14.61 20.19 20.19 0 0 0 14.42 6 20.73 20.73 0 0 0 14.55-35.05zM76 89.56A13.56 13.56 0 1 1 89.37 76 13.46 13.46 0 0 1 76 89.56zm26.43-35.18a4.88 4.88 0 0 1-4.85 4.92 4.81 4.81 0 0 1-3.42-1.43 4.93 4.93 0 0 1 3.43-8.39 4.82 4.82 0 0 1 3.09 1.12l.1.1a3.05 3.05 0 0 1 .44.44l.11.12a4.92 4.92 0 0 1 1.1 3.12z" data-original="#ffffff" />
                      </g>
                    </g>
                  </g>
                </svg>
              </Link>
            </li>
            <li>
              <Link href='javascript:void(0)'>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 1227 1227">
                  <path d="M613.5 0C274.685 0 0 274.685 0 613.5S274.685 1227 613.5 1227 1227 952.315 1227 613.5 952.315 0 613.5 0z" data-original="#000000" />
                  <path fill="#fff" d="m680.617 557.98 262.632-305.288h-62.235L652.97 517.77 470.833 252.692H260.759l275.427 400.844-275.427 320.142h62.239l240.82-279.931 192.35 279.931h210.074L680.601 557.98zM345.423 299.545h95.595l440.024 629.411h-95.595z" data-original="#ffffff" />
                </svg>
              </Link>
            </li>
          </ul>
          <div className="!mt-8">
            <h6 className="text-[13px] text-gray-400 font-medium">Get exclusive assets sent straight to your inbox</h6>
            <div className="mt-4">
              <Link href="javascript:void(0)" className="bg-indigo-900 hover:bg-blue-700 text-sm text-white font-medium py-3 px-6 tracking-wide rounded">Sign up</Link>
            </div>
          </div>
        </div>
      




   

        {/* Menu, Categories, and Our Company */}
        <div className="md:col-span-3 text-right">
          <div className="flex justify-end space-x-8">
            {/* Menu */}
            <div>
              <h3 className="font-bold text-lg">Menu</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    New arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Best sellers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Recently viewed
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Popular this week
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                  <Link href="/components/product-listing">All Products</Link> 
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-lg">Categories</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/components/crockery" className="hover:text-gray-400">
                    Crockery
                  </Link>
                </li>
                <li>
                  <Link href="/components/furniture" className="hover:text-gray-400">
                    Furniture
                  </Link>
                </li>
                <li>
                  <Link href="/components/homeware" className="hover:text-gray-400">
                    Homeware
                  </Link>
                </li>
                <li>
                  <Link href="/components/plant-pots" className="hover:text-gray-400">
                    Plant pots
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                  <Link href="/components/chairs"> Chairs</Link>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Company */}
            <div>
              <h3 className="font-bold text-lg">Our Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-gray-400">
                  <Link href="/components/about"> About us</Link>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Vacancies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-400">
                    Returns policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
    
    
          <hr className="my-6 border-gray-600" />

<div className="max-w-screen-xl mx-auto text-center">
  <p className="text-gray-400 text-[13px]">
  Copyright 2022 Avion LTD
  </p></div>
        </div>
      
      
    </footer>
          
      </div>
    
          );
      }
    