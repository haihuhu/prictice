'use client';

import { useParams } from 'next/navigation';
import { products } from '../page';

const ProductIdPage = () => {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  return (
    product && (
      <div className="flex justify-center items-center text-xl gap-10">
        <p>{product.id}</p>
        <p>{product.name}</p>
        <p> {product.price}</p>
      </div>
    )
  );
};

export default ProductIdPage;
