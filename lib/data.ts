export const navbarRoutes = [
  { label: 'Home', href: '/' },
  { label: 'Practice', href: '/practice' },
  { label: 'Study', href: '/study' },
  { label: 'Project', href: '/project' },
  { label: 'Contact', href: '/contact' },
];

export const practiceRoutes = [
  { label: 'Cart', href: '/practice/cart' },
  { label: 'Todo', href: '/practice/todo' },
  { label: 'Dynamic', href: '/practice/dynamic/products' },
];

export const studyRoutes = [
  { label: 'Study', href: '/study' },
  { label: 'code', href: '/study/code' },
  { label: 'git', href: '/study/git-command' },
  { label: 'promise', href: '/study/promise' },
  { label: 'Tailwind', href: '/study/tailwind' },
];

export type ProductType = {
  id: string;
  title: string;
  price: number;
  description: string;
};

export const products: ProductType[] = [
  { id: '1', title: 'Apple', price: 5, description: 'Apple is a fruit that is red and round' },
  {
    id: '2',
    title: 'Banana',
    price: 2,
    description: 'Banana is a fruit that is yellow and round',
  },
  { id: '3', title: 'Cherry', price: 3, description: 'Cherry is a fruit that is red and round' },
  { id: '4', title: 'Date', price: 4, description: 'Date is a fruit that is brown and round' },
  {
    id: '5',
    title: 'Elderberry',
    price: 5,
    description: 'Elderberry is a fruit that is purple and round',
  },
  { id: '6', title: 'Fig', price: 6, description: 'Fig is a fruit that is brown and round' },
  { id: '7', title: 'Grape', price: 7, description: 'Grape is a fruit that is purple and round' },
  {
    id: '8',
    title: 'Honeydew',
    price: 8,
    description: 'Honeydew is a fruit that is green and round',
  },
  { id: '9', title: 'Kiwi', price: 9, description: 'Kiwi is a fruit that is brown and round' },
  {
    id: '10',
    title: 'Lemon',
    price: 8,
    description: 'Lemon is a fruit that is yellow and round',
  },
];
