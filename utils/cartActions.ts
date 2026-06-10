import { CartListType } from '@/types';

export const decreaseItemQuantity = (items: CartListType[], id: string) => {
  return items
    .map((item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null;
        }
      }
      return item;
    })
    .filter(Boolean) as CartListType[];
};

export const increaseQuantity = (items: CartListType[], id: string) => {
  return items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
};
