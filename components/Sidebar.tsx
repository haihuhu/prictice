'use client';

import { dashboardRoutes, studyRoutes } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  const sidebarRoutes = pathname.startsWith('/dashboard')
    ? dashboardRoutes
    : pathname.startsWith('/study')
      ? studyRoutes
      : [];
  return (
    <div className="flex flex-col justify-start items-center gap-2 w-[100px] pt-5 px-5 border-r-4 ">
      {sidebarRoutes.map((item) => {
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'text-lg p-1 rounded-md font-bold text-black ',
              'hover:bg-blue-500/20',
              pathname === item.href ? 'bg-blue-500' : ''
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
