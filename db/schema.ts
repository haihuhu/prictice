import { projectCategories, projectStatus, supportTicketPriorities } from '@/lib/data';
import { boolean, integer, numeric, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

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

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  category: varchar('category', {
    enum: projectCategories.map((category) => category.value) as [string, ...string[]],
  }).notNull(),
  status: varchar('status', {
    enum: projectStatus.map((status) => status.value) as [string, ...string[]],
  }).notNull(),
  budget: numeric('budget', { precision: 10, scale: 2 }).notNull(),
  deadline: timestamp().notNull(),
  isFeatured: boolean('is_featured').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type ProjectSelect = typeof projects.$inferSelect;
export type ProjectInsert = typeof projects.$inferInsert;

export const supportTickets = pgTable('support_tickets', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  priority: varchar('priority', {
    enum: supportTicketPriorities.map((item) => item.value) as [string, ...string[]],
  }).notNull(),
  dueDate: timestamp('due_date'),
  isResolved: boolean('is_resolved').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type SupportTicketSelect = typeof supportTickets.$inferSelect;
export type SupportTicketInsert = typeof supportTickets.$inferInsert;

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
});

export type userSelect = typeof users.$inferSelect;
export type userInsert = typeof users.$inferInsert;

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export type CategorySelect = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;

export const items = pgTable('items', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  categoryId: integer('categoryId')
    .references(() => categories.id)
    .notNull(),
});

export type ItemSelect = typeof items.$inferSelect;
export type ItemInsert = typeof items.$inferInsert;
