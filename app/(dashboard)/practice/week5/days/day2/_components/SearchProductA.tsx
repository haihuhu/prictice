'use client';

import { Input } from '@/components/ui/input';
import { Product1Type } from '@/lib/data';
import { useState } from 'react';

const SearchProduct2 = ({ products }: { products: Product1Type[] }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const filtered = products.filter((product) =>
    product.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <div className="flex-col space-y-2 px-2">
        <div className="w-full max-w-3xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="search for title"
          />
        </div>
        <table className="w-full border mb-2">
          <thead>
            <tr className="">
              <th>UserId</th>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 10).map((product) => {
              return (
                <tr className="" key={product.id}>
                  <td className="">{product.userId}</td>
                  <td className="">{product.id}</td>
                  <td className="">{product.title}</td>
                  <td className="">{product.body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SearchProduct2;
