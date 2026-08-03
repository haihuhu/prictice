'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { projectCategories, projectStatus } from '@/lib/data';
import { ProjectFormInput, projectSchema } from '@/schemas/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormField from './form-field';
import SelectField from './select-field';
import { createProject, updateProject } from '../actions';
import { toast } from 'sonner';
import { ProjectSelect } from '@/db/schema';

const formatDatetimeLocal = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

interface ProjectFormProps {
  initialData?: ProjectSelect;
  onSuccess?: () => void;
}

const ProjectForm = ({ initialData, onSuccess }: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          category: initialData.category,
          status: initialData.status,
          budget: initialData.budget,
          deadline: formatDatetimeLocal(initialData.deadline),
          isFeatured: initialData.isFeatured,
        }
      : {
          title: '',
          category: '',
          status: '',
          deadline: '',
          isFeatured: false,
        },
  });

  const onSubmit = async (data: ProjectFormInput) => {
    try {
      const res = initialData ? await updateProject(initialData.id, data) : await createProject(data);
      if (!res.success) {
        const fieldErrors = res.fieldErrors;
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([key, value]) => {
            if (value.length > 0) {
              setError(key as keyof ProjectFormInput, { message: value[0] });
            }
          });
        }
        toast.error(`${initialData ? 'Update' : 'Create'} failed`);
        return;
      }
      if (initialData) onSuccess?.();
      toast.success(`${initialData ? 'Update' : 'Create'} successful`);
      reset();
    } catch (error) {
      console.log('error:', error);
      toast.error('something went wrong');
    }
  };

  return (
    <>
      <h3 className="text-2xl font-bold">{initialData ? 'UpdateProject' : 'Create Project'}</h3>
      <p className="text-sm text-gray-500">
        {initialData ? 'Update the project details' : 'Create a new project to get started'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
        {/* Title */}
        <FormField label="Title" message={errors.title?.message}>
          <Input type="text" {...register('title')} />
        </FormField>
        {/* category */}
        <FormField label="Category" message={errors.category?.message}>
          <SelectField name="category" placeholder="Set category" control={control} values={projectCategories} />
        </FormField>
        {/* status */}
        <FormField label="Status" message={errors.status?.message}>
          <SelectField name="status" control={control} values={projectStatus} placeholder="Set Status" />
        </FormField>
        {/* budget */}
        <FormField label="Budget" message={errors.budget?.message}>
          <Input type="number" {...register('budget', { valueAsNumber: true })} />
        </FormField>
        {/* deadline */}
        <FormField label="Deadline" message={errors.deadline?.message}>
          <Input type="datetime-local" {...register('deadline')} />
        </FormField>
        {/* featured */}
        <FormField label="Featured" message={errors.isFeatured?.message}>
          <Input type="checkbox" {...register('isFeatured')} />
        </FormField>
        <div className="flex flex-col md:flex-row justify-center gap-2">
          <Button type="submit">
            {initialData ? (isSubmitting ? 'Updating...' : 'Update') : isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
