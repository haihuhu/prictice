import Link from 'next/link';

export const week7Days = [
  {
    week: 7,
    id: 1,
    label: 'Day1',
    href: '/practice/week7/days/day1',
  },
  {
    week: 7,
    id: 2,
    label: 'Day2',
    href: '/practice/week7/days/day2',
  },
  {
    week: 7,
    id: 3,
    label: 'Day3 Project react-hook-form-crud',
    href: '/practice/week7/days/day3',
  },
  {
    week: 7,
    id: 4,
    label: 'Day4 Project react-hook-form CRUD *2',
    href: '/practice/week7/days/day4',
  },
  {
    week: 7,
    id: 5,
    label: 'Day5 Support Ticket CRUD Project ',
    href: '/practice/week7/days/day5',
  },
 
];

const Week7Page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
        {week7Days.map((day) => (
          <Link key={day.id} href={day.href} className="bg-blue-500 text-white p-2 rounded-md">
            {day.label}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Week7Page;
