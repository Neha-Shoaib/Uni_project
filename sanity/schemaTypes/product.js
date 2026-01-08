import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),

    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords that describe this product",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Detailed description of the product",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
      description: "Key features of the product",
    }),

    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "object",
      fields: [
        { name: "height", title: "Height", type: "string" },
        { name: "width", title: "Width", type: "string" },
        { name: "depth", title: "Depth", type: "string" },
      ],
      description: "Product size details",
    }),
  ],
});





// import { defineType, defineField } from "sanity"



// export const product = defineType({
//     name: "product",
//     title: "Product",
//     type: "document",
//     fields: [
//         defineField({
//             name:"category",
//             title:"Category",
//             type:"reference",
//             to:[{
//                 type:"category"
//             }]
//         }
//         ),
//         defineField({
//             name: "name",
//             title: "Title",
//             validation: (rule) => rule.required(),
//             type: "string"
//         }),
//         defineField({
//             name: "slug",
//             title: "Slug",
//             validation: (rule) => rule.required(),
//             type: "slug"
//         }),
//         defineField({
//             name: "image",
//             type: "image",
//             validation: (rule) => rule.required(),
//             title: "Product Image"
//         }),
//         defineField({
//             name: "price",
//             type: "number",
//             validation: (rule) => rule.required(),
//             title: "Price",
//         }),
//         defineField({
//             name: "quantity",
//             title: "Quantity",
//             type: "number",
//             validation: (rule) => rule.min(0),
//           }),
//         defineField({
//             name: "tags",
//             type: "array",
//             title: "Tags",
//             of:[{
//                 type: "string"
//             }]
//         }),
//         defineField({
//             name: 'description',
//             title: 'Description',
//             type: 'text',
//             description: 'Detailed description of the product',
//           }),
//           defineField({
//             name: 'features',
//             title: 'Features',
//             type: 'array',
//             of: [{ type: 'string' }],
//             description: 'List of key features of the product',
//           }),
//           defineField({
//             name: 'dimensions',
//             title: 'Dimensions',
//             type: 'object',
//             fields: [
//               { name: 'height', title: 'Height', type: 'string' },
//               { name: 'width', title: 'Width', type: 'string' },
//               { name: 'depth', title: 'Depth', type: 'string' },
//             ],
//             description: 'Dimensions of the product',
//           }),
//     ]
// })
// import { defineType, defineField } from "sanity";

// export const product = defineType({
//   name: "product",
//   title: "Product",
//   type: "document",
//   fields: [
//     defineField({
//       name: "category",
//       title: "Category",
//       type: "reference",
//       to: [{ type: "category" }],
//     }),
//     defineField({
//       name: "name",
//       title: "Title",
//       validation: (rule) => rule.required(),
//       type: "string",
//     }),
//     defineField({
//       name: "slug",
//       title: "Slug",
//       type: "slug",
//       options: {
//         source: "name", // auto-generate slug from product name
//         maxLength: 96,
//       },
//       validation: (rule) => rule.required(),
//     }),
//     defineField({
//       name: "image",
//       type: "image",
//       validation: (rule) => rule.required(),
//       title: "Product Image",
//     }),
//     defineField({
//       name: "price",
//       type: "number",
//       validation: (rule) => rule.required(),
//       title: "Price",
//     }),
//     defineField({
//       name: "quantity",
//       title: "Quantity",
//       type: "number",
//       validation: (rule) => rule.min(0),
//     }),
//     defineField({
//       name: "tags",
//       type: "array",
//       title: "Tags",
//       of: [{ type: "string" }],
//     }),
//     defineField({
//       name: "description",
//       title: "Description",
//       type: "text",
//       description: "Detailed description of the product",
//     }),
//     defineField({
//       name: "features",
//       title: "Features",
//       type: "array",
//       of: [{ type: "string" }],
//       description: "List of key features of the product",
//     }),
//     defineField({
//       name: "dimensions",
//       title: "Dimensions",
//       type: "object",
//       fields: [
//         { name: "height", title: "Height", type: "string" },
//         { name: "width", title: "Width", type: "string" },
//         { name: "depth", title: "Depth", type: "string" },
//       ],
//       description: "Dimensions of the product",
//     }),
//   ],
// });
