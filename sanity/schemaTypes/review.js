export default {
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'rating', title: 'Rating (1-5)', type: 'number', validation: Rule => Rule.min(1).max(5) },
    { name: 'comment', title: 'Review', type: 'text' },
    { name: 'product', title: 'Product', type: 'reference', to: [{ type: 'product' }] },
    { name: 'verified', title: 'Verified Buyer', type: 'boolean', initialValue: true },
    { name: 'createdAt', title: 'Date', type: 'datetime', initialValue: () => new Date().toISOString() }
  ]
}