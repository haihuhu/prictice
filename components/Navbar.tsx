'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  route: { label: string; href: string }[];
}

const Navbar = ({ route }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-[80px] border-b-4">
        <div className="flex items-center w-[60px] text-2xl font-bold">
          <Link href="/">Logo</Link>
        </div>
        <div className="flex justify-center items-center ml-20 gap-5 my-5">
          {route.map((item) => {
            const isActive =
              (item.href === '/' && pathname === '/') ||
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-lg font-medium px-4 py-2 rounded-md',
                  'hover:text-blue-500 hover:bg-blue-500/10',
                  isActive ? 'bg-blue-500' : ''
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Navbar;
