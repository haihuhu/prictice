'use client';
import { Button } from '@/components/ui/button';
import {
  Week9ProjectCategoryInput,
  week9ProjectCategorySchema,
} from '@/schemas/week9/week9-user-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField } from './form-field';
import { Input } from '@/components/ui/input';
import { createCategory } from '../actions/category-actions';
import { toast } from 'sonner';

interface CategoryFormProps {
  onSuccess: () => void;
  setOpen: (open: boolean) => void;
  userId: number;
}

const CategoryForm = ({ onSuccess, setOpen, userId }: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<Week9ProjectCategoryInput>({
    resolver: zodResolver(week9ProjectCategorySchema),
  });

  const onSubmit = async (data: Week9ProjectCategoryInput) => {
    try {
      const result = await createCategory(data, userId);

      if (!result.success) {
        const fieldErrors = result.fieldErrors;
        if (fieldErrors?.name) {
          setError('name', { message: fieldErrors.name[0] });
        }
        return;
      }
      onSuccess();
      setOpen(false);
      toast.success('Category created successfully');
      reset();
      return;
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Name" message={errors.name?.message}>
          <Input type="text" id="name" {...register('name')} />
        </FormField>
        <div className="flex flex-row items-center justify-end gap-2">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
