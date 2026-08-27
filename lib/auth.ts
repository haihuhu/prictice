// lib/auth.ts
'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { week10Day2Users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const getOrCreateCurrentUserId = async (): Promise<number | null> => {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return null;
  }

  // Try to find existing user
  const existingUser = await db
    .select({ id: week10Day2Users.id })
    .from(week10Day2Users)
    .where(eq(week10Day2Users.clerkId, clerkUserId))
    .limit(1);

  if (existingUser.length > 0) {
    return existingUser[0].id;
  }

  // User doesn't exist, fetch from Clerk and create
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const newUser = await db
    .insert(week10Day2Users)
    .values({
      clerkId: clerkUser.id,
      emailSnapshot: clerkUser.emailAddresses[0].emailAddress,
      nameSnapshot: clerkUser.fullName || '',
      avatarUrlSnapshot: clerkUser.imageUrl,
    })
    .returning({ id: week10Day2Users.id });

  return newUser[0].id;
};
