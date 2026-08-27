import { z } from 'zod';

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
