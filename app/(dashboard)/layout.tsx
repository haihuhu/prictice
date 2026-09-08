import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="flex-1 min-w-0 mt-2 pl-3 md:pl-5">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
