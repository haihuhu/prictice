import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Week9DaysLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Link
        href="/practice/week9"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-8 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
      >
        <ArrowLeft />
        返回本周总揽
      </Link>

      <main className="mx-2 md:mx-auto">{children}</main>
    </>
  );
};

export default Week9DaysLayout;
