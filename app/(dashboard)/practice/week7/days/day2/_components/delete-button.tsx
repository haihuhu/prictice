'use client';

import { Button } from '@/components/ui/button';
import { deleteInventory } from '../actions';
import { toast } from 'sonner';

export const DeleteButton = ({ id }: { id: number }) => {
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteInventory(id);
      if (!res.success) {
        toast.error(res.error);
      }
      toast.success('Successfully deleted');
    } catch (error) {
      console.log('error:', error);
      toast.error('Something went wrong');
    }
  };

  return <Button onClick={() => handleDelete(id)}>Delete</Button>;
};
