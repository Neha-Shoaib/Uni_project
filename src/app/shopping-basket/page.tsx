// 'use client';
// import { useState } from 'react';
// import Header from '@/app/components/header';
// import Footer from '@/app/components/footer';


// interface CartItem {
//   id: number;
//   productName: string;
//   description: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// export default function ShoppingCartClient() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([
//     {
//       id: 1,
//       productName: 'Product 1',
//       description: 'Description of Product 1',
//       price: 85,
//       quantity: 1,
//       image: '/Product Image.png',
//     },
//     {
//       id: 2,
//       productName: 'Product 2',
//       description: 'Description of Product 2',
//       price: 125,
//       quantity: 1,
//       image: '/Product Image (1).png',
//     },
//   ]);

//   const handleQuantityChange = (id: number, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     setCartItems(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '20px' }}>
//       <div
//         style={{
//           padding: '100px',
//           maxWidth: '1600px',
//           margin: '0 auto',
//           backgroundColor: '#E8E8E8',
//           borderRadius: '8px',
//         }}
//       >
//         <div style={{ marginBottom: '20px' }}>
//           <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
//             Your shopping cart
//           </h1>
//         </div>

//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
//           <thead>
//             <tr>
//               <th style={{ textAlign: 'left', paddingBottom: '10px' }}>Product</th>
//               <th style={{ textAlign: 'center', paddingBottom: '10px' }}>Quantity</th>
//               <th style={{ textAlign: 'right', paddingBottom: '10px' }}>Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item) => (
//               <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
//                 <td style={{ padding: '10px 0' }}>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <img
//                       src={item.image}
//                       alt={item.productName}
//                       width="80"
//                       height="80"
//                       style={{ marginRight: '20px', borderRadius: '8px' }}
//                     />
//                     <div>
//                       <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
//                         {item.productName}
//                       </p>
//                       <p style={{ margin: 0, fontSize: '14px', color: 'gray' }}>
//                         {item.description}
//                       </p>
//                       <p style={{ margin: '5px 0', fontWeight: 'bold' }}>£{item.price}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td style={{ textAlign: 'center' }}>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min="1"
//                     style={{
//                       width: '50px',
//                       textAlign: 'center',
//                       border: '1px solid #ccc',
//                       borderRadius: '4px',
//                       padding: '5px',
//                     }}
//                     onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
//                   />
//                 </td>
//                 <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
//                   £{item.price * item.quantity}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div style={{ textAlign: 'right', marginTop: '20px' }}>
//           <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Subtotal: £{subtotal}</p>
//           <p style={{ fontSize: '12px', color: 'gray' }}>
//             Taxes and shipping are calculated at checkout.
//           </p>
//           <button
//             style={{
//               backgroundColor: '#2c2c54',
//               color: 'white',
//               border: 'none',
//               padding: '10px 20px',
//               cursor: 'pointer',
//               marginTop: '10px',
//               borderRadius: '4px',
//             }}
//             onClick={() => (window.location.href = '/checkout')}
//           >
//             Go to checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingCart;
// 'use client';
// import { useCart } from '@/app/context/CartContext';
//  import { useState } from 'react';

// import Header from '@/app/components/header';
// import Footer from '@/app/components/footer';

// const ShoppingCart = () => {
//   const { cartItems, updateQuantity, removeFromCart } = useCart();

//   const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div>
//       <Header />
//       <div style={{ padding: '20px' }}>
//         <h1>Your shopping cart</h1>
//         {cartItems.length === 0 && <p>Your cart is empty.</p>}
//         {cartItems.map((item) => (
//           <div key={item.id}>
//             <p>{item.productName}</p>
//             <p>Rs{item.price}</p>
//             <input
//               type="number"
//               value={item.quantity}
//               min={1}
//               onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
//             />
//             <button onClick={() => removeFromCart(item.id)}>Remove</button>
//           </div>
//         ))}
//         <p>Subtotal: £{subtotal}</p>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default ShoppingCart;
