'use server';

import { db } from '@/db';
import { products } from '@/db/schema';

export const createProduct = async () => {
  await db.insert(products).values({
    name: 'Wireless mouse',
    price: '28.88',
    description: 'This is product for computer',
  });
};
