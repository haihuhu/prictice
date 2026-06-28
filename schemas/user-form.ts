import { z } from 'zod';

export const formSchema = z
  .object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match!',
    path: ['confirm'],
  });

export type FormValues = z.infer<typeof formSchema>;
