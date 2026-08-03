import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq, ilike } from 'drizzle-orm';

export const getAllProjects = async () => {
  const result = await db.select().from(projects);
  return result;
};

export const getProjectById = async (id: number) => {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id));
  return result[0] ?? null;
};

export const getProjectsByTitle = async (title: string) => {
  const result = await db
    .select()
    .from(projects)
    .where(ilike(projects.title, `%${title}%`));
  return result;
};
