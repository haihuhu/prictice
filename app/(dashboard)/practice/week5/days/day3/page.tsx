'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(register);

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="flex-col px-2 space-y-2">
          <div>
            <div className="flex gap-2">
              <h2>Name:</h2>
              <Input
                {...register('name', {
                  required: 'Name is required!',
                  minLength: { value: 3, message: 'Name must be at least 3 characters long' },
                  maxLength: { value: 20, message: 'Name must be less than 20 characters long' },
                })}
              />
            </div>
            <p className="ml-32 text-red-500">{errors.name?.message as string}</p>
          </div>
          <div>
            <div className="flex gap-2">
              <h2>Email:</h2>
              <Input {...register('email', { required: 'Email is required' })} />
            </div>
            <p className="ml-32 text-red-500">{errors.email?.message as string}</p>
          </div>
          <Button type="submit" className="w-full my-2" variant={'outline'}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
export default UserForm;
