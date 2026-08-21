import { db } from '@/db';
import TaskForm from '../new-task/_components/task-form';
import { and, eq } from 'drizzle-orm';
import { week9Tasks } from '@/db/schema';

const EditTaskPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ taskId: string }>;
}) => {
  const { projectId } = await params;
  const query = await searchParams;
  const { taskId } = query;
  const initialData = await db.query.week9Tasks.findFirst({
    where: and(eq(week9Tasks.id, parseInt(taskId)), eq(week9Tasks.projectId, parseInt(projectId))),
  });
  if (!initialData) {
    return <div>Task not found</div>;
  }
  return (
    <div>
      <TaskForm projectId={projectId} initialData={initialData} />
    </div>
  );
};

export default EditTaskPage;
