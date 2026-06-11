import { products } from '@/lib/data';
import Link from 'next/link';
const ProductsPage = () => {
  return (
    <div className="flex  items-center justify-center gap-5">
      <h1 className="text-2xl font-bold text-black">All Products:</h1>
      {products.map((item) => {
        return (
          <Link
            key={item.id}
            href={`/products/${item.id}`}
            className="text-xl  text-black hover:text-blue-500"
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsPage;
