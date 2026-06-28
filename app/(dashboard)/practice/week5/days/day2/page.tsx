import { Product1Type } from '@/lib/data';
import SearchProduct2 from './_components/SearchProductA';

const ProductWeek5Day2Page = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  const products: Product1Type[] = await res.json();

  return (
    <>
      <div>
        <SearchProduct2 products={products} />
        <pre className="overflow-x-auto border rounded-md border-blue-300 p-2">
          {JSON.stringify(products, null, 2)}
        </pre>
      </div>
    </>
  );
};

export default ProductWeek5Day2Page;
