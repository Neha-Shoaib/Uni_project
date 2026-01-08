export default {
  name: 'curatedSet',
  title: 'Curated Set',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Set Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'products',
      title: 'Products in Set',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'product' } }],
      validation: Rule => Rule.max(3),
    },
  ],
};