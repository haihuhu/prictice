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
  {
    week: 10,
    id: 3,
    label: 'Day3',
    href: '/practice/week10/days/day3',
  },
  {
    week: 10,
    id: 4,
    label: 'Day4',
    href: '/practice/week10/days/day4',
  },
  {
    week: 10,
    id: 5,
    label: 'Day5',
    href: '/practice/week10/days/day5',
  },
  {
    week: 10,
    id: 6,
    label: 'Day6',
    href: '/practice/week10/days/day6',
  },
  {
    week: 10,
    id: 7,
    label: 'Day7',
    href: '/practice/week10/days/day7',
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
