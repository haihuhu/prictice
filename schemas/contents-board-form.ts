import { z } from 'zod';

export const contentSchema = z.object({
  username: z.string().min(3).max(20),
  content: z.string().min(10),
});

export type ContentValues = z.infer<typeof contentSchema>;
