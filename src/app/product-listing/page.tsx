import Header from "@/app/components/header"
import Image from "next/image"
import Footer from "@/app/components/footer";
export default function ProductListing(){
    
        const productsRow1And3 = [
            {
              image: "/Parent.png",
              name: "The Dandy Chair",
              price: "Rs250",
            },
            {
              image: "/Parent (1).png",
              name: "Rustic Vase Set",
              price: "Rs155",
            },
            {
              image: "/Parent (2).png",
              name: "The Silky Vase",
              price: "Rs125",
            },
            {
              image: "/Parent (3).png",
              name: "The Lucy Lamp",
              price: "Rs399",
            },
          ];
          
          const productsRow2 = [
            {
              image: "/Parent (4).png", 
              name: "The Dandy Chair",
              price: "Rs250",
            },
            {
              image: "/Parent (5).png",
              name: "Rustic Vase Set",
              price: "Rs155",
            },
            {
              image: "/Photo.png",
              name: "The Silky Vase",
              price: "Rs125",
            },
            {
              image: "/Parent (6).png",
              name: "The Lucy Lamp",
              price: "Rs399",
            },
          ];
    return(
        <div>
        <Header/>
        <div
  style={{
    width: "100%", 
    height: "209px", 
    overflow: "hidden", 
  }}
>
  <img
    src="/Page Headers (1).png" 
    alt="Descriptive Alt Text"
    style={{
      width: "100%", 
      height: "209px", 
      objectFit: "cover",  
    }}
  />
</div>

<div className="flex justify-between items-center w-full h-16 bg-gray-100 px-4">
  
  <div className="flex gap-4">
    <span className="product-button text-sm font-medium cursor-pointer hover:text-gray-600">
      Category ▼
    </span>
    <span className="product-button text-sm font-medium cursor-pointer hover:text-gray-600">
      Product type ▼
    </span>
    <span className="product-button text-sm font-medium cursor-pointer hover:text-gray-600">
      Price ▼
    </span>
    <span className="product-button text-sm font-medium cursor-pointer hover:text-gray-600">
      Brand ▼
    </span>
  </div>

  
  <div className="flex gap-4">
    <span className="product-button text-sm font-medium cursor-pointer hover:text-gray-600">
      Sorting by:
    </span>
    <span className="product-button text-sm font-medium cursor-pointer hover:text-gray-600">
      Date added ▼
    </span>
  </div>
</div>



<section className="py-16 px-6">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center mb-12">
    {productsRow1And3.map((product, index) => (
      <div key={`row1-${index}`}>
        
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden"
          style={{ width: "305px", height: "375px" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-4 flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.price}</p>
        </div>
      </div>
    ))}
  </div>

  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center mb-12">
    {productsRow2.map((product, index) => (
      <div key={`row2-${index}`}>
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden"
          style={{ width: "305px", height: "375px" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="mt-4 flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.price}</p>
        </div>
      </div>
    ))}
  </div>


  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
    {productsRow1And3.map((product, index) => (
      <div key={`row3-${index}`}>
        <div
          className="bg-white shadow-md rounded-lg overflow-hidden"
          style={{ width: "305px", height: "375px" }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      
        <div className="mt-4 flex flex-col items-start">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.price}</p>
        </div>
      </div>
    ))}
  </div>
  <div className="flex justify-center mt-8">
  <button
    className="bg-[#F8F8F8] text-black text-sm font-medium px-6 py-3 rounded-md shadow-md hover:bg-gray-200"
    style={{ width: "170px", height: "56px" }}
  >
    View Collection
  </button>
</div>
  
</section>

<br/><br/>
<br/><br/>

<div><Footer/></div>

        </div>
    )
}