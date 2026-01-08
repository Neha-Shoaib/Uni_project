import {client} from "@/sanity/lib/client"

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    tags: string[];
    image_url: string;
  }
  
 export const getAllProducts=async()=>{
    try{
        const queryAllProducts=`*[_type=="product"]{
            _id,
              name,
                description,
              price,
              tags,
              "image_url":image.asset->url
            
          }`
    const products = await client.fetch(queryAllProducts);
    return products;
 }
 catch(error){
    console.log(error);
 }
}
