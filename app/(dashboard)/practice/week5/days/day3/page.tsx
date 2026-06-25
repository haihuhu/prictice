'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formSchema, FormValues } from '@/schemas/user-form';
import { zodResolver } from '@hookForm/resolvers/zod';
import { useForm } from 'react-hook-form';

const UserPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2 px-2">
        {/* name */}
        <div>
          <div className="flex gap-2">
            <h2>Name:</h2>
            <Input {...register('name')} />
          </div>
          <p className="text-red-500 text-center">{errors.name?.message}</p>
        </div>
        {/* email */}
        <div>
          <div className="flex gap-2">
            <h2>Email:</h2>
            <Input {...register('email')} />
          </div>
          <p className="text-red-500 text-center">{errors.email?.message}</p>
        </div>
        {/* password */}
        <div>
          <div className="flex gap-2">
            <h2>Password:</h2>
            <Input type="password" {...register('password')} />
          </div>
          <p className="text-red-500 text-center">{errors.password?.message}</p>
        </div>
        {/* confirm password */}
        <div>
          <div className="flex gap-2">
            <h2>Confirm Password:</h2>
            <Input type="password" {...register('confirm')} />
          </div>
          <p className="text-red-500 text-center">{errors.confirm?.message}</p>
        </div>
        <Button type="submit" variant="default">
          Submit
        </Button>
      </form>
    </>
  );
};
export default UserPage;
