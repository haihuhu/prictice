'use client';

import Link from 'next/link';
import { studyRoutes } from '@/lib/data';
import { practiceRoutes } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();
  const displayRoutes =
    (pathname.startsWith('/study') && studyRoutes) ||
    (pathname.startsWith('/practice') && practiceRoutes) ||
    [];
  return (
    <div className="flex flex-row md:flex-col items-center pt-2 md:pt-5 ">
      {displayRoutes.map((item) => {
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              'text-xl my-1 py-1 px-2 rounded-md',
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
