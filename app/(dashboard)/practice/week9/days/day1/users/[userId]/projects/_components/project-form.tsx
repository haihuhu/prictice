'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Week9ProjectCategorySelect } from '@/db/schema';
import { week9StatusOptions } from '@/lib/data';
import { Week9ProjectFormInput, week9ProjectSchema } from '@/schemas/week9/week9-user-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FormField } from '../../../../_components/form-field';
import { createProject } from '../../../../actions/project-actions';
import { FormSelect } from './form-select';

const ProjectForm = ({
  userId,
  categories,
  setOpen,
}: {
  userId: number;
  categories: Week9ProjectCategorySelect[] | undefined;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset, // reset the form
    setError, // set the error of a field
    watch, // watch the value of a field
    setValue, // set the value of a field
    control, // control the form
    formState: { errors, isSubmitting },
  } = useForm<Week9ProjectFormInput>({
    resolver: zodResolver(week9ProjectSchema),
  });

  const categoryOptions =
    categories?.map((category) => ({
      value: String(category.id),
      label: category.name,
    })) ?? [];

  const onSubmit = async (data: Week9ProjectFormInput) => {
    try {
      const result = await createProject(data, userId);
      if (!result.success) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            errors.forEach((error) => {
              setError(field as keyof Week9ProjectFormInput, { message: error });
            });
          });
        }
        if (result.error) {
          toast.error('Failed to create project');
        }
        return;
      }
      toast.success('Project created successfully');
      reset();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create project');
    }
  };

  return (
    <>
      <div className="mb-2">
        <h2 className="text-2xl font-bold">Create New Project:</h2>
        <h3 className="text-sm text-gray-500">
          description: this form is used to create a new project
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-row space-y-2">
        {/* name field */}
        <FormField label="Name" message={errors.name?.message}>
          <Input type="text" id="name" {...register('name')} />
        </FormField>
        {/* description field */}
        <FormField label="Description" message={errors.description?.message}>
          <Textarea id="description" rows={4} {...register('description')} />
        </FormField>
        {/* categories field */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="w-full">
            <FormField label="Category" message={errors.category?.message}>
              <FormSelect
                control={control}
                name="category"
                option={categoryOptions}
                placeholder="Select category"
              />
            </FormField>
          </div>
          <Button type="button" variant="outline" onClick={() => setOpen(true)}>
            Add New Category
          </Button>
        </div>

        {/* status field */}
        <FormField label="Status" message={errors.status?.message}>
          <FormSelect
            control={control}
            name="status"
            option={week9StatusOptions}
            placeholder="Select Status"
          />
        </FormField>

        {/* submit and reset buttons */}
        <div className="flex flex-col  md:flex-row items-center justify-center gap-2 ">
          <Button className="w-full md:w-32" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            className="w-full md:w-32"
            type="button"
            variant="outline"
            onClick={() => reset()}
          >
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProjectForm;
