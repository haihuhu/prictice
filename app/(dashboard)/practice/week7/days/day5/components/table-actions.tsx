'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2Icon, MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';
import { deleteSupportTicket } from '../action';
import { useState } from 'react';
import { useConfirm } from '@/hooks/use-confirm';
import EditButton from './edit-button';
import { SupportTicketSelect } from '@/db/schema';

const TableActions = ({ supportTicket }: { supportTicket: SupportTicketSelect }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // to open the edit dialog

  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Support Ticket',
    'Are you sure you want to delete this support ticket?'
  );

  const handleDelete = async () => {
    try {
      const confirmed = await confirm();
      if (!confirmed) {
        return;
      }
      setIsDeleting(true);
      const response = await deleteSupportTicket(supportTicket.id);
      if (response.success) {
        toast.success('Support ticket deleted successfully');
      } else {
        toast.error('Failed to delete support ticket');
      }
    } catch (error) {
      console.log('error deleting support ticket:', error);
      toast.error('Failed to delete support ticket');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <ConfirmDialog />
      <EditButton supportTicket={supportTicket} open={editOpen} setOpen={setEditOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? <Loader2Icon className="size-4 animate-spin" /> : 'Delete'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default TableActions;
