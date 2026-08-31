import {
  projectCategories,
  projectStatus,
  supportTicketPriorities,
  Week10Day2TaskStatus,
  week10Day2StatusOptions,
  week9StatusOptions,
} from '@/lib/data';
import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
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

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(courses),
}));

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

export const week9ProjectCategories = pgTable(
  'week9_project_categories',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => week9Users.id, { onDelete: 'cascade' })
      .notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('week9_project_categories_user_name_unique').on(table.userId, table.name)]
);

export type Week9ProjectCategoryInsert = typeof week9ProjectCategories.$inferInsert;
export type Week9ProjectCategorySelect = typeof week9ProjectCategories.$inferSelect;

export const week9Projects = pgTable(
  'week9_projects',
  {
    id: serial('id').primaryKey(),
    ownerId: integer('owner_id')
      .references(() => week9Users.id, { onDelete: 'no action' })
      .notNull(),
    reviewerId: integer('reviewer_id').references(() => week9Users.id, { onDelete: 'set null' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    categoryId: integer('category_id')
      .references(() => week9ProjectCategories.id, {
        onDelete: 'no action',
      })
      .notNull(),
    status: varchar('status', {
      enum: week9StatusOptions.map((item) => item.value) as [string, ...string[]],
    })
      .notNull()
      .default('pending'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('week9_projects_owner_name_unique').on(table.ownerId, table.name)]
);

export type Week9ProjectInsert = typeof week9Projects.$inferInsert;
export type Week9ProjectSelect = typeof week9Projects.$inferSelect;

export const week9Tasks = pgTable('week9_tasks', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => week9Projects.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  status: varchar('status', {
    enum: week9StatusOptions.map((item) => item.value) as [string, ...string[]],
  })
    .notNull()
    .default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Week9TaskInsert = typeof week9Tasks.$inferInsert;
export type Week9TaskSelect = typeof week9Tasks.$inferSelect;

export const week9UsersRelations = relations(week9Users, ({ many }) => ({
  ownerProjects: many(week9Projects, { relationName: 'ownerProjects' }),
  reviewProjects: many(week9Projects, { relationName: 'reviewProjects' }),
  categories: many(week9ProjectCategories),
}));

export const week9CategoriesRelations = relations(week9ProjectCategories, ({ one, many }) => ({
  user: one(week9Users, { fields: [week9ProjectCategories.userId], references: [week9Users.id] }),
  projects: many(week9Projects),
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
  category: one(week9ProjectCategories, {
    fields: [week9Projects.categoryId],
    references: [week9ProjectCategories.id],
  }),
  tasks: many(week9Tasks),
}));

export const week9TasksRelations = relations(week9Tasks, ({ one }) => ({
  project: one(week9Projects, { fields: [week9Tasks.projectId], references: [week9Projects.id] }),
}));

// week10 day2 practice 2026-08-27 practice 1
export const week10Day2Users = pgTable('week10_day2_users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(),
  emailSnapshot: varchar('email_snapshot', { length: 255 }).notNull(),
  nameSnapshot: varchar('name_snapshot', { length: 255 }).notNull(),
  avatarUrlSnapshot: varchar('avatar_url_snapshot', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Week10Day2UserInsert = typeof week10Day2Users.$inferInsert;
export type Week10Day2UserSelect = typeof week10Day2Users.$inferSelect;

export const week10Day2UserProfiles = pgTable('week10_day2_user_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => week10Day2Users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(), 
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Week10Day2UserProfileInsert = typeof week10Day2UserProfiles.$inferInsert;
export type week10Day2UserProfileSelect = typeof week10Day2UserProfiles.$inferSelect;

export const week10Day2ProjectCategories = pgTable('week_10_day2_project_categories', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => week10Day2Users.id, { onDelete: 'cascade' })
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Week10Day2ProjectCategoryInsert = typeof week10Day2ProjectCategories.$inferInsert;
export type Week10Day2ProjectCategorySelect = typeof week10Day2ProjectCategories.$inferSelect;

export const week10Day2Projects = pgTable('week_10_day2_projects', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => week10Day2Users.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  categoryId: integer('category_id')
    .references(() => week10Day2ProjectCategories.id, { onDelete: 'cascade' })
    .notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}); 

export type Week10Day2ProjectInsert = typeof week10Day2Projects.$inferInsert;
export type Week10Day2ProjectSelect = typeof week10Day2Projects.$inferSelect;

export const week10Day2Tasks = pgTable('week_10_day2_tasks', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => week10Day2Projects.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', {
    enum: week10Day2StatusOptions.map((item) => item.value) as [
      Week10Day2TaskStatus,
      ...Week10Day2TaskStatus[],
    ],
  })
    .notNull()
    .default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export type Week10Day2TaskInsert = typeof week10Day2Tasks.$inferInsert;
export type Week10Day2TaskSelect = typeof week10Day2Tasks.$inferSelect;

// week10 day2 relations of users and user profiles and project categories and projects and tasks practice 2026-08-27
export const week10Day2UsersRelations = relations(week10Day2Users, ({ one, many }) => ({
  week10Day2UserProfile: one(week10Day2UserProfiles, {
    fields: [week10Day2Users.id],
    references: [week10Day2UserProfiles.userId],
  }),
  week10Day2ProjectCategories: many(week10Day2ProjectCategories),
  week10Day2Projects: many(week10Day2Projects),
}));

export const week10Day2UserProfilesRelations = relations(week10Day2UserProfiles, ({ one }) => ({
  week10Day2User: one(week10Day2Users, {
    fields: [week10Day2UserProfiles.userId],
    references: [week10Day2Users.id],
  }),
}));

export const week10Day2ProjectCategoriesRelations = relations(
  week10Day2ProjectCategories,
  ({ one, many }) => ({
    week10Day2Projects: many(week10Day2Projects),
    week10Day2User: one(week10Day2Users, {
      fields: [week10Day2ProjectCategories.userId],
      references: [week10Day2Users.id],
    }),
  })
);

export const week10Day2ProjectsRelations = relations(week10Day2Projects, ({ one, many }) => ({
  week10Day2User: one(week10Day2Users, {
    fields: [week10Day2Projects.userId],
    references: [week10Day2Users.id],
  }),
  week10Day2ProjectCategory: one(week10Day2ProjectCategories, {
    fields: [week10Day2Projects.categoryId],
    references: [week10Day2ProjectCategories.id],
  }),
  week10Day2Tasks: many(week10Day2Tasks),
}));

export const week10Day2TasksRelations = relations(week10Day2Tasks, ({ one }) => ({
  week10Day2Project: one(week10Day2Projects, {
    fields: [week10Day2Tasks.projectId],
    references: [week10Day2Projects.id],
  }),
}));
