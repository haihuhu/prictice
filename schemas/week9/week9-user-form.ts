import { z } from 'zod';

export const week9UserSchema = z.object({
  name: z.string().min(3).max(30),
});

export type Week9UserFormInput = z.input<typeof week9UserSchema>;
export type Week9UserFormData = z.output<typeof week9UserSchema>;

export const week9ProjectSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(3).max(300),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled'] as const),
});

export type Week9ProjectFormInput = z.input<typeof week9ProjectSchema>;
export type Week9ProjectFormData = z.output<typeof week9ProjectSchema>;

export const week9TaskSchema = z.object({
  title: z.string().min(3).max(50),
  status: z.enum(['pending', 'in_progress', 'completed'] as const),
});

export type Week9TaskFormInput = z.input<typeof week9TaskSchema>;
export type Week9TaskFormData = z.output<typeof week9TaskSchema>;
