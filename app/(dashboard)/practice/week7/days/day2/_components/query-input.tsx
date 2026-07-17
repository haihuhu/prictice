'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Inventory } from '@/db/schema';
import { useState } from 'react';
import { searchByItemName, searchById } from '../actions';

const QueryInput = () => {
  const [inputId, setInputValue] = useState('');
  const [item, setItem] = useState<Inventory | null>(null);

  const handleSearch = async (id: number) => {
    const data = await searchById(id);
    setItem(data);
  };

  const [inputName, setInputName] = useState('');
  const [nameItem, setNameItem] = useState<Inventory[] | null>(null);

  const handleSearchByName = async (val: string) => {
    if (val.trim().length === 0) {
      setNameItem([]);
      return;
    }
    const data = await searchByItemName(val);
    setNameItem(data);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="md:w-1/2 border border-yellow-500 rounded-2xl p-2">
        <div className="flex  justify-center items-center  gap-2">
          <Input
            type="number"
            value={inputId}
            onChange={(e) => setInputValue(e.target.value)}
            className="my-2"
          />
          <Button onClick={() => handleSearch(Number(inputId))}>
            Search by id
          </Button>
        </div>
        {item ? (
          <pre className="">{JSON.stringify(item, null, 2)}</pre>
        ) : (
          <p className="text-center text-red-500 text-2xl">
            No item found
          </p>
        )}
      </div>

      <div className="md:w-1/2 border border-yellow-500 rounded-2xl p-2">
        <div className="flex  justify-center items-center  gap-2">
          <Input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="my-2"
          />
          <Button onClick={() => handleSearchByName(inputName)}>
            Search by name
          </Button>
        </div>
        {nameItem && nameItem.length > 0 ? (
          <pre className="">{JSON.stringify(nameItem, null, 2)}</pre>
        ) : (
          <p className="text-center text-red-500 text-2xl">
            No item found
          </p>
        )}
      </div>
    </div>
  );
};
export default QueryInput;
