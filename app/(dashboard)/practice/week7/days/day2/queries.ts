import { db } from '@/db';
import { inventories } from '@/db/schema';
import { eq, ilike } from 'drizzle-orm';

export const getInventories = async () => {
  const result = await db.select().from(inventories);
  return result;
};

export const getInventoryById = async (id: number) => {
  const result = await db
    .select()
    .from(inventories)
    .where(eq(inventories.id, id));
  return result[0];
};

export const getInventoryByItemName = async (itemName: string) => {
  const result = db
    .select()
    .from(inventories)
    .where(ilike(inventories.itemName, `%${itemName}%`));
  return result;
};
