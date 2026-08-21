import Link from 'next/link';
import { week9Days } from '../../page';
import UserForm from './_components/user-form';
import { getAllUsers } from './queries/user-queries';
import { Button } from '@/components/ui/button';

const Week9Day1Page = async () => {
  const day = week9Days.find((day) => day.id === 1);

  const users = await getAllUsers();

  return (
    <>
      <div>
        <h1 className="text-center text-2xl">week 9 day 1</h1>
        <UserForm />
        <Button asChild>
          <Link href="/practice/week9/days/day1/users">View All Users</Link>
        </Button>
        <pre className="bg-gray-100 p-4 rounded-md mt-4 border border-pink-200">
          <code className="text-sm">{JSON.stringify(users, null, 2)}</code>
        </pre>
      </div>
    </>
  );
};

export default Week9Day1Page;
