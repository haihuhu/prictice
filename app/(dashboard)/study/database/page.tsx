import { CodeWindow } from '@/components/CodeWindow';

type NoteSection = {
  title: string;
  description?: string;
  code: string;
};

const databaseSections: NoteSection[] = [
  {
    title: 'File responsibilities',
    description:
      'Keep table definitions and database connections in separate files.',
    code: `db/
├── schema.ts
│   └── Define tables, columns, rules, and inferred types
│
└── index.ts
    └── Create and export one reusable database instance`,
  },
  {
    title: 'Schema import',
    description:
      'Import PostgreSQL column builders from drizzle-orm/pg-core.',
    code: `import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';`,
  },
  {
    title: 'Basic table pattern',
    description:
      'pgTable has two main parts: the database table name and the column definitions.',
    code: `export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
});`,
  },
  {
    title: 'Column rules',
    description:
      'Use TypeScript names in code and snake_case names in the database.',
    code: `id: serial('id').primaryKey()

name: varchar('name', { length: 255 }).notNull()

description: varchar('description', { length: 255 })

quantity: integer('quantity').notNull()

isInStock: boolean('is_in_stock').notNull()

createdAt: timestamp('created_at').defaultNow()

price: numeric('price', {
  precision: 10,
  scale: 2,
}).notNull()`,
  },
  {
    title: 'Category enum pattern',
    description:
      'Use enum when the value must be selected from a fixed list.',
    code: `category: varchar('category', {
  length: 20,
  enum: ['Electronics', 'Furniture', 'Office'],
}).notNull()`,
  },
  {
    title: 'Complete inventory example',
    description:
      'Use this as a reference when defining a product-like table.',
    code: `export const inventories = pgTable('inventories', {
  id: serial('id').primaryKey(),

  itemName: varchar('item_name', {
    length: 255,
  }).notNull(),

  category: varchar('category', {
    length: 20,
    enum: ['Electronics', 'Furniture', 'Office', 'Accessories'],
  }).notNull(),

  quantity: integer('quantity').notNull(),

  price: numeric('price', {
    precision: 10,
    scale: 2,
  }).notNull(),

  isInStock: boolean('is_in_stock').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
});`,
  },
  {
    title: 'Infer TypeScript types',
    description:
      'Use inferred types instead of writing the same table type manually.',
    code: `export type Inventory = typeof inventories.$inferSelect;

export type NewInventory = typeof inventories.$inferInsert;`,
  },
  {
    title: 'Select type and insert type',
    description:
      'A selected row and inserted data can have different shapes.',
    code: `type Inventory = typeof inventories.$inferSelect;

// Includes generated fields such as id and createdAt.

type NewInventory = typeof inventories.$inferInsert;

// Usually does not require generated fields such as id.
// Fields with default values can be optional.`,
  },
  {
    title: 'Database client imports',
    description:
      'The postgres package is the driver. Drizzle uses that driver to communicate with PostgreSQL.',
    code: `import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';`,
  },
  {
    title: 'Database connection pattern',
    description:
      'Create one client and export one reusable db instance.',
    code: `const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing');
}

const client = postgres(connectionString);

export const db = drizzle(client);`,
  },
  {
    title: 'Development connection cache',
    description:
      'Next.js reloads files often in development. Reuse the client to avoid creating too many connections.',
    code: `const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};

const client =
  globalForDb.client ?? postgres(connectionString);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.client = client;
}

export const db = drizzle(client);`,
  },
  {
    title: 'Complete db/index.ts reference',
    description:
      'Use this structure for your current Next.js and postgres driver setup.',
    code: `import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing');
}

const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
};

const client =
  globalForDb.client ?? postgres(connectionString);

if (process.env.NODE_ENV !== 'production') {
  globalForDb.client = client;
}

export const db = drizzle(client);`,
  },
  {
    title: 'Environment variable rules',
    description:
      'The connection string contains database credentials.',
    code: `# .env.local

DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# .gitignore

.env
.env.local`,
  },
  {
    title: 'Important numeric rule',
    description:
      'With PostgreSQL numeric columns, the returned value may be a string. Do not assume it is always a number.',
    code: `price: numeric('price', {
  precision: 10,
  scale: 2,
}).notNull();

// A database result can be:
const price = inventory.price;

// Example value:
// '299.99'`,
  },
  {
    title: 'Drizzle Kit workflow',
    description:
      'A schema definition does not change PostgreSQL automatically. You must use Drizzle Kit to apply the change.',
    code: `schema.ts
→ drizzle-kit generate
→ SQL migration files in drizzle/
→ drizzle-kit migrate
→ PostgreSQL database`,
  },
  {
    title: 'What generate does',
    description:
      'Generate compares your current schema with the previous Drizzle snapshot and creates SQL migration files.',
    code: `npx drizzle-kit generate

// Drizzle Kit reads schema.ts.
// It compares the new schema with the previous snapshot.
// It generates SQL migration files.
// It saves migration files in the configured output folder.

// Example output:
drizzle/
├── 0000_create_products.sql
├── 0001_add_inventory_table.sql
└── meta/`,
  },
  {
    title: 'What migrate does',
    description:
      'Migrate runs generated SQL migration files against the PostgreSQL database.',
    code: `npx drizzle-kit migrate

// Migration files:
drizzle/
└── 0001_add_inventory_table.sql

// PostgreSQL after migrate:
// The inventories table is created or changed.`,
  },
  {
    title: 'What push does',
    description:
      'Push compares schema.ts with the live database and applies changes directly. It does not create migration files.',
    code: `npx drizzle-kit push

// Development shortcut:
schema.ts
→ drizzle-kit push
→ PostgreSQL database

// No SQL migration file is created.`,
  },
  {
    title: 'Generate, migrate, and push',
    description:
      'Use the command based on whether you need a migration history.',
    code: `generate
// Creates SQL migration files.
// Does not change the database by itself.

migrate
// Runs existing migration files.
// Changes the database.

push
// Changes the database directly.
// Does not create migration files.`,
  },
  {
    title: 'Recommended command choice',
    description:
      'Use push for fast early practice. Use generate and migrate for portfolio projects, deployed projects, and team projects.',
    code: `Early practice:

schema.ts
→ npm run drizzle:push
→ Check the database


Portfolio or production project:

schema.ts
→ npm run drizzle:generate
→ Review generated SQL
→ Commit migration files to Git
→ npm run drizzle:migrate`,
  },
  {
    title: 'Package scripts',
    description:
      'Add short scripts so you do not need to remember the full commands.',
    code: `{
  "scripts": {
    "drizzle:generate": "drizzle-kit generate",
    "drizzle:migrate": "drizzle-kit migrate",
    "drizzle:push": "drizzle-kit push",
    "drizzle:studio": "drizzle-kit studio"
  }
}`,
  },
  {
    title: 'Run package scripts',
    description: 'Use npm run followed by the script name.',
    code: `npm run drizzle:generate

npm run drizzle:migrate

npm run drizzle:push

npm run drizzle:studio`,
  },
  {
    title: 'Safe schema change process',
    description:
      'Follow this process every time you add, remove, or change a table column.',
    code: `1. Change db/schema.ts

2. Run migration generation
npm run drizzle:generate

3. Read the generated SQL file
drizzle/0001_example.sql

4. Apply the migration
npm run drizzle:migrate

5. Test the changed table in the application

6. Commit schema.ts and drizzle/ to Git`,
  },
];

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-[#1e1e2a] p-5 text-sm leading-7 text-slate-100">
      <code className="font-mono">{code}</code>
    </pre>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="inline-block rounded-md bg-[#171721] px-4 py-2">
      <h2 className="font-semibold text-white">{title}</h2>
    </div>
  );
}

export default function DatabasePage() {
  return (
    <article className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      <header className="border-b-4 border-slate-900 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Drizzle + PostgreSQL Quick Reference: Schema and Database
          Setup
        </h1>
      </header>

      <section className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-6">
        <h2 className="mb-4 text-xl font-bold text-slate-900">
          Database setup flow
        </h2>

        <pre className="font-mono text-sm leading-7 text-slate-800">
          {`Neon
→ DATABASE_URL in .env.local
→ postgres driver creates a client
→ drizzle(client) creates db
→ schema.ts defines tables
→ drizzle-kit pushes schema changes to PostgreSQL`}
        </pre>
      </section>

      <section className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="mb-3 text-lg font-bold text-red-900">
          Safety rules
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-red-800">
          <li>
            Never commit <code className="font-semibold">.env</code>{' '}
            or <code className="font-semibold">.env.local</code>.
          </li>
          <li>
            Never put{' '}
            <code className="font-semibold">DATABASE_URL</code> in
            client components.
          </li>
          <li>
            Every table should usually have an{' '}
            <code className="font-semibold">id</code> primary key.
          </li>
          <li>
            Use <code className="font-semibold">notNull()</code> only
            when the field must always exist.
          </li>
          <li>
            Run a migration or push after changing{' '}
            <code className="font-semibold">schema.ts</code>.
          </li>
          <li>
            Commit <code className="font-semibold">schema.ts</code>{' '}
            and the <code className="font-semibold">drizzle</code>{' '}
            migration folder together.
          </li>
        </ul>
      </section>

      <section className="space-y-7">
        {databaseSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <SectionTitle title={section.title} />

            {section.description ? (
              <p className="text-sm leading-7 text-slate-700">
                {section.description}
              </p>
            ) : null}

            <CodeWindow code={section.code} />
          </div>
        ))}
      </section>

      <section className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
        <h2 className="mb-3 text-lg font-bold text-blue-950">
          Quick decision guide
        </h2>

        <pre className="font-mono text-sm leading-7 text-blue-900">
          {`Need a new table?
→ Add pgTable in schema.ts

Need a required field?
→ Add .notNull()

Need an automatic creation time?
→ Add timestamp(...).defaultNow()

Need a TypeScript row type?
→ Use typeof table.$inferSelect

Need a TypeScript insert type?
→ Use typeof table.$inferInsert

Need to use the database?
→ Import db from '@/db'


Changed schema.ts?

Fast local practice:
→ npm run drizzle:push

Migration history required:
→ npm run drizzle:generate
→ Review SQL files in drizzle/
→ npm run drizzle:migrate

Need to inspect database tables?
→ npm run drizzle:studio
`}
        </pre>
      </section>
    </article>
  );
}
