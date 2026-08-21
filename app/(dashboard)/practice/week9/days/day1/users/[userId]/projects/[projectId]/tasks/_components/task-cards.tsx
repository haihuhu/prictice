'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Week9TaskSelect } from '@/db/schema';
import {
  changeTaskStatus,
  deleteTask,
} from '@/app/(dashboard)/practice/week9/days/day1/actions/task-actions';
import { CheckCircle, Clock, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from 'sonner';
import { week9StatusOptions, Week9TaskStatus } from '@/lib/data';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'in_progress':
      return <Clock className="h-4 w-4 text-blue-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-400" />;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in_progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
};

const TaskCards = ({
  tasks,
  userId,
  projectId,
}: {
  tasks: Week9TaskSelect[];
  userId: string;
  projectId: string;
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Task',
    'Are you sure you want to delete this task?'
  );

  const handleDelete = async (taskId: number) => {
    try {
      const confirmed = await confirm();
      if (!confirmed) return;
      setDeletingId(taskId);

      const result = await deleteTask(taskId.toString());
      if (result.success) {
        toast.success(`Task ${result.data?.title} deleted successfully`);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete task');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (taskId: number) => {
    router.push(
      `/practice/week9/days/day1/users/${userId}/projects/${projectId}/tasks/edit-task?taskId=${taskId}`
    );
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks found</p>
      </div>
    );
  }

  const handleChangeStatus = async (taskId: number, status: Week9TaskStatus) => {
    try {
      const result = await changeTaskStatus(taskId.toString(), status);
      if (!result.success) {
        toast.error(result.error || 'Failed to change task status');
      } else {
        toast.success(
          `Task ${result.data?.title} status changed to ${getStatusLabel(result.data?.status || '')}`
        );
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      {/* Desktop: Table View */}
      <ConfirmDialog />
      <div className="hidden md:block overflow-hidden rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge
                        className={getStatusColor(task.status)}
                        variant="outline"
                        style={{ cursor: 'pointer' }}
                        title="change task status"
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(task.status)}
                          {getStatusLabel(task.status)}
                        </span>
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {week9StatusOptions.map((opt) => (
                        <DropdownMenuItem
                          key={opt.value}
                          onClick={() => handleChangeStatus(task.id, opt.value as Week9TaskStatus)}
                        >
                          {getStatusIcon(opt.value)}
                          <span className="ml-2">{opt.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{task.title}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleEdit(task.id)}
                      title="Edit"
                      style={{ cursor: 'pointer' }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(task.id)}
                      disabled={deletingId === task.id}
                      title="Delete"
                      style={{ cursor: 'pointer' }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Card View */}
      <div className="md:hidden space-y-3">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Badge
                        className={getStatusColor(task.status)}
                        variant="outline"
                        style={{ cursor: 'pointer' }}
                        title="change task status"
                      >
                        {getStatusLabel(task.status)}
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {week9StatusOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => handleChangeStatus(task.id, option.value)}
                        >
                          {getStatusLabel(option.value)}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" style={{ cursor: 'pointer' }}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(task.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(task.id)}
                        variant="destructive"
                        disabled={deletingId === task.id}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TaskCards;
