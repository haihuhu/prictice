'use client';

import Link from 'next/link';
import { navbarRoutes } from '@/lib/data';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center max-w-6xl w-full mx-auto ">
      <div className="w-32 ">
        <Link href="/">
          <h1 className="text-3xl text-center">Logo</h1>
        </Link>
      </div>

      <div className="flex flex-1 gap-5 pl-5">
        {navbarRoutes.map((item) => {
          const isActive =
            (item.href === '/' && pathname === '/') ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'text-2xl px-2  rounded-md',
                'hover:bg-blue-500/20',
                isActive ? 'bg-blue-500' : ''
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
