import { redirect } from 'next/navigation';

const DashboardPage = () => {
  return redirect('/dashboard/cart');
};

export default DashboardPage;
