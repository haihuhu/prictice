import Sidebar from '@/components/Sidebar';
const dashboardMenu = [
  { label: 'Cart', href: '/dashboard/cart' },
  { label: 'Todo', href: '/dashboard/todo' },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar dashboardMenu={dashboardMenu} />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
