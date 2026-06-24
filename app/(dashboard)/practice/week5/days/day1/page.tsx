import SearchProducts from '@/app/(dashboard)/practice/week5/days/day1/_components/SearchProducts';
import { Product1Type } from '@/lib/data';

const ProductsPage = async () => {
  let products: Product1Type[] | null = null;
  let error: string | null = null;
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!res.ok) throw new Error(`Failed to fetch the products,status:${res.status}`);
    products = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!products) {
    return <div>Loading</div>;
  }
  return (
    <>
      <SearchProducts products={products} />
      <pre className="mt-2 rounded-lg border-4 border-blue-100 p-2 overflow-auto">
        {JSON.stringify(products, null, 2)}
      </pre>
    </>
  );
};
export default ProductsPage;
