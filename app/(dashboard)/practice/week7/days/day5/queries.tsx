import { db } from '@/db';
import { supportTickets } from '@/db/schema';
import { count, eq, ilike } from 'drizzle-orm';

export const getAllSupportTickets = async () => {
  const result = await db.select().from(supportTickets).limit(20).offset(0);
  return result;
};

export const getSupportTicketsByPage = async (page?: string) => {
  // Set the number of tickets to display per page
  const pageSize = 20;

  // Convert 'page' to a number, default to 1 if undefined or invalid, and ensure it's at least 1
  const currentPage = Math.max(Number(page) || 1, 1);

  // Calculate the offset for the database query based on current page
  const offset = (currentPage - 1) * pageSize;

  // Query the database for support tickets limited to the current page
  const supports = await db.select().from(supportTickets).limit(pageSize).offset(offset);

  // Query the total number of support tickets for pagination calculation
  const total = await db.select({ count: count() }).from(supportTickets);

  // Calculate the total number of pages based on the total count and page size
  const totalPages = Math.ceil(total[0].count / pageSize);

  // Return the result, including support tickets, total count, total pages, and page size
  return {
    supports,
    currentPage,
    totalCount: total[0].count,
    totalPages: totalPages,
    pageSize,
  };
};

export const getSupportTicketById = async (id: number) => {
  const result = await db.select().from(supportTickets).where(eq(supportTickets.id, id));
  return result[0] || null;
};

export const getSupportTicketsByTitle = async (title: string) => {
  const result = await db
    .select()
    .from(supportTickets)
    .where(ilike(supportTickets.title, `%${title}%`));
  return result;
};
