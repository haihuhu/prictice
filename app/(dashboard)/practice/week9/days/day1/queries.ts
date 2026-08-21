import { db } from '@/db';
import { week9Projects, week9Tasks, week9Users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { alias } from 'drizzle-orm/pg-core';

export const getUsers = async () => {
  const users = await db.query.week9Users.findMany({
    with: {
      ownerProjects: true,
      reviewProjects: true,
      categories: true,
    },
  });
  return users;
};

export const getUsersByNameWithProjects = async (name: string) => {
  const userWithProjects = await db.query.week9Users.findMany({
    where: (users, { ilike }) => ilike(users.name, `%${name}%`),
    with: {
      ownerProjects: true,
      reviewProjects: true,
    },
  });
  return userWithProjects;
};

export const getProjectsWithOwner = async () => {
  const projectsWithOwner = await db
    .select()
    .from(week9Projects)
    .leftJoin(week9Users, eq(week9Projects.ownerId, week9Users.id));
  return projectsWithOwner;
};

const ownerUsers = alias(week9Users, 'owner_users');
const reviewUsers = alias(week9Users, 'review_users');
export const getProjectsWithOwnerAndReviewer = async () => {
  const projectsWithOwnerAndReviewer = await db
    .select({
      project: week9Projects,
      owner: ownerUsers,
      reviewer: reviewUsers,
      task: week9Tasks,
    })
    .from(week9Projects)
    .leftJoin(ownerUsers, eq(week9Projects.ownerId, ownerUsers.id))
    .leftJoin(reviewUsers, eq(week9Projects.reviewerId, reviewUsers.id))
    .leftJoin(week9Tasks, eq(week9Tasks.projectId, week9Projects.id));
  return projectsWithOwnerAndReviewer;
};

export const getProjectByIdWithOwnerAndReviewer = async (id: number) => {
  const projectWithOwnerAndReviewer = await db.query.week9Projects.findFirst({
    where: eq(week9Projects.id, id),
    with: {
      owner: true,
      reviewer: true,
    },
  });
  return projectWithOwnerAndReviewer;
};

export const createTask = async () => {
  const task = await db
    .insert(week9Tasks)
    .values({
      projectId: 1,
      title: 'Task 1',
      status: 'pending',
    })
    .returning();
  return task;
};
