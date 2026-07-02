import Link from 'next/link';

import { week5Days } from '@/lib/data';

const Week5Page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
        {week5Days.map((day) => (
          <Link key={day.id} href={day.href} className="bg-blue-500 text-white p-2 rounded-md">
            {day.label}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Week5Page;
