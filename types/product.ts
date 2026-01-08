export interface Product{
    _id:string;
    name:string;
    _type:"product";
    image?:{
        asset:{
            _ref:string;
            _type: "image";
        }
    };
    category:"reference";
    price : number;
    description?:string;
    tags:[];
    quantity:number;
    dimensions:object;
    slug:"slug";
}