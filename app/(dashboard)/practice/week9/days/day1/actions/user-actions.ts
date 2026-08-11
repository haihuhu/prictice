'use server';
import { db } from '@/db';
import { week9Users, Week9UserSelect } from '@/db/schema';
import { isUniqueViolation } from '@/lib/utils';
import { Week9UserFormInput, week9UserSchema } from '@/schemas/week9/week9-user-form';
import { ActionResult } from '@/types';
import { revalidatePath } from 'next/cache';

export const createUser = async (formData: Week9UserFormInput): Promise<ActionResult<Week9UserSelect>> => {
  const values = week9UserSchema.safeParse(formData);

  if (!values.success) {
    return {
      success: false,
      fieldErrors: values.error.flatten().fieldErrors,
    };
  }

  try {
    const [user] = await db
      .insert(week9Users)
      .values({
        name: values.data.name,
      })
      .returning();

    if (!user) {
      throw new Error('Failed to create user');
    }

    revalidatePath(`/practice/week9/days/day1/${user.id}`);
    return { success: true, data: user };
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
    return {
      success: false,
      error: 'Something went wrong,please try again later',
    };
  }
};
