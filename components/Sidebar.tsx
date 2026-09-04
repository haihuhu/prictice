'use client';

import Link from 'next/link';
import { studyRoutes } from '@/lib/data';
import { practiceRoutes, toolsRoutes } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const displayRoutes =
    (pathname.startsWith('/study') && studyRoutes) ||
    (pathname.startsWith('/practice') && practiceRoutes) ||
    (pathname.startsWith('/tools') && toolsRoutes) ||
    [];
  return (
    <div className="flex  flex-row md:flex-col overflow-x-auto border-b md:border-b-0 items-center bg-white pt-2 md:pt-5  ">
      {displayRoutes.map((item) => {
        const isActive =
          item.href === '/study'
            ? pathname === '/study' || pathname.startsWith('/study/plan')
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            title={item.description}
            className={cn(
              'text-base  md:text-xl my-1 py-1 px-2 rounded-md',
              'hover:bg-blue-500/20',
              isActive ? 'bg-blue-500' : ''
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
