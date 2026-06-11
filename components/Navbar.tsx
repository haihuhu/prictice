'use client';
import { navRoutes } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className=" flex h-30 border-b-4">
      <div className="flex justify-center items-center h-full">
        <Link className="text-2xl font-bold text-black" href="/">
          Logo
        </Link>
      </div>
      <div className="flex justify-center items-center gap-5 ml-50">
        {navRoutes.map((item) => {
          const isActive =
            (item.href === '/' && pathname === '/') ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'text-2xl p-2 rounded-md font-bold text-black',
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
