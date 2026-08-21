'use server';
import { db } from '@/db';
import { week9Tasks, Week9TaskSelect } from '@/db/schema';
import { Week9TaskStatus } from '@/lib/data';
import { isUniqueViolation } from '@/lib/utils';
import { Week9TaskFormData, week9TaskSchema } from '@/schemas/week9/week9-user-form';
import { ActionResult } from '@/types';
import { and, eq } from 'drizzle-orm';

export const createTask = async (
  data: Week9TaskFormData,
  projectId: string
): Promise<ActionResult<Week9TaskSelect>> => {
  const res = week9TaskSchema.safeParse(data);
  if (!res.success) {
    return {
      success: false,
      fieldErrors: res.error.flatten().fieldErrors,
    };
  }
  const values = res.data;

  try {
    const task = await db
      .insert(week9Tasks)
      .values({
        title: values.title,
        projectId: parseInt(projectId),
        status: values.status,
      })
      .returning();

    if (!task) {
      return {
        success: false,
        error: 'Failed to create task,Please try again later',
      };
    }
    const newTask = task[0];
    return {
      success: true,
      data: newTask,
    };
  } catch (error) {
    console.error(error);
    if (isUniqueViolation(error)) {
      return {
        success: false,
        fieldErrors: {
          title: ['Task already exists'],
        },
      };
    }
    return { success: false, error: 'Something went wrong' };
  }
};

export const deleteTask = async (taskId: string): Promise<ActionResult<Week9TaskSelect>> => {
  try {
    const deletedTask = await db
      .delete(week9Tasks)
      .where(eq(week9Tasks.id, parseInt(taskId)))
      .returning();
    if (!deletedTask[0]) {
      return { success: false, error: 'Failed to delete task' };
    }
    const task = deletedTask[0];
    return { success: true, data: task };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Something went wrong' };
  }
};

export const updateTask = async (
  taskId: string,
  projectId: string,
  data: Week9TaskFormData
): Promise<ActionResult<Week9TaskSelect>> => {
  const res = week9TaskSchema.safeParse(data);
  if (!res.success) {
    return {
      success: false,
      fieldErrors: res.error.flatten().fieldErrors,
    };
  }
  const values = res.data;
  try {
    const updatedTask = await db
      .update(week9Tasks)
      .set({
        title: values.title,
        status: values.status,
      })
      .where(
        and(eq(week9Tasks.id, parseInt(taskId)), eq(week9Tasks.projectId, parseInt(projectId)))
      )
      .returning();
    if (!updatedTask[0]) {
      return { success: false, error: 'Failed to update task' };
    }
    const task = updatedTask[0];
    return { success: true, data: task };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Something went wrong' };
  }
};

export const changeTaskStatus = async (
  taskId: string,
  status: Week9TaskStatus
): Promise<ActionResult<Week9TaskSelect>> => {
  const parsed = week9TaskSchema.pick({ status: true }).safeParse({ status: status });
  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const statusValue = parsed.data.status;
  try {
    const updatedTask = await db
      .update(week9Tasks)
      .set({ status: statusValue })
      .where(eq(week9Tasks.id, parseInt(taskId)))
      .returning();
    if (!updatedTask[0]) {
      return { success: false, error: 'Failed to update task status' };
    }
    const task = updatedTask[0];
    return { success: true, data: task };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Something went wrong' };
  }
};
