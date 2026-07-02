'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterValues, registerSchema } from '@/schemas/register-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { addUser } from '../actions';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterValues) => {
    const res = await addUser(data);
    const fieldErrors = res.error?.fieldErrors;
    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([key, value]) => {
        setError(key as keyof RegisterValues, { message: value[0] });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-2 space-y-2">
      {/* name */}
      <div className="w-full">
        <div className="flex">
          <h2 className="w-28">Name:</h2>
          <Input {...register('username')} />
        </div>
        <p className="text-red-500 text-center">{errors.username?.message}</p>
      </div>
      {/* email */}
      <div className="w-full">
        <div className="flex">
          <h2 className="w-28">Email:</h2>
          <Input {...register('email')} />
        </div>
        <p className="text-red-500 text-center">{errors.email?.message}</p>
      </div>
      {/* password */}
      <div className="w-full">
        <div className="flex">
          <h2 className="w-28">Password:</h2>
          <Input type="password" {...register('password')} />
        </div>
        <p className="text-red-500 text-center">{errors.password?.message}</p>
      </div>
      {/* confirmPassword */}
      <div className="w-full">
        <div className="flex">
          <h2 className="w-28">Confirm:</h2>
          <Input type="password" {...register('confirmPassword')} />
        </div>
        <p className="text-red-500 text-center">{errors.confirmPassword?.message}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
      </div>
    </form>
  );
};
export default RegisterForm;
