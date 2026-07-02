'use server';
import { contentSchema, ContentValues } from '@/schemas/contents-board-form';
import { revalidatePath } from 'next/cache';

let contents: { username: string; message: string }[] = [];

export const addContent = async (data: ContentValues) => {
  const result = contentSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  }

  const cleanData = result.data;
  contents = [...contents, { username: cleanData.username, message: cleanData.content }];
  revalidatePath('/practice/week6/days/contents-board');
  return { success: true, cleanData };
};

export const getContents = async () => {
  return contents;
};
