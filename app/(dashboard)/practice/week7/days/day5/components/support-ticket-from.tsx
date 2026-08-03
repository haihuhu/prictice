'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SupportTicketSelect } from '@/db/schema';
import { supportTicketPriorities } from '@/lib/data';
import { formatDatetimeLocal } from '@/lib/utils';
import { SupportTicketInput, supportTicketSchema } from '@/schemas/support-ticket-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { FieldPath, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createSupportTicket, updateSupportTicket } from '../action';
import { FormField } from './form-field';
import { FormSelect } from './select-field';

interface SUpportTicketFormProps {
  initialData?: SupportTicketSelect;
  onSuccess?: () => void;
}

const SupportTicketForm = ({ initialData, onSuccess }: SUpportTicketFormProps) => {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SupportTicketInput>({
    resolver: zodResolver(supportTicketSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          customerEmail: initialData.customerEmail,
          priority: initialData.priority,
          dueDate: initialData.dueDate ? formatDatetimeLocal(initialData.dueDate) : '',
          isResolved: initialData.isResolved,
        }
      : {
          priority: '',
        },
  });

  const onSubmit = async (data: SupportTicketInput) => {
    try {
      const result = initialData ? await updateSupportTicket(initialData.id, data) : await createSupportTicket(data);
      if (!result.success) {
        const fieldErrors = result.fieldErrors;
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([key, messages]) => {
            const message = messages[0];
            if (!message) return;
            setError(key as FieldPath<SupportTicketInput>, { message });
          });
        }
        toast.error(initialData ? 'Failed to update support ticket' : 'Failed to create support ticket');
        return;
      }
      toast.success(initialData ? 'Updated successfully' : 'Created successfully');
      reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* title */}
        <FormField label="title" message={errors.title?.message}>
          <Input {...register('title')} />
        </FormField>
        {/* customerEmail */}
        <FormField label="Email" message={errors.customerEmail?.message}>
          <Input {...register('customerEmail')} />
        </FormField>
        {/* priority */}
        <FormField label="Priority" message={errors.priority?.message}>
          <FormSelect control={control} name="priority" option={supportTicketPriorities} placeholder="Set priority" />
        </FormField>
        {/* dueDate */}
        <FormField label="DueDate" message={errors.dueDate?.message}>
          <Input type="datetime-local" {...register('dueDate')} />
        </FormField>
        {/* isResolver */}
        <FormField label="Resolved" message={errors.isResolved?.message}>
          <Input type="checkbox" {...register('isResolved')} />
        </FormField>
        <div className="flex flex-col justify-center md:flex-row w-full md:mx-auto gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : initialData ? 'Update' : 'Create'}
          </Button>
          <Button type="button" onClick={() => reset()} variant="outline">
            Reset
          </Button>
        </div>
      </form>
    </>
  );
};

export default SupportTicketForm;
