import {
  varchar,
  pgTable,
  numeric,
  serial,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const inventories = pgTable('inventories', {
  id: serial('id').primaryKey(),
  itemName: varchar('item_name', { length: 255 }).notNull(),
  category: varchar('category', {
    length: 20,
    enum: ['Electronics', 'Furniture', 'Office'],
  }).notNull(),
  quantity: integer('quantity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  inStock: boolean('in_stock').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Inventory = typeof inventories.$inferSelect;
