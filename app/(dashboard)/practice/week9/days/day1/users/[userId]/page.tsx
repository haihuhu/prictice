import ProjectForm from '../../components/project-form';
import { findUserById } from '../../queries/user-queries';

const UserPage = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;
  const user = await findUserById(Number(userId));

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-3 text-sm text-gray-500">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">用户详情页</h1>
        <h2 className="text-lg text-gray-600 ">
          <span className="font-semibold">用户ID:</span> <span className="text-gray-800">{userId}</span>
        </h2>
        <h3 className="text-lg text-gray-600 ">
          <span className="font-semibold">用户名:</span> <span className="text-gray-800">{user?.name || '未找到'}</span>
        </h3>
      </div>

      <ProjectForm />
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};
export default UserPage;
