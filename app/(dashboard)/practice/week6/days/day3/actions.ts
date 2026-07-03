import { contactSchema, ContactValues } from '@/schemas/contact-form';

export const contactSubmit = async (data: ContactValues) => {
  const result = contactSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  }
  const cleanData = result.data;
  return { success: true, cleanData };
};
