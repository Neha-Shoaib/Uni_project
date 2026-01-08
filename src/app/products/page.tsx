// 'use client';
import { useCart } from '@/app/context/CartContext';
import { addToCart } from "../../../sanity/lib/cart"; 

// This is your real working cart function

export default function ProductList({ products }: { products: any[] }) {
  // No more useCart() — we use the real addToCart directly

  const handleAddToCart = (product: any) => {
    addToCart({
      _id: product._id,
      title: product.name,
      price: product.price,
      image: product.imageUrl,
      slug: product.slug?.current || "",
    });

    // Optional: show feedback
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      {products.map((p) => (
        <div key={p._id} style={{ marginBottom: "2rem", padding: "1rem", border: "1px solid #eee" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{p.name}</h2>
          <p style={{ fontSize: "1.2rem", color: "#333" }}>£{p.price}</p>
          <img src={p.imageUrl} width={200} alt={p.name} style={{ borderRadius: "8px" }} />
          
          {/* This now ACTUALLY adds to your real cart */}
          <button
            onClick={() => handleAddToCart(p)}
            style={{
              marginTop: "1rem",
              padding: "12px 24px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#4338ca"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4f46e5"}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
// export default function ProductList({ products }: { products: any[] }) {
//   const { addToCart } = useCart();

//   return (
//     <div>
//       {products.map((p) => (
//         <div key={p._id}>
//           <h2>{p.name}</h2>
//           <p>£{p.price}</p>
//           <img src={p.imageUrl} width={200} />
//           <button
//             onClick={() =>
//               addToCart({
//                 id: p._id,
//                 productName: p.name,
//                 description: p.description || '',
//                 price: p.price,
//                 quantity: 1,
//                 image: p.imageUrl,
//               })
//             }
//           >
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
