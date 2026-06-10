import Sidebar from '@/components/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex ">
        <Sidebar />
        <main className="flex-1 w-full">{children}</main>
      </div>
    </>
  );
};
export default DashboardLayout;
