'use server';

import { db } from '@/db';
import { week9ProjectCategories, Week9ProjectCategorySelect } from '@/db/schema';
import { isUniqueViolation } from '@/lib/utils';
import {
  Week9ProjectCategoryInput,
  week9ProjectCategorySchema,
} from '@/schemas/week9/week9-user-form';
import type { ActionResult } from '@/types';
import { revalidatePath } from 'next/cache';

export const createCategory = async (
  data: Week9ProjectCategoryInput,
  userId: number
): Promise<ActionResult<Week9ProjectCategorySelect>> => {
  const res = week9ProjectCategorySchema.safeParse(data);
  console.log(res);
  if (!res.success) {
    return {
      success: false,
      fieldErrors: res.error.flatten().fieldErrors,
    };
  }

  try {
    const value = res.data;
    const NewCategory = await db
      .insert(week9ProjectCategories)
      .values({
        name: value.name,
        userId: userId,
      })
      .returning();
    revalidatePath(`/practice/week9/days/day1/users/${userId}/projects`);
    return { success: true, data: NewCategory[0] };
  } catch (error) {
    console.log(error);
    if (isUniqueViolation(error)) {
      return {
        success: false,
        fieldErrors: {
          name: ['Category name must be unique'],
        },
      };
    }
    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};
