// lib/cart.ts
export interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  slug?: string;
}

const CART_KEY = "cart"; // consistent key

// Add item to cart (increases quantity if already exists)
export const addToCart = (product: Omit<CartItem, "quantity">) => {
  if (typeof window === "undefined") return;

  const cart: CartItem[] = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

  const existingItem = cart.find((item) => item._id === product._id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// Get current cart
export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

// Remove item completely
export const removeFromCart = (id: string) => {
  if (typeof window === "undefined") return;
  const cart = getCart().filter((item) => item._id !== id);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// Update quantity (+ / -)
export const updateQuantity = (id: string, newQuantity: number) => {
  if (typeof window === "undefined") return;
  if (newQuantity <= 0) return removeFromCart(id);

  const cart = getCart();
  const item = cart.find((i) => i._id === id);
  if (item) item.quantity = newQuantity;

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

// Get total price
export const getCartTotal = (): number => {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Get total items count (for cart badge in header)
export const getCartItemsCount = (): number => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

// NEW: Clear entire cart (used after successful checkout)
export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
};