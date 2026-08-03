import { db } from '@/db';
import { projects } from '@/db/schema';
import { eq, ilike } from 'drizzle-orm';

export const getAllProjects = async () => {
  const res = await db.select().from(projects);
  return res;
};

export const getProjectById = async (id: number) => {
  const res = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id));
  return res;
};

export const getProjectsByTitle = async (title: string) => {
  const res = await db
    .select()
    .from(projects)
    .where(ilike(projects.title, `%${title}%`));

  return res;
};
