import { db } from '@/db';
import { week9ProjectCategories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getProjectCategories = async (userId: number) => {
  const res = await db.query.week9ProjectCategories.findMany({
    where: eq(week9ProjectCategories.userId, userId),
  });
  return res;
};
