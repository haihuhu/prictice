import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { findUserById } from '../../queries/user-queries';

const UserPage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await findUserById(Number(userId));

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-3 text-sm text-gray-500">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">用户详情页</h1>
      </div>
      <div>
        {/* 用户信息展示区 */}
        <div className="bg-gray-50 rounded-lg p-6 shadow border mt-2 mb-6">
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-gray-600 font-semibold">用户ID: </span>
              <span className="text-gray-800">{user?.id ?? '—'}</span>
            </div>
            <div>
              <span className="text-gray-600 font-semibold">用户名: </span>
              <span className="text-gray-800">{user?.name ?? '—'}</span>
            </div>
            <div>
              <span className="text-gray-600 font-semibold">Owned Projects: </span>
              <span className="text-gray-800">{user?.ownerProjects?.length ?? '—'}</span>
            </div>
            <div>
              <span className="text-gray-600 font-semibold">Review Projects: </span>
              <span className="text-gray-800">{user?.reviewProjects?.length ?? '—'}</span>
            </div>
            <Button asChild>
              <Link href={`/practice/week9/days/day1/users/${userId}/projects`} className="cursor-pointer">
                <span>View All Projects</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
