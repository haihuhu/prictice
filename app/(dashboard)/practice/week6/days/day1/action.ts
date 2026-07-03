'use server';

export const submitContact = async (data: FormData) => {
  const name = data.get('username');
  console.log('name:', name);
};
