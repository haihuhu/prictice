'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Week9UserFormInput, week9UserSchema } from '@/schemas/week9/week9-user-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createUser } from '../actions/user-actions';
import { FormField } from './form-field';

const UserForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset, // reset the form
    setError, // set the error of a field
    watch, // watch the value of a field
    setValue, // set the value of a field
    formState: { errors, isSubmitting },
  } = useForm<Week9UserFormInput>({
    resolver: zodResolver(week9UserSchema),
  });

  const onSubmit = async (data: Week9UserFormInput) => {
    try {
      const result = await createUser(data);
      if (!result.success) {
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            errors.forEach((error) => {
              setError(field as keyof Week9UserFormInput, { message: error });
            });
          });
        }
        if (result.error) {
          toast.error('Failed to create user');
        }
        return;
      }
      toast.success('User created successfully');
      reset();
      router.push(`/practice/week9/days/day1/users/${result.data?.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create user');
    }
  };

  return (
    <>
      <div className="mb-2">
        <h2 className="text-2xl font-bold">Create New User:</h2>
        <h3 className="text-sm text-gray-500">description: this form is used to create a new user</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-row space-y-2">
        {/* name field */}
        <FormField label="Name" message={errors.name?.message}>
          <Input type="text" id="name" {...register('name')} />
        </FormField>

        {/* submit and reset buttons */}
        <div className="flex flex-col  md:flex-row items-center justify-center gap-2 ">
          <Button className="w-full md:w-32" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <Button className="w-full md:w-32" type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserForm;
