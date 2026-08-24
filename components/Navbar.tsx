'use client';

import { navbarRoutes } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Show, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  console.log(user);
  return (
    <>
      <div className="hidden md:block w-32 ">
        <Link href="/">
          <h1 className="text-3xl text-center">Logo</h1>
        </Link>
      </div>

      <div className="flex flex-1 gap-2 md:gap-5 px-1 md:pl-5">
        {navbarRoutes.map((item) => {
          const isActive =
            (item.href === '/' && pathname === '/') ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'text-base md:text-xl px-1  rounded-md',
                'hover:bg-blue-500/20',
                isActive ? 'bg-blue-500' : ''
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <Show when="signed-out">
        <div className="flex gap-2 items-center">
          <SignInButton>
            <Button variant="outline" className="cursor-pointer">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="default" className="cursor-pointer">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="flex items-center gap-2">
          <span>{user?.fullName}</span>
          <UserButton />
        </div>
      </Show>
    </>
  );
};

export default Navbar;
