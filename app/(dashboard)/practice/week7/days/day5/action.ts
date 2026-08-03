'use server';

import { db } from '@/db';
import { supportTickets, type SupportTicketSelect } from '@/db/schema';
import { SupportTicketFormData, SupportTicketInput, supportTicketSchema } from '@/schemas/support-ticket-form';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getSupportTicketById, getSupportTicketsByTitle } from './queries';

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error?: string; fieldErrors?: Record<string, string[]> };

export const searchById = async (id: number): Promise<ActionResult<SupportTicketSelect>> => {
  try {
    const res = await getSupportTicketById(id);
    if (!res) {
      return {
        success: false,
        error: 'Support ticket not found',
      };
    }
    return { success: true, data: res };
  } catch (error) {
    console.error('SEARCH_BY_ID:', error);
    return { success: false, error: 'Failed to search by id' };
  }
};

export const searchByTitle = async (title: string): Promise<ActionResult<SupportTicketSelect[]>> => {
  try {
    const res = await getSupportTicketsByTitle(title);
    return { success: true, data: res };
  } catch (error) {
    console.error('SEARCH_BY_TITLE:', error);
    return { success: false, error: 'Search by title went wrong' };
  }
};

export const createSupportTicket = async (data: SupportTicketInput): Promise<ActionResult> => {
  try {
    const res = supportTicketSchema.safeParse(data);
    if (!res.success) {
      return { success: false, fieldErrors: res.error.flatten().fieldErrors };
    }
    const values = res.data;

    const created = await db
      .insert(supportTickets)
      .values({
        title: values.title,
        customerEmail: values.customerEmail,
        priority: values.priority,
        dueDate: values.dueDate,
        isResolved: values.isResolved,
      })
      .returning();
    if (created.length === 0) {
      return { success: false, error: 'Failed to create support ticket' };
    }
    revalidatePath('/practice/week7/days/day5');
    return { success: true };
  } catch (error) {
    console.error('CREATE_SUPPORT_TICKET:', error);
    return { success: false, error: 'Failed to create support ticket' };
  }
};

export const updateSupportTicket = async (id: number, data: SupportTicketInput): Promise<ActionResult> => {
  try {
    const res = supportTicketSchema.safeParse(data);
    if (!res.success) {
      return { success: false, fieldErrors: res.error.flatten().fieldErrors };
    }

    const values = res.data;
    const updated = await db
      .update(supportTickets)
      .set({
        title: values.title,
        customerEmail: values.customerEmail,
        priority: values.priority,
        dueDate: values.dueDate,
        isResolved: values.isResolved,
      })
      .where(eq(supportTickets.id, id))
      .returning();
    if (updated.length === 0) {
      return { success: false, error: 'Support ticket not found' };
    }
    revalidatePath('/practice/week7/days/day5');
    return { success: true };
  } catch (error) {
    console.error('UPDATE_SUPPORT_TICKET:', error);
    return { success: false, error: 'Failed to update support ticket' };
  }
};

export const deleteSupportTicket = async (id: number): Promise<ActionResult> => {
  try {
    const deleted = await db.delete(supportTickets).where(eq(supportTickets.id, id)).returning();
    if (deleted.length === 0) {
      return { success: false, error: 'Support ticket not found or already deleted' };
    }
    revalidatePath('/practice/week7/days/day5');
    return { success: true };
  } catch (error) {
    console.error('DELETE_SUPPORT_TICKET:', error);
    return { success: false, error: 'Failed to delete support ticket' };
  }
};
