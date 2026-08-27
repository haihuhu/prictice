import { z } from 'zod';

export const week10Day2UserProfileSchema = z.object({
  description: z.string().max(255).optional(),
});

export type Week10Day2UserProfileInput = z.input<typeof week10Day2UserProfileSchema>;
export type Week10Day2UserProfileOutput = z.output<typeof week10Day2UserProfileSchema>;
