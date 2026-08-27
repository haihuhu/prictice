import Link from 'next/link';

export const week6Days = [
  {
    week: 6,
    id: 1,
    label: 'Day1: 跟练最简 Server Action,写 Action 把表单数据 console.log。',
    href: '/practice/week6/days/day1',
  },
  {
    week: 6,
    id: 2,
    label: 'Day2',
    href: '/practice/week6/days/day2',
  },
  {
    week: 6,
    id: 3,
    label: 'Day3',
    href: '/practice/week6/days/day3',
  },
];

const Week6Page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
        {week6Days.map((day) => (
          <Link key={day.id} href={day.href} className="bg-blue-500 text-white p-2 rounded-md">
            {day.label}
          </Link>
        ))}
      </div>
    </>
  );
};
export default Week6Page;
