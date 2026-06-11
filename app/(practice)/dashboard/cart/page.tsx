'use client';

import { CartListType } from '@/types';
import { useEffect, useState } from 'react';
import ProductTable from './_components/ProductTable';
import CartTable from './_components/CartTable';
import { products } from './data';
import { decreaseItemQuantity, increaseQuantity } from '@/utils/cartActions';

const CartPage = () => {
  const [cartList, setCartList] = useState<CartListType[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortStatus, setSortStatus] = useState<'default' | 'desc' | 'asc'>('default');

  useEffect(() => {
    const savedCartList = localStorage.getItem('cartList');
    if (savedCartList) {
      try {
        const parsedCartList = JSON.parse(savedCartList);
        setCartList(parsedCartList);
      } catch (error) {
        console.log('Failed to parse SaveCartList:', error);
      }
    } else {
      setCartList([]);
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cartList', JSON.stringify(cartList));
    }
  }, [cartList, isMounted]);

  //toggle the sortStatus
  const toggleSortStatus = () => {
    setSortStatus(() => (sortStatus === 'default' ? 'asc' : sortStatus === 'asc' ? 'desc' : 'asc'));
  };

  const sortCartList = [...cartList].sort((a, b) => {
    if (sortStatus === 'asc') {
      return a.price - b.price;
    } else if (sortStatus === 'desc') {
      return b.price - a.price;
    } else {
      return 0;
    }
  }) as CartListType[];

  const handleAddToCart = (id: string) => {
    const existItem = cartList.find((item) => item.id === id);
    //if item already in cart,up date the quantity of item
    if (existItem) {
      setCartList(
        cartList.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
    } else {
      const oldItem = products.find((p) => p.id === id);
      if (oldItem)
        setCartList([
          ...cartList,
          {
            id: oldItem?.id,
            title: oldItem?.title,
            price: oldItem?.price,
            quantity: 1,
          },
        ]);
    }
  };

  const handleDeleteItem = (id: string) => {
    setCartList(cartList.filter((cartItem) => cartItem.id !== id));
  };

  const handleDecreaseItemQuantity = (id: string) => {
    setCartList(decreaseItemQuantity(cartList, id));
  };

  const handleIncrease = (id: string) => {
    setCartList(increaseQuantity(cartList, id));
  };
  //toggle select item
  const toggleSelectItem = (id: string) => {
    const hasId = selectedIds.some((item) => item === id);
    return hasId
      ? setSelectedIds(selectedIds.filter((s) => s !== id))
      : setSelectedIds([...selectedIds, id]);
  };

  //toggle select all
  const toggleSelectAll = () => {
    if (selectedIds.length === cartList.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartList.map((item) => item.id));
    }
  };

  // delete selected item
  const handleDeleteSelected = () => {
    setCartList(cartList.filter((item) => !selectedIds.includes(item.id)));
  };

  //update quantity in the quantityInput
  const updateQuantity = (id: string, value: number) => {
    setCartList(cartList.map((item) => (item.id === id ? { ...item, quantity: value } : item)));
  };

  return (
    <>
      <div className="flex w-4/5 mx-2 gap-2">
        <div className="max-w-1/2">
          <h2 className="text-3xl text-center my-2">Products</h2>
          <ProductTable products={products} onAddToCart={handleAddToCart} />
        </div>
        <div className="max-w-1/2">
          <h2 className="text-3xl text-center my-2">shopping cart</h2>
          <CartTable
            sortCartList={sortCartList}
            selectedIds={selectedIds}
            onDeleteItem={handleDeleteItem}
            onDecreaseItemQuantity={handleDecreaseItemQuantity}
            onIncrease={handleIncrease}
            onToggleSelectItem={toggleSelectItem}
            onToggleSelectAll={toggleSelectAll}
            onDeleteSelected={handleDeleteSelected}
            onToggleSort={toggleSortStatus}
            onUpdateQuantity={updateQuantity}
          />
        </div>
      </div>
    </>
  );
};

export default CartPage;
