'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contactSchema, ContactValues } from '@/schemas/contact-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { contactSubmit } from './actions';

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactValues) => {
    console.log(data);
    contactSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center px-2 space-y-2">
        <h1 className="text-2xl">Contact</h1>
        {/* name */}
        <div className="w-full">
          <div className="flex gap-2 w-full ">
            <h2>Name:</h2>
            <Input {...register('username')} className="flex-1" />
          </div>
          <p className="text-center text-red-500">{errors.username?.message}</p>
        </div>
        {/* phone */}
        <div className="w-full">
          <div className="flex gap-2 w-full ">
            <h2>Phone:</h2>
            <Input {...register('phone')} className="flex-1" />
          </div>
          <p className="text-center text-red-500">{errors.phone?.message}</p>
        </div>
        {/* address */}
        <div className="w-full">
          <div className="flex gap-2 w-full ">
            <h2>Address:</h2>
            <Input {...register('address')} className="flex-1" />
          </div>
          <p className="text-center text-red-500">{errors.address?.message}</p>
        </div>
        {/* email */}
        <div className="w-full">
          <div className="flex gap-2 w-full ">
            <h2>Email:</h2>
            <Input {...register('email')} className="flex-1" />
          </div>
          <p className="text-center text-red-500">{errors.email?.message}</p>
        </div>
        <div>
          <Button className="w-full md:w-28" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};
export default ContactPage;
