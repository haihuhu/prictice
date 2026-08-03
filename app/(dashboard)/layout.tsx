import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <aside className=" sticky shrink-0 z-50 top-16 self-start w-full md:w-32 ">
        <Sidebar />
      </aside>

      <main className="flex-1 min-w-0 border-l md:pl-5 mt-2 ">
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;
