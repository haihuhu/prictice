'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectFormData, projectSchema } from '@/schemas/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormField from './form-field';

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<
    z.input<typeof projectSchema>,
    unknown,
    ProjectFormData
  >({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = async (data: ProjectFormData) => {
    console.log(data);

    reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full space-y-4"
      >
        <div className="flex flex-col w-full space-y-2">
          <h2 className="text-xl font-bold">Create Project</h2>
          <p className="text-sm text-gray-500">
            Create a new project to get started.
          </p>
          {/* Title */}
          <FormField label="Title" message={errors.title?.message}>
            <Input type="text" {...register('title')} />
          </FormField>

          {/* Category */}
          <div className="flex flex-col items-center justify-between w-full space-y-2">
            <div className="flex items-center w-full space-y-2">
              <p className="text-sm font-medium w-1/4 md:w-1/8">
                Category:
              </p>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Set category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Website">
                          Website
                        </SelectItem>
                        <SelectItem value="Dashboard">
                          Dashboard
                        </SelectItem>
                        <SelectItem value="E-commerce">
                          E-commerce
                        </SelectItem>
                        <SelectItem value="Mobile">Mobile</SelectItem>
                        <SelectItem value="Landing">
                          Landing
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <p className="text-sm text-red-500">
              {errors.category?.message}
            </p>
          </div>
          {/* Status */}
          <div className="flex flex-col items-center justify-between w-full space-y-2">
            <div className="flex items-center w-full space-y-2">
              <p className="text-sm font-medium w-1/8">Status:</p>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Set status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Planning">
                          Planning
                        </SelectItem>
                        <SelectItem value="In Progress">
                          In Progress
                        </SelectItem>
                        <SelectItem value="Completed">
                          Completed
                        </SelectItem>
                        <SelectItem value="Paused">Paused</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <p className="text-sm text-red-500">
              {errors.status?.message}
            </p>
          </div>

          {/* Budget */}
          <FormField label="Budget" message={errors.budget?.message}>
            <Input
              type="number"
              {...register('budget', { valueAsNumber: true })}
            />
          </FormField>
          {/* Deadline */}
          <FormField
            label="deadline"
            message={errors.deadline?.message}
          >
            <Input type="datetime-local" {...register('deadline')} />
          </FormField>
          {/* isFeatured */}
          <FormField
            label="isFeatured"
            message={errors.isFeatured?.message}
          >
            <Input type="checkbox" {...register('isFeatured')} />
          </FormField>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-center gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting' : 'Submit'}
          </Button>
          <Button type="reset">Reset</Button>
        </div>
      </form>
    </>
  );
};
export default ProjectForm;
