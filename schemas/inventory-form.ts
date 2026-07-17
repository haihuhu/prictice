import { z } from 'zod';

export const inventorySchema = z.object({
  itemName: z.string().min(3).max(20),
  category: z.enum(['Electronics', 'Furniture', 'Office'], {
    error: 'Please choose correct value',
  }),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  inStock: z.boolean().refine((val) => val === true, { error: 'InStock must be choose' }),
});

export type InventoryValues = z.infer<typeof inventorySchema>;
