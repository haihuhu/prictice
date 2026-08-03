'use client';

import { Button } from '@/components/ui/button';
import { ProjectSelect } from '@/db/schema';
import ProjectForm from './project-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

const EditButton = ({ project }: { project: ProjectSelect }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button type="button">Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Edit the project details</DialogDescription>
          </DialogHeader>
          <ProjectForm initialData={project} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditButton;
