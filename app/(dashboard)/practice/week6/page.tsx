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
  {
    week: 6,
    id: 4,
    label: 'Day4',
    href: '/practice/week6/days/day4',
  },
  {
    week: 6,
    id: 5,
    label: 'Day5',
    href: '/practice/week6/days/day5',
  },
  {
    week: 6,
    id: 6,
    label: 'Day3:Messages board',
    href: '/practice/week6/days/contents-board',
  },
  { week: 6, id: 7, label: 'Day5:register form practice', href: '/practice/week6/days/register' },
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
