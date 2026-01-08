// app/checkout/page.tsx
"use client";
import { sendOrderConfirmationEmail } from "../../../sanity/lib/sendEmail"; 
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCartOutline, IoChevronBack } from "react-icons/io5";
import { getCart, clearCart } from "../../../sanity/lib/cart";
import Swal from "sweetalert2";

// Firebase import
import { db } from "../../../sanity/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity?: number;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // YE NAYA STATE ADD KIYA HAI — form data ke liye
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Form input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const items = getCart();
    const itemsWithQty = items.map((item: any) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(itemsWithQty);
    setIsLoading(false);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 500 ? 0 : 80;
  const total = subtotal + shipping;

// YE FUNCTION UPDATE KIYA HAI — ab form data bhi save hoga
const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  // Form validation — agar koi field khali ho
  if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
    Swal.fire("Error", "Please fill all required fields", "error");
    return;
  }

  try {
    // Pura order data Firebase mein save karo
    await addDoc(collection(db, "orders"), {
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      items: cartItems,
      subtotal,
      shipping,
      total,
      paymentMethod: "Cash on Delivery",
      status: "pending",
      createdAt: new Date(),
    });

    // Email bhejo
    const formattedItems = cartItems.map(item => ({
      name: item.title,
      price: item.price,
      quantity: item.quantity || 1,
    }));
    await sendOrderConfirmationEmail(formattedItems, total);

    clearCart();
    Swal.fire({
      icon: "success",
      title: "Order Placed!",
      text: `Thank you ${formData.firstName}! Your order has been confirmed.`,
    }).then(() => {
      window.location.href = "/";
    });

  } catch (error) {
    console.error("Order failed:", error);
    Swal.fire("Error", "Something went wrong. Please try again.", "error");
  }
};

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-20">
        <IoCartOutline className="w-24 h-24 text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/">
          <button className="px-8 py-4 bg-orange-900 text-white rounded-md hover:bg-orange-800 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-orange-900 text-white py-3 text-center text-sm font-medium">
        Free Delivery on Orders Over Rs.500 • Secure Checkout • 30-Day Returns
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-900">
            Avion
          </Link>
          <Link href="/cart" className="flex items-center gap-2 text-gray-700 hover:text-orange-900 transition">
            Back to Cart
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>

              <div className="space-y-6 mb-8">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-6 border-b pb-6 last:border-0">
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      {item.quantity && item.quantity > 1 && (
                        <span className="absolute -top-2 -right-2 bg-orange-900 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">Rs {item.price.toLocaleString()}</p>
                    </div>
                    <p className="font-bold text-lg text-gray-900">
                      Rs {(item.price * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `Rs ${shipping}`}
                  </span>
                </div>
                {subtotal > 500 && (
                  <p className="text-sm text-green-600 font-medium">
                    Congratulations! You got free shipping
                  </p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>Rs {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Checkout Form — sirf name="" aur onChange add kiya hai */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Shipping Information</h2>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    required 
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-900" 
                  />
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    required 
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-900" 
                  />
                </div>

                <input 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  required 
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-900 my-5" 
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  required 
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-900 mb-5" 
                />

                <textarea 
                  name="address"
                  placeholder="Address" 
                  rows={3} 
                  required 
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-900">
                </textarea>

                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="city"
                    placeholder="City" 
                    required 
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-900 my-5" 
                  />
                  <input 
                    type="text" 
                    name="postalCode"
                    placeholder="Postal Code" 
                    required 
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-900 my-5" 
                  />
                </div>

                <div className="bg-gray-50 p-6 rounded-lg my-5">
                  <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-orange-900" />
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-900 text-white font-bold text-lg py-5 rounded-md hover:bg-orange-800 transition transform hover:scale-[1.02] duration-200 shadow-lg"
                >
                  Place Order • Rs {total.toLocaleString()}
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  By placing your order, you agree to our{" "}
                  <Link href="/terms" className="text-orange-900 underline">Terms & Conditions</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-orange-950 text-white py-12 mt-20">
        <div className="text-center">
          <p className="text-lg">&copy; 2025 Avion LTD • Luxury Homeware • Made with love in Pakistan</p>
        </div>
      </footer>
    </div>
  );
}