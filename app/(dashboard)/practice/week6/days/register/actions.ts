'use server';

import { registerSchema, RegisterValues } from '@/schemas/register-form';
import { revalidatePath } from 'next/cache';

let users: RegisterValues[] = [];
export const addUser = async (data: RegisterValues) => {
  const res = registerSchema.safeParse(data);
  if (!res.success) {
    return { success: false, error: res.error?.flatten() };
  }
  console.log(res);

  const cleanData = res.data;
  const existEmail = users.some((user) => user.email === cleanData.email);

  if (existEmail) {
    return { success: false, error: { fieldErrors: { email: ['This email is already registered'] } } };
  }
  users = [
    ...users,
    {
      username: cleanData.username,
      email: cleanData.email,
      password: cleanData.password,
      confirmPassword: cleanData.confirmPassword,
    },
  ];
  revalidatePath('/practice/week6/days/register');
  console.log('user:', users);
  return { success: true, cleanData };
};

export const getUsers = async () => {
  return users;
};
