import Sidebar from '@/components/Sidebar';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="flex z-50 fixed h-full ">
        <Sidebar />
      </div>
      <main className="flex-1 ml-[100px]">{children}</main>
    </div>
  );
};

export default DashboardLayout;
