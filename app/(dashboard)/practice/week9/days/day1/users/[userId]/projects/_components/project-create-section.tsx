'use client';

import { Week9ProjectCategorySelect } from '@/db/schema';
import { useState } from 'react';
import CategoryFormDialog from '../../../../_components/category-form-dialog';
import ProjectForm from './project-form';

interface ProjectCreateSectionProps {
  userId: number;
  categories: Week9ProjectCategorySelect[];
}

const ProjectCreateSection = ({ userId, categories }: ProjectCreateSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <CategoryFormDialog userId={userId} open={open} setOpen={setOpen} />
      <ProjectForm userId={userId} categories={categories ?? []} setOpen={setOpen} />
    </div>
  );
};
export default ProjectCreateSection;
