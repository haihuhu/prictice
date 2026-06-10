'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface NavbarProps {
  navbarRoutes: { label: string; href: string }[];
}
const Navbar = ({ navbarRoutes }: NavbarProps) => {
  const pathname = usePathname();
  return (
    <div className="flex items-center h-20 border-b-4">
      <div className="w-[80px]">
        <Link href="/" className="flex justify-center items-center h-full w-full text-3xl">
          Logo
        </Link>
      </div>
      <div className="flex ml-10 gap-10">
        {navbarRoutes.map((item) => {
          const isActive =
            (item.href === '/' && pathname === '/') ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'text-2xl px-2 py-2 rounded-md',
                'hover:text-blue-500 hover:bg-blue-500/10',
                isActive ? 'bg-blue-500 border-2 border-blue-950' : ''
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