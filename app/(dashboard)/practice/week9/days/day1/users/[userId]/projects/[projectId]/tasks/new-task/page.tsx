import TaskForm from './_components/task-form';

const NewTaskPage = async ({
  params,
}: {
  params: Promise<{ projectId: string; taskId: string }>;
}) => {
  const { projectId } = await params;
  return (
    <div>
      <TaskForm projectId={projectId} />
    </div>
  );
};

export default NewTaskPage;
