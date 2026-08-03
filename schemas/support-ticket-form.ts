import { supportTicketPriorities } from '@/lib/data';
import { z } from 'zod';

export const supportTicketSchema = z.object({
  title: z.string().trim().min(5).max(100),
  customerEmail: z.string().trim().min(1, 'Email is required').email(),
  priority: z.enum(supportTicketPriorities.map((item) => item.value) as [string, ...string[]], {
    message: 'Please choose a valid option',
  }),
  dueDate: z.preprocess(
    (value) => {
      return value === '' ? null : value;
    },
    z.coerce
      .date()
      .nullable()
      .refine(
        (date) => {
          if (date === null) {
            return true;
          }
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date >= today;
        },
        { message: 'Due date cannot be earlier than today' }
      )
  ),
  isResolved: z.boolean().default(false),
});

export type SupportTicketInput = z.input<typeof supportTicketSchema>;
export type SupportTicketFormData = z.output<typeof supportTicketSchema>;
