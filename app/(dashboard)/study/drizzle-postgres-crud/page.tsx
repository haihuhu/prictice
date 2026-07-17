import { CodeWindow } from '@/components/CodeWindow';

type CodeSection = {
  title: string;
  description?: string;
  code: string;
};

const crudSections: CodeSection[] = [
  {
    title: 'CRUD syntax',
    description:
      'Use these patterns when you need to read or change database rows.',
    code: `// Read all rows
await db.select().from(products);

// Insert one row
await db.insert(products).values(data);

// Update one row
await db
  .update(products)
  .set(data)
  .where(eq(products.id, id));

// Delete one row
await db.delete(products).where(eq(products.id, id));`,
  },
  {
    title: 'Server validation',
    description:
      'Validate data again before writing to the database.',
    code: `const result = productSchema.safeParse(data);

if (!result.success) {
  return {
    errors: result.error.flatten().fieldErrors,
  };
}`,
  },
  {
    title: 'Duplicate check',
    description: 'Check business rules after schema validation.',
    code: `const existingProduct = await db.query.products.findFirst({
  where: eq(products.name, result.data.name),
});

if (existingProduct) {
  return {
    errors: {
      name: ['Product name already exists'],
    },
  };
}`,
  },
  {
    title: 'Create action flow',
    description: 'Use this order for a create Server Action.',
    code: `'use server';

export async function createProduct(data: unknown) {
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  await db.insert(products).values(result.data);

  revalidatePath('/products');

  return { success: true };
}`,
  },
];

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-slate-950 p-5 text-sm leading-7 text-slate-100">
      <code>{code}</code>
    </pre>
  );
}

export default function DrizzlePostgreSQLCRUDPage() {
  return (
    <article className="space-y-8">
      <header className="border-b pb-5">
        <h1 className="text-3xl font-bold tracking-tight">
          Drizzle + PostgreSQL Quick Reference: CRUD Flow
        </h1>
      </header>

      <section className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-6">
        <h2 className="mb-4 text-xl font-bold">Flow map</h2>

        <pre className="font-mono text-sm leading-7 text-slate-800">
          {`Form data
→ Server Action
  → safeParse
  → Database check
  → db.insert / db.update / db.delete
  → revalidatePath
  → Return errors or success`}
        </pre>
      </section>

      <section className="space-y-6">
        {crudSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <div className="inline-block rounded-md bg-slate-950 px-4 py-2">
              <h2 className="font-semibold text-white">
                {section.title}
              </h2>
            </div>

            {section.description ? (
              <p className="text-sm text-slate-600">
                {section.description}
              </p>
            ) : null}

            <CodeWindow code={section.code} />
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-red-200 bg-red-50 p-6">
        <h2 className="mb-3 text-lg font-bold text-red-900">
          Important warning
        </h2>

        <p className="text-sm leading-7 text-red-800">
          An update without{' '}
          <code className="font-semibold">where</code> may update
          every row. A delete without{' '}
          <code className="font-semibold">where</code> may delete
          every row.
        </p>
      </section>
    </article>
  );
}
