import { db } from '@/db';
import { week9Projects, week9Tasks, week9Users } from '@/db/schema';

const userNames = [
  'Alice Johnson',
  'Bob Smith',
  'Charlie Brown',
  'Diana Wilson',
  'Ethan Davis',
  'Fiona Miller',
  'George Taylor',
  'Hannah Anderson',
] as const;

const projectDefinitions = [
  {
    owner: 'Alice Johnson',
    reviewer: 'Bob Smith',
    name: 'Learning Management System',
    description: 'Build a platform for managing online courses and lessons.',
    status: 'in_progress',
  },
  {
    owner: 'Alice Johnson',
    reviewer: 'Charlie Brown',
    name: 'Finance Dashboard',
    description: 'Create a dashboard for tracking income and expenses.',
    status: 'pending',
  },
  {
    owner: 'Alice Johnson',
    reviewer: 'Diana Wilson',
    name: 'Healthcare Appointment App',
    description: 'Develop an appointment management system for clinics.',
    status: 'completed',
  },
  {
    owner: 'Alice Johnson',
    reviewer: null,
    name: 'Inventory Management Tool',
    description: 'Manage products, categories, and warehouse stock levels.',
    status: 'in_progress',
  },
  {
    owner: 'Alice Johnson',
    reviewer: 'Ethan Davis',
    name: 'Customer Support Portal',
    description: 'Organize customer questions, tickets, and support responses.',
    status: 'pending',
  },
  {
    owner: 'Bob Smith',
    reviewer: 'Alice Johnson',
    name: 'Marketing Analytics',
    description: 'Track campaign performance and customer engagement metrics.',
    status: 'in_progress',
  },
  {
    owner: 'Bob Smith',
    reviewer: 'Charlie Brown',
    name: 'Online Booking Platform',
    description: 'Allow customers to book services and manage appointments.',
    status: 'completed',
  },
  {
    owner: 'Bob Smith',
    reviewer: 'Diana Wilson',
    name: 'Expense Management App',
    description: 'Help teams submit, review, and approve business expenses.',
    status: 'pending',
  },
  {
    owner: 'Bob Smith',
    reviewer: null,
    name: 'Product Catalog',
    description: 'Manage products, categories, prices, and product details.',
    status: 'in_progress',
  },
  {
    owner: 'Charlie Brown',
    reviewer: 'Alice Johnson',
    name: 'Warehouse Operations',
    description: 'Monitor warehouse stock, deliveries, and inventory movements.',
    status: 'in_progress',
  },
  {
    owner: 'Charlie Brown',
    reviewer: 'Bob Smith',
    name: 'Invoice Generator',
    description: 'Generate professional invoices for customers and businesses.',
    status: 'completed',
  },
  {
    owner: 'Charlie Brown',
    reviewer: 'Diana Wilson',
    name: 'Employee Directory',
    description: 'Store employee profiles, departments, and contact details.',
    status: 'pending',
  },
  {
    owner: 'Charlie Brown',
    reviewer: null,
    name: 'Event Registration System',
    description: 'Manage event registration, attendance, and participant data.',
    status: 'in_progress',
  },
  {
    owner: 'Diana Wilson',
    reviewer: 'Alice Johnson',
    name: 'Content Publishing Platform',
    description: 'Create, edit, review, and publish articles and documentation.',
    status: 'in_progress',
  },
  {
    owner: 'Diana Wilson',
    reviewer: 'Bob Smith',
    name: 'Subscription Manager',
    description: 'Manage customer subscriptions, plans, and renewal dates.',
    status: 'pending',
  },
  {
    owner: 'Diana Wilson',
    reviewer: 'Charlie Brown',
    name: 'Project Time Tracker',
    description: 'Track working hours across projects and team members.',
    status: 'completed',
  },
  {
    owner: 'Ethan Davis',
    reviewer: 'Alice Johnson',
    name: 'Course Progress Tracker',
    description: 'Track student progress, lessons, quizzes, and completion rates.',
    status: 'in_progress',
  },
  {
    owner: 'Ethan Davis',
    reviewer: 'Diana Wilson',
    name: 'Restaurant Ordering System',
    description: 'Manage menus, customer orders, kitchen tasks, and payments.',
    status: 'pending',
  },
  {
    owner: 'Ethan Davis',
    reviewer: null,
    name: 'Real Estate CRM',
    description: 'Manage properties, leads, clients, and sales opportunities.',
    status: 'in_progress',
  },
  {
    owner: 'Fiona Miller',
    reviewer: 'Bob Smith',
    name: 'Recruitment Pipeline',
    description: 'Track candidates, interviews, job openings, and hiring stages.',
    status: 'pending',
  },
  {
    owner: 'Fiona Miller',
    reviewer: 'Charlie Brown',
    name: 'Document Approval Workflow',
    description: 'Create an approval process for internal business documents.',
    status: 'completed',
  },
  {
    owner: 'George Taylor',
    reviewer: 'Alice Johnson',
    name: 'Maintenance Request Portal',
    description: 'Handle maintenance requests, assignments, and completion updates.',
    status: 'in_progress',
  },
  {
    owner: 'George Taylor',
    reviewer: 'Diana Wilson',
    name: 'Customer Feedback Hub',
    description: 'Collect customer feedback and organize product improvement ideas.',
    status: 'pending',
  },
  {
    owner: 'George Taylor',
    reviewer: null,
    name: 'Office Resource Planner',
    description: 'Manage office rooms, equipment, desks, and shared resources.',
    status: 'in_progress',
  },
] as const;

const taskTemplates = ['Define the database schema', 'Build the list page', 'Add validation and error handling'];

const taskStatuses = ['pending', 'in_progress', 'completed'] as const;

async function seed() {
  await db.transaction(async (tx) => {
    await tx.delete(week9Tasks);
    await tx.delete(week9Projects);
    await tx.delete(week9Users);

    const insertedUsers = await tx
      .insert(week9Users)
      .values(userNames.map((name) => ({ name })))
      .returning();

    const userByName = new Map(insertedUsers.map((user) => [user.name, user.id]));

    const insertedProjects = await tx
      .insert(week9Projects)
      .values(
        projectDefinitions.map((project) => ({
          ownerId: userByName.get(project.owner)!,
          reviewerId: project.reviewer ? userByName.get(project.reviewer)! : null,
          name: project.name,
          description: project.description,
          status: project.status,
        }))
      )
      .returning();

    const taskCountByProjectIndex = [3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0];

    const taskValues = insertedProjects.flatMap((project, projectIndex) => {
      const taskCount = taskCountByProjectIndex[projectIndex];

      return Array.from({ length: taskCount }, (_, taskIndex) => ({
        projectId: project.id,
        title: `${taskTemplates[taskIndex]} for ${project.name}`,
        status: taskStatuses[(projectIndex + taskIndex) % taskStatuses.length],
      }));
    });

    await tx.insert(week9Tasks).values(taskValues);

    console.log('Seed completed successfully.');
    console.log(`Inserted users: ${insertedUsers.length}`);
    console.log(`Inserted projects: ${insertedProjects.length}`);
    console.log(`Inserted tasks: ${taskValues.length}`);
  });
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
