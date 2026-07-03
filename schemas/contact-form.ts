import { z } from 'zod';

export const contactSchema = z.object({
  username: z.string().min(3).max(20),
  phone: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email(),
});

export type ContactValues = z.infer<typeof contactSchema>;
