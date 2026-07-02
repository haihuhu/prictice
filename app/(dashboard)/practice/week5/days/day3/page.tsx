'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formSchema, FormValues } from '@/schemas/user-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PasswordInput from './_components/PasswordInput';

import { week5Days } from '@/lib/data';


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

      <h1 className="text-3xl font-bold text-center mb-2">
        Week:{week5Days.find((day) => day.id === 3)?.week}
      </h1>
      <h1 className="text-2xl font-bold text-center mb-2">{week5Days.find((day) => day.id === 3)?.label}</h1>

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
        <PasswordInput label="Password" register={register('password')} error={errors.password?.message} />
        {/* confirm password */}
        <PasswordInput
          label="Confirm Password"
          register={register('confirm')}
          error={errors.confirm?.message}
        />
        <Button type="submit" variant="default">
          Submit
        </Button>
      </form>
    </>
  );
};
export default UserPage;
