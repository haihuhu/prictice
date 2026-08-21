'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CategoryForm from './category-form';

const CategoryFormDialog = ({
  userId,
  open,
  setOpen,
}: {
  userId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Add a new category to the project</DialogDescription>
          </DialogHeader>
          <CategoryForm userId={userId} onSuccess={() => setOpen(false)} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default CategoryFormDialog;
