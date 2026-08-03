// db/seed.ts
import { db } from './index';
import { projects } from './schema';

const data: (typeof projects.$inferInsert)[] = [
  {
    title: 'Laptop Setup',
    category: 'Website',
    status: 'Planning',
    budget: '5000',
    deadline: new Date('2025-06-01'),
    isFeatured: false,
  },
  {
    title: 'Website Design',
    category: 'Website',
    status: 'Planning',
    budget: '10000',
    deadline: new Date('2025-07-01'),
    isFeatured: true,
  },
  {
    title: 'E-commerce Website',
    category: 'E-commerce',
    status: 'Planning',
    budget: '15000',
    deadline: new Date('2025-08-01'),
    isFeatured: false,
  },
  {
    title: 'Mobile App Development',
    category: 'Mobile',
    status: 'Planning',
    budget: '20000',
    deadline: new Date('2025-09-01'),
    isFeatured: true,
  },
  {
    title: 'Landing Page Design',
    category: 'Landing Page',
    status: 'Planning',
    budget: '12000',
    deadline: new Date('2025-10-01'),
    isFeatured: false,
  },
  {
    title: 'Dashboard Development',
    category: 'Dashboard',
    status: 'Planning',
    budget: '18000',
    deadline: new Date('2025-11-01'),
    isFeatured: true,
  },
];

const seed = async () => {
  await db.insert(projects).values(data);
  console.log('Seed successful');
};

seed();
