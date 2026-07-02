'use client';
import { useForm } from 'react-hook-form';
import { contentSchema, ContentValues } from '@/schemas/contents-board-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { addContent } from '../actions';

const MessageForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ContentValues>({
    resolver: zodResolver(contentSchema),
  });

  const onSubmit = async (data: ContentValues) => {
    const result = await addContent(data);
    console.log(result);
    if (!result.success) {
      const fieldErrors = result.errors?.fieldErrors;
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          setError(field as keyof ContentValues, { message: messages?.[0] });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col space-y-2">
      <div className="flex">
        <h2 className="w-24">Name:</h2>
        <Input {...register('username')} />
      </div>
      <p className="text-red-500 text-center">{errors.username?.message}</p>
      <div className="flex">
        <h2 className="w-24">Message:</h2>
        <Textarea {...register('content')} />
      </div>
      <p className="text-red-500 text-center">{errors.content?.message}</p>
      <Button disabled={isSubmitting}>Submit</Button>
    </form>
  );
};

export default MessageForm;
