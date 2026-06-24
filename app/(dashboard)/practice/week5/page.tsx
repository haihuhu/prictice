import Link from 'next/link';

const Week5Page = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 gap-4">
        <Link href="/practice/week5/days/day1" className="bg-blue-500 text-white p-2 rounded-md">
          Day1 and Day2:Server Component:async fetch data + loading/error status
        </Link>
        <Link href="/practice/week5/days/day2" className="bg-blue-500 text-white p-2 rounded-md">
          Day1 and Day 2: <span className="text-red-500 text-2xl">review</span> server component and async
          fetch data and loading/errors status
        </Link>
        <Link href="/practice/week5/days/day3" className="bg-blue-500 text-white p-2 rounded-md">
          Day3:use react-hook-form for form!
        </Link>
        <Link href="/practice/week5/days/day4" className="bg-blue-500 text-white p-2 rounded-md">
          Day4
        </Link>
        <Link href="/practice/week5/days/day5" className="bg-blue-500 text-white p-2 rounded-md">
          Day5
        </Link>
      </div>
    </>
  );
};
export default Week5Page;
