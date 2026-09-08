'use client';

import Link from 'next/link';
import { studyRoutes, practiceRoutes, toolsRoutes } from '@/lib/data';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const displayRoutes =
    (pathname.startsWith('/study') && studyRoutes) ||
    (pathname.startsWith('/practice') && practiceRoutes) ||
    (pathname.startsWith('/tools') && toolsRoutes) ||
    [];

  return (
    <aside
      className={cn(
        'sticky top-16 self-start bg-white/95 transition-all duration-300 shrink-0',
        // 移动端：横排占满宽，高度自适应
        'w-full h-auto',
        // 桌面端：竖排，高度撑满，按状态切换宽度
        'md:h-[calc(100vh-3.5rem)]',
        isOpen ? 'md:w-48 md:border-r md:border-slate-200/80' : 'md:w-12 md:border-r-0'
      )}
    >
      <button
        type="button"
        aria-label={isOpen ? '收起侧边栏' : '展开侧边栏'}
        onClick={() => setIsOpen((open) => !open)}
        className="absolute top-3 right-3 md:top-5 md:-right-3 z-20 flex size-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
      >
        {isOpen ? <PanelLeftClose className="size-3.5" /> : <PanelLeftOpen className="size-3.5" />}
      </button>

      {isOpen && (
        <div
          className={cn(
            'flex items-center bg-white pt-2 md:pt-5',
            // 移动端：横排滚动
            'flex-row overflow-x-auto px-2',
            // 桌面端：竖排
            'md:flex-col md:overflow-visible md:px-3 md:h-full'
          )}
        >
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
                  'text-base md:text-xl my-1 py-1 px-2 rounded-md whitespace-nowrap',
                  'hover:bg-blue-500/20',
                  isActive ? 'bg-blue-500 text-white' : ''
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
