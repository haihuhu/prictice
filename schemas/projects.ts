import { projectCategories, projectStatus } from '@/lib/data';
import { z } from 'zod';

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must between 3 and 100 characters' })
    .max(100, { message: 'Title must between 3 and 100 characters' }),
  category: z.enum(projectCategories.map((category) => category.value) as [string, ...string[]], {
    message: 'Please choose a valid option',
  }),
  status: z.enum(projectStatus.map((status) => status.value) as [string, ...string[]], {
    message: 'Please choose a valid option',
  }),
  budget: z.coerce
    .number({
      message: 'Budget must be a number between 100 and 999999 exclusive',
    })
    .gt(100, {
      message: 'Budget must be a number between 100 and 999999 exclusive',
    })
    .lt(999999, {
      message: 'Budget must be a number between 100 and 999999 exclusive',
    }),
  deadline: z.coerce.date().refine(
    (date) => {
      const now = new Date();
      const oneYearLater = new Date(now);
      oneYearLater.setFullYear(now.getFullYear() + 1);
      return date > now && date < oneYearLater;
    },
    { message: 'Deadline must be in future and within one year' }
  ),
  isFeatured: z.boolean().default(false),
});

export type ProjectFormInput = z.input<typeof projectSchema>;
export type ProjectFormData = z.output<typeof projectSchema>;
