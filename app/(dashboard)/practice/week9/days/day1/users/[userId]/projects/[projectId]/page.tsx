import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/db';
import { week9Projects } from '@/db/schema';
import { week9StatusOptions } from '@/lib/data';
import { and, eq } from 'drizzle-orm';
import { CalendarDays, CheckCircle, Clock, FolderKanban, Plus } from 'lucide-react';
import TaskCards from './tasks/_components/task-cards';
import Link from 'next/link';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'inactive':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const ProjectIdPage = async ({
  params,
}: {
  params: Promise<{ userId: string; projectId: string }>;
}) => {
  const { userId, projectId } = await params;
  const project = await db.query.week9Projects.findFirst({
    where: and(eq(week9Projects.id, Number(projectId)), eq(week9Projects.ownerId, Number(userId))),
    with: {
      category: true,
      reviewer: true,
      owner: true,
      tasks: true,
    },
  });

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <FolderKanban className="w-12 h-12 mx-auto text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900">Project not found</h2>
              <p className="text-gray-500">The project you are looking for does not exist.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  const tasks = project.tasks;

  const completedTasks = project.tasks.filter((t) => t.status === 'completed').length;
  const totalTasks = project.tasks.length;
  const inProgressTasks = project.tasks.filter((t) => t.status === 'in_progress').length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statusLabel =
    week9StatusOptions.find((s) => s.value === project.status)?.label ?? project.status;

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{project.name}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={getStatusColor(project.status)} variant="outline">
                {statusLabel}
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <FolderKanban className="w-3 h-3 mr-1" />
                {project.category?.name}
              </Badge>
            </div>
          </div>
        </div>

        {project.description && (
          <p className="text-gray-600 leading-relaxed max-w-3xl">{project.description}</p>
        )}
      </div>

      {/* Owner & Reviewer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <span className="text-sm font-medium text-blue-700">
                  {project.owner?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p className="font-medium text-gray-900">{project.owner?.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <span className="text-sm font-medium text-purple-700">
                  {project.reviewer?.name?.charAt(0).toUpperCase() ?? '?'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reviewer</p>
                <p className="font-medium text-gray-900">
                  {project.reviewer?.name ?? 'Not assigned'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks Summary */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tasks Overview</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                <span className="text-xl font-bold text-blue-600">{progressPercentage}%</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Progress</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedTasks}</p>
                <p className="text-sm text-gray-500">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressTasks}</p>
                <p className="text-sm text-gray-500">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <FolderKanban className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalTasks}</p>
                <p className="text-sm text-gray-500">Total Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <pre>{JSON.stringify(project, null, 2)}</pre>

      {/* Meta Info */}
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tasks Overview</h2>
        <Button asChild variant="default" size="sm">
          <Link
            href={`/practice/week9/days/day1/users/${userId}/projects/${projectId}/tasks/new-task`}
          >
            Add new task
            <Plus className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
      <TaskCards tasks={tasks} userId={userId} projectId={projectId} />
    </div>
  );
};

export default ProjectIdPage;
