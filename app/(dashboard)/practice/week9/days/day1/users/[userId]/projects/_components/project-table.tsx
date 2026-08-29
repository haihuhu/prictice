'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Week9ProjectSelect, Week9TaskSelect } from '@/db/schema';
import { useConfirm } from '@/hooks/use-confirm';
import { cn } from '@/lib/utils';
import {
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Circle,
  Clock,
  EyeIcon,
  FolderKanban,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { toast } from 'sonner';
import { deleteWeek9Project } from '../../../../actions/project-actions';

export type ProjectWithTasks = Week9ProjectSelect & {
  tasks: Week9TaskSelect[];
  // Ensure category is available on project for table display.
  category?: { name: string } | null;
};

interface ProjectTableProps {
  projects: ProjectWithTasks[] | undefined;
  title?: string;
  userId: string;
  canDelete: boolean;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-gray-100 text-gray-600', icon: Circle },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-600', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-600', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-600', icon: Circle },
};

const getTaskStatusConfig = (status: string) => {
  return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
};

const ProjectTable = ({ projects = [], title, userId, canDelete }: ProjectTableProps) => {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());

  const toggleExpand = (projectId: number) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }
      return next;
    });
  };

  const totalTasks = projects.reduce((acc, p) => acc + (p.tasks?.length || 0), 0);
  const completedTasks = projects.reduce(
    (acc, p) => acc + (p.tasks?.filter((t) => t.status === 'completed').length || 0),
    0
  );

  const [ConfirmDeleteProjectDialog, confirmDeleteProject] = useConfirm(
    'Delete Project',
    'Are you sure you want to delete this project? This action cannot be undone.'
  );

  const handleDeleteProject = async (projectId: number) => {
    const confirmed = await confirmDeleteProject();
    if (!confirmed) return;
    try {
      const res = await deleteWeek9Project(projectId);
      if (!res.success) {
        toast.error(
          'Failed to delete project,because it has tasks associated with it,please delete the tasks first.'
        );
      } else {
        toast.success('Project deleted successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete project,please try again.');
    }
  };

  return (
    <>
      <ConfirmDeleteProjectDialog />
      <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <FolderKanban className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{title || 'Projects'}</h2>
            <p className="text-sm text-gray-500">
              {projects.length} projects, {completedTasks}/{totalTasks} tasks completed
            </p>
          </div>
        </div>

        {/* Table */}
        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No projects found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-20 font-semibold text-gray-600">ID</TableHead>
                <TableHead className="font-semibold text-gray-600">Name</TableHead>
                <TableHead className="font-semibold text-gray-600">Category</TableHead>
                <TableHead className="font-semibold text-gray-600">Status</TableHead>
                <TableHead className="font-semibold text-gray-600">Tasks</TableHead>
                <TableHead className="font-semibold text-gray-600">Progress</TableHead>
                <TableHead className="font-semibold text-gray-600">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) => {
                const isExpanded = expandedProjects.has(project.id);
                const projectTasks = project.tasks || [];
                const taskCount = projectTasks.length;
                const doneCount = projectTasks.filter((t) => t.status === 'completed').length;
                const progress = taskCount > 0 ? Math.round((doneCount / taskCount) * 100) : 0;
                const projectStatus =
                  statusConfig[project.status as keyof typeof statusConfig] || statusConfig.pending;

                return (
                  <Fragment key={project.id}>
                    <TableRow
                      key={project.id}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-indigo-50/50 transition-colors cursor-pointer`}
                      onClick={() => toggleExpand(project.id)}
                    >
                      <TableCell className="w-12">
                        {taskCount > 0 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpand(project.id);
                            }}
                            className="p-1 rounded hover:bg-gray-200 transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-gray-500">#{project.id}</TableCell>
                      <TableCell className="text-gray-800">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{project.name}</span>
                          <span
                            className="text-sm text-gray-500 max-w-[200px] truncate block"
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {project.description}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-gray-700 text-sm font-medium">
                          {project.category ? project.category.name : '-'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                            projectStatus.color
                          )}
                        >
                          {(() => {
                            const Icon = projectStatus.icon;
                            return <Icon className="w-3 h-3" />;
                          })()}
                          {projectStatus.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <span className="font-medium">{doneCount}</span>
                        <span className="text-gray-400">/{taskCount}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[80px]">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all',
                                progress === 100 ? 'bg-green-500' : 'bg-indigo-500'
                              )}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 w-full">
                          <Link
                            href={`/practice/week9/days/day1/users/${userId}/projects/${project.id}`}
                          >
                            <Button
                              variant="outline"
                              className="flex-1 cursor-pointer"
                              type="button"
                            >
                              <EyeIcon className="w-4 h-4" />
                              View
                            </Button>
                          </Link>
                          {canDelete && (
                            <Button
                              variant="outline"
                              className="flex-1 cursor-pointer"
                              type="button"
                              onClick={() => handleDeleteProject(project.id)}
                            >
                              <TrashIcon className="w-4 h-4" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Tasks sub-rows */}
                    {isExpanded && projectTasks.length > 0 && (
                      <TableRow key={`${project.id}-tasks`} className="bg-gray-50/30">
                        <TableCell colSpan={8} className="p-0">
                          <div className="px-4 py-3 ml-8 mr-4 mb-2 border-l-2 border-indigo-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                              Tasks
                            </p>
                            <div className="space-y-1">
                              {projectTasks.map((task) => {
                                const taskStatus = getTaskStatusConfig(task.status);
                                return (
                                  <div
                                    key={task.id}
                                    className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                                  >
                                    <span
                                      className={cn('inline-flex items-center', taskStatus.color)}
                                    >
                                      {(() => {
                                        const Icon = taskStatus.icon;
                                        return <Icon className="w-3.5 h-3.5" />;
                                      })()}
                                    </span>
                                    <Link
                                      href={`/practice/week9/days/day1/users/${userId}/projects/${project.id}/tasks/${task.id}`}
                                    >
                                      <span className="text-sm text-gray-700 flex-1">
                                        {task.title}
                                      </span>
                                    </Link>
                                    <span className="text-xs text-gray-400">#{task.id}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
};

export default ProjectTable;
