'use server';

import { db } from '@/db';
import { week9Projects, Week9ProjectSelect } from '@/db/schema';
import { isUniqueViolation } from '@/lib/utils';
import { Week9ProjectFormInput, week9ProjectSchema } from '@/schemas/week9/week9-user-form';
import type { ActionResult } from '@/types';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const createProject = async (
  data: Week9ProjectFormInput,
  currentUserId: number
): Promise<ActionResult<Week9ProjectSelect>> => {
  try {
    const res = week9ProjectSchema.safeParse(data);
    if (!res.success) {
      return { success: false, fieldErrors: res.error.flatten().fieldErrors };
    }

    const value = res.data;
    const nameKey = value.name.trim().toLowerCase();
    const [newProject] = await db
      .insert(week9Projects)
      .values({
        ownerId: currentUserId,
        name: nameKey,
        description: value.description,
        categoryId: value.category,
        status: value.status,
      })
      .returning();

    if (!newProject) {
      return { success: false, error: 'Failed to create project' };
    }
    revalidatePath(`/practice/week9/days/day1/users/${currentUserId}/projects`);
    return { success: true, data: newProject };
  } catch (error) {
    console.error(error);
    if (isUniqueViolation(error)) {
      return {
        success: false,
        fieldErrors: {
          name: ['This name already exists.'],
        },
      };
    }
    return { success: false, error: 'Failed to create project' };
  }
};

export const deleteWeek9Project = async (
  projectId: number
): Promise<ActionResult<Week9ProjectSelect>> => {
  try {
    const res = await db.delete(week9Projects).where(eq(week9Projects.id, projectId)).returning();
    if (res.length === 0) {
      return { success: false, error: 'Failed to delete project' };
    }

    const data = res[0];
    revalidatePath(`/practice/week9/days/day1/users/${data.ownerId}/projects`);
    return { success: true, data: data };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to delete project' };
  }
};
