import Link from 'next/link';

export const week9Days = [
  {
    week: 7,
    id: 1,
    label: 'Day1',
    href: '/practice/week9/days/day1',
  },
];

const Week7Page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
        {week9Days.map((day) => (
          <Link key={day.id} href={day.href} className="bg-blue-500 text-white p-2 rounded-md">
            {day.label}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Week7Page;
