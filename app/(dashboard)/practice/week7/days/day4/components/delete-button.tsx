'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteProject } from '../actions';
import { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

const DeleteButton = ({ id }: { id: number }) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    try {
      const res = await deleteProject(id);
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success('Successfully deleted');
    } catch (error) {
      console.log('error:', error);
      toast.error('Something went wrong');
    }
  };
  return (
    <Button type="button" onClick={() => startTransition(handleDelete)} disabled={isPending}>
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
    </Button>
  );
};

export default DeleteButton;
