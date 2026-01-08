import { type SchemaTypeDefinition } from 'sanity';
import { Category } from './category'; // Path to your category schema
import { product } from './product';   // Path to your product schema
import cart  from './cart'


export const schemaTypes = [cart, product];


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Category, product, cart], // Add your schemas here
};
