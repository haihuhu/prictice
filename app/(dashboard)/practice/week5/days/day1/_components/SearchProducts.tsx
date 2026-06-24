'use client';
import { Product1Type } from '@/lib/data';
import { Input } from '../../../../../../../components/ui/input';
import { useState } from 'react';
import { Button } from '../../../../../../../components/ui/button';

const SearchProducts = ({ products }: { products: Product1Type[] }) => {
  const [inputValue, setInputValue] = useState('');
  const [filtered, setFiltered] = useState<Product1Type[]>(products);

  const handleSearch = () => {
    const newFiltered = products.filter((product) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFiltered(newFiltered);
  };

  return (
    <>
      <div className="flex max-w-2xl mx-auto gap-2">
        <Input
          className="mb-2"
          value={inputValue}
          placeholder="search title"
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={() => setFiltered(products)}>ReSet</Button>
      </div>
      {filtered.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th>UserId</th>
              <th>Id</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              return (
                <tr key={product.id} className="border-b">
                  <td className="text-center">{product.userId}</td>
                  <td className="w-10 border text-center">{product.id}</td>
                  <td className="border p-2">{product.title}</td>
                  <td className=" p-2 ">{product.body}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-2xl text-red-500">There is no product with this title</p>
      )}
    </>
  );
};
export default SearchProducts;
