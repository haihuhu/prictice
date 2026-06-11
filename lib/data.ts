export const navRoutes = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Study', href: '/study' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
];

export const dashboardRoutes = [
  { label: 'Cart', href: '/dashboard/cart' },
  { label: 'Todo', href: '/dashboard/todo' },
];

export const studyRoutes = [
  { label: 'Study', href: '/study' },
  { label: 'Test', href: '/study/test' },
  { label: 'Promise', href: '/study/promise' },
];

export type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const products: ProductType[] = [
  {
    id: 'product-1',
    name: 'wareLess-keyboard',
    price: 100,
    description: 'A warless is a type of product that is used to make a warless',
  },
  {
    id: 'product-2',
    name: 'desk-chair',
    price: 100,
    description: 'A desk chair is a type of product that is used to make a desk chair',
  },
  {
    id: 'product-3',
    name: 'wireless-mouse',
    price: 100,
    description: 'A wireless mouse is a type of product that is used to make a wireless mouse',
  },
  {
    id: 'product-4',
    name: 'monitor-stand',
    price: 100,
    description: 'A monitor stand is a type of product that is used to make a monitor stand',
  },
];
