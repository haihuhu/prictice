import { CartListType } from '@/types';
import React, { useEffect, useState } from 'react';
interface QuantityInputType {
  item: CartListType;
  onUpdateQuantity: (id: string, value: number) => void;
}

const QuantityInput = ({ item, onUpdateQuantity }: QuantityInputType) => {
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  return (
    <input
      type="number"
      className="w-6 border "
      title="quantity"
      value={inputValue}
      onChange={(e) => {
        const val = e.target.value;
        if (val === '' || /^[1-9]\d*$/.test(val)) {
          setInputValue(val);
        }
      }}
      onBlur={() => {
        const val = parseInt(inputValue, 10);
        if (isNaN(val) || val <= 0) {
          onUpdateQuantity(item.id, 1);
          setInputValue('1');
        } else {
          onUpdateQuantity(item.id, val);
          setInputValue(val.toString());
        }
      }}
    />
  );
};

export default QuantityInput;
