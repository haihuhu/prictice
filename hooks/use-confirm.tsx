import { useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const useConfirm = (title: string, message: string) => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);
  const pendingResolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      if (pendingResolveRef.current) {
        pendingResolveRef.current(false);
      }
      pendingResolveRef.current = resolve;
      setPromise({ resolve });
    });

  const handleClose = () => {
    pendingResolveRef.current?.(false);
    pendingResolveRef.current = null;
    setPromise(null);
  };

  const handleConfirm = () => {
    pendingResolveRef.current?.(true);
    pendingResolveRef.current = null;
    setPromise(null);
  };

  const handleCancel = () => {
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="default">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmationDialog, confirm] as const;
};
