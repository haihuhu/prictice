import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const DaysLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Link
        href="/practice/week7"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-8 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
      >
        <ArrowLeft />
        返回本周总揽
      </Link>
      <main>{children}</main>
    </div>
  );
};
export default DaysLayout;
