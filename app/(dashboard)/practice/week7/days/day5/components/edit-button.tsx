'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SupportTicketSelect } from '@/db/schema';
import SupportTicketForm from './support-ticket-from';

const EditButton = ({
  supportTicket,
  open,
  setOpen,
}: {
  supportTicket: SupportTicketSelect;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Support Ticket</DialogTitle>
            <DialogDescription>Edit the support ticket details</DialogDescription>
          </DialogHeader>
          <SupportTicketForm initialData={supportTicket} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditButton;
