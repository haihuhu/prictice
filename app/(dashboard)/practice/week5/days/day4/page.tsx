'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formSchema, FormValues } from '@/schemas/user-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { week5Days } from '@/lib/data';

const UserPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const liveData = watch();

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-2">{week5Days.find((day) => day.id === 4)?.label}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center flex-col space-y-2 px-2">
        <div className="w-full">
          <div className="flex gap-2">
            <h2>Name:</h2>
            <Input {...register('name')} />
          </div>
          <p className="text-red-500 text-center">{errors.name?.message}</p>
        </div>

        <div className="w-full">
          <div className="flex gap-2">
            <h2>Email:</h2>
            <Input {...register('email')} />
          </div>
          <p className="text-red-500 text-center">{errors.email?.message}</p>
        </div>

        <div className="w-full">
          <div className="flex gap-2">
            <h2>Password:</h2>
            <Input {...register('password')} />
          </div>
          <p className="text-red-500 text-center">{errors.password?.message}</p>
        </div>

        <div className="w-full">
          <div className="flex gap-2">
            <h2>Confirm Password:</h2>
            <Input {...register('confirm')} />
          </div>
          <p className="text-red-500 text-center">{errors.confirm?.message}</p>
        </div>

        <Button type="submit" className="w-full max-w-2xl">
          Submit
        </Button>
        <pre>{JSON.stringify(liveData, null, 2)}</pre>
      </form>
    </>
  );
};
export default UserPage;
