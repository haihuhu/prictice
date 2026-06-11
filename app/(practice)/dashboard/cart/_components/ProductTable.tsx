import { Button } from '@/components/ui/button';
import { ProductType } from '@/types';
import React from 'react';
interface ProductTableType {
  products: ProductType[];
  onAddToCart: (id: string) => void;
}

const ProductTable = ({ products, onAddToCart }: ProductTableType) => {
  return (
    <div className="w-full">
      <table className="w-full border-2">
        <thead>
          <tr className="border-b">
            <th className="text-left px-2 text-2xl">Title</th>
            <th className="text-center px-2  text-2xl">Price</th>
            <th className="text-right px-2  text-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id} className="border-b">
                <td
                  className="text-left text-xl px-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-xs"
                  title={item.title}
                >
                  {item.title}
                </td>
                <td className="text-left px-2 text-xl">{item.price}</td>
                <td className="text-right px-2 text-xl">
                  <Button
                    variant="outline"
                    className="my-2"
                    onClick={() => onAddToCart(item.id)}
                  >
                    Add to cart
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
