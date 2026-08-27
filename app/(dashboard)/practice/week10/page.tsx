import Link from 'next/link';

export const week10Days = [
  {
    week: 10,
    id: 1,
    label: 'Day1',
    href: '/practice/week10/days/day1',
  },
  {
    week: 10,
    id: 2,
    label: 'Day2',
    href: '/practice/week10/days/day2',
  },
];

const Week10Page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
        {week10Days.map((day) => (
          <Link key={day.id} href={day.href} className="bg-blue-500 text-white p-2 rounded-md">
            {day.label}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Week10Page;
