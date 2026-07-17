'use client';

import { Button } from '@/components/ui/button';

import { Inventory } from '@/db/schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import InventoryForm from './inventory-form';
import { useState } from 'react';

export const EditButton = ({
  inventory,
}: {
  inventory: Inventory;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Inventory</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Update the inventory details for {inventory.itemName}
        </DialogDescription>
        <InventoryForm
          initialData={inventory}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
