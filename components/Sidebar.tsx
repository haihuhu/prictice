'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface SidebarProps {
  dashboardMenu: { label: string; href: string }[];
}
const Sidebar = ({ dashboardMenu }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex justify-start items-center flex-col pt-3 gap-6 border-r-4 w-[80px]">
        {dashboardMenu.map((item) => {
          const isMatch = pathname === item.href;
          const computedClassName = cn(
            'text-lg font-medium px-4 py-2 rounded-md',
            'hover:bg-blue-500/10 hover:text-blue-500',
            isMatch ? 'bg-blue-200' : ''
          );
          return (
            <Link
              key={item.label}
              href={item.href}
              className={computedClassName}
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
