import { Button } from '@/components/ui/button';
import { CartListType } from '@/types';
import { ArrowUpDown, MinusIcon, PlusIcon } from 'lucide-react';
import React from 'react';
import QuantityInput from './QuantityInput';
interface CartTableType {
  sortCartList: CartListType[];
  selectedIds: string[];
  onDeleteItem: (id: string) => void;
  onDecreaseItemQuantity: (id: string) => void;
  onIncrease: (id: string) => void;
  onToggleSelectItem: (id: string) => void;
  onToggleSelectAll: () => void;
  onDeleteSelected: () => void;
  onToggleSort: () => void;
  onUpdateQuantity: (id: string, value: number) => void;
}

const CartTable = ({
  sortCartList,
  selectedIds,
  onDeleteItem,
  onDecreaseItemQuantity,
  onIncrease,
  onToggleSelectItem,
  onToggleSelectAll,
  onDeleteSelected,
  onToggleSort,
  onUpdateQuantity,
}: CartTableType) => {
  return (
    <div className="w-full">
      <table className="w-full border-2">
        <thead>
          <tr className="border-b">
            <th className="text-left px-2 text-2xl">
              {sortCartList.length > 0 && (
                <input
                  type="checkbox"
                  title="selectAll"
                  checked={selectedIds.length === sortCartList.length}
                  onChange={() => onToggleSelectAll()}
                />
              )}
            </th>
            <th className="text-left px-2 text-2xl">Title</th>
            <th className="text-center px-2 text-2xl">Price</th>
            <th className="text-center px-2 text-2xl">
              <div
                className="flex items-center justify-center hover:cursor-pointer hover:text-blue-500"
                onClick={() => onToggleSort()}
              >
                <span>Quantity</span>
                <ArrowUpDown className="w-6 h-6 ml-2" />
              </div>
            </th>
            <th className="text-right px-2 text-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortCartList.map((item) => {
            return (
              <tr key={item.id} className="border-2">
                <td className="text-left px-2 text-2xl">
                  <input
                    type="checkbox"
                    title="selectAll"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => onToggleSelectItem(item.id)}
                  />
                </td>
                <td
                  className="text-left text-xl px-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-xs"
                  title={item.title}
                >
                  {item.title}
                </td>
                <td className="text-left text-xl px-2 ">${item.price}</td>
                <td className="text-center text-xl px-2 ">
                  <div className="flex justify-center items-center">
                    <MinusIcon
                      className="h-6 w-6 hover:cursor-pointer hover:text-blue-500"
                      onClick={() => onDecreaseItemQuantity(item.id)}
                    />
                    <div className="text-right mx-2 w-5">
                      <QuantityInput
                        item={item}
                        onUpdateQuantity={onUpdateQuantity}
                      />
                    </div>
                    <PlusIcon
                      className="h-6 w-6 hover:cursor-pointer hover:text-blue-500"
                      onClick={() => {
                        onIncrease(item.id);
                      }}
                    />
                  </div>
                </td>
                <td className="text-left text-xl px-2 ">
                  <Button
                    variant="outline"
                    className="my-2"
                    onClick={() => onDeleteItem(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {sortCartList.length > 0 && (
        <Button
          variant="outline"
          className="mt-2 w-full"
          onClick={() => onDeleteSelected()}
        >
          Delete selected
        </Button>
      )}
    </div>
  );
};

export default CartTable;
