'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarMenu = [
  { label: 'Cart', href: '/dashboard/cart' },
  { label: 'Todo', href: '/dashboard/todo' },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="flex flex-col items-center w-[120px]  border-r-4 gap-5 pt-5">
        {sidebarMenu.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'text-2xl px-2 py-1 rounded-md',
                'hover:text-blue-500 hover:bg-blue-500/10',
                isActive ? 'bg-blue-500 border-2 border-red-800' : ''
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
