import { db } from '@/db';
import { week10Day2Users } from '@/db/schema';
import {
  Week10Day2UserWebhookInput,
  week10Day2UserWebhookSchema,
} from '@/schemas/week10/week10-form';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export const getUserByClerkId = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const [user] = await db.select().from(week10Day2Users).where(eq(week10Day2Users.clerkId, userId));
  return user ?? null;
};

export const getUserByClerkIdOrThrow = async () => {
  const user = await getUserByClerkId();
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const createUser = async (input: Week10Day2UserWebhookInput) => {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    throw new Error('Unauthorized');
  }

  const req = week10Day2UserWebhookSchema.safeParse(input);
  if (!req.success) {
    throw new Error('Invalid input');
  }
  const values = req.data;

  const [user] = await db
    .insert(week10Day2Users)
    .values({
      clerkId: clerkId,
      emailSnapshot: values.emailSnapshot,
      nameSnapshot: values.nameSnapshot,
      avatarUrlSnapshot: values.avatarUrlSnapshot,
    })
    .returning();
  return user;
};



