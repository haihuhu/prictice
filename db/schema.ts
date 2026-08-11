import { projectCategories, projectStatus, supportTicketPriorities } from '@/lib/data';
import { relations } from 'drizzle-orm';
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
  username: varchar('username', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  categoryName: varchar('category_name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type CategorySelect = typeof categories.$inferSelect;
export type CategoryInsert = typeof categories.$inferInsert;

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  courseName: varchar('course_name', { length: 255 }).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  categoryId: integer('category_id')
    .references(() => categories.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type CourseSelect = typeof courses.$inferSelect;
export type CourseInsert = typeof courses.$inferInsert;

export const chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id')
    .references(() => courses.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type ChapterSelect = typeof chapters.$inferSelect;
export type ChapterInsert = typeof chapters.$inferInsert;

export const usersRelations = relations(users, ({ many }) => ({ courses: many(courses) }));

export const categoriesRelations = relations(categories, ({ many }) => ({ courses: many(courses) }));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  user: one(users, { fields: [courses.userId], references: [users.id] }),
  chapters: many(chapters),
  category: one(categories, { fields: [courses.categoryId], references: [categories.id] }),
}));

export const chaptersRelations = relations(chapters, ({ one }) => ({
  course: one(courses, { fields: [chapters.courseId], references: [courses.id] }),
}));

// week9 practice 2026-08-05 practice 1
export const week9Users = pgTable('week9_users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).unique().notNull(),
});

export type Week9UserInsert = typeof week9Users.$inferInsert;
export type Week9UserSelect = typeof week9Users.$inferSelect;

export const week9Projects = pgTable('week9_projects', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id')
    .references(() => week9Users.id)
    .notNull(),
  reviewerId: integer('reviewer_id').references(() => week9Users.id),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { enum: ['pending', 'in_progress', 'completed', 'cancelled'] })
    .notNull()
    .default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Week9ProjectInsert = typeof week9Projects.$inferInsert;
export type Week9ProjectSelect = typeof week9Projects.$inferSelect;

export const week9Tasks = pgTable('week9_tasks', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => week9Projects.id)
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  status: varchar('status', { enum: ['completed', 'in_progress', 'pending'] })
    .notNull()
    .default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Week9TaskInsert = typeof week9Tasks.$inferInsert;
export type Week9TaskSelect = typeof week9Tasks.$inferSelect;

export const week9UsersRelations = relations(week9Users, ({ many }) => ({
  ownerProjects: many(week9Projects, { relationName: 'ownerProjects' }),
  reviewProjects: many(week9Projects, { relationName: 'reviewProjects' }),
}));

export const week9ProjectsRelations = relations(week9Projects, ({ one, many }) => ({
  owner: one(week9Users, {
    fields: [week9Projects.ownerId],
    references: [week9Users.id],
    relationName: 'ownerProjects',
  }),
  reviewer: one(week9Users, {
    fields: [week9Projects.reviewerId],
    references: [week9Users.id],
    relationName: 'reviewProjects',
  }),
  tasks: many(week9Tasks),
}));

export const week9TasksRelations = relations(week9Tasks, ({ one }) => ({
  project: one(week9Projects, { fields: [week9Tasks.projectId], references: [week9Projects.id] }),
}));
