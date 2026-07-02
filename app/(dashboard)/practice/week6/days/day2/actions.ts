'use server';

import { ContactValues } from '@/schemas/contact-form';

export const contactSubmit = async (data: ContactValues) => {
  const name = data.username;
  console.log('name:', name);
};
