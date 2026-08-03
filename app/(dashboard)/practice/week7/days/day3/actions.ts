'use server';

import { ProjectFormData, projectSchema } from '@/schemas/projects';
import { getProjectById, getProjectsByTitle } from './queries';
import { db } from '@/db';
import { projects } from '@/db/schema';
import { and, eq, ne } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type actionResult<T = void> =
  | { success: true; data?: T }
  | {
      success: false;
      fieldErrors?: Record<string, string[]>;
      error?: string;
    };

export const searchById = async (id: number) => {
  const res = await getProjectById(id);
  return res;
};

export const searchByTitle = async (title: string) => {
  const res = await getProjectsByTitle(title);
  return res;
};

export const createProject = async (data: ProjectFormData): Promise<actionResult> => {
  const res = projectSchema.safeParse(data);
  if (!res.success) {
    return {
      success: false,
      fieldErrors: res.error.flatten().fieldErrors,
    };
  }

  const values = res.data;
  const existingTitle = await db.select().from(projects).where(eq(projects.title, values.title));

  if (existingTitle[0]) {
    return {
      success: false,
      fieldErrors: { title: ['Title  already exists'] },
    };
  }

  await db.insert(projects).values({
    title: values.title,
    category: values.category,
    status: values.status,
    budget: String(values.budget),
    deadline: values.deadline,
    isFeatured: values.isFeatured,
    createdAt: new Date(),
  });

  revalidatePath('/practice/week7/days/day3');
  return { success: true };
};

export const deleteProject = async (id: number) => {
  const deleted = await db.delete(projects).where(eq(projects.id, id)).returning();
  if (deleted.length === 0) {
    return {
      success: false,
      error: 'Project not found or already deleted',
    };
  }
  return { success: true };
};

export const updateProject = async (id: number, data: ProjectFormData) => {
  const res = projectSchema.safeParse(data);
  if (!res.success) {
    return {
      success: false,
      fieldErrors: res.error.flatten().fieldErrors,
    };
  }

  const values = res.data;

  const existingTitle = await db
    .select()
    .from(projects)
    .where(and(eq(projects.title, values.title), ne(projects.id, id)));

  if (existingTitle[0]) {
    return {
      success: false,
      fieldErrors: { title: ['Title already exists'] },
    };
  }

  const updated = await db
    .update(projects)
    .set({
      title: values.title,
      category: values.category,
      status: values.status,
      budget: String(values.budget),
      deadline: values.deadline,
      isFeatured: values.isFeatured,
    })
    .where(eq(projects.id, id))
    .returning();
  if (updated.length === 0) {
    return {
      success: false,
      error: 'Failed to update project',
    };
  }
  revalidatePath('/practice/week7/days/day3');
  return { success: true, data: updated[0] };
};
