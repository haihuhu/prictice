'use client';

import { Users } from 'lucide-react';
import { Week9ProjectSelect, Week9UserSelect } from '@/db/schema';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';

// extend type for user with projects
export type UserWithProjects = Week9UserSelect & {
  ownerProjects: Week9ProjectSelect[];
  reviewProjects: Week9ProjectSelect[];
};

const UserTable = ({ users }: { users: UserWithProjects[] }) => {
  const router = useRouter();
  const handleClick = (userId: number) => {
    router.push(`/practice/week9/days/day1/users/${userId}`);
  };
  return (
    <div className="w-full  mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Users</h2>
          <p className="text-sm text-gray-500">{users.length} users total</p>
        </div>
      </div>

      {/* Table */}
      {users.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No users found</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="w-20 font-semibold text-gray-600">ID</TableHead>
              <TableHead className="font-semibold text-gray-600">Name</TableHead>
              <TableHead className="font-semibold text-gray-600">Owner Projects</TableHead>
              <TableHead className="font-semibold text-gray-600">Review Projects</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-blue-50/50 transition-colors cursor-pointer`}
                onClick={() => handleClick(user.id)}
              >
                <TableCell className="font-medium text-gray-500">#{user.id}</TableCell>
                <TableCell className="text-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.ownerProjects.length}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{user.reviewProjects?.length}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default UserTable;
