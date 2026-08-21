'use client';
import { FormField } from '@/app/(dashboard)/practice/week9/days/day1/_components/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Week9TaskFormInput, week9TaskSchema } from '@/schemas/week9/week9-user-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSelect } from '../../../../_components/form-select';
import { week9StatusOptions } from '@/lib/data';
import {
  createTask,
  updateTask,
} from '@/app/(dashboard)/practice/week9/days/day1/actions/task-actions';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { Week9TaskSelect } from '@/schemas/week9/week9-user-select';

const TaskForm = ({
  projectId,
  initialData,
}: {
  projectId: string;
  initialData?: Week9TaskSelect;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Week9TaskFormInput>({
    resolver: zodResolver(week9TaskSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          status: initialData.status,
        }
      : {},
  });
  const router = useRouter();
  const params = useParams();
  const userId = params.userId as string;
  const onSubmit = async (data: Week9TaskFormInput) => {
    try {
      const response = initialData
        ? await updateTask(initialData.id, projectId, data)
        : await createTask(data, projectId);

      if (!response.success) {
        const fieldErrors = response.fieldErrors;
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, errors]) => {
            errors.forEach((message) => {
              setError(field as keyof Week9TaskFormInput, { message });
            });
          });
          return;
        }
        if (response.error) {
          toast.error(response.error);
          return;
        }
        toast.error(initialData ? 'Failed to update task' : 'Failed to create task');
        return;
      }
      toast.success(initialData ? 'Task updated successfully' : 'Task created successfully');
      reset();
      router.push(`/practice/week9/days/day1/users/${userId}/projects/${projectId}`);
    } catch (error) {
      console.error(initialData ? 'update task submit error:' : 'create task submit error:', {
        error,
        projectId,
      });
      toast.error(initialData ? 'Failed to update task' : 'Failed to create task');
    }
  };

  const statusOptions = week9StatusOptions.map((status) => ({
    value: status.value,
    label: status.label,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold">{initialData ? 'Edit Task' : 'Create New Task'}</h1>
      <Separator className="my-4" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Title:" message={errors.title?.message}>
          <Input id="title" {...register('title')} />
        </FormField>
        <FormField label="Status:" message={errors.status?.message}>
          <FormSelect
            control={control}
            name="status"
            option={statusOptions}
            placeholder="Select Status"
          />
        </FormField>
        <div className="flex justify-center gap-2">
          <Button type="submit" variant="default" disabled={isSubmitting}>
            {isSubmitting
              ? initialData
                ? 'Updating...'
                : 'Creating...'
              : initialData
                ? 'Update Task'
                : 'Create Task'}
          </Button>
          <Button type="button" variant="outline" disabled={isSubmitting} onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
export default TaskForm;
