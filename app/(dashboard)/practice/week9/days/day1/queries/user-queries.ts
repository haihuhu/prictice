import { db } from '@/db';
import { week9Users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getAllUsers = async () => {
  const users = await db.query.week9Users.findMany({
    with: {
      ownerProjects: true,
      reviewProjects: true,
    },
  });
  return users;
};

export const findUserById = async (id: number) => {
  const user = await db.query.week9Users.findFirst({
    where: eq(week9Users.id, id),
    with: {
      ownerProjects: {
        with: {
          tasks: true,
        },
      },
      reviewProjects: {
        with: {
          tasks: true,
        },
      },
    },
  });
  return user;
};
