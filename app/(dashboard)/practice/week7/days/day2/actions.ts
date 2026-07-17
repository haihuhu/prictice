'use server';

import {
  inventorySchema,
  InventoryValues,
} from '@/schemas/inventory-form';
import { getInventoryById, getInventoryByItemName } from './queries';
import { db } from '@/db';
import { inventories } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export const searchById = async (id: number) => {
  const data = await getInventoryById(id);
  return data;
};

export const searchByItemName = async (itemName: string) => {
  const data = await getInventoryByItemName(itemName);
  return data;
};

export const createInventory = async (data: InventoryValues) => {
  const res = inventorySchema.safeParse(data);
  if (!res.success) {
    return {
      success: false,
      errors: res.error.flatten().fieldErrors,
    };
  }

  const values = res.data;
  const existingName = await db
    .select()
    .from(inventories)
    .where(eq(inventories.itemName, data.itemName));
  if (existingName[0]) {
    return {
      success: false,
      errors: { itemName: ['Item name already exists'] },
    };
  }

  await db.insert(inventories).values({
    itemName: values.itemName,
    category: values.category,
    quantity: values.quantity,
    price: String(values.price),
    inStock: values.inStock,
    createdAt: new Date(),
  });
  revalidatePath('/practice/week7/days/day2');
  return { success: true };
};

export const deleteInventory = async (id: number) => {
  const deleted = await db
    .delete(inventories)
    .where(eq(inventories.id, id))
    .returning();

  if (deleted.length === 0) {
    return {
      success: false,
      error: 'Item not found or already deleted',
    };
  }

  revalidatePath('/practice/week7/days/day2');
  return { success: true };
};

export const updateInventory = async (
  id: number,
  values: InventoryValues
) => {
  const parsed = inventorySchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await db
    .update(inventories)
    .set({
      itemName: values.itemName,
      category: values.category,
      quantity: values.quantity,
      price: String(values.price),
      inStock: values.inStock,
    })
    .where(eq(inventories.id, id));
  revalidatePath('/practice/week7/days/day2');
  return { success: true };
};
