import { z } from 'zod';
import { week10Day2StatusOptions, Week10Day2TaskStatus } from '@/lib/data';

export const week10Day2UserWebhookSchema = z.object({
  clerkId: z.string().min(1),
  nameSnapshot: z.string().min(1),
  emailSnapshot: z.string().email(),
  avatarUrlSnapshot: z.string().min(1),
});

export type Week10Day2UserWebhookInput = z.input<typeof week10Day2UserWebhookSchema>;
export type Week10Day2UserWebhookOutput = z.output<typeof week10Day2UserWebhookSchema>;

export const week10Day2UserSchema = week10Day2UserWebhookSchema
  .omit({ clerkId: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, { message: 'At least one field is required' });

export type Week10Day2UserInput = z.input<typeof week10Day2UserSchema>;
export type Week10Day2UserOutput = z.output<typeof week10Day2UserSchema>;

export const week10Day2UserProfileSchema = z.object({
  description: z.string().max(255).optional(),
});

export type Week10Day2UserProfileInput = z.input<typeof week10Day2UserProfileSchema>;
export type Week10Day2UserProfileOutput = z.output<typeof week10Day2UserProfileSchema>;

export const week10Day2ProjectCategorySchema = z.object({
  name: z.string().min(3).max(255),
});

export type Week10Day2ProjectCategoryInput = z.input<typeof week10Day2ProjectCategorySchema>;
export type Week10Day2ProjectCategoryOutput = z.output<typeof week10Day2ProjectCategorySchema>;

export const week10ProjectSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
});

export type Week10ProjectInput = z.input<typeof week10ProjectSchema>;
export type Week10ProjectOutput = z.output<typeof week10ProjectSchema>;

export const week10Day2TaskSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  status: z.enum(
    week10Day2StatusOptions.map((item) => item.value) as [
      Week10Day2TaskStatus,
      ...Week10Day2TaskStatus[],
    ]
  ),
});

export type Week10Day2TaskInput = z.input<typeof week10Day2TaskSchema>;
export type Week10Day2TaskOutput = z.output<typeof week10Day2TaskSchema>;
