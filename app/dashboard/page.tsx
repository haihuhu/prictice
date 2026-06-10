import { redirect } from 'next/navigation';

const page = () => {
  redirect('/dashboard/cart');
};

export default page;
