import Link from 'next/link';
import React from 'react';
interface ProductType {
  id: string;
  name: string;
  price: number;
}

export const products: ProductType[] = [
  { id: 'products-1', name: 'Laptop', price: 30 },
  { id: 'products-2', name: 'WareLess mouse', price: 30 },
  { id: 'products-3', name: 'Desk chair', price: 30 },
  { id: 'products-4', name: 'Phone', price: 30 },
];

const ProductsPage = () => {
  return (
    <div className="flex justify-center items-center gap-5 text-2xl">
      {products.map((item) => {
        return (
          <Link key={item.id} href={`/products/${item.id}`}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsPage;
