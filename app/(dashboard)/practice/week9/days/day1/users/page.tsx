import UserTable from '../components/user-table';
import { getAllUsers } from '../queries/user-queries';

const UsersPage = async () => {
  const users = await getAllUsers();
  return (
    <div className=" mx-auto p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">Users Page</h1>
      <UserTable users={users} />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};
export default UsersPage;
